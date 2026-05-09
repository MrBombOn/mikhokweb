/**
 * Prisma CLI előtt betölti a `.env`, majd a `.env.local` fájlokat (Next.js-szerű sorrend:
 * a `.env.local` felülírja a `.env` azonos kulcsait).
 * A már beállított process.env értékeket (pl. CI DATABASE_URL) nem írjuk felül a `.env`-ből;
 * a `.env.local` felülír, **kivéve** ha a `DATABASE_URL` vagy `AUTH_SECRET` már nem üres
 * (parancssor / CI) — így működik pl. `DATABASE_URL=file:./x.db npm run db:seed`.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

/**
 * @param {string} rel
 * @param {{ overrideLocal: boolean }} opts  overrideLocal: true = .env.local minden kulcsa felülír
 */
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

    if (opts.overrideLocal) {
      // CI / egyedi parancssor: ha már be van állítva, ne írja felül a `.env.local`
      // (pl. `DATABASE_URL=file:./e2e.db npm run db:seed`).
      if (
        (key === 'DATABASE_URL' || key === 'AUTH_SECRET') &&
        process.env[key] != null &&
        String(process.env[key]).trim() !== ''
      ) {
        continue;
      }
      process.env[key] = val;
    } else if (process.env[key] === undefined || process.env[key] === '') {
      process.env[key] = val;
    }
  }
}

// 1) .env — nem írja felül a már létező (pl. CI) változókat
loadEnvFile('.env', { overrideLocal: false });
// 2) .env.local — fejlesztői felülírások (Prisma eddig nem töltötte be automatikusan)
loadEnvFile('.env.local', { overrideLocal: true });

const args = process.argv.slice(2);
if (!args.length) {
  console.error('Használat: node scripts/prisma-env.cjs <prisma parancs…>');
  console.error('Példa: node scripts/prisma-env.cjs migrate dev');
  process.exit(1);
}

const isWin = process.platform === 'win32';
const prismaBin = path.join(process.cwd(), 'node_modules', '.bin', isWin ? 'prisma.cmd' : 'prisma');

const result = spawnSync(prismaBin, args, {
  stdio: 'inherit',
  env: process.env,
  cwd: process.cwd(),
  shell: isWin,
});

if (result.error) {
  console.error(result.error);
  process.exit(1);
}
process.exit(result.status === null ? 1 : result.status);
