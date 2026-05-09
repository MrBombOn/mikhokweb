/**
 * @file REST: foglalás státusz (PATCH, OFFICE/ADMIN) – elfogadás / elutasítás.
 */
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { canManageNews, getCurrentUser } from '@/lib/auth/current-user';
import { expireOldPendingBookings } from '@/lib/bookings/maintenance';
import { overlapsRange, todayYmdUtc } from '@/lib/bookings/time';
import { gymBookingToItem } from '@/lib/mappers/calendar';
import { patchBookingStatusSchema } from '@/lib/validation/bookings';
import { enforceSameOrigin } from '@/lib/security/csrf';
import { writeAudit } from '@/lib/audit/write-audit';
import { notifyBookingStatusChanged } from '@/lib/notifications/booking';
import { apiRequestLog } from '@/lib/observability/api-request-log';

type RouteContext = { params: Promise<{ id: string }> };

function parseId(raw: string): number | null {
  const n = Number(raw);
  return Number.isInteger(n) && n > 0 ? n : null;
}

export async function PATCH(request: Request, context: RouteContext) {
  const log = apiRequestLog(request, 'api.bookings.patch');
  const csrf = enforceSameOrigin(request);
  if (csrf) return log.wrap(csrf);

  const user = await getCurrentUser();
  if (!user || !canManageNews(user.role)) {
    return log.wrap(NextResponse.json({ error: 'Nincs jogosultság.' }, { status: 403 }));
  }

  const { id: raw } = await context.params;
  const id = parseId(raw);
  if (id == null) {
    return log.wrap(NextResponse.json({ error: 'Érvénytelen azonosító.' }, { status: 400 }));
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return log.wrap(NextResponse.json({ error: 'Érvénytelen JSON.' }, { status: 400 }));
  }

  const parsed = patchBookingStatusSchema.safeParse(body);
  if (!parsed.success) {
    return log.wrap(NextResponse.json({ error: 'Validációs hiba', details: parsed.error.flatten() }, { status: 400 }));
  }

  await expireOldPendingBookings();

  const existing = await prisma.gymBooking.findUnique({ where: { id } });
  if (!existing) {
    return log.wrap(NextResponse.json({ error: 'Nem található.' }, { status: 404 }));
  }
  if (parsed.data.status === 'approved') {
    if (existing.bookingDate < todayYmdUtc()) {
      return log.wrap(NextResponse.json({ error: 'Múltbeli foglalást nem lehet jóváhagyni.' }, { status: 400 }));
    }
    const approvedSameDay = await prisma.gymBooking.findMany({
      where: {
        bookingDate: existing.bookingDate,
        status: 'approved',
        id: { not: existing.id },
      },
      select: { id: true, startTime: true, endTime: true },
      take: 300,
    });
    const overlapsApproved = approvedSameDay.some((row) =>
      overlapsRange(existing.startTime, existing.endTime, row.startTime, row.endTime),
    );
    if (overlapsApproved) {
      return log.wrap(
        NextResponse.json(
          { error: 'A foglalás nem hagyható jóvá: jóváhagyott idősáv ütközés.' },
          { status: 409 },
        ),
      );
    }
  }

  const row = await prisma.gymBooking.update({
    where: { id },
    data: { status: parsed.data.status },
  });

  await notifyBookingStatusChanged(
    {
      id: row.id,
      title: row.title,
      applicantName: row.applicantName,
      email: row.email,
      organization: row.organization,
      bookingDate: row.bookingDate,
      startTime: row.startTime,
      endTime: row.endTime,
      purpose: row.purpose,
    },
    parsed.data.status,
    row.notificationLocale,
  );

  await writeAudit({
    actor: user,
    action: 'patch_booking_status',
    entityType: 'gym_booking',
    entityId: String(id),
    details: `${existing.status}->${parsed.data.status};slot=${existing.bookingDate} ${existing.startTime}-${existing.endTime};applicant=${existing.applicantName};org=${existing.organization ?? '-'}`,
  });

  log.info('booking_status_patched', { actorId: user.id, bookingId: id, status: parsed.data.status });
  return log.wrap(NextResponse.json({ item: gymBookingToItem(row) }));
}
