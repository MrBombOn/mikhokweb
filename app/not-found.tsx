/**
 * @file 404 – nem létező útvonal; szövegek SSOT (`messages.notFound`, `messages.nav`)
 */
'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { PublicPageShell } from '@/components/layout/PublicPageShell';
import { useApp } from '@/components/layout/AppProvider';
import { AlertTriangleIcon, HomeIcon } from '@/components/ui/Icons';
import { t } from '@/lib/content';
import { SITE_NAME } from '@/lib/seo';

export default function NotFound() {
  const { lang } = useApp();
  const n = t(lang).notFound;
  const nav = t(lang).nav;

  useEffect(() => {
    document.title = `${n.title} | ${SITE_NAME}`;
    let el = document.querySelector('meta[name="description"]');
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('name', 'description');
      document.head.appendChild(el);
    }
    el.setAttribute('content', n.text);
  }, [lang, n.title, n.text]);

  return (
    <PublicPageShell>
      <section className="section state-shell">
        <div className="card state-card">
          <p className="state-eyebrow">{n.codeLabel}</p>
          <AlertTriangleIcon className="state-icon" />
          <h2 className="state-title">{n.title}</h2>
          <p className="state-text">{n.text}</p>
          <div className="state-actions">
            <Link href="/" className="btn btn-primary">
              <HomeIcon className="icon--sm" />
              {n.backHome}
            </Link>
            <Link href="/news" className="btn btn-secondary">
              {nav.news}
            </Link>
          </div>
        </div>
      </section>
    </PublicPageShell>
  );
}
