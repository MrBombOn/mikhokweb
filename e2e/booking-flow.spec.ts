import { expect, test } from '@playwright/test';
import { staffLogin } from './helpers/login';

/** Egyedi nap + 45 perc idősáv (06:00–22:00 között), hogy az E2E DB-ben ne halmozódjanak ütközések. */
function uniqueBookingSlot() {
  const id = Date.now();
  const day = String((id % 27) + 1).padStart(2, '0');
  const bookingDate = `2099-10-${day}`;
  const startTotalMin = 6 * 60 + (id % (15 * 60));
  const endTotalMin = startTotalMin + 45;
  const fmt = (m: number) =>
    `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
  return { bookingDate, startTime: fmt(startTotalMin), endTime: fmt(endTotalMin) };
}

test.describe('gym booking flow', () => {
  test('guest submits booking request; office approves from status modal', async ({ page }) => {
    const unique = `E2E-${Date.now()}`;
    const email = `e2e-booking-${Date.now()}@example.com`;
    const { bookingDate, startTime, endTime } = uniqueBookingSlot();

    await page.goto('/calendar');
    await expect(page.getByRole('heading', { name: 'Szellős, egybefüggő naptárélmény' })).toBeVisible({
      timeout: 30_000,
    });

    await page.getByRole('button', { name: 'Foglalási igény' }).click();
    await page.getByPlaceholder('Név').fill(unique);
    await page.getByPlaceholder('Email').fill(email);
    await page.getByPlaceholder('Edzés vagy program célja').fill('Playwright E2E foglalás');
    await page.getByLabel('Foglalás napja').fill(bookingDate);
    await page.getByLabel('Kezdés időpontja').fill(startTime);
    await page.getByLabel('Befejezés időpontja').fill(endTime);

    const created = page.waitForResponse(
      (r) => r.url().includes('/api/bookings') && r.request().method() === 'POST',
    );
    await page.getByRole('button', { name: 'Foglalási igény küldése' }).click();
    const postRes = await created;
    expect(postRes.status()).toBe(201);

    await expect(page.getByText('Tornaterem foglalási igény rögzítve.')).toBeVisible({ timeout: 15_000 });

    await staffLogin(page, 'office');
    await page.goto('/calendar');
    await expect(page.getByRole('heading', { name: 'Szellős, egybefüggő naptárélmény' })).toBeVisible({
      timeout: 30_000,
    });

    await page.getByRole('button', { name: 'Foglalási állapotok' }).first().click();
    await page.getByLabel('Foglalás szűrés keresés').fill(unique);

    const row = page.locator('.request-row').filter({ hasText: unique });
    await expect(row).toBeVisible({ timeout: 10_000 });
    await row.getByRole('button', { name: 'Elfogadás' }).click();

    await expect(page.getByText('Foglalás jóváhagyva.')).toBeVisible({ timeout: 15_000 });
  });
});
