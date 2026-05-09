/**
 * @file Hír revízió snapshot JSON egyszerű mező-diff (P8).
 */

function stringifyVal(v: unknown): string {
  if (v === null || v === undefined) return '';
  if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') return String(v);
  try {
    return JSON.stringify(v, null, 0);
  } catch {
    return String(v);
  }
}

export type RevisionDiffRow = { key: string; before: string; after: string; changed: boolean };

export function diffRevisionPayloads(
  before: Record<string, unknown> | null | undefined,
  after: Record<string, unknown> | null | undefined,
): RevisionDiffRow[] {
  const a = before ?? {};
  const b = after ?? {};
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  return [...keys]
    .sort((x, y) => x.localeCompare(y))
    .map((key) => {
      const left = stringifyVal(a[key]);
      const right = stringifyVal(b[key]);
      return { key, before: left, after: right, changed: left !== right };
    });
}
