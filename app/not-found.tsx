/**
 * @file 404 – nem létező útvonal (`not-found.tsx`)
 *
 * @description
 * Akkor fut le, ha `notFound()` hívódik kódból, vagy az URL egyik szegmense sem
 * illeszkedik egyetlen `page.tsx`-re / route handlerre.
 *
 * @navigáció
 * A `Link` komponens **kliensoldali** navigációt végez a főoldalra (`prefetch` alapértelmezés szerint).
 */
import Link from 'next/link';
import { PublicPageShell } from '@/components/layout/PublicPageShell';

export default function NotFound() {
  return (
    <PublicPageShell>
      <section className="section state-shell">
        <div className="card state-card">
          <p className="state-eyebrow">404</p>
          <h2 className="state-title">Az oldal nem található</h2>
          <p className="state-text">A keresett útvonal nem létezik, vagy időközben át lett helyezve.</p>
          <div className="state-actions">
            <Link href="/" className="btn btn-primary">
              Vissza a főoldalra
            </Link>
            <Link href="/news" className="btn btn-secondary">
              Hírek
            </Link>
          </div>
        </div>
      </section>
    </PublicPageShell>
  );
}
