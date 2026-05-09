import assert from 'node:assert/strict';
import test from 'node:test';
import { loginFormSchema } from '@/lib/validation/auth';
import { feedbackSchema } from '@/lib/validation/feedback';
import { createNewsSchema } from '@/features/news/schema';

test('loginFormSchema rejects markup-like username payload', () => {
  const bad = loginFormSchema.safeParse({ username: '<script>x</script>', password: 'x' });
  assert.equal(bad.success, false);
  const ok = loginFormSchema.safeParse({ username: 'admin', password: 'secret-pass' });
  assert.equal(ok.success, true);
});

test('feedbackSchema rejects script and inline event handlers', () => {
  const script = feedbackSchema.safeParse({
    module: 'general',
    message: '<script>alert(1)</script>',
    email: undefined,
  });
  assert.equal(script.success, false);

  const onload = feedbackSchema.safeParse({
    module: 'general',
    message: 'Hello <img src=x onerror=alert(1)>',
    email: undefined,
  });
  assert.equal(onload.success, false);
});

test('createNewsSchema rejects active script patterns in text fields', () => {
  const base = {
    source: 'internal' as const,
    category: 'Közélet',
    status: 'draft' as const,
    titleHu: 'Cím',
    titleEn: 'Title',
    author: 'A',
    cover: 'blue' as const,
  };
  const bad = createNewsSchema.safeParse({
    ...base,
    textHu: 'javascript:alert(1)',
    textEn: 'Valid body text in English here.',
  });
  assert.equal(bad.success, false);
});
