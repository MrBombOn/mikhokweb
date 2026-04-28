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
      style={{
        position: 'fixed',
        right: 22,
        bottom: 22,
        zIndex: 50,
        width: 56,
        height: 56,
        padding: 0,
        borderRadius: 9999,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 'var(--shadow-lg)',
      }}
    >
      <ArrowUpIcon />
    </button>
  );
}