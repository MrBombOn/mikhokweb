import { Prisma, type UserRole } from '@prisma/client';
import { prisma } from '@/lib/db';
import { canManageNews } from '@/lib/auth/current-user';
import { galleryFolderToDto, galleryItemToDto } from '@/lib/mappers/gallery';
import type { z } from 'zod';
import { patchGalleryItemSchema, type CreateGalleryItemInput } from '@/lib/validation/gallery';

export function parseGalleryItemId(raw: string): number | null {
  const n = Number(raw);
  return Number.isInteger(n) && n > 0 ? n : null;
}

export async function listGalleryForRole(role?: UserRole) {
  const canManage = role && canManageNews(role);

  const folders = await prisma.galleryFolder.findMany({
    orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }],
  });

  const itemWhere: Prisma.GalleryItemWhereInput = canManage ? { status: { not: 'deleted' } } : { status: 'published' };

  const items = await prisma.galleryItem.findMany({
    where: itemWhere,
    orderBy: [{ listDate: 'desc' }, { sortOrder: 'asc' }, { id: 'desc' }],
  });

  return {
    folders: folders.map(galleryFolderToDto),
    items: items.map(galleryItemToDto),
  };
}

export async function createGalleryItem(data: CreateGalleryItemInput) {
  const folder = await prisma.galleryFolder.findUnique({ where: { id: data.folderId } });
  if (!folder) {
    return { ok: false as const, status: 400 as const, error: 'A mappa nem létezik.' };
  }

  const row = await prisma.galleryItem.create({
    data: {
      folderId: data.folderId,
      titleHu: data.titleHu,
      titleEn: data.titleEn,
      listDate: data.listDate,
      imageUrl: data.imageUrl,
      thumbnailUrl: '',
      imageWidth: null,
      imageHeight: null,
      mimeType: null,
      fileSizeBytes: null,
      exifJson: Prisma.JsonNull,
      status: data.status,
      sortOrder: data.sortOrder,
    },
  });

  return { ok: true as const, item: galleryItemToDto(row) };
}

export async function getGalleryItemDto(id: number, role?: UserRole) {
  const row = await prisma.galleryItem.findUnique({ where: { id } });
  if (!row || row.status === 'deleted') {
    return { ok: false as const, status: 404 as const };
  }

  const guest = !role || !canManageNews(role);
  if (guest && row.status !== 'published') {
    return { ok: false as const, status: 404 as const };
  }

  return { ok: true as const, item: galleryItemToDto(row) };
}

type PatchGalleryInput = z.infer<typeof patchGalleryItemSchema>;

export async function patchGalleryItem(id: number, patch: PatchGalleryInput) {
  const existing = await prisma.galleryItem.findUnique({ where: { id } });
  if (!existing || existing.status === 'deleted') {
    return { ok: false as const, status: 404 as const, error: 'Nem található.' };
  }

  if (patch.folderId !== undefined) {
    const folder = await prisma.galleryFolder.findUnique({ where: { id: patch.folderId } });
    if (!folder) {
      return { ok: false as const, status: 400 as const, error: 'A mappa nem létezik.' };
    }
  }

  const updateData: Prisma.GalleryItemUncheckedUpdateInput = {};
  if (patch.folderId !== undefined) updateData.folderId = patch.folderId;
  if (patch.titleHu !== undefined) updateData.titleHu = patch.titleHu;
  if (patch.titleEn !== undefined) updateData.titleEn = patch.titleEn;
  if (patch.listDate !== undefined) updateData.listDate = patch.listDate;
  if (patch.imageUrl !== undefined) updateData.imageUrl = patch.imageUrl;
  if (patch.imageUrl !== undefined && patch.imageUrl.trim() === '') {
    updateData.thumbnailUrl = '';
    updateData.imageWidth = null;
    updateData.imageHeight = null;
    updateData.mimeType = null;
    updateData.fileSizeBytes = null;
    updateData.exifJson = Prisma.JsonNull;
  }
  if (patch.status !== undefined) updateData.status = patch.status;
  if (patch.sortOrder !== undefined) updateData.sortOrder = patch.sortOrder;

  if (Object.keys(updateData).length === 0) {
    return { ok: false as const, status: 400 as const, error: 'Nincs frissítendő mező.' };
  }

  const row = await prisma.galleryItem.update({
    where: { id },
    data: updateData,
  });

  return { ok: true as const, item: galleryItemToDto(row) };
}

export async function softDeleteGalleryItem(id: number) {
  const existing = await prisma.galleryItem.findUnique({ where: { id } });
  if (!existing || existing.status === 'deleted') {
    return { ok: false as const, status: 404 as const };
  }

  await prisma.galleryItem.update({
    where: { id },
    data: { status: 'deleted' },
  });

  return { ok: true as const };
}
