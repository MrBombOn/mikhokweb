import { prisma } from '@/lib/db';

export type DeleteStaffUserResult =
  | { ok: true }
  | { ok: false; code: 'not_found' | 'last_admin' };

/** Tesztekhez: utolsó ADMIN esetén tiltás. */
export function isDeleteBlockedForLastAdmin(role: 'OFFICE' | 'ADMIN', adminCount: number): boolean {
  return role === 'ADMIN' && adminCount <= 1;
}

/**
 * Utolsó ADMIN törlése tiltott. OFFICE bármikor törölhető (ha létezik).
 */
export async function canDeleteStaffUser(targetUserId: string): Promise<DeleteStaffUserResult> {
  const target = await prisma.user.findUnique({
    where: { id: targetUserId },
    select: { id: true, role: true },
  });
  if (!target) return { ok: false, code: 'not_found' };
  if (target.role !== 'ADMIN') return { ok: true };

  const adminCount = await prisma.user.count({ where: { role: 'ADMIN' } });
  if (isDeleteBlockedForLastAdmin('ADMIN', adminCount)) return { ok: false, code: 'last_admin' };
  return { ok: true };
}
