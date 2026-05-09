import assert from 'node:assert/strict';
import test from 'node:test';
import { computeNewsIngestFingerprint } from '@/lib/news/fingerprint';

test('ingest fingerprint normalizes case and whitespace', () => {
  const a = computeNewsIngestFingerprint({
    titleHu: 'Hello',
    textHu: '  World  ',
    listDate: '2026-05-01',
  });
  const b = computeNewsIngestFingerprint({
    titleHu: 'hello',
    textHu: 'world',
    listDate: '2026-05-01',
  });
  assert.equal(a, b);
});

test('listDate buckets fingerprint', () => {
  const one = computeNewsIngestFingerprint({
    titleHu: 'x',
    textHu: 'y',
    listDate: '2026-05-01',
  });
  const two = computeNewsIngestFingerprint({
    titleHu: 'x',
    textHu: 'y',
    listDate: '2026-05-02',
  });
  assert.notEqual(one, two);
});
