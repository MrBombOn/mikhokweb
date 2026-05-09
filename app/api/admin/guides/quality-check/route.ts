import { access } from 'node:fs/promises';
import path from 'node:path';
import { canManageNews, getCurrentUser } from '@/lib/auth/current-user';
import { forbidden, ok } from '@/lib/api/response';
import { prisma } from '@/lib/db';

async function checkLocalDocument(url: string): Promise<boolean> {
  if (!url.startsWith('/')) return false;
  const rel = url.replace(/^\/+/, '');
  const abs = path.join(process.cwd(), 'public', rel);
  try {
    await access(abs);
    return true;
  } catch {
    return false;
  }
}

export async function GET() {
  const user = await getCurrentUser();
  if (!user || !canManageNews(user.role)) return forbidden();

  const rows = await prisma.guide.findMany({
    where: { status: { not: 'deleted' } },
    orderBy: [{ id: 'desc' }],
    take: 500,
  });

  const checks = await Promise.all(
    rows.map(async (g) => {
      const issues: string[] = [];
      if (!g.titleHu.trim() || !g.titleEn.trim()) issues.push('missing_title');
      if (!g.excerptHu.trim() || !g.excerptEn.trim()) issues.push('missing_excerpt');
      if (!g.bodyHu.trim() || !g.bodyEn.trim()) issues.push('missing_body');
      if (!g.keywords.trim()) issues.push('missing_keywords');
      if (!g.topic.trim()) issues.push('missing_topic');

      const url = (g.documentUrl ?? '').trim();
      if (!url) {
        issues.push('missing_document');
      } else if (url.startsWith('/')) {
        const exists = await checkLocalDocument(url);
        if (!exists) issues.push('broken_local_document');
      } else if (!/^https?:\/\//i.test(url)) {
        issues.push('invalid_document_url');
      }

      return {
        id: g.id,
        titleHu: g.titleHu,
        titleEn: g.titleEn,
        status: g.status,
        issues,
        score: Math.max(0, 100 - issues.length * 12),
      };
    }),
  );

  const withIssues = checks.filter((x) => x.issues.length > 0);
  return ok({
    total: checks.length,
    withIssues: withIssues.length,
    passed: checks.length - withIssues.length,
    items: checks,
  });
}

