import { badRequest, forbidden } from '@/lib/api/response';

function originOf(value: string | null): string | null {
  if (!value) return null;
  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}

/**
 * Cookie-auth POST/PATCH/PUT/DELETE kérések minimális origin ellenőrzése.
 * Böngészőből érkező cross-site kéréseket blokkolja.
 */
export function enforceSameOrigin(request: Request) {
  const targetOrigin = originOf(request.url);
  if (!targetOrigin) return badRequest('Érvénytelen kérés URL.');

  const reqOrigin = originOf(request.headers.get('origin'));
  if (reqOrigin) {
    if (reqOrigin !== targetOrigin) return forbidden('CSRF védelem: idegen origin.');
    return null;
  }

  const refererOrigin = originOf(request.headers.get('referer'));
  if (refererOrigin) {
    if (refererOrigin !== targetOrigin) return forbidden('CSRF védelem: idegen referer.');
    return null;
  }

  if (process.env.NODE_ENV === 'production') {
    return forbidden('CSRF védelem: hiányzó origin/referer.');
  }

  // Fejlesztői környezetben engedjük, hogy curl/postman origin nélkül is működjön.
  return null;
}

