'use client';

import { type RefObject, useEffect, useLayoutEffect } from 'react';
import { collectFocusables } from '@/lib/a11y/focusables';

/**
 * Nyitott modálban Tab a panelen belül marad; bezáráskor visszaáll az előző fókusz.
 * Az Escape kezelése a hívó komponens feladata (pl. `AdminModal`).
 */
export function useModalFocusTrap(containerRef: RefObject<HTMLElement | null>, open: boolean) {
  useLayoutEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    return () => {
      if (prev && typeof prev.focus === 'function') {
        prev.focus();
      }
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const container = containerRef.current;
    if (!container) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const focusables = collectFocusables(container);
      if (focusables.length === 0) {
        e.preventDefault();
        return;
      }
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const activeEl = document.activeElement as HTMLElement | null;

      if (!activeEl || !container.contains(activeEl)) {
        e.preventDefault();
        first.focus();
        return;
      }

      if (focusables.length === 1) {
        e.preventDefault();
        return;
      }

      const onFirst = activeEl === first || first.contains(activeEl);
      const onLast = activeEl === last || last.contains(activeEl);

      if (e.shiftKey) {
        if (onFirst) {
          e.preventDefault();
          last.focus();
        }
      } else if (onLast) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown, true);

    const rafId = requestAnimationFrame(() => {
      const els = collectFocusables(container);
      if (els.length > 0) {
        els[0].focus();
      } else {
        container.setAttribute('tabindex', '-1');
        container.focus();
      }
    });

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('keydown', onKeyDown, true);
      if (container.getAttribute('tabindex') === '-1') {
        container.removeAttribute('tabindex');
      }
    };
  }, [open, containerRef]);
}
