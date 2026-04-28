'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useApp } from '@/components/layout/AppProvider';
import { SectionHeader } from '@/components/ui/Core';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorState } from '@/components/ui/ErrorState';
import { FilterChip } from '@/components/ui/FilterChip';
import { Skeleton } from '@/components/ui/Skeleton';

type ResultItem = {
  id: string;
  module: 'news' | 'events' | 'guides';
  titleHu: string;
  titleEn: string;
  textHu?: string;
  textEn?: string;
  href: string;
};

const STORAGE_KEY = 'v25_20-global-search-saved';

async function loadResults(): Promise<ResultItem[]> {
  const [newsR, eventsR, guidesR] = await Promise.all([
    fetch('/api/news', { credentials: 'include' }),
    fetch('/api/events', { credentials: 'include' }),
    fetch('/api/guides', { credentials: 'include' }),
  ]);

  if (!newsR.ok && !eventsR.ok && !guidesR.ok) {
    throw new Error('search index unavailable');
  }

  const out: ResultItem[] = [];
  if (newsR.ok) {
    const data = (await newsR.json()) as { items?: Array<{ id: number; titleHu: string; titleEn: string; textHu: string; textEn: string }> };
    for (const n of data.items ?? []) {
      out.push({
        id: `news-${n.id}`,
        module: 'news',
        titleHu: n.titleHu,
        titleEn: n.titleEn,
        textHu: n.textHu,
        textEn: n.textEn,
        href: '/news',
      });
    }
  }

  if (eventsR.ok) {
    const data = (await eventsR.json()) as { items?: Array<{ id: number; titleHu: string; titleEn: string; note?: string }> };
    for (const e of data.items ?? []) {
      out.push({
        id: `events-${e.id}`,
        module: 'events',
        titleHu: e.titleHu,
        titleEn: e.titleEn,
        textHu: e.note ?? '',
        textEn: e.note ?? '',
        href: '/calendar',
      });
    }
  }

  if (guidesR.ok) {
    const data = (await guidesR.json()) as { items?: Array<{ id: number; titleHu: string; titleEn: string; excerptHu: string; excerptEn: string }> };
    for (const g of data.items ?? []) {
      out.push({
        id: `guides-${g.id}`,
        module: 'guides',
        titleHu: g.titleHu,
        titleEn: g.titleEn,
        textHu: g.excerptHu,
        textEn: g.excerptEn,
        href: '/guides',
      });
    }
  }

  return out;
}

