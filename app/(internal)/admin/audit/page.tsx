/** @file Admin – audit `/admin/audit` */
'use client';

import { useEffect, useState } from 'react';
import { Card, SectionHeader } from '@/components/ui/Core';

type AuditRow = {
  id: number;
  actorName: string;
  actorRole: string;
  action: string;
  entityType: string;
  entityId: string;
  details: string;
  createdAt: string;
};

export default function AdminAuditPage() {
  const [items, setItems] = useState<AuditRow[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/audit', { credentials: 'include' })
      .then(async (r) => {
        const data = (await r.json().catch(() => ({}))) as { items?: AuditRow[]; error?: string };
        if (!r.ok) {
          setError(data.error ?? 'Betöltési hiba');
          return;
        }
        setItems(Array.isArray(data.items) ? data.items : []);
      })
      .catch(() => setError('Betöltési hiba'));
  }, []);

  return (
    <div className="app-shell section">
      <SectionHeader eyebrow="Admin" title="Audit napló" text="Érzékeny műveletek és változások visszakereshetősége." />
      <Card>
        {error ? <p style={{ color: 'var(--danger)' }}>{error}</p> : null}
        <div className="stack">
          {items.map((it) => (
            <div key={it.id} className="card" style={{ padding: 12 }}>
              <strong>{it.action}</strong>
              <p style={{ margin: '6px 0 0 0', color: 'var(--muted)' }}>
                {it.actorName} ({it.actorRole}) · {it.entityType}:{it.entityId}
              </p>
              {it.details ? <p style={{ margin: '6px 0 0 0', color: 'var(--muted)' }}>{it.details}</p> : null}
              <p style={{ margin: '6px 0 0 0', fontSize: 12, color: 'var(--muted)' }}>
                {new Date(it.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
