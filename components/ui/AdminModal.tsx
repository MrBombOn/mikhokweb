// Magyar magyarázó megjegyzés: ez a fájl a landing oldal működésének egy különálló, később is könnyen módosítható része.
'use client';

// Egységes, újrahasználható admin modal komponens.
// Később más oldalak is ezt használhatják, csak a tartalom változik.
import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

type AdminModalProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
};

export function AdminModal({ open, title, onClose, children }: AdminModalProps) {
  useEffect(() => {
    if (!open) return;
    document.body.classList.add('admin-modal-open');
    return () => document.body.classList.remove('admin-modal-open');
  }, [open]);

  if (!open || typeof document === 'undefined') return null;

  return createPortal(
    <div className="admin-modal-portal" role="dialog" aria-modal="true" aria-label={title}>
      <div className="admin-modal-underlay" onClick={onClose} />
      <div className="admin-modal-window card" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-header">
          <h3>{title}</h3>
          <button className="btn btn-secondary" type="button" onClick={onClose}>Bezárás</button>
        </div>
        <div className="admin-modal-content">{children}</div>
      </div>
    </div>,
    document.body
  );
}
