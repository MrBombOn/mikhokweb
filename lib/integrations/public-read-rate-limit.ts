/**
 * GET `/api/v1/public/feed` — IP + UA alapú burst védelem (Fázis 19).
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 120;

type Bucket = { timestamps: number[] };
const buckets = new Map<string, Bucket>();

function now() {
  return Date.now();
}

function trim(bucket: Bucket, t: number) {
  bucket.timestamps = bucket.timestamps.filter((x) => t - x <= WINDOW_MS);
}

export function publicFeedRateLimitKey(request: Request): string {
  const fwd = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const ua = (request.headers.get('user-agent') ?? 'unknown').slice(0, 120).toLowerCase();
  return `public_feed:${fwd}:${ua}`;
}

export function isPublicFeedBlocked(request: Request): boolean {
  const key = publicFeedRateLimitKey(request);
  const bucket = buckets.get(key);
  if (!bucket) return false;
  const t = now();
  trim(bucket, t);
  return bucket.timestamps.length >= MAX_HITS;
}

export function registerPublicFeedHit(request: Request): void {
  const key = publicFeedRateLimitKey(request);
  const t = now();
  const bucket = buckets.get(key) ?? { timestamps: [] };
  trim(bucket, t);
  bucket.timestamps.push(t);
  buckets.set(key, bucket);
}

/** Tesztekhez. */
export function clearPublicFeedBucketsForTests(): void {
  buckets.clear();
}
