import { NextResponse } from 'next/server';

type ErrorPayload = { error: string; details?: unknown };

export function ok<T>(payload: T, init?: ResponseInit) {
  return NextResponse.json(payload, { status: 200, ...init });
}

export function created<T>(payload: T, init?: ResponseInit) {
  return NextResponse.json(payload, { status: 201, ...init });
}

export function badRequest(error: string, details?: unknown) {
  const body: ErrorPayload = details === undefined ? { error } : { error, details };
  return NextResponse.json(body, { status: 400 });
}

export function unauthorized(error = 'Nincs jogosultság.') {
  return NextResponse.json({ error }, { status: 401 });
}

export function forbidden(error = 'Nincs jogosultság.') {
  return NextResponse.json({ error }, { status: 403 });
}

export function notFound(error = 'Nem található.') {
  return NextResponse.json({ error }, { status: 404 });
}

export function conflict(error: string) {
  return NextResponse.json({ error }, { status: 409 });
}

export function tooManyRequests(error = 'Túl sok kérés. Próbáld meg később.', retryAfterSec?: number) {
  const headers =
    retryAfterSec != null && retryAfterSec > 0 ? { 'Retry-After': String(retryAfterSec) } : undefined;
  return NextResponse.json({ error }, { status: 429, headers });
}

export function serverError(error = 'Szerverhiba.') {
  return NextResponse.json({ error }, { status: 500 });
}

