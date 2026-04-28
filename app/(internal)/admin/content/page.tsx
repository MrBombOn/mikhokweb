/** @file Admin – tartalom `/admin/content` */
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Card, SectionHeader } from '@/components/ui/Core';

export default function AdminContentPage() {
  const [counts, setCounts] = useState({ news: '-', events: '-', gallery: '-', guides: '-' });

  useEffect(() => {
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
      .catch(() => setCounts({ news: '?', events: '?', gallery: '?', guides: '?' }));
  }, []);

  return (
    <div className="app-shell section">
      <SectionHeader eyebrow="Admin" title="Tartalomkezelés" text="Központi tartalomáttekintés és moderálás." />
      <Card>
        <p style={{ color: 'var(--muted)' }}>Hírek: {counts.news}</p>
        <p style={{ color: 'var(--muted)' }}>Események: {counts.events}</p>
        <p style={{ color: 'var(--muted)' }}>Galéria elemek: {counts.gallery}</p>
        <p style={{ color: 'var(--muted)' }}>Útmutatók: {counts.guides}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 10 }}>
          <Link className="btn btn-secondary" href="/news">/news</Link>
          <Link className="btn btn-secondary" href="/calendar">/calendar</Link>
          <Link className="btn btn-secondary" href="/gallery">/gallery</Link>
          <Link className="btn btn-secondary" href="/guides">/guides</Link>
        </div>
      </Card>
    </div>
  );
}
