import { defineConfig, devices } from '@playwright/test';
import path from 'path';
import { resolveDatabaseUrl } from './e2e/resolve-database-url';

const baseURL = process.env.PLAYWRIGHT_BASE_URL || 'http://127.0.0.1:3000';
const rootDir = __dirname;
const databaseUrl = resolveDatabaseUrl(rootDir);
const authSecret =
  process.env.AUTH_SECRET?.trim() || '0123456789abcdef0123456789abcdef';

export default defineConfig({
  globalSetup: path.join(rootDir, 'e2e', 'global-setup.ts'),
  testDir: './e2e',
  /** Csak `playwright.production.config.ts` + `PRODUCTION_SMOKE_BASE_URL` (lásd docs/synthetic-monitoring.md). */
  testIgnore: '**/production-public-smoke.spec.ts',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: 'list',
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'npm run start',
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: {
      ...process.env,
      NODE_ENV: 'production',
      E2E_ALLOW_HTTP_COOKIES: '1',
      DATABASE_URL: databaseUrl,
      AUTH_SECRET: authSecret,
    },
  },
});
