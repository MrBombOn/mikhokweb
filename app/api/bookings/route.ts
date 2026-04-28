/**
 * @file REST: tornaterem foglalások – lista (GET) + igény beküldése (POST, nyilvános).
 */
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { gymBookingToItem } from '@/lib/mappers/calendar';
import { createBookingSchema } from '@/lib/validation/bookings';

export async function GET() {
  const rows = await prisma.gymBooking.findMany({
    orderBy: [{ bookingDate: 'desc' }, { startTime: 'desc' }, { id: 'desc' }],
  });
  return NextResponse.json({ items: rows.map(gymBookingToItem) });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Érvénytelen JSON.' }, { status: 400 });
  }

  const parsed = createBookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validációs hiba', details: parsed.error.flatten() }, { status: 400 });
  }

  const d = parsed.data;
  const startM = timeToMinutes(d.startTime);
  const endM = timeToMinutes(d.endTime);
  if (startM != null && endM != null && startM >= endM) {
    return NextResponse.json({ error: 'A befejezésnek a kezdés után kell esnie.' }, { status: 400 });
  }

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
    },
  });

  return NextResponse.json({ item: gymBookingToItem(row) }, { status: 201 });
}

function timeToMinutes(t: string): number | null {
  const m = t.match(/^(\d{2}):(\d{2})$/);
  if (!m) return null;
  const h = Number(m[1]);
  const min = Number(m[2]);
  if (Number.isNaN(h) || Number.isNaN(min)) return null;
  return h * 60 + min;
}
