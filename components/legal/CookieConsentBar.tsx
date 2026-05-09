'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useApp } from '@/components/layout/AppProvider';
import { t } from '@/lib/content';

const STORAGE_KEY = 'hok_cookie_consent_v12';

export function CookieConsentBar() {
  const { lang } = useApp();
  const dict = t(lang);
  const p = dict.privacyPage;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const v = window.localStorage.getItem(STORAGE_KEY);
      setVisible(!v);
    } catch {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  function accept(mode: 'all' | 'essential') {
    try {
      window.localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      /* ignore */
    }
    setVisible(false);
  }

  return (
    <div className="cookie-consent-bar" role="dialog" aria-label={p.cookieBarAria}>
      <div className="cookie-consent-bar-inner app-shell">
        <p className="cookie-consent-bar-text">{p.cookieBarText}</p>
        <div className="cookie-consent-bar-actions">
          <Link className="btn btn-secondary btn-sm" href="/privacy">
            {p.cookieBarPrivacy}
          </Link>
          <button type="button" className="btn btn-secondary btn-sm" onClick={() => accept('essential')}>
            {p.cookieBarEssential}
          </button>
          <button type="button" className="btn btn-primary btn-sm" onClick={() => accept('all')}>
            {p.cookieBarAccept}
          </button>
        </div>
      </div>
    </div>
  );
}
