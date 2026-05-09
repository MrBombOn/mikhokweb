/**
 * @file Admin / belépés modál – portal alapú overlay
 *
 * @description
 * A `createPortal(..., document.body)` biztosítja, hogy a modál a DOM legfelső
 * rétegén jelenjen meg. Nyitáskor `admin-modal-open` osztály a `body`-n és `html`-en (CSS scroll lock).
 *
 * @props
 * - `open`: láthatóság
 * - `title`: fejléc + `aria-labelledby` a címsorra
 * - `onClose`: underlay és Bezárás gomb
 * - `children`: tetszőleges tartalom (űrlap, szöveg)
 */
'use client';

import { ReactNode, useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useApp } from '@/components/layout/AppProvider';
import { useModalFocusTrap } from '@/lib/a11y/use-modal-focus-trap';
import { t } from '@/lib/content';

type AdminModalProps = {
  open: boolean;
  title: string;
  closeLabel?: string;
  onClose: () => void;
  children: ReactNode;
  disableAnimation?: boolean;
  /** Rövid űrlap (pl. login): ne legyen belső görgető a modál dobozon (`max-height` + `overflow:auto` artefakt). */
  noWindowScroll?: boolean;
};

export function AdminModal({
  open,
  title,
  closeLabel: closeLabelProp,
  onClose,
  children,
  disableAnimation = false,
  noWindowScroll = false,
}: AdminModalProps) {
  const { lang } = useApp();
  const closeLabel = closeLabelProp ?? t(lang).common.modalClose;
  const titleId = useId();
  const windowRef = useRef<HTMLDivElement>(null);
  useModalFocusTrap(windowRef, open);

  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    document.body.classList.add('admin-modal-open');
    html.classList.add('admin-modal-open');
    return () => {
      document.body.classList.remove('admin-modal-open');
      html.classList.remove('admin-modal-open');
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open || typeof document === 'undefined') return null;

  return createPortal(
    <div className="admin-modal-portal" role="dialog" aria-modal="true" aria-labelledby={titleId}>
      <div className="admin-modal-underlay" onClick={onClose} />
      <div
        ref={windowRef}
        className={[
          'admin-modal-window',
          'card',
          disableAnimation ? 'admin-modal-window--no-anim' : '',
          noWindowScroll ? 'admin-modal-window--no-window-scroll' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="admin-modal-header">
          <h3 id={titleId}>{title}</h3>
          <button className="btn btn-secondary" type="button" onClick={onClose}>
            {closeLabel}
          </button>
        </div>
        <div className="admin-modal-content">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
