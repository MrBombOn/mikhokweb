/** @file Staff értesítések – harang + panel (P8). */
'use client';

import { useCallback, useEffect, useState } from 'react';
import { useApp } from '@/components/layout/AppProvider';
import { t } from '@/lib/content';

type Row = {
  id: string;
  eventKey: string;
  severity: string;
  titleHu: string;
  titleEn: string;
  bodyHu: string;
  bodyEn: string;
  readAt: string | null;
  createdAt: string;
};

export function AdminNotificationBell() {
  const { lang, toast, isStaff } = useApp();
  const m = t(lang).internal;
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<Row[]>([]);
  const [unread, setUnread] = useState(0);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    if (!isStaff) return;
    setLoading(true);
    try {
      const r = await fetch('/api/admin/notifications?limit=40', { credentials: 'include' });
      const data = (await r.json().catch(() => ({}))) as { items?: Row[]; unreadCount?: number; error?: string };
      if (!r.ok) {
        setItems([]);
        setUnread(0);
        return;
      }
      setItems(Array.isArray(data.items) ? data.items : []);
      setUnread(typeof data.unreadCount === 'number' ? data.unreadCount : 0);
    } finally {
      setLoading(false);
    }
  }, [isStaff]);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    if (!open || !isStaff) return;
    const tmr = window.setInterval(() => void load(), 45000);
    return () => window.clearInterval(tmr);
  }, [open, load, isStaff]);

  async function markRead(id: string) {
    const r = await fetch(`/api/admin/notifications/${encodeURIComponent(id)}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ read: true }),
    });
    if (!r.ok) {
      toast(m.notificationsLoadError, 'warning');
      return;
    }
    await load();
  }

  async function markAllRead() {
    const r = await fetch('/api/admin/notifications/mark-all-read', {
      method: 'POST',
      credentials: 'include',
    });
    if (!r.ok) {
      toast(m.notificationsLoadError, 'warning');
      return;
    }
    await load();
  }

  if (!isStaff) return null;

  return (
    <div className="admin-notification-wrap">
      <button
        type="button"
        className="btn btn-secondary admin-notification-trigger"
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={m.notificationsOpen}
        onClick={() => setOpen((v) => !v)}
      >
        <span aria-hidden>🔔</span>
        {unread > 0 ? <span className="admin-notification-badge">{unread > 99 ? '99+' : unread}</span> : null}
      </button>
      {open ? (
        <div className="admin-notification-panel card" role="region" aria-label={m.notificationsTitle}>
          <div className="admin-notification-panel-head">
            <strong>{m.notificationsTitle}</strong>
            <div className="admin-notification-panel-actions">
              <button type="button" className="btn btn-ghost" onClick={() => void markAllRead()} disabled={!unread}>
                {m.notificationsMarkAllRead}
              </button>
              <button type="button" className="btn btn-ghost" onClick={() => setOpen(false)}>
                {m.notificationsClose}
              </button>
            </div>
          </div>
          {loading ? <p className="muted-text">{m.loading}</p> : null}
          {!loading && !items.length ? <p className="muted-text">{m.notificationsEmpty}</p> : null}
          <ul className="admin-notification-list">
            {items.map((it) => (
              <li key={it.id}>
                <button
                  type="button"
                  className={`admin-notification-item${it.readAt ? '' : ' admin-notification-item--unread'}`}
                  onClick={() => void markRead(it.id)}
                >
                  <div className="admin-notification-item-title">{lang === 'hu' ? it.titleHu : it.titleEn}</div>
                  <div className="admin-notification-item-body muted-text">{lang === 'hu' ? it.bodyHu : it.bodyEn}</div>
                  <div className="admin-notification-item-meta muted-text">
                    <code>{it.eventKey}</code> · {new Date(it.createdAt).toLocaleString(lang === 'hu' ? 'hu-HU' : 'en-US')}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
