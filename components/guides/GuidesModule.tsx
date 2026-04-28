/**
 * @file Útmutatók modul – lista, keresés, kategória, modál, dokumentum link
 *
 * @description
 * Adat: **GET /api/guides** (`items`). Admin: **POST /api/guides**, **DELETE /api/guides/[id]**.
 * Keresés: cím, kivonat, kulcsszavak, témakör; szűrés kategória szerint.
 */
'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useApp } from '@/components/layout/AppProvider';
import { Card, SectionHeader } from '@/components/ui/Core';
import { EmptyState } from '@/components/ui/EmptyState';
import { FilterChip } from '@/components/ui/FilterChip';
import { guideItems as fallbackGuideItems } from '@/lib/content';
import { canUseDemoFallback } from '@/lib/services/content-fetch-policy';
import type { GuideDto } from '@/types/guides';

function fallbackPayload(): GuideDto[] {
  return fallbackGuideItems.map((it) => ({
    id: it.id,
    titleHu: it.titleHu,
    titleEn: it.titleEn,
    excerptHu: it.textHu,
    excerptEn: it.textEn,
    bodyHu: it.textHu,
    bodyEn: it.textEn,
    category: 'Általános',
    topic: '',
    keywords: '',
    listDate: '2026-04-01',
    status: 'published',
  }));
}

async function fetchGuides(): Promise<GuideDto[] | null> {
  const r = await fetch('/api/guides', { credentials: 'include' });
  if (!r.ok) return null;
  const data = (await r.json()) as { items?: GuideDto[] };
  if (!Array.isArray(data.items)) return null;
  return data.items;
}

function pickBody(lang: 'hu' | 'en', g: GuideDto): string {
  const primary = lang === 'hu' ? g.bodyHu : g.bodyEn;
  const fallback = lang === 'hu' ? g.bodyEn : g.bodyHu;
  const ex = lang === 'hu' ? g.excerptHu : g.excerptEn;
  const t = primary.trim() || fallback.trim();
  return t || ex;
}

