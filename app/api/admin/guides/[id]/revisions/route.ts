import { badRequest, forbidden, ok } from '@/lib/api/response';
import { canManageNews, getCurrentUser } from '@/lib/auth/current-user';
import { prisma } from '@/lib/db';

type RouteContext = { params: Promise<{ id: string }> };

function parseGuideId(raw: string): number | null {
  const n = Number(raw);
  return Number.isInteger(n) && n > 0 ? n : null;
}

export async function GET(_request: Request, context: RouteContext) {
  const user = await getCurrentUser();
  if (!user || !canManageNews(user.role)) return forbidden();

  const id = parseGuideId((await context.params).id);
  if (!id) return badRequest('Hibás guide azonosító.');

  const rows = await prisma.guideRevision.findMany({
    where: { guideId: id },
    orderBy: [{ version: 'desc' }],
    take: 30,
    select: { id: true, version: true, payloadJson: true, createdAt: true },
  });

  return ok({
    items: rows.map((r) => ({
      id: r.id,
      version: r.version,
      payloadJson: r.payloadJson,
      createdAt: r.createdAt.toISOString(),
    })),
  });
}

