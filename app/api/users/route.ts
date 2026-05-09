/**
 * @file REST: felhasználók admin – lista (GET), létrehozás (POST).
 */
import type { Prisma } from '@prisma/client';
import { prisma } from '@/lib/db';
import { getCurrentUser, isAdmin } from '@/lib/auth/current-user';
import { hashPassword } from '@/lib/auth/password';
import { badRequest, conflict, created, forbidden, ok } from '@/lib/api/response';
import { buildPageInfo } from '@/lib/api/page-info';
import { enforceSameOrigin } from '@/lib/security/csrf';
import { writeAudit } from '@/lib/audit/write-audit';
import { createUserSchema } from '@/lib/validation/users';

export async function GET(request: Request) {
  const user = await getCurrentUser();
  if (!user || !isAdmin(user.role)) {
    return forbidden();
  }

  const url = new URL(request.url);
  const q = url.searchParams.get('q')?.trim();
  const roleFilter = url.searchParams.get('role')?.trim();
  const sort = url.searchParams.get('sort') === 'asc' ? 'asc' : 'desc';
  const rawLimit = Math.min(200, Math.max(5, Number(url.searchParams.get('limit') ?? '25')));
  const rawPage = Math.max(1, Number(url.searchParams.get('page') ?? '1'));
  const limit = Number.isFinite(rawLimit) ? rawLimit : 25;
  const page = Number.isFinite(rawPage) ? rawPage : 1;
  const skip = (page - 1) * limit;

  const where: Prisma.UserWhereInput = {
    ...(q ? { username: { contains: q } } : {}),
    ...(roleFilter === 'OFFICE' || roleFilter === 'ADMIN' ? { role: roleFilter } : {}),
  };

  const [rows, total] = await Promise.all([
    prisma.user.findMany({
      where,
      orderBy: [{ createdAt: sort }, { id: sort }],
      skip,
      take: limit,
      select: { id: true, username: true, role: true, createdAt: true, updatedAt: true },
    }),
    prisma.user.count({ where }),
  ]);

  return ok({
    items: rows.map((r) => ({
      id: r.id,
      username: r.username,
      role: r.role,
      createdAt: r.createdAt.toISOString(),
      updatedAt: r.updatedAt.toISOString(),
    })),
    pageInfo: {
      ...buildPageInfo({ page, limit, total, sort }),
    },
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

  const parsed = createUserSchema.safeParse(body);
  if (!parsed.success) {
    return badRequest('Validációs hiba', parsed.error.flatten());
  }

  const d = parsed.data;
  const exists = await prisma.user.findUnique({ where: { username: d.username.trim() } });
  if (exists) {
    return conflict('A felhasználónév már foglalt.');
  }

  const passwordHash = await hashPassword(d.password);
  const row = await prisma.user.create({
    data: { username: d.username.trim(), passwordHash, role: d.role },
    select: { id: true, username: true, role: true, createdAt: true, updatedAt: true },
  });

  await writeAudit({
    actor: user,
    action: 'create_user',
    entityType: 'user',
    entityId: row.id,
    details: `role=${row.role}`,
  });

  return created(
    {
      item: {
        id: row.id,
        username: row.username,
        role: row.role,
        createdAt: row.createdAt.toISOString(),
        updatedAt: row.updatedAt.toISOString(),
      },
    },
  );
}
