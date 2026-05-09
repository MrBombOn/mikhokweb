import test from 'node:test';
import assert from 'node:assert/strict';
import { extraImageHostRulesFromEnv } from '@/lib/remote-image-hosts';

test('extraImageHostRulesFromEnv: empty when unset', () => {
  const prev = process.env.NEXT_PUBLIC_IMAGE_REMOTE_HOSTS;
  delete process.env.NEXT_PUBLIC_IMAGE_REMOTE_HOSTS;
  assert.deepEqual(extraImageHostRulesFromEnv(), []);
  if (prev !== undefined) process.env.NEXT_PUBLIC_IMAGE_REMOTE_HOSTS = prev;
});

test('extraImageHostRulesFromEnv: parses hosts and wildcard', () => {
  const prev = process.env.NEXT_PUBLIC_IMAGE_REMOTE_HOSTS;
  process.env.NEXT_PUBLIC_IMAGE_REMOTE_HOSTS = 'cdn.example.com, *.cdn.example.net , *.r2.dev';
  try {
    const rules = extraImageHostRulesFromEnv();
    assert.equal(rules.length, 3);
    assert.deepEqual(rules[0], { hostname: 'cdn.example.com' });
    assert.deepEqual(rules[1], { hostname: 'cdn.example.net', wildcardSubdomains: true });
    assert.deepEqual(rules[2], { hostname: 'r2.dev', wildcardSubdomains: true });
  } finally {
    if (prev === undefined) delete process.env.NEXT_PUBLIC_IMAGE_REMOTE_HOSTS;
    else process.env.NEXT_PUBLIC_IMAGE_REMOTE_HOSTS = prev;
  }
});
