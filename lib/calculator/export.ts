/**
 * @file KKI export – kliens oldali JSON letöltés (§12.1 export).
 */
import type { Semester } from '@/types';

export function buildCalculatorExportPayload(semesters: Semester[], meta: { exportedAt: string; lang: string }) {
  return {
    version: 1,
    ...meta,
    semesters,
  };
}

export function downloadCalculatorJson(semesters: Semester[], lang: string) {
  const payload = buildCalculatorExportPayload(semesters, {
    exportedAt: new Date().toISOString(),
    lang,
  });
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `kki-export-${payload.exportedAt.slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}
