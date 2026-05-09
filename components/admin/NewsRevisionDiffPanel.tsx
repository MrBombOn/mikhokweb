/** @file Hír revíziók mező-diff a tartalom admin oldalon (P8). */
'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useApp } from '@/components/layout/AppProvider';
import { Card } from '@/components/ui/Core';
import { t } from '@/lib/content';
import { diffRevisionPayloads } from '@/lib/news/revision-diff';

type NewsListItem = { id: number; titleHu: string; titleEn: string };

type RevItem = {
  id: number;
  createdAt: string;
  payload: Record<string, unknown>;
};

export function NewsRevisionDiffPanel() {
  const { lang, toast } = useApp();
  const m = t(lang).internal;
  const [newsItems, setNewsItems] = useState<NewsListItem[]>([]);
  const [newsId, setNewsId] = useState<number | ''>('');
  const [revisions, setRevisions] = useState<RevItem[]>([]);
  const [leftId, setLeftId] = useState<number | ''>('');
  const [rightId, setRightId] = useState<number | ''>('');
  const [busy, setBusy] = useState(false);

  const loadNews = useCallback(async () => {
    const r = await fetch('/api/news', { credentials: 'include' });
    const data = (await r.json().catch(() => ({}))) as { items?: NewsListItem[] };
    if (!r.ok) {
      setNewsItems([]);
      toast(m.contentLoadError, 'warning');
      return;
    }
    setNewsItems(Array.isArray(data.items) ? data.items : []);
  }, [m.contentLoadError, toast]);

  useEffect(() => {
    void loadNews();
  }, [loadNews]);

  const loadRevisions = useCallback(async () => {
    if (newsId === '') return;
    setBusy(true);
    try {
      const r = await fetch(`/api/admin/news/${newsId}/revisions`, { credentials: 'include' });
      const data = (await r.json().catch(() => ({}))) as { items?: RevItem[]; error?: string };
      if (!r.ok) {
        setRevisions([]);
        toast(data.error ?? m.contentLoadError, 'warning');
        return;
      }
      const items = Array.isArray(data.items) ? data.items : [];
      setRevisions(items);
      if (items.length >= 2) {
        setLeftId(items[1]!.id);
        setRightId(items[0]!.id);
      } else {
        setLeftId('');
        setRightId('');
      }
    } finally {
      setBusy(false);
    }
  }, [m.contentLoadError, newsId, toast]);

  useEffect(() => {
    if (newsId === '') {
      setRevisions([]);
      setLeftId('');
      setRightId('');
      return;
    }
    void loadRevisions();
  }, [newsId, loadRevisions]);

  const leftPayload = revisions.find((r) => r.id === leftId)?.payload;
  const rightPayload = revisions.find((r) => r.id === rightId)?.payload;

  const rows = useMemo(() => diffRevisionPayloads(leftPayload, rightPayload), [leftPayload, rightPayload]);

  return (
    <Card>
      <h3 className="admin-card-title">{m.contentDiffTitle}</h3>
      <p className="admin-card-meta-sm">{m.contentDiffLead}</p>
      <div className="admin-toolbar">
        <label className="admin-form-row admin-form-row--column-stretch">
          <span className="muted-text">{m.contentDiffSelectNews}</span>
          <select
            className="select"
            value={newsId === '' ? '' : String(newsId)}
            onChange={(e) => setNewsId(e.target.value ? Number(e.target.value) : '')}
            aria-label={m.contentDiffSelectNews}
          >
            <option value="">—</option>
            {newsItems.map((n) => (
              <option key={n.id} value={n.id}>
                #{n.id} · {lang === 'hu' ? n.titleHu : n.titleEn}
              </option>
            ))}
          </select>
        </label>
        <label className="admin-form-row admin-form-row--column-stretch">
          <span className="muted-text">{m.contentDiffSelectLeft}</span>
          <select
            className="select"
            value={leftId === '' ? '' : String(leftId)}
            onChange={(e) => setLeftId(e.target.value ? Number(e.target.value) : '')}
            disabled={revisions.length < 2}
            aria-label={m.contentDiffSelectLeft}
          >
            <option value="">—</option>
            {revisions.map((r) => (
              <option key={r.id} value={r.id}>
                #{r.id} · {new Date(r.createdAt).toLocaleString(lang === 'hu' ? 'hu-HU' : 'en-US')}
              </option>
            ))}
          </select>
        </label>
        <label className="admin-form-row admin-form-row--column-stretch">
          <span className="muted-text">{m.contentDiffSelectRight}</span>
          <select
            className="select"
            value={rightId === '' ? '' : String(rightId)}
            onChange={(e) => setRightId(e.target.value ? Number(e.target.value) : '')}
            disabled={revisions.length < 2}
            aria-label={m.contentDiffSelectRight}
          >
            <option value="">—</option>
            {revisions.map((r) => (
              <option key={r.id} value={r.id}>
                #{r.id} · {new Date(r.createdAt).toLocaleString(lang === 'hu' ? 'hu-HU' : 'en-US')}
              </option>
            ))}
          </select>
        </label>
      </div>
      {busy ? <p className="muted-text">{m.loading}</p> : null}
      {!busy && newsId !== '' && revisions.length < 2 ? <p className="muted-text">{m.contentDiffNoRevisions}</p> : null}
      {!busy && leftId !== '' && rightId !== '' && leftId !== rightId ? (
        <div className="admin-table-wrap admin-revision-diff-table">
          <table className="admin-table">
            <thead>
              <tr>
                <th>{m.contentDiffKey}</th>
                <th>{m.contentDiffBefore}</th>
                <th>{m.contentDiffAfter}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.key} className={row.changed ? 'admin-revision-diff-row-changed' : undefined}>
                  <td>
                    <code>{row.key}</code>
                  </td>
                  <td className="admin-table-cell-muted">{row.before || '—'}</td>
                  <td className="admin-table-cell-muted">{row.after || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </Card>
  );
}
