/**
 * @file Globális modál host – React portal a `document.body`-ra
 *
 * @description
 * Az `AppProvider` `modal` állapota tartalmazza a címet és a szöveges tartalmat.
 * Ez a komponens **createPortal**-lal a DOM fa legvégére rajzolja az overlay-t,
 * így nem zavarja a stacking context-et a navbar alatt.
 *
 * @akadálymentesség
 * - `role="dialog"`, `aria-modal`, `aria-labelledby` a fő címhez.
 * - Escape billentyű és overlay kattintás: bezárás.
 *
 * @scroll_lock
 * Nyitott modálnál `body { overflow: hidden }` – elkerüli a háttér görgetését.
 */
'use client';

import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import { useApp } from '@/components/layout/AppProvider';

export function ModalHost() {
  const { modal, closeModal } = useApp();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!modal) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [modal, closeModal]);

  if (!mounted || !modal) return null;

  return createPortal(
    <div className="modal-overlay" onClick={closeModal} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <div className="admin-toolbar">
          <div>
            <h2 id="modal-title" style={{ margin: '0 0 6px 0' }}>
              {modal.title}
            </h2>
            <p style={{ margin: 0, color: 'var(--muted)', whiteSpace: 'pre-wrap' }}>{modal.content}</p>
          </div>
          <button type="button" className="btn btn-secondary" onClick={closeModal}>
            Bezárás
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
