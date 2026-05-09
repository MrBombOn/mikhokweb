/** NextAuth catch-all és egyéb nyilvános auth végpontok DoS elleni védelme (IP-alapú). */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 80;

type Bucket = { timestamps: number[] };

const buckets = new Map<string, Bucket>();

function now() {
  return Date.now();
}

function trim(bucket: Bucket, t: number) {
  bucket.timestamps = bucket.timestamps.filter((x) => t - x <= WINDOW_MS);
}

function keyFromRequest(request: Request): string {
  const fwd = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  return `auth_public:${fwd}`;
}

export function isAuthPublicBlocked(request: Request): boolean {
  const bucket = buckets.get(keyFromRequest(request));
  if (!bucket) return false;
  const t = now();
  trim(bucket, t);
  return bucket.timestamps.length >= MAX_HITS;
}

export function registerAuthPublicHit(request: Request) {
  const key = keyFromRequest(request);
  const t = now();
  const bucket = buckets.get(key) ?? { timestamps: [] };
  trim(bucket, t);
  bucket.timestamps.push(t);
  buckets.set(key, bucket);
}
