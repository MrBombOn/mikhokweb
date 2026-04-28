/**
 * @file Admin irányítópult – `/admin`
 */
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Card, SectionHeader } from '@/components/ui/Core';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ users: '-', categories: '-', audits: '-' });

  useEffect(() => {
    let mounted = true;
    Promise.all([
      fetch('/api/users', { credentials: 'include' }).then((r) => (r.ok ? r.json() : { items: [] })),
      fetch('/api/categories', { credentials: 'include' }).then((r) => (r.ok ? r.json() : { items: [] })),
      fetch('/api/audit', { credentials: 'include' }).then((r) => (r.ok ? r.json() : { items: [] })),
    ])
      .then(([u, c, a]) => {
        if (!mounted) return;
        setStats({
          users: String(Array.isArray(u.items) ? u.items.length : 0),
          categories: String(Array.isArray(c.items) ? c.items.length : 0),
          audits: String(Array.isArray(a.items) ? a.items.length : 0),
        });
      })
      .catch(() => {
        if (!mounted) return;
        setStats({ users: '?', categories: '?', audits: '?' });
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="app-shell section">
      <SectionHeader eyebrow="Admin" title="Admin irányítópult" text="Felhasználók, kategóriák, tartalom és audit kezelése a specifikáció szerint." />
      <div className="grid-2">
        <Card strong>
          <h3>Áttekintés</h3>
          <p style={{ color: 'var(--muted)' }}>Felhasználók: {stats.users}</p>
          <p style={{ color: 'var(--muted)' }}>Kategóriák: {stats.categories}</p>
          <p style={{ color: 'var(--muted)' }}>Audit események: {stats.audits}</p>
        </Card>
        <Card>
          <h3>Gyorsműveletek</h3>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 10 }}>
            <Link href="/admin/users" className="btn btn-primary">Felhasználók</Link>
            <Link href="/admin/categories" className="btn btn-secondary">Kategóriák</Link>
            <Link href="/admin/content" className="btn btn-secondary">Tartalom</Link>
            <Link href="/admin/audit" className="btn btn-ghost">Audit</Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
