/**
 * @file REST: egy hír GET / PATCH / DELETE (soft delete, OFFICE/ADMIN íráshoz).
 */
import { NextResponse } from 'next/server';
import { canManageNews, getCurrentUser } from '@/lib/auth/current-user';
import { patchNewsSchema } from '@/features/news/schema';
import { newsRowToItem } from '@/features/news/mapper';
import { canReadNewsItem, getNewsItemById, parseNewsId, softDeleteNewsItem, updateNewsItem } from '@/features/news/server';
import { enforceSameOrigin } from '@/lib/security/csrf';
import { writeAudit } from '@/lib/audit/write-audit';

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { id: raw } = await context.params;
  const id = parseNewsId(raw);
  if (id == null) {
    return NextResponse.json({ error: 'Érvénytelen azonosító.' }, { status: 400 });
  }

  const user = await getCurrentUser();
  const row = await getNewsItemById(id);
  if (!row) {
    return NextResponse.json({ error: 'Nem található.' }, { status: 404 });
  }

  if (!canReadNewsItem(user?.role, row.status)) {
    return NextResponse.json({ error: 'Nem található.' }, { status: 404 });
  }

  return NextResponse.json({ item: newsRowToItem(row) });
}

export async function PATCH(request: Request, context: RouteContext) {
  const csrf = enforceSameOrigin(request);
  if (csrf) return csrf;

  const user = await getCurrentUser();
  if (!user || !canManageNews(user.role)) {
    return NextResponse.json({ error: 'Nincs jogosultság.' }, { status: 403 });
  }

  const { id: raw } = await context.params;
  const id = parseNewsId(raw);
  if (id == null) {
    return NextResponse.json({ error: 'Érvénytelen azonosító.' }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Érvénytelen JSON.' }, { status: 400 });
  }

  const parsed = patchNewsSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validációs hiba', details: parsed.error.flatten() }, { status: 400 });
  }

  const existing = await getNewsItemById(id);
  if (!existing) {
    return NextResponse.json({ error: 'Nem található.' }, { status: 404 });
  }

  const row = await updateNewsItem(id, parsed.data);
  await writeAudit({
    actor: user,
    action: 'patch_news',
    entityType: 'news',
    entityId: String(id),
    details: `fields=${Object.keys(parsed.data).join(',')}`,
  });

  return NextResponse.json({ item: row });
}

export async function DELETE(request: Request, context: RouteContext) {
  const csrf = enforceSameOrigin(request);
  if (csrf) return csrf;

  const user = await getCurrentUser();
  if (!user || !canManageNews(user.role)) {
    return NextResponse.json({ error: 'Nincs jogosultság.' }, { status: 403 });
  }

  const { id: raw } = await context.params;
  const id = parseNewsId(raw);
  if (id == null) {
    return NextResponse.json({ error: 'Érvénytelen azonosító.' }, { status: 400 });
  }

  const existing = await getNewsItemById(id);
  if (!existing) {
    return NextResponse.json({ error: 'Nem található.' }, { status: 404 });
  }

  await softDeleteNewsItem(id);
  await writeAudit({
    actor: user,
    action: 'delete_news',
    entityType: 'news',
    entityId: String(id),
    details: `status=${existing.status}->deleted`,
  });

  return NextResponse.json({ ok: true });
}
