/**
 * @file Új előnézeti token generálása (OFFICE/ADMIN).
 */
import { badRequest, forbidden, notFound, ok } from '@/lib/api/response';
import { canManageNews, getCurrentUser } from '@/lib/auth/current-user';
import { parseNewsId, rotateNewsPreviewToken } from '@/features/news/server';
import { enforceSameOrigin } from '@/lib/security/csrf';
import { getBaseUrl } from '@/lib/seo';

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(request: Request, context: RouteContext) {
  const csrf = enforceSameOrigin(request);
  if (csrf) return csrf;

  const user = await getCurrentUser();
  if (!user || !canManageNews(user.role)) {
    return forbidden();
  }

  const { id: raw } = await context.params;
  const id = parseNewsId(raw);
  if (id == null) {
    return badRequest('Érvénytelen azonosító.');
  }

  const out = await rotateNewsPreviewToken(id);
  if (!out) return notFound();

  const base = getBaseUrl().replace(/\/$/, '');
  const previewUrl = `${base}/api/news/preview?token=${encodeURIComponent(out.token)}`;

  return ok({ token: out.token, previewUrl });
}
