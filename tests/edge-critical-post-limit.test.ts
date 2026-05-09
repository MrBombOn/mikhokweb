import test from 'node:test';
import assert from 'node:assert/strict';
import {
  clearEdgeCriticalPostBucketsForTests,
  edgeCriticalPostBlocked,
  edgeCriticalPostRegister,
} from '@/lib/security/edge-critical-post-limit';

test('edge critical post: blocks after limit', () => {
  clearEdgeCriticalPostBucketsForTests();
  const path = '/api/feedback';
  const ip = '1.2.3.4';
  for (let i = 0; i < 24; i += 1) {
    assert.equal(edgeCriticalPostBlocked(path, ip), false);
    edgeCriticalPostRegister(path, ip);
  }
  assert.equal(edgeCriticalPostBlocked(path, ip), true);
  clearEdgeCriticalPostBucketsForTests();
});
