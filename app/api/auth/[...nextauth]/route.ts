/**
 * @file NextAuth catch-all route (helyfoglaló – még nincs bekötve)
 *
 * @description
 * A NextAuth hagyományosan `app/api/auth/[...nextauth]/route.ts` alatt él. Amikor
 * telepíted és konfigurálod a `next-auth` csomagot, ide kerülnek a `handlers` exportok.
 *
 * @jelenlegi
 * Minden GET/POST **501** – explicit jelzés, hogy a session kezelés még demo szinten
 * van (`admin-gate` süti), nem production auth.
 *
 * **P2:** IP-alapú rate limit a végpont túlterhelése ellen.
 */
import { NextResponse } from 'next/server';
import { tooManyRequests } from '@/lib/api/response';
import { isAuthPublicBlocked, registerAuthPublicHit } from '@/lib/security/auth-public-rate-limit';

function guard(request: Request) {
  if (isAuthPublicBlocked(request)) {
    return tooManyRequests('Túl sok kérés. Próbáld meg később.');
  }
  registerAuthPublicHit(request);
  return null;
}

export async function GET(request: Request) {
  const blocked = guard(request);
  if (blocked) return blocked;
  return NextResponse.json({ error: 'NextAuth nincs bekötve' }, { status: 501 });
}

export async function POST(request: Request) {
  const blocked = guard(request);
  if (blocked) return blocked;
  return NextResponse.json({ error: 'NextAuth nincs bekötve' }, { status: 501 });
}
