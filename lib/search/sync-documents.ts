import type { CalendarEvent, Guide, News } from '@prisma/client';
import { prisma } from '@/lib/db';
import { clipPlainText } from '@/lib/search/clip-plain';

function buildBlob(parts: string[]): string {
  return parts.join('\n').toLowerCase();
}

export async function removeSearchDocument(module: string, entityId: number): Promise<void> {
  await prisma.searchDocument.deleteMany({ where: { module, entityId } });
}

export async function syncSearchDocumentFromNews(row: News): Promise<void> {
  if (row.status !== 'published') {
    await removeSearchDocument('news', row.id);
    return;
  }
  const slug = row.slug?.trim() || null;
  const hrefPath = slug ? `/news/${encodeURIComponent(slug)}` : '/news';
  const searchBlob = buildBlob([
    row.titleHu,
    row.titleEn,
    row.textHu,
    row.textEn,
    row.category,
    row.author,
  ]);
  const snippetHu = clipPlainText(row.textHu, 220);
  const snippetEn = clipPlainText(row.textEn, 220);

  await prisma.searchDocument.upsert({
    where: { module_entityId: { module: 'news', entityId: row.id } },
    create: {
      module: 'news',
      entityId: row.id,
      titleHu: row.titleHu,
      titleEn: row.titleEn,
      snippetHu,
      snippetEn,
      searchBlob,
      category: row.category,
      slug,
      hrefPath,
      listDate: row.listDate,
    },
    update: {
      titleHu: row.titleHu,
      titleEn: row.titleEn,
      snippetHu,
      snippetEn,
      searchBlob,
      category: row.category,
      slug,
      hrefPath,
      listDate: row.listDate,
    },
  });
}

export async function syncSearchDocumentFromGuide(row: Guide): Promise<void> {
  if (row.status !== 'published') {
    await removeSearchDocument('guides', row.id);
    return;
  }
  const searchBlob = buildBlob([
    row.searchableText,
    row.titleHu,
    row.titleEn,
    row.excerptHu,
    row.excerptEn,
    row.bodyHu,
    row.bodyEn,
    row.category,
    row.topic,
    row.keywords,
  ]);
  const snippetHu = clipPlainText(row.excerptHu || row.bodyHu, 220);
  const snippetEn = clipPlainText(row.excerptEn || row.bodyEn, 220);

  await prisma.searchDocument.upsert({
    where: { module_entityId: { module: 'guides', entityId: row.id } },
    create: {
      module: 'guides',
      entityId: row.id,
      titleHu: row.titleHu,
      titleEn: row.titleEn,
      snippetHu,
      snippetEn,
      searchBlob,
      category: row.category,
      slug: null,
      hrefPath: '/guides',
      listDate: row.listDate,
    },
    update: {
      titleHu: row.titleHu,
      titleEn: row.titleEn,
      snippetHu,
      snippetEn,
      searchBlob,
      category: row.category,
      hrefPath: '/guides',
      listDate: row.listDate,
    },
  });
}

export async function syncSearchDocumentFromCalendarEvent(row: CalendarEvent): Promise<void> {
  if (row.status !== 'published') {
    await removeSearchDocument('events', row.id);
    return;
  }
  const searchBlob = buildBlob([
    row.titleHu,
    row.titleEn,
    row.note ?? '',
    row.location,
    row.category,
    row.dayLabel ?? '',
    row.eventDate,
    row.time,
  ]);
  const noteHu = row.note ?? '';
  const snippetHu = clipPlainText(`${row.location} ${noteHu}`.trim() || row.titleHu, 220);
  const snippetEn = clipPlainText(`${row.location} ${noteHu}`.trim() || row.titleEn, 220);

  await prisma.searchDocument.upsert({
    where: { module_entityId: { module: 'events', entityId: row.id } },
    create: {
      module: 'events',
      entityId: row.id,
      titleHu: row.titleHu,
      titleEn: row.titleEn,
      snippetHu,
      snippetEn,
      searchBlob,
      category: row.category,
      slug: null,
      hrefPath: '/calendar',
      listDate: row.eventDate,
    },
    update: {
      titleHu: row.titleHu,
      titleEn: row.titleEn,
      snippetHu,
      snippetEn,
      searchBlob,
      category: row.category,
      hrefPath: '/calendar',
      listDate: row.eventDate,
    },
  });
}

export async function syncSearchDocumentForNewsId(id: number): Promise<void> {
  const row = await prisma.news.findUnique({ where: { id } });
  if (!row) return;
  await syncSearchDocumentFromNews(row);
}

export async function syncSearchDocumentForGuideId(id: number): Promise<void> {
  const row = await prisma.guide.findUnique({ where: { id } });
  if (!row) return;
  await syncSearchDocumentFromGuide(row);
}

export async function syncSearchDocumentForEventId(id: number): Promise<void> {
  const row = await prisma.calendarEvent.findUnique({ where: { id } });
  if (!row) return;
  await syncSearchDocumentFromCalendarEvent(row);
}
