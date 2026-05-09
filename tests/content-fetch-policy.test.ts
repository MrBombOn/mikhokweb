import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { readDemoFallbackPolicy } from '@/lib/services/content-fetch-policy';

describe('readDemoFallbackPolicy (Fázis 6 demo fallback)', () => {
  it('production: off unless ALLOW_DEMO_FALLBACK=1', () => {
    assert.equal(readDemoFallbackPolicy({ NODE_ENV: 'production', ALLOW_DEMO_FALLBACK: undefined }), false);
    assert.equal(readDemoFallbackPolicy({ NODE_ENV: 'production', ALLOW_DEMO_FALLBACK: '0' }), false);
    assert.equal(readDemoFallbackPolicy({ NODE_ENV: 'production', ALLOW_DEMO_FALLBACK: '1' }), true);
  });

  it('development: on unless ALLOW_DEMO_FALLBACK=0', () => {
    assert.equal(readDemoFallbackPolicy({ NODE_ENV: 'development', ALLOW_DEMO_FALLBACK: undefined }), true);
    assert.equal(readDemoFallbackPolicy({ NODE_ENV: 'development', ALLOW_DEMO_FALLBACK: '0' }), false);
    assert.equal(readDemoFallbackPolicy({ NODE_ENV: 'test', ALLOW_DEMO_FALLBACK: undefined }), true);
  });
});
