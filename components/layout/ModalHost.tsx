/**
 * @file Globális modál host – ugyanaz a vizuális nyelv, mint az `AdminModal`
 *
 * @description
 * - **Tartalom modál:** `openModal(title, content)` – `admin-modal-*` osztályok, portál.
 * - **Megerősítés:** `requestConfirm()` – natív `window.confirm` helyett, gombokkal.
 * - **Scroll lock:** `admin-modal-open` az `html` / `body` elemen (mint `AdminModal`).
 *
 * @akadálymentesség
 * `role="dialog"` / `alertdialog`, `aria-labelledby`, `aria-describedby`.
 */
'use client';

import { createPortal } from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import { useApp } from '@/components/layout/AppProvider';
import { useModalFocusTrap } from '@/lib/a11y/use-modal-focus-trap';
import { t } from '@/lib/content';

export function ModalHost() {
  const { modal, closeModal, confirmDialog, resolveConfirm, lang } = useApp();
  const dict = t(lang);
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  useModalFocusTrap(panelRef, !!(modal || confirmDialog));

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!modal && !confirmDialog) return;
    const html = document.documentElement;
    document.body.classList.add('admin-modal-open');
    html.classList.add('admin-modal-open');
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (confirmDialog) resolveConfirm(false);
      else closeModal();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('admin-modal-open');
      html.classList.remove('admin-modal-open');
      window.removeEventListener('keydown', onKey);
    };
  }, [modal, confirmDialog, closeModal, resolveConfirm]);

  if (!mounted || typeof document === 'undefined') return null;
  if (!modal && !confirmDialog) return null;

  return createPortal(
    <>
      {modal ? (
        <div
          className="admin-modal-portal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-host-title"
        >
          <div className="admin-modal-underlay" onClick={closeModal} aria-hidden />
          <div ref={confirmDialog ? undefined : panelRef} className="admin-modal-window card" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3 id="modal-host-title">{modal.title}</h3>
              <button type="button" className="btn btn-secondary" onClick={closeModal}>
                {dict.common.modalClose}
              </button>
            </div>
            <div className="admin-modal-content">
              <div className="modal-content-html" dangerouslySetInnerHTML={{ __html: modal.content }} />
            </div>
          </div>
        </div>
      ) : null}

      {confirmDialog ? (
        <div
          className="admin-modal-portal admin-modal-portal--layer-top"
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="confirm-dialog-title"
          aria-describedby="confirm-dialog-desc"
        >
          <div className="admin-modal-underlay" onClick={() => resolveConfirm(false)} aria-hidden />
          <div
            ref={panelRef}
            className="admin-modal-window card admin-modal-window--confirm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-modal-header">
              <h3 id="confirm-dialog-title">
                {confirmDialog.title ?? dict.common.confirmDialogTitle}
              </h3>
            </div>
            <div className="admin-modal-content">
              <p id="confirm-dialog-desc" className="modal-content-text">
                {confirmDialog.message}
              </p>
            </div>
            <div className="admin-modal-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => resolveConfirm(false)}
              >
                {confirmDialog.cancelLabel ?? dict.common.cancel}
              </button>
              <button
                type="button"
                className={confirmDialog.destructive ? 'btn btn-destructive' : 'btn btn-primary'}
                onClick={() => resolveConfirm(true)}
              >
                {confirmDialog.confirmLabel ?? dict.common.confirmYes}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>,
    document.body,
  );
}
