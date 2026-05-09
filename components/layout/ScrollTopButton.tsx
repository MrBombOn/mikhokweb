/**
 * @file „Lap tetejére” lebegő gomb
 */
'use client';

import { useEffect, useState } from 'react';
import { useApp } from '@/components/layout/AppProvider';
import { ArrowUpIcon } from '@/components/ui/Icons';
import { t } from '@/lib/content';

export function ScrollTopButton() {
  const { lang } = useApp();
  const label = t(lang).common.scrollToTopAria;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 220);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      className={`btn btn-primary pte-page-up-control${visible ? ' pte-page-up-control--visible' : ''}`}
      aria-label={label}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <ArrowUpIcon />
    </button>
  );
}
