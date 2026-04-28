/**
 * @file Toast értesítések megjelenítése
 *
 * @description
 * Az `AppProvider` `toasts` tömbjét mapeli. Minden elem **gomb**, hogy kattintással
 * is eltávolítható legyen (`removeToast`), illetve időzítő is törli (`toast()` implementáció).
 */
'use client';

import { useApp } from '@/components/layout/AppProvider';

export function ToastViewport() {
  const { toasts, removeToast } = useApp();
  return (
    <div className="toast-stack" aria-live="polite" aria-atomic="true">
      {toasts.map((item) => (
        <button
          key={item.id}
          className={`toast toast--${item.type} animate-rise`}
          onClick={() => removeToast(item.id)}
          type="button"
          aria-label={`Close ${item.type} notification`}
        >
          <strong className="toast-label">{item.type.toUpperCase()}</strong>
          <span>{item.text}</span>
        </button>
      ))}
    </div>
  );
}
