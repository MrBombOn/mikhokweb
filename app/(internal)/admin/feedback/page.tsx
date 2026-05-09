/**
 * @file Admin – visszajelzések `/admin/feedback`
 *
 * @description
 * P3: visszajelzés admin workflow (lista, státusz, assignee, belső megjegyzés).
 * API: `GET /api/admin/feedback` + `PATCH /api/admin/feedback/[id]`.
 */
'use client';

import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { useApp } from '@/components/layout/AppProvider';
import { Card, SectionHeader } from '@/components/ui/Core';
import { ErrorState } from '@/components/ui/ErrorState';
import { EmptyState } from '@/components/ui/EmptyState';
import { Skeleton } from '@/components/ui/Skeleton';
import { AdminModal } from '@/components/ui/AdminModal';
import { t } from '@/lib/content';

import type { FeedbackStatus } from '@prisma/client';

type FeedbackRow = {
  id: string;
  module: string;
  message: string;
  email: string | null;
  status: FeedbackStatus;
  assignee: { id: string; username: string; role: 'OFFICE' | 'ADMIN' } | null;
  assigneeId: string | null;
  internalNote: string;
  createdAt: string;
  updatedAt: string;
};

type UserRow = { id: string; username: string; role: 'OFFICE' | 'ADMIN' };

type Draft = {
  status: Exclude<FeedbackRow['status'], 'closed'> | 'closed';
  assigneeId: string | null;
  internalNote: string;
};

function StatusBadge({ status }: { status: FeedbackRow['status'] }) {
  const tone = status === 'closed' ? 'badge badge--muted' : status === 'in_progress' ? 'badge badge--warn' : 'badge badge--primary';
  return <span className={tone}>{status}</span>;
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label>
      <div className="landing-news-field-label">{label}</div>
      {children}
    </label>
  );
}

