/**
 * Kereső snippetekhez: HTML címkék eltávolítása, whitespace összenyomása, max hossz.
 */
export function clipPlainText(raw: string, maxLen: number): string {
  const plain = raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  if (plain.length <= maxLen) return plain;
  return `${plain.slice(0, maxLen)}…`;
}
