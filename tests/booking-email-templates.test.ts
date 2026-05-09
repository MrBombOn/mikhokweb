import test from 'node:test';
import assert from 'node:assert/strict';
import { buildBookingCreatedEmail, buildBookingStatusEmail } from '@/lib/notifications/booking';

const sample = {
  id: 42,
  title: 'Gym',
  applicantName: 'Pat',
  email: 'pat@example.com',
  organization: 'Club',
  bookingDate: '2026-06-01',
  startTime: '18:00',
  endTime: '20:00',
  purpose: 'Practice',
};

test('booking email: created HU subject and pending status', () => {
  const { subject, text } = buildBookingCreatedEmail('hu', sample);
  assert.match(subject, /Foglalási igény rögzítve/);
  assert.match(text, /függőben/);
  assert.match(text, /#42/);
});

test('booking email: created EN subject and pending', () => {
  const { subject, text } = buildBookingCreatedEmail('en', sample);
  assert.match(subject, /Gym booking request received/);
  assert.match(text, /pending/i);
  assert.match(text, /#42/);
});

test('booking email: status EN approved', () => {
  const { subject, text } = buildBookingStatusEmail('en', sample, 'approved');
  assert.match(subject, /status updated/);
  assert.match(text, /approved/);
});

test('booking email: status HU rejected', () => {
  const { subject, text } = buildBookingStatusEmail('hu', sample, 'rejected');
  assert.match(subject, /Foglalási státusz/);
  assert.match(text, /elutasítva/);
});
