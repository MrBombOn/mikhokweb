/**
 * @file REST: foglalás státusz (PATCH, OFFICE/ADMIN) – elfogadás / elutasítás.
 */
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { canManageNews, getCurrentUser } from '@/lib/auth/current-user';
import { gymBookingToItem } from '@/lib/mappers/calendar';
import { patchBookingStatusSchema } from '@/lib/validation/bookings';
import { enforceSameOrigin } from '@/lib/security/csrf';
import { writeAudit } from '@/lib/audit/write-audit';

type RouteContext = { params: Promise<{ id: string }> };

function parseId(raw: string): number | null {
  const n = Number(raw);
  return Number.isInteger(n) && n > 0 ? n : null;
}

export async function PATCH(request: Request, context: RouteContext) {
  const csrf = enforceSameOrigin(request);
  if (csrf) return csrf;

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

  const parsed = patchBookingStatusSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validációs hiba', details: parsed.error.flatten() }, { status: 400 });
  }

  const existing = await prisma.gymBooking.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: 'Nem található.' }, { status: 404 });
  }

  const row = await prisma.gymBooking.update({
    where: { id },
    data: { status: parsed.data.status },
  });
  await writeAudit({
    actor: user,
    action: 'patch_booking_status',
    entityType: 'gym_booking',
    entityId: String(id),
    details: `${existing.status}->${parsed.data.status}`,
  });

  return NextResponse.json({ item: gymBookingToItem(row) });
}
