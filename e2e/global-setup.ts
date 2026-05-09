import { execSync } from 'child_process';
import path from 'path';
import { resolveDatabaseUrl } from './resolve-database-url';

/**
 * CI és lokális E2E: ugyanarra a `DATABASE_URL`-re migrate + seed, mint amit a webServer kap.
 */
export default async function globalSetup() {
  if (process.env.PLAYWRIGHT_SKIP_GLOBAL_SETUP === '1') return;

  const root = path.join(__dirname, '..');
  const DATABASE_URL = resolveDatabaseUrl(root);
  const AUTH_SECRET =
    process.env.AUTH_SECRET?.trim() || '0123456789abcdef0123456789abcdef';
  const env = { ...process.env, DATABASE_URL, AUTH_SECRET };

  execSync('npx prisma migrate deploy', { stdio: 'inherit', env, cwd: root });
  execSync('npm run db:seed', { stdio: 'inherit', env, cwd: root });
}
