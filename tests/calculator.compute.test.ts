import test from 'node:test';
import assert from 'node:assert/strict';
import { computeSummary, subjectsExcludingGhost } from '@/lib/calculator/compute';
import type { Semester } from '@/types';

test('subjectsExcludingGhost only keeps non-ghost subjects', () => {
  const semesters: Semester[] = [
    {
      id: 1,
      name: '2025/1',
      ghost: false,
      subjects: [{ id: 1, name: 'Math', credits: 5, grade: 4, completed: true }],
    },
    {
      id: 2,
      name: '2025/2',
      ghost: true,
      subjects: [{ id: 2, name: 'Physics', credits: 4, grade: 5, completed: true }],
    },
  ];

  const subjects = subjectsExcludingGhost(semesters);
  assert.equal(subjects.length, 1);
  assert.equal(subjects[0]?.name, 'Math');
});

test('computeSummary calculates weighted, KI and KKI', () => {
  const semesters: Semester[] = [
    {
      id: 1,
      name: 'A',
      ghost: false,
      subjects: [
        { id: 1, name: 'A', credits: 4, grade: 5, completed: true },
        { id: 2, name: 'B', credits: 6, grade: 3, completed: false },
      ],
    },
  ];

  const summary = computeSummary(semesters);
  assert.equal(summary.totalRegistered, 10);
  assert.equal(summary.totalCompleted, 4);
  assert.equal(summary.weighted, 3.8);
  assert.equal(summary.ki, 0.4);
  assert.equal(summary.kki, 1.52);
});

test('computeSummary returns zeros with empty subjects', () => {
  const summary = computeSummary([]);
  assert.deepEqual(summary, {
    weighted: 0,
    ki: 0,
    kki: 0,
    totalRegistered: 0,
    totalCompleted: 0,
  });
});

