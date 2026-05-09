/**
 * @file Bejelentkezési modál – felhasználónév / jelszó + guest gyorsgomb
 */
'use client';

import type { FormEvent } from 'react';
import { useApp } from '@/components/layout/AppProvider';
import { t } from '@/lib/content';
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

  const dict = t(lang);
  const c = dict.common;

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    submitAdminLogin();
  }

  return (
    <AdminModal
      open={showAdminLogin}
      title={c.navSignIn}
      closeLabel={c.modalClose}
      onClose={closeAdminLogin}
      noWindowScroll
    >
      <form className="stack" onSubmit={onSubmit}>
        <div className="admin-login-head">
          <span className="btn btn-secondary icon-btn admin-login-shield" aria-hidden="true">
            <ShieldIcon />
          </span>
          <div>
            <p className="admin-login-lead">{c.loginModalLead}</p>
            <p className="admin-login-mode-hint">{c.loginModalModesHint}</p>
          </div>
        </div>
        <div className="modal-grid admin-login-grid">
          <label className="admin-login-field">
            <div className="admin-login-field-label">{c.loginUsernameLabel}</div>
            <input
              className="input"
              placeholder={c.loginUsernamePlaceholder}
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
            <div className="admin-login-field-label">{c.loginPasswordLabel}</div>
            <input
              className="input"
              type="password"
              placeholder={c.loginPasswordPlaceholder}
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
            {c.loginGuestMode}
          </button>
          <button className="btn btn-primary" type="submit" disabled={adminLoginPending}>
            {adminLoginPending ? c.loginSubmitting : c.navSignIn}
          </button>
        </div>
      </form>
    </AdminModal>
  );
}
