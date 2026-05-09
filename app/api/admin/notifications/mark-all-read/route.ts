/**
 * @file Összes értesítés olvasottnak jelölése (POST).
 */
import { prisma } from '@/lib/db';
import { canManageNews, getCurrentUser } from '@/lib/auth/current-user';
import { forbidden, ok } from '@/lib/api/response';
import { enforceSameOrigin } from '@/lib/security/csrf';

export async function POST(request: Request) {
  const csrf = enforceSameOrigin(request);
  if (csrf) return csrf;

  const user = await getCurrentUser();
  if (!user || !canManageNews(user.role)) {
    return forbidden();
  }

  const now = new Date();
  const result = await prisma.staffNotification.updateMany({
    where: { userId: user.id, readAt: null },
    data: { readAt: now },
  });

  return ok({ updated: result.count });
}
