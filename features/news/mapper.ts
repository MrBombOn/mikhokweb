import type { News as PrismaNews } from '@prisma/client';
import type { CoverTone, NewsItem } from './types';

const COVERS: CoverTone[] = ['blue', 'pink', 'teal', 'gold'];

function normalizeCover(c: string): CoverTone {
  return COVERS.includes(c as CoverTone) ? (c as CoverTone) : 'blue';
}

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

