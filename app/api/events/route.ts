/**
 * @file REST: naptár események lista (GET) + létrehozás (POST, OFFICE/ADMIN).
 */
import { NextResponse } from 'next/server';
import { canManageNews, getCurrentUser } from '@/lib/auth/current-user';
import { createCalendarEvent, listEventsForRole } from '@/features/events/server';
import { createEventSchema } from '@/lib/validation/events';
import { enforceSameOrigin } from '@/lib/security/csrf';
import { writeAudit } from '@/lib/audit/write-audit';

export async function GET() {
  const user = await getCurrentUser();
  const payload = await listEventsForRole(user?.role);
  return NextResponse.json(payload);
}

export async function POST(request: Request) {
  const csrf = enforceSameOrigin(request);
  if (csrf) return csrf;

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

  const item = await createCalendarEvent(parsed.data);
  await writeAudit({
    actor: user,
    action: 'create_event',
    entityType: 'calendar_event',
    entityId: String(item.id),
    details: `${item.date} ${item.category}`,
  });
  return NextResponse.json({ item }, { status: 201 });
}
