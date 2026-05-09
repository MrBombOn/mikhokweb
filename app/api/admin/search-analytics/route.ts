/**
 * @file Keresési analytics (OFFICE/ADMIN) – aggregált nap + normalizált kulcs.
 */
import { prisma } from '@/lib/db';
import { forbidden, ok } from '@/lib/api/response';
import { canManageNews, getCurrentUser } from '@/lib/auth/current-user';
import { apiRequestLog } from '@/lib/observability/api-request-log';
import { enforceSameOrigin } from '@/lib/security/csrf';

export async function GET(request: Request) {
  const log = apiRequestLog(request, 'api.admin.search_analytics.get');
  const csrf = enforceSameOrigin(request);
  if (csrf) return log.wrap(csrf);

  const user = await getCurrentUser();
  if (!user || !canManageNews(user.role)) {
    return log.wrap(forbidden());
  }

  const url = new URL(request.url);
  const daysRaw = Number(url.searchParams.get('days') ?? '14');
  const days = Number.isInteger(daysRaw) && daysRaw >= 1 && daysRaw <= 90 ? daysRaw : 14;

  const since = new Date();
  since.setUTCHours(0, 0, 0, 0);
  since.setUTCDate(since.getUTCDate() - (days - 1));
  const sinceDay = since.toISOString().slice(0, 10);

  const rows = await prisma.searchQueryStat.findMany({
    where: { day: { gte: sinceDay } },
    orderBy: [{ searchCount: 'desc' }, { zeroResultCount: 'desc' }],
    take: 80,
  });

  const topQueries = rows
    .filter((r) => r.searchCount > 0)
    .slice(0, 40)
    .map((r) => ({
      query: r.queryNormalized,
      searchCount: r.searchCount,
      zeroResultCount: r.zeroResultCount,
      day: r.day,
    }));

  const zeroHeavy = rows
    .filter((r) => r.zeroResultCount > 0)
    .sort((a, b) => b.zeroResultCount - a.zeroResultCount)
    .slice(0, 25)
    .map((r) => ({
      query: r.queryNormalized,
      zeroResultCount: r.zeroResultCount,
      searchCount: r.searchCount,
      day: r.day,
    }));

  log.info('admin_search_analytics_loaded', { actorId: user.id, days });
  return log.wrap(ok({ days, sinceDay, topQueries, zeroResultQueries: zeroHeavy }));
}
