import test from 'node:test';
import assert from 'node:assert/strict';
import { isDeleteBlockedForLastAdmin } from '@/lib/privacy/can-delete-staff-user';

test('privacy: last ADMIN cannot be deleted', () => {
  assert.equal(isDeleteBlockedForLastAdmin('ADMIN', 1), true);
  assert.equal(isDeleteBlockedForLastAdmin('ADMIN', 2), false);
});

test('privacy: OFFICE delete not blocked by admin count', () => {
  assert.equal(isDeleteBlockedForLastAdmin('OFFICE', 1), false);
});
