/**
 * @file REST: egy útmutató GET / PATCH / DELETE (soft delete, OFFICE/ADMIN íráshoz).
 */
import { NextResponse } from 'next/server';
import { canManageNews, getCurrentUser } from '@/lib/auth/current-user';
import { getGuideDto, parseGuideId, patchGuideItem, softDeleteGuideItem } from '@/features/guides/server';
import { patchGuideSchema } from '@/lib/validation/guides';
import { apiRequestLog } from '@/lib/observability/api-request-log';
import { enforceSameOrigin } from '@/lib/security/csrf';
import { writeAudit } from '@/lib/audit/write-audit';

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { id: raw } = await context.params;
  const id = parseGuideId(raw);
  if (id == null) {
    return NextResponse.json({ error: 'Érvénytelen azonosító.' }, { status: 400 });
  }

  const user = await getCurrentUser();
  const result = await getGuideDto(id, user?.role);
  if (!result.ok) {
    return NextResponse.json({ error: 'Nem található.' }, { status: result.status });
  }

  return NextResponse.json({ item: result.item });
}

export async function PATCH(request: Request, context: RouteContext) {
  const log = apiRequestLog(request, 'api.guides.patch');
  const csrf = enforceSameOrigin(request);
  if (csrf) return log.wrap(csrf);

  const user = await getCurrentUser();
  if (!user || !canManageNews(user.role)) {
    return log.wrap(NextResponse.json({ error: 'Nincs jogosultság.' }, { status: 403 }));
  }

  const { id: raw } = await context.params;
  const id = parseGuideId(raw);
  if (id == null) {
    return log.wrap(NextResponse.json({ error: 'Érvénytelen azonosító.' }, { status: 400 }));
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return log.wrap(NextResponse.json({ error: 'Érvénytelen JSON.' }, { status: 400 }));
  }

  const parsed = patchGuideSchema.safeParse(body);
  if (!parsed.success) {
    return log.wrap(NextResponse.json({ error: 'Validációs hiba', details: parsed.error.flatten() }, { status: 400 }));
  }

  const result = await patchGuideItem(id, parsed.data);
  if (!result.ok) {
    return log.wrap(NextResponse.json({ error: result.error ?? 'Hiba.' }, { status: result.status }));
  }
  await writeAudit({
    actor: user,
    action: 'patch_guide',
    entityType: 'guide',
    entityId: String(id),
    details: `fields=${Object.keys(parsed.data).join(',')}`,
  });

  log.info('guide_patched', { actorId: user.id, guideId: id });
  return log.wrap(NextResponse.json({ item: result.item }));
}

export async function DELETE(request: Request, context: RouteContext) {
  const log = apiRequestLog(request, 'api.guides.delete');
  const csrf = enforceSameOrigin(request);
  if (csrf) return log.wrap(csrf);

  const user = await getCurrentUser();
  if (!user || !canManageNews(user.role)) {
    return log.wrap(NextResponse.json({ error: 'Nincs jogosultság.' }, { status: 403 }));
  }

  const { id: raw } = await context.params;
  const id = parseGuideId(raw);
  if (id == null) {
    return log.wrap(NextResponse.json({ error: 'Érvénytelen azonosító.' }, { status: 400 }));
  }

  const result = await softDeleteGuideItem(id);
  if (!result.ok) {
    return log.wrap(NextResponse.json({ error: 'Nem található.' }, { status: result.status }));
  }
  await writeAudit({
    actor: user,
    action: 'delete_guide',
    entityType: 'guide',
    entityId: String(id),
  });

  log.info('guide_deleted', { actorId: user.id, guideId: id });
  return log.wrap(NextResponse.json({ ok: true }));
}
