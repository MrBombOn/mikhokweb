# Fázisolt mesterütemterv (készültség, SSOT, DB, mobil, dokumentáció, mappastruktúra)

Ez a dokumentum a korábbi „készültség / hátra maradt” lista **végrehajtható fázisokra** bontott változata, plusz a kért **teljes dokumentáció** és **rendezettebb mappastruktúra** külön fázisai.

**Alapelv:** minden fázis zárható **önálló PR-rel / merge-elhető állapottal**; minden fázis végén **lint + test + build** zöld marad.

---

## Fázis 0 – Baseline és „Definition of Done”

**Cél:** minden további fázis ugyanarra a minőségi kapura épül.

- `npm run lint`, `npm run test`, `npm run build` kötelező zárásként.
- `docs/decision-log.md` rövid bejegyzés: mit tekintünk „SSOT”-nak (tokenek, `lib/validation/*`, `lib/i18n/messages.ts`, közös UI primitívek).

**Kimenet:** rögzített DoD checklist a PR sablonban vagy ebben a fájlban (hivatkozás).

---

## Fázis 1 – SSOT: inline stílus és i18n (magas forgalmú modulok)

**Cél:** a legláthatóbb modulokban megszűnik az `style={{…}}` és a szétszórt fix szöveg.

**Sorrend (javasolt):**

1. `components/modules/about/AboutModule.tsx` → osztályok `styles/modules/about.css`, szövegek `lib/i18n/messages.ts`.
2. `components/gallery/GalleryModule.tsx` (inline gradient + layout) → token alapú osztályok (`--fx-*`), szövegek i18n.
3. `components/guides/GuidesModule.tsx` → ugyanígy.
4. `components/calendar/CalendarModule.tsx` → ugyanígy (maradék inline margin/font).
5. `app/(public)/search/SearchPageClient.tsx` + admin oldalak maradék inline-ja → `admin-*` / `search-*` utility osztályok.

**Kimenet:** grep szerint jelentősen csökken a `style={{` a `components/` és `app/(public)` alatt; új szöveg csak i18n-ből (kivéve ténylegesen dinamikus tartalom).

**Állapot (2026-05-09, lezárva):** **Landing hír blokk** — `LandingNews` korábban tokenes CSS-re került. **Teljes `style={{…}}` kiírás** a `components/**/*.tsx` és `app/**/*.tsx` fájlokból: naptár (`CalendarModule` + stagger osztályok `calendar-stagger-0…40` a `styles/modules/calendar.css`-ben), galéria / útmutató rejtett file input → `input-file-hidden` (`styles/base.css`), admin oldalak (`site-builder`, `feedback`, `users`, `integrations`), `NewsRevisionDiffPanel`, `AdminSavedViewsToolbar`. **`/status`:** új `styles/modules/status-public.css` + `StatusPageClient` (i18n: `messages.statusPage`, `routeMeta.status`); szerver `page.tsx` fetch + `generateMetadata`. Galéria toolbar három gomb: `messages.gallery` (`manageFolders`, `uploadImage`, `bulkUpload`). Ellenőrzés: `rg 'style=\\{\\{'` üres a TSX-ben; `npm run typecheck`, `npm run test`, `npm run build` zöld.

---

## Fázis 2 – SSOT: CSS architektúra (részleges fájlhasítás, egy belépési pont)

**Cél:** `app/globals.css` ne legyen egyetlen „végtelen” fájl; maradjon **egy** `@import` lánc SSOT-ként.

- `styles/` alatt partialok (példa): `styles/base.css`, `styles/components/navbar.css`, `styles/components/cards.css`, `styles/modules/calendar.css` stb.
- `app/globals.css` **csak** `@import` sorok + szükség esetén 10–20 sor „híd”.
- Design tokenek továbbra is **csak** `styles/design-tokens.css`.

**Kimenet:** olvasható CSS rétegek; könnyebb review és konfliktuskezelés.

**Állapot (2026-05):** `app/globals.css` csak `@import`; a korábbi monolitikus blokk → `styles/base.css`, `styles/components/skeleton-states-toast.css`, `styles/components/effects-v11-plus.css` (tokenek + `styles/modules/*` változatlan sorrendben).