export default function AdminFeedbackPage() {
  const { lang, isAdminRole, toast } = useApp();
  const m = t(lang).internal;

  const eyebrow = lang === 'hu' ? 'Admin' : 'Admin';
  const title = lang === 'hu' ? 'Visszajelzések' : 'Feedback';
  const lead = lang === 'hu' ? 'P3: státusz + assignee + belső megjegyzés.' : 'P3: status + assignee + internal note.';

  const [loading, setLoading] = useState(true);
  const [listError, setListError] = useState(false);
  const [items, setItems] = useState<FeedbackRow[]>([]);

  const [status, setStatus] = useState<'all' | FeedbackStatus>('all');
  const [module, setModule] = useState('');
  const [q, setQ] = useState('');
  const [limit, setLimit] = useState('80');

  const [activeId, setActiveId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [users, setUsers] = useState<UserRow[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);

  const locale = useMemo(() => (lang === 'hu' ? 'hu-HU' : 'en-US'), [lang]);

  const reloadUsers = useCallback(async () => {
    if (!isAdminRole) return;
    setUsersLoading(true);
    const r = await fetch('/api/users', { credentials: 'include' });
    const data = (await r.json().catch(() => ({}))) as { items?: UserRow[]; error?: string };
    if (r.ok && Array.isArray(data.items)) setUsers(data.items);
    else setUsers([]);
    setUsersLoading(false);
  }, [isAdminRole]);

  const reload = useCallback(async () => {
    setLoading(true);
    setListError(false);
    try {
      const sp = new URLSearchParams();
      if (status !== 'all') sp.set('status', status);
      if (module.trim()) sp.set('module', module.trim());
      if (q.trim()) sp.set('q', q.trim());
      if (limit.trim()) sp.set('limit', limit.trim());

      const r = await fetch(`/api/admin/feedback?${sp.toString()}`, { credentials: 'include' });
      const data = (await r.json().catch(() => ({}))) as { items?: FeedbackRow[]; error?: string };
      if (!r.ok) {
        setItems([]);
        setListError(true);
        return;
      }
      setItems(Array.isArray(data.items) ? data.items : []);
    } catch {
      setItems([]);
      setListError(true);
    } finally {
      setLoading(false);
    }
  }, [limit, module, q, status]);

  useEffect(() => {
    void reload();
  }, [reload]);

  useEffect(() => {
    void reloadUsers();
  }, [reloadUsers]);

  const activeItem = useMemo(() => items.find((i) => i.id === activeId) ?? null, [activeId, items]);

  useEffect(() => {
    if (!activeItem) return;
    setDraft({
      status: activeItem.status,
      assigneeId: activeItem.assigneeId,
      internalNote: activeItem.internalNote ?? '',
    });
  }, [activeItem]);

  const closeModal = () => {
    setActiveId(null);
    setDraft(null);
  };

  async function exportCsv() {
    const sp = new URLSearchParams();
    if (status !== 'all') sp.set('status', status);
    if (module.trim()) sp.set('module', module.trim());
    if (q.trim()) sp.set('q', q.trim());
    if (limit.trim()) sp.set('limit', limit.trim());
    const url = `/api/admin/feedback/export?${sp.toString()}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  async function save() {
    if (!activeId || !draft) return;
    const body: { status?: Draft['status']; assigneeId?: string | null; internalNote?: string } = {
      status: draft.status,
      internalNote: draft.internalNote.trim() || undefined,
    };

    if (isAdminRole) {
      body.assigneeId = draft.assigneeId;
    }

    const r = await fetch(`/api/admin/feedback/${encodeURIComponent(activeId)}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = (await r.json().catch(() => ({}))) as { error?: string; details?: unknown };
    if (!r.ok) {
      toast(data.error ?? 'Mentés sikertelen.', 'warning');
      return;
    }
    toast('Visszajelzés frissítve.', 'success');
    closeModal();
    await reload();
  }

  return (
    <div className="app-shell section">
      <SectionHeader eyebrow={eyebrow} title={title} text={lead} />

      {loading ? <Skeleton variant="searchResults" /> : null}

      {!loading && listError ? (
        <ErrorState title="Betöltési hiba" message={m.dbNetworkError} onRetry={() => void reload()} retryLabel={m.contentRetry} />
      ) : null}

      {!loading && !listError ? (
        <Card>
          <div className="admin-toolbar">
            <select
              className="select"
              value={status}
              onChange={(e) => setStatus(e.target.value as 'all' | FeedbackStatus)}
              aria-label="status"
            >
              <option value="all">all</option>
              <option value="new">new</option>
              <option value="in_progress">in_progress</option>
              <option value="closed">closed</option>
            </select>
            <input className="input" value={module} onChange={(e) => setModule(e.target.value)} placeholder="module" aria-label="module" />
            <input className="input" value={q} onChange={(e) => setQ(e.target.value)} placeholder="q (message/email/note)" aria-label="q" />
            <input className="input" value={limit} onChange={(e) => setLimit(e.target.value)} placeholder="limit" aria-label="limit" />
            <button type="button" className="btn btn-primary" onClick={() => void reload()}>
              Apply
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => void exportCsv()}>
              Export CSV
            </button>
          </div>

          {items.length ? (
            <div className="stack">
              {items.map((it) => (
                <div key={it.id} className="card admin-audit-item">
                  <div className="admin-audit-line">
                    <strong>{it.module}</strong> <StatusBadge status={it.status} />
                  </div>
                  <p className="admin-audit-line">{it.message.slice(0, 220)}{it.message.length > 220 ? '…' : ''}</p>
                  <p className="admin-audit-line admin-audit-line--muted">
                    {it.email ? `email=${it.email}` : 'email=—'} · assigned={it.assignee ? it.assignee.username : '—'}
                  </p>
                  <div className="admin-audit-time">{new Date(it.updatedAt).toLocaleString(locale)}</div>
                  <div className="admin-module-actions">
                    <button type="button" className="btn btn-secondary" onClick={() => setActiveId(it.id)}>
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState title="Nincs találat" description="A szűrők alapján nincs megjeleníthető visszajelzés." />
          )}
        </Card>
      ) : null}

      <AdminModal
        open={activeId != null}
        title={`Feedback ${activeId ?? ''}`}
        onClose={closeModal}
      >
        {activeItem && draft ? (
          <div className="stack">
            <p className="muted-text text-pre-wrap">
              <strong>Message:</strong> {activeItem.message}
            </p>
            <div className="modal-grid">
              <Field label="status">
                <select
                  className="select"
                  value={draft.status}
                  onChange={(e) => setDraft((p) => (p ? { ...p, status: e.target.value as Draft['status'] } : p))}
                >
                  <option value="new">new</option>
                  <option value="in_progress">in_progress</option>
                  <option value="closed">closed</option>
                </select>
              </Field>
              {isAdminRole ? (
                <Field label="assignee">
                  <select
                    className="select"
                    value={draft.assigneeId ?? ''}
                    onChange={(e) =>
                      setDraft((p) => (p ? { ...p, assigneeId: e.target.value ? e.target.value : null } : p))
                    }
                    disabled={usersLoading}
                  >
                    <option value="">Unassigned</option>
                    {users.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.username} ({u.role})
                      </option>
                    ))}
                  </select>
                </Field>
              ) : null}
              <Field label="internalNote">
                <textarea
                  className="input"
                  value={draft.internalNote}
                  onChange={(e) => setDraft((p) => (p ? { ...p, internalNote: e.target.value } : p))}
                />
              </Field>
            </div>
            <div className="news-form-actions">
              <button type="button" className="btn btn-primary" onClick={() => void save()}>
                Save
              </button>
              <button type="button" className="btn btn-secondary" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        ) : null}
      </AdminModal>
    </div>
  );
}

