import type { Page } from '@playwright/test';

function creds(role: 'admin' | 'office') {
  const username =
    role === 'admin'
      ? (process.env.E2E_ADMIN_USERNAME ?? 'admin')
      : (process.env.E2E_OFFICE_USERNAME ?? 'office');
  const password =
    role === 'admin'
      ? (process.env.E2E_ADMIN_PASSWORD ?? 'admin-dev-change-me')
      : (process.env.E2E_OFFICE_PASSWORD ?? 'office-dev-change-me');
  return { username, password };
}

export async function staffLogin(page: Page, role: 'admin' | 'office') {
  const baseURL = process.env.PLAYWRIGHT_BASE_URL || 'http://127.0.0.1:3000';
  const origin = new URL(baseURL).origin;
  const { username, password } = creds(role);
  const res = await page.context().request.post('/api/auth/login', {
    data: { username, password },
    headers: { Origin: origin, Referer: `${origin}/` },
  });
  if (!res.ok()) {
    throw new Error(`login failed: HTTP ${res.status()} ${(await res.text()).slice(0, 400)}`);
  }
}
