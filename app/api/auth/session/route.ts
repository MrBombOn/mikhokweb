/**
 * @file Aktuális session lekérdezése és kilépés
 *
 * @description
 * - **GET**: JWT süti alapján betölti a `prisma.user` rekordot (id, username, role).
 *   Érvénytelen / lejárt token esetén `{ user: null }` + süti törlés.
 *   **P2:** az élettartam felénél új JWT + süti (`session rotáció`) – aktivitásra frissül a lejárat.
 * - **DELETE**: session és régi `hok_admin_gate` süti törlése (legacy admin gate kompatibilitás).
 */
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import {
  verifySessionTokenDetailed,
  SESSION_COOKIE,
  SESSION_MAX_AGE_SEC,
  signSessionToken,
  sessionCookieBase,
} from '@/lib/auth/session';
import { enforceSameOrigin } from '@/lib/security/csrf';

const LEGACY_GATE = 'hok_admin_gate';

export async function GET() {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) {
    return NextResponse.json({ user: null });
  }
  const detailed = await verifySessionTokenDetailed(token);
  if (!detailed) {
    const res = NextResponse.json({ user: null });
    res.cookies.delete(SESSION_COOKIE);
    return res;
  }
  const user = await prisma.user.findUnique({
    where: { id: detailed.sub },
    select: { id: true, username: true, role: true },
  });
  if (!user) {
    const res = NextResponse.json({ user: null });
    res.cookies.delete(SESSION_COOKIE);
    return res;
  }

  const res = NextResponse.json({ user });
  const nowSec = Math.floor(Date.now() / 1000);
  if (nowSec - detailed.issuedAtSec >= SESSION_MAX_AGE_SEC / 2) {
    const newTok = await signSessionToken(detailed.sub, detailed.role);
    res.cookies.set(SESSION_COOKIE, newTok, sessionCookieBase);
  }
  return res;
}

export async function DELETE(request: Request) {
  const csrf = enforceSameOrigin(request);
  if (csrf) return csrf;

  const res = NextResponse.json({ ok: true });
  res.cookies.delete(SESSION_COOKIE);
  res.cookies.delete(LEGACY_GATE);
  return res;
}
