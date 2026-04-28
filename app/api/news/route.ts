/**
 * @file REST: hírek lista (GET) + létrehozás (POST, OFFICE/ADMIN).
 */
import { NextResponse } from 'next/server';
import type { Prisma } from '@prisma/client';
import { prisma } from '@/lib/db';
import { canManageNews, getCurrentUser } from '@/lib/auth/current-user';
import { newsRowToItem } from '@/lib/mappers/news';
import { createNewsSchema } from '@/lib/validation/news';

export async function GET() {
  const user = await getCurrentUser();
  const where: Prisma.NewsWhereInput =
    user && canManageNews(user.role)
      ? { status: { not: 'deleted' } }
      : { status: 'published' };

  const rows = await prisma.news.findMany({
    where,
    orderBy: [{ pinned: 'desc' }, { listDate: 'desc' }, { id: 'desc' }],
  });

  return NextResponse.json({ items: rows.map(newsRowToItem) });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user || !canManageNews(user.role)) {
    return NextResponse.json({ error: 'Nincs jogosultság.' }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Érvénytelen JSON.' }, { status: 400 });
  }

  const parsed = createNewsSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validációs hiba', details: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;
  const row = await prisma.news.create({
    data: {
      source: data.source,
      category: data.category,
      status: data.status,
      pinned: data.pinned,
      listDate: data.listDate,
      titleHu: data.titleHu,
      titleEn: data.titleEn,
      textHu: data.textHu,
      textEn: data.textEn,
      author: data.author,
      cover: data.cover,
      hasCover: data.hasCover,
      scheduledFor: data.scheduledFor,
      externalUrl: data.externalUrl,
    },
  });

  return NextResponse.json({ item: newsRowToItem(row) }, { status: 201 });
}
