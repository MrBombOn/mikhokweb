/** @file Admin – kategóriák `/admin/categories` */
'use client';

import { useEffect, useState } from 'react';
import { Card, SectionHeader } from '@/components/ui/Core';

type CategoryRow = {
  id: number;
  scope: 'news' | 'events' | 'gallery' | 'guides' | 'office';
  nameHu: string;
  nameEn: string;
  sortOrder: number;
  status: 'draft' | 'scheduled' | 'published' | 'archived' | 'deleted';
};

export default function AdminCategoriesPage() {
  const [items, setItems] = useState<CategoryRow[]>([]);
  const [scope, setScope] = useState<CategoryRow['scope']>('news');
  const [nameHu, setNameHu] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [error, setError] = useState('');

  async function reload() {
    const r = await fetch('/api/categories', { credentials: 'include' });
    const data = (await r.json().catch(() => ({}))) as { items?: CategoryRow[]; error?: string };
    if (!r.ok) {
      setError(data.error ?? 'Betöltési hiba');
      return;
    }
    setItems(Array.isArray(data.items) ? data.items : []);
    setError('');
  }

  useEffect(() => {
    void reload();
  }, []);

  async function createCategory() {
    const r = await fetch('/api/categories', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scope, nameHu, nameEn, status: 'published' }),
    });
    const data = (await r.json().catch(() => ({}))) as { error?: string };
    if (!r.ok) {
      setError(data.error ?? 'Mentési hiba');
      return;
    }
    setNameHu('');
    setNameEn('');
    setError('');
    await reload();
  }

  return (
    <div className="app-shell section">
      <SectionHeader eyebrow="Admin" title="Kategóriák" text="Kategóriatípusok modulonként." />
      <Card>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <select className="input" aria-label="Kategória scope" value={scope} onChange={(e) => setScope(e.target.value as CategoryRow['scope'])}>
            <option value="news">news</option>
            <option value="events">events</option>
            <option value="gallery">gallery</option>
            <option value="guides">guides</option>
            <option value="office">office</option>
          </select>
          <input className="input" aria-label="Kategória név magyarul" placeholder="Név (HU)" value={nameHu} onChange={(e) => setNameHu(e.target.value)} />
          <input className="input" aria-label="Category name in English" placeholder="Name (EN)" value={nameEn} onChange={(e) => setNameEn(e.target.value)} />
          <button type="button" className="btn btn-primary" onClick={() => void createCategory()}>Létrehozás</button>
        </div>
        {error ? <p role="alert" style={{ color: 'var(--danger)', marginTop: 12 }}>{error}</p> : null}
      </Card>
      <div className="grid-2" style={{ marginTop: 14 }}>
        {items.map((it) => (
          <Card key={it.id}>
            <h3 style={{ margin: '0 0 8px 0' }}>{it.nameHu}</h3>
            <p style={{ color: 'var(--muted)', margin: 0 }}>{it.nameEn}</p>
            <p style={{ color: 'var(--muted)', margin: '6px 0 0 0', fontSize: 13 }}>
              {it.scope} · {it.status}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