export function GuidesModule() {
  const { lang, toast, isAdmin, openModal } = useApp();
  const [items, setItems] = useState<GuideDto[]>([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('all');

  const reload = useCallback(async () => {
    const data = await fetchGuides();
    if (data) setItems(data);
    else setItems(canUseDemoFallback() ? fallbackPayload() : []);
  }, []);

  useEffect(() => {
    void reload();
  }, [reload, isAdmin]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const g of items) set.add(g.category);
    return ['all', ...Array.from(set).sort((a, b) => a.localeCompare(b, 'hu'))];
  }, [items]);

  const filtered = useMemo(() => {
    const byCat = category === 'all' ? items : items.filter((g) => g.category === category);
    const q = query.trim().toLowerCase();
    if (!q) return byCat;
    return byCat.filter((g) => {
      const blob = [
        g.titleHu,
        g.titleEn,
        g.excerptHu,
        g.excerptEn,
        g.topic,
        g.keywords,
        g.category,
      ]
        .join(' ')
        .toLowerCase();
      return blob.includes(q);
    });
  }, [items, category, query]);

  function openGuide(g: GuideDto) {
    const title = lang === 'hu' ? g.titleHu : g.titleEn;
    const body = pickBody(lang, g);
    openModal(title, body);
  }

  async function addDemoGuide() {
    const listDate = new Date().toISOString().slice(0, 10);
    const res = await fetch('/api/guides', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        titleHu: 'Új útmutató (demó)',
        titleEn: 'New guide (demo)',
        excerptHu: 'Rövid kivonat – szerkeszthető a belső felületen vagy PATCH-csel.',
        excerptEn: 'Short excerpt – editable in the internal UI or via PATCH.',
        bodyHu: 'Teljes szöveg helye. Lista után részletes tartalom és letölthető dokumentum (§14).',
        bodyEn: 'Full text placeholder. After the list: detailed content and downloadable documents (§14).',
        category: 'Általános',
        topic: 'Demó',
        keywords: 'demó,útmutató',
        listDate,
        status: 'published',
      }),
    });
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    if (!res.ok) {
      toast(data.error ?? (lang === 'hu' ? 'Mentés sikertelen.' : 'Save failed.'), 'warning');
      return;
    }
    await reload();
    toast(lang === 'hu' ? 'Új útmutató létrehozva.' : 'New guide created.', 'success');
  }

  async function removeGuide(id: number) {
    if (!window.confirm(lang === 'hu' ? 'Biztosan töröljük ezt az útmutatót?' : 'Delete this guide?')) return;
    const res = await fetch(`/api/guides/${id}`, { method: 'DELETE', credentials: 'include' });
    if (!res.ok) {
      toast(lang === 'hu' ? 'Törlés sikertelen.' : 'Delete failed.', 'warning');
      return;
    }
    await reload();
    toast(lang === 'hu' ? 'Útmutató törölve.' : 'Guide removed.', 'success');
  }

  return (
    <section className="section">
      <SectionHeader
        eyebrow={lang === 'hu' ? 'Útmutatók' : 'Guides'}
        title={lang === 'hu' ? 'Útmutatók és dokumentumtár' : 'Guides and document hub'}
        text={
          lang === 'hu'
            ? 'Keresés, kategória és témakör szerinti szűrés; részletes szöveg modálban; letölthető link, ha van megadva.'
            : 'Search and filter by category and topic; full text in a modal; download link when a URL is set.'
        }
      />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', marginBottom: 18 }}>
        <input
          type="search"
          className="input"
          placeholder={lang === 'hu' ? 'Kulcsszó a címben, kivonatban…' : 'Keyword in title, excerpt…'}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ minWidth: 220, flex: '1 1 200px' }}
          aria-label={lang === 'hu' ? 'Keresés' : 'Search'}
        />
        <div className="guides-category-filter" style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 200, flex: '1 1 240px' }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--muted)' }}>{lang === 'hu' ? 'Kategória' : 'Category'}</span>
          <div
            role="group"
            aria-label={lang === 'hu' ? 'Kategória szűrő' : 'Category filter'}
            style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}
          >
            {categories.map((c) => (
              <FilterChip key={c} selected={category === c} onClick={() => setCategory(c)}>
                {c === 'all' ? (lang === 'hu' ? 'Mind' : 'All') : c}
              </FilterChip>
            ))}
          </div>
        </div>
        {isAdmin ? (
          <button type="button" className="btn btn-secondary" onClick={() => void addDemoGuide()}>
            {lang === 'hu' ? '+ Demó útmutató' : '+ Demo guide'}
          </button>
        ) : null}
      </div>
      <div className="grid-2">
        {filtered.map((g) => (
          <Card key={g.id} strong>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 6 }}>
              {g.category}
              {g.topic ? ` · ${g.topic}` : ''} · {g.listDate}
            </div>
            <h3 style={{ margin: '0 0 8px 0' }}>{lang === 'hu' ? g.titleHu : g.titleEn}</h3>
            <p style={{ color: 'var(--muted)', margin: 0 }}>{lang === 'hu' ? g.excerptHu : g.excerptEn}</p>
            {g.documentUrl && /^https?:\/\//i.test(g.documentUrl) ? (
              <p style={{ marginTop: 10, marginBottom: 0 }}>
                <a href={g.documentUrl} className="btn btn-ghost" target="_blank" rel="noopener noreferrer">
                  {lang === 'hu' ? 'Dokumentum' : 'Document'}
                  {g.documentType ? ` (${g.documentType})` : ''}
                </a>
              </p>
            ) : null}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 14 }}>
              <button type="button" className="btn btn-primary" onClick={() => openGuide(g)}>
                {lang === 'hu' ? 'Megnyitás' : 'Open'}
              </button>
              {isAdmin ? (
                <button type="button" className="btn btn-ghost" onClick={() => void removeGuide(g.id)}>
                  {lang === 'hu' ? 'Törlés' : 'Delete'}
                </button>
              ) : null}
            </div>
          </Card>
        ))}
      </div>
      {filtered.length === 0 ? (
        <EmptyState
          title={lang === 'hu' ? 'Nincs találat' : 'No results'}
          description={
            lang === 'hu'
              ? 'Módosítsd a keresést vagy a kategóriát.'
              : 'Adjust your search or category filter.'
          }
        />
      ) : null}
    </section>
  );
}
