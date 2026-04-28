/**
 * @file Hír sor → `NewsItem` leképezés
 *
 * @description
 * A bemenet a Prisma `News` modell sora (`@prisma/client`). A kimenet a
 * `types/news` közös UI/API alakja: mezőnevek és típusok egyeztetése (pl.
 * `listDate` → `date`, borító szín normalizálása).
 */
import type { News as PrismaNews } from '@prisma/client';
import type { CoverTone, NewsItem } from '@/types/news';

const COVERS: CoverTone[] = ['blue', 'pink', 'teal', 'gold'];

/** A tárolt `cover` sztringet a megengedett `CoverTone` halmazra szűkíti. */
function normalizeCover(c: string): CoverTone {
  return COVERS.includes(c as CoverTone) ? (c as CoverTone) : 'blue';
}

/**
 * Prisma sor → API / kliens `NewsItem`.
 * @param row `News` tábla sora (listázás vagy create/update visszatérési érték)
 */
export function newsRowToItem(row: PrismaNews): NewsItem {
  return {
    id: row.id,
    source: row.source,
    category: row.category,
    status: row.status as NewsItem['status'],
    pinned: row.pinned,
    date: row.listDate,
    titleHu: row.titleHu,
    titleEn: row.titleEn,
    textHu: row.textHu,
    textEn: row.textEn,
    author: row.author,
    cover: normalizeCover(row.cover),
    hasCover: row.hasCover,
    scheduledFor: row.scheduledFor ?? undefined,
    archived: row.status === 'archived',
    externalUrl: row.externalUrl ?? undefined,
  };
}
