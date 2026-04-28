/**
 * @file KKI kalkulátor – tiszta domain számítások (§12.2)
 *
 * A UI csak ezt a modult hívja összegzésre; képletek: `docs/calculator-rules.md`.
 */
import type { Semester, SemesterSubject } from '@/types';

export type CalculatorSummary = {
  /** Súlyozott átlag: Σ(kredit×jegy) / Σ(kredit), nem ghost félévek, minden tárgy. */
  weighted: number;
  /** KI: teljesített kreditek / felvett kreditek (0 ha nincs felvett kredit). */
  ki: number;
  /** KKI: súlyozott átlag × KI. */
  kki: number;
  totalRegistered: number;
  totalCompleted: number;
};

/** Nem ghost félévek tárgyai összefűzve. */
export function subjectsExcludingGhost(semesters: Semester[]): SemesterSubject[] {
  return semesters.filter((s) => !s.ghost).flatMap((s) => s.subjects);
}

export function computeSummary(semesters: Semester[]): CalculatorSummary {
  const allSubjects = subjectsExcludingGhost(semesters);
  const totalRegistered = allSubjects.reduce((sum, s) => sum + s.credits, 0);
  const totalCompleted = allSubjects.filter((s) => s.completed).reduce((sum, s) => sum + s.credits, 0);
  const weightedBase = allSubjects.reduce((sum, s) => sum + s.credits * s.grade, 0);
  const weighted = totalRegistered > 0 ? weightedBase / totalRegistered : 0;
  const ki = totalRegistered > 0 ? totalCompleted / totalRegistered : 0;
  const kki = weighted * ki;
  return { weighted, ki, kki, totalRegistered, totalCompleted };
}

export function formatSummaryDisplay(s: CalculatorSummary, decimals = 2) {
  return {
    weighted: s.weighted.toFixed(decimals),
    ki: s.ki.toFixed(decimals),
    kki: s.kki.toFixed(decimals),
    totalRegistered: s.totalRegistered,
    totalCompleted: s.totalCompleted,
  };
}
