/**
 * Import / régi mentések normalizálása – tömb, export wrapper, opcionális `completed` mező.
 */
import { calculatorStateSchema } from '@/lib/validation/calculator';
import type { Semester, SemesterSubject } from '@/types';
import type { z } from 'zod';

function isRecord(x: unknown): x is Record<string, unknown> {
  return x !== null && typeof x === 'object' && !Array.isArray(x);
}

let idSeq = 0;
function nextId() {
  idSeq += 1;
  return Date.now() + idSeq;
}

function asInt(n: unknown, fallback: number): number {
  if (typeof n === 'number' && Number.isInteger(n)) return n;
  if (typeof n === 'string' && n.trim() !== '') {
    const p = Number.parseInt(n, 10);
    if (Number.isInteger(p)) return p;
  }
  return fallback;
}

function clampCredits(n: number) {
  return Math.max(0, Math.min(60, Math.round(n)));
}

function clampGrade(n: number) {
  return Math.max(1, Math.min(5, Math.round(n)));
}

/** Legacy / hibás ID-k ütközésének elkerülése import után. */
export function reassignCalculatorIds(semesters: Semester[]): Semester[] {
  return semesters.map((sem) => ({
    ...sem,
    id: nextId(),
    subjects: sem.subjects.map((sub) => ({ ...sub, id: nextId() })),
  }));
}

function normalizeSubject(raw: unknown): SemesterSubject | null {
  if (!isRecord(raw)) return null;
  const name = typeof raw.name === 'string' ? raw.name.trim() : '';
  if (!name) return null;

  let credits = asInt(raw.credits, 0);
  credits = clampCredits(credits);

  let grade = asInt(raw.grade, 4);
  grade = clampGrade(grade);

  if ('completed' in raw && typeof raw.completed === 'boolean') {
    if (raw.completed === false) {
      grade = 1;
    } else if (!Number.isFinite(Number(raw.grade))) {
      grade = 4;
    }
  }

  const ghost = raw.ghost === true;

  return {
    id: asInt(raw.id, nextId()),
    name: name.slice(0, 200),
    credits,
    grade,
    ghost,
  };
}

function normalizeSemester(raw: unknown): Semester | null {
  if (!isRecord(raw)) return null;
  const nameRaw = typeof raw.name === 'string' ? raw.name.trim() : '';
  const name = nameRaw ? nameRaw.slice(0, 200) : 'Félév';
  const ghost = raw.ghost === true;
  const subjArr = Array.isArray(raw.subjects) ? raw.subjects : [];
  const subjects = subjArr.map(normalizeSubject).filter((s): s is SemesterSubject => s != null);

  return {
    id: asInt(raw.id, nextId()),
    name,
    ghost,
    subjects,
  };
}

function extractSemestersArray(input: unknown): unknown[] | null {
  if (Array.isArray(input)) return input;
  if (!isRecord(input)) return null;
  if (Array.isArray(input.semesters)) return input.semesters;
  return null;
}

export type MigrateCalculatorResult =
  | { ok: true; semesters: Semester[]; warnings: string[] }
  | { ok: false; error: string; zodError?: z.inferFlattenedErrors<typeof calculatorStateSchema> };

/**
 * JSON (parse-olt érték) → aktuális `calculatorStateSchema` szerinti állapot.
 * Nem dob: mindig strukturált eredmény.
 */
export function migrateCalculatorImport(input: unknown, options?: { reassignIds?: boolean }): MigrateCalculatorResult {
  const warnings: string[] = [];
  const arr = extractSemestersArray(input);
  if (!arr) {
    return { ok: false, error: 'A fájl nem tartalmaz félévlistát (semesters tömb vagy közvetlen tömb).' };
  }

  const semesters = arr.map(normalizeSemester).filter((s): s is Semester => s != null);
  if (semesters.length === 0) {
    return { ok: false, error: 'Nincs egy érvényes félév sem az importban.' };
  }

  if (semesters.length < arr.length) {
    warnings.push('Néhány sor kihagyásra került (hiányzó név vagy hibás szerkezet).');
  }

  const toValidate = options?.reassignIds === false ? semesters : reassignCalculatorIds(semesters);

  const parsed = calculatorStateSchema.safeParse({ semesters: toValidate });
  if (!parsed.success) {
    return {
      ok: false,
      error: 'Az import nem felel meg a jelenlegi sémának.',
      zodError: parsed.error.flatten(),
    };
  }

  return { ok: true, semesters: parsed.data.semesters, warnings };
}
