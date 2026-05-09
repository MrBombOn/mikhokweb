/**
 * @file CSV export az audit naplóból (ADMIN) – ugyanazok a szűrők mint a `GET /api/audit`.
 */
import { prisma } from '@/lib/db';
import { getCurrentUser, isAdmin } from '@/lib/auth/current-user';
import { writeAudit } from '@/lib/audit/write-audit';
import { buildAuditWhere, parseAuditExportParams } from '@/lib/audit/audit-list-params';
import { dispatchStaffNotification } from '@/lib/notifications/staff-dispatch';
import { evaluateAuditExportAlerts } from '@/lib/audit/export-alerts';

function csvEscape(value: string) {
  return `"${String(value).replace(/"/g, '""')}"`;
}

export async function GET(request: Request) {
  const user = await getCurrentUser();
  if (!user || !isAdmin(user.role)) {
    return new Response('Forbidden', { status: 403 });
  }

  const url = new URL(request.url);
  const p = parseAuditExportParams(url.searchParams);
  const where = buildAuditWhere(p);

  const rows = await prisma.auditLog.findMany({
    where,
    orderBy: [{ createdAt: p.sort }, { id: p.sort }],
    take: p.exportLimit,
  });

  await writeAudit({
    actor: user,
    action: 'export_audit_csv',
    entityType: 'audit',
    entityId: 'export',
    details: `rows=${rows.length}`,
  });

  dispatchStaffNotification({
    eventKey: 'audit_csv_export',
    severity: 'warning',
    titleHu: 'Audit CSV export',
    titleEn: 'Audit CSV export',
    bodyHu: `${user.username} letöltött ${rows.length} sort.`,
    bodyEn: `${user.username} exported ${rows.length} rows.`,
    meta: { actorId: user.id, rows: rows.length },
  });
  await evaluateAuditExportAlerts({ actorId: user.id, actorName: user.username, rows: rows.length });

  const headers = ['id', 'actorId', 'actorName', 'actorRole', 'action', 'entityType', 'entityId', 'details', 'createdAt'];
  const body = rows
    .map((r) =>
      [
        String(r.id),
        r.actorId ?? '',
        r.actorName,
        r.actorRole,
        r.action,
        r.entityType,
        r.entityId,
        r.details,
        r.createdAt.toISOString(),
      ].map((c) => csvEscape(c)).join(','),
    )
    .join('\n');
  const csv = `\uFEFF${headers.join(',')}\n${body}\n`;

  const ts = new Date().toISOString().slice(0, 10);
  return new Response(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="audit-export-${ts}.csv"`,
    },
  });
}
