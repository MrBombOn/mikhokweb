import test from 'node:test';
import assert from 'node:assert/strict';
import { assertGalleryImageUpload, assertGuideDocumentUpload } from '@/lib/media/upload-policy';

test('assertGalleryImageUpload rejects oversize', () => {
  assert.throws(() =>
    assertGalleryImageUpload({ type: 'image/jpeg', size: 20 * 1024 * 1024, name: 'x.jpg' }),
  );
});

test('assertGuideDocumentUpload rejects bad mime', () => {
  assert.throws(() =>
    assertGuideDocumentUpload({ type: 'application/x-msdownload', size: 100, name: 'x.exe' }),
  );
});
