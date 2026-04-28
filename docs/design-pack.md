# Design-pack → web (D2)

A **`design-pack/`** mappa a szervezettől kapott forrás exportok tárolója; a **Next.js** alkalmazás a statikus **`public/brand/`** útvonalon szolgálja ki a böngészőnek a ténylegesen használt fájlokat.

## 1. Kötelező lépés (deploy / PR előtt)

1. Gyűjtsd össze a jóváhagyott exportokat (SVG ajánlott, nagy PNG opcionális) a belső brand útmutató szerint.
2. Nevezd el őket **stabil, beszédes** nevekkel (pl. `logo-hok-mark-color.svg`, `logo-hok-wordmark-dark-bg.svg`).
3. Másold a **kiválasztott** fájlokat a repo **`public/brand/`** mappájába, **felülírva** a jelenlegi helyettes (placeholder) SVG-ket, ha a fájlnevek megegyeznek.
4. Ha más a fájlnév, frissítsd a **`components/brand/BrandMark.tsx`** importált útvonalait (vagy nevezd át az exportokat az alábbi szerződésre).

## 2. Jelenlegi szerződés (fájlnevek)

| Fájl | Szerep |
|------|--------|
| `logo-hok-mark-color.svg` | Kompakt **jelvény** – világos UI háttér (navbar, belső fejléc). |
| `logo-hok-mark-on-dark.svg` | Ugyanakkora jelvény – sötét UI (sötét téma). |
| `logo-hok-wordmark-light-bg.svg` | **Szójel** – világos felület (footer, hero). |
| `logo-hok-wordmark-dark-bg.svg` | Szójel – sötét felület. |

A **`BrandMark`** komponens két `<img>` elemet renderel; a megjelenített változatot a globális CSS váltja (`html[data-theme='dark']`), így nincs szükség kliensoldali `theme` prop-ra a lábléc és SSR részeknél.

## 3. Megjelenési helyek (D2 zónák)

- **Topbar:** `Navbar` – `BrandMark variant="nav"`.
- **Hero:** `LandingHero` – `BrandMark variant="hero"` + `.hok-logo-hero` wrapper.
- **Lábléc:** `Footer` – `BrandMark variant="footer"`.
- **Belső layout:** `app/(internal)/layout.tsx` – `BrandMark variant="internal"`.

## 4. `next/image` és SVG

A **`BrandMark`** a `next/image` komponenst használja **`unoptimized`** móddal (statikus SVG a `public/brand/` alól, fix `width` / `height`). A főoldali hero változat **`priority`** kapcsolót kap az LCP miatt.

Ha később **PNG** export kerül be (pl. retina), a `unoptimized` eltávolítása és `sizes` finomhangolása lehetséges – frissítsd ezt a dokumentumot és a `BrandMark` propsait.

## 5. További olvasmány

- `design-pack/README.md` – forrás mappa szabályai.
- `PROJECT_MASTER_SPEC.md` §32.2–§32.3 – brand jelenlét és UI proof elvárások.
- `docs/design-system.md` – tokenek és vizuális szerződés.
