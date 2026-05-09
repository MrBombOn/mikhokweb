import assert from 'node:assert/strict';
import { afterEach, test } from 'node:test';
import { verifyPublicReadApiKey } from '@/lib/integrations/public-read-api-key';

const KEY = '0123456789abcdef0123456789abcdef';

afterEach(() => {
  delete process.env.PUBLIC_READ_API_KEY;
});

test('verifyPublicReadApiKey rejects when env unset', () => {
  delete process.env.PUBLIC_READ_API_KEY;
  const req = new Request('http://localhost/api/v1/public/feed', {
    headers: { 'x-hok-public-api-key': KEY },
  });
  assert.equal(verifyPublicReadApiKey(req), false);
});

test('verifyPublicReadApiKey accepts x-hok-public-api-key', () => {
  process.env.PUBLIC_READ_API_KEY = KEY;
  const req = new Request('http://localhost/api/v1/public/feed', {
    headers: { 'x-hok-public-api-key': KEY },
  });
  assert.equal(verifyPublicReadApiKey(req), true);
});

test('verifyPublicReadApiKey accepts Authorization Bearer', () => {
  process.env.PUBLIC_READ_API_KEY = KEY;
  const req = new Request('http://localhost/api/v1/public/feed', {
    headers: { authorization: `Bearer ${KEY}` },
  });
  assert.equal(verifyPublicReadApiKey(req), true);
});

test('verifyPublicReadApiKey rejects wrong key', () => {
  process.env.PUBLIC_READ_API_KEY = KEY;
  const req = new Request('http://localhost/api/v1/public/feed', {
    headers: { 'x-hok-public-api-key': `${KEY}x` },
  });
  assert.equal(verifyPublicReadApiKey(req), false);
});
