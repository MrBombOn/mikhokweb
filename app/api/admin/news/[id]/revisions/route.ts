/**
 * @file Admin: hír revízió előzmények (snapshot JSON).
 */
import { badRequest, forbidden, notFound, ok } from '@/lib/api/response';
import { canManageNews, getCurrentUser } from '@/lib/auth/current-user';
import { getNewsItemById, listNewsRevisionsForNews, parseNewsId } from '@/features/news/server';

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const user = await getCurrentUser();
  if (!user || !canManageNews(user.role)) {
    return forbidden();
  }

  const { id: raw } = await context.params;
  const id = parseNewsId(raw);
  if (id == null) {
    return badRequest('Érvénytelen azonosító.');
  }

  const row = await getNewsItemById(id);
  if (!row) return notFound();

  const revisions = await listNewsRevisionsForNews(id);
  return ok({
    items: revisions.map((r) => ({
      id: r.id,
      editorId: r.editorId,
      createdAt: r.createdAt.toISOString(),
      payload: r.payload,
    })),
  });
}
