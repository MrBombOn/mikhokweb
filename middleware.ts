/**
 * @file Edge middleware – `/admin` útvonalak JWT session ellenőrzése
 *
 * @description
 * A Next.js middleware a kérés **Edge** rétegén fut (gyors, globális védelem).
 * Itt **nem** használunk Prisma-t – csak a `jose` `jwtVerify`, ugyanazzal a titokkal,
 * mint a `lib/auth/session.ts`.
 *
 * @sikeres_út
 * - Van `AUTH_SECRET` (vagy dev fallback) → titok bájtok.
 * - Van `SESSION_COOKIE` JWT → verify siker, `role` ∈ { OFFICE, ADMIN } → `next()`.
 *
 * @sikertelen_út
 * - Hiányzó/érvénytelen secret (production hiba) → redirect `/` + `?admin=denied`.
 * - Nincs süti / lejárt JWT / rossz szerepkör → ugyanaz a redirect (a kliensen `AdminDeniedBanner` toastol).
 *
 * @megjegyzés
 * A `AppProvider` GET `/api/auth/session` a **user** objektumot tölti; a middleware a **route**
 * szintű védelmet adja, hogy közvetlen URL beírás se érjen el admin oldalt süti nélkül.
 */
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose/jwt/verify';
import { SESSION_COOKIE, getSessionSecretBytes, type AppRole } from '@/lib/auth/session';

export async function middleware(request: NextRequest) {
  let secret: Uint8Array;
  try {
    secret = getSessionSecretBytes();
  } catch {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    url.searchParams.set('admin', 'denied');
    return NextResponse.redirect(url);
  }
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!token) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    url.searchParams.set('admin', 'denied');
    return NextResponse.redirect(url);
  }
  try {
    const { payload } = await jwtVerify(token, secret, { algorithms: ['HS256'] });
    const role = payload.role as AppRole | undefined;
    if (role !== 'OFFICE' && role !== 'ADMIN') {
      throw new Error('invalid_role');
    }
    return NextResponse.next();
  } catch {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    url.searchParams.set('admin', 'denied');
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
