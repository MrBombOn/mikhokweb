import assert from 'node:assert/strict';
import test from 'node:test';
import { NextResponse } from 'next/server';
import { apiRequestLog } from '@/lib/observability/api-request-log';

test('apiRequestLog wrap sets x-request-id on response', () => {
  const req = new Request('https://example.org/api/test', { headers: { 'x-request-id': 'trace-abc' } });
  const log = apiRequestLog(req, 'test.scope');
  const res = log.wrap(NextResponse.json({ ok: 1 }));
  assert.equal(res.headers.get('x-request-id'), 'trace-abc');
});
