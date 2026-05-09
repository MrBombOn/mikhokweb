import { NextResponse } from 'next/server';
import { badRequest, forbidden, notFound } from '@/lib/api/response';
import { getCurrentUser, isAdmin } from '@/lib/auth/current-user';
import { writeAudit } from '@/lib/audit/write-audit';
import { apiRequestLog } from '@/lib/observability/api-request-log';
import { enforceSameOrigin } from '@/lib/security/csrf';
import { canDeleteStaffUser } from '@/lib/privacy/can-delete-staff-user';
import { prisma } from '@/lib/db';

type Ctx = { params: Promise<{ id: string }> };

export async function DELETE(request: Request, context: Ctx) {
  const log = apiRequestLog(request, 'api.admin.privacy.delete_user');
  const csrf = enforceSameOrigin(request);
  if (csrf) return log.wrap(csrf);

  const actor = await getCurrentUser();
  if (!actor || !isAdmin(actor.role)) return log.wrap(forbidden());

  const { id } = await context.params;
  const targetId = id?.trim();
  if (!targetId) return log.wrap(notFound());

  const gate = await canDeleteStaffUser(targetId);
  if (!gate.ok) {
    if (gate.code === 'not_found') return log.wrap(notFound());
    return log.wrap(badRequest('Az utolsó ADMIN fiók nem törölhető.'));
  }

  await writeAudit({
    actor,
    action: 'delete_user_gdpr',
    entityType: 'user',
    entityId: targetId,
    details: `staff account removed by admin`,
  });

  await prisma.user.delete({ where: { id: targetId } });
  log.info('admin_privacy_delete_user', { actorId: actor.id, targetUserId: targetId });
  return log.wrap(NextResponse.json({ ok: true }));
}
