/**
 * @file Mentett admin tábla nézetek – GET (lista), POST (létrehozás).
 */
import type { UserRole } from '@prisma/client';
import { prisma } from '@/lib/db';
import { canManageNews, getCurrentUser, isAdmin } from '@/lib/auth/current-user';
import { badRequest, created, forbidden, ok } from '@/lib/api/response';
import { enforceSameOrigin } from '@/lib/security/csrf';
import { writeAudit } from '@/lib/audit/write-audit';
import { createSavedViewSchema, savedViewModuleSchema } from '@/lib/validation/saved-views';

function canAccessSavedViewModule(role: UserRole, module: string): boolean {
  if (module === 'categories') return canManageNews(role);
  if (module === 'audit' || module === 'users') return isAdmin(role);
  return false;
}

export async function GET(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return forbidden();
  }

  const url = new URL(request.url);
  const moduleParam = url.searchParams.get('module')?.trim();
  const mod = savedViewModuleSchema.safeParse(moduleParam);
  if (!mod.success) {
    return badRequest('Hiányzó vagy érvénytelen module.');
  }
  if (!canAccessSavedViewModule(user.role, mod.data)) {
    return forbidden();
  }

  const rows = await prisma.adminSavedView.findMany({
    where: { userId: user.id, module: mod.data },
    orderBy: [{ updatedAt: 'desc' }],
    select: { id: true, module: true, name: true, payload: true, createdAt: true, updatedAt: true },
  });

  return ok({
    items: rows.map((r) => ({
      id: r.id,
      module: r.module,
      name: r.name,
      payload: r.payload,
      createdAt: r.createdAt.toISOString(),
      updatedAt: r.updatedAt.toISOString(),
    })),
  });
}

export async function POST(request: Request) {
  const csrf = enforceSameOrigin(request);
  if (csrf) return csrf;

  const user = await getCurrentUser();
  if (!user) {
    return forbidden();
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return badRequest('Érvénytelen JSON.');
  }

  const parsed = createSavedViewSchema.safeParse(body);
  if (!parsed.success) {
    return badRequest('Validációs hiba', parsed.error.flatten());
  }

  if (!canAccessSavedViewModule(user.role, parsed.data.module)) {
    return forbidden();
  }

  const row = await prisma.adminSavedView.create({
    data: {
      userId: user.id,
      module: parsed.data.module,
      name: parsed.data.name,
      payload: JSON.parse(JSON.stringify(parsed.data.payload)) as object,
    },
    select: { id: true, module: true, name: true, payload: true, createdAt: true, updatedAt: true },
  });

  await writeAudit({
    actor: user,
    action: 'create_saved_view',
    entityType: 'admin_saved_view',
    entityId: row.id,
    details: `${row.module}:${row.name}`,
  });

  return created({
    item: {
      id: row.id,
      module: row.module,
      name: row.name,
      payload: row.payload,
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
    },
  });
}
