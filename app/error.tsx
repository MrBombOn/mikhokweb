/**
 * @file Route szintű hiba boundary (`error.tsx`)
 *
 * @description
 * Ha egy **kliens- vagy szerverkomponens** kivételt dob a fa alatt, a Next.js
 * ezt a komponenst jeleníti meg. **Kötelező** `'use client'`, mert a `reset()`
 * gomb eseménykezelőt használ.
 *
 * @props
 * - `error`: a dobott `Error` példány (üzenet megjelenítésre); `digest` opcionálisan
 *   szerverhibák összerendelésére (Next belső).
 * - `reset`: újrapróbálkozás – újrarendereli a sikertelen szegmens fát.
 */
'use client';

import Link from 'next/link';
import { PublicPageShell } from '@/components/layout/PublicPageShell';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <PublicPageShell>
      <section className="section state-shell">
        <div className="card state-card">
          <p className="state-eyebrow">Rendszerhiba</p>
          <h2 className="state-title">Valami hiba történt</h2>
          <p className="state-text">{error.message || 'A művelet jelenleg nem érhető el.'}</p>
          <div className="state-actions">
            <button type="button" className="btn btn-primary" onClick={() => reset()}>
              Újra
            </button>
            <Link href="/" className="btn btn-secondary">
              Főoldal
            </Link>
          </div>
        </div>
      </section>
    </PublicPageShell>
  );
}