**Állapot (2026-05, második kör):** **`styles/modules/calculator.css`** — a kalkulátor-specifikus szabályok kiválasztva a `base.css` végéről; import: `app/globals.css` a `calendar.css` és `news.css` között.

**Állapot (2026-05-09, harmadik kör — Fázis 2 lezárva):** `base.css` végéről kivéve: **landing hír / hero CTA / collapsible / scroll-top hack** → [`styles/components/landing-news-extras.css`](../styles/components/landing-news-extras.css); **`.modal-grid`** → [`modal-grid.css`](../styles/components/modal-grid.css); **belépés modál mezők** → [`admin-login-form.css`](../styles/components/admin-login-form.css); **scroll lock + modál safe-area (640px)** → [`admin-modal-scroll-lock.css`](../styles/components/admin-modal-scroll-lock.css). A korábbi `base.css`-beli **`admin-modal-portal` / `underlay` / `window` duplikátumok** eltávolítva — egyetlen forrás: `effects-v11-plus.css` (V12 modal). `app/globals.css` import sorrend frissítve; `docs/global-shell.md` szinkron.

---

## Fázis 3 – Konzisztens „minden oldalon használt” réteg

**Cél:** ami globális, az **egy helyen** legyen dokumentálva és importálva.

- **Layout:** `app/layout.tsx`, `PublicPageShell`, `Navbar`, `Footer`, `ToastViewport`, `ModalHost` — viselkedés és felelősség egy oldalas összefoglaló (`docs/global-shell.md`).
- **Globális interakció:** `GlobalUiInteractions` + `data-expandable` szerződés — rövid példa a dokumentumban.
- **Közös UI:** `components/ui/Core.tsx`, `CustomSelect`, `Icons` — „mikor melyiket használd” táblázat.

**Kimenet:** új `docs/global-shell.md` + link a `documentation-index.md`-ből.

**Állapot (2026-05):** `docs/global-shell.md` elkészült; bejegyzés: `docs/documentation-index.md` → Alapdokumentumok.

**Állapot (2026-05, második kör):** [`docs/global-shell.md`](./global-shell.md) szinkron a kóddal: **`app/globals.css` import sorrend** (tokenek → `modules/*` köztük `calculator.css` → `base` → `navbar` → skeleton → effects); **`GlobalUiInteractions`** szerződés kiegészítve **`data-expanded`** attribútummal; **§6** táblázat: `EmptyState`, `ErrorState`, `Skeleton`, `FilterChip`, `MotionReveal`, `AdminModal`, `BrandMark`; **§7** skip link + `metadata` / Fázis 11 hivatkozás; ellenőrző lista §8. `docs/architecture.md` stílus sor frissítve (`modules/*`).

**Állapot (2026-05-09, harmadik kör — Fázis 3 lezárva):** [`docs/global-shell.md`](./global-shell.md) **§1** = `app/layout.tsx` tényleges fa: **`SeoJsonLd`**, opcionális Builder **inline `<style>`**, **`DocumentMetaSync`**, **`CookieConsentBar`**, helyes testvér sorrend; **§3** `AppProvider`: `sessionUser`, `isStaff`, `isAdminRole`, **`requestConfirm`** / `confirmDialog`; **§4** `ModalHost`: **`admin-modal-open`** scroll lock (nem nyers `overflow` a komponensben); **§2** belső layout: **`AdminWorkspaceChrome`**; **§6** gyökér-only sorok; **§7–§8** metadata + süti smoke. Ellenőrzés: `npm run typecheck`, `npm run test`, `npm run build` zöld.

---

## Fázis 4 – Mappastruktúra: funkció szerinti csoportosítás (App Router kompatibilisen)

**Cél:** oldalanként / modulonként átláthatóbb legyen a **funkció**, a **design** és az **alapműködés** — anélkül, hogy megsértenénk a Next App Router szabályait (`app/**/page.tsx` marad a route gyökere).

**Javasolt irány (lépcsőzetesen):**

