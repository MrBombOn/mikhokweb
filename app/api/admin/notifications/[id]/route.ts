/**
 * @file Egy értesítés olvasottnak jelölése (PATCH).
 */
import { prisma } from '@/lib/db';
import { canManageNews, getCurrentUser } from '@/lib/auth/current-user';
import { forbidden, notFound, ok } from '@/lib/api/response';
import { enforceSameOrigin } from '@/lib/security/csrf';

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, ctx: RouteContext) {
  const csrf = enforceSameOrigin(request);
  if (csrf) return csrf;

  const user = await getCurrentUser();
  if (!user || !canManageNews(user.role)) {
    return forbidden();
  }

  const { id } = await ctx.params;
  const row = await prisma.staffNotification.findUnique({ where: { id } });
  if (!row || row.userId !== user.id) {
    return notFound();
  }

  let read = true;
  try {
    const body = (await request.json().catch(() => ({}))) as { read?: unknown };
    if (typeof body.read === 'boolean') read = body.read;
  } catch {
    read = true;
  }

  const updated = await prisma.staffNotification.update({
    where: { id },
    data: { readAt: read ? new Date() : null },
  });

  return ok({
    item: {
      id: updated.id,
      readAt: updated.readAt?.toISOString() ?? null,
    },
  });
}
