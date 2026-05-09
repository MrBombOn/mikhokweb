/**
 * @file REST: audit napló stream – GET (ADMIN).
 */
import { prisma } from '@/lib/db';
import { getCurrentUser, isAdmin } from '@/lib/auth/current-user';
import { forbidden, ok } from '@/lib/api/response';
import { buildPageInfo } from '@/lib/api/page-info';
import { buildAuditWhere, parseAuditListParams } from '@/lib/audit/audit-list-params';

export async function GET(request: Request) {
  const user = await getCurrentUser();
  if (!user || !isAdmin(user.role)) {
    return forbidden();
  }

  const url = new URL(request.url);
  const p = parseAuditListParams(url.searchParams);
  const where = buildAuditWhere(p);

  const [rows, total] = await Promise.all([
    prisma.auditLog.findMany({
      where,
      orderBy: [{ createdAt: p.sort }, { id: p.sort }],
      skip: p.skip,
      take: p.limit,
    }),
    prisma.auditLog.count({ where }),
  ]);

  return ok({
    items: rows.map((r) => ({
      id: r.id,
      actorId: r.actorId,
      actorName: r.actorName,
      actorRole: r.actorRole,
      action: r.action,
      entityType: r.entityType,
      entityId: r.entityId,
      details: r.details,
      createdAt: r.createdAt.toISOString(),
    })),
    pageInfo: {
      ...buildPageInfo({ page: p.page, limit: p.limit, total, sort: p.sort }),
    },
  });
}
