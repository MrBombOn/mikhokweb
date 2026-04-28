/**
 * @file Globális betöltő UI (App Router `loading.tsx`)
 *
 * @description
 * Amikor egy útvonal **aszinkron adatot** vagy **lassú szerverkomponenst** tölt,
 * a Next.js automatikusan megjeleníti ezt a fájl exportját a `children` helyén
 * (Suspense határ nélkül is, route szinten).
 *
 * @akadálymentesség
 * - `aria-busy="true"`: képernyőolvasók számára jelezzük, hogy tartalom töltődik.
 * - `aria-live="polite"`: változás bejelentése nem vágja félbe a felhasználót.
 */
export default function Loading() {
  return (
    <div className="app-shell section" aria-busy="true" aria-live="polite">
      <p style={{ color: 'var(--muted)' }}>Betöltés…</p>
    </div>
  );
}
