/**
 * @file JWT alapú session kezelés (jose könyvtár – Edge-kompatibilis aláírás/ellenőrzés)
 *
 * @description
 * A bejelentkezett felhasználó azonosítója **JWT**-ben van (`SESSION_COOKIE` süti).
 * A `jose` csomagot használjuk a `jsonwebtoken` helyett, mert natív Web Crypto API-n fut,
 * így **middleware** / Edge környezetben is verifikálható (Prisma nélkül).
 *
 * @payload
 * - `sub`: felhasználó egyedi azonosító (string, általában CUID/UUID).
 * - `role`: `OFFICE` | `ADMIN` – RBAC váz.
 *
 * @biztonság
 * - Production: kötelező `AUTH_SECRET` legalább 32 karakter.
 * - Fejlesztés: fallback titok (csak lokálisan!).
 */
import { SignJWT } from 'jose/jwt/sign';
import { jwtVerify } from 'jose/jwt/verify';

/** Alkalmazás szerepkörök – bővíthető a Prisma enum szerint. */
export type AppRole = 'OFFICE' | 'ADMIN';

/** HttpOnly session süti neve. */
export const SESSION_COOKIE = 'hok_session';

/** JWT élettartam másodpercben (7 nap). */
export const SESSION_MAX_AGE_SEC = 60 * 60 * 24 * 7;

/** Csak fejlesztéshez; productionban kötelező a 32+ karakteres AUTH_SECRET. */
const DEV_AUTH_SECRET_FALLBACK = '01234567890123456789012345678901';

/**
 * HS256 aláíráshoz titok bájtokban.
 * @throws Production hiányzó/rövid secret esetén
 */
export function getSessionSecretBytes(): Uint8Array {
  const s = process.env.AUTH_SECRET;
  if (s && s.length >= 32) {
    return new TextEncoder().encode(s);
  }
  if (process.env.NODE_ENV === 'production') {
    throw new Error('AUTH_SECRET hiányzik vagy rövidebb 32 karakternél (production).');
  }
  return new TextEncoder().encode(DEV_AUTH_SECRET_FALLBACK);
}

/** JWT payload minimális alakja a verify után. */
export type SessionPayload = { sub: string; role: AppRole };

/** Új JWT kiállítása – login siker után hívódik. */
export async function signSessionToken(userId: string, role: AppRole): Promise<string> {
  return new SignJWT({ role })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(userId)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE_SEC}s`)
    .sign(getSessionSecretBytes());
}

/**
 * JWT ellenőrzés – `iat` az aktivitás-alapú session rotációhoz (`GET /api/auth/session`).
 */
export async function verifySessionTokenDetailed(token: string): Promise<(SessionPayload & { issuedAtSec: number }) | null> {
  try {
    const { payload } = await jwtVerify(token, getSessionSecretBytes(), { algorithms: ['HS256'] });
    const sub = payload.sub;
    const role = payload.role as AppRole | undefined;
    if (!sub || (role !== 'OFFICE' && role !== 'ADMIN')) {
      return null;
    }
    const issuedAtSec =
      typeof payload.iat === 'number' ? payload.iat : Math.floor(Date.now() / 1000);
    return { sub, role, issuedAtSec };
  } catch {
    return null;
  }
}

/**
 * JWT ellenőrzés – lejárt vagy hibás aláírás → `null`.
 * @param token – süti érték nyers string
 */
export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  const d = await verifySessionTokenDetailed(token);
  return d ? { sub: d.sub, role: d.role } : null;
}

/** `cookies().set()` közös opciói a session sütihez.
 *
 * - **httpOnly** – JS nem olvashatja (XSS ellen).
 * - **sameSite: strict** – CSRF csökkentés cross-site POST ellen.
 * - **secure** – élesben csak HTTPS-en küldjük a sütit.
 * - **maxAge** – JWT `exp`-pel egyező abszolút lejárat; aktivitásra **rotáció**: `GET /api/auth/session`.
 */
export const sessionCookieBase = {
  httpOnly: true as const,
  sameSite: 'strict' as const,
  path: '/',
  maxAge: SESSION_MAX_AGE_SEC,
  /** Playwright E2E `next start` HTTP-n: `E2E_ALLOW_HTTP_COOKIES=1` (secure süti különben nem megy át). */
  secure: process.env.NODE_ENV === 'production' && process.env.E2E_ALLOW_HTTP_COOKIES !== '1',
  priority: 'high' as const,
};
