/** @file Admin – kategóriák `/admin/categories` */
'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useApp } from '@/components/layout/AppProvider';
import { AdminSavedViewsToolbar } from '@/components/admin/AdminSavedViewsToolbar';
import { Card, SectionHeader } from '@/components/ui/Core';
import { CustomSelect } from '@/components/ui/CustomSelect';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorState } from '@/components/ui/ErrorState';
import { Skeleton } from '@/components/ui/Skeleton';
import { t, type Messages } from '@/lib/content';
import { createCategorySchema } from '@/lib/validation/categories';

type InternalDict = Messages['hu']['internal'] | Messages['en']['internal'];

type CategoryRow = {
  id: number;
  scope: 'news' | 'events' | 'gallery' | 'guides' | 'office';
  nameHu: string;
  nameEn: string;
  sortOrder: number;
  status: 'draft' | 'scheduled' | 'published' | 'archived' | 'deleted';
};

type PageInfo = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  sort?: string;
};

function categoryScopeLabel(scope: CategoryRow['scope'], m: InternalDict): string {
  const map: Record<CategoryRow['scope'], string> = {
    news: m.categoriesScopeNews,
    events: m.categoriesScopeEvents,
    gallery: m.categoriesScopeGallery,
    guides: m.categoriesScopeGuides,
    office: m.categoriesScopeOffice,
  };
  return map[scope] ?? scope;
}

function categoryStatusLabel(status: CategoryRow['status'], m: InternalDict): string {
  const map: Record<CategoryRow['status'], string> = {
    draft: m.categoriesStatusDraft,
    scheduled: m.categoriesStatusScheduled,
    published: m.categoriesStatusPublished,
    archived: m.categoriesStatusArchived,
    deleted: m.categoriesStatusDeleted,
  };
  return map[status] ?? status;
}

