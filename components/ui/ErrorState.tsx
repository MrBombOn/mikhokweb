/**
 * @file Hiba + opcionális újrapróbálás (D3)
 */
'use client';

import type { ReactNode } from 'react';
import { useApp } from '@/components/layout/AppProvider';
import { t } from '@/lib/content';

export function ErrorState({
  title,
  message,
  onRetry,
  retryLabel,
  children,
}: {
  title?: string;
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
  children?: ReactNode;
}): ReactNode {
  const { lang } = useApp();
  const fallbackRetry = t(lang).common.errorRetryFallback;

  return (
    <div className="card error-state" role="alert">
      {title ? <h2 className="error-state-title">{title}</h2> : null}
      <p className="error-state-message">{message}</p>
      {onRetry ? (
        <button type="button" className="btn btn-primary error-state-retry" onClick={onRetry}>
          {retryLabel ?? fallbackRetry}
        </button>
      ) : null}
      {children ? <div className="error-state-extra">{children}</div> : null}
    </div>
  );
}
