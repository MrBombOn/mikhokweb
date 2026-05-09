import { prisma } from '@/lib/db';
import { canManageNews, getCurrentUser } from '@/lib/auth/current-user';
import { forbidden, ok } from '@/lib/api/response';

export async function GET(request: Request) {
  const user = await getCurrentUser();
  if (!user || !canManageNews(user.role)) {
    return forbidden();
  }

  const url = new URL(request.url);
  const status = url.searchParams.get('status');
  const moduleFilter = url.searchParams.get('module');
  const q = url.searchParams.get('q')?.trim();
  const limit = Math.min(200, Math.max(1, Number(url.searchParams.get('limit') ?? '80')));

  const rows = await prisma.feedbackSubmission.findMany({
    where: {
      ...(status ? { status: status as 'new' | 'in_progress' | 'closed' } : {}),
      ...(moduleFilter ? { module: moduleFilter } : {}),
      ...(q
        ? {
            OR: [
              { message: { contains: q } },
              { email: { contains: q } },
              { internalNote: { contains: q } },
            ],
          }
        : {}),
    },
    include: {
      assignee: {
        select: { id: true, username: true, role: true },
      },
    },
    orderBy: [{ createdAt: 'desc' }],
    take: limit,
  });

  return ok({
    items: rows.map((row) => ({
      id: row.id,
      module: row.module,
      message: row.message,
      email: row.email,
      status: row.status,
      assignee: row.assignee,
      assigneeId: row.assigneeId,
      internalNote: row.internalNote,
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
    })),
  });
}
