/** Galéria – API és UI közös DTO (Fázis 7). */

export type GalleryItemStatus = 'published' | 'draft' | 'scheduled' | 'archived' | 'deleted';

export type GalleryFolderDto = {
  id: number;
  name: string;
  sortOrder: number;
};

export type GalleryItemDto = {
  id: number;
  folderId: number;
  titleHu: string;
  titleEn: string;
  /** YYYY-MM-DD */
  date: string;
  imageUrl: string;
  thumbnailUrl: string;
  imageWidth: number | null;
  imageHeight: number | null;
  mimeType: string | null;
  fileSizeBytes: number | null;
  status: GalleryItemStatus;
};
