/**
 * @file i18n réteg – szótár export és `t()` segédfüggvény
 *
 * @description
 * - `messages`: nyers HU/EN szövegfa (`messages.ts`).
 * - `dictionary`: **alias** a `messages`-re – régi importok (`dictionary`) ne törjenek el.
 * - `t(lang)`: adott nyelvű ág visszaadása; típusbiztos kulcsok a `Messages` típusból.
 *
 * @importminta
 * `import { t } from '@/lib/content'` – a `content.ts` re-exportálja a `t`-t is.
 */
import type { Lang } from '@/types';
import { messages } from '@/lib/i18n/messages';

/** @deprecated Preferált név: `messages`; a `dictionary` csak kompatibilitási alias. */
export const dictionary = messages;

/** A `messages` objektum TypeScript típusa – `as const` miatt szűk literál uniók. */
export type Messages = typeof messages;

/**
 * Aktuális nyelvhez tartozó üzenetcsomag.
 * @param lang – `'hu'` vagy `'en'`
 * @returns A teljes `nav`, `common`, stb. objektum a választott nyelvre.
 */
export function t(lang: Lang) {
  return messages[lang];
}
