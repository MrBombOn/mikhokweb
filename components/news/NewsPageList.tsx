'use client';

import { useEffect, useState } from 'react';
import type { NewsItem } from '@/types/news';

async function fetchPublishedNews(): Promise<NewsItem[]> {
  const r = await fetch('/api/news', { credentials: 'include' });
  if (!r.ok) return [];
  const data = (await r.json()) as { items?: NewsItem[] };
  return Array.isArray(data.items) ? data.items : [];
}

export function NewsPageList({ lang }: { lang: 'hu' | 'en' }) {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let c = false;
    void fetchPublishedNews().then((list) => {
      if (!c) {
        setItems(list);
        setLoading(false);
      }
    });
    return () => {
      c = true;
    };
  }, []);

  if (loading) {
    return <p style={{ color: 'var(--muted)' }}>{lang === 'hu' ? 'Betöltés…' : 'Loading…'}</p>;
  }

  if (!items.length) {
    return <p style={{ color: 'var(--muted)' }}>{lang === 'hu' ? 'Jelenleg nincs közzétett hír.' : 'No published news yet.'}</p>;
  }

  return (
    <ul className="stack" style={{ listStyle: 'none', padding: 0, margin: 0, gap: 16 }}>
      {items.map((item) => (
        <li key={item.id} className="card" style={{ padding: 20, borderRadius: 16 }}>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 8 }}>
            <span className="badge">{item.category}</span>
            <span className="badge">{item.date}</span>
          </div>
          <h3 style={{ marginTop: 0 }}>{lang === 'hu' ? item.titleHu : item.titleEn}</h3>
          <p style={{ color: 'var(--muted)', lineHeight: 1.65 }}>{lang === 'hu' ? item.textHu : item.textEn}</p>
          <div style={{ color: 'var(--muted)', fontSize: 14 }}>{item.author}</div>
        </li>
      ))}
    </ul>
  );
}
