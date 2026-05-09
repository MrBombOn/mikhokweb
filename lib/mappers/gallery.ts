import type { GalleryFolder, GalleryItem } from '@prisma/client';
import type { GalleryFolderDto, GalleryItemDto, GalleryItemStatus } from '@/types/gallery';

export function galleryFolderToDto(row: GalleryFolder): GalleryFolderDto {
  return {
    id: row.id,
    name: row.name,
    sortOrder: row.sortOrder,
  };
}

export function galleryItemToDto(row: GalleryItem): GalleryItemDto {
  return {
    id: row.id,
    folderId: row.folderId,
    titleHu: row.titleHu,
    titleEn: row.titleEn,
    date: row.listDate,
    imageUrl: row.imageUrl,
    thumbnailUrl: row.thumbnailUrl,
    imageWidth: row.imageWidth,
    imageHeight: row.imageHeight,
    mimeType: row.mimeType,
    fileSizeBytes: row.fileSizeBytes,
    status: row.status as GalleryItemStatus,
  };
}
