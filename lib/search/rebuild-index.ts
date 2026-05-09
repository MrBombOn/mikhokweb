import { prisma } from '@/lib/db';
import {
  syncSearchDocumentFromCalendarEvent,
  syncSearchDocumentFromGuide,
  syncSearchDocumentFromNews,
} from '@/lib/search/sync-documents';

/** Teljes index újraépítése (deploy / migráció után, illetve `npm run ops:rebuild-search-index`). */
export async function rebuildSearchIndex(): Promise<{ news: number; guides: number; events: number }> {
  await prisma.searchDocument.deleteMany({});

  const [newsRows, guideRows, eventRows] = await Promise.all([
    prisma.news.findMany({ where: { status: 'published' } }),
    prisma.guide.findMany({ where: { status: 'published' } }),
    prisma.calendarEvent.findMany({ where: { status: 'published' } }),
  ]);

  for (const row of newsRows) {
    await syncSearchDocumentFromNews(row);
  }
  for (const row of guideRows) {
    await syncSearchDocumentFromGuide(row);
  }
  for (const row of eventRows) {
    await syncSearchDocumentFromCalendarEvent(row);
  }

  return { news: newsRows.length, guides: guideRows.length, events: eventRows.length };
}
