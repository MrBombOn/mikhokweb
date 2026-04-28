/**
 * @file Middleware „admin denied” visszajelzés URL query alapján
 *
 * @description
 * Ha a felhasználó `/admin`-ra megy érvényes session nélkül, a `middleware` átirányít
 * `/?admin=denied` címre. Ez a komponens **egyszer** toastol, majd `history.replaceState`-tel
 * eltávolítja a query paramétert (hogy frissítéskor ne ismétlődjön).
 *
 * @Suspense
 * A `useSearchParams()` miatt a szülőnek `<Suspense>` kell (lásd `app/(public)/page.tsx`).
 */
'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useApp } from '@/components/layout/AppProvider';

export function AdminDeniedBanner() {
  const searchParams = useSearchParams();
  const { toast, lang } = useApp();
  const shown = useRef(false);

  useEffect(() => {
    if (shown.current) return;
    if (searchParams.get('admin') !== 'denied') return;
    shown.current = true;
    toast(lang === 'hu' ? 'Az admin felület csak belépés után érhető el.' : 'The admin area is only available after sign-in.', 'warning');
    const url = new URL(window.location.href);
    url.searchParams.delete('admin');
    window.history.replaceState({}, '', url.pathname + url.search);
  }, [searchParams, toast, lang]);

  return null;
}
