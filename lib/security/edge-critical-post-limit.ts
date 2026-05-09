/**
 * Edge / middleware: elsődleges burst védelem kritikus nyilvános POST-okra (Fázis 16).
 * A route-ok belső rate limitje továbbra is érvényes — ez a réteg a szerver nélküli flood csillapítására szolgál.
 *
 * Csak primitívek (Map, Date) — Next middleware kompatibilis.
 */

const WINDOW_MS = 10 * 60 * 1000;

/** Útvonalanként: max POST / ablak / IP (x-forwarded-for első címe). */
const LIMITS: Record<string, number> = {
  '/api/feedback': 24,
  '/api/bookings': 16,
  '/api/auth/login': 48,
};

type Bucket = { timestamps: number[] };
const buckets = new Map<string, Bucket>();

function now() {
  return Date.now();
}

function trim(bucket: Bucket, t: number) {
  bucket.timestamps = bucket.timestamps.filter((x) => t - x <= WINDOW_MS);
}

function bucketKey(pathname: string, ip: string): string {
  return `edge:${pathname}:${ip}`;
}

export function edgeCriticalPostBlocked(pathname: string, ip: string): boolean {
  const max = LIMITS[pathname];
  if (!max) return false;
  const key = bucketKey(pathname, ip);
  const bucket = buckets.get(key);
  if (!bucket) return false;
  const t = now();
  trim(bucket, t);
  return bucket.timestamps.length >= max;
}

export function edgeCriticalPostRegister(pathname: string, ip: string): void {
  const max = LIMITS[pathname];
  if (!max) return;
  const key = bucketKey(pathname, ip);
  const t = now();
  const bucket = buckets.get(key) ?? { timestamps: [] };
  trim(bucket, t);
  bucket.timestamps.push(t);
  buckets.set(key, bucket);
}

/** Csak unit tesztekhez. */
export function clearEdgeCriticalPostBucketsForTests(): void {
  buckets.clear();
}
