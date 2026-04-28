/**
 * @file REST: About narratív blokk – GET / PATCH (OFFICE/ADMIN íráshoz).
 */
import { NextResponse } from 'next/server';
import { canManageNews, getCurrentUser } from '@/lib/auth/current-user';
import { getAboutNarrativeDto, parseAboutNarrativeId, patchAboutNarrative } from '@/features/about/server';
import { patchAboutNarrativeSchema } from '@/lib/validation/about';
import { enforceSameOrigin } from '@/lib/security/csrf';
import { writeAudit } from '@/lib/audit/write-audit';

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { id: raw } = await context.params;
  const id = parseAboutNarrativeId(raw);
  if (id == null) {
    return NextResponse.json({ error: 'Érvénytelen azonosító.' }, { status: 400 });
  }

  const user = await getCurrentUser();
  const result = await getAboutNarrativeDto(id, user?.role);
  if (!result.ok) {
    return NextResponse.json({ error: 'Nem található.' }, { status: result.status });
  }

  return NextResponse.json({ narrative: result.narrative });
}

export async function PATCH(request: Request, context: RouteContext) {
  const csrf = enforceSameOrigin(request);
  if (csrf) return csrf;

  const user = await getCurrentUser();
  if (!user || !canManageNews(user.role)) {
    return NextResponse.json({ error: 'Nincs jogosultság.' }, { status: 403 });
  }

  const { id: raw } = await context.params;
  const id = parseAboutNarrativeId(raw);
  if (id == null) {
    return NextResponse.json({ error: 'Érvénytelen azonosító.' }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Érvénytelen JSON.' }, { status: 400 });
  }

  const parsed = patchAboutNarrativeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validációs hiba', details: parsed.error.flatten() }, { status: 400 });
  }

  const result = await patchAboutNarrative(id, parsed.data);
  if (!result.ok) {
    return NextResponse.json({ error: result.error ?? 'Hiba.' }, { status: result.status });
  }
  await writeAudit({
    actor: user,
    action: 'patch_about_narrative',
    entityType: 'about_narrative',
    entityId: String(id),
    details: `fields=${Object.keys(parsed.data).join(',')}`,
  });

  return NextResponse.json({ narrative: result.narrative });
}
