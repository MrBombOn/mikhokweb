/**
 * @file REST: kategóriák – lista (GET), létrehozás (POST, ADMIN).
 */
import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { getCurrentUser, isAdmin } from '@/lib/auth/current-user';
import { badRequest, created, forbidden, ok } from '@/lib/api/response';
import { enforceSameOrigin } from '@/lib/security/csrf';
import { writeAudit } from '@/lib/audit/write-audit';

const createCategorySchema = z.object({
  scope: z.enum(['news', 'events', 'gallery', 'guides', 'office']),
  nameHu: z.string().min(1).max(120),
  nameEn: z.string().min(1).max(120),
  sortOrder: z.number().int().default(0),
  status: z.enum(['draft', 'scheduled', 'published', 'archived']).default('published'),
});

export async function GET() {
  const user = await getCurrentUser();
  const where: Prisma.CategoryWhereInput =
    user && isAdmin(user.role) ? { status: { not: 'deleted' } } : { status: 'published' };

  const rows = await prisma.category.findMany({
    where,
    orderBy: [{ scope: 'asc' }, { sortOrder: 'asc' }, { id: 'asc' }],
  });

  return ok({
    items: rows.map((r) => ({
      id: r.id,
      scope: r.scope,
      nameHu: r.nameHu,
      nameEn: r.nameEn,
      sortOrder: r.sortOrder,
      status: r.status,
    })),
  });
}

export async function POST(request: Request) {
  const csrf = enforceSameOrigin(request);
  if (csrf) return csrf;

  const user = await getCurrentUser();
  if (!user || !isAdmin(user.role)) {
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
