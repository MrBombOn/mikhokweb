import { NextResponse } from 'next/server';
import { forbidden, notFound } from '@/lib/api/response';
import { getCurrentUser, isAdmin } from '@/lib/auth/current-user';
import { writeAudit } from '@/lib/audit/write-audit';
import { apiRequestLog } from '@/lib/observability/api-request-log';
import { buildStaffUserDataExport } from '@/lib/privacy/staff-user-export';

type Ctx = { params: Promise<{ id: string }> };

export async function GET(request: Request, context: Ctx) {
  const log = apiRequestLog(request, 'api.admin.privacy.export_user');
  const actor = await getCurrentUser();
  if (!actor || !isAdmin(actor.role)) return log.wrap(forbidden());

  const { id } = await context.params;
  if (!id?.trim()) return log.wrap(notFound());

  const payload = await buildStaffUserDataExport(id.trim());
  if (!payload) return log.wrap(notFound());

  await writeAudit({
    actor,
    action: 'export_user_gdpr_json',
    entityType: 'user',
    entityId: id.trim(),
    details: 'staff data export',
  });

  const body = JSON.stringify(payload, null, 2);
  const filename = `gdpr-staff-export-${id.trim().slice(0, 12)}.json`;
  log.info('admin_privacy_export_user', { actorId: actor.id, targetUserId: id.trim() });
  return log.wrap(
    new NextResponse(body, {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    }),
  );
}
