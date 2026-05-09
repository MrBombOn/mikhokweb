import type { Prisma, UserRole } from '@prisma/client';
import type { z } from 'zod';
import { prisma } from '@/lib/db';
import { canManageNews } from '@/lib/auth/current-user';
import { guideToDto } from '@/lib/mappers/guides';
import { buildGuideSearchableText } from '@/lib/guides/searchable-text';
import { createGuideRevision } from '@/lib/guides/revision';
import { removeSearchDocument, syncSearchDocumentForGuideId } from '@/lib/search/sync-documents';
import { parseOptionalHttpUrl, patchGuideSchema, type CreateGuideInput } from '@/lib/validation/guides';

export function parseGuideId(raw: string): number | null {
  const n = Number(raw);
  return Number.isInteger(n) && n > 0 ? n : null;
}

export async function listGuidesForRole(role?: UserRole) {
  const canManage = role && canManageNews(role);

  const where: Prisma.GuideWhereInput = canManage ? { status: { not: 'deleted' } } : { status: 'published' };

  const rows = await prisma.guide.findMany({
    where,
    orderBy: [{ listDate: 'desc' }, { id: 'desc' }],
  });

  return { items: rows.map(guideToDto) };
}

export function normalizeCreateGuideDocument(
  d: CreateGuideInput,
): { ok: true; listDate: string; docUrl: string | null | undefined; docType: string | null | undefined } | { ok: false; error: string } {
  const docUrl = parseOptionalHttpUrl(d.documentUrl ?? undefined);
  if (docUrl === 'invalid') {
    return { ok: false, error: 'A dokumentum URL csak http(s), relatív (/...) útvonal lehet vagy üres.' };
  }

  const listDate = d.listDate ?? new Date().toISOString().slice(0, 10);
  const docType =
    d.documentType === null || d.documentType === undefined
      ? undefined
      : String(d.documentType).trim() === ''
        ? null
        : String(d.documentType).trim();

  return { ok: true, listDate, docUrl, docType };
}

export async function createGuideItem(d: CreateGuideInput) {
  const norm = normalizeCreateGuideDocument(d);
  if (!norm.ok) return norm;

  const row = await prisma.guide.create({
    data: {
      titleHu: d.titleHu,
      titleEn: d.titleEn,
      excerptHu: d.excerptHu,
      excerptEn: d.excerptEn,
      bodyHu: d.bodyHu,
      bodyEn: d.bodyEn,
      category: d.category,
      topic: d.topic,
      keywords: d.keywords,
      documentUrl: norm.docUrl === undefined ? undefined : norm.docUrl,
      documentType: norm.docType === undefined ? undefined : norm.docType,
      searchableText: buildGuideSearchableText(d),
      listDate: norm.listDate,
      status: d.status,
    },
  });

  await createGuideRevision(row.id, {
    reason: 'create',
    snapshot: {
      titleHu: row.titleHu,
      titleEn: row.titleEn,
      excerptHu: row.excerptHu,
      excerptEn: row.excerptEn,
      bodyHu: row.bodyHu,
      bodyEn: row.bodyEn,
      category: row.category,
      topic: row.topic,
      keywords: row.keywords,
      documentUrl: row.documentUrl,
      documentType: row.documentType,
      attachmentName: row.attachmentName,
      attachmentMime: row.attachmentMime,
      attachmentSizeBytes: row.attachmentSizeBytes,
      listDate: row.listDate,
      status: row.status,
    },
  });

  await syncSearchDocumentForGuideId(row.id);

  return { ok: true as const, item: guideToDto(row) };
}

export async function getGuideDto(id: number, role?: UserRole) {
  const row = await prisma.guide.findUnique({ where: { id } });
  if (!row || row.status === 'deleted') {
    return { ok: false as const, status: 404 as const };
  }

  const guest = !role || !canManageNews(role);
  if (guest && row.status !== 'published') {
    return { ok: false as const, status: 404 as const };
  }

  return { ok: true as const, item: guideToDto(row) };
}

