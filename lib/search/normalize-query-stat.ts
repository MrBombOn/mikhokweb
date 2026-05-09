/**
 * Keresési analytics: normalizált, rövidített kulcs — nyers felhasználói szöveget nem tárolunk.
 */
export function normalizeQueryForStat(raw: string): string | null {
  const t = raw.trim().replace(/\s+/g, ' ').toLowerCase();
  if (t.length < 2) return null;
  if (t.includes('@')) return null;
  return t.slice(0, 120);
}
