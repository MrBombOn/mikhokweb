/**
 * @file Mentett UI nyelv olvasása AppProvider nélkül (pl. `global-error`)
 *
 * A kulcs meg kell egyezzen az `AppProvider` `STORAGE.lang` értékével.
 */
import type { Lang } from '@/types';

export const APP_LANG_STORAGE_KEY = 'v26-lang';

export function readStoredLang(): Lang {
  if (typeof window === 'undefined') return 'hu';
  try {
    const v = window.localStorage.getItem(APP_LANG_STORAGE_KEY);
    if (v === 'hu' || v === 'en') return v;
  } catch {
    /* private / blocked storage */
  }
  const html = document.documentElement.getAttribute('lang');
  return html === 'en' ? 'en' : 'hu';
}
