/**
 * Összehasonlító (compare) mód mintaállapotai – statikus, determinisztikus.
 */
import type { Semester } from '@/types';

export const CALCULATOR_BENCHMARK_KEYS = ['good_standing', 'mixed', 'low_completion'] as const;
export type CalculatorBenchmarkKey = (typeof CALCULATOR_BENCHMARK_KEYS)[number];

const goodStanding: Semester[] = [
  {
    id: 91001,
    name: '2025/26 ősz',
    ghost: false,
    subjects: [
      { id: 92001, name: 'Analízis', credits: 6, grade: 5, ghost: false },
      { id: 92002, name: 'Algebra', credits: 5, grade: 4, ghost: false },
      { id: 92003, name: 'Programozás', credits: 5, grade: 5, ghost: false },
    ],
  },
];

const mixed: Semester[] = [
  {
    id: 91002,
    name: '2025/26 tavasz',
    ghost: false,
    subjects: [
      { id: 92010, name: 'Fizika', credits: 4, grade: 3, ghost: false },
      { id: 92011, name: 'Kémia', credits: 3, grade: 5, ghost: false },
      { id: 92012, name: 'Projekt', credits: 6, grade: 1, ghost: false },
    ],
  },
];

const lowCompletion: Semester[] = [
  {
    id: 91003,
    name: '2024/25 tavasz',
    ghost: false,
    subjects: [
      { id: 92020, name: 'Tárgy A', credits: 5, grade: 2, ghost: false },
      { id: 92021, name: 'Tárgy B', credits: 5, grade: 1, ghost: false },
      { id: 92022, name: 'Tárgy C', credits: 4, grade: 1, ghost: false },
    ],
  },
];

const byKey: Record<CalculatorBenchmarkKey, Semester[]> = {
  good_standing: goodStanding,
  mixed,
  low_completion: lowCompletion,
};

export function getCalculatorBenchmark(key: CalculatorBenchmarkKey): Semester[] {
  return byKey[key].map((sem) => ({
    ...sem,
    subjects: sem.subjects.map((s) => ({ ...s })),
  }));
}
