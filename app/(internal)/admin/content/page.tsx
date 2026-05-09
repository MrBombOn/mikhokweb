/** @file Admin – tartalom `/admin/content` */
'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { NewsRevisionDiffPanel } from '@/components/admin/NewsRevisionDiffPanel';
import { useApp } from '@/components/layout/AppProvider';
import { Card, SectionHeader } from '@/components/ui/Core';
import { ErrorState } from '@/components/ui/ErrorState';
import { Skeleton } from '@/components/ui/Skeleton';
import { t } from '@/lib/content';

export default function AdminContentPage() {
  const { lang } = useApp();
  const dict = t(lang);
  const m = dict.internal;
  const nav = dict.nav;
  const [counts, setCounts] = useState({ news: '-', events: '-', gallery: '-', guides: '-' });
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const loadCounts = useCallback(async () => {
    setLoading(true);
    setLoadError(false);
    Promise.all([
      fetch('/api/news', { credentials: 'include' }).then((r) => (r.ok ? r.json() : { items: [] })),
      fetch('/api/events', { credentials: 'include' }).then((r) => (r.ok ? r.json() : { items: [] })),
      fetch('/api/gallery', { credentials: 'include' }).then((r) => (r.ok ? r.json() : { items: [] })),
      fetch('/api/guides', { credentials: 'include' }).then((r) => (r.ok ? r.json() : { items: [] })),
    ])
      .then(([n, e, g, u]) =>
        setCounts({
          news: String(Array.isArray(n.items) ? n.items.length : 0),
          events: String(Array.isArray(e.items) ? e.items.length : 0),
          gallery: String(Array.isArray(g.items) ? g.items.length : 0),
          guides: String(Array.isArray(u.items) ? u.items.length : 0),
        }),
      )
      .catch(() => {
        setCounts({ news: '?', events: '?', gallery: '?', guides: '?' });
        setLoadError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    void loadCounts();
  }, [loadCounts]);

  return (
    <div className="app-shell section">
      <SectionHeader eyebrow={m.contentEyebrow} title={m.contentTitle} text={m.contentLead} />
      {loading ? <Skeleton variant="searchResults" /> : null}
      {loadError ? (
        <ErrorState title={m.contentLoadError} message={m.dbNetworkError} onRetry={() => void loadCounts()} retryLabel={m.contentRetry} />
      ) : null}
      {!loading && !loadError ? (
      <Card>
        <p className="muted-text">
          {m.contentStatNews}: {counts.news}
        </p>
        <p className="muted-text">
          {m.contentStatEvents}: {counts.events}
        </p>
        <p className="muted-text">
          {m.contentStatGallery}: {counts.gallery}
        </p>
        <p className="muted-text">
          {m.contentStatGuides}: {counts.guides}
        </p>
        <p className="muted-text admin-rbac-hint">{m.contentPublicHint}</p>
        <div className="admin-chip-row">
          <Link className="btn btn-secondary" href="/news">
            {nav.news}
          </Link>
          <Link className="btn btn-secondary" href="/calendar">
            {nav.calendar}
          </Link>
          <Link className="btn btn-secondary" href="/gallery">
            {nav.gallery}
          </Link>
          <Link className="btn btn-secondary" href="/guides">
            {nav.guides}
          </Link>
        </div>
      </Card>
      ) : null}
      {!loading && !loadError ? <NewsRevisionDiffPanel /> : null}
    </div>
  );
}
