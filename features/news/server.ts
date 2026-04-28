import type { ContentStatus, Prisma, UserRole } from '@prisma/client';
import { prisma } from '@/lib/db';
import { canManageNews } from '@/lib/auth/current-user';
import type { CreateNewsInput, PatchNewsInput } from './schema';
import { newsRowToItem } from './mapper';

export function parseNewsId(raw: string): number | null {
  const n = Number(raw);
  return Number.isInteger(n) && n > 0 ? n : null;
}

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

export function canReadNewsItem(role: UserRole | undefined, status: ContentStatus): boolean {
  if (role && canManageNews(role)) return true;
  return status === 'published';
}

export async function createNewsItem(data: CreateNewsInput) {
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
    },
  });

  return newsRowToItem(row);
}

export async function updateNewsItem(id: number, patch: PatchNewsInput) {
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
    },
  });

  return newsRowToItem(row);
}

export async function softDeleteNewsItem(id: number) {
  await prisma.news.update({
    where: { id },
    data: { status: 'deleted' },
  });
}

