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
 */
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ error: 'NextAuth nincs bekötve' }, { status: 501 });
}

export async function POST() {
  return NextResponse.json({ error: 'NextAuth nincs bekötve' }, { status: 501 });
}
