/**
 * @file Staff értesítések listája (GET).
 */
import { prisma } from '@/lib/db';
import { canManageNews, getCurrentUser } from '@/lib/auth/current-user';
import { forbidden, ok } from '@/lib/api/response';

export async function GET(request: Request) {
  const user = await getCurrentUser();
  if (!user || !canManageNews(user.role)) {
    return forbidden();
  }

  const url = new URL(request.url);
  const unreadOnly = url.searchParams.get('unreadOnly') === '1';
  const limit = Math.min(100, Math.max(5, Number(url.searchParams.get('limit') ?? '30')));

  const where = {
    userId: user.id,
    ...(unreadOnly ? { readAt: null } : {}),
  };

  const [items, unreadCount] = await Promise.all([
    prisma.staffNotification.findMany({
      where,
      orderBy: [{ createdAt: 'desc' }],
      take: Number.isFinite(limit) ? limit : 30,
    }),
    prisma.staffNotification.count({ where: { userId: user.id, readAt: null } }),
  ]);

  return ok({
    items: items.map((r) => ({
      id: r.id,
      eventKey: r.eventKey,
      severity: r.severity,
      titleHu: r.titleHu,
      titleEn: r.titleEn,
      bodyHu: r.bodyHu,
      bodyEn: r.bodyEn,
      meta: r.meta,
      readAt: r.readAt?.toISOString() ?? null,
      createdAt: r.createdAt.toISOString(),
    })),
    unreadCount,
  });
}
