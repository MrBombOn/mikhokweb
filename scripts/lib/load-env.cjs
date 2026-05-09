/**
 * Betölti a `.env`, majd a `.env.local` fájlokat (ugyanaz a sorrend, mint a `prisma-env.cjs`-nél).
 * @param {{ silent?: boolean }} opts
 */
'use strict';

const fs = require('fs');
const path = require('path');

function loadEnvFile(rel, opts) {
  const filePath = path.join(process.cwd(), rel);
  if (!fs.existsSync(filePath)) return;

  const raw = fs.readFileSync(filePath, 'utf8');
  const lines = raw.split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const eq = trimmed.indexOf('=');
    if (eq <= 0) continue;

    const key = trimmed.slice(0, eq).trim();
    if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(key)) continue;

    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }

    const existedBefore = opts.initialKeys ? opts.initialKeys.has(key) : false;
    if (opts.overrideLocal && !existedBefore) {
      process.env[key] = val;
    } else if (process.env[key] === undefined || process.env[key] === '') {
      process.env[key] = val;
    }
  }
}

function loadProjectEnv() {
  const initialKeys = new Set(Object.keys(process.env));
  loadEnvFile('.env', { overrideLocal: false, initialKeys });
  loadEnvFile('.env.local', { overrideLocal: true, initialKeys });
}

module.exports = { loadProjectEnv };
