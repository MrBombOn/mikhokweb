/**
 * @file REST: egy hír GET / PATCH / DELETE (soft delete, OFFICE/ADMIN íráshoz).
 */
import { NextResponse } from 'next/server';
import { canManageNews, getCurrentUser } from '@/lib/auth/current-user';
import { patchNewsSchema } from '@/features/news/schema';
import { newsRowToItem } from '@/features/news/mapper';
import { canReadNewsItem, getNewsItemById, parseNewsId, softDeleteNewsItem, updateNewsItem } from '@/features/news/server';
import { apiRequestLog } from '@/lib/observability/api-request-log';
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
  const log = apiRequestLog(request, 'api.news.patch');
  const csrf = enforceSameOrigin(request);
  if (csrf) return log.wrap(csrf);

  const user = await getCurrentUser();
  if (!user || !canManageNews(user.role)) {
    return log.wrap(NextResponse.json({ error: 'Nincs jogosultság.' }, { status: 403 }));
  }

  const { id: raw } = await context.params;
  const id = parseNewsId(raw);
  if (id == null) {
    return log.wrap(NextResponse.json({ error: 'Érvénytelen azonosító.' }, { status: 400 }));
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return log.wrap(NextResponse.json({ error: 'Érvénytelen JSON.' }, { status: 400 }));
  }

  const parsed = patchNewsSchema.safeParse(body);
  if (!parsed.success) {
    return log.wrap(NextResponse.json({ error: 'Validációs hiba', details: parsed.error.flatten() }, { status: 400 }));
  }

  const existing = await getNewsItemById(id);
  if (!existing) {
    return log.wrap(NextResponse.json({ error: 'Nem található.' }, { status: 404 }));
  }

  const updated = await updateNewsItem(id, parsed.data, user.id);
  if (!updated.ok) {
    if (updated.code === 'not_found') {
      return log.wrap(NextResponse.json({ error: 'Nem található.' }, { status: 404 }));
    }
    return log.wrap(
      NextResponse.json(
        {
          error: 'Közzétételhez add meg a borító alternatív szövegét HU és EN nyelven.',
          code: 'publish_requires_alt',
        },
        { status: 400 },
      ),
    );
  }

  const row = updated.item;
  await writeAudit({
    actor: user,
    action: 'patch_news',
    entityType: 'news',
    entityId: String(id),
    details: `fields=${Object.keys(parsed.data).join(',')}`,
  });

  log.info('news_patched', { actorId: user.id, newsId: id });
  return log.wrap(NextResponse.json({ item: row }));
}


export async function DELETE(request: Request, context: RouteContext) {
  const log = apiRequestLog(request, 'api.news.delete');
  const csrf = enforceSameOrigin(request);
  if (csrf) return log.wrap(csrf);

  const user = await getCurrentUser();
  if (!user || !canManageNews(user.role)) {
    return log.wrap(NextResponse.json({ error: 'Nincs jogosultság.' }, { status: 403 }));
  }

  const { id: raw } = await context.params;
  const id = parseNewsId(raw);
  if (id == null) {
    return log.wrap(NextResponse.json({ error: 'Érvénytelen azonosító.' }, { status: 400 }));
  }

  const existing = await getNewsItemById(id);
  if (!existing) {
    return log.wrap(NextResponse.json({ error: 'Nem található.' }, { status: 404 }));
  }

  await softDeleteNewsItem(id);
  await writeAudit({
    actor: user,
    action: 'delete_news',
    entityType: 'news',
    entityId: String(id),
    details: `status=${existing.status}->deleted`,
  });

  log.info('news_deleted', { actorId: user.id, newsId: id });
  return log.wrap(NextResponse.json({ ok: true }));
}
