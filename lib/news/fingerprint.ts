import { createHash } from 'node:crypto';

/** Szöveg normalizálás dedupe kulcshoz (kisbetű, ékezet eltávolítás). */
export function normalizeForFingerprint(s: string): string {
  return s
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

/** P1: FB/IG ugyanazon nap + hasonló cím/szöveg → stabil SHA-256 fingerprint. */
export function computeNewsIngestFingerprint(input: { titleHu: string; textHu: string; listDate: string }): string {
  const bucket = input.listDate.slice(0, 10);
  const raw = `${normalizeForFingerprint(input.titleHu)}|${normalizeForFingerprint(input.textHu)}|${bucket}`;
  return createHash('sha256').update(raw, 'utf8').digest('hex');
}
