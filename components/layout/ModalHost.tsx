'use client';
import { createPortal } from 'react-dom';
import { useEffect, useMemo, useState } from 'react';
import { useApp } from '@/components/layout/AppProvider';
const emptyModal = { open: false, title: '', content: '', meta: '' };
export function ModalHost() {
  const app = useApp();
  const [mounted, setMounted] = useState(false);
  const modal = useMemo(() => app?.modal ?? emptyModal, [app]);
  const closeModal = app?.closeModal ?? (() => {});
  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    if (!modal || !modal.open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal(); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [modal, closeModal]);
  if (!mounted || !modal || !modal.open) return null;
  return createPortal(
    <div className="modal-overlay" onClick={closeModal} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <div className="admin-toolbar">
          <div>
            <h2 id="modal-title" style={{ margin: '0 0 6px 0' }}>{modal.title}</h2>
            <p style={{ margin: 0, color: 'var(--muted)' }}>{modal.content}</p>
          </div>
          <button className="btn btn-secondary" onClick={closeModal}>Bezárás</button>
        </div>
        {modal.meta ? <div dangerouslySetInnerHTML={{ __html: modal.meta }} /> : null}
      </div>
    </div>,
    document.body
  );
}