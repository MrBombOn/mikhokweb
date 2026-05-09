/**
 * @file Globális betöltő UI (App Router `loading.tsx`)
 */
'use client';

import { useApp } from '@/components/layout/AppProvider';
import { t } from '@/lib/content';

export default function Loading() {
  const { lang } = useApp();
  const s = t(lang).systemShell;

  return (
    <div className="app-shell section state-shell" aria-busy="true" aria-live="polite">
      <div className="card state-card">
        <p className="state-eyebrow">{s.loadingEyebrow}</p>
        <h2 className="state-title">{s.loadingTitle}</h2>
        <p className="state-text">{s.loadingText}</p>
      </div>
    </div>
  );
}
