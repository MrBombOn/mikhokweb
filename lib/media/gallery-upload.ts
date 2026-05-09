import path from 'node:path';
import sharp from 'sharp';
import { persistPublicUpload } from '@/lib/media/storage-write';
import { assertGalleryImageUpload } from '@/lib/media/upload-policy';

export type UploadedGalleryAsset = {
  imageUrl: string;
  thumbnailUrl: string;
  imageWidth: number | null;
  imageHeight: number | null;
  mimeType: string;
  fileSizeBytes: number;
  exifJson: Record<string, unknown> | null;
};

function safeSlug(text: string): string {
  const base = text
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
  return base || 'gallery';
}

function extByMime(mime: string): '.jpg' | '.png' | '.webp' {
  if (mime === 'image/png') return '.png';
  if (mime === 'image/webp') return '.webp';
  return '.jpg';
}

export async function saveGalleryUpload(file: File, titleSeed: string): Promise<UploadedGalleryAsset> {
  assertGalleryImageUpload(file);

  const mime = file.type?.trim().toLowerCase() as string;
  const bytes = Buffer.from(await file.arrayBuffer());
  const now = new Date();
  const yy = String(now.getUTCFullYear());
  const mm = String(now.getUTCMonth() + 1).padStart(2, '0');
  const nonce = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const base = `${safeSlug(titleSeed)}-${nonce}`;
  const ext = extByMime(mime);
  const fileName = `${base}${ext}`;
  const thumbName = `${base}-thumb.webp`;

  const relativeDir = path.posix.join('uploads', 'gallery', yy, mm);
  const imageKey = path.posix.join(relativeDir, fileName);
  const thumbKey = path.posix.join(relativeDir, thumbName);

  const meta = await sharp(bytes).metadata();
  const thumbBuf = await sharp(bytes)
    .resize({ width: 640, height: 640, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 78 })
    .toBuffer();

  const imagePersist = await persistPublicUpload(imageKey, bytes, mime, 'gallery');
  const thumbPersist = await persistPublicUpload(thumbKey, thumbBuf, 'image/webp', 'gallery');

  const exifJson: Record<string, unknown> = {};
  if (meta.orientation != null) exifJson.orientation = meta.orientation;
  if (meta.density != null) exifJson.density = meta.density;
  if (meta.space != null) exifJson.colorSpace = meta.space;

  return {
    imageUrl: imagePersist.publicUrl,
    thumbnailUrl: thumbPersist.publicUrl,
    imageWidth: meta.width ?? null,
    imageHeight: meta.height ?? null,
    mimeType: mime,
    fileSizeBytes: file.size,
    exifJson: Object.keys(exifJson).length ? exifJson : null,
  };
}
