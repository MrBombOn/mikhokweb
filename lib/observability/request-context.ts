import { NextResponse } from 'next/server';

const REQUEST_ID_HEADER = 'x-request-id';

export function getRequestId(request: Request): string {
  const incoming = request.headers.get(REQUEST_ID_HEADER)?.trim();
  if (incoming) return incoming.slice(0, 120);
  return crypto.randomUUID();
}

export function withRequestId<T extends NextResponse>(response: T, requestId: string): T {
  response.headers.set(REQUEST_ID_HEADER, requestId);
  return response;
}

