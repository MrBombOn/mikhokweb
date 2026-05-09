const WINDOW_MS = 10 * 60 * 1000;
const MAX_SEARCHES = 90;

type Bucket = { timestamps: number[] };
const buckets = new Map<string, Bucket>();

function now() {
  return Date.now();
}

function trim(bucket: Bucket, t: number) {
  bucket.timestamps = bucket.timestamps.filter((x) => t - x <= WINDOW_MS);
}

export function searchRateLimitKey(request: Request): string {
  const fwd = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const ua = (request.headers.get('user-agent') ?? 'unknown').slice(0, 120).toLowerCase();
  return `search:${fwd}:${ua}`;
}

export function isSearchRateLimited(request: Request): boolean {
  const key = searchRateLimitKey(request);
  const bucket = buckets.get(key);
  if (!bucket) return false;
  const t = now();
  trim(bucket, t);
  return bucket.timestamps.length >= MAX_SEARCHES;
}

export function registerSearchRequest(request: Request): void {
  const key = searchRateLimitKey(request);
  const t = now();
  const bucket = buckets.get(key) ?? { timestamps: [] };
  trim(bucket, t);
  bucket.timestamps.push(t);
  buckets.set(key, bucket);
}
