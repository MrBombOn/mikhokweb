import test from 'node:test';
import assert from 'node:assert/strict';
import { computeSemesterSummary, computeSummary, computeSummaryFromSubjects, subjectsExcludingGhost } from '@/lib/calculator/compute';
import type { Semester } from '@/types';

test('subjectsExcludingGhost only keeps non-ghost subjects', () => {
  const semesters: Semester[] = [
    {
      id: 1,
      name: '2025/1',
      ghost: false,
      subjects: [{ id: 1, name: 'Math', credits: 5, grade: 4, ghost: false }],
    },
    {
      id: 2,
      name: '2025/2',
      ghost: true,
      subjects: [{ id: 2, name: 'Physics', credits: 4, grade: 5, ghost: false }],
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
        { id: 1, name: 'A', credits: 4, grade: 5, ghost: false },
        { id: 2, name: 'B', credits: 6, grade: 1, ghost: false },
      ],
    },
  ];

  const summary = computeSummary(semesters);
  assert.equal(summary.totalRegistered, 10);
  assert.equal(summary.totalCompleted, 4);
  assert.equal(summary.weighted, 2.6);
  assert.equal(summary.ki, 0.4);
  assert.equal(summary.kki, 1.04);
});

test('computeSummary excludes ghosted subjects', () => {
  const semesters: Semester[] = [
    {
      id: 1,
      name: 'A',
      ghost: false,
      subjects: [
        { id: 1, name: 'A', credits: 4, grade: 5, ghost: true },
        { id: 2, name: 'B', credits: 6, grade: 4, ghost: false },
      ],
    },
  ];

  const summary = computeSummary(semesters);
  assert.equal(summary.totalRegistered, 6);
  assert.equal(summary.totalCompleted, 6);
  assert.equal(summary.weighted, 4);
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

test('computeSemesterSummary matches computeSummary for a single non-ghost semester', () => {
  const semester = {
    id: 1,
    name: 'A',
    ghost: false,
    subjects: [
      { id: 1, name: 'A', credits: 4, grade: 5, ghost: false },
      { id: 2, name: 'B', credits: 6, grade: 1, ghost: false },
    ],
  };
  assert.deepEqual(computeSemesterSummary(semester), computeSummary([semester]));
});

test('computeSemesterSummary is zeroed for ghost semester', () => {
  const semester = {
    id: 1,
    name: 'Ghost',
    ghost: true,
    subjects: [{ id: 1, name: 'X', credits: 10, grade: 5, ghost: false }],
  };
  assert.deepEqual(computeSemesterSummary(semester), {
    weighted: 0,
    ki: 0,
    kki: 0,
    totalRegistered: 0,
    totalCompleted: 0,
  });
});

test('computeSummaryFromSubjects matches flat list semantics', () => {
  const subjects = [
    { id: 1, name: 'A', credits: 4, grade: 5, ghost: false },
    { id: 2, name: 'B', credits: 6, grade: 1, ghost: false },
  ];
  assert.deepEqual(computeSummaryFromSubjects(subjects), computeSummary([{ id: 1, name: 'S', ghost: false, subjects }]));
});

