/**
 * @file REST: hírek lista (GET) + létrehozás (POST, OFFICE/ADMIN).
 */
import { NextResponse } from 'next/server';
import { canManageNews, getCurrentUser } from '@/lib/auth/current-user';
import { createNewsSchema } from '@/features/news/schema';
import { createNewsItem, listNewsForRole } from '@/features/news/server';
import { enforceSameOrigin } from '@/lib/security/csrf';
import { writeAudit } from '@/lib/audit/write-audit';
import { serverLogger } from '@/lib/observability/server-logger';
import { getRequestId, withRequestId } from '@/lib/observability/request-context';

export async function GET() {
  const user = await getCurrentUser();
  const items = await listNewsForRole(user?.role);
  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  const requestId = getRequestId(request);
  const csrf = enforceSameOrigin(request);
  if (csrf) return withRequestId(csrf, requestId);

  const user = await getCurrentUser();
  if (!user || !canManageNews(user.role)) {
    serverLogger.warn('news_create_forbidden', { scope: 'api.news.post', requestId });
    return withRequestId(NextResponse.json({ error: 'Nincs jogosultság.' }, { status: 403 }), requestId);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    serverLogger.warn('news_create_invalid_json', { scope: 'api.news.post', requestId, actorId: user.id });
    return withRequestId(NextResponse.json({ error: 'Érvénytelen JSON.' }, { status: 400 }), requestId);
  }

  const parsed = createNewsSchema.safeParse(body);
  if (!parsed.success) {
    serverLogger.warn('news_create_validation_failed', { scope: 'api.news.post', requestId, actorId: user.id });
    return withRequestId(
      NextResponse.json({ error: 'Validációs hiba', details: parsed.error.flatten() }, { status: 400 }),
      requestId,
    );
  }

  const data = parsed.data;
  const created = await createNewsItem(data);
  if (!created.ok) {
    serverLogger.warn('news_create_duplicate_ingest', {
      scope: 'api.news.post',
      requestId,
      actorId: user.id,
      existingNewsId: created.existingNewsId,
    });
    return withRequestId(
      NextResponse.json(
        {
          error: 'Ez a külső tartalom már szerepel a rendszerben.',
          code: 'duplicate_ingest',
          existingNewsId: created.existingNewsId,
        },
        { status: 409 },
      ),
      requestId,
    );
  }

  const item = created.item;
  await writeAudit({
    actor: user,
    action: 'create_news',
    entityType: 'news',
    entityId: String(item.id),
    details: `${item.status}:${item.category}`,
  });

  serverLogger.info('news_create_success', {
    scope: 'api.news.post',
    requestId,
    actorId: user.id,
    newsId: item.id,
    status: item.status,
    source: item.source,
  });
  return withRequestId(NextResponse.json({ item }, { status: 201 }), requestId);
}
