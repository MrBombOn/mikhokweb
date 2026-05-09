'use client';

import { useCallback, useEffect, useState } from 'react';
import { useApp } from '@/components/layout/AppProvider';
import { Card, SectionHeader } from '@/components/ui/Core';
import { ErrorState } from '@/components/ui/ErrorState';
import { t } from '@/lib/content';

type QueryRow = { query: string; searchCount: number; zeroResultCount: number; day: string };

export default function AdminSearchAnalyticsPage() {
  const { lang, toast } = useApp();
  const m = t(lang).internal;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [top, setTop] = useState<QueryRow[]>([]);
  const [zeros, setZeros] = useState<QueryRow[]>([]);

  const load = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch('/api/admin/search-analytics?days=14', { credentials: 'include' });
      const data = (await res.json().catch(() => ({}))) as {
        topQueries?: QueryRow[];
        zeroResultQueries?: QueryRow[];
        error?: string;
      };
      if (!res.ok) {
        setError(true);
        toast(data.error ?? m.searchAnalyticsLoadError, 'warning');
        return;
      }
      setTop(Array.isArray(data.topQueries) ? data.topQueries : []);
      setZeros(Array.isArray(data.zeroResultQueries) ? data.zeroResultQueries : []);
    } catch {
      setError(true);
      toast(m.searchAnalyticsLoadError, 'warning');
    } finally {
      setLoading(false);
    }
  }, [toast, m.searchAnalyticsLoadError]);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <div className="app-shell section">
      <SectionHeader eyebrow={m.searchAnalyticsEyebrow} title={m.searchAnalyticsTitle} text={m.searchAnalyticsLead} />

      {loading ? <p className="muted-text">{m.loading}</p> : null}
      {!loading && error ? (
        <ErrorState title={m.searchAnalyticsLoadError} message={m.searchAnalyticsLead} onRetry={() => void load()} retryLabel={m.contentRetry} />
      ) : null}

      {!loading && !error && !top.length && !zeros.length ? <p className="muted-text">{m.searchAnalyticsEmpty}</p> : null}

      {!loading && !error && !!top.length ? (
        <Card>
          <h3>{m.searchAnalyticsTopTitle}</h3>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>{m.searchAnalyticsColQuery}</th>
                  <th>{m.searchAnalyticsColSearches}</th>
                  <th>{m.searchAnalyticsColZero}</th>
                  <th>{m.searchAnalyticsColDay}</th>
                </tr>
              </thead>
              <tbody>
                {top.map((row) => (
                  <tr key={`${row.day}-${row.query}-top`}>
                    <td>{row.query}</td>
                    <td>{row.searchCount}</td>
                    <td>{row.zeroResultCount}</td>
                    <td>{row.day}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ) : null}

      {!loading && !error && !!zeros.length ? (
        <Card>
          <h3>{m.searchAnalyticsZeroTitle}</h3>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>{m.searchAnalyticsColQuery}</th>
                  <th>{m.searchAnalyticsColZero}</th>
                  <th>{m.searchAnalyticsColSearches}</th>
                  <th>{m.searchAnalyticsColDay}</th>
                </tr>
              </thead>
              <tbody>
                {zeros.map((row) => (
                  <tr key={`${row.day}-${row.query}-zero`}>
                    <td>{row.query}</td>
                    <td>{row.zeroResultCount}</td>
                    <td>{row.searchCount}</td>
                    <td>{row.day}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ) : null}
    </div>
  );
}
