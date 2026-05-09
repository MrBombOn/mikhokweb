/**
 * @file Lábléc – linkek és szöveg SSOT (`messages.footer`, `messages.nav`)
 */
'use client';

import Link from 'next/link';
import { BrandMark } from '@/components/brand/BrandMark';
import { useApp } from '@/components/layout/AppProvider';
import { t } from '@/lib/content';

export function Footer() {
  const { lang } = useApp();
  const dict = t(lang);
  const f = dict.footer;
  const n = dict.nav;

  return (
    <footer className="footer">
      <div className="app-shell footer-inner">
        <div>
          <div className="footer-brand-row">
            <BrandMark variant="footer" aria-label={n.brandHomeAria} />
          </div>
          <p className="footer-brand-lead">{f.lead}</p>
        </div>
        <div>
          <strong>{f.mainSections}</strong>
          <div className="stack footer-link-stack">
            <Link href="/calendar">{n.calendar}</Link>
            <Link href="/calculator">{n.calculator}</Link>
            <Link href="/gallery">{n.gallery}</Link>
          </div>
        </div>
        <div>
          <strong>{f.morePages}</strong>
          <div className="stack footer-link-stack">
            <Link href="/search">{n.search}</Link>
            <Link href="/guides">{n.guides}</Link>
            <Link href="/about">{n.about}</Link>
            <Link href="/office">{n.office}</Link>
            <Link href="/privacy">{n.privacy}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
