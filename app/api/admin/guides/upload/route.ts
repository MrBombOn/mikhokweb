import { badRequest, forbidden, ok } from '@/lib/api/response';
import { writeAudit } from '@/lib/audit/write-audit';
import { canManageNews, getCurrentUser } from '@/lib/auth/current-user';
import { prisma } from '@/lib/db';
import { createGuideRevision } from '@/lib/guides/revision';
import { saveGuideDocument } from '@/lib/media/guides-upload';
import { apiRequestLog } from '@/lib/observability/api-request-log';
import { enforceSameOrigin } from '@/lib/security/csrf';

function parseGuideId(v: FormDataEntryValue | null): number | null {
  if (typeof v !== 'string') return null;
  const n = Number(v);
  return Number.isInteger(n) && n > 0 ? n : null;
}

export async function POST(request: Request) {
  const log = apiRequestLog(request, 'api.admin.guides.upload.post');
  const csrf = enforceSameOrigin(request);
  if (csrf) return log.wrap(csrf);

  const user = await getCurrentUser();
  if (!user || !canManageNews(user.role)) return log.wrap(forbidden());

  const form = await request.formData().catch(() => null);
  if (!form) return log.wrap(badRequest('Érvénytelen form-data.'));
  const guideId = parseGuideId(form.get('guideId'));
  if (!guideId) return log.wrap(badRequest('Hiányzó vagy hibás guideId.'));

  const guide = await prisma.guide.findUnique({ where: { id: guideId } });
  if (!guide || guide.status === 'deleted') return log.wrap(badRequest('Az útmutató nem található.'));

  const file = form.get('file');
  if (!(file instanceof File)) return log.wrap(badRequest('Hiányzó dokumentum fájl.'));
  let uploaded;
  try {
    uploaded = await saveGuideDocument(file, guide.titleHu);
  } catch (err) {
    log.warn('admin_guide_upload_save_failed', { actorId: user.id, guideId });
    return log.wrap(badRequest(err instanceof Error ? err.message : 'Dokumentum feltöltési hiba.'));
  }

  const row = await prisma.guide.update({
    where: { id: guideId },
    data: {
      documentUrl: uploaded.documentUrl,
      documentType: uploaded.attachmentMime,
      attachmentName: uploaded.attachmentName,
      attachmentMime: uploaded.attachmentMime,
      attachmentSizeBytes: uploaded.attachmentSizeBytes,
    },
  });

  await createGuideRevision(guideId, {
    reason: 'attachment_upload',
    snapshot: {
      documentUrl: row.documentUrl,
      documentType: row.documentType,
      attachmentName: row.attachmentName,
      attachmentMime: row.attachmentMime,
      attachmentSizeBytes: row.attachmentSizeBytes,
    },
  });

  await writeAudit({
    actor: user,
    action: 'upload_guide_attachment',
    entityType: 'guide',
    entityId: String(guideId),
    details: `file=${file.name};size=${file.size};mime=${file.type}`,
  });

  log.info('admin_guide_attachment_uploaded', { actorId: user.id, guideId, bytes: file.size });
  return log.wrap(
    ok({
      item: {
        id: row.id,
        documentUrl: row.documentUrl,
        documentType: row.documentType,
        attachmentName: row.attachmentName,
        attachmentMime: row.attachmentMime,
        attachmentSizeBytes: row.attachmentSizeBytes,
      },
    }),
  );
}

