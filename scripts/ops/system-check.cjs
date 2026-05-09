/**
 * Ütemezhető / manuális rendszerellenőrzés: HTTP health + opcionális válasz JSON ellenőrzés.
 *
 * Használat: `npm run ops:health-check`
 * Környezet:
 *   - `HEALTHCHECK_URL` — teljes URL a health végponthoz (pl. https://example.org/api/health)
 *   - vagy `BASE_URL` — alap URL; a script hozzáfűzi az `/api/health`-t, ha hiányzik
 *   - `HEALTHCHECK_TIMEOUT_MS` — alap: 15000
 *
 * Kilépési kód: 0 = OK, 1 = hiba (nem-200, nem JSON, db nem ok).
 */
'use strict';

const { loadProjectEnv } = require('../lib/load-env.cjs');

loadProjectEnv();

const timeoutMs = Number(process.env.HEALTHCHECK_TIMEOUT_MS || '15000') || 15000;

let raw = (process.env.HEALTHCHECK_URL || process.env.BASE_URL || 'http://127.0.0.1:3000').trim();
raw = raw.replace(/\/$/, '');
const url = raw.includes('/api/health') ? raw : `${raw}/api/health`;

async function main() {
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), timeoutMs);
  let res;
  try {
    res = await fetch(url, { signal: ac.signal, headers: { Accept: 'application/json' } });
  } catch (e) {
    clearTimeout(t);
    console.error('[health-check] Kérés sikertelen:', url, e instanceof Error ? e.message : e);
    process.exit(1);
    return;
  }
  clearTimeout(t);

  const text = await res.text();
  if (!res.ok) {
    console.error('[health-check] HTTP', res.status, url, text.slice(0, 500));
    process.exit(1);
    return;
  }

  let body;
  try {
    body = JSON.parse(text);
  } catch {
    console.error('[health-check] Nem JSON válasz:', text.slice(0, 200));
    process.exit(1);
    return;
  }

  if (body.status !== 'ok' || body.db !== 'ok') {
    console.error('[health-check] Várt status/db=ok, kaptam:', JSON.stringify(body));
    process.exit(1);
    return;
  }

  console.log('[health-check] OK', url, `latencyMs=${body.latencyMs ?? 'n/a'}`);
}

main();
