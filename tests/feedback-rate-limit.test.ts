import assert from 'node:assert/strict';
import test from 'node:test';
import { feedbackRateLimitKey } from '@/lib/security/feedback-rate-limit';

test('feedback rate limit key distinguishes User-Agent for same IP', () => {
  const a = new Request('https://example.com/api/feedback', {
    headers: {
      'x-forwarded-for': '198.51.100.1',
      'user-agent': 'Mozilla/5.0 (BotA)',
    },
  });
  const b = new Request('https://example.com/api/feedback', {
    headers: {
      'x-forwarded-for': '198.51.100.1',
      'user-agent': 'curl/8.0',
    },
  });
  assert.notEqual(feedbackRateLimitKey(a), feedbackRateLimitKey(b));
});

test('feedback rate limit key is stable for normalized IP hop', () => {
  const req = new Request('https://example.com/api/feedback', {
    headers: {
      'x-forwarded-for': '10.0.0.1, 198.51.100.2',
      'user-agent': 'TestAgent/1',
    },
  });
  assert.ok(feedbackRateLimitKey(req).includes('10.0.0.1'));
});
