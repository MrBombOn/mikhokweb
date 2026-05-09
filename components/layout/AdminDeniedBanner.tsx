/**
 * @file Middleware „admin denied” visszajelzés URL query alapján
 */
'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useApp } from '@/components/layout/AppProvider';
import { t } from '@/lib/content';

export function AdminDeniedBanner() {
  const searchParams = useSearchParams();
  const { toast, lang } = useApp();
  const shown = useRef(false);

  useEffect(() => {
    if (shown.current) return;
    if (searchParams.get('admin') !== 'denied') return;
    shown.current = true;
    toast(t(lang).common.adminDeniedToast, 'warning');
    const url = new URL(window.location.href);
    url.searchParams.delete('admin');
    window.history.replaceState({}, '', url.pathname + url.search);
  }, [searchParams, toast, lang]);

  return null;
}
