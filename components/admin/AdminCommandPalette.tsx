/** @file Gyors műveletek parancspaletta (P8) – Ctrl+K / ⌘K. */
'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/components/layout/AppProvider';
import { ADMIN_QUICK_LINKS } from '@/lib/admin/quick-links';
import { t } from '@/lib/content';

export function AdminCommandPalette() {
  const router = useRouter();
  const { lang, isAdminRole } = useApp();
  const m = t(lang).internal;
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);

  const links = useMemo(
    () => ADMIN_QUICK_LINKS.filter((l) => !l.adminOnly || isAdminRole),
    [isAdminRole],
  );

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return links;
    return links.filter((l) => {
      const hu = l.labelHu.toLowerCase();
      const en = l.labelEn.toLowerCase();
      const href = l.href.toLowerCase();
      return hu.includes(s) || en.includes(s) || href.includes(s);
    });
  }, [links, q]);

  useEffect(() => {
    setActive(0);
  }, [q, open]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
        setQ('');
      }
      if (!open) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        setOpen(false);
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActive((i) => Math.min(filtered.length - 1, i + 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActive((i) => Math.max(0, i - 1));
      }
      if (e.key === 'Enter' && filtered[active]) {
        e.preventDefault();
        router.push(filtered[active]!.href);
        setOpen(false);
        setQ('');
      }
    },
    [active, filtered, open, router],
  );

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  if (!open) return null;

  return (
    <div className="admin-palette-backdrop" role="presentation" onMouseDown={() => setOpen(false)}>
      <div
        className="admin-palette-dialog card"
        role="dialog"
        aria-modal="true"
        aria-label={m.commandPaletteTitle}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="admin-palette-title">{m.commandPaletteTitle}</div>
        <input
          className="input admin-palette-input"
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={m.commandPalettePlaceholder}
          aria-label={m.commandPalettePlaceholder}
        />
        <div className="admin-palette-hint muted-text">{m.commandPaletteHintKbd}</div>
        <ul className="admin-palette-list" role="listbox">
          {filtered.length ? (
            filtered.map((item, idx) => (
              <li key={item.href}>
                <button
                  type="button"
                  role="option"
                  aria-selected={idx === active}
                  className={`admin-palette-item${idx === active ? ' admin-palette-item--active' : ''}`}
                  onMouseEnter={() => setActive(idx)}
                  onClick={() => {
                    router.push(item.href);
                    setOpen(false);
                    setQ('');
                  }}
                >
                  <span>{lang === 'hu' ? item.labelHu : item.labelEn}</span>
                  <code className="admin-palette-href">{item.href}</code>
                </button>
              </li>
            ))
          ) : (
            <li className="muted-text admin-palette-empty">{m.commandPaletteEmpty}</li>
          )}
        </ul>
      </div>
    </div>
  );
}
