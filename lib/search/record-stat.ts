import { prisma } from '@/lib/db';
import { normalizeQueryForStat } from '@/lib/search/normalize-query-stat';

export async function recordSearchQueryStat(rawQuery: string, zeroResults: boolean): Promise<void> {
  const norm = normalizeQueryForStat(rawQuery);
  if (!norm) return;

  const day = new Date().toISOString().slice(0, 10);

  const existing = await prisma.searchQueryStat.findUnique({
    where: { day_queryNormalized: { day, queryNormalized: norm } },
  });

  if (existing) {
    await prisma.searchQueryStat.update({
      where: { id: existing.id },
      data: {
        searchCount: { increment: 1 },
        ...(zeroResults ? { zeroResultCount: { increment: 1 } } : {}),
      },
    });
    return;
  }

  await prisma.searchQueryStat.create({
    data: {
      day,
      queryNormalized: norm,
      searchCount: 1,
      zeroResultCount: zeroResults ? 1 : 0,
    },
  });
}
