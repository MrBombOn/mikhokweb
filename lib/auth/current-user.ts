/**
 * @file Bejelentkezett felhasználó lekérése API route-okban (JWT süti + DB).
 */
import { cookies } from 'next/headers';
import type { User, UserRole } from '@prisma/client';
import { prisma } from '@/lib/db';
import { SESSION_COOKIE, verifySessionToken } from '@/lib/auth/session';

export type CurrentUser = Pick<User, 'id' | 'username' | 'role'>;

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const payload = await verifySessionToken(token);
  if (!payload) return null;
  const user = await prisma.user.findUnique({
    where: { id: payload.sub },
    select: { id: true, username: true, role: true },
  });
  return user;
}

export function canManageNews(role: UserRole): boolean {
  return role === 'OFFICE' || role === 'ADMIN';
}
