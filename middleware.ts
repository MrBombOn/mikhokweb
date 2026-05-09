/**
 * @file Edge middleware – admin JWT + kritikus nyilvános POST burst limit (Fázis 16).
 *
 * @description
 * 1) **POST** `/api/feedback`, `/api/bookings`, `/api/auth/login` — IP-alapú burst limit
 *    (`lib/security/edge-critical-post-limit.ts`) a route-beli rate limit előtt / mellette.
 * 2) **`/admin` útvonalak** — `jose` `jwtVerify`, Prisma nélkül; OFFICE/ADMIN; ADMIN-only útvonalak.
 *
 * @megjegyzés
 * Teljes DDoS-védelemhez a **reverse proxy / WAF** (pl. Cloudflare, nginx `limit_req`) továbbra is javasolt — lásd `docs/security-disclosure.md`.
 */
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose/jwt/verify';
import { isStaffRole, pathnameRequiresAdminRole, isAdminRole } from '@/lib/auth/rbac';
import { SESSION_COOKIE, getSessionSecretBytes, type AppRole } from '@/lib/auth/session';
import { edgeCriticalPostBlocked, edgeCriticalPostRegister } from '@/lib/security/edge-critical-post-limit';

const CRITICAL_POST_PATHS = new Set(['/api/feedback', '/api/bookings', '/api/auth/login']);

function clientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip')?.trim() ||
    'unknown'
  );
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const method = request.method;

  if (method === 'POST' && CRITICAL_POST_PATHS.has(pathname)) {
    const ip = clientIp(request);
    if (edgeCriticalPostBlocked(pathname, ip)) {
      return NextResponse.json(
        { error: 'rate_limited', message: 'Túl sok kérés. Próbáld újra később.' },
        { status: 429, headers: { 'Cache-Control': 'no-store' } },
      );
    }
    edgeCriticalPostRegister(pathname, ip);
    return NextResponse.next();
  }

  const isAdminPath = pathname === '/admin' || pathname.startsWith('/admin/');
  if (!isAdminPath) {
    return NextResponse.next();
  }

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
    if (!isStaffRole(role)) {
      throw new Error('invalid_role');
    }
    if (pathnameRequiresAdminRole(request.nextUrl.pathname) && !isAdminRole(role)) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin';
      url.searchParams.set('rbac', 'admin_only');
      return NextResponse.redirect(url);
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
  matcher: ['/admin', '/admin/:path*', '/api/feedback', '/api/bookings', '/api/auth/login'],
};
