import test from 'node:test';
import assert from 'node:assert/strict';
import { NextResponse } from 'next/server';
import { getRequestId, withRequestId } from '@/lib/observability/request-context';

test('getRequestId keeps incoming header value', () => {
  const req = new Request('http://localhost/api/x', {
    headers: { 'x-request-id': 'req-123' },
  });
  assert.equal(getRequestId(req), 'req-123');
});

test('getRequestId generates uuid when missing', () => {
  const req = new Request('http://localhost/api/x');
  const id = getRequestId(req);
  assert.ok(id.length >= 20);
});

test('withRequestId sets response header', () => {
  const res = NextResponse.json({ ok: true });
  const out = withRequestId(res, 'abc-xyz');
  assert.equal(out.headers.get('x-request-id'), 'abc-xyz');
});

