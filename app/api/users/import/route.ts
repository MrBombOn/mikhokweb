/**
 * @file REST: felhasználók tömeges import (POST, ADMIN).
 */
import { prisma } from '@/lib/db';
import { getCurrentUser, isAdmin } from '@/lib/auth/current-user';
import { hashPassword } from '@/lib/auth/password';
import { badRequest, forbidden, ok } from '@/lib/api/response';
import { enforceSameOrigin } from '@/lib/security/csrf';
import { writeAudit } from '@/lib/audit/write-audit';
import { bulkImportUsersSchema } from '@/lib/validation/users';
import { dispatchStaffNotification } from '@/lib/notifications/staff-dispatch';

export async function POST(request: Request) {
  const csrf = enforceSameOrigin(request);
  if (csrf) return csrf;

  const actor = await getCurrentUser();
  if (!actor || !isAdmin(actor.role)) {
    return forbidden();
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return badRequest('Érvénytelen JSON.');
  }

  const parsed = bulkImportUsersSchema.safeParse(body);
  if (!parsed.success) {
    return badRequest('Validációs hiba', parsed.error.flatten());
  }

  const created: Array<{ id: string; username: string; role: string }> = [];
  const skipped: Array<{ username: string; reason: string }> = [];

  for (const item of parsed.data.items) {
    const username = item.username.trim();
    const exists = await prisma.user.findUnique({ where: { username } });
    if (exists) {
      skipped.push({ username, reason: 'duplicate' });
      continue;
    }
    try {
      const passwordHash = await hashPassword(item.password);
      const row = await prisma.user.create({
        data: { username, passwordHash, role: item.role },
        select: { id: true, username: true, role: true },
      });
      created.push(row);
    } catch {
      skipped.push({ username, reason: 'error' });
    }
  }

  await writeAudit({
    actor,
    action: 'bulk_import_users',
    entityType: 'user',
    entityId: 'batch',
    details: `created=${created.length},skipped=${skipped.length}`,
  });

  dispatchStaffNotification({
    eventKey: 'bulk_import_users',
    severity: created.length ? 'warning' : 'info',
    titleHu: 'Felhasználó tömeges import',
    titleEn: 'Bulk user import',
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
