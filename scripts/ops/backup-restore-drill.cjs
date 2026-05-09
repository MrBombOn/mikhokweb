/**
 * Backup / restore drill (Fázis 5): lokálisan vagy CI-ben ellenőrzi, hogy a DB
 * mentésből visszaállított példány olvasható és a migráció állapot konzisztens.
 *
 * SQLite (file:…): automatikus fájl másolás + `prisma migrate status` + `SELECT 1`.
 * PostgreSQL: ha elérhető a `pg_dump` és opcionálisan `BACKUP_DRILL_RESTORE_URL`
 * (üres/eldobható adatbázis), dump + restore próba; egyébként útmutató a stdouton.
 *
 * Használat: `npm run ops:backup-drill`
 * Környezet: `DATABASE_URL` (betölti `.env` / `.env.local`-t).
 * Opcionális: `BACKUP_DRILL_DIR` (alap: `.ops/backup-drill`), `BACKUP_DRILL_RESTORE_URL` (PostgreSQL).
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { loadProjectEnv } = require('../lib/load-env.cjs');

loadProjectEnv();

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl || !String(dbUrl).trim()) {
  console.error('[backup-drill] Hiányzik a DATABASE_URL.');
  process.exit(1);
}

const outDir = process.env.BACKUP_DRILL_DIR
  ? path.resolve(process.cwd(), process.env.BACKUP_DRILL_DIR)
  : path.join(process.cwd(), '.ops', 'backup-drill');
const ts = new Date().toISOString().replace(/[:.]/g, '-');

function prismaBin() {
  const isWin = process.platform === 'win32';
  return path.join(process.cwd(), 'node_modules', '.bin', isWin ? 'prisma.cmd' : 'prisma');
}

function runPrisma(args, opts = {}) {
  const { env: extraEnv = {}, input } = opts;
  const isWin = process.platform === 'win32';
  return spawnSync(prismaBin(), args, {
    stdio: input ? ['pipe', 'inherit', 'inherit'] : 'inherit',
    input: input !== undefined ? Buffer.from(input, 'utf8') : undefined,
    cwd: process.cwd(),
    shell: isWin,
    env: { ...process.env, ...extraEnv },
  });
}

function resolveSqlitePath(url) {
  const raw = String(url).trim();
  if (!raw.startsWith('file:')) return null;
  let p = raw.slice('file:'.length);
  if (!path.isAbsolute(p)) {
    const rel = p.startsWith('./') ? p.slice(2) : p;
    const prismaRelative = path.join(process.cwd(), 'prisma', rel);
    const rootRelative = path.join(process.cwd(), rel);
    if (fs.existsSync(prismaRelative)) return prismaRelative;
    if (fs.existsSync(rootRelative)) return rootRelative;
    // Prisma SQLite URL relatív útja a schema könyvtárhoz értelmeződik (itt: ./prisma)
    return prismaRelative;
  }
  return path.normalize(p);
}

function verifyDbWithPrismaClient(databaseUrl) {
  const light = String(process.env.BACKUP_DRILL_MODE || '').toLowerCase() === 'light';
  if (!light) {
    const r0 = runPrisma(['migrate', 'deploy'], { env: { DATABASE_URL: databaseUrl } });
    if (r0.status !== 0) {
      console.error('[backup-drill] prisma migrate deploy sikertelen a másolaton (helyreállítás utáni lépés).');
      console.error('[backup-drill] Tippek: javítsd a forrás DB migrációs állapotát, vagy egyszeri ellenőrzéshez BACKUP_DRILL_MODE=light (csak SELECT 1).');
      return false;
    }
    const r = runPrisma(['migrate', 'status'], { env: { DATABASE_URL: databaseUrl } });
    if (r.status !== 0) {
      console.error('[backup-drill] prisma migrate status sikertelen a másolaton.');
      return false;
    }
  } else {
    console.warn('[backup-drill] BACKUP_DRILL_MODE=light — migrate deploy kihagyva (csak olvashatóság).');
  }
  const r2 = runPrisma(['db', 'execute', '--stdin', '--url', databaseUrl], {
    input: 'SELECT 1 as ok;',
  });
  if (r2.status !== 0) {
    console.error('[backup-drill] prisma db execute (SELECT 1) sikertelen.');
    return false;
  }
  return true;
}

function sqliteDrill() {
  const src = resolveSqlitePath(dbUrl);
  if (!src || !fs.existsSync(src)) {
    console.error('[backup-drill] SQLite fájl nem található:', src || dbUrl);
    process.exit(1);
  }

  fs.mkdirSync(outDir, { recursive: true });
  const copyPath = path.join(outDir, `drill-copy-${ts}.db`);
  fs.copyFileSync(src, copyPath);

  const relForPrisma =
    process.platform === 'win32'
      ? `file:${copyPath.replace(/\\/g, '/')}`
      : `file:${copyPath}`;

  console.log('[backup-drill] SQLite másolat:', copyPath);
  console.log('[backup-drill] DATABASE_URL (másolat):', relForPrisma);

  const ok = verifyDbWithPrismaClient(relForPrisma);
  if (!ok) process.exit(1);

  console.log('[backup-drill] OK — SQLite drill sikeres (lásd fent: strict vagy light ellenőrzés).');
  console.log('[backup-drill] A másolat törölhető:', copyPath);
}

function commandExists(cmd) {
  const isWin = process.platform === 'win32';
  const which = isWin ? 'where' : 'which';
  const r = spawnSync(which, [cmd], { shell: isWin });
  return r.status === 0;
}

function postgresDrill() {
  fs.mkdirSync(outDir, { recursive: true });
  const dumpFile = path.join(outDir, `pg-drill-${ts}.dump`);

  if (!commandExists('pg_dump')) {
    console.warn(
      '[backup-drill] PostgreSQL: pg_dump nem található a PATH-on — automatizált dump kihagyva.',
    );
    console.warn('[backup-drill] Lásd: docs/backup-restore-drill.md (kézi lépések).');
    process.exit(0);
  }

  const d = spawnSync('pg_dump', ['--format', 'custom', '--file', dumpFile, dbUrl], {
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });
  if (d.status !== 0) {
    console.error('[backup-drill] pg_dump sikertelen.');
    process.exit(1);
  }
  console.log('[backup-drill] pg_dump kész:', dumpFile);

  const restoreUrl = process.env.BACKUP_DRILL_RESTORE_URL;
  if (!restoreUrl) {
    console.log(
      '[backup-drill] Visszaállítási próna kihagyva (nincs BACKUP_DRILL_RESTORE_URL).',
    );
    console.log('[backup-drill] Teszt visszaállítás: pg_restore -d "<üres_db_url>" --clean --if-exists', dumpFile);
    process.exit(0);
  }

  if (!commandExists('pg_restore')) {
    console.warn('[backup-drill] pg_restore nem található — dump elkészült, restore kézzel.');
    process.exit(0);
  }

  const r = spawnSync(
    'pg_restore',
    ['--dbname', restoreUrl, '--clean', '--if-exists', '--no-owner', dumpFile],
    { stdio: 'inherit', shell: process.platform === 'win32' },
  );
  if (r.status !== 0) {
    console.error('[backup-drill] pg_restore sikertelen.');
    process.exit(1);
  }

  console.log('[backup-drill] pg_restore kész — migráció + séma ellenőrzés a visszaállított DB-n…');

  const ok = verifyDbWithPrismaClient(restoreUrl);
  if (!ok) process.exit(1);

  console.log('[backup-drill] OK — PostgreSQL drill sikeres (dump + restore + ellenőrzés).');
}

const u = String(dbUrl).trim().toLowerCase();
if (u.startsWith('file:')) {
  sqliteDrill();
} else if (u.startsWith('postgresql:') || u.startsWith('postgres:')) {
  postgresDrill();
} else {
  console.error('[backup-drill] Ismeretlen DATABASE_URL séma (várható: file: vagy postgresql:).');
  process.exit(1);
}
