'use client';

import { useCallback, useEffect, useState } from 'react';
import { useApp } from '@/components/layout/AppProvider';
import { Card, SectionHeader } from '@/components/ui/Core';
import { ErrorState } from '@/components/ui/ErrorState';
import { t } from '@/lib/content';

type RetentionItem = {
  id: number;
  auditLogDays: number;
  feedbackDays: number;
  requestLogDays: number;
  updatedAt: string;
};

export default function AdminRetentionPage() {
  const { lang, isAdminRole, toast } = useApp();
  const m = t(lang).internal;
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [saving, setSaving] = useState(false);
  const [item, setItem] = useState<RetentionItem | null>(null);
  const [form, setForm] = useState({
    auditLogDays: '365',
    feedbackDays: '365',
    requestLogDays: '30',
  });

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError(false);
    try {
      const res = await fetch('/api/admin/retention', { credentials: 'include' });
      const data = (await res.json().catch(() => ({}))) as { item?: RetentionItem; error?: string };
      if (!res.ok || !data.item) {
        setLoadError(true);
        toast(data.error ?? (lang === 'hu' ? 'Retention beállítások betöltése sikertelen.' : 'Failed to load retention settings.'), 'warning');
        return;
      }
      setItem(data.item);
      setForm({
        auditLogDays: String(data.item.auditLogDays),
        feedbackDays: String(data.item.feedbackDays),
        requestLogDays: String(data.item.requestLogDays),
      });
    } catch {
      setLoadError(true);
      toast(lang === 'hu' ? 'Hálózati hiba.' : 'Network error.', 'warning');
    } finally {
      setLoading(false);
    }
  }, [lang, toast]);

  useEffect(() => {
    void load();
  }, [load]);

  async function save() {
    const payload = {
      auditLogDays: Number(form.auditLogDays),
      feedbackDays: Number(form.feedbackDays),
      requestLogDays: Number(form.requestLogDays),
    };
    if (Object.values(payload).some((v) => !Number.isInteger(v) || v <= 0)) {
      toast(lang === 'hu' ? 'Minden mező pozitív egész szám legyen.' : 'All fields must be positive integers.', 'warning');
      return;
    }
    setSaving(true);
    try {
      const res = await fetch('/api/admin/retention', {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as { item?: RetentionItem; error?: string };
      if (!res.ok || !data.item) {
        toast(data.error ?? (lang === 'hu' ? 'Mentés sikertelen.' : 'Save failed.'), 'warning');
        return;
      }
      setItem(data.item);
      toast(lang === 'hu' ? 'Retention beállítások mentve.' : 'Retention settings saved.', 'success');
    } finally {
      setSaving(false);
    }
  }

  if (!isAdminRole) {
    return (
      <div className="app-shell section">
        <SectionHeader eyebrow={m.dashboardEyebrow} title={lang === 'hu' ? 'Retention beállítások' : 'Retention settings'} text={lang === 'hu' ? 'Adatmegőrzési időtartamok admin kezelése.' : 'Admin retention policy settings.'} />
        <ErrorState
          title={lang === 'hu' ? 'Csak ADMIN számára elérhető' : 'Admin only'}
          message={lang === 'hu' ? 'Ehhez az oldalhoz ADMIN jogosultság kell.' : 'This page requires ADMIN role.'}
        />
      </div>
    );
  }

  return (
    <div className="app-shell section">
      <SectionHeader
        eyebrow={m.dashboardEyebrow}
        title={lang === 'hu' ? 'Retention beállítások' : 'Retention settings'}
        text={lang === 'hu' ? 'Napló és adatok megőrzési ideje napokban.' : 'Log and data retention windows in days.'}
      />
      {loading ? <p className="muted-text">{m.loading}</p> : null}
      {loadError ? (
        <ErrorState
          title={lang === 'hu' ? 'Betöltési hiba' : 'Load error'}
          message={lang === 'hu' ? 'A retention beállítások nem tölthetők be.' : 'Retention settings could not be loaded.'}
          onRetry={() => void load()}
          retryLabel={m.contentRetry}
        />
      ) : null}
      {!loading && !loadError ? (
        <Card strong>
          <div className="stack">
            <label>
              <div className="calculator-field-label">{lang === 'hu' ? 'Audit log retention (nap)' : 'Audit log retention (days)'}</div>
              <input className="input" inputMode="numeric" value={form.auditLogDays} onChange={(e) => setForm((p) => ({ ...p, auditLogDays: e.target.value }))} />
            </label>
            <label>
              <div className="calculator-field-label">{lang === 'hu' ? 'Feedback retention (nap)' : 'Feedback retention (days)'}</div>
              <input className="input" inputMode="numeric" value={form.feedbackDays} onChange={(e) => setForm((p) => ({ ...p, feedbackDays: e.target.value }))} />
            </label>
            <label>
              <div className="calculator-field-label">{lang === 'hu' ? 'Request log retention (nap)' : 'Request log retention (days)'}</div>
              <input className="input" inputMode="numeric" value={form.requestLogDays} onChange={(e) => setForm((p) => ({ ...p, requestLogDays: e.target.value }))} />
            </label>
            <div className="news-form-actions">
              <button type="button" className="btn btn-primary" disabled={saving} onClick={() => void save()}>
                {saving ? (lang === 'hu' ? 'Mentés…' : 'Saving...') : (lang === 'hu' ? 'Mentés' : 'Save')}
              </button>
            </div>
            {item ? (
              <p className="muted-text">
                {lang === 'hu' ? 'Utoljára frissítve:' : 'Last updated:'} {new Date(item.updatedAt).toLocaleString(lang === 'hu' ? 'hu-HU' : 'en-US')}
              </p>
            ) : null}
          </div>
        </Card>
      ) : null}
    </div>
  );
}
