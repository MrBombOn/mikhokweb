/**
 * @file KKI kalkulátor – tiszta domain számítások (§12.2)
 *
 * A UI csak ezt a modult hívja összegzésre; képletek: `docs/calculator-rules.md`.
 */
import type { Semester, SemesterSubject } from '@/types';

export type CalculatorSummary = {
  /** Súlyozott átlag: Σ(kredit×jegy) / Σ(kredit), nem ghost félévek, minden tárgy. */
  weighted: number;
  /** KI: teljesített kreditek / felvett kreditek (1-es jegy nem teljesített). */
  ki: number;
  /** KKI: súlyozott átlag × KI. */
  kki: number;
  totalRegistered: number;
  totalCompleted: number;
};

/** Nem ghost félévek tárgyai összefűzve. */
export function subjectsExcludingGhost(semesters: Semester[]): SemesterSubject[] {
  return semesters
    .filter((s) => !s.ghost)
    .flatMap((s) => s.subjects.filter((subject) => !subject.ghost));
}

/**
 * Egy tárgylista összesítése — ugyanaz a képlet, mint a globál összegző panel (`docs/calculator-rules.md`).
 * Félévenként: nem ghost tárgyak `S` halmaza erre a hívásra.
 */
export function computeSummaryFromSubjects(subjects: SemesterSubject[]): CalculatorSummary {
  const totalRegistered = subjects.reduce((sum, s) => sum + s.credits, 0);
  const totalCompleted = subjects.filter((s) => s.grade > 1).reduce((sum, s) => sum + s.credits, 0);
  const weightedBase = subjects.reduce((sum, s) => sum + s.credits * s.grade, 0);
  const weighted = totalRegistered > 0 ? weightedBase / totalRegistered : 0;
  const ki = totalRegistered > 0 ? totalCompleted / totalRegistered : 0;
  const kki = weighted * ki;
  return { weighted, ki, kki, totalRegistered, totalCompleted };
}

/** Egy félévre ugyanazok a mutatók, mint az összesített panelen (ghost félév → minden nulla). */
export function computeSemesterSummary(semester: Semester): CalculatorSummary {
  if (semester.ghost) {
    return { weighted: 0, ki: 0, kki: 0, totalRegistered: 0, totalCompleted: 0 };
  }
  const subjects = semester.subjects.filter((s) => !s.ghost);
  return computeSummaryFromSubjects(subjects);
}

export function computeSummary(semesters: Semester[]): CalculatorSummary {
  return computeSummaryFromSubjects(subjectsExcludingGhost(semesters));
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
