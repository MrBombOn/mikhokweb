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

export default function NotFound() {
  return (
    <div className="app-shell section">
      <h2 style={{ color: 'var(--text)' }}>404 – Az oldal nem található</h2>
      <p style={{ color: 'var(--muted)' }}>A keresett útvonal nem létezik.</p>
      <Link href="/" className="btn btn-primary" style={{ marginTop: 16, display: 'inline-block' }}>
        Vissza a főoldalra
      </Link>
    </div>
  );
}
