import path from 'node:path';
import { persistPublicUpload } from '@/lib/media/storage-write';
import { assertGuideDocumentUpload } from '@/lib/media/upload-policy';

function sanitizeBase(text: string): string {
  const base = text
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 72);
  return base || 'guide-doc';
}

function guessExt(file: File): string {
  const fromName = path.extname(file.name || '').toLowerCase();
  if (fromName) return fromName;
  if (file.type === 'application/pdf') return '.pdf';
  if (file.type === 'text/plain') return '.txt';
  if (file.type === 'application/msword') return '.doc';
  if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') return '.docx';
  return '.bin';
}

export async function saveGuideDocument(file: File, titleSeed: string) {
  assertGuideDocumentUpload(file);

  const mime = file.type?.trim().toLowerCase() as string;
  const bytes = Buffer.from(await file.arrayBuffer());
  const now = new Date();
  const yyyy = String(now.getUTCFullYear());
  const mm = String(now.getUTCMonth() + 1).padStart(2, '0');
  const nonce = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const fileName = `${sanitizeBase(titleSeed)}-${nonce}${guessExt(file)}`;

  const relKey = path.posix.join('uploads', 'guides', yyyy, mm, fileName);
  const persisted = await persistPublicUpload(relKey, bytes, mime, 'guides');

  return {
    documentUrl: persisted.publicUrl,
    attachmentName: file.name,
    attachmentMime: mime,
    attachmentSizeBytes: file.size,
  };
}
