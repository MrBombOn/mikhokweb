/**
 * @file Lábléc – statikus linkek és rövid szervezeti szöveg
 *
 * @description
 * **Szerverkomponens** (nincs `'use client'`), mert nincs interaktív állapot.
 * A linkek a fő modulokra mutatnak; a szövegek jelenleg magyarul fixek (később
 * `t(lang)`-re vihetők, ha a lábléc is kétnyelvű lesz).
 */
import Link from 'next/link';
import { BrandMark } from '@/components/brand/BrandMark';

export function Footer() {
  return (
    <footer className="footer">
      <div className="app-shell footer-inner">
        <div>
          <div className="footer-brand-row">
            <BrandMark variant="footer" aria-label="PTE MIK HÖK" />
          </div>
          <p className="footer-brand-lead">
            Hallgatói tájékoztatás, közösségi információk és adminisztratív tartalmak egy egységes webes felületen.
          </p>
        </div>
        <div>
          <strong>Fő részek</strong>
          <div className="stack" style={{ marginTop: 12 }}>
            <Link href="/news">Hírek</Link>
            <Link href="/calendar">Naptár</Link>
            <Link href="/calculator">KKI kalkulátor</Link>
            <Link href="/gallery">Galéria</Link>
          </div>
        </div>
        <div>
          <strong>További oldalak</strong>
          <div className="stack" style={{ marginTop: 12 }}>
            <Link href="/guides">Útmutatók</Link>
            <Link href="/about">About Us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
