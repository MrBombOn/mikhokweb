/**
 * @file Route szintű hiba boundary (`error.tsx`)
 */
'use client';

import Link from 'next/link';
import { PublicPageShell } from '@/components/layout/PublicPageShell';
import { useApp } from '@/components/layout/AppProvider';
import { AlertTriangleIcon, HomeIcon, RefreshCwIcon } from '@/components/ui/Icons';
import { t } from '@/lib/content';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const { lang } = useApp();
  const s = t(lang).systemShell;

  return (
    <PublicPageShell>
      <section className="section state-shell">
        <div className="card state-card">
          <p className="state-eyebrow">{s.routeErrorEyebrow}</p>
          <AlertTriangleIcon className="state-icon" />
          <h2 className="state-title">{s.routeErrorTitle}</h2>
          <p className="state-text">{error.message || s.routeErrorMessageFallback}</p>
          <div className="state-actions">
            <button type="button" className="btn btn-primary" onClick={() => reset()}>
              <RefreshCwIcon className="icon--sm" />
              {s.retryShort}
            </button>
            <Link href="/" className="btn btn-secondary">
              <HomeIcon className="icon--sm" />
              {s.homeShort}
            </Link>
          </div>
        </div>
      </section>
    </PublicPageShell>
  );
}