1. **Domain + API logika** már részben `features/*` alatt van — kiterjesztés: minden modulhoz egyértelmű `features/<név>/` (server, schema ha kell, README).
2. **UI modul** marad `components/<név>/` vagy áthelyezés `components/modules/<név>/` (egy körben ne mindent mozgassunk; először csak új modulok + 1 pilot, pl. `about`).
3. **`app/(public)/<route>/`** csak **vékony** `page.tsx` + `*PageClient.tsx` + metadata; üzleti logika ne kerüljön ide.

**Kimenet:** `docs/folder-structure.md` (célfa, „mit hova”), és 1 pilot refaktor (pl. About) minta.

**Állapot (2026-05):** About UI átkerült `components/modules/about/` (+ `README.md`); `docs/folder-structure.md` bővítve Fázis 4 célfa + konvenció táblázattal.

**Állapot (2026-05, második kör):** `features/about`, `features/office`, `features/events`, `features/guides`, `features/gallery`, `features/news` — mindegyikhez **`README.md`** (domain, API, UI, lib hivatkozások). [`docs/folder-structure.md`](./folder-structure.md) gyökértábla + Fázis 4 blokk frissítve (README konvenció, naptár / `events` megjegyzés).

**Állapot (2026-05-09, harmadik kör — Fázis 4 lezárva):** [`docs/folder-structure.md`](./folder-structure.md) **publikus útvonal ↔ réteg** táblázat (RSC vs `*PageClient`, UI mappa, `features/*` / backlog); új repo-gyökér indexek: [`features/README.md`](../features/README.md), [`components/modules/README.md`](../components/modules/README.md); [`docs/documentation-index.md`](./documentation-index.md) hivatkozás. Pilot (`components/modules/about/`) változatlan. Ellenőrzés: `npm run typecheck`, `npm run test`, `npm run build` zöld.

---

## Fázis 5 – Dokumentáció: „minden kódsor” realisztikus bontása

**Cél:** ne a teljes repo 100%-os soronkénti kommentje legyen a cél (az karbantarthatatlan), hanem **rétegzett, kereshető** dokumentáció.

**Rétegek:**

| Réteg | Mit fed le | Eszköz / hely |
|--------|----------------|----------------|
| A | Architektúra, adatfolyam, RBAC | `docs/architecture.md`, `docs/module-file-responsibility-map.md` |
| B | Publikus API és validáció | `docs/api.md` + `lib/validation/*` fejléc + Zod séma magyarázat |
| C | Modulonkénti „viselkedés + fájlok” | `docs/modules/*.md` (új mappa), oldalanként 1 fájl |
| D | Kockázatos / biztonságos részek sor szintű magyarázata | pl. `middleware.ts`, `lib/auth/*`, `lib/security/*` — célzott blokk-komment + `docs/security-walkthrough.md` |
| E | Laikus összefoglaló | `docs/laikus-kodmagyarazo.md` bővítése hivatkozásokkal a (C) rétegre |

**Kimenet:** `docs/modules/` könyvtár + legalább 6 modul lefedve (naptár, kalkulátor, galéria, útmutatók, rólunk, keresés); kritikus auth/csrf fájlokra (D) részletes séta.

*(Ha később mégis kell „minél több sor” magyarázat, azt modulonkénti exportból / generált mellékletekből lehet bővíteni — külön döntés.)*

**Állapot (2026-05):** `docs/modules/` — `about`, `calendar`, `calculator`, `gallery`, `guides`, `search` + `README.md`; `docs/security-walkthrough.md`; `docs/laikus-kodmagyarazo.md` §7 linkek; `docs/documentation-index.md` bejegyzések.

**Állapot (2026-05, második kör):** új réteg C fájlok: [`docs/modules/news.md`](./modules/news.md), [`office.md`](./modules/office.md), [`events.md`](./modules/events.md) (naptár domain + API, külön a [`calendar.md`](./modules/calendar.md)-től); [`docs/modules/README.md`](./modules/README.md) táblázat bővítve; [`docs/laikus-kodmagyarazo.md`](./laikus-kodmagyarazo.md) §7 szöveg finomítva.

