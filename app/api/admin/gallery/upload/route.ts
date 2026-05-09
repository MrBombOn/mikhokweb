import { Prisma } from '@prisma/client';
import { badRequest, forbidden, ok } from '@/lib/api/response';
import { writeAudit } from '@/lib/audit/write-audit';
import { canManageNews, getCurrentUser } from '@/lib/auth/current-user';
import { prisma } from '@/lib/db';
import { saveGalleryUpload } from '@/lib/media/gallery-upload';
import { apiRequestLog } from '@/lib/observability/api-request-log';
import { enforceSameOrigin } from '@/lib/security/csrf';

function sanitizeTitle(value: FormDataEntryValue | null, fallback: string): string {
  if (typeof value !== 'string') return fallback;
  const t = value.trim();
  return t || fallback;
}

function parseFolderId(v: FormDataEntryValue | null): number | null {
  if (typeof v !== 'string') return null;
  const n = Number(v);
  if (!Number.isInteger(n) || n <= 0) return null;
  return n;
}

export async function POST(request: Request) {
  const log = apiRequestLog(request, 'api.admin.gallery.upload.post');
  const csrf = enforceSameOrigin(request);
  if (csrf) return log.wrap(csrf);

  const user = await getCurrentUser();
  if (!user || !canManageNews(user.role)) return log.wrap(forbidden());

  const form = await request.formData().catch(() => null);
  if (!form) return log.wrap(badRequest('Érvénytelen form-data kérés.'));

  const folderId = parseFolderId(form.get('folderId'));
  if (!folderId) return log.wrap(badRequest('Hiányzó vagy hibás folderId.'));
  const folder = await prisma.galleryFolder.findUnique({ where: { id: folderId } });
  if (!folder) return log.wrap(badRequest('A kiválasztott mappa nem létezik.'));

  const file = form.get('file');
  if (!(file instanceof File)) return log.wrap(badRequest('Hiányzó fájl.'));

  const titleHu = sanitizeTitle(form.get('titleHu'), file.name.replace(/\.[^.]+$/, ''));
  const titleEn = sanitizeTitle(form.get('titleEn'), titleHu);
  const listDateRaw = typeof form.get('listDate') === 'string' ? String(form.get('listDate')).trim() : '';
  const listDate = /^\d{4}-\d{2}-\d{2}$/.test(listDateRaw) ? listDateRaw : new Date().toISOString().slice(0, 10);

  let uploaded;
  try {
    uploaded = await saveGalleryUpload(file, titleHu);
  } catch (err) {
    log.warn('admin_gallery_upload_save_failed', { actorId: user.id, folderId });
    return log.wrap(badRequest(err instanceof Error ? err.message : 'A fájl feldolgozása sikertelen.'));
  }

  const row = await prisma.galleryItem.create({
    data: {
      folderId,
      titleHu,
      titleEn,
      listDate,
      imageUrl: uploaded.imageUrl,
      thumbnailUrl: uploaded.thumbnailUrl,
      imageWidth: uploaded.imageWidth,
      imageHeight: uploaded.imageHeight,
      mimeType: uploaded.mimeType,
      fileSizeBytes: uploaded.fileSizeBytes,
      exifJson: uploaded.exifJson ? (uploaded.exifJson as Prisma.InputJsonValue) : Prisma.JsonNull,
      status: 'published',
      sortOrder: 0,
    },
  });

  await writeAudit({
    actor: user,
    action: 'upload_gallery_item',
    entityType: 'gallery_item',
    entityId: String(row.id),
    details: `folder=${folderId};file=${file.name};size=${file.size}`,
  });

  log.info('admin_gallery_item_uploaded', { actorId: user.id, folderId, itemId: row.id });
  return log.wrap(
    ok({
    item: {
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
      status: row.status,
    },
  }),
  );
}

