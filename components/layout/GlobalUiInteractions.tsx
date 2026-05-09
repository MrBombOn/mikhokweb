'use client';

import { useEffect } from 'react';

function toggleExpandable(container: HTMLElement) {
  const expanded = container.getAttribute('data-expanded') === 'true';
  const next = !expanded;
  container.setAttribute('data-expanded', next ? 'true' : 'false');
  container.setAttribute('aria-expanded', next ? 'true' : 'false');

  const details = container.querySelector<HTMLElement>('[data-expand-details]');
  if (details) {
    details.hidden = !next;
  }
}

export function GlobalUiInteractions() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const container = target?.closest<HTMLElement>('[data-expandable="true"]');
      if (!container) return;
      const interactive = target?.closest('a,button,input,textarea,select,[role="button"]');
      if (interactive && interactive !== container) return;
      toggleExpandable(container);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      const target = event.target as HTMLElement | null;
      const container = target?.closest<HTMLElement>('[data-expandable="true"]');
      if (!container) return;
      event.preventDefault();
      toggleExpandable(container);
    };

    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return null;
}