export function SearchPageClient() {
  const { lang, toast } = useApp();
  const [query, setQuery] = useState('');
  const [saved, setSaved] = useState<string[]>([]);
  const [all, setAll] = useState<ResultItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [feedback, setFeedback] = useState({ module: 'general', message: '', email: '' });

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as { items?: string[] };
      if (Array.isArray(parsed.items)) setSaved(parsed.items.slice(0, 20));
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ items: saved.slice(0, 20) }));
  }, [saved]);

  const loadIndex = useCallback(async () => {
    setLoading(true);
    setLoadError(false);
    try {
      const items = await loadResults();
      setAll(items);
    } catch {
      setLoadError(true);
      setAll([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadIndex();
  }, [loadIndex]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return all
      .filter((item) => {
        const blob = `${item.titleHu} ${item.titleEn} ${item.textHu ?? ''} ${item.textEn ?? ''}`.toLowerCase();
        return blob.includes(q);
      })
      .slice(0, 40);
  }, [all, query]);

  function saveCurrentQuery() {
    const q = query.trim();
    if (!q) return;
    if (saved.includes(q)) return;
    setSaved((prev) => [q, ...prev].slice(0, 20));
    toast(lang === 'hu' ? 'Keresés elmentve.' : 'Search saved.', 'success');
  }

  async function submitFeedback() {
    const res = await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(feedback),
    });
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    if (!res.ok) {
      toast(data.error ?? (lang === 'hu' ? 'Küldés sikertelen.' : 'Submit failed.'), 'warning');
      return;
    }
    setFeedback({ module: 'general', message: '', email: '' });
    toast(lang === 'hu' ? 'Visszajelzés elküldve.' : 'Feedback submitted.', 'success');
  }

  return (
    <>
      <section className="section">
        <SectionHeader
          eyebrow={lang === 'hu' ? 'Globális kereső' : 'Global search'}
          title={lang === 'hu' ? 'Keresés hírekben, eseményekben, útmutatókban' : 'Search across news, events and guides'}
          text={lang === 'hu' ? 'Egy mezőből több modulban kereshetsz. A mentett keresések ezen az eszközön tárolódnak.' : 'Use one input to search across modules. Saved searches stay on this device.'}
        />

        <div className="card search-panel-card">
          <div className="search-toolbar-row">
            <input
              className="input search-toolbar-input"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={lang === 'hu' ? 'Keresés…' : 'Search…'}
              aria-label={lang === 'hu' ? 'Globális keresés' : 'Global search'}
            />
            <button className="btn btn-secondary" type="button" onClick={saveCurrentQuery}>
              {lang === 'hu' ? 'Mentés' : 'Save'}
            </button>
          </div>
          {!!saved.length && (
            <div className="search-saved-chips">
              {saved.map((s) => (
                <FilterChip
                  key={s}
                  selected={query.trim() === s}
                  onClick={() => setQuery(s)}
                  aria-label={
                    lang === 'hu' ? `Mentett keresés alkalmazása: ${s}` : `Apply saved search: ${s}`
                  }
                >
                  {s}
                </FilterChip>
              ))}
            </div>
          )}
        </div>

        {loading ? <Skeleton variant="searchResults" /> : null}
        {!loading && loadError ? (
          <ErrorState
            title={lang === 'hu' ? 'Index betöltési hiba' : 'Index load error'}
            message={
              lang === 'hu'
                ? 'A keresési index (hírek, események, útmutatók) nem tölthető be.'
                : 'The search index (news, events, guides) could not be loaded.'
            }
            onRetry={() => void loadIndex()}
            retryLabel={lang === 'hu' ? 'Újra' : 'Retry'}
          />
        ) : null}
        {!loading && !loadError && query.trim() && !results.length ? (
          <EmptyState
            title={lang === 'hu' ? 'Nincs találat' : 'No results'}
            description={
              lang === 'hu'
                ? 'Próbálj más kulcsszót, vagy ellenőrizd a mentett kereséseket.'
                : 'Try another keyword or check your saved searches.'
            }
          />
        ) : null}

        <div className="stack">
          {results.map((item) => (
            <a key={item.id} href={item.href} className="card search-result-card">
              <div className="badge search-result-badge">
                {item.module}
              </div>
              <h3 className="search-result-title">{lang === 'hu' ? item.titleHu : item.titleEn}</h3>
              <p className="search-result-body">{lang === 'hu' ? item.textHu : item.textEn}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHeader
          eyebrow={lang === 'hu' ? 'Visszajelzés' : 'Feedback'}
          title={lang === 'hu' ? 'Hibás információ jelzése' : 'Report incorrect information'}
          text={lang === 'hu' ? 'Rövid visszajelzés küldése rate limittel védett nyilvános űrlapon.' : 'Send quick feedback through a rate-limited public form.'}
        />
        <div className="card search-feedback-card">
          <div className="stack">
            <select className="select" value={feedback.module} onChange={(e) => setFeedback((p) => ({ ...p, module: e.target.value }))} aria-label="Feedback module">
              <option value="general">general</option>
              <option value="news">news</option>
              <option value="events">events</option>
              <option value="guides">guides</option>
            </select>
            <textarea
              className="input search-feedback-textarea"
              value={feedback.message}
              onChange={(e) => setFeedback((p) => ({ ...p, message: e.target.value }))}
              placeholder={lang === 'hu' ? 'Mi a probléma a tartalommal?' : 'What is wrong with the content?'}
              aria-label={lang === 'hu' ? 'Visszajelzés szövege' : 'Feedback text'}
            />
            <input
              className="input"
              type="email"
              value={feedback.email}
              onChange={(e) => setFeedback((p) => ({ ...p, email: e.target.value }))}
              placeholder={lang === 'hu' ? 'E-mail (opcionális)' : 'Email (optional)'}
              aria-label="Email"
            />
            <button className="btn btn-primary" type="button" onClick={() => void submitFeedback()}>
              {lang === 'hu' ? 'Küldés' : 'Submit'}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

