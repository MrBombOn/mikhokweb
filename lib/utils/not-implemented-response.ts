/**
 * API route stub: HTTP 501 JSON, amíg nincs üzleti logika / DB bekötés.
 */
import { NextResponse } from 'next/server';

export function notImplemented() {
  return NextResponse.json({ error: 'Not implemented' }, { status: 501 });
}