type PatchGuideInput = z.infer<typeof patchGuideSchema>;

export async function patchGuideItem(id: number, patch: PatchGuideInput) {
  const existing = await prisma.guide.findUnique({ where: { id } });
  if (!existing || existing.status === 'deleted') {
    return { ok: false as const, status: 404 as const, error: 'Nem található.' };
  }

  const updateData: Prisma.GuideUpdateInput = {};

  if (patch.titleHu !== undefined) updateData.titleHu = patch.titleHu;
  if (patch.titleEn !== undefined) updateData.titleEn = patch.titleEn;
  if (patch.excerptHu !== undefined) updateData.excerptHu = patch.excerptHu;
  if (patch.excerptEn !== undefined) updateData.excerptEn = patch.excerptEn;
  if (patch.bodyHu !== undefined) updateData.bodyHu = patch.bodyHu;
  if (patch.bodyEn !== undefined) updateData.bodyEn = patch.bodyEn;
  if (patch.category !== undefined) updateData.category = patch.category;
  if (patch.topic !== undefined) updateData.topic = patch.topic;
  if (patch.keywords !== undefined) updateData.keywords = patch.keywords;
  if (patch.listDate !== undefined) updateData.listDate = patch.listDate;
  if (patch.status !== undefined) updateData.status = patch.status;

  if (patch.documentUrl !== undefined) {
    const docUrl = parseOptionalHttpUrl(patch.documentUrl);
    if (docUrl === 'invalid') {
      return { ok: false as const, status: 400 as const, error: 'A dokumentum URL csak http(s), relatív (/...) útvonal lehet vagy üres.' };
    }
    updateData.documentUrl = docUrl === undefined ? null : docUrl;
  }

  if (patch.documentType !== undefined) {
    updateData.documentType =
      patch.documentType === null ? null : String(patch.documentType).trim() === '' ? null : String(patch.documentType).trim();
  }

  if (Object.keys(updateData).length === 0) {
    return { ok: false as const, status: 400 as const, error: 'Nincs frissítendő mező.' };
  }

  const mergedForIndex = {
    titleHu: patch.titleHu ?? existing.titleHu,
    titleEn: patch.titleEn ?? existing.titleEn,
    excerptHu: patch.excerptHu ?? existing.excerptHu,
    excerptEn: patch.excerptEn ?? existing.excerptEn,
    bodyHu: patch.bodyHu ?? existing.bodyHu,
    bodyEn: patch.bodyEn ?? existing.bodyEn,
    category: patch.category ?? existing.category,
    topic: patch.topic ?? existing.topic,
    keywords: patch.keywords ?? existing.keywords,
  };
  updateData.searchableText = buildGuideSearchableText(mergedForIndex);

  const row = await prisma.guide.update({
    where: { id },
    data: updateData,
  });

  await createGuideRevision(id, {
    reason: 'patch',
    patch,
    snapshot: {
      titleHu: row.titleHu,
      titleEn: row.titleEn,
      excerptHu: row.excerptHu,
      excerptEn: row.excerptEn,
      bodyHu: row.bodyHu,
      bodyEn: row.bodyEn,
      category: row.category,
      topic: row.topic,
      keywords: row.keywords,
      documentUrl: row.documentUrl,
      documentType: row.documentType,
      attachmentName: row.attachmentName,
      attachmentMime: row.attachmentMime,
      attachmentSizeBytes: row.attachmentSizeBytes,
      listDate: row.listDate,
      status: row.status,
    },
  });

  await syncSearchDocumentForGuideId(id);

  return { ok: true as const, item: guideToDto(row) };
}

export async function softDeleteGuideItem(id: number) {
  const existing = await prisma.guide.findUnique({ where: { id } });
  if (!existing || existing.status === 'deleted') {
    return { ok: false as const, status: 404 as const };
  }

  await prisma.guide.update({
    where: { id },
    data: { status: 'deleted' },
  });

  await removeSearchDocument('guides', id);

  return { ok: true as const };
}
