/**
 * @file Toast értesítések megjelenítése
 */
'use client';

import { useApp } from '@/components/layout/AppProvider';
import { t } from '@/lib/content';

export function ToastViewport() {
  const { toasts, removeToast, lang } = useApp();
  const dismissAria = t(lang).common.toastDismissAria;

  return (
    <div className="toast-stack" aria-live="polite" aria-atomic="true">
      {toasts.map((item) => (
        <button
          key={item.id}
          className={`toast toast--${item.type} animate-rise`}
          onClick={() => removeToast(item.id)}
          type="button"
          aria-label={dismissAria}
        >
          <strong className="toast-label">{item.type.toUpperCase()}</strong>
          <span>{item.text}</span>
        </button>
      ))}
    </div>
  );
}
