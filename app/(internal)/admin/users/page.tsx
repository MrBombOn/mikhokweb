/** @file Admin – felhasználók `/admin/users` */
'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useApp } from '@/components/layout/AppProvider';
import { AdminSavedViewsToolbar } from '@/components/admin/AdminSavedViewsToolbar';
import { Card, SectionHeader } from '@/components/ui/Core';
import { CustomSelect } from '@/components/ui/CustomSelect';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorState } from '@/components/ui/ErrorState';
import { Skeleton } from '@/components/ui/Skeleton';
import { t } from '@/lib/content';
import { createUserSchema } from '@/lib/validation/users';

type UserRow = { id: string; username: string; role: 'OFFICE' | 'ADMIN'; createdAt: string; updatedAt: string };

type PageInfo = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  sort?: string;
};

export default function AdminUsersPage() {
  const { lang, toast, requestConfirm } = useApp();
  const dict = t(lang);
  const m = dict.internal;
  const locale = useMemo(() => (lang === 'hu' ? 'hu-HU' : 'en-US'), [lang]);
  const [items, setItems] = useState<UserRow[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfo | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'OFFICE' | 'ADMIN'>('OFFICE');
  const [formError, setFormError] = useState('');
  const [listError, setListError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filterQ, setFilterQ] = useState('');
  const [filterRole, setFilterRole] = useState<'all' | 'OFFICE' | 'ADMIN'>('all');
  const [filterSort, setFilterSort] = useState<'desc' | 'asc'>('desc');
  const [filterLimit, setFilterLimit] = useState('25');
  const [page, setPage] = useState(1);
  const [bulkJson, setBulkJson] = useState('');
  const [bulkBusy, setBulkBusy] = useState(false);

  const roleOptions = useMemo(
    () => [
      { value: 'OFFICE' as const, label: m.usersRoleOffice },
      { value: 'ADMIN' as const, label: m.usersRoleAdmin },
    ],
    [m.usersRoleOffice, m.usersRoleAdmin],
  );

  const filterRoleSelect = useMemo(
    () => [
      { value: 'all' as const, label: m.usersFilterRoleAll },
      { value: 'OFFICE' as const, label: m.usersRoleOffice },
      { value: 'ADMIN' as const, label: m.usersRoleAdmin },
    ],
    [m.usersFilterRoleAll, m.usersRoleAdmin, m.usersRoleOffice],
  );

  const reload = useCallback(async () => {
    setLoading(true);
    const sp = new URLSearchParams();
    if (filterQ.trim()) sp.set('q', filterQ.trim());
    if (filterRole !== 'all') sp.set('role', filterRole);
    sp.set('sort', filterSort);
    if (filterLimit.trim()) sp.set('limit', filterLimit.trim());
    sp.set('page', String(page));
    const r = await fetch(`/api/users?${sp.toString()}`, { credentials: 'include' });
    const data = (await r.json().catch(() => ({}))) as { items?: UserRow[]; pageInfo?: PageInfo; error?: string };
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
  }, [filterLimit, filterQ, filterRole, filterSort, page]);

  useEffect(() => {
    void reload();
  }, [reload]);

  async function createUser() {
    const parsed = createUserSchema.safeParse({ username, password, role });
    if (!parsed.success) {
      setFormError(m.usersValidationError);
      return;
    }
    const okToCreate = await requestConfirm({
      title: lang === 'hu' ? 'Megerősítés' : 'Confirmation',
      message:
        lang === 'hu'
          ? `Biztosan létrehozod ezt a felhasználót? (${parsed.data.username} / ${parsed.data.role})`
          : `Create this user? (${parsed.data.username} / ${parsed.data.role})`,
      confirmLabel: lang === 'hu' ? 'Létrehozás' : 'Create',
      cancelLabel: dict.common.cancel,
      destructive: true,
    });
    if (!okToCreate) return;

    const r = await fetch('/api/users', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parsed.data),
    });
    const data = (await r.json().catch(() => ({}))) as { error?: string };
    if (!r.ok) {
      setFormError(data.error ?? m.usersSaveError);
      return;
    }
    setUsername('');
    setPassword('');
    setRole('OFFICE');
    setFormError('');
    toast(m.usersCreatedToast, 'success');
    await reload();
  }

  async function exportUserGdpr(userId: string) {
    const r = await fetch(`/api/admin/privacy/export-user/${encodeURIComponent(userId)}`, {
      credentials: 'include',
    });
    if (!r.ok) {
      toast(m.usersGdprExportFail, 'warning');
      return;
    }
    const blob = await r.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gdpr-staff-export-${userId.slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast(m.usersGdprExportOk, 'success');
  }

  async function deleteUserGdpr(row: UserRow) {
    const okDel = await requestConfirm({
      title: lang === 'hu' ? 'Megerősítés' : 'Confirmation',
      message: `${m.usersGdprDeleteConfirm} (${row.username})`,
      confirmLabel: dict.common.delete,
      cancelLabel: dict.common.cancel,
      destructive: true,
    });
    if (!okDel) return;

    const r = await fetch(`/api/admin/privacy/delete-user/${encodeURIComponent(row.id)}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = (await r.json().catch(() => ({}))) as { error?: string };
    if (!r.ok) {
      toast(data.error ?? m.usersGdprDeleteFail, 'warning');
      return;
    }
    toast(m.usersGdprDeleteOk, 'success');
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
    const r = await fetch('/api/users/import', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = (await r.json().catch(() => ({}))) as { error?: string; created?: number; skipped?: unknown[] };
    setBulkBusy(false);
    if (!r.ok) {
      toast(data.error ?? m.usersSaveError, 'warning');
      return;
    }
    const skipped = Array.isArray(data.skipped) ? data.skipped.length : 0;
    const created = typeof data.created === 'number' ? data.created : 0;
    toast(m.usersBulkResult.replace('{{created}}', String(created)).replace('{{skipped}}', String(skipped)), 'success');
    setBulkJson('');
    await reload();
  }

  const savedPayload = useMemo(
    () => ({
      filterQ,
      filterRole,
      filterSort,
      filterLimit,
      page: 1,
    }),
    [filterLimit, filterQ, filterRole, filterSort],
  );

  return (
    <div className="app-shell section">
      <SectionHeader eyebrow={m.usersEyebrow} title={m.usersTitle} text={m.usersLead} />
      <Card>
        <div className="admin-form-row">
          <input
            className="input"
            placeholder={m.usersUsernamePlaceholder}
            aria-label={m.usersUsernameAria}
            minLength={3}
            maxLength={80}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="input"
            type="password"
            placeholder={m.usersPasswordPlaceholder}
            aria-label={m.usersPasswordAria}
            minLength={8}
            maxLength={200}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <CustomSelect ariaLabel={m.usersRoleAria} value={role} onChange={(next) => setRole(next as 'OFFICE' | 'ADMIN')} options={roleOptions} />
          <button type="button" className="btn btn-primary" onClick={() => void createUser()}>
            {m.usersCreate}
          </button>
        </div>
        {formError ? <p role="alert" className="admin-error-text">{formError}</p> : null}
      </Card>

      <Card>
        <h3 className="admin-card-title">{m.usersBulkTitle}</h3>
        <p className="admin-card-meta-sm">{m.usersBulkHint}</p>
        <textarea
          className="input admin-bulk-textarea"
          rows={5}
          value={bulkJson}
          onChange={(e) => setBulkJson(e.target.value)}
          placeholder={m.usersBulkPlaceholder}
          aria-label={m.usersBulkTitle}
        />
        <div className="admin-module-actions">
          <button type="button" className="btn btn-primary" disabled={bulkBusy} onClick={() => void runBulkImport()}>
            {m.usersBulkSubmit}
          </button>
        </div>
      </Card>

      {loading ? (
        <Skeleton variant="searchResults" />
      ) : listError ? (
        <ErrorState
          title={m.usersLoadError}
          message={m.dbNetworkError}
          onRetry={() => void reload()}
          retryLabel={m.contentRetry}
        />
      ) : (
        <Card>
          <div className="admin-toolbar">
            <input
              className="input"
              placeholder={m.usersFilterQuery}
              value={filterQ}
              onChange={(e) => setFilterQ(e.target.value)}
              aria-label={m.usersFilterQuery}
            />
            <CustomSelect
              ariaLabel={m.usersFilterRoleAll}
              value={filterRole}
              onChange={(next) => {
                setFilterRole(next as 'all' | 'OFFICE' | 'ADMIN');
                setPage(1);
              }}
              options={filterRoleSelect}
            />
            <input
              className="input"
              placeholder={m.usersFilterLimit}
              value={filterLimit}
              onChange={(e) => setFilterLimit(e.target.value)}
              aria-label={m.usersFilterLimit}
            />
            <select
              className="select"
              value={filterSort}
              onChange={(e) => {
                setFilterSort(e.target.value as 'desc' | 'asc');
                setPage(1);
              }}
              aria-label="sort"
            >
              <option value="desc">{m.usersSortNewest}</option>
              <option value="asc">{m.usersSortOldest}</option>
            </select>
            <button type="button" className="btn btn-primary" onClick={() => setPage(1)}>
              {m.auditApplyFilters}
            </button>
          </div>
          <AdminSavedViewsToolbar
            module="users"
            payload={savedPayload}
            disabled={loading}
            onApply={(p) => {
              setFilterQ(typeof p.filterQ === 'string' ? p.filterQ : '');
              const fr = p.filterRole;
              setFilterRole(fr === 'OFFICE' || fr === 'ADMIN' || fr === 'all' ? fr : 'all');
              setFilterSort(p.filterSort === 'asc' ? 'asc' : 'desc');
              setFilterLimit(typeof p.filterLimit === 'string' ? p.filterLimit : '25');
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
                    <th>{m.usersTableUser}</th>
                    <th>{m.usersTableRole}</th>
                    <th>{m.usersCreatedAt}</th>
                    <th>{m.usersTableUpdated}</th>
                    <th>{m.usersTableActions}</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((it) => (
                    <tr key={it.id}>
                      <td>{it.username}</td>
                      <td>{it.role === 'ADMIN' ? m.usersRoleAdmin : m.usersRoleOffice}</td>
                      <td>{new Date(it.createdAt).toLocaleString(locale)}</td>
                      <td>{new Date(it.updatedAt).toLocaleString(locale)}</td>
                      <td>
                        <div className="admin-module-actions admin-module-actions--nowrap">
                          <button type="button" className="btn btn-secondary btn-sm" onClick={() => void exportUserGdpr(it.id)}>
                            {m.usersGdprExport}
                          </button>
                          <button type="button" className="btn btn-secondary btn-sm" onClick={() => void deleteUserGdpr(it)}>
                            {m.usersGdprDelete}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState title={m.usersEmpty} />
          )}
        </Card>
      )}
    </div>
  );
}
