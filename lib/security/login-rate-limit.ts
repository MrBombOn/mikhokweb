type Bucket = {
  failures: number;
  firstFailureAt: number;
  blockedUntil: number;
};

const WINDOW_MS = 10 * 60 * 1000;
const MAX_FAILURES = 6;
const BLOCK_MS = 15 * 60 * 1000;

const buckets = new Map<string, Bucket>();

function now() {
  return Date.now();
}

function gc(ts: number) {
  for (const [key, b] of buckets.entries()) {
    if (b.blockedUntil > ts) continue;
    if (ts - b.firstFailureAt > WINDOW_MS) {
      buckets.delete(key);
    }
  }
}

export function isBlocked(key: string): boolean {
  const ts = now();
  gc(ts);
  const b = buckets.get(key);
  if (!b) return false;
  return b.blockedUntil > ts;
}

export function registerFailure(key: string) {
  const ts = now();
  gc(ts);

  const current = buckets.get(key);
  if (!current) {
    buckets.set(key, { failures: 1, firstFailureAt: ts, blockedUntil: 0 });
    return;
  }

  if (ts - current.firstFailureAt > WINDOW_MS) {
    buckets.set(key, { failures: 1, firstFailureAt: ts, blockedUntil: 0 });
    return;
  }

  current.failures += 1;
  if (current.failures >= MAX_FAILURES) {
    current.blockedUntil = ts + BLOCK_MS;
  }
  buckets.set(key, current);
}

export function clearFailures(key: string) {
  buckets.delete(key);
}

export function getClientKey(request: Request, username: string): string {
  const xfwd = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'local';
  const u = username.trim().toLowerCase();
  return `${xfwd}:${u}`;
}

