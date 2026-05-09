/**
 * @file Szerepkör segédfüggvények (Edge / middleware kompatibilis, Prisma nélkül)
 *
 * @description
 * A `UserRole` enum értékeivel egyező stringek; JWT `role` claim és API ellenőrzéshez.
 */

/** Útvonalak, ahol csak `ADMIN` szerepkör léphet be (middleware + API `isAdmin`). */
export const ADMIN_ONLY_ADMIN_PATH_PREFIXES = ['/admin/users', '/admin/audit'] as const;

export function isStaffRole(role: string | undefined | null): role is 'OFFICE' | 'ADMIN' {
  return role === 'OFFICE' || role === 'ADMIN';
}

export function isAdminRole(role: string | undefined | null): boolean {
  return role === 'ADMIN';
}

export function pathnameRequiresAdminRole(pathname: string): boolean {
  return ADMIN_ONLY_ADMIN_PATH_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}
