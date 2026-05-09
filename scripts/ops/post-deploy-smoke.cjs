/**
 * Stabil deploy utáni smoke gate (Fázis 6).
 * - Elindítja a built appot (`next start`) egy lokális porton
 * - Ellenőrzi a kritikus publikus/API útvonalakat
 * - Hibára nem-0 kóddal kilép
 */
'use strict';

const { spawn } = require('child_process');
const { spawnSync } = require('child_process');
const { loadProjectEnv } = require('../lib/load-env.cjs');

loadProjectEnv();

const port = Number(process.env.SMOKE_PORT || '3300');
const baseUrl = `http://127.0.0.1:${port}`;
const timeoutMs = Number(process.env.SMOKE_TIMEOUT_MS || '90000');

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function checkPath(pathname, expectJson) {
  const res = await fetch(`${baseUrl}${pathname}`, { headers: expectJson ? { Accept: 'application/json' } : undefined });
  if (!res.ok) throw new Error(`${pathname}: HTTP ${res.status}`);
  const text = await res.text();
  if (expectJson) {
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      throw new Error(`${pathname}: nem JSON válasz`);
    }
    if (pathname === '/api/health' && (data.status !== 'ok' || data.db !== 'ok')) {
      throw new Error('/api/health: status/db nem ok');
    }
  }
}

async function waitForHealth() {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    try {
      const r = await fetch(`${baseUrl}/api/health`);
      if (r.ok) {
        const data = await r.json().catch(() => null);
        if (data?.status === 'ok') return;
      }
    } catch {}
    await sleep(1200);
  }
  throw new Error('Timeout: /api/health nem állt fel időben');
}

async function main() {
  const child = spawn('npm', ['run', 'start', '--', '-p', String(port)], {
    stdio: ['ignore', 'pipe', 'pipe'],
    shell: process.platform === 'win32',
    env: process.env,
  });

  child.stdout.on('data', (d) => process.stdout.write(d));
  child.stderr.on('data', (d) => process.stderr.write(d));

  try {
    await waitForHealth();
    await checkPath('/', false);
    await checkPath('/news', false);
    await checkPath('/guides', false);
    await checkPath('/api/health', true);
    await checkPath('/api/news', true);
    await checkPath('/api/guides', true);
    console.log('[smoke-gate] OK: kritikus publikus és API útvonalak elérhetők.');
  } finally {
    if (process.platform === 'win32') {
      spawnSync('taskkill', ['/PID', String(child.pid), '/T', '/F'], { stdio: 'ignore' });
    } else {
      child.kill('SIGTERM');
    }
  }
}

main().catch((err) => {
  console.error('[smoke-gate] Hiba:', err instanceof Error ? err.message : String(err));
  process.exit(1);
});
