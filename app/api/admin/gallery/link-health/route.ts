import { canManageNews, getCurrentUser } from '@/lib/auth/current-user';
import { forbidden, ok } from '@/lib/api/response';
import { prisma } from '@/lib/db';

async function checkUrl(url: string) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 6000);
  try {
    const head = await fetch(url, { method: 'HEAD', redirect: 'follow', signal: controller.signal });
    if (head.ok) return { ok: true, status: head.status };
    const get = await fetch(url, { method: 'GET', redirect: 'follow', signal: controller.signal });
    return { ok: get.ok, status: get.status };
  } catch {
    return { ok: false, status: 0 };
  } finally {
    clearTimeout(timeout);
  }
}

export async function GET() {
  const user = await getCurrentUser();
  if (!user || !canManageNews(user.role)) {
    return forbidden();
  }

  const rows = await prisma.galleryItem.findMany({
    where: { status: { not: 'deleted' }, imageUrl: { not: '' } },
    select: { id: true, titleHu: true, titleEn: true, imageUrl: true, status: true },
    orderBy: [{ id: 'desc' }],
    take: 400,
  });

  const checks = await Promise.all(
    rows.map(async (row) => {
      const u = row.imageUrl.trim();
      const looksHttp = /^https?:\/\//i.test(u);
      if (!looksHttp) {
        return { id: row.id, titleHu: row.titleHu, titleEn: row.titleEn, url: u, status: row.status, reachable: false, httpStatus: -1 };
      }
      const result = await checkUrl(u);
      return {
        id: row.id,
        titleHu: row.titleHu,
        titleEn: row.titleEn,
        url: u,
        status: row.status,
        reachable: result.ok,
        httpStatus: result.status,
      };
    }),
  );

  const broken = checks.filter((x) => !x.reachable);
  return ok({
    total: checks.length,
    reachable: checks.length - broken.length,
    broken: broken.length,
    items: checks,
  });
}
