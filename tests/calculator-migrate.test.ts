import test from 'node:test';
import assert from 'node:assert/strict';
import { getCalculatorBenchmark } from '@/lib/calculator/benchmarks';
import { computeSummary } from '@/lib/calculator/compute';
import { buildCalculatorExportPayload } from '@/lib/calculator/export';
import { CALCULATOR_FORMULA_VERSION } from '@/lib/calculator/formula-version';
import { migrateCalculatorImport, reassignCalculatorIds } from '@/lib/calculator/migrate';
import type { Semester } from '@/types';

test('migrateCalculatorImport accepts raw semesters array', () => {
  const raw = [
    {
      id: 1,
      name: 'A',
      ghost: false,
      subjects: [{ id: 10, name: 'X', credits: 5, grade: 4, ghost: false }],
    },
  ];
  const r = migrateCalculatorImport(raw);
  assert.equal(r.ok, true);
  if (r.ok) {
    assert.equal(r.semesters.length, 1);
    assert.equal(r.semesters[0]?.subjects.length, 1);
    assert.equal(r.semesters[0]?.subjects[0]?.grade, 4);
  }
});

test('migrateCalculatorImport maps legacy completed=false to grade 1', () => {
  const raw = [
    {
      id: 1,
      name: 'A',
      ghost: false,
      subjects: [{ id: 10, name: 'X', credits: 5, grade: 5, completed: false }],
    },
  ];
  const r = migrateCalculatorImport(raw);
  assert.equal(r.ok, true);
  if (r.ok) assert.equal(r.semesters[0]?.subjects[0]?.grade, 1);
});

test('migrateCalculatorImport accepts export wrapper with formulaVersion', () => {
  const semesters: Semester[] = [
    { id: 1, name: 'S', ghost: false, subjects: [{ id: 2, name: 'T', credits: 3, grade: 3, ghost: false }] },
  ];
  const payload = buildCalculatorExportPayload(semesters, { exportedAt: '2026-01-01', lang: 'hu' });
  assert.equal(payload.formulaVersion, CALCULATOR_FORMULA_VERSION);
  const r = migrateCalculatorImport(payload);
  assert.equal(r.ok, true);
});

test('migrateCalculatorImport rejects non-semester JSON', () => {
  const r = migrateCalculatorImport({ foo: [] });
  assert.equal(r.ok, false);
});

test('reassignCalculatorIds produces fresh ids', () => {
  const semesters: Semester[] = [
    { id: 1, name: 'S', ghost: false, subjects: [{ id: 2, name: 'T', credits: 3, grade: 3, ghost: false }] },
  ];
  const next = reassignCalculatorIds(semesters);
  assert.notEqual(next[0]?.id, 1);
  assert.notEqual(next[0]?.subjects[0]?.id, 2);
});

test('benchmark good_standing has expected non-zero KKI', () => {
  const b = getCalculatorBenchmark('good_standing');
  const s = computeSummary(b);
  assert.ok(s.kki > 0);
});
