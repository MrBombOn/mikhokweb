/**
 * @file REST: útmutatók lista (GET), új bejegyzés (POST, OFFICE/ADMIN).
 */
import { NextResponse } from 'next/server';
import { canManageNews, getCurrentUser } from '@/lib/auth/current-user';
import { createGuideItem, listGuidesForRole } from '@/features/guides/server';
import { createGuideSchema } from '@/lib/validation/guides';
import { writeAudit } from '@/lib/audit/write-audit';
import { apiRequestLog } from '@/lib/observability/api-request-log';
import { enforceSameOrigin } from '@/lib/security/csrf';

export async function GET() {
  const user = await getCurrentUser();
  const payload = await listGuidesForRole(user?.role);
  return NextResponse.json(payload);
}

export async function POST(request: Request) {
  const log = apiRequestLog(request, 'api.guides.post');
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

  const parsed = createGuideSchema.safeParse(body);
  if (!parsed.success) {
    return log.wrap(NextResponse.json({ error: 'Validációs hiba', details: parsed.error.flatten() }, { status: 400 }));
  }

  const result = await createGuideItem(parsed.data);
  if (!result.ok) {
    return log.wrap(NextResponse.json({ error: result.error }, { status: 400 }));
  }
  await writeAudit({
    actor: user,
    action: 'create_guide',
    entityType: 'guide',
    entityId: String(result.item.id),
    details: result.item.category,
  });

  log.info('guide_created', { actorId: user.id, guideId: result.item.id });
  return log.wrap(NextResponse.json({ item: result.item }, { status: 201 }));
}
