import test from 'node:test';
import assert from 'node:assert/strict';
import { enforceSameOrigin } from '@/lib/security/csrf';
import { clearFailures, getClientKey, isBlocked, registerFailure } from '@/lib/security/login-rate-limit';

test('enforceSameOrigin allows same-origin request', () => {
  const req = new Request('https://example.com/api/news', {
    method: 'POST',
    headers: { origin: 'https://example.com' },
  });
  const res = enforceSameOrigin(req);
  assert.equal(res, null);
});

test('enforceSameOrigin blocks cross-origin request', async () => {
  const req = new Request('https://example.com/api/news', {
    method: 'POST',
    headers: { origin: 'https://evil.example' },
  });
  const res = enforceSameOrigin(req);
  assert.ok(res);
  assert.equal(res?.status, 403);
});

test('enforceSameOrigin treats localhost and 127.0.0.1 as same loopback', () => {
  const req = new Request('http://127.0.0.1:3000/api/auth/login', {
    method: 'POST',
    headers: { origin: 'http://localhost:3000' },
  });
  const res = enforceSameOrigin(req);
  assert.equal(res, null);
});

test('login rate limiter blocks after threshold and clears', () => {
  const req = new Request('https://example.com/api/auth/login', {
    headers: { 'x-forwarded-for': '1.2.3.4' },
  });
  const key = getClientKey(req, 'admin');

  clearFailures(key);
  assert.equal(isBlocked(key), false);

  for (let i = 0; i < 5; i += 1) {
    registerFailure(key);
  }

  assert.equal(isBlocked(key), true);
  clearFailures(key);
  assert.equal(isBlocked(key), false);
});

