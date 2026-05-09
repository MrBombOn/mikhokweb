type Bucket = {
  failures: number;
  firstFailureAt: number;
  blockedUntil: number;
};

const WINDOW_MS = 10 * 60 * 1000;
/** Sikertelen belépés / felhasználónév + IP + UA kulcsonként. */
const MAX_FAILURES = 5;
/** Ugyanarról az IP-ről – böngészőtől független agresszívebb plafon (UA váltás ellen). */
const MAX_FAILURES_IP_ONLY = 18;
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

/** Maradék tiltás másodpercben (Retry-After RFC-hez). */
export function blockedRemainingSeconds(key: string): number {
  const ts = now();
  gc(ts);
  const b = buckets.get(key);
  if (!b || b.blockedUntil <= ts) return 0;
  return Math.ceil((b.blockedUntil - ts) / 1000);
}

export function registerFailure(key: string) {
  const ts = now();
  gc(ts);

  const maxFailures = key.startsWith('login_ip:') ? MAX_FAILURES_IP_ONLY : MAX_FAILURES;

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
  if (current.failures >= maxFailures) {
    current.blockedUntil = ts + BLOCK_MS;
  }
  buckets.set(key, current);
}

export function clearFailures(key: string) {
  buckets.delete(key);
}

export function getClientKey(request: Request, username: string): string {
  const xfwd = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'local';
  const ua = (request.headers.get('user-agent') ?? 'unknown').slice(0, 160).toLowerCase();
  const u = username.trim().toLowerCase();
  return `${xfwd}:${ua}:${u}`;
}

/** IP + user-agent alapú globális kulcs (felhasználónévtől független brute-force ellen). */
export function getNetworkKey(request: Request): string {
  const xfwd = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'local';
  const ua = (request.headers.get('user-agent') ?? 'unknown').slice(0, 160).toLowerCase();
  return `${xfwd}:${ua}:_global`;
}

/** Csak IP – UA váltogatás ellen (proxy mögött első XFF hop). */
export function getIpOnlyLoginKey(request: Request): string {
  const xfwd = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'local';
  return `login_ip:${xfwd}`;
}
