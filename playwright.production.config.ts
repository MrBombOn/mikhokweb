import { defineConfig, devices } from '@playwright/test';

const baseURL = (process.env.PRODUCTION_SMOKE_BASE_URL || '').trim().replace(/\/$/, '');

if (!baseURL) {
  throw new Error(
    'Set PRODUCTION_SMOKE_BASE_URL (e.g. https://portal.example.hu) — see docs/synthetic-monitoring.md',
  );
}

/**
 * Éles / staging **publikus** HTTP smoke — nincs webServer, nincs globalSetup (nincs migráció / seed).
 */
export default defineConfig({
  testDir: './e2e',
  testMatch: '**/production-public-smoke.spec.ts',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: 'list',
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
