/**
 * @file „Lap tetejére” lebegő gomb
 *
 * @description
 * Scroll pozíció figyelése: ha `window.scrollY > 220`, megjelenik a gomb.
 * Kattintás: `window.scrollTo({ behavior: 'smooth' })` – felhasználóbarát animáció.
 *
 * @pozíció
 * `fixed` jobb alsó sarok – ne ütközzön a toast stackkel (z-index 50).
 */
'use client';

import { useEffect, useState } from 'react';
import { ArrowUpIcon } from '@/components/ui/Icons';

export function ScrollTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 220);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      className="btn btn-primary pte-page-up-control"
      aria-label="Ugrás a lap elejére"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <ArrowUpIcon />
    </button>
  );
}
