import { listEventsForRole } from '@/features/events/server';
import { listNewsForRole } from '@/features/news/server';

/**
 * Verziózott, szűkített mezőkkel — partner integrációk (nincs benne teljes HTML szöveg).
 */
export async function buildPublicReadFeedV1() {
  const newsItems = await listNewsForRole(undefined);
  const { items: events } = await listEventsForRole(undefined);

  const news = newsItems.slice(0, 50).map((n) => ({
    id: n.id,
    slug: n.slug ?? null,
    date: n.date,
    titleHu: n.titleHu,
    titleEn: n.titleEn,
    category: n.category,
    author: n.author,
    canonicalUrl: n.canonicalUrl ?? null,
    status: n.status,
  }));

  const ev = events.slice(0, 100).map((e) => ({
    id: e.id,
    date: e.date,
    time: e.time,
    titleHu: e.titleHu,
    titleEn: e.titleEn,
    location: e.location,
    category: e.category,
    dayLabel: e.dayLabel,
  }));

  return {
    apiVersion: '1.0',
    generatedAt: new Date().toISOString(),
    news,
    events: ev,
  };
}
