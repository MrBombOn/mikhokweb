import type { NewsItem } from './types';

const demoNews: NewsItem[] = [
  {
    id: 1,
    source: 'internal',
    category: 'Közélet',
    status: 'published',
    pinned: true,
    date: '2026-04-12',
    titleHu: 'Tavaszi kari fórum',
    titleEn: 'Spring faculty forum',
    textHu: 'A HÖK fórumot szervez a hallgatói visszajelzések összegyűjtésére.',
    textEn: 'The student union organizes a forum to gather student feedback.',
    author: 'MIK HÖK',
    cover: 'blue',
    hasCover: true,
    slug: 'tavaszi-kari-forum',
    canonicalUrl: 'https://example.invalid/news/tavaszi-kari-forum',
    coverAltHu: 'Hallgatók a kari fórumon',
    coverAltEn: 'Students at the faculty forum',
  },
  {
    id: 2,
    source: 'facebook',
    category: 'Közösség',
    status: 'published',
    pinned: false,
    date: '2026-04-10',
    titleHu: 'Facebook bejegyzés: közösségi program',
    titleEn: 'Facebook post: community event',
    textHu: 'Közösségi program ajánló a hivatalos Facebook kommunikációból.',
    textEn: 'Community event highlight coming from the official Facebook communication.',
    author: 'Facebook feed',
    cover: 'pink',
    hasCover: true,
    externalUrl: 'https://facebook.com',
    slug: 'facebook-bejegyzes-kozossegi-program',
    canonicalUrl: 'https://example.invalid/news/facebook-bejegyzes-kozossegi-program',
    coverAltHu: 'Közösségi program illusztráció',
    coverAltEn: 'Community program illustration',
  },
  {
    id: 3,
    source: 'instagram',
    category: 'Képek',
    status: 'published',
    pinned: false,
    date: '2026-04-09',
    titleHu: 'Instagram feed: eseményfotók',
    titleEn: 'Instagram feed: event photos',
    textHu: 'Instagram poszt alapú képes összefoglaló a legutóbbi eseményről.',
    textEn: 'Instagram-based visual recap of the most recent event.',
    author: 'Instagram feed',
    cover: 'pink',
    hasCover: true,
    externalUrl: 'https://instagram.com',
    slug: 'instagram-feed-esemenyfotok',
    canonicalUrl: 'https://example.invalid/news/instagram-feed-esemenyfotok',
    coverAltHu: 'Esemény fotó összefoglaló',
    coverAltEn: 'Event photo recap',
  },
];

export function getDemoNews(): NewsItem[] {
  return demoNews;
}

export async function fetchNewsList(): Promise<NewsItem[] | null> {
  const r = await fetch('/api/news', { credentials: 'include' });
  if (!r.ok) return null;
  const data = (await r.json()) as { items?: NewsItem[] };
  return Array.isArray(data.items) ? data.items : null;
}

