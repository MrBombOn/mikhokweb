import type { News as PrismaNews } from '@prisma/client';
import { getBaseUrl } from '@/lib/seo';
import type { CoverTone, NewsItem } from './types';

const COVERS: CoverTone[] = ['blue', 'pink', 'teal', 'gold'];

function normalizeCover(c: string): CoverTone {
  return COVERS.includes(c as CoverTone) ? (c as CoverTone) : 'blue';
}

export function newsRowToItem(row: PrismaNews): NewsItem {
  const slug = row.slug ?? undefined;
  const base = getBaseUrl().replace(/\/$/, '');
  const canonicalUrl =
    slug && row.status === 'published' ? `${base}/news/${slug}` : undefined;

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
    slug,
    canonicalUrl,
    coverAltHu: row.coverAltHu,
    coverAltEn: row.coverAltEn,
    scheduledFor: row.scheduledFor ?? undefined,
    archived: row.status === 'archived',
    externalUrl: row.externalUrl ?? undefined,
  };
}
