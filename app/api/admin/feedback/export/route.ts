import { canManageNews, getCurrentUser } from '@/lib/auth/current-user';
import { prisma } from '@/lib/db';

function csvEscape(value: string) {
  return `"${value.replace(/"/g, '""')}"`;
}

function toCsv(rows: Array<Record<string, string>>) {
  const headers = ['id', 'module', 'status', 'email', 'assignee', 'internalNote', 'message', 'createdAt', 'updatedAt'];
  const body = rows.map((r) => headers.map((h) => csvEscape(r[h] ?? '')).join(',')).join('\n');
  return `\uFEFF${headers.join(',')}\n${body}\n`;
}

export async function GET(request: Request) {
  const user = await getCurrentUser();
  if (!user || !canManageNews(user.role)) {
    return new Response('Nincs jogosultság.', { status: 403 });
  }

  const url = new URL(request.url);
  const status = url.searchParams.get('status');
  const moduleFilter = url.searchParams.get('module');
  const q = url.searchParams.get('q')?.trim();
  const limit = Math.min(5000, Math.max(1, Number(url.searchParams.get('limit') ?? '1000')));

  const rows = await prisma.feedbackSubmission.findMany({
    where: {
      ...(status ? { status: status as 'new' | 'in_progress' | 'closed' } : {}),
      ...(moduleFilter ? { module: moduleFilter } : {}),
      ...(q
        ? {
            OR: [{ message: { contains: q } }, { email: { contains: q } }, { internalNote: { contains: q } }],
          }
        : {}),
    },
    include: {
      assignee: { select: { username: true } },
    },
    orderBy: [{ createdAt: 'desc' }],
    take: limit,
  });

  const csv = toCsv(
    rows.map((row) => ({
      id: row.id,
      module: row.module,
      status: row.status,
      email: row.email ?? '',
      assignee: row.assignee?.username ?? '',
      internalNote: row.internalNote ?? '',
      message: row.message,
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
    })),
  );

  const ts = new Date().toISOString().slice(0, 10);
  return new Response(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="feedback-export-${ts}.csv"`,
    },
  });
}

