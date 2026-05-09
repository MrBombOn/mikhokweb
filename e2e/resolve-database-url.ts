import fs from 'fs';
import path from 'path';

/**
 * Ugyanaz a SQLite fájl legyen a migrate/seed és a `next start` között (`.env.local` támogatás).
 */
export function resolveDatabaseUrl(rootDir: string = path.join(__dirname, '..')): string {
  const fromEnv = process.env.DATABASE_URL?.trim();
  if (fromEnv) return fromEnv;

  for (const name of ['.env.local', '.env']) {
    const filePath = path.join(rootDir, name);
    if (!fs.existsSync(filePath)) continue;
    const raw = fs.readFileSync(filePath, 'utf8');
    const line = raw.split(/\r?\n/).find((l) => /^DATABASE_URL=/.test(l.trim()));
    if (!line) continue;
    let val = line.split('=').slice(1).join('=').trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (val) return val;
  }

  return 'file:./dev.db';
}
