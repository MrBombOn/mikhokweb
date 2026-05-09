/**
 * Cloudflare Turnstile szerver-oldali ellenőrzés (opcionális, env-alapú).
 * @see https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
 */
export type TurnstileVerifyResult = { ok: true } | { ok: false; error: string };

export function isTurnstileRequired(): boolean {
  const s = process.env.FEEDBACK_TURNSTILE_SECRET_KEY?.trim();
  return Boolean(s);
}

export async function verifyTurnstileToken(token: string | undefined, remoteIp: string | undefined): Promise<TurnstileVerifyResult> {
  const secret = process.env.FEEDBACK_TURNSTILE_SECRET_KEY?.trim();
  if (!secret) {
    return { ok: false, error: 'turnstile_not_configured' };
  }
  const t = token?.trim();
  if (!t) {
    return { ok: false, error: 'turnstile_token_missing' };
  }

  const body = new URLSearchParams();
  body.set('secret', secret);
  body.set('response', t);
  if (remoteIp && remoteIp !== 'unknown') {
    body.set('remoteip', remoteIp);
  }

  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });

  if (!res.ok) {
    return { ok: false, error: 'turnstile_http_error' };
  }

  const data = (await res.json()) as { success?: boolean; 'error-codes'?: string[] };
  if (data.success === true) {
    return { ok: true };
  }
  return { ok: false, error: data['error-codes']?.join(',') || 'turnstile_failed' };
}
