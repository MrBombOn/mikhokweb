/** @file Admin – audit `/admin/audit` */
'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useApp } from '@/components/layout/AppProvider';
import { AdminSavedViewsToolbar } from '@/components/admin/AdminSavedViewsToolbar';
import { Card, SectionHeader } from '@/components/ui/Core';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorState } from '@/components/ui/ErrorState';
import { Skeleton } from '@/components/ui/Skeleton';
import { t } from '@/lib/content';

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
type AuditPageInfo = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  sort: 'asc' | 'desc';
};

function buildAuditSearchParams(opts: {
  filterAction: string;
  filterActor: string;
  filterEntityType: string;
  filterQuery: string;
  filterActorRole: string;
  filterEntityId: string;
  filterFrom: string;
  filterTo: string;
  filterSort: string;
  filterLimit: string;
  page: number;
}) {
  const sp = new URLSearchParams();
  if (opts.filterAction.trim()) sp.set('action', opts.filterAction.trim());
  if (opts.filterActor.trim()) sp.set('actor', opts.filterActor.trim());
  if (opts.filterEntityType.trim()) sp.set('entityType', opts.filterEntityType.trim());
  if (opts.filterActorRole.trim()) sp.set('actorRole', opts.filterActorRole.trim());
  if (opts.filterEntityId.trim()) sp.set('entityId', opts.filterEntityId.trim());
  if (opts.filterFrom.trim()) sp.set('from', opts.filterFrom.trim());
  if (opts.filterTo.trim()) sp.set('to', opts.filterTo.trim());
  if (opts.filterSort.trim()) sp.set('sort', opts.filterSort.trim());
  if (opts.filterQuery.trim()) sp.set('q', opts.filterQuery.trim());
  if (opts.filterLimit.trim()) sp.set('limit', opts.filterLimit.trim());
  sp.set('page', String(opts.page));
  return sp;
}

