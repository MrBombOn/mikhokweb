/**
 * @file S3-kompatibilis presigned PUT – közvetlen böngésző feltöltéshez (Fázis 15).
 */
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { canManageNews, getCurrentUser } from '@/lib/auth/current-user';
import { apiRequestLog } from '@/lib/observability/api-request-log';
import { enforceSameOrigin } from '@/lib/security/csrf';
import { GALLERY_IMAGE_ALLOWED_MIME, GALLERY_IMAGE_MAX_BYTES, GUIDE_DOCUMENT_ALLOWED_MIME, GUIDE_DOCUMENT_MAX_BYTES } from '@/lib/media/upload-policy';
import { getStorageDriver, requireS3ConfigForUpload } from '@/lib/media/storage-config';
import { presignPutUpload } from '@/lib/media/s3-presigned';
import path from 'node:path';

const bodySchema = z.object({
  purpose: z.enum(['gallery', 'guides']),
  filename: z.string().min(1).max(220),
  contentType: z.string().min(3).max(120),
  contentLength: z.number().int().positive(),
});

function sanitizeFilename(name: string): string {
  const base = path.basename(name).replace(/[^a-zA-Z0-9._-]+/g, '-').slice(0, 120);
  return base || 'upload.bin';
}

export async function POST(request: Request) {
  const log = apiRequestLog(request, 'api.admin.storage.presign_put.post');
  const csrf = enforceSameOrigin(request);
  if (csrf) return log.wrap(csrf);

  const user = await getCurrentUser();
  if (!user || !canManageNews(user.role)) {
    return log.wrap(NextResponse.json({ error: 'Nincs jogosultság.' }, { status: 403 }));
  }

  if (getStorageDriver() !== 's3') {
    return log.wrap(NextResponse.json({ error: 'Presigned upload csak STORAGE_DRIVER=s3 mellett érhető el.' }, { status: 400 }));
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return log.wrap(NextResponse.json({ error: 'Érvénytelen JSON.' }, { status: 400 }));
  }

  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return log.wrap(NextResponse.json({ error: 'Validációs hiba', details: parsed.error.flatten() }, { status: 400 }));
  }

  const { purpose, filename, contentType, contentLength } = parsed.data;
  const mime = contentType.trim().toLowerCase();
  if (purpose === 'gallery') {
    if (!GALLERY_IMAGE_ALLOWED_MIME.has(mime)) {
      return log.wrap(NextResponse.json({ error: 'Nem engedélyezett MIME a galériához.' }, { status: 400 }));
    }
    if (contentLength > GALLERY_IMAGE_MAX_BYTES) {
      return log.wrap(NextResponse.json({ error: 'Túl nagy fájl (galéria).' }, { status: 400 }));
    }
  } else {
    if (!GUIDE_DOCUMENT_ALLOWED_MIME.has(mime)) {
      return log.wrap(NextResponse.json({ error: 'Nem engedélyezett MIME az útmutatóhoz.' }, { status: 400 }));
    }
    if (contentLength > GUIDE_DOCUMENT_MAX_BYTES) {
      return log.wrap(NextResponse.json({ error: 'Túl nagy fájl (útmutató).' }, { status: 400 }));
    }
  }

  const now = new Date();
  const yy = String(now.getUTCFullYear());
  const mm = String(now.getUTCMonth() + 1).padStart(2, '0');
  const nonce = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  const safeName = sanitizeFilename(filename);
  const prefix = purpose === 'gallery' ? 'uploads/gallery' : 'uploads/guides';
  const key = `${prefix}/${yy}/${mm}/${nonce}-${safeName}`;

  try {
    const putUrl = await presignPutUpload(key, mime, contentLength);
    const cfg = requireS3ConfigForUpload();
    const publicUrl = `${cfg.publicBaseUrl}/${key}`;
    log.info('storage_presign_put', { actorId: user.id, purpose, key });
    return log.wrap(NextResponse.json({ putUrl, method: 'PUT' as const, key, publicUrl, headers: { 'Content-Type': mime } }));
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Presign hiba';
    return log.wrap(NextResponse.json({ error: msg }, { status: 500 }));
  }
}
