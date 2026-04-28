import type { Prisma, UserRole } from '@prisma/client';
import { prisma } from '@/lib/db';
import { canManageNews } from '@/lib/auth/current-user';
import { calendarEventToItem } from '@/lib/mappers/calendar';
import type { CreateEventInput, PatchEventInput } from '@/lib/validation/events';

export function parseEventId(raw: string): number | null {
  const n = Number(raw);
  return Number.isInteger(n) && n > 0 ? n : null;
}

export async function listEventsForRole(role?: UserRole) {
  const where: Prisma.CalendarEventWhereInput =
    role && canManageNews(role) ? { status: { not: 'deleted' } } : { status: 'published' };

  const rows = await prisma.calendarEvent.findMany({
    where,
    orderBy: [{ eventDate: 'asc' }, { time: 'asc' }, { id: 'asc' }],
  });

  return { items: rows.map(calendarEventToItem) };
}

export async function createCalendarEvent(data: CreateEventInput) {
  const row = await prisma.calendarEvent.create({
    data: {
      titleHu: data.titleHu,
      titleEn: data.titleEn,
      eventDate: data.eventDate,
      time: data.time,
      location: data.location,
      category: data.category,
      dayLabel: data.dayLabel,
      note: data.note,
      status: data.status,
    },
  });

  return calendarEventToItem(row);
}

export async function getCalendarEventDto(id: number, role?: UserRole) {
  const row = await prisma.calendarEvent.findUnique({ where: { id } });
  if (!row || row.status === 'deleted') {
    return { ok: false as const, status: 404 as const };
  }

  const guest = !role || !canManageNews(role);
  if (guest && row.status !== 'published') {
    return { ok: false as const, status: 404 as const };
  }

  return { ok: true as const, item: calendarEventToItem(row) };
}

export async function patchCalendarEvent(id: number, patch: PatchEventInput) {
  const existing = await prisma.calendarEvent.findUnique({ where: { id } });
  if (!existing || existing.status === 'deleted') {
    return { ok: false as const, status: 404 as const, error: 'Nem található.' };
  }

  const updateData: Prisma.CalendarEventUpdateInput = {};
  if (patch.titleHu !== undefined) updateData.titleHu = patch.titleHu;
  if (patch.titleEn !== undefined) updateData.titleEn = patch.titleEn;
  if (patch.eventDate !== undefined) updateData.eventDate = patch.eventDate;
  if (patch.time !== undefined) updateData.time = patch.time;
  if (patch.location !== undefined) updateData.location = patch.location;
  if (patch.category !== undefined) updateData.category = patch.category;
  if (patch.dayLabel !== undefined) updateData.dayLabel = patch.dayLabel;
  if (patch.note !== undefined) updateData.note = patch.note;
  if (patch.status !== undefined) updateData.status = patch.status;

  if (Object.keys(updateData).length === 0) {
    return { ok: false as const, status: 400 as const, error: 'Nincs frissítendő mező.' };
  }

  const row = await prisma.calendarEvent.update({
    where: { id },
    data: updateData,
  });

  return { ok: true as const, item: calendarEventToItem(row) };
}

export async function softDeleteCalendarEvent(id: number) {
  const existing = await prisma.calendarEvent.findUnique({ where: { id } });
  if (!existing || existing.status === 'deleted') {
    return { ok: false as const, status: 404 as const };
  }

  await prisma.calendarEvent.update({
    where: { id },
    data: { status: 'deleted' },
  });

  return { ok: true as const };
}