export default function AdminCategoriesPage() {
  const { lang, toast, requestConfirm } = useApp();
  const dict = t(lang);
  const m = dict.internal;
  const [items, setItems] = useState<CategoryRow[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfo | null>(null);
  const [scope, setScope] = useState<CategoryRow['scope']>('news');
  const [nameHu, setNameHu] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [formError, setFormError] = useState('');
  const [listError, setListError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filterQ, setFilterQ] = useState('');
  const [filterScope, setFilterScope] = useState<'all' | CategoryRow['scope']>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | CategoryRow['status']>('all');
  const [sortKey, setSortKey] = useState<'scope' | 'createdAt' | 'nameHu' | 'sortOrder'>('scope');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [filterLimit, setFilterLimit] = useState('50');
  const [page, setPage] = useState(1);
  const [bulkJson, setBulkJson] = useState('');
  const [bulkBusy, setBulkBusy] = useState(false);

  const scopeOptions = useMemo(
    () => [
      { value: 'news' as const, label: m.categoriesScopeNews },
      { value: 'events' as const, label: m.categoriesScopeEvents },
      { value: 'gallery' as const, label: m.categoriesScopeGallery },
      { value: 'guides' as const, label: m.categoriesScopeGuides },
      { value: 'office' as const, label: m.categoriesScopeOffice },
    ],
    [
      m.categoriesScopeNews,
      m.categoriesScopeEvents,
      m.categoriesScopeGallery,
      m.categoriesScopeGuides,
      m.categoriesScopeOffice,
    ],
  );

  const filterScopeOptions = useMemo(
    () => [{ value: 'all' as const, label: m.categoriesFilterScopeAll }, ...scopeOptions],
    [m.categoriesFilterScopeAll, scopeOptions],
  );

  const filterStatusOptions = useMemo(
    () => [
      { value: 'all' as const, label: m.categoriesFilterStatusAll },
      { value: 'draft' as const, label: m.categoriesStatusDraft },
      { value: 'scheduled' as const, label: m.categoriesStatusScheduled },
      { value: 'published' as const, label: m.categoriesStatusPublished },
      { value: 'archived' as const, label: m.categoriesStatusArchived },
    ],
    [
      m.categoriesFilterStatusAll,
      m.categoriesStatusDraft,
      m.categoriesStatusScheduled,
      m.categoriesStatusPublished,
      m.categoriesStatusArchived,
    ],
  );

  const sortKeyOptions = useMemo(
    () => [
      { value: 'scope' as const, label: m.categoriesSortScope },
      { value: 'createdAt' as const, label: m.categoriesSortCreated },
      { value: 'nameHu' as const, label: m.categoriesSortNameHu },
      { value: 'sortOrder' as const, label: m.categoriesSortOrder },
    ],
    [m.categoriesSortCreated, m.categoriesSortNameHu, m.categoriesSortOrder, m.categoriesSortScope],
  );

  const reload = useCallback(async () => {
    setLoading(true);
    const sp = new URLSearchParams();
    if (filterQ.trim()) sp.set('q', filterQ.trim());
    if (filterScope !== 'all') sp.set('scope', filterScope);
    if (filterStatus !== 'all') sp.set('status', filterStatus);
    sp.set('sortKey', sortKey);
    sp.set('sortDir', sortDir);
    if (filterLimit.trim()) sp.set('limit', filterLimit.trim());
    sp.set('page', String(page));
    const r = await fetch(`/api/categories?${sp.toString()}`, { credentials: 'include' });
    const data = (await r.json().catch(() => ({}))) as { items?: CategoryRow[]; pageInfo?: PageInfo; error?: string };
    if (!r.ok) {
      setListError(true);
      setFormError('');
      setItems([]);
      setPageInfo(null);
      setLoading(false);
      return;
    }
    setListError(false);
    setFormError('');
    setItems(Array.isArray(data.items) ? data.items : []);
    setPageInfo(data.pageInfo ?? null);
    setLoading(false);
  }, [filterLimit, filterQ, filterScope, filterStatus, page, sortDir, sortKey]);

  useEffect(() => {
    void reload();
  }, [reload]);

  async function createCategory() {
    const parsed = createCategorySchema.safeParse({
      scope,
      nameHu,
      nameEn,
      status: 'published',
    });
    if (!parsed.success) {
      setFormError(m.categoriesValidationError);
      return;
    }
    const okToCreate = await requestConfirm({
      title: lang === 'hu' ? 'Megerősítés' : 'Confirmation',
      message:
        lang === 'hu'
          ? `Biztosan létrehozod ezt a kategóriát? (${parsed.data.scope} / ${parsed.data.nameHu})`
          : `Create this category? (${parsed.data.scope} / ${parsed.data.nameHu})`,
      confirmLabel: lang === 'hu' ? 'Létrehozás' : 'Create',
      cancelLabel: dict.common.cancel,
      destructive: true,
    });
    if (!okToCreate) return;

    const r = await fetch('/api/categories', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parsed.data),
    });
    const data = (await r.json().catch(() => ({}))) as { error?: string };
    if (!r.ok) {
      setFormError(data.error ?? m.categoriesSaveError);
      return;
    }
    setNameHu('');
    setNameEn('');
    setFormError('');
    toast(m.categoriesCreatedToast, 'success');
    await reload();
  }

  async function runBulkImport() {
    let parsed: unknown;
    try {
      parsed = JSON.parse(bulkJson) as unknown;
    } catch {
      toast(lang === 'hu' ? 'Érvénytelen JSON.' : 'Invalid JSON.', 'warning');
      return;
    }
    const body = Array.isArray(parsed) ? { items: parsed } : parsed;
    setBulkBusy(true);
    const r = await fetch('/api/categories/import', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = (await r.json().catch(() => ({}))) as { error?: string; created?: number; skipped?: unknown[] };
    setBulkBusy(false);
    if (!r.ok) {
      toast(data.error ?? m.categoriesSaveError, 'warning');
      return;
    }
    const skipped = Array.isArray(data.skipped) ? data.skipped.length : 0;
    const created = typeof data.created === 'number' ? data.created : 0;
    toast(m.categoriesBulkResult.replace('{{created}}', String(created)).replace('{{skipped}}', String(skipped)), 'success');
    setBulkJson('');
    await reload();
  }

  const savedPayload = useMemo(
    () => ({
      filterQ,
      filterScope,
      filterStatus,
      sortKey,
      sortDir,
      filterLimit,
      page: 1,
    }),
    [filterLimit, filterQ, filterScope, filterStatus, sortDir, sortKey],
  );

  return (
    <div className="app-shell section">
      <SectionHeader eyebrow={m.categoriesEyebrow} title={m.categoriesTitle} text={m.categoriesLead} />
      <Card>
        <div className="admin-form-row">
          <CustomSelect
            ariaLabel={m.categoriesScopeAria}
            value={scope}
            onChange={(next) => setScope(next as CategoryRow['scope'])}
            options={scopeOptions}
          />
          <input
            className="input"
            aria-label={m.categoriesNameHuAria}
            placeholder={m.categoriesPlaceholderHu}
            minLength={1}
            maxLength={120}
            value={nameHu}
            onChange={(e) => setNameHu(e.target.value)}
          />
          <input
            className="input"
            aria-label={m.categoriesNameEnAria}
            placeholder={m.categoriesPlaceholderEn}
            minLength={1}
            maxLength={120}
            value={nameEn}
            onChange={(e) => setNameEn(e.target.value)}
          />
          <button type="button" className="btn btn-primary" onClick={() => void createCategory()}>
            {m.categoriesCreate}
          </button>
        </div>
        {formError ? <p role="alert" className="admin-error-text">{formError}</p> : null}
      </Card>

      <Card>
        <h3 className="admin-card-title">{m.categoriesBulkTitle}</h3>
        <p className="admin-card-meta-sm">{m.categoriesBulkHint}</p>
        <textarea
          className="input admin-bulk-textarea"
          rows={5}
          value={bulkJson}
          onChange={(e) => setBulkJson(e.target.value)}
          placeholder={m.categoriesBulkPlaceholder}
          aria-label={m.categoriesBulkTitle}
        />
        <div className="admin-module-actions">
          <button type="button" className="btn btn-primary" disabled={bulkBusy} onClick={() => void runBulkImport()}>
            {m.categoriesBulkSubmit}
          </button>
        </div>
      </Card>

      {loading ? (
        <Skeleton variant="searchResults" />
      ) : listError ? (
        <ErrorState
          title={m.categoriesLoadError}
          message={m.dbNetworkError}
          onRetry={() => void reload()}
          retryLabel={m.contentRetry}
        />
      ) : (
        <Card>
          <div className="admin-toolbar">
            <input
              className="input"
              placeholder={m.categoriesFilterQuery}
              value={filterQ}
              onChange={(e) => setFilterQ(e.target.value)}
              aria-label={m.categoriesFilterQuery}
            />
            <CustomSelect
              ariaLabel={m.categoriesFilterScopeAll}
              value={filterScope}
              onChange={(next) => {
                setFilterScope(next as 'all' | CategoryRow['scope']);
                setPage(1);
              }}
              options={filterScopeOptions}
            />
            <CustomSelect
              ariaLabel={m.categoriesFilterStatusAll}
              value={filterStatus}
              onChange={(next) => {
                setFilterStatus(next as 'all' | CategoryRow['status']);
                setPage(1);
              }}
              options={filterStatusOptions}
            />
            <CustomSelect
              ariaLabel="sort key"
              value={sortKey}
              onChange={(next) => {
                setSortKey(next as typeof sortKey);
                setPage(1);
              }}
              options={sortKeyOptions}
            />
            <select
              className="select"
              value={sortDir}
              onChange={(e) => {
                setSortDir(e.target.value as 'asc' | 'desc');
                setPage(1);
              }}
              aria-label="sort direction"
            >
              <option value="asc">ASC</option>
              <option value="desc">DESC</option>
            </select>
            <input
              className="input"
              placeholder={m.categoriesFilterLimit}
              value={filterLimit}
              onChange={(e) => setFilterLimit(e.target.value)}
              aria-label={m.categoriesFilterLimit}
            />
            <button type="button" className="btn btn-primary" onClick={() => setPage(1)}>
              {m.auditApplyFilters}
            </button>
          </div>
          <AdminSavedViewsToolbar
            module="categories"
            payload={savedPayload}
            disabled={loading}
            onApply={(p) => {
              setFilterQ(typeof p.filterQ === 'string' ? p.filterQ : '');
              const fs = p.filterScope;
              setFilterScope(fs === 'all' || fs === 'news' || fs === 'events' || fs === 'gallery' || fs === 'guides' || fs === 'office' ? fs : 'all');
              const fst = p.filterStatus;
              setFilterStatus(
                fst === 'all' || fst === 'draft' || fst === 'scheduled' || fst === 'published' || fst === 'archived' || fst === 'deleted'
                  ? fst
                  : 'all',
              );
              const sk = p.sortKey;
              setSortKey(sk === 'createdAt' || sk === 'nameHu' || sk === 'sortOrder' || sk === 'scope' ? sk : 'scope');
              setSortDir(p.sortDir === 'desc' ? 'desc' : 'asc');
              setFilterLimit(typeof p.filterLimit === 'string' ? p.filterLimit : '50');
              setPage(typeof p.page === 'number' ? p.page : 1);
            }}
          />
          {pageInfo ? (
            <div className="admin-module-actions">
              <button
                type="button"
                className="btn btn-secondary"
                disabled={!pageInfo.hasPrev}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                {lang === 'hu' ? 'Előző' : 'Prev'}
              </button>
              <span className="muted-text">
                {lang === 'hu' ? 'Oldal' : 'Page'} {pageInfo.page}/{pageInfo.totalPages} · {lang === 'hu' ? 'Összesen' : 'Total'}: {pageInfo.total}
              </span>
              <button
                type="button"
                className="btn btn-secondary"
                disabled={!pageInfo.hasNext}
                onClick={() => setPage((p) => p + 1)}
              >
                {lang === 'hu' ? 'Következő' : 'Next'}
              </button>
            </div>
          ) : null}
          {items.length ? (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>{m.categoriesTableScope}</th>
                    <th>{m.categoriesTableNames}</th>
                    <th>{m.categoriesTableStatus}</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((it) => (
                    <tr key={it.id}>
                      <td>{categoryScopeLabel(it.scope, m)}</td>
                      <td>
                        <strong>{it.nameHu}</strong>
                        <div className="admin-card-meta-sm">{it.nameEn}</div>
                      </td>
                      <td>{categoryStatusLabel(it.status, m)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState title={m.categoriesEmpty} />
          )}
        </Card>
      )}
    </div>
  );
}
