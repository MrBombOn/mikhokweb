/**
 * @file REST: tornaterem foglalások – lista (GET) + igény beküldése (POST, nyilvános).
 */
import { NextResponse } from 'next/server';
import { tooManyRequests } from '@/lib/api/response';
import { prisma } from '@/lib/db';
import { expireOldPendingBookings } from '@/lib/bookings/maintenance';
import { overlapsRange, timeToMinutes, todayYmdUtc } from '@/lib/bookings/time';
import { gymBookingToItem } from '@/lib/mappers/calendar';
import { notifyBookingCreated } from '@/lib/notifications/booking';
import { apiRequestLog } from '@/lib/observability/api-request-log';
import { registerBookingPost, isBookingBlocked } from '@/lib/security/booking-rate-limit';
import { enforceSameOrigin } from '@/lib/security/csrf';
import { createBookingSchema } from '@/lib/validation/bookings';

export async function GET(request: Request) {
  await expireOldPendingBookings();

  const url = new URL(request.url);
  const status = url.searchParams.get('status')?.trim();
  const dateFrom = url.searchParams.get('dateFrom')?.trim();
  const dateTo = url.searchParams.get('dateTo')?.trim();
  const q = url.searchParams.get('q')?.trim();
  const limit = Math.min(300, Math.max(1, Number(url.searchParams.get('limit') ?? '200')));

  const rows = await prisma.gymBooking.findMany({
    where: {
      ...(status ? { status: status as 'pending' | 'approved' | 'rejected' } : {}),
      ...(dateFrom || dateTo
        ? {
            bookingDate: {
              ...(dateFrom ? { gte: dateFrom } : {}),
              ...(dateTo ? { lte: dateTo } : {}),
            },
          }
        : {}),
      ...(q
        ? {
            OR: [
              { title: { contains: q } },
              { applicantName: { contains: q } },
              { organization: { contains: q } },
              { purpose: { contains: q } },
              { email: { contains: q } },
            ],
          }
        : {}),
    },
    orderBy: [{ bookingDate: 'desc' }, { startTime: 'desc' }, { id: 'desc' }],
    take: limit,
  });
  return NextResponse.json({ items: rows.map(gymBookingToItem) });
}

export async function POST(request: Request) {
  const log = apiRequestLog(request, 'api.bookings.post');
  const csrf = enforceSameOrigin(request);
  if (csrf) return log.wrap(csrf);

  if (isBookingBlocked(request)) {
    log.warn('booking_create_rate_limited', {});
    return log.wrap(tooManyRequests('Tul sok foglalasi igeny rovid idon belul. Probald ujra kesobb.'));
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return log.wrap(NextResponse.json({ error: 'Érvénytelen JSON.' }, { status: 400 }));
  }

  const parsed = createBookingSchema.safeParse(body);
  if (!parsed.success) {
    return log.wrap(NextResponse.json({ error: 'Validációs hiba', details: parsed.error.flatten() }, { status: 400 }));
  }

  const d = parsed.data;
  const startM = timeToMinutes(d.startTime);
  const endM = timeToMinutes(d.endTime);
  if (startM != null && endM != null && startM >= endM) {
    return log.wrap(NextResponse.json({ error: 'A befejezésnek a kezdés után kell esnie.' }, { status: 400 }));
  }
  if (startM == null || endM == null) {
    return log.wrap(NextResponse.json({ error: 'Érvénytelen időpont formátum.' }, { status: 400 }));
  }
  if (d.bookingDate < todayYmdUtc()) {
    return log.wrap(NextResponse.json({ error: 'Múltbeli időpontra nem lehet új foglalást rögzíteni.' }, { status: 400 }));
  }
  const duration = endM - startM;
  if (duration < 30) {
    return log.wrap(NextResponse.json({ error: 'A minimális foglalási idő 30 perc.' }, { status: 400 }));
  }
  // P5: üzemi időablak validáció.
  if (startM < 6 * 60 || endM > 23 * 60) {
    return log.wrap(NextResponse.json({ error: 'Foglalás csak 06:00 és 23:00 között adható le.' }, { status: 400 }));
  }

  const sameDayRows = await prisma.gymBooking.findMany({
    where: {
      bookingDate: d.bookingDate,
      status: { in: ['pending', 'approved'] },
    },
    select: { id: true, startTime: true, endTime: true },
    take: 300,
  });
  const overlapsExisting = sameDayRows.some((row) => {
    return overlapsRange(d.startTime, d.endTime, row.startTime, row.endTime);
  });
  if (overlapsExisting) {
    log.warn('booking_create_slot_conflict', { bookingDate: d.bookingDate });
    return log.wrap(
      NextResponse.json({ error: 'A megadott idosav mar foglalt vagy fuggoben levo igenyhez utkozik.' }, { status: 409 }),
    );
  }

  registerBookingPost(request);

  const row = await prisma.gymBooking.create({
    data: {
      title: d.title ?? 'Tornaterem foglalás',
      applicantName: d.applicantName,
      email: d.email,
      organization: d.organization,
      bookingDate: d.bookingDate,
      startTime: d.startTime,
      endTime: d.endTime,
      purpose: d.purpose,
      notificationLocale: d.locale,
    },
  });

  await notifyBookingCreated(
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
    d.locale,
  );

  log.info('booking_create_success', { bookingId: row.id, bookingDate: row.bookingDate });
  return log.wrap(NextResponse.json({ item: gymBookingToItem(row) }, { status: 201 }));
}
