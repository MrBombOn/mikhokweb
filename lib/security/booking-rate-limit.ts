const WINDOW_MS = 10 * 60 * 1000;
const MAX_POSTS = 8;

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
  return `booking:${fwd}`;
}

export function isBookingBlocked(request: Request): boolean {
  const key = keyFromRequest(request);
  const bucket = buckets.get(key);
  if (!bucket) return false;
  const t = now();
  trim(bucket, t);
  return bucket.timestamps.length >= MAX_POSTS;
}

export function registerBookingPost(request: Request) {
  const key = keyFromRequest(request);
  const t = now();
  const bucket = buckets.get(key) ?? { timestamps: [] };
  trim(bucket, t);
  bucket.timestamps.push(t);
  buckets.set(key, bucket);
}
