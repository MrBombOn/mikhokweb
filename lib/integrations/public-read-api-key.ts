/**
 * Opcionális partner **read** API kulcs — `PUBLIC_READ_API_KEY` env (Fázis 19).
 * Fejléc: `X-Hok-Public-Api-Key: <key>` (vagy `Authorization: Bearer <key>`).
 */
import { timingSafeEqual } from 'node:crypto';

export function getConfiguredPublicReadApiKey(): string | null {
  const k = process.env.PUBLIC_READ_API_KEY?.trim();
  return k && k.length >= 16 ? k : null;
}

export function verifyPublicReadApiKey(request: Request): boolean {
  const expected = getConfiguredPublicReadApiKey();
  if (!expected) return false;
  const h =
    request.headers.get('x-hok-public-api-key')?.trim() ||
    request.headers.get('authorization')?.replace(/^\s*Bearer\s+/i, '').trim() ||
    '';
  if (!h) return false;
  try {
    const a = Buffer.from(h, 'utf8');
    const b = Buffer.from(expected, 'utf8');
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}
