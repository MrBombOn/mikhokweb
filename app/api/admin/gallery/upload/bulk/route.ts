import { Prisma } from '@prisma/client';
import { badRequest, forbidden, ok } from '@/lib/api/response';
import { writeAudit } from '@/lib/audit/write-audit';
import { canManageNews, getCurrentUser } from '@/lib/auth/current-user';
import { prisma } from '@/lib/db';
import { saveGalleryUpload } from '@/lib/media/gallery-upload';
import { apiRequestLog } from '@/lib/observability/api-request-log';
import { enforceSameOrigin } from '@/lib/security/csrf';

function parseFolderId(v: FormDataEntryValue | null): number | null {
  if (typeof v !== 'string') return null;
  const n = Number(v);
  if (!Number.isInteger(n) || n <= 0) return null;
  return n;
}

export async function POST(request: Request) {
  const log = apiRequestLog(request, 'api.admin.gallery.upload.bulk.post');
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

  const files = form.getAll('files').filter((v): v is File => v instanceof File);
  if (!files.length) return log.wrap(badRequest('Nincs feltöltendő fájl.'));
  if (files.length > 20) return log.wrap(badRequest('Egy bulk kérésben legfeljebb 20 fájl engedélyezett.'));

  const listDateRaw = typeof form.get('listDate') === 'string' ? String(form.get('listDate')).trim() : '';
  const listDate = /^\d{4}-\d{2}-\d{2}$/.test(listDateRaw) ? listDateRaw : new Date().toISOString().slice(0, 10);

  const createdIds: number[] = [];
  for (const file of files) {
    const baseTitle = file.name.replace(/\.[^.]+$/, '');
    const uploaded = await saveGalleryUpload(file, baseTitle);
    const row = await prisma.galleryItem.create({
      data: {
        folderId,
        titleHu: baseTitle,
        titleEn: baseTitle,
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
    createdIds.push(row.id);
  }

  await writeAudit({
    actor: user,
    action: 'bulk_upload_gallery_items',
    entityType: 'gallery_item',
    entityId: String(createdIds[0] ?? 0),
    details: `folder=${folderId};count=${createdIds.length};ids=${createdIds.join(',')}`,
  });

  log.info('admin_gallery_bulk_uploaded', { actorId: user.id, folderId, createdCount: createdIds.length });
  return log.wrap(ok({ createdCount: createdIds.length, ids: createdIds }));
}

