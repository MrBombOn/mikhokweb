/**
 * @file Aktuális session lekérdezése és kilépés
 *
 * @description
 * - **GET**: JWT süti alapján betölti a `prisma.user` rekordot (id, username, role).
 *   Érvénytelen / lejárt token esetén `{ user: null }` + süti törlés.
 * - **DELETE**: session és régi `hok_admin_gate` süti törlése (legacy admin gate kompatibilitás).
 */
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifySessionToken, SESSION_COOKIE } from '@/lib/auth/session';
import { enforceSameOrigin } from '@/lib/security/csrf';

const LEGACY_GATE = 'hok_admin_gate';

export async function GET() {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) {
    return NextResponse.json({ user: null });
  }
  const session = await verifySessionToken(token);
  if (!session) {
    const res = NextResponse.json({ user: null });
    res.cookies.delete(SESSION_COOKIE);
    return res;
  }
  const user = await prisma.user.findUnique({
    where: { id: session.sub },
    select: { id: true, username: true, role: true },
  });
  if (!user) {
    const res = NextResponse.json({ user: null });
    res.cookies.delete(SESSION_COOKIE);
    return res;
  }
  return NextResponse.json({ user });
}

export async function DELETE(request: Request) {
  const csrf = enforceSameOrigin(request);
  if (csrf) return csrf;

  const res = NextResponse.json({ ok: true });
  res.cookies.delete(SESSION_COOKIE);
  res.cookies.delete(LEGACY_GATE);
  return res;
}
