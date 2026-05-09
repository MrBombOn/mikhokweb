/**
 * Központi feltöltési limitek és MIME allowlist (§12 Fázis 15).
 */

export const GALLERY_IMAGE_MAX_BYTES = 12 * 1024 * 1024;
export const GALLERY_IMAGE_ALLOWED_MIME = new Set(['image/jpeg', 'image/png', 'image/webp']);

export const GUIDE_DOCUMENT_MAX_BYTES = 25 * 1024 * 1024;
export const GUIDE_DOCUMENT_ALLOWED_MIME = new Set([
  'application/pdf',
  'text/plain',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);

export function assertGalleryImageUpload(file: Pick<File, 'type' | 'size' | 'name'>): void {
  const mime = file.type?.trim().toLowerCase();
  if (!mime || !GALLERY_IMAGE_ALLOWED_MIME.has(mime)) {
    throw new Error('Nem támogatott képformátum. Csak JPG, PNG vagy WEBP tölthető fel.');
  }
  if (file.size <= 0 || file.size > GALLERY_IMAGE_MAX_BYTES) {
    throw new Error('A kép mérete 1 byte és 12 MB között lehet.');
  }
}

export function assertGuideDocumentUpload(file: Pick<File, 'type' | 'size' | 'name'>): void {
  const mime = file.type?.trim().toLowerCase();
  if (!mime || !GUIDE_DOCUMENT_ALLOWED_MIME.has(mime)) {
    throw new Error('Nem támogatott dokumentum típus.');
  }
  if (file.size <= 0 || file.size > GUIDE_DOCUMENT_MAX_BYTES) {
    throw new Error('A dokumentum mérete 1 byte és 25 MB között lehet.');
  }
}
