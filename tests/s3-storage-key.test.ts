import test from 'node:test';
import assert from 'node:assert/strict';
import { assertSafeStorageKey } from '@/lib/media/s3-presigned';

test('assertSafeStorageKey accepts gallery prefix', () => {
  assert.equal(assertSafeStorageKey('uploads/gallery/2026/05/a.webp'), 'uploads/gallery/2026/05/a.webp');
});

test('assertSafeStorageKey rejects traversal', () => {
  assert.throws(() => assertSafeStorageKey('uploads/gallery/../x'));
});

test('assertSafeStorageKey rejects bad prefix', () => {
  assert.throws(() => assertSafeStorageKey('uploads/other/x'));
});
