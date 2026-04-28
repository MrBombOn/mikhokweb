/**
 * @file Hiba + opcionális újrapróbálás (D3)
 */
'use client';

import type { ReactNode } from 'react';

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
  return (
    <div className="card error-state" role="alert">
      {title ? <h2 className="error-state-title">{title}</h2> : null}
      <p className="error-state-message">{message}</p>
      {onRetry ? (
        <button type="button" className="btn btn-primary error-state-retry" onClick={onRetry}>
          {retryLabel ?? 'Újra'}
        </button>
      ) : null}
      {children ? <div className="error-state-extra">{children}</div> : null}
    </div>
  );
}
