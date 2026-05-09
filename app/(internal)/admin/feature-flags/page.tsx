'use client';

import { useCallback, useEffect, useState } from 'react';
import { useApp } from '@/components/layout/AppProvider';
import { Card, SectionHeader } from '@/components/ui/Core';
import { ErrorState } from '@/components/ui/ErrorState';
import { Skeleton } from '@/components/ui/Skeleton';
import { t } from '@/lib/content';

type FlagItem = {
  key: string;
  title: string;
  description: string;
  envVar: string;
  defaultValue: boolean;
  enabled: boolean;
  rolloutPercent?: number;
  source: string;
};

export default function AdminFeatureFlagsPage() {
  const { lang, isAdminRole, toast } = useApp();
  const m = t(lang).internal;
  const [items, setItems] = useState<FlagItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [rolloutDraft, setRolloutDraft] = useState<Record<string, number>>({});

  const loadFlags = useCallback(async () => {
    setLoading(true);
    setLoadError(false);
    try {
      const res = await fetch('/api/admin/feature-flags', { credentials: 'include' });
      const data = (await res.json().catch(() => ({}))) as { items?: FlagItem[]; error?: string };
      if (!res.ok) {
        setLoadError(true);
        toast(data.error ?? m.featureFlagsLoadError, 'warning');
        return;
      }
      setItems(Array.isArray(data.items) ? data.items : []);
      setRolloutDraft(
        Object.fromEntries(
          (Array.isArray(data.items) ? data.items : []).map((item) => [item.key, Number(item.rolloutPercent ?? 100)]),
        ),
      );
    } catch {
      setLoadError(true);
      toast(m.featureFlagsLoadError, 'warning');
    } finally {
      setLoading(false);
    }
  }, [m.featureFlagsLoadError, toast]);

  useEffect(() => {
    void loadFlags();
  }, [loadFlags]);

  async function toggleFlag(item: FlagItem) {
    setSavingKey(item.key);
    try {
      const res = await fetch('/api/admin/feature-flags', {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: item.key, enabled: !item.enabled }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        toast(data.error ?? m.featureFlagsSaveError, 'warning');
        return;
      }
      await loadFlags();
      toast(m.featureFlagsSaved, 'success');
    } catch {
      toast(m.featureFlagsSaveError, 'warning');
    } finally {
      setSavingKey(null);
    }
  }

  async function saveRollout(item: FlagItem) {
    const value = Number(rolloutDraft[item.key] ?? item.rolloutPercent ?? 100);
    setSavingKey(item.key);
    try {
      const res = await fetch('/api/admin/feature-flags', {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: item.key, rolloutPercent: value }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        toast(data.error ?? m.featureFlagsSaveError, 'warning');
        return;
      }
      await loadFlags();
      toast(m.featureFlagsSaved, 'success');
    } catch {
      toast(m.featureFlagsSaveError, 'warning');
    } finally {
      setSavingKey(null);
    }
  }

  if (!isAdminRole) {
    return (
      <div className="app-shell section">
        <SectionHeader eyebrow={m.dashboardEyebrow} title={m.featureFlagsTitle} text={m.featureFlagsLead} />
        <ErrorState title={m.featureFlagsAdminOnlyTitle} message={m.featureFlagsAdminOnlyMessage} />
      </div>
    );
  }

  return (
    <div className="app-shell section">
      <SectionHeader eyebrow={m.dashboardEyebrow} title={m.featureFlagsTitle} text={m.featureFlagsLead} />
      {loading ? <Skeleton variant="searchResults" /> : null}
      {loadError ? <ErrorState title={m.featureFlagsLoadError} message={m.dbNetworkError} onRetry={() => void loadFlags()} retryLabel={m.contentRetry} /> : null}
      {!loading && !loadError ? (
        <div className="stack">
          {items.map((item) => (
            <Card key={item.key} strong>
              <h3>{item.title}</h3>
              <p className="muted-text">{item.description}</p>
              <p className="muted-text">
                <code>{item.envVar}</code> · {m.featureFlagsDefault}: {String(item.defaultValue)} · {m.featureFlagsSource}: {item.source}
              </p>
              <div className="admin-chip-row">
                <span className="badge">{item.enabled ? m.featureFlagsEnabled : m.featureFlagsDisabled}</span>
                <button type="button" className="btn btn-secondary" disabled={savingKey === item.key} onClick={() => void toggleFlag(item)}>
                  {item.enabled ? m.featureFlagsDisable : m.featureFlagsEnable}
                </button>
                <label className="muted-text" htmlFor={`rollout-${item.key}`}>
                  {m.featureFlagsRollout}
                </label>
                <input
                  id={`rollout-${item.key}`}
                  type="number"
                  min={0}
                  max={100}
                  step={1}
                  value={Number(rolloutDraft[item.key] ?? item.rolloutPercent ?? 100)}
                  onChange={(e) =>
                    setRolloutDraft((prev) => ({
                      ...prev,
                      [item.key]: Math.max(0, Math.min(100, Number(e.target.value || 0))),
                    }))
                  }
                />
                <button type="button" className="btn btn-ghost" disabled={savingKey === item.key} onClick={() => void saveRollout(item)}>
                  {m.featureFlagsSaveRollout}
                </button>
              </div>
            </Card>
          ))}
          {items.length === 0 ? <p className="muted-text">{m.featureFlagsEmpty}</p> : null}
        </div>
      ) : null}
    </div>
  );
}
