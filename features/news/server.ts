import { randomBytes } from 'node:crypto';
import type { News as PrismaNews, Prisma, UserRole } from '@prisma/client';
import { prisma } from '@/lib/db';
import { canManageNews } from '@/lib/auth/current-user';
import { computeNewsIngestFingerprint } from '@/lib/news/fingerprint';
import { allocateUniqueNewsSlug, slugifyNewsTitle } from '@/lib/news/slug';
import { removeSearchDocument, syncSearchDocumentForNewsId } from '@/lib/search/sync-documents';
import type { CreateNewsInput, PatchNewsInput } from './schema';
import { newsRowToItem } from './mapper';
import type { NewsItem } from './types';

export function parseNewsId(raw: string): number | null {
  const n = Number(raw);
  return Number.isInteger(n) && n > 0 ? n : null;
}

function revisionPayloadFromRow(row: PrismaNews): Prisma.JsonObject {
  return {
    source: row.source,
    category: row.category,
    status: row.status,
    pinned: row.pinned,
    listDate: row.listDate,
    titleHu: row.titleHu,
    titleEn: row.titleEn,
    textHu: row.textHu,
    textEn: row.textEn,
    author: row.author,
    cover: row.cover,
    hasCover: row.hasCover,
    slug: row.slug,
    ingestFingerprint: row.ingestFingerprint,
    previewToken: row.previewToken,
    coverAltHu: row.coverAltHu,
    coverAltEn: row.coverAltEn,
    scheduledFor: row.scheduledFor,
    externalUrl: row.externalUrl,
  };
}

export type CreateNewsResult =
  | { ok: true; item: NewsItem }
  | { ok: false; code: 'duplicate_ingest'; existingNewsId: number };

export type UpdateNewsResult =
  | { ok: true; item: NewsItem }
  | { ok: false; code: 'not_found' | 'publish_requires_alt' };

export async function listNewsForRole(role?: UserRole) {
  const where: Prisma.NewsWhereInput =
    role && canManageNews(role) ? { status: { not: 'deleted' } } : { status: 'published' };

  const rows = await prisma.news.findMany({
    where,
    orderBy: [{ pinned: 'desc' }, { listDate: 'desc' }, { id: 'desc' }],
  });

  return rows.map(newsRowToItem);
}

export async function getNewsItemById(id: number) {
  const row = await prisma.news.findUnique({ where: { id } });
  if (!row || row.status === 'deleted') return null;
  return row;
}

/** Publikus egyedi oldal – csak közzétett. */
export async function getPublishedNewsBySlug(slug: string) {
  return prisma.news.findFirst({
    where: { slug, status: 'published' },
  });
}

export async function getNewsRowByPreviewToken(token: string) {
  const t = token.trim();
  if (!t) return null;
  return prisma.news.findFirst({
    where: { previewToken: t },
  });
}

export async function rotateNewsPreviewToken(id: number): Promise<{ token: string } | null> {
  const existing = await prisma.news.findUnique({ where: { id } });
  if (!existing || existing.status === 'deleted') return null;
  const token = randomBytes(24).toString('hex');
  await prisma.news.update({
    where: { id },
    data: { previewToken: token },
  });
  return { token };
}

