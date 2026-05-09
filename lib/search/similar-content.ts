import { prisma } from '@/lib/db';

export type SimilarHit = {
  module: 'news' | 'guides';
  id: number;
  titleHu: string;
  titleEn: string;
  hrefHint: string;
};

/**
 * Szerkesztőknek: a központi `SearchDocument` index alapján (searchBlob kisbetűs) részszöveg-egyezés.
 */
export async function findSimilarPublishedTitles(needle: string, limit = 8): Promise<SimilarHit[]> {
  const q = needle.trim().toLowerCase();
  if (q.length < 3) return [];

  const rows = await prisma.searchDocument.findMany({
    where: {
      module: { in: ['news', 'guides'] },
      searchBlob: { contains: q },
    },
    take: limit,
    orderBy: [{ listDate: 'desc' }, { entityId: 'desc' }],
    select: {
      module: true,
      entityId: true,
      titleHu: true,
      titleEn: true,
      hrefPath: true,
    },
  });

  return rows.map((row) => ({
    module: row.module as 'news' | 'guides',
    id: row.entityId,
    titleHu: row.titleHu,
    titleEn: row.titleEn,
    hrefHint: row.hrefPath,
  }));
}
