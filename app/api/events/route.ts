/**
 * @file REST: naptár események lista (GET) + létrehozás (POST, OFFICE/ADMIN).
 */
import { NextResponse } from 'next/server';
import { canManageNews, getCurrentUser } from '@/lib/auth/current-user';
import { createCalendarEvent, listEventsForRole } from '@/features/events/server';
import { createEventSchema } from '@/lib/validation/events';
import { writeAudit } from '@/lib/audit/write-audit';
import { apiRequestLog } from '@/lib/observability/api-request-log';
import { enforceSameOrigin } from '@/lib/security/csrf';

export async function GET() {
  const user = await getCurrentUser();
  const payload = await listEventsForRole(user?.role);
  return NextResponse.json(payload);
}

export async function POST(request: Request) {
  const log = apiRequestLog(request, 'api.events.post');
  const csrf = enforceSameOrigin(request);
  if (csrf) return log.wrap(csrf);

  const user = await getCurrentUser();
  if (!user || !canManageNews(user.role)) {
    return log.wrap(NextResponse.json({ error: 'Nincs jogosultság.' }, { status: 403 }));
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return log.wrap(NextResponse.json({ error: 'Érvénytelen JSON.' }, { status: 400 }));
  }

  const parsed = createEventSchema.safeParse(body);
  if (!parsed.success) {
    return log.wrap(NextResponse.json({ error: 'Validációs hiba', details: parsed.error.flatten() }, { status: 400 }));
  }

  const created = await createCalendarEvent(parsed.data);
  const item = created.primary;
  await writeAudit({
    actor: user,
    action: 'create_event',
    entityType: 'calendar_event',
    entityId: String(item.id),
    details: `${item.date} ${item.category};repeatWeeklyCount=${parsed.data.repeatWeeklyCount ?? 0};created=${created.items.length}`,
  });
  log.info('calendar_event_created', { actorId: user.id, eventId: item.id, createdCount: created.items.length });
  return log.wrap(
    NextResponse.json({ item, items: created.items, createdCount: created.items.length }, { status: 201 }),
  );
}
