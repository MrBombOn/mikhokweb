/**
 * @file REST: kategóriák tömeges import (POST, OFFICE/ADMIN – `canManageNews`).
 */
import { prisma } from '@/lib/db';
import { canManageNews, getCurrentUser } from '@/lib/auth/current-user';
import { badRequest, forbidden, ok } from '@/lib/api/response';
import { enforceSameOrigin } from '@/lib/security/csrf';
import { writeAudit } from '@/lib/audit/write-audit';
import { bulkImportCategoriesSchema } from '@/lib/validation/categories';
import { dispatchStaffNotification } from '@/lib/notifications/staff-dispatch';

export async function POST(request: Request) {
  const csrf = enforceSameOrigin(request);
  if (csrf) return csrf;

  const actor = await getCurrentUser();
  if (!actor || !canManageNews(actor.role)) {
    return forbidden();
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return badRequest('Érvénytelen JSON.');
  }

  const parsed = bulkImportCategoriesSchema.safeParse(body);
  if (!parsed.success) {
    return badRequest('Validációs hiba', parsed.error.flatten());
  }

  const created: Array<{ id: number; scope: string; nameHu: string }> = [];
  const skipped: Array<{ index: number; reason: string }> = [];

  for (let i = 0; i < parsed.data.items.length; i += 1) {
    const item = parsed.data.items[i]!;
    try {
      const row = await prisma.category.create({
        data: {
          scope: item.scope,
          nameHu: item.nameHu.trim(),
          nameEn: item.nameEn.trim(),
          sortOrder: item.sortOrder,
          status: item.status,
        },
        select: { id: true, scope: true, nameHu: true },
      });
      created.push(row);
    } catch {
      skipped.push({ index: i, reason: 'error' });
    }
  }

  await writeAudit({
    actor,
    action: 'bulk_import_categories',
    entityType: 'category',
    entityId: 'batch',
    details: `created=${created.length},skipped=${skipped.length}`,
  });

  dispatchStaffNotification({
    eventKey: 'bulk_import_categories',
    severity: created.length ? 'info' : 'info',
    titleHu: 'Kategória tömeges import',
    titleEn: 'Bulk category import',
    bodyHu: `${actor.username}: létrehozva ${created.length}, kihagyva ${skipped.length}.`,
    bodyEn: `${actor.username}: created ${created.length}, skipped ${skipped.length}.`,
    meta: { actorId: actor.id, created: created.length, skipped: skipped.length },
  });

  return ok({
    created: created.length,
    skipped,
    items: created,
  });
}