**Állapot (2026-05-09, harmadik kör — Fázis 5 lezárva):** [`docs/modules/`](./modules/) — új réteg C: [`privacy.md`](./modules/privacy.md), [`status.md`](./modules/status.md); [`README.md`](./modules/README.md) DoD összegzés (≥6 modul teljesítve, 11 lefedett felület), réteg B/D hivatkozások; [`laikus-kodmagyarazo.md`](./laikus-kodmagyarazo.md) §7 modullista frissítve. Réteg D: [`security-walkthrough.md`](./security-walkthrough.md) változatlanul fedezi a kritikus auth / CSRF / rate limit utat. Ellenőrzés: `npm run typecheck`, `npm run test`, `npm run build` zöld.

---

## Fázis 6 – Éles DB-first

**Cél:** production környezetben nincs „véletlen” demo adat és nincs rejtett dev-only viselkedés.

- Prisma: `provider` és `DATABASE_URL` éles stratégia dokumentálva (`docs/database.md` frissítés).
- `canUseDemoFallback()` és társai: **production** buildben kikapcsolás vagy `NODE_ENV` + explicit `ALLOW_DEMO_FALLBACK=0` flag.
- Migráció élesen: `prisma migrate deploy` CI lépésben.
- Kalkulátor: `localStorage` vs szerver állapot — döntés + dokumentáció (vendég vs bejelentkezett).

**Kimenet:** működő éles checklist + frissített `docs/database.md`.

**Állapot (2026-05):** `docs/database.md` bővítve (provider/URL, migráció, demo fallback env, kalkulátor tárolás, éles checklist); `canUseDemoFallback()` production alapból **ki**, `ALLOW_DEMO_FALLBACK=1` opt-in; CI: `prisma migrate deploy` lépés; `readDemoFallbackPolicy` + teszt `tests/content-fetch-policy.test.ts`; `docs/modules/calculator.md` hivatkozás a DB doc §4-re.

**Állapot (2026-05-09, harmadik kör — Fázis 6 lezárva):** [`docs/database.md`](./database.md) §2 — CI jobonként felsorolva, hol fut a **`prisma migrate deploy`** (`.github/workflows/ci.yml`: `test`, `build`, `lighthouse`, `release_checklist`); §6 checklist: `provider` egyeztetés, go-live kereszthivatkozás. Kód / policy változatlan: `lib/services/content-fetch-policy.ts`, teszt `tests/content-fetch-policy.test.ts`. Ellenőrzés: `npm run typecheck`, `npm run test`, `npm run build` zöld.

---

## Fázis 7 – Mobil / navbar SSOT

**Cél:** egy helyen legyen a navbar viselkedés; keskeny viewportokon tesztelt.

- `app/globals.css` navbar szabályok **egyesítése** (duplikátumok eltávolítása egy körben).
- Teszt: 320px, 360px, 390px, 768px — checklist `docs/mobile-checklist.md`.

**Kimenet:** kevesebb CSS duplikáció + checklist.

**Állapot (2026-05):** navbar / landing / mobil panel szabályok SSOT: `styles/components/navbar.css` (betöltés: `app/globals.css` a `base.css` után); duplikátumok törölve a `styles/base.css`-ből; a landing lebegő réteg és a kapcsolódó ismétlődő blokk kivéve a `styles/components/effects-v11-plus.css`-ből (V14 topbar / flex `nav-links` díszítés ott maradt). Topbar méret / nav jel / kalkulátor sticky: `styles/design-tokens.css` (`--layout-topbar-*`, `--layout-nav-brand-mark-size`, …) + `lib/layout/topbar-layout.ts` (Next/Image px tükör). Mobil smoke: `docs/mobile-checklist.md`.

