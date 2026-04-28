/**
 * @file REST: naptár események lista (GET) + létrehozás (POST, OFFICE/ADMIN).
 */
import { NextResponse } from 'next/server';
import type { Prisma } from '@prisma/client';
import { prisma } from '@/lib/db';
import { canManageNews, getCurrentUser } from '@/lib/auth/current-user';
import { calendarEventToItem } from '@/lib/mappers/calendar';
import { createEventSchema } from '@/lib/validation/events';

export async function GET() {
  const user = await getCurrentUser();
  const where: Prisma.CalendarEventWhereInput =
    user && canManageNews(user.role)
      ? { status: { not: 'deleted' } }
      : { status: 'published' };

  const rows = await prisma.calendarEvent.findMany({
    where,
    orderBy: [{ eventDate: 'asc' }, { time: 'asc' }, { id: 'asc' }],
  });

  return NextResponse.json({ items: rows.map(calendarEventToItem) });
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

  const parsed = createEventSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validációs hiba', details: parsed.error.flatten() }, { status: 400 });
  }

  const d = parsed.data;
  const row = await prisma.calendarEvent.create({
    data: {
      titleHu: d.titleHu,
      titleEn: d.titleEn,
      eventDate: d.eventDate,
      time: d.time,
      location: d.location,
      category: d.category,
      dayLabel: d.dayLabel,
      note: d.note,
      status: d.status,
    },
  });

  return NextResponse.json({ item: calendarEventToItem(row) }, { status: 201 });
}
