/**
 * @file Bejelentkezési modál – felhasználónév / jelszó + guest gyorsgomb
 *
 * @description
 * Az `AdminModal` primitívet használja (lásd `components/ui/AdminModal.tsx`).
 * A tényleges POST hívás az `AppProvider.submitAdminLogin`-ben történik (`/api/auth/login`).
 */
'use client';

import type { FormEvent } from 'react';
import { useApp } from '@/components/layout/AppProvider';
import { ShieldIcon } from '@/components/ui/Icons';
import { AdminModal } from '@/components/ui/AdminModal';

export function AdminLoginModal() {
  const {
    lang,
    showAdminLogin,
    closeAdminLogin,
    loginForm,
    setLoginForm,
    submitAdminLogin,
    setGuestMode,
    adminLoginPending,
    adminLoginError,
    clearAdminLoginError,
  } = useApp();

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    submitAdminLogin();
  }

  return (
    <AdminModal
      open={showAdminLogin}
      title={lang === 'hu' ? 'Bejelentkezés' : 'Sign in'}
      closeLabel={lang === 'hu' ? 'Bezárás' : 'Close'}
      onClose={closeAdminLogin}
    >
      <form className="stack" onSubmit={onSubmit}>
        <div className="admin-login-head">
          <span className="btn btn-secondary icon-btn admin-login-shield" aria-hidden="true">
            <ShieldIcon />
          </span>
          <div>
            <p className="admin-login-lead">
              {lang === 'hu'
                ? 'Felhasználónév és jelszó a seedelt adatbázis felhasználójával. Guest mód: session törlése.'
                : 'Username and password match a seeded database user. Guest mode clears the session.'}
            </p>
          </div>
        </div>
        <div className="modal-grid admin-login-grid">
          <label className="admin-login-field">
            <div className="admin-login-field-label">{lang === 'hu' ? 'Felhasználónév' : 'Username'}</div>
            <input
              className="input"
              placeholder={lang === 'hu' ? 'Felhasználónév' : 'Username'}
              value={loginForm.username}
              autoComplete="username"
              autoFocus
              onChange={(e) => {
                if (adminLoginError) clearAdminLoginError();
                setLoginForm({ ...loginForm, username: e.target.value });
              }}
              disabled={adminLoginPending}
            />
          </label>
          <label className="admin-login-field">
            <div className="admin-login-field-label">{lang === 'hu' ? 'Jelszó' : 'Password'}</div>
            <input
              className="input"
              type="password"
              placeholder={lang === 'hu' ? 'Jelszó' : 'Password'}
              value={loginForm.password}
              autoComplete="current-password"
              onChange={(e) => {
                if (adminLoginError) clearAdminLoginError();
                setLoginForm({ ...loginForm, password: e.target.value });
              }}
              disabled={adminLoginPending}
            />
          </label>
        </div>
        {adminLoginError ? <p className="admin-login-error">{adminLoginError}</p> : null}
        <div className="news-form-actions">
          <button className="btn btn-secondary" type="button" onClick={setGuestMode} disabled={adminLoginPending}>
            {lang === 'hu' ? 'Guest mód' : 'Guest mode'}
          </button>
          <button className="btn btn-primary" type="submit" disabled={adminLoginPending}>
            {adminLoginPending ? (lang === 'hu' ? 'Belépés...' : 'Signing in...') : lang === 'hu' ? 'Belépés' : 'Sign in'}
          </button>
        </div>
      </form>
    </AdminModal>
  );
}
