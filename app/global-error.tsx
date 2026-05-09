'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';
import { AlertTriangleIcon, HomeIcon, RefreshCwIcon } from '@/components/ui/Icons';
import { messages } from '@/lib/i18n/messages';
import { readStoredLang } from '@/lib/i18n/lang-storage';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const lang = readStoredLang();
  const s = messages[lang].systemShell;

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
      Sentry.captureException(error);
    }
  }, [error]);

  return (
    <html lang={lang}>
      <body>
        <main className="app-shell section state-shell">
          <div className="card state-card">
            <p className="state-eyebrow">{s.globalErrorEyebrow}</p>
            <AlertTriangleIcon className="state-icon" />
            <h2 className="state-title">{s.globalErrorTitle}</h2>
            <p className="state-text">{error.message || s.globalErrorMessageFallback}</p>
            <div className="state-actions">
              <button type="button" className="btn btn-primary" onClick={() => reset()}>
                <RefreshCwIcon className="icon--sm" />
                {s.retryButton}
              </button>
              <Link href="/" className="btn btn-secondary">
                <HomeIcon className="icon--sm" />
                {s.backHome}
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
