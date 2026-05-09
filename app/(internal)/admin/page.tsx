/**
 * @file Admin irányítópult – `/admin`
 *
 * @i18n `t(lang).internal` – szöveg SSOT (Fázis 11).
 */
'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useApp } from '@/components/layout/AppProvider';
import { Card, SectionHeader } from '@/components/ui/Core';
import { t } from '@/lib/content';
import type { DbOverviewGroup, DbOverviewTable } from '@/lib/admin/db-overview';
import { getInternalDbGroupLabel, getInternalDbTableCopy } from '@/lib/i18n/internal-db-overview';

type DbOverviewPayload = { tables: DbOverviewTable[] };
type ActivityRow = {
  actorName: string;
  actorRole: string;
  totalActions: number;
  lastActionAt: string;
  topActions: Array<{ action: string; count: number }>;
};
type PermissionRow = {
  capability: string;
  office: boolean;
  admin: boolean;
  area: 'content' | 'system' | 'security';
};

export default function AdminDashboardPage() {
  const { isAdminRole, isAdmin, toast, lang } = useApp();
  const m = t(lang).internal;
  const locale = lang === 'hu' ? 'hu-HU' : 'en-US';
  const rbacToastShown = useRef(false);
  const [stats, setStats] = useState({ users: '-', categories: '-', audits: '-' });
  const [statsLoading, setStatsLoading] = useState(true);
  const [dbOverview, setDbOverview] = useState<DbOverviewPayload | null>(null);
  const [dbError, setDbError] = useState<string | null>(null);
  const [activityItems, setActivityItems] = useState<ActivityRow[]>([]);
  const [activityError, setActivityError] = useState<string | null>(null);
  const [permissionRows, setPermissionRows] = useState<PermissionRow[]>([]);
  const [permissionError, setPermissionError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || rbacToastShown.current) return;
    const sp = new URLSearchParams(window.location.search);
    if (sp.get('rbac') !== 'admin_only') return;
    rbacToastShown.current = true;
    toast(m.rbacToastAdminOnly, 'warning');
    const url = new URL(window.location.href);
    url.searchParams.delete('rbac');
    window.history.replaceState({}, '', url.pathname + url.search);
  }, [toast, m.rbacToastAdminOnly]);

  useEffect(() => {
    let mounted = true;
    setStatsLoading(true);
    const categoryFetch = fetch('/api/categories', { credentials: 'include' }).then((r) => (r.ok ? r.json() : { items: [] }));
    const adminFetches = isAdminRole
      ? [
          fetch('/api/users', { credentials: 'include' }).then((r) => (r.ok ? r.json() : { items: [] })),
          fetch('/api/audit', { credentials: 'include' }).then((r) => (r.ok ? r.json() : { items: [] })),
        ]
      : [Promise.resolve({ items: [] }), Promise.resolve({ items: [] })];

    void Promise.all([...adminFetches, categoryFetch])
      .then(([u, a, c]) => {
        if (!mounted) return;
        const total = (x: { items?: unknown[]; pageInfo?: { total?: number } }) =>
          typeof x.pageInfo?.total === 'number' ? x.pageInfo.total : Array.isArray(x.items) ? x.items.length : 0;
        setStats({
          users: isAdminRole ? String(total(u)) : '—',
          categories: String(total(c)),
          audits: isAdminRole ? String(total(a)) : '—',
        });
        setStatsLoading(false);
      })
      .catch(() => {
        if (!mounted) return;
        setStats({ users: '?', categories: '?', audits: '?' });
        setStatsLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [isAdminRole]);

  useEffect(() => {
    let mounted = true;
    fetch('/api/admin/db-overview', { credentials: 'include' })
      .then(async (r) => {
        const data = (await r.json().catch(() => ({}))) as DbOverviewPayload & { error?: string; groupLabels?: unknown };
        if (!mounted) return;
        if (!r.ok) {
          setDbError(data.error ?? m.dbLoadFailed);
          setDbOverview(null);
          return;
        }
        if (!Array.isArray(data.tables)) {
          setDbError(m.dbInvalidResponse);
          setDbOverview(null);
          return;
        }
        setDbError(null);
        setDbOverview({ tables: data.tables });
      })
      .catch(() => {
        if (!mounted) return;
        setDbError(m.dbNetworkError);
        setDbOverview(null);
      });
    return () => {
      mounted = false;
    };
  }, [m.dbLoadFailed, m.dbInvalidResponse, m.dbNetworkError]);

  useEffect(() => {
    let mounted = true;
    fetch('/api/admin/user-activity?days=7', { credentials: 'include' })
      .then(async (r) => {
        const data = (await r.json().catch(() => ({}))) as { items?: ActivityRow[]; error?: string };
        if (!mounted) return;
        if (!r.ok || !Array.isArray(data.items)) {
          setActivityError(data.error ?? m.dbLoadFailed);
          setActivityItems([]);
          return;
        }
        setActivityError(null);
        setActivityItems(data.items);
      })
      .catch(() => {
        if (!mounted) return;
        setActivityError(m.dbNetworkError);
        setActivityItems([]);
      });
    return () => {
      mounted = false;
    };
  }, [m.dbLoadFailed, m.dbNetworkError]);

  useEffect(() => {
    let mounted = true;
    fetch('/api/admin/permission-matrix', { credentials: 'include' })
      .then(async (r) => {
        const data = (await r.json().catch(() => ({}))) as { items?: PermissionRow[]; error?: string };
        if (!mounted) return;
        if (!r.ok || !Array.isArray(data.items)) {
          setPermissionError(data.error ?? m.dbLoadFailed);
          setPermissionRows([]);
          return;
        }
        setPermissionError(null);
        setPermissionRows(data.items);
      })
      .catch(() => {
        if (!mounted) return;
        setPermissionError(m.dbNetworkError);
        setPermissionRows([]);
      });
    return () => {
      mounted = false;
    };
  }, [m.dbLoadFailed, m.dbNetworkError]);

  const grouped = useMemo(() => {
    if (!dbOverview?.tables.length) return [];
    const order: DbOverviewGroup[] = [
      'auth',
      'content',
      'media',
      'bookings',
      'tools',
      'office',
      'system',
    ];
    const map = new Map<DbOverviewGroup, DbOverviewTable[]>();
    for (const row of dbOverview.tables) {
      const list = map.get(row.group) ?? [];
      list.push(row);
      map.set(row.group, list);
    }
    return order
      .filter((g) => map.has(g))
      .map((g) => ({ group: g, rows: map.get(g)!, label: getInternalDbGroupLabel(lang, g) }));
  }, [dbOverview, lang]);

  return (
    <div className="app-shell section">
      <SectionHeader eyebrow={m.dashboardEyebrow} title={m.dashboardTitle} text={m.dashboardLead} />
      <div className="grid-2">
        <Card strong>
          <h3>{m.overviewTitle}</h3>
          {statsLoading ? <p className="muted-text">{m.loadingStats}</p> : null}
          <p className="admin-stat-line">
            {m.statUsers}: {stats.users}
          </p>
          <p className="admin-stat-line">
            {m.statCategories}: {stats.categories}
          </p>
          <p className="admin-stat-line">
            {m.statAudits}: {stats.audits}
          </p>
          {!isAdminRole ? <p className="muted-text admin-rbac-hint">{m.rbacStatsHint}</p> : null}
        </Card>
        <Card>
          <h3>{m.quickActionsTitle}</h3>
          <div className="admin-quick-links">
            {isAdmin ? (
              <Link href="/admin/feedback" className="btn btn-ghost">
                {lang === 'hu' ? 'Visszajelzések' : 'Feedback'}
              </Link>
            ) : null}
            {isAdminRole ? (
              <Link href="/admin/users" className="btn btn-primary">
                {m.linkUsers}
              </Link>
            ) : null}
            <Link href="/admin/categories" className="btn btn-secondary">
              {m.linkCategories}
            </Link>
            <Link href="/admin/content" className="btn btn-secondary">
              {m.linkContent}
            </Link>
            <Link href="/admin/search-analytics" className="btn btn-ghost">
              {lang === 'hu' ? 'Keresési analytics' : 'Search analytics'}
            </Link>
            <Link href="/admin/integrations" className="btn btn-ghost">
              {m.linkIntegrations}
            </Link>
            <Link href="/admin/office" className="btn btn-ghost">
              {m.linkOfficeInternal}
            </Link>
            {isAdminRole ? (
              <Link href="/admin/audit" className="btn btn-ghost">
                {m.linkAudit}
              </Link>
            ) : null}
            {isAdminRole ? (
              <Link href="/admin/feature-flags" className="btn btn-ghost">
                {m.linkFeatureFlags}
              </Link>
            ) : null}
            {isAdminRole ? (
              <Link href="/admin/dependency-risk" className="btn btn-ghost">
                {m.linkDependencyRisk}
              </Link>
            ) : null}
            {isAdminRole ? (
              <Link href="/admin/retention" className="btn btn-ghost">
                {lang === 'hu' ? 'Retention' : 'Retention'}
              </Link>
            ) : null}
            {isAdminRole ? (
              <Link href="/admin/site-builder" className="btn btn-ghost">
                {lang === 'hu' ? 'Builder Studio' : 'Builder Studio'}
              </Link>
            ) : null}
          </div>
        </Card>
      </div>

      <div className="admin-db-overview">
        <SectionHeader eyebrow={m.dbOverviewEyebrow} title={m.dbOverviewTitle} text={m.dbOverviewLead} />
        {dbError ? <p className="admin-error-text">{dbError}</p> : null}
        {!dbError && !dbOverview ? <p className="muted-text">{m.loading}</p> : null}
        {!dbError && !!dbOverview && grouped.length === 0 ? <p className="muted-text">{m.dbEmpty}</p> : null}
        {grouped.map(({ group, rows, label }) => (
          <section key={group} className="admin-db-group" aria-labelledby={`db-group-${group}`}>
            <h3 id={`db-group-${group}`} className="admin-db-group-title">
              {label}
            </h3>
            <div className="admin-db-grid">
              {rows.map((row) => {
                const copy = getInternalDbTableCopy(lang, row.key, { title: row.labelHu, description: row.descriptionHu });
                return (
                  <article key={row.key} className="admin-db-card">
                    <div className="admin-db-model">{row.model}</div>
                    <div>
                      <strong>{row.count.toLocaleString(locale)}</strong>
                      <span className="muted-text"> {m.dbRowSuffix}</span>
                    </div>
                    <h4 className="admin-card-title">{copy.title}</h4>
                    <p className="admin-db-desc">{copy.description}</p>
                    <div className="admin-db-card-footer">
                      {row.href ? (
                        <Link href={row.href} className="btn btn-secondary">
                          {m.dbOpen}
                        </Link>
                      ) : (
                        <span className="muted-text admin-db-footer-note">{m.dbNoAdminUrl}</span>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <div className="admin-db-overview">
        <SectionHeader
          eyebrow={lang === 'hu' ? 'Működés' : 'Operations'}
          title={lang === 'hu' ? 'User activity feed (7 nap)' : 'User activity feed (7 days)'}
          text={lang === 'hu' ? 'Legaktívabb operátorok az audit napló alapján.' : 'Top active operators based on audit logs.'}
        />
        {activityError ? <p className="admin-error-text">{activityError}</p> : null}
        {!activityError && activityItems.length === 0 ? <p className="muted-text">{m.loading}</p> : null}
        <div className="admin-db-grid">
          {activityItems.map((a) => (
            <article key={`${a.actorName}-${a.lastActionAt}`} className="admin-db-card">
              <div className="admin-db-model">{a.actorRole}</div>
              <h4 className="admin-card-title">{a.actorName}</h4>
              <p className="admin-db-desc">
                {lang === 'hu' ? 'Műveletek:' : 'Actions:'} <strong>{a.totalActions}</strong>
              </p>
              <p className="admin-db-desc">
                {lang === 'hu' ? 'Utolsó:' : 'Last:'} {new Date(a.lastActionAt).toLocaleString(locale)}
              </p>
              <p className="admin-db-desc">
                {a.topActions.map((x) => `${x.action} (${x.count})`).join(', ')}
              </p>
            </article>
          ))}
        </div>
      </div>

      <div className="admin-db-overview">
        <SectionHeader
          eyebrow={lang === 'hu' ? 'RBAC' : 'RBAC'}
          title={lang === 'hu' ? 'Permission matrix' : 'Permission matrix'}
          text={lang === 'hu' ? 'Office/Admin jogosultságok áttekintése.' : 'Office/Admin capability overview.'}
        />
        {permissionError ? <p className="admin-error-text">{permissionError}</p> : null}
        {!permissionError && permissionRows.length === 0 ? <p className="muted-text">{m.loading}</p> : null}
        <div className="admin-db-grid">
          {permissionRows.map((p) => (
            <article key={p.capability} className="admin-db-card">
              <div className="admin-db-model">{p.area}</div>
              <h4 className="admin-card-title">{p.capability}</h4>
              <p className="admin-db-desc">
                OFFICE: {p.office ? 'yes' : 'no'} · ADMIN: {p.admin ? 'yes' : 'no'}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
