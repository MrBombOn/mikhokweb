import test from 'node:test';
import assert from 'node:assert/strict';
import { diffRevisionPayloads } from '@/lib/news/revision-diff';

test('revision diff marks changed keys', () => {
  const rows = diffRevisionPayloads({ a: '1', b: 'x' }, { a: '2', b: 'x' });
  const a = rows.find((r) => r.key === 'a');
  const b = rows.find((r) => r.key === 'b');
  assert.equal(a?.changed, true);
  assert.equal(b?.changed, false);
});

test('revision diff handles missing keys', () => {
  const rows = diffRevisionPayloads({ onlyLeft: true }, { onlyRight: true });
  assert.ok(rows.length >= 2);
});
