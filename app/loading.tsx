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
    <div className="app-shell section state-shell" aria-busy="true" aria-live="polite">
      <div className="card state-card">
        <p className="state-eyebrow">Betöltés</p>
        <h2 className="state-title">Kis türelmet</h2>
        <p className="state-text">Az oldal tartalma éppen frissül, hamarosan megjelenik.</p>
      </div>
    </div>
  );
}
