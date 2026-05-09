import test from 'node:test';
import assert from 'node:assert/strict';
import { createBookingSchema } from '@/lib/validation/bookings';
import { calculatorStateSchema } from '@/lib/validation/calculator';
import { createEventSchema } from '@/lib/validation/events';
import { feedbackSchema } from '@/lib/validation/feedback';
import { bulkImportCategoriesSchema } from '@/lib/validation/categories';
import { bulkImportUsersSchema } from '@/lib/validation/users';

test('API contract: bookings create payload accepts valid request', () => {
  const parsed = createBookingSchema.safeParse({
    title: 'Edzés',
    applicantName: 'Teszt Elek',
    email: 'teszt@example.com',
    organization: 'MIK HÖK',
    bookingDate: '2026-05-07',
    startTime: '18:00',
    endTime: '19:30',
    purpose: 'Csapat edzés',
  });
  assert.equal(parsed.success, true);
  if (parsed.success) assert.equal(parsed.data.locale, 'hu');
});

test('API contract: bookings create accepts locale en', () => {
  const parsed = createBookingSchema.safeParse({
    applicantName: 'Test User',
    email: 'teszt@example.com',
    bookingDate: '2026-05-07',
    startTime: '18:00',
    endTime: '19:30',
    purpose: 'Training',
    locale: 'en',
  });
  assert.equal(parsed.success, true);
  if (parsed.success) assert.equal(parsed.data.locale, 'en');
});

test('API contract: bookings create payload rejects invalid email', () => {
  const parsed = createBookingSchema.safeParse({
    applicantName: 'Teszt Elek',
    email: 'not-an-email',
    bookingDate: '2026-05-07',
    startTime: '18:00',
    endTime: '19:30',
    purpose: 'Csapat edzés',
  });
  assert.equal(parsed.success, false);
});

test('API contract: events create payload requires date pattern', () => {
  const ok = createEventSchema.safeParse({
    titleHu: 'Kari nap',
    titleEn: 'Faculty day',
    eventDate: '2026-05-07',
    time: '10:00-12:00',
    location: 'MIK Aula',
    category: 'Közösség',
  });
  const bad = createEventSchema.safeParse({
    titleHu: 'Kari nap',
    titleEn: 'Faculty day',
    eventDate: '07-05-2026',
    time: '10:00-12:00',
    location: 'MIK Aula',
    category: 'Közösség',
  });
  assert.equal(ok.success, true);
  assert.equal(bad.success, false);
});

test('API contract: feedback payload enforces min message length', () => {
  const short = feedbackSchema.safeParse({ module: 'news', message: 'rövid', email: 'a@b.hu' });
  const valid = feedbackSchema.safeParse({ module: 'news', message: 'Ez egy valid hosszúságú visszajelzés.', email: 'a@b.hu' });
  assert.equal(short.success, false);
  assert.equal(valid.success, true);
});

test('API contract: bulk users import accepts array body', () => {
  const parsed = bulkImportUsersSchema.safeParse({
    items: [{ username: 'abulkuser', password: 'password1', role: 'OFFICE' }],
  });
  assert.equal(parsed.success, true);
});

test('API contract: bulk users import rejects empty items', () => {
  const parsed = bulkImportUsersSchema.safeParse({ items: [] });
  assert.equal(parsed.success, false);
});

test('API contract: bulk categories import accepts valid rows', () => {
  const parsed = bulkImportCategoriesSchema.safeParse({
    items: [{ scope: 'news', nameHu: 'Teszt', nameEn: 'Test', sortOrder: 0, status: 'published' }],
  });
  assert.equal(parsed.success, true);
});

test('API contract: calculator state caps semesters at 50', () => {
  const oneSemester = {
    id: 1,
    name: '2026/27 ősz',
    ghost: false,
    subjects: [{ id: 1, name: 'Analízis', credits: 5, grade: 4, ghost: false }],
  };
  const valid = calculatorStateSchema.safeParse({ semesters: Array.from({ length: 50 }, (_, i) => ({ ...oneSemester, id: i + 1 })) });
  const invalid = calculatorStateSchema.safeParse({ semesters: Array.from({ length: 51 }, (_, i) => ({ ...oneSemester, id: i + 1 })) });
  assert.equal(valid.success, true);
  assert.equal(invalid.success, false);
});
