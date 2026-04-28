'use client';

import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <main className="app-shell section state-shell">
          <div className="card state-card">
            <p className="state-eyebrow">Kritikus hiba</p>
            <h2 className="state-title">A rendszer átmenetileg nem elérhető</h2>
            <p className="state-text">{error.message || 'Váratlan hiba történt. Próbáld meg újra.'}</p>
            <div className="state-actions">
              <button type="button" className="btn btn-primary" onClick={() => reset()}>
                Újrapróbálkozás
              </button>
              <Link href="/" className="btn btn-secondary">
                Vissza a főoldalra
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
