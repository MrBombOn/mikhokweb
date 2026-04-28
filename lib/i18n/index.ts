import type { Lang } from '@/types';
import { messages } from '@/lib/i18n/messages';

/** @deprecated Használd inkább a `messages` nevet; a `dictionary` alias a régi importok miatt marad. */
export const dictionary = messages;

export type Messages = typeof messages;

export function t(lang: Lang) {
  return messages[lang];
}
