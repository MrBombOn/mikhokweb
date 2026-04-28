/** @file Admin – felhasználók `/admin/users` */
'use client';

import { useEffect, useState } from 'react';
import { Card, SectionHeader } from '@/components/ui/Core';

type UserRow = { id: string; username: string; role: 'OFFICE' | 'ADMIN'; createdAt: string };

export default function AdminUsersPage() {
  const [items, setItems] = useState<UserRow[]>([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'OFFICE' | 'ADMIN'>('OFFICE');
  const [error, setError] = useState('');

  async function reload() {
    const r = await fetch('/api/users', { credentials: 'include' });
    const data = (await r.json().catch(() => ({}))) as { items?: UserRow[]; error?: string };
    if (!r.ok) {
      setError(data.error ?? 'Betöltési hiba');
      return;
    }
    setError('');
    setItems(Array.isArray(data.items) ? data.items : []);
  }

  useEffect(() => {
    void reload();
  }, []);

  async function createUser() {
    const r = await fetch('/api/users', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, role }),
    });
    const data = (await r.json().catch(() => ({}))) as { error?: string };
    if (!r.ok) {
      setError(data.error ?? 'Mentési hiba');
      return;
    }
    setUsername('');
    setPassword('');
    setRole('OFFICE');
    setError('');
    await reload();
  }

  return (
    <div className="app-shell section">
      <SectionHeader eyebrow="Admin" title="Felhasználók" text="Felhasználókezelés és szerepkörök (RBAC)." />
      <Card>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <input
            className="input"
            placeholder="username"
            aria-label="Felhasználónév"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="input"
            type="password"
            placeholder="password (min 8)"
            aria-label="Jelszó (minimum 8 karakter)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <select className="input" aria-label="Szerepkör" value={role} onChange={(e) => setRole(e.target.value as 'OFFICE' | 'ADMIN')}>
            <option value="OFFICE">OFFICE</option>
            <option value="ADMIN">ADMIN</option>
          </select>
          <button type="button" className="btn btn-primary" onClick={() => void createUser()}>Létrehozás</button>
        </div>
        {error ? <p role="alert" style={{ color: 'var(--danger)', marginTop: 12 }}>{error}</p> : null}
      </Card>
      <div style={{ marginTop: 14 }} className="grid-2">
        {items.map((it) => (
          <Card key={it.id}>
            <h3 style={{ margin: '0 0 8px 0' }}>{it.username}</h3>
            <p style={{ color: 'var(--muted)', margin: 0 }}>{it.role}</p>
            <p style={{ color: 'var(--muted)', margin: '6px 0 0 0', fontSize: 13 }}>{new Date(it.createdAt).toLocaleString()}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