export async function listNewsRevisionsForNews(newsId: number, limit = 50) {
  return prisma.newsRevision.findMany({
    where: { newsId },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
}

export function canReadNewsItem(role: UserRole | undefined, status: PrismaNews['status']): boolean {
  if (role && canManageNews(role)) return true;
  return status === 'published';
}

export async function createNewsItem(data: CreateNewsInput): Promise<CreateNewsResult> {
  const baseSlugInput = data.slug ? slugifyNewsTitle(data.slug) : slugifyNewsTitle(data.titleHu);
  const slug = await allocateUniqueNewsSlug(prisma, baseSlugInput);

  let ingestFp: string | null = null;
  if (data.source === 'facebook' || data.source === 'instagram') {
    ingestFp = computeNewsIngestFingerprint({
      titleHu: data.titleHu,
      textHu: data.textHu,
      listDate: data.listDate,
    });
    const fpRow = await prisma.newsIngestFingerprint.findUnique({
      where: { fingerprint: ingestFp },
    });
    if (fpRow?.newsId != null) {
      const other = await prisma.news.findUnique({ where: { id: fpRow.newsId } });
      if (other && other.status !== 'deleted') {
        return { ok: false, code: 'duplicate_ingest', existingNewsId: other.id };
      }
    }
  }

  const row = await prisma.news.create({
    data: {
      source: data.source,
      category: data.category,
      status: data.status,
      pinned: data.pinned,
      listDate: data.listDate,
      titleHu: data.titleHu,
      titleEn: data.titleEn,
      textHu: data.textHu,
      textEn: data.textEn,
      author: data.author,
      cover: data.cover,
      hasCover: data.hasCover,
      scheduledFor: data.scheduledFor,
      externalUrl: data.externalUrl,
      slug,
      ingestFingerprint: ingestFp,
      coverAltHu: data.coverAltHu ?? '',
      coverAltEn: data.coverAltEn ?? '',
    },
  });

  if (ingestFp) {
    await prisma.newsIngestFingerprint.upsert({
      where: { fingerprint: ingestFp },
      create: {
        fingerprint: ingestFp,
        source: data.source,
        newsId: row.id,
        sourcePostId: data.sourcePostId ?? null,
      },
      update: {
        newsId: row.id,
        source: data.source,
        sourcePostId: data.sourcePostId ?? null,
      },
    });
  }

  await syncSearchDocumentForNewsId(row.id);

  return { ok: true, item: newsRowToItem(row) };
}

export async function updateNewsItem(
  id: number,
  patch: PatchNewsInput,
  editorId: string | null,
): Promise<UpdateNewsResult> {
  const existing = await prisma.news.findUnique({ where: { id } });
  if (!existing || existing.status === 'deleted') {
    return { ok: false, code: 'not_found' };
  }

  const merged = {
    status: patch.status ?? existing.status,
    coverAltHu: patch.coverAltHu !== undefined ? patch.coverAltHu : existing.coverAltHu,
    coverAltEn: patch.coverAltEn !== undefined ? patch.coverAltEn : existing.coverAltEn,
    titleHu: patch.titleHu ?? existing.titleHu,
  };

  if (merged.status === 'published') {
    if (!merged.coverAltHu.trim() || !merged.coverAltEn.trim()) {
      return { ok: false, code: 'publish_requires_alt' };
    }
  }

  await prisma.newsRevision.create({
    data: {
      newsId: id,
      editorId,
      payload: revisionPayloadFromRow(existing),
    },
  });

  let nextSlug: string | null = existing.slug;
  if (patch.slug !== undefined) {
    const trimmed = patch.slug?.trim();
    if (trimmed) {
      nextSlug = await allocateUniqueNewsSlug(prisma, slugifyNewsTitle(trimmed), id);
    }
  } else if (!existing.slug) {
    nextSlug = await allocateUniqueNewsSlug(prisma, slugifyNewsTitle(merged.titleHu), id);
  }

  const row = await prisma.news.update({
    where: { id },
    data: {
      ...(patch.source !== undefined && { source: patch.source }),
      ...(patch.category !== undefined && { category: patch.category }),
      ...(patch.status !== undefined && { status: patch.status }),
      ...(patch.pinned !== undefined && { pinned: patch.pinned }),
      ...(patch.listDate !== undefined && { listDate: patch.listDate }),
      ...(patch.titleHu !== undefined && { titleHu: patch.titleHu }),
      ...(patch.titleEn !== undefined && { titleEn: patch.titleEn }),
      ...(patch.textHu !== undefined && { textHu: patch.textHu }),
      ...(patch.textEn !== undefined && { textEn: patch.textEn }),
      ...(patch.author !== undefined && { author: patch.author }),
      ...(patch.cover !== undefined && { cover: patch.cover }),
      ...(patch.hasCover !== undefined && { hasCover: patch.hasCover }),
      ...(patch.scheduledFor !== undefined && { scheduledFor: patch.scheduledFor }),
      ...(patch.externalUrl !== undefined && { externalUrl: patch.externalUrl }),
      ...(patch.coverAltHu !== undefined && { coverAltHu: patch.coverAltHu }),
      ...(patch.coverAltEn !== undefined && { coverAltEn: patch.coverAltEn }),
      slug: nextSlug,
    },
  });

  await syncSearchDocumentForNewsId(id);

  return { ok: true, item: newsRowToItem(row) };
}

export async function softDeleteNewsItem(id: number) {
  await prisma.news.update({
    where: { id },
    data: { status: 'deleted' },
  });
  await removeSearchDocument('news', id);
}
