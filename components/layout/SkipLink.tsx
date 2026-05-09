/**
 * @file Skip link – nyelv a `AppProvider` szerint (`messages.internal.skipToContent`)
 */
'use client';

import { useApp } from '@/components/layout/AppProvider';
import { t } from '@/lib/content';

export function SkipLink() {
  const { lang } = useApp();
  return (
    <a href="#main-content" className="skip-link">
      {t(lang).internal.skipToContent}
    </a>
  );
}
