import { forbidden, ok } from '@/lib/api/response';
import { canManageNews, getCurrentUser } from '@/lib/auth/current-user';
import { prisma } from '@/lib/db';
import { isFeatureEnabled } from '@/lib/feature-flags/registry';

export async function GET() {
  if (!isFeatureEnabled('officeHistoryPanel')) {
    return forbidden('A funkció jelenleg le van tiltva.');
  }

  const user = await getCurrentUser();
  if (!user || !canManageNews(user.role)) {
    return forbidden();
  }

  const rows = await prisma.auditLog.findMany({
    where: { entityType: 'office_snapshot', action: 'patch_office_snapshot' },
    orderBy: { createdAt: 'desc' },
    take: 50,
    select: {
      id: true,
      action: true,
      details: true,
      actorName: true,
      actorRole: true,
      createdAt: true,
    },
  });

  return ok({
    items: rows.map((row) => ({
      id: row.id,
      action: row.action,
      details: row.details,
      actorName: row.actorName,
      actorRole: row.actorRole,
      createdAt: row.createdAt.toISOString(),
    })),
  });
}
