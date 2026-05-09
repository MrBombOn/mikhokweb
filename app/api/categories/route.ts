/**
 * @file REST: kategóriák – lista (GET), létrehozás (POST, OFFICE/ADMIN – `canManageNews`).
 */
import type { CategoryScope, ContentStatus, Prisma } from '@prisma/client';
import { prisma } from '@/lib/db';
import { canManageNews, getCurrentUser } from '@/lib/auth/current-user';
import { badRequest, created, forbidden, ok } from '@/lib/api/response';
import { buildPageInfo } from '@/lib/api/page-info';
import { enforceSameOrigin } from '@/lib/security/csrf';
import { writeAudit } from '@/lib/audit/write-audit';
import { createCategorySchema } from '@/lib/validation/categories';

const scopeValues = ['news', 'events', 'gallery', 'guides', 'office'] as const;
const statusValues = ['draft', 'scheduled', 'published', 'archived', 'deleted'] as const;

function mapCategoryRow(r: {
  id: number;
  scope: string;
  nameHu: string;
  nameEn: string;
  sortOrder: number;
  status: string;
}) {
  return {
    id: r.id,
    scope: r.scope,
    nameHu: r.nameHu,
    nameEn: r.nameEn,
    sortOrder: r.sortOrder,
    status: r.status,
  };
}

export async function GET(request: Request) {
  const user = await getCurrentUser();
  const url = new URL(request.url);

  if (user && canManageNews(user.role)) {
    const q = url.searchParams.get('q')?.trim();
    const scopeParam = url.searchParams.get('scope')?.trim();
    const statusParam = url.searchParams.get('status')?.trim();
    const sortKey = url.searchParams.get('sortKey')?.trim() ?? 'scope';
    const sortDir = url.searchParams.get('sortDir') === 'desc' ? 'desc' : 'asc';

    const rawLimit = Math.min(200, Math.max(5, Number(url.searchParams.get('limit') ?? '50')));
    const rawPage = Math.max(1, Number(url.searchParams.get('page') ?? '1'));
    const limit = Number.isFinite(rawLimit) ? rawLimit : 50;
    const page = Number.isFinite(rawPage) ? rawPage : 1;
    const skip = (page - 1) * limit;

    const where: Prisma.CategoryWhereInput = {
      status: { not: 'deleted' },
      ...(scopeValues.includes(scopeParam as (typeof scopeValues)[number])
        ? { scope: scopeParam as CategoryScope }
        : {}),
      ...(statusValues.includes(statusParam as (typeof statusValues)[number])
        ? { status: statusParam as ContentStatus }
        : {}),
      ...(q
        ? {
            OR: [{ nameHu: { contains: q } }, { nameEn: { contains: q } }],
          }
        : {}),
    };

    const orderBy: Prisma.CategoryOrderByWithRelationInput[] =
      sortKey === 'createdAt'
        ? [{ createdAt: sortDir }, { id: sortDir }]
        : sortKey === 'nameHu'
          ? [{ nameHu: sortDir }, { id: 'asc' }]
          : sortKey === 'sortOrder'
            ? [{ sortOrder: sortDir }, { id: 'asc' }]
            : [{ scope: sortDir }, { sortOrder: 'asc' }, { id: 'asc' }];

    const [rows, total] = await Promise.all([
      prisma.category.findMany({ where, orderBy, skip, take: limit }),
      prisma.category.count({ where }),
    ]);

    return ok({
      items: rows.map(mapCategoryRow),
      pageInfo: {
        ...buildPageInfo({ page, limit, total, sort: `${sortKey}:${sortDir}` }),
      },
    });
  }

  const rows = await prisma.category.findMany({
    where: { status: 'published' },
    orderBy: [{ scope: 'asc' }, { sortOrder: 'asc' }, { id: 'asc' }],
  });

  return ok({
    items: rows.map(mapCategoryRow),
  });
}

export async function POST(request: Request) {
  const csrf = enforceSameOrigin(request);
  if (csrf) return csrf;

  const user = await getCurrentUser();
  if (!user || !canManageNews(user.role)) {
    return forbidden();
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return badRequest('Érvénytelen JSON.');
  }

  const parsed = createCategorySchema.safeParse(body);
  if (!parsed.success) {
    return badRequest('Validációs hiba', parsed.error.flatten());
  }

  const d = parsed.data;
  const row = await prisma.category.create({
    data: {
      scope: d.scope,
      nameHu: d.nameHu.trim(),
      nameEn: d.nameEn.trim(),
      sortOrder: d.sortOrder,
      status: d.status,
    },
  });

  await writeAudit({
    actor: user,
    action: 'create_category',
    entityType: 'category',
    entityId: String(row.id),
    details: `${row.scope}:${row.nameHu}`,
  });

  return created(
    {
      item: {
        id: row.id,
        scope: row.scope,
        nameHu: row.nameHu,
        nameEn: row.nameEn,
        sortOrder: row.sortOrder,
        status: row.status,
      },
    },
  );
}
