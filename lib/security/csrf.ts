import { badRequest, forbidden } from '@/lib/api/response';

function originOf(value: string | null): string | null {
  if (!value) return null;
  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}

/** `localhost` vs `127.0.0.1` ugyanaz a loopback (böngésző/E2E gyakori eltérés). */
function loopbackComparableOrigin(origin: string): string {
  try {
    const u = new URL(origin);
    const host = u.hostname.toLowerCase();
    if (host === 'localhost' || host === '127.0.0.1' || host === '::1') {
      const port = u.port || (u.protocol === 'https:' ? '443' : '80');
      return `loopback:${port}`;
    }
    return origin;
  } catch {
    return origin;
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
    if (loopbackComparableOrigin(reqOrigin) !== loopbackComparableOrigin(targetOrigin)) {
      return forbidden('CSRF védelem: idegen origin.');
    }
    return null;
  }

  const refererOrigin = originOf(request.headers.get('referer'));
  if (refererOrigin) {
    if (loopbackComparableOrigin(refererOrigin) !== loopbackComparableOrigin(targetOrigin)) {
      return forbidden('CSRF védelem: idegen referer.');
    }
    return null;
  }

  if (process.env.NODE_ENV === 'production') {
    return forbidden('CSRF védelem: hiányzó origin/referer.');
  }

  // Fejlesztői környezetben engedjük, hogy curl/postman origin nélkül is működjön.
  return null;
}