**Állapot (2026-05-09, harmadik kör — Fázis 7 lezárva):** `styles/base.css` — eltávolítva a **`.navbar`** és a dupla **`.nav-links` / `.nav-link` / `.nav-actions`** blokk (struktúra → `navbar.css`); `styles/components/navbar.css` — **`.navbar-full`** tokenes `padding-block` / `padding-inline`, **`.nav-actions`** SSOT; `components/layout/Navbar.tsx` — osztály: `navbar-full` (a felesleges `navbar` eltávolítva); `effects-v11-plus.css` — a korábbi dupla **`.navbar-full` / `.nav-links`** méretblokk törölve (V14 topbar + flex nav továbbra is a fájl végén). [`docs/mobile-checklist.md`](./mobile-checklist.md) — viewport tábla + SSOT rétegek. Ellenőrzés: `npm run typecheck`, `npm run test`, `npm run build` zöld.

---

## Fázis 8 – Üzemeltetés és tartalom (nem feltétlenül kód)

**Cél:** éles induláshoz szükséges nem-funkcionális elemek listázva.

- Domain, TLS, backup, monitoring, analytics, jogi / impresszum oldalak — feladatlista + felelős szerepkörök (`docs/teljes-uzemeltetesi-kezikonyv.md` bővítése vagy külön `docs/go-live-checklist.md`).

**Kimenet:** go-live checklist.

**Állapot (2026-05):** elkészült a **[`docs/go-live-checklist.md`](./go-live-checklist.md)** (domain, TLS, hosting/env, DB backup/restore drill, megfigyelhetőség, analytics GDPR, jogi/impresszum + lábléc feladat, SEO/mobil smoke, deploy nap); a [`teljes-uzemeltetesi-kezikonyv.md`](./teljes-uzemeltetesi-kezikonyv.md) §9.0 hivatkozik rá; bejegyzés: [`documentation-index.md`](./documentation-index.md).

**Állapot (2026-05-09, harmadik kör — Fázis 8 lezárva):** [`go-live-checklist.md`](./go-live-checklist.md) — **DoD** bekezdés (§1–10 kipipálás / kivétel jóváhagyás); **Kapcsolódó dokumentumok** bővítve: `global-shell`, `modules/privacy`, `privacy-and-gdpr`, recovery + incidens sablonok. [`teljes-uzemeltetesi-kezikonyv.md`](./teljes-uzemeltetesi-kezikonyv.md) §9.0 — Fázis 8 / phased hivatkozás. Ellenőrzés: dokumentáció-only; `npm run typecheck` + `npm run test` + `npm run build` zöld (változatlan kód esetén is futtatva).

---

## Fázis 9 – ESLint jövő (`next lint` → ESLint CLI)

**Cél:** Next 16 irányába kompatibilitás.

- Hivatalos migrációs útmutató követése; `eslint.config.mjs` megtartása.
- CI frissítése, ha van külön lint lépés.

**Kimenet:** dokumentált migráció + zöld CI.

**Állapot (2026-05):** `package.json` → `"lint": "eslint ."`; `eslint.config.mjs` bővítve **globális ignores** (`.next`, `node_modules`, …) + **`*.cjs`** szabályoverride; CI változatlan (`npm run lint`). Dokumentáció: [`docs/eslint-cli-migration.md`](./eslint-cli-migration.md). Ellenőrizve: `npm run lint`, `npm run test`, `npm run build` zöld.

**Állapot (2026-05-09, harmadik kör — Fázis 9 lezárva):** [`eslint-cli-migration.md`](./eslint-cli-migration.md) — **DoD** szakasz (lint script, `eslint.config.mjs`, GitHub + GitLab CI, Fázis 0 kapu); Next ESLint hivatkozás. Konfig és `package.json` változatlanul megfelelő. Ellenőrzés: `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build` zöld.

---

## Fázis 10 – Teljesítmény / LCP

**Cél:** nagy képek és kritikus útvonalak optimalizálva.

- Maradék `<img>` → `next/image` ahol értelmes (`remotePatterns` ha kell).
- Galéria / About külső URL-ek: méret, `loading`, `sizes`.

**Kimenet:** `docs/lighthouse-baseline.md` frissítés mérésekkel.

