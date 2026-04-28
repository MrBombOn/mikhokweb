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

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="app-shell section">
      <h2 style={{ color: 'var(--text)' }}>Hiba történt</h2>
      <p style={{ color: 'var(--muted)' }}>{error.message}</p>
      <button type="button" className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => reset()}>
        Újra
      </button>
    </div>
  );
}
