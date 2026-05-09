# Mappa- és felelősségi felépítés (kanonikus)

Ez a fájl a **tényleges** repository-elrendezés és a fejlesztői konvenciók rövid SSOT-ja. A részletes modul–fájl leképezés: `docs/module-file-responsibility-map.md`. A master spec §23 faábrája irányelv; ettől eltérés itt legyen a hivatkozás.

## Gyökér

| Mappa / fájl | Szerep |
|----------------|--------|
| `app/` | Next.js App Router: layoutok, route-ok, `globals.css`, `api/`. |
| `components/` | Újrafelhasználható UI: `layout/`, `ui/`, `shared/`, `brand/`; domain modul UI: **`components/modules/<név>/`** (Fázis 4 pilot: `about`) vagy a régi helyen (`calendar/`, `news/`, …) amíg fokozatos migráció tart. |
| `features/` | Feature-first domain: `news`, `about`, `office`, `events`, `guides`, `gallery`, … Minden almappában rövid **`README.md`** (Fázis 4): exportok, `app/api/*`, UI hely. Fájlok: `types`, `schema`, `mapper`, `server`, `client` (ahol kész — lásd `news`). A naptár UI és foglalások részben `lib/` + `components/calendar/`; esemény API: `features/events`. |
| `lib/` | Auth, DB, i18n, validáció, security, observability, közös utilok. |
| `lib/layout/` | Layout SSOT **TS tükör** (pl. `topbar-layout.ts`): `next/image` intrinsic px ↔ `styles/design-tokens.css` `--layout-*` tokenek; a vizuális méret mindig a CSS változó. |
| `types/` | Kereszt-modul TypeScript típusok (ahol nem a `features/*` a tulajdonos). |
| `styles/` | `design-tokens.css`, `modules/*.css` (modulonként kivett CSS partialok, pl. `calculator.css`, `news.css`, `admin.css`). |
| `prisma/` | Séma, migrációk, seed. |
| `public/` | Statikus assetek (`brand/`, …). |
| `tests/` | Node tesztfuttatás (`npm run test`). |
| `docs/` | Spec, architektúra, naplók, auditok. **Belépés:** [`README.md`](./README.md); **magyar térkép:** [`TARTALOMJEGYZEK-MAGYAR.md`](./TARTALOMJEGYZEK-MAGYAR.md); vázlatok: [`checklists/`](./checklists/); **PDF export** (generált, nem a gitben): [`export/README.md`](./export/README.md). |
| `scripts/` | Segéd batch / dev scriptek; `prisma-env.cjs` — Prisma CLI előtt `.env` + `.env.local` betöltése. |
| `design-pack/`, `logopack/` | Design források (export a `public/brand` felé). |
| `content/` | *Nincs a repóban* — tartalom SSOT: Prisma + `app/api/*`; régi üres mappa eltávolítva. |

## `app/` – route-ok és csoportok

**Kötelező szabály:** publikus oldalak **csak** `app/(public)/…` alatt; belső (admin) **csak** `app/(internal)/…` alatt. A route group nevek `(public)` / `(internal)` **nem** szerepelnek az URL-ben.

Tilos üres vagy párhuzamos másoló mappa ugyanarra az útvonalra (pl. `app/about` **és** `app/(public)/about`) — a Next.js ütközést vagy kiszámíthatatlan feloldást okoz.

```
app/
├── layout.tsx, globals.css, error.tsx, loading.tsx, not-found.tsx
├── robots.ts, sitemap.ts
├── (public)/          → nyilvános oldalak (/ , /news, /calendar, …)
├── (internal)/        → /admin/* belső zóna
└── api/               → Route Handlers (REST)
```

## `components/` vs `features/`

| Réteg | Mikor ide kerül |
|--------|------------------|
| `components/modules/<domain>/` | **Új vagy migrált** nagy modul UI — egy mappa = egy route-modul (`AboutModule`, később mások). |
| `components/<domain>/` | **Legacy** elrendezés (naptár, hírek, …) amíg át nem kerül `components/modules/<domain>/` alá. |
| `features/<domain>/` | Megosztott domain logika + API szerződés + szerver oldali helper (news referencia minta). |
| `lib/` | Kereszt-feature infrastruktúra (auth, validation, mappers ha nem feature-specifikus). |

Új modulnál: először `features/<name>/` + vékony `app/api`, majd UI **`components/modules/<name>/`** (+ opcionális `README.md` a mappában). Lásd pilot: `components/modules/about/`.

## Fázis 4 – célfa („mit hova”)

**App Router:** az URL gyökere továbbra is `app/(public)/<route>/page.tsx` (+ `*PageClient.tsx`, metadata) — ide **ne** kerüljön üzleti logika, csak kompozíció.

