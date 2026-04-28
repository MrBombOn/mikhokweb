/**
 * @file Felhasználónév + jelszó alapú bejelentkezés
 *
 * @description
 * 1. JSON body Zod validáció (`loginFormSchema`).
 * 2. `prisma.user.findUnique` felhasználónév alapján.
 * 3. `verifyPassword` bcrypt összehasonlítás.
 * 4. Siker: `signSessionToken` + `Set-Cookie` (`SESSION_COOKIE`), régi gate süti törlése.
 *
 * @hibakódok
 * - 400: `invalid_body` – sémahiba
 * - 401: `invalid_credentials` – nincs user vagy rossz jelszó
 */
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { loginFormSchema } from '@/lib/validation/auth';
import { verifyPassword } from '@/lib/auth/password';
import { signSessionToken, SESSION_COOKIE, sessionCookieBase } from '@/lib/auth/session';

const LEGACY_GATE = 'hok_admin_gate';

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = loginFormSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid_body' }, { status: 400 });
  }
  const { username, password } = parsed.data;
  const user = await prisma.user.findUnique({ where: { username: username.trim() } });
  if (!user) {
    return NextResponse.json({ error: 'invalid_credentials' }, { status: 401 });
  }
  const ok = await verifyPassword(password, user.passwordHash);
  if (!ok) {
    return NextResponse.json({ error: 'invalid_credentials' }, { status: 401 });
  }
  const token = await signSessionToken(user.id, user.role);
  const res = NextResponse.json({
    user: { id: user.id, username: user.username, role: user.role },
  });
  res.cookies.set(SESSION_COOKIE, token, sessionCookieBase);
  res.cookies.delete(LEGACY_GATE);
  return res;
}
