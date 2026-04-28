/**
 * @file Admin / belépés modál – portal alapú overlay
 *
 * @description
 * A `createPortal(..., document.body)` biztosítja, hogy a modál a DOM legfelső
 * rétegén jelenjen meg. Nyitáskor `admin-modal-open` osztály a `body`-n (CSS scroll lock).
 *
 * @props
 * - `open`: láthatóság
 * - `title`: `aria-label` és fejléc szöveg
 * - `onClose`: underlay és Bezárás gomb
 * - `children`: tetszőleges tartalom (űrlap, szöveg)
 */
'use client';

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
          <button className="btn btn-secondary" type="button" onClick={onClose}>
            Bezárás
          </button>
        </div>
        <div className="admin-modal-content">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
