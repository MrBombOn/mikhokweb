import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeQueryForStat } from '@/lib/search/normalize-query-stat';

test('normalizeQueryForStat: null for short', () => {
  assert.equal(normalizeQueryForStat(''), null);
  assert.equal(normalizeQueryForStat('a'), null);
});

test('normalizeQueryForStat: null for email-like', () => {
  assert.equal(normalizeQueryForStat('user@example.com'), null);
});

test('normalizeQueryForStat: trims and caps', () => {
  assert.equal(normalizeQueryForStat('  Hello   World  '), 'hello world');
  const long = 'x'.repeat(200);
  const out = normalizeQueryForStat(long);
  assert.equal(out?.length, 120);
});
