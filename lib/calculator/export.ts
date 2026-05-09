/**
 * @file KKI export – kliens oldali JSON letöltés (§12.1 export).
 */
import { CALCULATOR_FORMULA_VERSION } from '@/lib/calculator/formula-version';
import type { Semester } from '@/types';

export function buildCalculatorExportPayload(semesters: Semester[], meta: { exportedAt: string; lang: string }) {
  return {
    version: 1,
    formulaVersion: CALCULATOR_FORMULA_VERSION,
    ...meta,
    semesters,
  };
}

export function downloadCalculatorJson(
  semesters: Semester[],
  options: { lang: string; filePrefix: string },
) {
  const payload = buildCalculatorExportPayload(semesters, {
    exportedAt: new Date().toISOString(),
    lang: options.lang,
  });
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const safePrefix = options.filePrefix.replace(/[^a-zA-Z0-9._-]+/g, '-').slice(0, 64) || 'kki-export';
  a.download = `${safePrefix}-${payload.exportedAt.slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function triggerDownload(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
}

function safePrefix(prefix: string) {
  return prefix.replace(/[^a-zA-Z0-9._-]+/g, '-').slice(0, 64) || 'kki-export';
}

export function downloadCalculatorCsv(
  semesters: Semester[],
  options: { filePrefix: string; lang: string },
) {
  const header =
    options.lang === 'hu'
      ? ['felev', 'targy', 'kredit', 'jegy', 'felev_whatif', 'targy_whatif']
      : ['semester', 'subject', 'credits', 'grade', 'semester_whatif', 'subject_whatif'];
  const rows = semesters.flatMap((semester) =>
    semester.subjects.map((subject) => [
      semester.name,
      subject.name,
      String(subject.credits),
      String(subject.grade),
      semester.ghost ? '1' : '0',
      subject.ghost ? '1' : '0',
    ]),
  );
  const escapeCsv = (value: string) => `"${value.replace(/"/g, '""')}"`;
  const body = [header, ...rows].map((line) => line.map(escapeCsv).join(',')).join('\n');
  const blob = new Blob([`\uFEFF${body}`], { type: 'text/csv;charset=utf-8' });
  triggerDownload(blob, `${safePrefix(options.filePrefix)}-${new Date().toISOString().slice(0, 10)}.csv`);
}

function toBase64Url(input: string) {
  return btoa(unescape(encodeURIComponent(input))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function fromBase64Url(input: string) {
  const padded = input.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(input.length / 4) * 4, '=');
  return decodeURIComponent(escape(atob(padded)));
}

export function buildCalculatorShareLink(semesters: Semester[]) {
  const payload = JSON.stringify({ v: 1, fv: CALCULATOR_FORMULA_VERSION, semesters });
  const token = toBase64Url(payload);
  const url = new URL(window.location.href);
  url.searchParams.set('share', token);
  url.searchParams.set('mode', 'readonly');
  return url.toString();
}

export function parseCalculatorShareToken(token: string): Semester[] | null {
  try {
    const parsed = JSON.parse(fromBase64Url(token)) as { v?: number; fv?: number; semesters?: Semester[] };
    if (parsed.v !== 1 || !Array.isArray(parsed.semesters)) return null;
    // `fv` hiánya = régi link; ugyanaz a képlet v1, a séma validálás a betöltő oldalon történik.
    void parsed.fv;
    return parsed.semesters;
  } catch {
    return null;
  }
}
