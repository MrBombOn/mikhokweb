import type { CalendarEvent, GymBooking } from '@prisma/client';
import type { CalendarEventItem, GymBookingItem } from '@/types/calendar';

export function calendarEventToItem(row: CalendarEvent): CalendarEventItem {
  return {
    id: row.id,
    titleHu: row.titleHu,
    titleEn: row.titleEn,
    date: row.eventDate,
    time: row.time,
    location: row.location,
    category: row.category,
    dayLabel: row.dayLabel ?? '',
    note: row.note ?? undefined,
    status: row.status as CalendarEventItem['status'],
  };
}

export function gymBookingToItem(row: GymBooking): GymBookingItem {
  const slot = `${row.bookingDate} ${row.startTime}-${row.endTime}`;
  return {
    id: row.id,
    title: row.title,
    slot,
    applicant: row.applicantName,
    status: row.status as GymBookingItem['status'],
    purpose: row.purpose || undefined,
  };
}
