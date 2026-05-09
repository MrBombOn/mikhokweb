import { canManageNews, getCurrentUser } from '@/lib/auth/current-user';
import { ok, forbidden } from '@/lib/api/response';
import { prisma } from '@/lib/db';
import { access } from 'node:fs/promises';
import path from 'node:path';

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

async function checkLocalUrl(url: string) {
  const rel = url.replace(/^\/+/, '');
  const abs = path.join(process.cwd(), 'public', rel);
  try {
    await access(abs);
    return { ok: true, status: 200 };
  } catch {
    return { ok: false, status: 404 };
  }
}

export async function GET() {
  const user = await getCurrentUser();
  if (!user || !canManageNews(user.role)) {
    return forbidden();
  }

  const rows = await prisma.guide.findMany({
    where: { documentUrl: { not: null }, status: { not: 'deleted' } },
    select: { id: true, titleHu: true, titleEn: true, documentUrl: true, status: true },
    orderBy: [{ id: 'desc' }],
    take: 300,
  });

  const checks = await Promise.all(
    rows.map(async (row) => {
      const u = (row.documentUrl ?? '').trim();
      const looksHttp = /^https?:\/\//i.test(u);
      const looksLocal = u.startsWith('/');
      if (!looksHttp && !looksLocal) {
        return { id: row.id, titleHu: row.titleHu, titleEn: row.titleEn, url: u, status: row.status, reachable: false, httpStatus: -1 };
      }
      const result = looksLocal ? await checkLocalUrl(u) : await checkUrl(u);
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
