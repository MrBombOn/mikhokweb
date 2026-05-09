/** @file Mentett tábla nézetek – közös eszköztár admin oldalakhoz (P7 + P8 UX). */
'use client';

import { useCallback, useEffect, useState } from 'react';
import { useApp } from '@/components/layout/AppProvider';
import { t } from '@/lib/content';

export type SavedViewModule = 'audit' | 'users' | 'categories';

type SavedRow = {
  id: string;
  name: string;
  payload: Record<string, unknown>;
};

export function AdminSavedViewsToolbar({
  module,
  payload,
  onApply,
  disabled,
}: {
  module: SavedViewModule;
  payload: Record<string, unknown>;
  onApply: (p: Record<string, unknown>) => void;
  disabled?: boolean;
}) {
  const { lang, toast } = useApp();
  const m = t(lang).internal;
  const [items, setItems] = useState<SavedRow[]>([]);
  const [selectedId, setSelectedId] = useState('');
  const [saveName, setSaveName] = useState('');
  const [loading, setLoading] = useState(false);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      const r = await fetch(`/api/admin/saved-views?module=${encodeURIComponent(module)}`, { credentials: 'include' });
      const data = (await r.json().catch(() => ({}))) as { items?: SavedRow[] };
      if (!r.ok) {
        setItems([]);
        return;
      }
      setItems(Array.isArray(data.items) ? data.items : []);
    } finally {
      setLoading(false);
    }
  }, [module]);

  useEffect(() => {
    void reload();
  }, [reload]);

  function applyPayload(p: Record<string, unknown>) {
    onApply(p);
    toast(m.savedViewsAppliedToast, 'success');
  }

  async function saveCurrent() {
    const name = saveName.trim();
    if (!name) {
      toast(m.savedViewsNameRequired, 'warning');
      return;
    }
    const r = await fetch('/api/admin/saved-views', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ module, name, payload }),
    });
    const data = (await r.json().catch(() => ({}))) as { error?: string };
    if (!r.ok) {
      toast(data.error ?? m.savedViewsSaveError, 'warning');
      return;
    }
    setSaveName('');
    toast(m.savedViewsSavedToast, 'success');
    await reload();
  }

  async function deleteSelected() {
    if (!selectedId) return;
    const r = await fetch(`/api/admin/saved-views/${encodeURIComponent(selectedId)}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    const data = (await r.json().catch(() => ({}))) as { error?: string };
    if (!r.ok) {
      toast(data.error ?? m.savedViewsDeleteError, 'warning');
      return;
    }
    setSelectedId('');
    toast(m.savedViewsDeletedToast, 'success');
    await reload();
  }

  return (
    <div className="admin-saved-views-toolbar" aria-busy={loading}>
      <span className="muted-text">{m.savedViewsLabel}</span>
      <select
        className="select"
        value={selectedId}
        onChange={(e) => {
          const id = e.target.value;
          setSelectedId(id);
          const row = items.find((i) => i.id === id);
          if (row?.payload && typeof row.payload === 'object') {
            applyPayload(row.payload as Record<string, unknown>);
          }
        }}
        aria-label={m.savedViewsSelectAria}
        disabled={disabled || loading}
      >
        <option value="">{m.savedViewsSelectPlaceholder}</option>
        {items.map((it) => (
          <option key={it.id} value={it.id}>
            {it.name}
          </option>
        ))}
      </select>
      <button type="button" className="btn btn-secondary" disabled={disabled || !selectedId} onClick={() => void deleteSelected()}>
        {m.savedViewsDelete}
      </button>
      <input
        className="input"
        value={saveName}
        onChange={(e) => setSaveName(e.target.value)}
        placeholder={m.savedViewsNamePlaceholder}
        aria-label={m.savedViewsNamePlaceholder}
        disabled={disabled}
        maxLength={80}
      />
      <button type="button" className="btn btn-primary" disabled={disabled} onClick={() => void saveCurrent()}>
        {m.savedViewsSave}
      </button>
      {items.length ? (
        <div className="admin-saved-views-chips" aria-label={m.savedViewsQuickLabel}>
          <span className="muted-text admin-saved-views-toolbar-hint">
            {m.savedViewsQuickLabel}
          </span>
          {items.slice(0, 6).map((it) => (
            <button
              key={it.id}
              type="button"
              className="admin-saved-views-chip"
              disabled={disabled}
              onClick={() => {
                setSelectedId(it.id);
                if (it.payload && typeof it.payload === 'object') {
                  applyPayload(it.payload as Record<string, unknown>);
                }
              }}
            >
              {it.name}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
