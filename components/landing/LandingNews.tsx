/**
 * @file Landing hír blokk – lista, szűrés, admin modálok
 *
 * @description
 * Hírek **GET /api/news**-ről; OFFICE/ADMIN: **POST/PATCH/DELETE**. Kategóriák + mentett keresések: `localStorage` (`STORAGE_KEY`).
 * Fázis 1: szövegek `lib/landingDictionary.ts`, layout `styles/modules/news.css` (`landing-news-*`).
 */
'use client';

import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { useApp } from '@/components/layout/AppProvider';
import { SectionHeader } from '@/components/ui/Core';
import { AdminModal } from '@/components/ui/AdminModal';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorState } from '@/components/ui/ErrorState';
import { ModuleAdminToolbar } from '@/components/ui/ModuleAdminToolbar';
import { Skeleton } from '@/components/ui/Skeleton';
import { fetchNewsList, getDemoNews } from '@/features/news/client';
import type { CoverTone, NewsFormStatus, NewsItem, NewsSource } from '@/features/news/types';
import { t } from '@/lib/content';
import { getLandingCopy } from '@/lib/landingDictionary';
import { canUseDemoFallback } from '@/lib/services/content-fetch-policy';

type AdminModalKey = 'editor' | 'adapters' | 'archive' | 'category' | null;
type DraftForm = {
  source: NewsSource;
  category: string;
  status: NewsFormStatus;
  titleHu: string;
  titleEn: string;
  textHu: string;
  textEn: string;
  author: string;
  scheduledFor: string;
  externalUrl: string;
  cover: CoverTone;
  hasCover: boolean;
  slug: string;
  coverAltHu: string;
  coverAltEn: string;
  sourcePostId: string;
};

const STORAGE_KEY = 'v25_17-landing-news-prefs';

const emptyForm: DraftForm = {
  source: 'internal',
  category: '',
  status: 'draft',
  titleHu: '',
  titleEn: '',
  textHu: '',
  textEn: '',
  author: '',
  scheduledFor: '',
  externalUrl: '',
  cover: 'blue',
  hasCover: true,
  slug: '',
  coverAltHu: '',
  coverAltEn: '',
  sourcePostId: '',
};

const icon = {
  plus: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 5v14M5 12h14" />
    </svg>
  ),
  archive: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 7h18" />
      <path d="M5 7h14v12H5z" />
      <path d="M10 12h4" />
    </svg>
  ),
  edit: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z" />
    </svg>
  ),
  details: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 16v-4" />
      <circle cx="12" cy="8" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  external: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 5h5v5" />
      <path d="M10 14 19 5" />
      <path d="M19 14v5h-14V5h5" />
    </svg>
  ),
  delete: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 6h18" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v6M14 11v6" />
    </svg>
  ),
  bookmark: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 4h12v16l-6-4-6 4V4z" />
    </svg>
  ),
  publish: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  ),
};

function formStatusFromItem(s: NewsItem['status']): NewsFormStatus {
  return s === 'deleted' ? 'draft' : s;
}

function sourceLabel(src: NewsSource, copy: ReturnType<typeof getLandingCopy>) {
  if (src === 'internal') return copy.badgeSourceInternal;
  if (src === 'facebook') return 'Facebook';
  return 'Instagram';
}

function statusChipLabel(status: string, copy: ReturnType<typeof getLandingCopy>) {
  switch (status) {
    case 'published':
      return copy.published;
    case 'draft':
      return copy.draft;
    case 'scheduled':
      return copy.scheduled;
    case 'archived':
      return copy.archived;
    case 'deleted':
      return copy.statusRawDeleted;
    default:
      return status;
  }
}

function IconButton({ label, onClick, children }: { label: string; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="btn btn-secondary landing-news-icon-btn"
    >
      <span aria-hidden="true">{children}</span>
    </button>
  );
}

