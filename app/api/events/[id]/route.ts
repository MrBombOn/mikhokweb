/**
 * @file REST: egy naptáresemény GET / PATCH / DELETE (soft delete, OFFICE/ADMIN íráshoz).
 */
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { canManageNews, getCurrentUser } from '@/lib/auth/current-user';
import { calendarEventToItem } from '@/lib/mappers/calendar';
import { patchEventSchema } from '@/lib/validation/events';

type RouteContext = { params: Promise<{ id: string }> };

function parseId(raw: string): number | null {
  const n = Number(raw);
  return Number.isInteger(n) && n > 0 ? n : null;
}

export async function GET(_request: Request, context: RouteContext) {
  const { id: raw } = await context.params;
  const id = parseId(raw);
  if (id == null) {
    return NextResponse.json({ error: 'Érvénytelen azonosító.' }, { status: 400 });
  }

  const user = await getCurrentUser();
  const row = await prisma.calendarEvent.findUnique({ where: { id } });
  if (!row || row.status === 'deleted') {
    return NextResponse.json({ error: 'Nem található.' }, { status: 404 });
  }

  const guest = !user || !canManageNews(user.role);
  if (guest && row.status !== 'published') {
    return NextResponse.json({ error: 'Nem található.' }, { status: 404 });
  }

  return NextResponse.json({ item: calendarEventToItem(row) });
}

export async function PATCH(request: Request, context: RouteContext) {
  const user = await getCurrentUser();
  if (!user || !canManageNews(user.role)) {
    return NextResponse.json({ error: 'Nincs jogosultság.' }, { status: 403 });
  }

  const { id: raw } = await context.params;
  const id = parseId(raw);
  if (id == null) {
    return NextResponse.json({ error: 'Érvénytelen azonosító.' }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Érvénytelen JSON.' }, { status: 400 });
  }

  const parsed = patchEventSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validációs hiba', details: parsed.error.flatten() }, { status: 400 });
  }

  const existing = await prisma.calendarEvent.findUnique({ where: { id } });
  if (!existing || existing.status === 'deleted') {
    return NextResponse.json({ error: 'Nem található.' }, { status: 404 });
  }

  const p = parsed.data;
  const updateData: Record<string, unknown> = {
    ...(p.titleHu !== undefined && { titleHu: p.titleHu }),
    ...(p.titleEn !== undefined && { titleEn: p.titleEn }),
    ...(p.eventDate !== undefined && { eventDate: p.eventDate }),
    ...(p.time !== undefined && { time: p.time }),
    ...(p.location !== undefined && { location: p.location }),
    ...(p.category !== undefined && { category: p.category }),
    ...(p.dayLabel !== undefined && { dayLabel: p.dayLabel }),
    ...(p.note !== undefined && { note: p.note }),
    ...(p.status !== undefined && { status: p.status }),
  };
  if (Object.keys(updateData).length === 0) {
    return NextResponse.json({ error: 'Nincs frissítendő mező.' }, { status: 400 });
  }

  const row = await prisma.calendarEvent.update({
    where: { id },
    data: updateData,
  });

  return NextResponse.json({ item: calendarEventToItem(row) });
}

export async function DELETE(_request: Request, context: RouteContext) {
  const user = await getCurrentUser();
  if (!user || !canManageNews(user.role)) {
    return NextResponse.json({ error: 'Nincs jogosultság.' }, { status: 403 });
  }

  const { id: raw } = await context.params;
  const id = parseId(raw);
  if (id == null) {
    return NextResponse.json({ error: 'Érvénytelen azonosító.' }, { status: 400 });
  }

  const existing = await prisma.calendarEvent.findUnique({ where: { id } });
  if (!existing || existing.status === 'deleted') {
    return NextResponse.json({ error: 'Nem található.' }, { status: 404 });
  }

  await prisma.calendarEvent.update({
    where: { id },
    data: { status: 'deleted' },
  });

  return NextResponse.json({ ok: true });
}