**Állapot (2026-05):** `next/image` a **Galéria** (thumb `fill` + `sizes`, modál 800×520) és a **Rólunk** avatár (62×62) számára, ha a host szerepel a [`lib/remote-image-hosts.ts`](../lib/remote-image-hosts.ts) listájában; egyébként `<img loading="lazy">`. `next.config.ts` → `images.remotePatterns` ugyanebből a modulból. CSS: `gallery-card-media-frame` / `gallery-preview-image-wrap` → `position: relative`. [`docs/lighthouse-baseline.md`](./lighthouse-baseline.md) bővítve scope-pal, mérési útmutatóval, táblázattal (`/about`, `/gallery`). Ellenőrizve: `npm run lint`, `npm run test`, `npm run build` zöld.

**Állapot (2026-05-09, harmadik kör — Fázis 10 lezárva):** [`lighthouse-baseline.md`](./lighthouse-baseline.md) — **LHCI** szakasz (`lighthouserc.cjs` URL-ek, assert küszöbök, `npm run lhci`); **DoD** (About/Gallery képstratégia, `remotePatterns`, modul-doksi + baseline táblázat). [`docs/modules/about.md`](./modules/about.md), [`gallery.md`](./modules/gallery.md) — Fázis 10 **Teljesítmény / kép** blokk + lighthouse link. Ellenőrzés: `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build` zöld.

---

## Fázis 11 – UX szöveg SSOT: toast, modál, státuszjelzések (HU / EN)

**Cél:** a felhasználónak látszó **rövid üzenetek** (toast, modál cím / szárny / gombfelirat, üres állapot, figyelmeztető sávok, űrlap visszajelzések) **lefordítottak**, hangnemben illeszkednek a HÖK témához, és **egy helyről** karbantarthatók.

- **SSOT:** `lib/i18n/messages.ts` (vagy szűk altmodul `messages.toast`, `messages.modal` — egy döntés szerint); tilos a toast/modál szövegének szétszórása fix stringként a komponensekben.
- **Toast:** típusonként (success / warning / error / info) egységes szerkezet: ikon + üzenet + opcionális lezárás; színek a design tokenekből (`design-tokens.css`), ne lokális hex.
- **Modálok:** `AdminModal` / `ModalHost` / admin párbeszédek — cím, leírás, elsődleges / másodlagos gomb szövegek i18n-ből; hosszú szöveg görgethető marad.
- **Kimenet:** frissített [`docs/global-shell.md`](./global-shell.md) szekció (toast + modál szerződés); grep: toast/modál user-facing stringek **nem** maradnak magyarul fixen angol nézetben.

---

## Fázis 12 – Egyedi legördülők és listák (CustomSelect + társak)

**Cél:** ahol **nem** natív `<select>` a jobb UX (keresés a listában, gazdag címke, ikon, hosszú lista), ott egységes, **akadálymentes** egyedi megoldás; ahol natív elég, ott dokumentáltan marad natív.

- **`CustomSelect` (és rokon):** billentyűzet (nyíl, Enter, Escape), `aria-expanded` / `aria-activedescendant` / fókusz-visszaállítás; mobilnézetben opcionális **alulról csúszó panel** (sheet) a keskeny képernyőn.
- **SSOT:** mikor `CustomSelect`, mikor natív — táblázat a [`docs/design-system.md`](./design-system.md) vagy `global-shell.md`-ben.
- **Kimenet:** modulonkénti átvizsgálás (toolbar szűrők, admin űrlapok); [`docs/a11y-audit.md`](./a11y-audit.md) frissítés a legördülő vonatkozásában.

---

## Fázis 13 – Validációs élmény (kliens + szerver egyezés)

**Cél:** űrlapoknál **értelmezhető** hibaüzenet, mezőszintű visszajelzés, küldés közbeni állapot; a kliens oldali szabályok **megegyeznek** a szerver Zod / API szerződéssel.

- **SSOT:** `lib/validation/*` séma + ugyanazon hibakulcsok i18n-ben (`messages.hu` / `messages.en`); duplikált regex / üzenet nélkül.
- **Checklist útvonalak:** bejelentkezés, feedback, admin CRUD mezők ahol már van Zod — fókusz az első hibás mezőre, `aria-invalid` / `aria-describedby`.
- **Kimenet:** rövid [`docs/testing.md`](./testing.md) blokk vagy `docs/forms-validation.md` — „új űrlap hogyan illeszkedjen”; opcionális 1–2 fókuszáló unit teszt a validációs mapperre.

