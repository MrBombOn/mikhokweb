/**
 * @file Hasonló címek – szerkesztői segéd (opcionális Fázis 14), OFFICE/ADMIN.
 */
import { NextResponse } from 'next/server';
import { findSimilarPublishedTitles } from '@/lib/search/similar-content';
import { canManageNews, getCurrentUser } from '@/lib/auth/current-user';
import { apiRequestLog } from '@/lib/observability/api-request-log';
import { enforceSameOrigin } from '@/lib/security/csrf';

export async function GET(request: Request) {
  const log = apiRequestLog(request, 'api.admin.search.similar.get');
  const csrf = enforceSameOrigin(request);
  if (csrf) return log.wrap(csrf);

  const user = await getCurrentUser();
  if (!user || !canManageNews(user.role)) {
    return log.wrap(NextResponse.json({ error: 'Nincs jogosultság.' }, { status: 403 }));
  }

  const q = new URL(request.url).searchParams.get('q')?.slice(0, 200) ?? '';
  const items = await findSimilarPublishedTitles(q, 10);
  log.info('admin_search_similar', { actorId: user.id, qLen: q.trim().length });
  return log.wrap(NextResponse.json({ items }));
}
