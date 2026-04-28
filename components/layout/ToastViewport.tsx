'use client';
import { useApp } from '@/components/layout/AppProvider';
export function ToastViewport() {
  const { toasts, removeToast } = useApp();
  return <div className="toast-stack">{toasts.map((item) => <button key={item.id} className="toast animate-rise" onClick={() => removeToast(item.id)}><strong style={{ display: 'block', marginBottom: 6 }}>{item.type.toUpperCase()}</strong><span>{item.text}</span></button>)}</div>;
}