---

## Fázis 14 – Ritmus és szellősség: tokenek, távolságok, „lélegző” layout

**Cél:** a felület **kevésbé zsúfolt**, olvashatóbb: szekciók, kártyák, eszköztárak között **konzisztens** vertikális és horizontális lélegzet a tokenekkel; mobil és desktop **azonos ritmus-logika**, eltérő skálázással.

- **Design tokenek:** `--space-*`, szekció `padding-block`, kártya belső margók, lista `gap` — átnézés modulonként; ahol fix `px` maradt, tokenre cserélhetőség.
- **Típus és sor magasság:** cím / lead / body hierarchia nem szorul össze keskeny nézetben.
- **Kimenet:** frissített [`docs/design-system.md`](./design-system.md) spacing táblázat + „minimum touch / minimum kattintható terület” hivatkozás; célzott CSS a `styles/modules/*` és `styles/base.css` érintett blokkokban (kis PR-ekkel).

---

## Fázis 15 – Kereszt-eszközös polish: mobil + asztal egy menetben

**Cél:** a Fázis 11–14 **együttes** lezáró köre: minden fő útvonalon gyors **kézi** passz (mobil + desktop) — nem csak navbar, hanem modálok, toast helye, legördülők, űrlapok.

- **Bővített checklist:** a [`docs/mobile-checklist.md`](./mobile-checklist.md) kiegészítése (vagy külön `docs/ux-polish-checklist.md`): toast nem takarja a fő CTA-t; modál safe area; legördülő nem vágódik le a viewporton; hosszú szöveg görgethető.
- **Összhang:** [`docs/ui-audit-d6.md`](./ui-audit-d6.md) vagy új rövid jegyzőkönyv — „Fázis 15 záró” dátummal.
- **Kimenet:** aláírtnak tekinthető UX állapot a go-live előtt; bejegyzés: `progress-log.md` + szükség esetén `decision-log.md` (pl. natív vs custom select alapértelmezés).

---

## Összefoglaló ütemezés (prioritás)

| Fázis | Téma | Prioritás |
|-------|------|-----------|
| 0 | Baseline / DoD | P0 |
| 1 | SSOT inline + i18n (modulok) | P0 |
| 2 | SSOT CSS partialok | P1 |
| 3 | Globális shell dokumentáció | P1 |
| 4 | Mappastruktúra pilot + doc | P1 |
| 5 | Dokumentáció rétegek A–E | P1–P2 |
| 6 | DB-first éles | P1 |
| 7 | Mobil / navbar | P2 |
| 8 | Go-live / üzem | P2 |
| 9 | ESLint migráció | P2 |
| 10 | LCP / média | P3 |
| 11 | Toast / modál / státusz i18n + téma SSOT | P2 |
| 12 | Custom legördülők + a11y | P2 |
| 13 | Űrlap validáció + i18n hibák | P1–P2 |
| 14 | Szellősség, tokenes távolságok | P2 |
| 15 | Mobil + desktop UX záró passz | P2 |

---

## Következő lépés (végrehajtás)

A fázisok **sorban** indulnak: **Fázis 1** (SSOT modulok) → közben **Fázis 0** DoD rögzítése PR-ban. A **Fázis 4–5** párhuzamosan dokumentálható, de a mappa-mozgatást érdemes **pilot** után skálázni, hogy ne törjön az import gráf.

**Fázis 11–15 (UX / i18n / validáció / szellősség):** a **Fázis 10** után érdemes indulni; **Fázis 11** (szöveg SSOT) és **Fázis 14** (spacing tokenek) részben **párhuzamosítható** külön fájlcsoportokon; **Fázis 13** (validáció) modulonként PR-ekben; **Fázis 12** (legördülő) egy központi PR + modulonkénti csere; **Fázis 15** záró passz **minden** előző PR merge után (egy „freez előtti” hétvége).

Utolsó frissítés: 2026-05 — Fázis 11–15 felvéve (UX, i18n, custom select, validáció, szellősség, záró polish).