export default function AdminAuditPage() {
  const { lang } = useApp();
  const m = t(lang).internal;
  const locale = useMemo(() => (lang === 'hu' ? 'hu-HU' : 'en-US'), [lang]);
  const [items, setItems] = useState<AuditRow[]>([]);
  const [listError, setListError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filterAction, setFilterAction] = useState('');
  const [filterActor, setFilterActor] = useState('');
  const [filterEntityType, setFilterEntityType] = useState('');
  const [filterQuery, setFilterQuery] = useState('');
  const [filterActorRole, setFilterActorRole] = useState('');
  const [filterEntityId, setFilterEntityId] = useState('');
  const [filterFrom, setFilterFrom] = useState('');
  const [filterTo, setFilterTo] = useState('');
  const [filterSort, setFilterSort] = useState<'desc' | 'asc'>('desc');
  const [filterLimit, setFilterLimit] = useState('50');
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState<AuditPageInfo | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setListError(false);
    try {
      const sp = buildAuditSearchParams({
        filterAction,
        filterActor,
        filterEntityType,
        filterQuery,
        filterActorRole,
        filterEntityId,
        filterFrom,
        filterTo,
        filterSort,
        filterLimit,
        page,
      });
      const qs = sp.toString();
      const r = await fetch(`/api/audit${qs ? `?${qs}` : ''}`, { credentials: 'include' });
      const data = (await r.json().catch(() => ({}))) as { items?: AuditRow[]; pageInfo?: AuditPageInfo; error?: string };
      if (!r.ok) {
        setListError(true);
        setItems([]);
        setPageInfo(null);
        setLoading(false);
        return;
      }
      setItems(Array.isArray(data.items) ? data.items : []);
      setPageInfo(data.pageInfo ?? null);
      setLoading(false);
    } catch {
      setListError(true);
      setItems([]);
      setPageInfo(null);
      setLoading(false);
    }
  }, [
    filterAction,
    filterActor,
    filterEntityType,
    filterActorRole,
    filterEntityId,
    filterFrom,
    filterTo,
    filterSort,
    filterQuery,
    filterLimit,
    page,
  ]);

  useEffect(() => {
    void reload();
  }, [reload]);

  const exportCsv = useCallback(() => {
    const sp = buildAuditSearchParams({
      filterAction,
      filterActor,
      filterEntityType,
      filterQuery,
      filterActorRole,
      filterEntityId,
      filterFrom,
      filterTo,
      filterSort,
      filterLimit,
      page: 1,
    });
    sp.delete('page');
    sp.set('exportLimit', '3000');
    const url = `/api/audit/export?${sp.toString()}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }, [
    filterAction,
    filterActor,
    filterEntityType,
    filterActorRole,
    filterEntityId,
    filterFrom,
    filterTo,
    filterSort,
    filterQuery,
    filterLimit,
  ]);

  const savedPayload = useMemo(
    () => ({
      filterAction,
      filterActor,
      filterEntityType,
      filterQuery,
      filterActorRole,
      filterEntityId,
      filterFrom,
      filterTo,
      filterSort,
      filterLimit,
      page: 1,
    }),
    [
      filterAction,
      filterActor,
      filterEntityType,
      filterQuery,
      filterActorRole,
      filterEntityId,
      filterFrom,
      filterTo,
      filterSort,
      filterLimit,
    ],
  );

  return (
    <div className="app-shell section">
      <SectionHeader eyebrow={m.auditEyebrow} title={m.auditTitle} text={m.auditLead} />
      {loading ? <Skeleton variant="searchResults" /> : null}
      {!loading && listError ? (
        <ErrorState
          title={m.auditLoadError}
          message={m.dbNetworkError}
          onRetry={() => void reload()}
          retryLabel={m.contentRetry}
        />
      ) : null}
      {!loading && !listError ? (
        <Card>
          <div className="admin-toolbar">
            <input
              className="input"
              placeholder={m.auditFilterAction}
              value={filterAction}
              onChange={(e) => setFilterAction(e.target.value)}
              aria-label={m.auditFilterAction}
            />
            <input
              className="input"
              placeholder={m.auditFilterActor}
              value={filterActor}
              onChange={(e) => setFilterActor(e.target.value)}
              aria-label={m.auditFilterActor}
            />
            <input
              className="input"
              placeholder={m.auditFilterEntity}
              value={filterEntityType}
              onChange={(e) => setFilterEntityType(e.target.value)}
              aria-label={m.auditFilterEntity}
            />
            <input
              className="input"
              placeholder={m.auditFilterQuery}
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              aria-label={m.auditFilterQuery}
            />
            <input
              className="input"
              placeholder={m.auditFilterLimit}
              value={filterLimit}
              onChange={(e) => setFilterLimit(e.target.value)}
              aria-label={m.auditFilterLimit}
            />
            <input
              className="input"
              placeholder={lang === 'hu' ? 'actor role (ADMIN/OFFICE)' : 'actor role (ADMIN/OFFICE)'}
              value={filterActorRole}
              onChange={(e) => setFilterActorRole(e.target.value)}
              aria-label="actor role"
            />
            <input
              className="input"
              placeholder={lang === 'hu' ? 'entityId exact' : 'entityId exact'}
              value={filterEntityId}
              onChange={(e) => setFilterEntityId(e.target.value)}
              aria-label="entity id"
            />
            <input className="input" type="date" value={filterFrom} onChange={(e) => setFilterFrom(e.target.value)} aria-label="from date" />
            <input className="input" type="date" value={filterTo} onChange={(e) => setFilterTo(e.target.value)} aria-label="to date" />
            <select className="select" value={filterSort} onChange={(e) => setFilterSort(e.target.value as 'asc' | 'desc')} aria-label="sort">
              <option value="desc">{lang === 'hu' ? 'Legújabb elöl' : 'Newest first'}</option>
              <option value="asc">{lang === 'hu' ? 'Legrégebbi elöl' : 'Oldest first'}</option>
            </select>
            <button type="button" className="btn btn-primary" onClick={() => setPage(1)}>
              {m.auditApplyFilters}
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => void exportCsv()}>
              {m.auditExportCsv}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setFilterAction('');
                setFilterActor('');
                setFilterEntityType('');
                setFilterActorRole('');
                setFilterEntityId('');
                setFilterFrom('');
                setFilterTo('');
                setFilterSort('desc');
                setFilterQuery('');
                setFilterLimit('50');
                setPage(1);
              }}
            >
              {m.auditResetFilters}
            </button>
          </div>
          <AdminSavedViewsToolbar
            module="audit"
            payload={savedPayload}
            disabled={loading}
            onApply={(p) => {
              setFilterAction(typeof p.filterAction === 'string' ? p.filterAction : '');
              setFilterActor(typeof p.filterActor === 'string' ? p.filterActor : '');
              setFilterEntityType(typeof p.filterEntityType === 'string' ? p.filterEntityType : '');
              setFilterQuery(typeof p.filterQuery === 'string' ? p.filterQuery : '');
              setFilterActorRole(typeof p.filterActorRole === 'string' ? p.filterActorRole : '');
              setFilterEntityId(typeof p.filterEntityId === 'string' ? p.filterEntityId : '');
              setFilterFrom(typeof p.filterFrom === 'string' ? p.filterFrom : '');
              setFilterTo(typeof p.filterTo === 'string' ? p.filterTo : '');
              setFilterSort(p.filterSort === 'asc' ? 'asc' : 'desc');
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
                    <th>{lang === 'hu' ? 'Művelet' : 'Action'}</th>
                    <th>{lang === 'hu' ? 'Szereplő' : 'Actor'}</th>
                    <th>{lang === 'hu' ? 'Entitás' : 'Entity'}</th>
                    <th>{lang === 'hu' ? 'Részlet' : 'Details'}</th>
                    <th>{lang === 'hu' ? 'Idő' : 'Time'}</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((it) => (
                    <tr key={it.id}>
                      <td>
                        <strong>{it.action}</strong>
                      </td>
                      <td>
                        {it.actorName} (
                        {it.actorRole === 'ADMIN' ? m.usersRoleAdmin : it.actorRole === 'OFFICE' ? m.usersRoleOffice : it.actorRole})
                      </td>
                      <td>
                        {it.entityType}:{it.entityId}
                      </td>
                      <td className="admin-table-cell-muted">{it.details || '—'}</td>
                      <td>{new Date(it.createdAt).toLocaleString(locale)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState title={m.auditEmpty} />
          )}
        </Card>
      ) : null}
    </div>
  );
}
