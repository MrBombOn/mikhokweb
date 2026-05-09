/**
 * P8: egyszerű „ma” nyitvatartás-sor keresése a heti blokkban vagy a rövid nyitvatartás szövegben.
 * A sorban szerepelnie kell a hét napjának teljes nevénak (locale szerint).
 */
export function findTodayScheduleLine(text: string, locale: 'hu' | 'en', now = new Date()): string | null {
  const trimmed = text.trim();
  if (!trimmed) return null;
  const dayName = new Intl.DateTimeFormat(locale === 'hu' ? 'hu-HU' : 'en-GB', { weekday: 'long' }).format(now);
  const needle = dayName.toLowerCase();
  const lines = trimmed.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const hit = lines.find((l) => l.toLowerCase().includes(needle));
  return hit ?? null;
}