```
app/(public)/about/page.tsx          → metadata + AboutPageClient
app/(public)/about/AboutPageClient.tsx → PublicPageShell + <AboutModule />
components/modules/about/
├── AboutModule.tsx                  → kliens UI, fetch a /api/about-ra
└── README.md                        → rétegek és importok rövid leírása
features/about/server.ts             → domain / DB (meglévő)
app/api/about/*                      → HTTP (meglévő)
```

**Feature README-k (Fázis 4 második kör):** minden jelenlegi `features/<név>/` mappában `README.md` — táblázat: domain fájl, `app/api/*`, UI útvonal, `lib` validáció / mapper; hivatkozás `docs/modules/<név>.md` ahol van.

**Következő migrációk (opcionális, külön PR):** `components/calendar/` → `components/modules/calendar/`, stb. — egy modul = egy PR, importok + doksi frissítés.

### Publikus útvonal ↔ réteg (Fázis 4 lezárás, 2026-05-09)

**Szabály:** `app/(public)/**/page.tsx` = **metadata** + (opcionálisan) **JSON-LD** + **vékony** kompozíció; **üzleti logika** ne ide kerüljön — `features/*/server.ts`, `lib/validation/*`, és a nagy UI a `components/**/Module` vagy `*PageClient` fájlokban marad.

| Útvonal | `page.tsx` szerepe | Fő UI belépő | `features/*` / megjegyzés |
|---------|-------------------|---------------|---------------------------|
| `/` | `HomePageClient` | `components/landing/` | Landing hír: `features/news` API |
| `/about` | `AboutPageClient` | `components/modules/about/AboutModule.tsx` | `features/about` |
| `/calendar` | `CalendarPageClient` | `components/calendar/CalendarModule.tsx` | `features/events` (esemény API) |
| `/calculator` | `CalculatorPageClient` | `components/calculator/` | Nincs `features/calculator` (lásd [`features/README.md`](../features/README.md)) |
| `/gallery` | RSC, közvetlen modul | `components/gallery/GalleryModule.tsx` | `features/gallery` |
| `/guides` | `GuidesPageClient` | `components/guides/GuidesModule.tsx` | `features/guides` |
| `/news` | `NewsPageClient` | `components/landing/LandingNews.tsx` (lista) | `features/news` |
| `/news/[slug]` | RSC + `getPublishedNewsBySlug` | beágyazott `<article>` a `page.tsx`-ben | `features/news/server` |
| `/office` | RSC, közvetlen modul | `components/office/OfficeModule.tsx` | `features/office` |
| `/search` | `SearchPageClient` | `app/(public)/search/SearchPageClient.tsx` | Keresés: lásd `features/README.md` |
| `/privacy` | `PrivacyPageClient` | `app/(public)/privacy/PrivacyPageClient.tsx` | i18n / statikus tartalom — [`docs/modules/privacy.md`](./modules/privacy.md) |
| `/status` | RSC fetch + `StatusPageClient` | `app/(public)/status/StatusPageClient.tsx` | `GET /api/health` — [`docs/modules/status.md`](./modules/status.md) |
| `/custom/[slug]` | RSC + Prisma + Builder | `lib/site-builder/*` | Site Builder; nincs külön `features/custom` |

**Index fájlok:** [`features/README.md`](../features/README.md) (domain mappák + backlog), [`components/modules/README.md`](../components/modules/README.md) (migrált UI pilot + checklist).

## CSS

- Tokenek: `styles/design-tokens.css` → import `app/globals.css` elején (egyetlen token-forrás). Topbar / nav HÖK jel: `--layout-nav-brand-mark-size`, `--layout-topbar-row-min-height`, `--layout-topbar-margin-top`, stb. (lásd `docs/design-system.md`).
- Modul partialok: `styles/modules/*.css` → import a `app/globals.css`-ben a tokenek után.
- Kereszt-modul globál: `styles/base.css`, `styles/components/landing-news-extras.css`, `navbar.css`, `skeleton-states-toast.css`, `effects-v11-plus.css`, `modal-grid.css`, `admin-login-form.css`, `admin-modal-scroll-lock.css`, `cookie-consent.css` → import a `app/globals.css`-ben a [`docs/global-shell.md`](./global-shell.md) szerinti **fix sorrendben**; maga a `globals.css` **nem** tartalmaz szabályblokkokat, csak `@import`-ot (Fázis 2).

## Kapcsolódó dokumentumok

- [`features/README.md`](../features/README.md) – `features/*` domain mappák indexe és backlog.
- [`components/modules/README.md`](../components/modules/README.md) – migrált modul UI pilot + checklist.
- `docs/modules/README.md` – modulonkénti viselkedés + fájlok (Fázis 5).
- `docs/demo-es-lokal-teszteles-utmutato.md` – lokális demó indítása, checklist, átvezetés a fázisolt tervhez.
- `docs/architecture.md` – fázisolt funkcionális rétegek.
- `docs/module-file-responsibility-map.md` – fájlonkénti felelősség.
- `docs/api.md` – HTTP szerződések.
- `PROJECT_MASTER_SPEC.md` §23 – javasolt célfa (irányelv).
