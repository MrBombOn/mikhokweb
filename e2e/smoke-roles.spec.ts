import { expect, test } from '@playwright/test';
import { staffLogin } from './helpers/login';

test.describe('admin smoke by role', () => {
  test('guest cannot open /admin', async ({ request }) => {
    const res = await request.get('/admin', { maxRedirects: 0 });
    expect(res.status()).toBeGreaterThanOrEqual(300);
    expect(res.status()).toBeLessThan(400);
    const loc = res.headers()['location'] ?? '';
    expect(loc).toMatch(/admin=denied/);
  });

  test('office reaches /admin but not /admin/users', async ({ page }) => {
    await staffLogin(page, 'office');
    await page.goto('/admin');
    await expect(page).toHaveURL(/\/admin(\?|$)/);
    await page.goto('/admin/users');
    // Middleware átirányít `/admin?rbac=admin_only`-ra; a kliens rögtön takarítja a query-t (`admin/page.tsx`).
    await expect(page).not.toHaveURL(/\/admin\/users/, { timeout: 15_000 });
    await expect(page).toHaveURL(/\/admin(\/?|\?|$)/);
  });

  test('admin reaches /admin/users', async ({ page }) => {
    await staffLogin(page, 'admin');
    await page.goto('/admin/users');
    await expect(page.getByRole('heading', { name: /Felhasználók|Users/ })).toBeVisible();
  });
});