export function LandingNews() {
  const { lang, openModal, isAdmin, sessionUser, toast, requestConfirm } = useApp();
  const canManageNewsUi = sessionUser?.role === 'OFFICE' || sessionUser?.role === 'ADMIN';
  const copy = getLandingCopy(lang);
  const dict = t(lang);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [source, setSource] = useState<'all' | NewsSource>('all');
  const [status, setStatus] = useState<'all' | NewsFormStatus>('all');
  const [order, setOrder] = useState<'latest' | 'oldest'>('latest');
  const [customCategories, setCustomCategories] = useState(['Közélet', 'Közösség', 'Képek']);
  const [savedSearches, setSavedSearches] = useState<string[]>([]);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [listStatus, setListStatus] = useState<'loading' | 'error' | 'ready'>('loading');
  const [draftForm, setDraftForm] = useState<DraftForm>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [adapterFacebook, setAdapterFacebook] = useState({ pageId: '', token: '', endpoint: '' });
  const [adapterInstagram, setAdapterInstagram] = useState({ accountId: '', apiKey: '', endpoint: '' });
  const [pendingCategory, setPendingCategory] = useState('');
  const [activeAdminModal, setActiveAdminModal] = useState<AdminModalKey>(null);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const data = JSON.parse(raw) as { customCategories?: string[]; savedSearches?: string[] };
      if (data.customCategories) setCustomCategories(data.customCategories);
      if (data.savedSearches) setSavedSearches(data.savedSearches);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ customCategories, savedSearches }));
  }, [customCategories, savedSearches]);

  const loadNews = useCallback(async () => {
    setListStatus('loading');
    const fromApi = await fetchNewsList();
    if (fromApi !== null) {
      setNewsItems(fromApi);
      setListStatus('ready');
      return;
    }
    if (canUseDemoFallback()) {
      setNewsItems(getDemoNews());
      setListStatus('ready');
      return;
    }
    setNewsItems([]);
    setListStatus('error');
  }, []);

  useEffect(() => {
    void loadNews();
  }, [isAdmin, loadNews]);

  const visibleNews = useMemo(() => {
    const base = newsItems.filter((item) => (canManageNewsUi && item.status !== 'deleted') || item.status === 'published');
    const list = base.filter(
      (item) =>
        (category === 'all' || item.category === category) &&
        (source === 'all' || item.source === source) &&
        (status === 'all' || item.status === status) &&
        `${item.titleHu} ${item.titleEn} ${item.textHu} ${item.textEn} ${item.author}`.toLowerCase().includes(query.toLowerCase()),
    );
    return [...list].sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
      return order === 'latest' ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date);
    });
  }, [newsItems, query, category, source, status, order, canManageNewsUi]);

  const hasActiveFilters =
    query.trim() !== '' || category !== 'all' || source !== 'all' || status !== 'all';

  const resetForm = () => {
    setDraftForm(emptyForm);
    setEditingId(null);
  };

  const persistNotice = (msg: string) => toast(msg, 'success');

  const reloadFromApi = useCallback(async () => {
    const fromApi = await fetchNewsList();
    if (fromApi !== null) {
      setNewsItems(fromApi);
      return;
    }
    if (canUseDemoFallback()) {
      setNewsItems(getDemoNews());
      return;
    }
    setNewsItems([]);
    setListStatus('error');
  }, []);

  const applyCreate = async (publishDirectly: boolean) => {
    const body = {
      source: draftForm.source,
      category: draftForm.category.trim() || copy.defaultCategory,
      status: (publishDirectly ? 'published' : draftForm.status) as 'published' | 'draft' | 'scheduled' | 'archived',
      listDate: new Date().toISOString().slice(0, 10),
      titleHu: draftForm.titleHu.trim() || copy.defaultTitleHu,
      titleEn: draftForm.titleEn.trim() || copy.defaultTitleEn,
      textHu: draftForm.textHu.trim() || copy.defaultTextHu,
      textEn: draftForm.textEn.trim() || copy.defaultTextEn,
      author: draftForm.author.trim() || copy.defaultAuthor,
      cover: draftForm.cover,
      hasCover: draftForm.hasCover,
      scheduledFor: draftForm.scheduledFor.trim() || undefined,
      externalUrl: draftForm.externalUrl.trim() || undefined,
      slug: draftForm.slug.trim() || undefined,
      coverAltHu: draftForm.coverAltHu.trim(),
      coverAltEn: draftForm.coverAltEn.trim(),
      sourcePostId:
        draftForm.source === 'facebook' || draftForm.source === 'instagram'
          ? draftForm.sourcePostId.trim() || undefined
          : undefined,
    };
    const res = await fetch('/api/news', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = (await res.json().catch(() => ({}))) as { error?: string; code?: string };
    if (!res.ok) {
      if (res.status === 409 || data.code === 'duplicate_ingest') {
        toast(copy.newsDuplicateIngest, 'warning');
        return;
      }
      toast(data.error ?? copy.saveFailed, 'warning');
      return;
    }
    await reloadFromApi();
    if (body.category && !customCategories.includes(body.category)) setCustomCategories((prev) => [...prev, body.category]);
    resetForm();
    setActiveAdminModal(null);
    persistNotice(copy.newsCreated);
  };

  const applyEdit = async () => {
    if (editingId === null) return;
    const body = {
      source: draftForm.source,
      category: draftForm.category.trim() || copy.defaultCategory,
      status: draftForm.status,
      titleHu: draftForm.titleHu.trim() || copy.defaultTitleHu,
      titleEn: draftForm.titleEn.trim() || copy.defaultTitleEn,
      textHu: draftForm.textHu.trim() || copy.defaultTextHu,
      textEn: draftForm.textEn.trim() || copy.defaultTextEn,
      author: draftForm.author.trim() || copy.defaultAuthor,
      cover: draftForm.cover,
      hasCover: draftForm.hasCover,
      scheduledFor: draftForm.scheduledFor.trim() || undefined,
      externalUrl: draftForm.externalUrl.trim() || undefined,
      slug: draftForm.slug.trim() || undefined,
      coverAltHu: draftForm.coverAltHu.trim(),
      coverAltEn: draftForm.coverAltEn.trim(),
      sourcePostId:
        draftForm.source === 'facebook' || draftForm.source === 'instagram'
          ? draftForm.sourcePostId.trim() || undefined
          : undefined,
    };
    const res = await fetch(`/api/news/${editingId}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = (await res.json().catch(() => ({}))) as { error?: string; code?: string };
    if (!res.ok) {
      if (data.code === 'publish_requires_alt') {
        toast(copy.newsPublishRequiresAlt, 'warning');
        return;
      }
      toast(data.error ?? copy.saveFailed, 'warning');
      return;
    }
    await reloadFromApi();
    resetForm();
    setActiveAdminModal(null);
    persistNotice(copy.newsUpdated);
  };

  const archiveItem = async (id: number) => {
    const res = await fetch(`/api/news/${id}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'archived' }),
    });
    if (!res.ok) {
      toast(copy.archiveFailed, 'warning');
      return;
    }
    await reloadFromApi();
    toast(copy.newsArchiveToast, 'success');
  };

  const deleteItem = async (id: number) => {
    const ok = await requestConfirm({
      message: copy.confirmDeleteNews,
      destructive: true,
      confirmLabel: dict.common.delete,
      cancelLabel: dict.common.cancel,
    });
    if (!ok) return;
    const res = await fetch(`/api/news/${id}`, { method: 'DELETE', credentials: 'include' });
    if (!res.ok) {
      toast(copy.deleteFailed, 'warning');
      return;
    }
    await reloadFromApi();
  };

  const publishItem = async (id: number) => {
    const res = await fetch(`/api/news/${id}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'published' }),
    });
    const data = (await res.json().catch(() => ({}))) as { error?: string; code?: string };
    if (!res.ok) {
      if (data.code === 'publish_requires_alt') {
        toast(copy.newsPublishRequiresAlt, 'warning');
        return;
      }
      toast(copy.publishFailed, 'warning');
      return;
    }
    await reloadFromApi();
    toast(copy.newsPublishToast, 'success');
  };

  const addCategory = () => {
    const value = pendingCategory.trim();
    if (value && !customCategories.includes(value)) {
      setCustomCategories((prev) => [...prev, value]);
      setPendingCategory('');
      persistNotice(copy.categorySavedToast);
    }
  };

  const addSavedSearch = () => {
    const value = query.trim();
    if (value && !savedSearches.includes(value)) {
      setSavedSearches((prev) => [...prev, value]);
      persistNotice(copy.searchSavedToast);
    }
  };

  const openDetails = (item: NewsItem) => {
    const title = lang === 'hu' ? item.titleHu : item.titleEn;
    const bodyHtml = lang === 'hu' ? item.textHu : item.textEn;
    const canon =
      item.canonicalUrl != null
        ? `<div class="news-modal-meta-row"><a href="${item.canonicalUrl.replace(/"/g, '&quot;')}" target="_blank" rel="noopener noreferrer">${copy.canonicalLinkLabel}</a></div>`
        : '';
    const meta = `<div class="news-modal-meta-row">${copy.authorLabel}: ${item.author}</div><div class="news-modal-meta-row news-modal-meta-row--tight">${copy.dateLabel}: ${item.date}</div>`;
    openModal(title, `${canon}${bodyHtml}${meta}`);
  };

  const openEditMode = (item: NewsItem) => {
    setEditingId(item.id);
    setDraftForm({
      source: item.source,
      category: item.category,
      status: formStatusFromItem(item.status),
      titleHu: item.titleHu,
      titleEn: item.titleEn,
      textHu: item.textHu,
      textEn: item.textEn,
      author: item.author,
      scheduledFor: item.scheduledFor ?? '',
      externalUrl: item.externalUrl ?? '',
      cover: item.cover,
      hasCover: item.hasCover,
      slug: item.slug ?? '',
      coverAltHu: item.coverAltHu ?? '',
      coverAltEn: item.coverAltEn ?? '',
      sourcePostId: '',
    });
    setActiveAdminModal('editor');
  };

  const copyPreviewLink = async () => {
    if (editingId === null) return;
    const res = await fetch(`/api/news/${editingId}/preview-token`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    const data = (await res.json().catch(() => ({}))) as { previewUrl?: string; error?: string };
    if (!res.ok || !data.previewUrl) {
      toast(data.error ?? copy.saveFailed, 'warning');
      return;
    }
    try {
      await navigator.clipboard.writeText(data.previewUrl);
      toast(copy.previewLinkCopied, 'success');
    } catch {
      toast(copy.saveFailed, 'warning');
    }
  };

  const featured = visibleNews[0];
  const rest = visibleNews.slice(1);

  const emptyTitle =
    newsItems.length > 0 && hasActiveFilters ? copy.newsEmptyFilteredTitle : copy.newsEmptyTitle;
  const emptyDesc =
    newsItems.length > 0 && hasActiveFilters
      ? copy.newsEmptyFilteredDesc
      : canManageNewsUi
        ? copy.newsEmptyStaff
        : copy.newsEmptyGuest;

  return (
    <section id="landing-news" className="section landing-news-section">
      <div className="card card-strong animate-fade landing-news-surface">
        <SectionHeader eyebrow={copy.newsEyebrow} title={copy.newsTitle} text={copy.newsText} />
        {listStatus === 'loading' ? (
          <div role="status" aria-live="polite" aria-label={copy.newsLoadingAria}>
            <Skeleton variant="newsList" />
          </div>
        ) : listStatus === 'error' ? (
          <ErrorState
            title={copy.newsLoadErrorTitle}
            message={copy.newsLoadErrorMessage}
            onRetry={() => void loadNews()}
            retryLabel={copy.newsRetry}
          />
        ) : (
          <>
            <div id="landing-news-list" className="news-toolbar card landing-news-toolbar">
              <input
                className="input"
                placeholder={copy.search}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label={copy.newsToolbarSearchAria}
              />
              <select
                className="select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                aria-label={copy.newsToolbarCategoryAria}
              >
                <option value="all">{copy.allCategories}</option>
                {customCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <select
                className="select"
                value={source}
                onChange={(e) => setSource(e.target.value as 'all' | NewsSource)}
                aria-label={copy.newsToolbarSourceAria}
              >
                <option value="all">{copy.allSources}</option>
                <option value="internal">{copy.internalNews}</option>
                <option value="facebook">Facebook</option>
                <option value="instagram">Instagram</option>
              </select>
              {canManageNewsUi ? (
                <select
                  className="select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as 'all' | NewsFormStatus)}
                  aria-label={copy.newsToolbarStatusAria}
                >
                  <option value="all">{copy.allStatuses}</option>
                  <option value="published">{copy.published}</option>
                  <option value="draft">{copy.draft}</option>
                  <option value="scheduled">{copy.scheduled}</option>
                  <option value="archived">{copy.archived}</option>
                </select>
              ) : null}
              <button
                type="button"
                className="btn btn-secondary"
                aria-label={copy.newsToolbarSortLabel}
                onClick={() => setOrder(order === 'latest' ? 'oldest' : 'latest')}
              >
                {order === 'latest' ? copy.latest : copy.oldest}
              </button>
              {canManageNewsUi ? (
                <IconButton label={copy.saveSearch} onClick={addSavedSearch}>
                  {icon.bookmark}
                </IconButton>
              ) : null}
            </div>

            <div className={canManageNewsUi ? 'news-module-grid with-admin' : 'news-module-grid full-news'}>
              <div className="stack">
                {visibleNews.length === 0 ? (
                  <EmptyState title={emptyTitle} description={emptyDesc} />
                ) : null}
                {visibleNews.length > 0 && featured ? (
              <div
                className="news-list-card clickable"
                role="button"
                tabIndex={0}
                onClick={() => openDetails(featured)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openDetails(featured);
                  }
                }}
              >
                <div className="landing-news-featured-grid">
                  <div className={`news-cover ${featured.cover}`} />
                  <div>
                    <div className="landing-news-badge-row">
                      <div className="badge">{copy.featured}</div>
                      <div className="badge">{sourceLabel(featured.source, copy)}</div>
                      <div className="badge">{featured.category}</div>
                    </div>
                    <h3 className="landing-news-featured-title">{lang === 'hu' ? featured.titleHu : featured.titleEn}</h3>
                    <p className="landing-news-card-body landing-news-card-body--featured">{lang === 'hu' ? featured.textHu : featured.textEn}</p>
                    <div className="landing-news-byline">
                      {copy.sourceAuthor} {featured.author}
                    </div>
                    <div className="landing-news-byline landing-news-byline--meta">
                      {copy.dateLabel}: {featured.date}
                    </div>
                  </div>
                  <div className="landing-news-actions">
                    <IconButton label={copy.details} onClick={() => openDetails(featured)}>
                      {icon.details}
                    </IconButton>
                    {featured.externalUrl ? (
                      <a
                        href={featured.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={copy.openExternal}
                        title={copy.openExternal}
                        className="btn btn-secondary landing-news-external-btn"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span aria-hidden="true" className="landing-news-external-btn-inner">
                          {icon.external}
                        </span>
                      </a>
                    ) : null}
                    {canManageNewsUi ? (
                      <>
                        <IconButton label={copy.editNews} onClick={() => openEditMode(featured)}>
                          {icon.edit}
                        </IconButton>
                        <IconButton label={copy.archive} onClick={() => void archiveItem(featured.id)}>
                          {icon.archive}
                        </IconButton>
                        <IconButton label={copy.delete} onClick={() => void deleteItem(featured.id)}>
                          {icon.delete}
                        </IconButton>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            ) : null}

                {visibleNews.length > 0 ? (
                  <div className="stack">
                    {rest.map((item) => (
                      <div
                        key={item.id}
                        className="news-list-card clickable"
                        role="button"
                        tabIndex={0}
                        onClick={() => openDetails(item)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            openDetails(item);
                          }
                        }}
                      >
                        <div className="landing-news-row-grid">
                          <div className={`news-cover ${item.cover} landing-news-cover--thumb`} />
                          <div>
                            <div className="landing-news-badge-row landing-news-badge-row--compact">
                              <div className="badge">{sourceLabel(item.source, copy)}</div>
                              <div className="badge">{item.category}</div>
                              <div className="badge">{statusChipLabel(item.status, copy)}</div>
                            </div>
                            <h3 className="landing-news-card-title">{lang === 'hu' ? item.titleHu : item.titleEn}</h3>
                            <p className="landing-news-card-body">{lang === 'hu' ? item.textHu : item.textEn}</p>
                          </div>
                          <div className="landing-news-actions">
                            <IconButton label={copy.details} onClick={() => openDetails(item)}>
                              {icon.details}
                            </IconButton>
                            {item.externalUrl ? (
                              <a
                                href={item.externalUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={copy.openExternal}
                                title={copy.openExternal}
                                className="btn btn-secondary landing-news-external-btn"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <span aria-hidden="true" className="landing-news-external-btn-inner">
                                  {icon.external}
                                </span>
                              </a>
                            ) : null}
                            {canManageNewsUi ? (
                              <>
                                <IconButton label={copy.editNews} onClick={() => openEditMode(item)}>
                                  {icon.edit}
                                </IconButton>
                                <IconButton label={copy.publish} onClick={() => void publishItem(item.id)}>
                                  {icon.publish}
                                </IconButton>
                                <IconButton label={copy.archive} onClick={() => void archiveItem(item.id)}>
                                  {icon.archive}
                                </IconButton>
                                <IconButton label={copy.delete} onClick={() => void deleteItem(item.id)}>
                                  {icon.delete}
                                </IconButton>
                              </>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>

              {canManageNewsUi ? (
            <aside className="stack">
              <div className="news-side-panel admin-actions-panel">
                <ModuleAdminToolbar title={dict.common.moduleAdminToolbarTitle} ariaLabel={dict.common.moduleAdminToolbarAria}>
                  <button type="button" className="btn btn-secondary" onClick={() => { resetForm(); setActiveAdminModal('editor'); }}>
                    {copy.newsEditor}
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={() => setActiveAdminModal('adapters')}>
                    {copy.adapters}
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={() => setActiveAdminModal('archive')}>
                    {copy.archiveScheduling}
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={() => setActiveAdminModal('category')}>
                    {copy.categoryManagement}
                  </button>
                </ModuleAdminToolbar>
                {savedSearches.length ? (
                  <div className="admin-chip-row landing-news-chip-row-spaced">
                    {savedSearches.map((item) => (
                      <button
                        key={item}
                        type="button"
                        className="badge landing-news-saved-chip"
                        title={copy.savedSearchApply}
                        onClick={() => setQuery(item)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            </aside>
          ) : null}
            </div>
          </>
        )}

        <AdminModal
          open={activeAdminModal === 'editor'}
          title={copy.newsEditor}
          closeLabel={dict.common.modalClose}
          onClose={() => setActiveAdminModal(null)}
        >
          <div className="stack">
            <div className="modal-grid">
              <label>
                <div className="landing-news-field-label">{copy.formLabelTitleHu}</div>
                <input className="input" value={draftForm.titleHu} onChange={(e) => setDraftForm((p) => ({ ...p, titleHu: e.target.value }))} />
              </label>
              <label>
                <div className="landing-news-field-label">{copy.formLabelTitleEn}</div>
                <input className="input" value={draftForm.titleEn} onChange={(e) => setDraftForm((p) => ({ ...p, titleEn: e.target.value }))} />
              </label>
              <label className="landing-news-modal-field-full">
                <div className="landing-news-field-label">{copy.formLabelTextHu}</div>
                <textarea
                  className="input landing-news-modal-textarea"
                  value={draftForm.textHu}
                  onChange={(e) => setDraftForm((p) => ({ ...p, textHu: e.target.value }))}
                />
              </label>
              <label className="landing-news-modal-field-full">
                <div className="landing-news-field-label">{copy.formLabelTextEn}</div>
                <textarea
                  className="input landing-news-modal-textarea"
                  value={draftForm.textEn}
                  onChange={(e) => setDraftForm((p) => ({ ...p, textEn: e.target.value }))}
                />
              </label>
              <label>
                <div className="landing-news-field-label">{copy.formLabelSource}</div>
                <select className="select" value={draftForm.source} onChange={(e) => setDraftForm((p) => ({ ...p, source: e.target.value as NewsSource }))}>
                  <option value="internal">{copy.formSourceInternal}</option>
                  <option value="facebook">{copy.formSourceFacebook}</option>
                  <option value="instagram">{copy.formSourceInstagram}</option>
                </select>
              </label>
              <label>
                <div className="landing-news-field-label">{copy.formLabelStatus}</div>
                <select className="select" value={draftForm.status} onChange={(e) => setDraftForm((p) => ({ ...p, status: e.target.value as NewsFormStatus }))}>
                  <option value="draft">{copy.draft}</option>
                  <option value="published">{copy.published}</option>
                  <option value="scheduled">{copy.scheduled}</option>
                  <option value="archived">{copy.archived}</option>
                </select>
              </label>
              <label>
                <div className="landing-news-field-label">{copy.formLabelCategory}</div>
                <input className="input" value={draftForm.category} onChange={(e) => setDraftForm((p) => ({ ...p, category: e.target.value }))} />
              </label>
              <label>
                <div className="landing-news-field-label">{copy.formLabelAuthor}</div>
                <input className="input" value={draftForm.author} onChange={(e) => setDraftForm((p) => ({ ...p, author: e.target.value }))} />
              </label>
              <label>
                <div className="landing-news-field-label">{copy.formLabelScheduledFor}</div>
                <input className="input" value={draftForm.scheduledFor} onChange={(e) => setDraftForm((p) => ({ ...p, scheduledFor: e.target.value }))} />
              </label>
              <label>
                <div className="landing-news-field-label">{copy.formLabelExternalUrl}</div>
                <input className="input" value={draftForm.externalUrl} onChange={(e) => setDraftForm((p) => ({ ...p, externalUrl: e.target.value }))} />
              </label>
              <label>
                <div className="landing-news-field-label">{copy.formLabelSlug}</div>
                <input className="input" value={draftForm.slug} onChange={(e) => setDraftForm((p) => ({ ...p, slug: e.target.value }))} />
              </label>
              <label>
                <div className="landing-news-field-label">{copy.formLabelCoverAltHu}</div>
                <input className="input" value={draftForm.coverAltHu} onChange={(e) => setDraftForm((p) => ({ ...p, coverAltHu: e.target.value }))} />
              </label>
              <label>
                <div className="landing-news-field-label">{copy.formLabelCoverAltEn}</div>
                <input className="input" value={draftForm.coverAltEn} onChange={(e) => setDraftForm((p) => ({ ...p, coverAltEn: e.target.value }))} />
              </label>
              {draftForm.source === 'facebook' || draftForm.source === 'instagram' ? (
                <label className="landing-news-modal-field-full">
                  <div className="landing-news-field-label">{copy.formLabelSourcePostId}</div>
                  <input
                    className="input"
                    value={draftForm.sourcePostId}
                    onChange={(e) => setDraftForm((p) => ({ ...p, sourcePostId: e.target.value }))}
                  />
                </label>
              ) : null}
            </div>
            <div className="news-form-actions">
              <button type="button" className="btn btn-primary" onClick={() => void (editingId === null ? applyCreate(true) : applyEdit())}>
                {editingId === null ? copy.create : copy.saveChanges}
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => void applyCreate(false)} disabled={editingId !== null}>
                {copy.saveDraft}
              </button>
              {editingId !== null ? (
                <button type="button" className="btn btn-secondary" onClick={() => void copyPreviewLink()}>
                  {copy.previewLinkGenerate}
                </button>
              ) : null}
              <button type="button" className="btn btn-secondary" onClick={resetForm}>
                {copy.resetForm}
              </button>
            </div>
          </div>
        </AdminModal>

        <AdminModal
          open={activeAdminModal === 'adapters'}
          title={copy.adapters}
          closeLabel={dict.common.modalClose}
          onClose={() => setActiveAdminModal(null)}
        >
          <div className="stack">
            <p className="landing-news-panel-help">{copy.adaptersPanelHelp}</p>
            <div className="modal-grid">
              <input
                className="input"
                placeholder={copy.placeholderFacebookPageId}
                aria-label={copy.placeholderFacebookPageId}
                value={adapterFacebook.pageId}
                onChange={(e) => setAdapterFacebook((p) => ({ ...p, pageId: e.target.value }))}
              />
              <input
                className="input"
                placeholder={copy.placeholderFacebookToken}
                aria-label={copy.placeholderFacebookToken}
                value={adapterFacebook.token}
                onChange={(e) => setAdapterFacebook((p) => ({ ...p, token: e.target.value }))}
              />
              <input
                className="input landing-news-modal-field-full"
                placeholder={copy.placeholderFacebookEndpoint}
                aria-label={copy.placeholderFacebookEndpoint}
                value={adapterFacebook.endpoint}
                onChange={(e) => setAdapterFacebook((p) => ({ ...p, endpoint: e.target.value }))}
              />
              <input
                className="input"
                placeholder={copy.placeholderInstagramAccountId}
                aria-label={copy.placeholderInstagramAccountId}
                value={adapterInstagram.accountId}
                onChange={(e) => setAdapterInstagram((p) => ({ ...p, accountId: e.target.value }))}
              />
              <input
                className="input"
                placeholder={copy.placeholderInstagramApiKey}
                aria-label={copy.placeholderInstagramApiKey}
                value={adapterInstagram.apiKey}
                onChange={(e) => setAdapterInstagram((p) => ({ ...p, apiKey: e.target.value }))}
              />
              <input
                className="input landing-news-modal-field-full"
                placeholder={copy.placeholderInstagramEndpoint}
                aria-label={copy.placeholderInstagramEndpoint}
                value={adapterInstagram.endpoint}
                onChange={(e) => setAdapterInstagram((p) => ({ ...p, endpoint: e.target.value }))}
              />
            </div>
          </div>
        </AdminModal>

        <AdminModal
          open={activeAdminModal === 'archive'}
          title={copy.archiveScheduling}
          closeLabel={dict.common.modalClose}
          onClose={() => setActiveAdminModal(null)}
        >
          <p className="landing-news-panel-help">{copy.archivePanelHelp}</p>
          <div className="admin-chip-row">
            <div className="badge">
              {copy.archiveCountPublished}: {newsItems.filter((i) => i.status === 'published').length}
            </div>
            <div className="badge">
              {copy.archiveCountScheduled}: {newsItems.filter((i) => i.status === 'scheduled').length}
            </div>
            <div className="badge">
              {copy.archiveCountArchived}: {newsItems.filter((i) => i.status === 'archived').length}
            </div>
            <div className="badge">
              {copy.archiveCountDraft}: {newsItems.filter((i) => i.status === 'draft').length}
            </div>
          </div>
        </AdminModal>

        <AdminModal
          open={activeAdminModal === 'category'}
          title={copy.categoryManagement}
          closeLabel={dict.common.modalClose}
          onClose={() => setActiveAdminModal(null)}
        >
          <div className="stack">
            <p className="landing-news-panel-help">{copy.categoryPanelHelp}</p>
            <div className="admin-chip-row">
              {customCategories.map((cat) => (
                <span key={cat} className="badge">
                  {cat}
                </span>
              ))}
            </div>
            <div className="admin-module-actions">
              <input
                className="input landing-news-category-input"
                placeholder={copy.newCategory}
                aria-label={copy.newCategory}
                value={pendingCategory}
                onChange={(e) => setPendingCategory(e.target.value)}
              />
              <button type="button" className="btn btn-secondary" onClick={addCategory}>
                {copy.add}
              </button>
            </div>
          </div>
        </AdminModal>
      </div>
    </section>
  );
}
