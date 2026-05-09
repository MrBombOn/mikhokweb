/**
 * @file Mentett nézet törlése – DELETE (tulajdonos + modul jog).
 */
import type { UserRole } from '@prisma/client';
import { prisma } from '@/lib/db';
import { canManageNews, getCurrentUser, isAdmin } from '@/lib/auth/current-user';
import { forbidden, notFound, ok } from '@/lib/api/response';
import { enforceSameOrigin } from '@/lib/security/csrf';
import { writeAudit } from '@/lib/audit/write-audit';

function canAccessSavedViewModule(role: UserRole, module: string): boolean {
  if (module === 'categories') return canManageNews(role);
  if (module === 'audit' || module === 'users') return isAdmin(role);
  return false;
}

type RouteContext = { params: Promise<{ id: string }> };

export async function DELETE(request: Request, ctx: RouteContext) {
  const csrf = enforceSameOrigin(request);
  if (csrf) return csrf;

  const user = await getCurrentUser();
  if (!user) {
    return forbidden();
  }

  const { id } = await ctx.params;
  const row = await prisma.adminSavedView.findUnique({ where: { id } });
  if (!row) {
    return notFound();
  }
  if (row.userId !== user.id) {
    return forbidden();
  }
  if (!canAccessSavedViewModule(user.role, row.module)) {
    return forbidden();
  }

  await prisma.adminSavedView.delete({ where: { id } });

  await writeAudit({
    actor: user,
    action: 'delete_saved_view',
    entityType: 'admin_saved_view',
    entityId: id,
    details: row.module,
  });

  return ok({ deleted: true });
}
