import { expect, test } from '@playwright/test';

/**
 * Read-only checks a `PRODUCTION_SMOKE_BASE_URL` felé (lásd `playwright.production.config.ts`).
 * Nem használ bejelentkezést / seedet.
 */
test.describe('production public smoke', () => {
  test('GET /api/health returns ok', async ({ request }) => {
    const res = await request.get('/api/health');
    expect(res.ok(), await res.text()).toBeTruthy();
    const body = (await res.json()) as { status?: string; db?: string };
    expect(body.status).toBe('ok');
    expect(body.db).toBe('ok');
  });

  test('GET / returns 200', async ({ request }) => {
    const res = await request.get('/');
    expect(res.ok(), await res.text()).toBeTruthy();
  });

  test('GET /news returns 200', async ({ request }) => {
    const res = await request.get('/news');
    expect(res.ok(), await res.text()).toBeTruthy();
  });
});
