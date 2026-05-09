'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useApp } from '@/components/layout/AppProvider';
import { SectionHeader } from '@/components/ui/Core';
import { CustomSelect } from '@/components/ui/CustomSelect';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorState } from '@/components/ui/ErrorState';
import { FilterChip } from '@/components/ui/FilterChip';
import { Skeleton } from '@/components/ui/Skeleton';
import { t } from '@/lib/content';
import { feedbackSchema } from '@/lib/validation/feedback';

function ariaWithTerm(template: string, term: string) {
  return template.replaceAll('{{c}}', term);
}

type ResultItem = {
  id: string;
  module: 'news' | 'events' | 'guides';
  category?: string;
  titleHu: string;
  titleEn: string;
  textHu?: string;
  textEn?: string;
  href: string;
};

const STORAGE_KEY = 'v25_20-global-search-saved';
const CATEGORY_STORAGE_KEY = 'v25_20-global-search-categories';

const FEEDBACK_TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_FEEDBACK_TURNSTILE_SITE_KEY?.trim() ?? '';

type TurnstileApi = {
  render: (
    el: HTMLElement,
    opts: {
      sitekey: string;
      callback?: (token: string) => void;
      'expired-callback'?: () => void;
      'error-callback'?: () => void;
    },
  ) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

export type SearchPageClientProps = { initialQuery?: string };

export function SearchPageClient({ initialQuery = '' }: SearchPageClientProps) {
  const { lang, toast, isStaff } = useApp();
  const dict = t(lang);
  const s = dict.search;
  const [query, setQuery] = useState(initialQuery);
  const [saved, setSaved] = useState<string[]>([]);
  const [customCategories, setCustomCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [pendingCategory, setPendingCategory] = useState('');
  const [facetCategories, setFacetCategories] = useState<string[]>([]);
  const [results, setResults] = useState<ResultItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [feedback, setFeedback] = useState({ module: 'general', message: '', email: '' });
  const [turnstileToken, setTurnstileToken] = useState('');
  const [clientMounted, setClientMounted] = useState(false);
  const turnstileWrapRef = useRef<HTMLDivElement | null>(null);
  const turnstileWidgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    setClientMounted(true);
  }, []);

  useEffect(() => {
    if (!clientMounted || !FEEDBACK_TURNSTILE_SITE_KEY) return undefined;

    let cancelled = false;
    let raf = 0;
    let poll: number | undefined;

    const run = () => {
      raf = window.requestAnimationFrame(() => {
        if (cancelled) return;
        const el = turnstileWrapRef.current;
        if (!el) return;
        const ts = window as Window & { turnstile?: TurnstileApi };

        const mount = () => {
          if (cancelled || !el || !ts.turnstile) return;
          if (turnstileWidgetIdRef.current) return;
          const id = ts.turnstile.render(el, {
            sitekey: FEEDBACK_TURNSTILE_SITE_KEY,
            callback: (t) => setTurnstileToken(t),
            'expired-callback': () => setTurnstileToken(''),
            'error-callback': () => setTurnstileToken(''),
          });
          turnstileWidgetIdRef.current = id;
        };

        if (ts.turnstile) {
          mount();
        } else if (!document.querySelector('script[data-turnstile-api]')) {
          const script = document.createElement('script');
          script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
          script.async = true;
          script.dataset.turnstileApi = '1';
          script.onload = () => mount();
          document.head.appendChild(script);
        } else {
          poll = window.setInterval(() => {
            if (cancelled) {
              if (poll != null) window.clearInterval(poll);
              return;
            }
            const api = (window as Window & { turnstile?: TurnstileApi }).turnstile;
            if (api) {
              if (poll != null) window.clearInterval(poll);
              if (!el || turnstileWidgetIdRef.current) return;
              const id = api.render(el, {
                sitekey: FEEDBACK_TURNSTILE_SITE_KEY,
                callback: (tok) => setTurnstileToken(tok),
                'expired-callback': () => setTurnstileToken(''),
                'error-callback': () => setTurnstileToken(''),
              });
              turnstileWidgetIdRef.current = id;
            }
          }, 50);
        }
      });
    };

    run();

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(raf);
      if (poll != null) window.clearInterval(poll);
      const ts = window as Window & { turnstile?: TurnstileApi };
      const wid = turnstileWidgetIdRef.current;
      if (wid && ts.turnstile) {
        try {
          ts.turnstile.remove(wid);
        } catch {
          /* ignore */
        }
      }
      turnstileWidgetIdRef.current = null;
      setTurnstileToken('');
    };
  }, [clientMounted]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as { items?: string[] };
      if (Array.isArray(parsed.items)) setSaved(parsed.items.slice(0, 20));
    } catch {
      // ignore
    }

    try {
      const raw = window.localStorage.getItem(CATEGORY_STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as { items?: string[] };
      if (Array.isArray(parsed.items)) setCustomCategories(parsed.items.slice(0, 40));
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ items: saved.slice(0, 20) }));
  }, [saved]);

  useEffect(() => {
    window.localStorage.setItem(CATEGORY_STORAGE_KEY, JSON.stringify({ items: customCategories.slice(0, 40) }));
  }, [customCategories]);

  const availableCategories = useMemo(() => {
    return Array.from(new Set([...facetCategories, ...customCategories])).sort((a, b) =>
      a.localeCompare(b, lang === 'hu' ? 'hu' : 'en'),
    );
  }, [facetCategories, customCategories, lang]);

  useEffect(() => {
    let cancelled = false;
    void fetch('/api/search?facets=1')
      .then((r) => (r.ok ? r.json() : { categories: [] }))
      .then((data: { categories?: string[] }) => {
        if (cancelled) return;
        setFacetCategories(Array.isArray(data.categories) ? data.categories : []);
      })
      .catch(() => {
        if (!cancelled) setFacetCategories([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const runSearch = useCallback(async () => {
    const msg = t(lang).search;
    const q = query.trim();
    if (!q && !selectedCategories.length) {
      setResults([]);
      setLoadError(false);
      return;
    }
    setLoading(true);
    setLoadError(false);
    try {
      const params = new URLSearchParams();
      if (q) params.set('q', q);
      if (selectedCategories.length) params.set('categories', selectedCategories.join(','));
      const res = await fetch(`/api/search?${params.toString()}`, { credentials: 'include' });
      if (res.status === 429) {
        toast(msg.rateLimitToast, 'warning');
        setResults([]);
        return;
      }
      if (!res.ok) {
        setLoadError(true);
        setResults([]);
        return;
      }
      const data = (await res.json()) as { items?: ResultItem[] };
      const raw = Array.isArray(data.items) ? data.items : [];
      setResults(
        raw.filter((row): row is ResultItem =>
          row && (row.module === 'news' || row.module === 'events' || row.module === 'guides'),
        ),
      );
    } catch {
      setLoadError(true);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [query, selectedCategories, toast, lang]);

  useEffect(() => {
    const t = window.setTimeout(() => {
      void runSearch();
    }, 280);
    return () => window.clearTimeout(t);
  }, [runSearch]);

  function saveCurrentQuery() {
    const q = query.trim();
    if (!q) return;
    if (saved.includes(q)) return;
    setSaved((prev) => [q, ...prev].slice(0, 20));
    toast(s.toastSearchSaved, 'success');
  }

  function toggleCategory(category: string) {
    setSelectedCategories((prev) => (prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]));
  }

  function addSearchCategory() {
    const value = pendingCategory.trim();
    if (!value) return;
    if (availableCategories.includes(value)) {
      setPendingCategory('');
      return;
    }
    setCustomCategories((prev) => [...prev, value].slice(0, 40));
    setPendingCategory('');
    toast(s.toastCategoryAdded, 'success');
  }

  function removeSearchCategory(category: string) {
    setCustomCategories((prev) => prev.filter((item) => item !== category));
    setSelectedCategories((prev) => prev.filter((item) => item !== category));
    toast(s.toastCategoryRemoved, 'info');
  }

  async function submitFeedback() {
    if (FEEDBACK_TURNSTILE_SITE_KEY && !turnstileToken.trim()) {
      toast(s.feedbackValidationWarning, 'warning');
      return;
    }
    const parsed = feedbackSchema.safeParse({
      ...feedback,
      turnstileToken: FEEDBACK_TURNSTILE_SITE_KEY ? turnstileToken || undefined : undefined,
    });
    if (!parsed.success) {
      toast(s.feedbackValidationWarning, 'warning');
      return;
    }
    const res = await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parsed.data),
    });
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    if (!res.ok) {
      toast(data.error ?? s.feedbackSubmitFailed, 'warning');
      const ts = window as Window & { turnstile?: TurnstileApi };
      const wid = turnstileWidgetIdRef.current;
      if (wid && ts.turnstile) ts.turnstile.reset(wid);
      setTurnstileToken('');
      return;
    }
    setFeedback({ module: 'general', message: '', email: '' });
    const ts = window as Window & { turnstile?: TurnstileApi };
    const wid = turnstileWidgetIdRef.current;
    if (wid && ts.turnstile) ts.turnstile.reset(wid);
    setTurnstileToken('');
    toast(s.feedbackSubmitted, 'success');
  }

  return (
    <>
      <section className="section">
        <SectionHeader eyebrow={s.sectionEyebrow} title={s.sectionTitle} text={s.sectionLead} />

        <div className="card search-panel-card">
          <div className="search-toolbar-row">
            <input
              className="input search-toolbar-input"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={s.searchPlaceholder}
              aria-label={s.searchAriaLabel}
            />
            <button className="btn btn-secondary" type="button" onClick={saveCurrentQuery}>
              {dict.common.save}
            </button>
          </div>
          {!!availableCategories.length && (
            <div className="search-saved-chips">
              {availableCategories.map((category) => (
                <FilterChip
                  key={category}
                  selected={selectedCategories.includes(category)}
                  onClick={() => toggleCategory(category)}
                  aria-label={ariaWithTerm(s.filterCategoryAria, category)}
                >
                  {category}
                </FilterChip>
              ))}
            </div>
          )}
          {isStaff ? (
            <div className="search-toolbar-row search-toolbar-row-admin">
              <input
                className="input search-toolbar-input"
                value={pendingCategory}
                onChange={(e) => setPendingCategory(e.target.value)}
                placeholder={s.addCategoryPlaceholder}
                aria-label={s.addCategoryAria}
              />
              <button className="btn btn-secondary" type="button" onClick={addSearchCategory}>
                {s.addCategory}
              </button>
            </div>
          ) : null}
          {isStaff && !!customCategories.length ? (
            <div className="search-saved-chips">
              {customCategories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => removeSearchCategory(category)}
                  aria-label={ariaWithTerm(s.removeCategoryAria, category)}
                >
                  {category} ×
                </button>
              ))}
            </div>
          ) : null}
          {!!saved.length && (
            <div className="search-saved-chips">
              {saved.map((savedQuery) => (
                <FilterChip
                  key={savedQuery}
                  selected={query.trim() === savedQuery}
                  onClick={() => setQuery(savedQuery)}
                  aria-label={ariaWithTerm(s.applySavedSearchAria, savedQuery)}
                >
                  {savedQuery}
                </FilterChip>
              ))}
            </div>
          )}
        </div>

        {loading ? <Skeleton variant="searchResults" /> : null}
        {!loading && loadError ? (
          <ErrorState
            title={s.indexLoadErrorTitle}
            message={s.indexLoadErrorMessage}
            onRetry={() => void runSearch()}
            retryLabel={s.retryLabel}
          />
        ) : null}
        {!loading && !loadError && (query.trim() || selectedCategories.length) && !results.length ? (
          <EmptyState title={s.emptyTitle} description={s.emptyDescription} />
        ) : null}

        <div className="stack">
          {results.map((item) => (
            <a key={item.id} href={item.href} className="card search-result-card">
              <div className="badge search-result-badge">
                {item.module === 'news'
                  ? s.moduleBadgeNews
                  : item.module === 'events'
                    ? s.moduleBadgeEvents
                    : s.moduleBadgeGuides}
              </div>
              {item.category ? <div className="badge search-result-badge">{item.category}</div> : null}
              <h3 className="search-result-title">{lang === 'hu' ? item.titleHu : item.titleEn}</h3>
              <p className="search-result-body">{lang === 'hu' ? item.textHu : item.textEn}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHeader eyebrow={s.feedbackEyebrow} title={s.feedbackTitle} text={s.feedbackLead} />
        <div className="card search-feedback-card">
          <div className="stack">
            <CustomSelect
              ariaLabel={s.feedbackModuleAria}
              value={feedback.module}
              onChange={(next) => setFeedback((p) => ({ ...p, module: next }))}
              options={[
                { value: 'general', label: s.moduleGeneral },
                { value: 'news', label: s.moduleNews },
                { value: 'events', label: s.moduleEvents },
                { value: 'guides', label: s.moduleGuides },
              ]}
            />
            <textarea
              className="input search-feedback-textarea"
              value={feedback.message}
              onChange={(e) => setFeedback((p) => ({ ...p, message: e.target.value }))}
              minLength={8}
              maxLength={2000}
              placeholder={s.feedbackTextPlaceholder}
              aria-label={s.feedbackTextAria}
            />
            <input
              className="input"
              type="email"
              value={feedback.email}
              onChange={(e) => setFeedback((p) => ({ ...p, email: e.target.value }))}
              maxLength={320}
              placeholder={s.feedbackEmailPlaceholder}
              aria-label={s.emailAria}
            />
            {FEEDBACK_TURNSTILE_SITE_KEY ? <div ref={turnstileWrapRef} className="search-feedback-turnstile" /> : null}
            <button className="btn btn-primary" type="button" onClick={() => void submitFeedback()}>
              {s.submitButton}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

