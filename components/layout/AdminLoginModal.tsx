/**
 * @file Bejelentkezési modál – felhasználónév / jelszó + guest gyorsgomb
 *
 * @description
 * Az `AdminModal` primitívet használja (lásd `components/ui/AdminModal.tsx`).
 * A tényleges POST hívás az `AppProvider.submitAdminLogin`-ben történik (`/api/auth/login`).
 */
'use client';

import { useApp } from '@/components/layout/AppProvider';
import { ShieldIcon } from '@/components/ui/Icons';
import { AdminModal } from '@/components/ui/AdminModal';

export function AdminLoginModal() {
  const { lang, showAdminLogin, closeAdminLogin, loginForm, setLoginForm, submitAdminLogin, setGuestMode } = useApp();
  return (
    <AdminModal open={showAdminLogin} title={lang === 'hu' ? 'Bejelentkezés' : 'Sign in'} onClose={closeAdminLogin}>
      <div className="stack">
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <span className="btn btn-secondary icon-btn" aria-hidden="true">
            <ShieldIcon />
          </span>
          <div>
            <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.7 }}>
              {lang === 'hu'
                ? 'Felhasználónév és jelszó a seedelt adatbázis felhasználójával. Guest mód: session törlése.'
                : 'Username and password match a seeded database user. Guest mode clears the session.'}
            </p>
          </div>
        </div>
        <div className="modal-grid" style={{ marginTop: 18 }}>
          <label>
            <div style={{ marginBottom: 8 }}>{lang === 'hu' ? 'Felhasználónév' : 'Username'}</div>
            <input
              className="input"
              placeholder={lang === 'hu' ? 'Felhasználónév' : 'Username'}
              value={loginForm.username}
              onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
            />
          </label>
          <label>
            <div style={{ marginBottom: 8 }}>{lang === 'hu' ? 'Jelszó' : 'Password'}</div>
            <input
              className="input"
              type="password"
              placeholder={lang === 'hu' ? 'Jelszó' : 'Password'}
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
            />
          </label>
        </div>
        <div className="news-form-actions">
          <button className="btn btn-secondary" type="button" onClick={setGuestMode}>
            {lang === 'hu' ? 'Guest mód' : 'Guest mode'}
          </button>
          <button className="btn btn-primary" type="button" onClick={submitAdminLogin}>
            {lang === 'hu' ? 'Belépés' : 'Sign in'}
          </button>
        </div>
      </div>
    </AdminModal>
  );
}
