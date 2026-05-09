const WINDOW_MS = 10 * 60 * 1000;
const MAX_POSTS = 5;

type Bucket = {
  timestamps: number[];
};

const buckets = new Map<string, Bucket>();

function now() {
  return Date.now();
}

function trim(bucket: Bucket, t: number) {
  bucket.timestamps = bucket.timestamps.filter((x) => t - x <= WINDOW_MS);
}

/** IP + User-Agent – egyszerű bot/spam elleni kulcs (P2). */
export function feedbackRateLimitKey(request: Request): string {
  const fwd = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const ua = (request.headers.get('user-agent') ?? 'unknown').slice(0, 120).toLowerCase();
  return `feedback:${fwd}:${ua}`;
}

export function isFeedbackBlocked(request: Request): boolean {
  const key = feedbackRateLimitKey(request);
  const bucket = buckets.get(key);
  if (!bucket) return false;
  const t = now();
  trim(bucket, t);
  return bucket.timestamps.length >= MAX_POSTS;
}

export function registerFeedbackPost(request: Request) {
  const key = feedbackRateLimitKey(request);
  const t = now();
  const bucket = buckets.get(key) ?? { timestamps: [] };
  trim(bucket, t);
  bucket.timestamps.push(t);
  buckets.set(key, bucket);
}
