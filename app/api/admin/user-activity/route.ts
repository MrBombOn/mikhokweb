import { forbidden, ok } from '@/lib/api/response';
import { canManageNews, getCurrentUser } from '@/lib/auth/current-user';
import { prisma } from '@/lib/db';

export async function GET(request: Request) {
  const user = await getCurrentUser();
  if (!user || !canManageNews(user.role)) return forbidden();

  const url = new URL(request.url);
  const days = Math.min(30, Math.max(1, Number(url.searchParams.get('days') ?? '7')));
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

  const rows = await prisma.auditLog.findMany({
    where: { createdAt: { gte: since } },
    orderBy: [{ createdAt: 'desc' }],
    take: 500,
    select: { actorId: true, actorName: true, actorRole: true, action: true, createdAt: true },
  });

  const byActor = new Map<
    string,
    {
      actorId: string | null;
      actorName: string;
      actorRole: string;
      totalActions: number;
      lastActionAt: Date;
      topActions: Record<string, number>;
    }
  >();

  for (const r of rows) {
    const key = `${r.actorId ?? 'unknown'}:${r.actorName}:${r.actorRole}`;
    const current =
      byActor.get(key) ??
      {
        actorId: r.actorId,
        actorName: r.actorName,
        actorRole: r.actorRole,
        totalActions: 0,
        lastActionAt: r.createdAt,
        topActions: {},
      };
    current.totalActions += 1;
    if (r.createdAt > current.lastActionAt) current.lastActionAt = r.createdAt;
    current.topActions[r.action] = (current.topActions[r.action] ?? 0) + 1;
    byActor.set(key, current);
  }

  const items = [...byActor.values()]
    .sort((a, b) => b.totalActions - a.totalActions)
    .slice(0, 20)
    .map((r) => ({
      actorId: r.actorId,
      actorName: r.actorName,
      actorRole: r.actorRole,
      totalActions: r.totalActions,
      lastActionAt: r.lastActionAt.toISOString(),
      topActions: Object.entries(r.topActions)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([action, count]) => ({ action, count })),
    }));

  return ok({
    days,
    from: since.toISOString(),
    items,
  });
}

