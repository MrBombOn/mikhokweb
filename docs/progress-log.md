# Progress log

Rövid státusz minden lezárt vagy részben lezárt lépésről (master spec §24.1).

---

## 2026-04-28 – Fázis 0 (részben)

- **Mit:** `.gitignore`, `.env.example`, `docs/roadmap.md`, `docs/workflow.md`, `docs/specification.md` (index), progress/decision log indítás, README linkek, lokális **`git init`** és első commit a teljes jelenlegi fájlállapottal.
- **Állapot:** Remote-okat (`origin`, opcionálisan `gitlab`) a fejlesztő adja hozzá – `docs/workflow.md`. CI (lint + build) beállítva.
- **Következő lépés:** push után távoli CI ellenőrzése.

## 2026-04-28 – CI

- **Mit:** GitHub Actions (`ci.yml`) és GitLab CI (`.gitlab-ci.yml`): `npm ci`, `npm run lint`, `npm run build`. ESLint: `eslint.config.mjs`. Buildhez szükséges javítások: `ScrollTopButton` JSX, `CalendarModule` / `GalleryModule` típusok, `ModalHost` összhang az `AppProvider` modal típusával.
- **Állapot:** Lokálisan `npm run build` zöld.

## 2026-04-28 – Fázis 1 (bootstrap + SSOT alap)

- **Mit:** Prisma 6 + SQLite (`User`, `UserRole`), első migráció, `lib/db.ts`, Zod `loginFormSchema`, `lib/i18n` (üzenetek + `t`), `styles/design-tokens.css` + import a `globals.css`-ben, `postinstall` / `db:*` npm scriptek, CI `DATABASE_URL` a `prisma generate` miatt, `AppProvider` login Zod `safeParse`.
- **Állapot:** `npm run build` zöld; lokálisan `prisma migrate deploy` + `dev.db` (gitignore).
- **Következő lépés:** Fázis 2 (lásd alább).

## 2026-04-28 – Fázis 2 (belső admin védés váz)

- **Mit:** `middleware.ts` az `/admin/*` útvonalakra; `api/auth/admin-gate` + httpOnly cookie; `(internal)` layout fejléc; `AppProvider` szinkron a gate-tel; `Navbar` admin link belépés után; `AdminDeniedBanner` a `?admin=denied` kezelésére.
- **Állapot:** `npm run build` zöld.
- **Következő lépés:** Fázis 3 (lásd alább).

## 2026-04-28 – Fázis 3 (session + jelszó, első kör)

- **Mit:** `POST /api/auth/login` (Prisma + bcrypt), `GET`/`DELETE /api/auth/session`, JWT `hok_session` (`jose` HS256, `AUTH_SECRET`), `middleware.ts` JWT ellenőrzés; `AppProvider` ezekre vált; **seed** `admin` + `office`; CI/GitLab `AUTH_SECRET`; `jose/jwt/*` import az Edge figyelmeztetések elkerülésére; `not-implemented-response` / `types` fájlok tisztítása.
- **Állapot:** `npm run build` zöld; a Fázis 2-es `hok_admin_gate` API **eltávolítva**.
- **Következő lépés:** API-k jogosultság ellenőrzése modulonként, CSRF/rate limit, audit log, éles `AUTH_SECRET` rotáció.

## 2026-04-28 – Fázis 4 (hírek: DB → API → UI)

- **Mit:** Prisma `News` + enumok (`ContentStatus`, `NewsSource`), migráció `phase4_news`, seed 3 kezdő hír; `GET`/`POST` `/api/news`, `GET`/`PATCH`/`DELETE` `/api/news/[id]` (soft delete), RBAC `lib/auth/current-user.ts`, Zod `lib/validation/news.ts`, mapper `lib/mappers/news.ts`; `LandingNews` API + `localStorage` csak kategória/keresés; `/news` + `NewsPageList`; `docs/api.md` hír végpontok.
- **Állapot:** `npm run build` zöld; `npx prisma db seed` kitölti a híreket.
- **Következő lépés:** opcionális audit, rate limit, publikált hír részletes nézet URL-ről.

## 2026-04-28 – Fázis 5 (naptár + tornaterem: DB → API → UI)

- **Mit:** Prisma `CalendarEvent`, `GymBooking` + `BookingStatus`, migráció `phase5_calendar_gym`, seed események + foglalások; `GET`/`POST` `/api/events`, `GET`/`PATCH`/`DELETE` `/api/events/[id]`; `GET`/`POST` `/api/bookings`, `PATCH` `/api/bookings/[id]`; Zod `lib/validation/events.ts`, `lib/validation/bookings.ts`, mapper `lib/mappers/calendar.ts`, típusok `types/calendar.ts`; `CalendarModule` REST + dinamikus havi rács + `monthLabel`; `docs/api.md` bővítés.
- **Állapot:** `npm run build` zöld; `npx prisma db seed` kitölti az adatot.
- **Következő lépés:** esemény szerkesztő (PATCH a modulból), iCal / campus szinkron (§29.6), rate limit a nyilvános POST foglalásra.

## 2026-04-28 – Fázis 6 (KKI kalkulátor: domain + mentés + export)

- **Mit:** `lib/calculator/compute.ts` + `export.ts` (§12.2); `docs/calculator-rules.md` (§12.3); `lib/validation/calculator.ts`; Prisma `CalculatorState` + migráció; `GET`/`PUT /api/calculator/state` (OFFICE/ADMIN); `CalculatorModule` refaktor: domain összegzés, `localStorage`, hidratálás után mentés, debounced szerver PUT, JSON export gomb.
- **Állapot:** `npm run build` zöld; migráció: `phase6_calculator_state`.
- **Következő lépés:** CSV / PDF export, képletek egyeztetése a hivatalos KKI szabállyal, verziózott séma migráció import JSON-hoz.

## 2026-04-28 – Fázis 7 (galéria: DB → API → UI)

- **Mit:** Prisma `GalleryFolder` + `GalleryItem`, migráció `phase7_gallery`, seed; `GET`/`POST /api/gallery`, `GET`/`PATCH`/`DELETE /api/gallery/[id]`; `types/gallery.ts`, `lib/mappers/gallery.ts`, `lib/validation/gallery.ts`; `GalleryModule` REST, keresés, három nézet, letöltés link, admin demó POST + törlés; `/gallery` → `PageShell` + modul; `docs/api.md` / `architecture.md`.
- **Állapot:** `npm run build` zöld a javítások után.
- **Következő lépés:** fájlfeltöltés + thumbnail pipeline (§13.3), mappa CRUD, `next/image` remotePatterns.

## 2026-04-28 – Fázis 8 (útmutatók: DB → API → UI)

- **Mit:** Prisma `Guide`, migráció `phase8_guides`, seed 2 rekord; `GET`/`POST /api/guides`, `GET`/`PATCH`/`DELETE /api/guides/[id]`; `types/guides.ts`, mapper, Zod + `parseOptionalHttpUrl`; `GuidesModule` REST, keresés, kategóriaszűrés, dokumentum link, modál (`ModalHost` `pre-wrap`); `docs/api.md` / `architecture.md`.
- **Állapot:** `npm run lint` + `npm run build` zöld; `npx prisma db seed` kitölti az útmutatókat.
- **Következő lépés:** Office szerkesztő (PATCH a modulból), kategória/témakör táblák, fájlfeltöltés (§14).

## 2026-04-28 – Fázis 9 (About Us: DB → API → UI)

- **Mit:** Prisma `AboutNarrative` + `AboutMember`, migráció `phase9_about`, seed 4 narratíva + 3 tag; `GET /api/about`, tag `POST`/`GET`/`PATCH`/`DELETE`, narratíva `GET`/`PATCH`; `types/about.ts`, mapper, Zod; `AboutModule` (intro, blokk kártyák, csoportos tagok, kép URL), `/about` → `PageShell`; `docs/api.md` / `architecture.md`.
- **Állapot:** `npm run lint` + `npm run build` zöld; `npx prisma db seed` kitölti az About adatot.
- **Következő lépés:** Office UI a narratívák és tagok teljes szerkesztéséhez (§15.2), korábbi tagok külön szekció / idővonal.

## 2026-04-28 – Fázis 10 (Office: DB → API → UI)

- **Mit:** Prisma `OfficeSnapshot` singleton, migráció `phase10_office`; `GET`/`PATCH /api/office`; `patchOfficeSnapshotSchema`; mapper `officeSnapshotToDto`; `OfficeModule` REST alapon (nyitvatartás, bent lévők, ügyintézési státusz, szolgáltatás + NFC/gyors infó), `/office` → `PageShell`; `docs/api.md` / `architecture.md`.
- **Állapot:** `npm run lint` + `npm run build` zöld; `npx prisma db seed` kitölti az Office snapshotot.
- **Következő lépés:** Office oldali teljes szerkesztőfelület (mezőnkénti PATCH), ütemezés és törlés workflow (§16.2).

## 2026-04-28 – Fázis 11 (Admin felület: DB → API → UI)

- **Mit:** Prisma `Category` + `AuditLog` modellek; admin API-k: `GET`/`POST /api/users`, `GET`/`POST /api/categories`, `GET /api/audit` (ADMIN check + audit írás create műveleteknél); admin oldalak bekötése élő adatokra: `/admin`, `/admin/users`, `/admin/categories`, `/admin/content`, `/admin/audit`.
- **Állapot:** `npm run lint` + `npm run build` zöld; `npx prisma db seed` futott; migráció: `phase11_admin`.
- **Következő lépés:** részletes admin workflow-k (PATCH/DELETE, restore, finomabb RBAC, audit viewer szűrők).

## 2026-04-28 – Fázis 12 (API validáció és hardening – első kör)

- **Mit:** egységes válasz-factory `lib/api/response.ts`; login brute-force védelem `lib/security/login-rate-limit.ts`; `POST /api/auth/login` hardening (rate limit + konzisztens válaszok); admin route-ok (`/api/users`, `/api/categories`, `/api/audit`) response factory-re állítva.
- **Állapot:** ellenőrzés alatt.
- **Következő lépés:** további route-ok fokozatos átállítása response factory-re, CSRF/rate-limit réteg kiterjesztése minden state-changing végpontra.

## 2026-04-28 – Fázis 13 (biztonsági audit – első kör)

- **Mit:** CSRF origin/referer guard (`lib/security/csrf.ts`) a cookie-auth state-changing endpointokra; login + session útvonal keményítés; biztonsági áttekintés dokumentálása `docs/security-audit.md` fájlban.
- **Állapot:** ellenőrzés alatt.
- **Következő lépés:** audit middleware minden írási műveletre, rate-limit stratégia kiterjesztése nem-login route-okra.

## 2026-04-28 – Fázis 14 (mobil + a11y audit – első kör)

- **Mit:** skip link a root layoutban (`#main-content`), globális `:focus-visible` fókuszstílus, `prefers-reduced-motion` szabályok; admin users/categories űrlap ARIA címkézése és `role="alert"` hibajelzés; audit napló: `docs/a11y-audit.md`.
- **Állapot:** ellenőrzés alatt.
- **Következő lépés:** mobil menü fókusz-trap + Escape kezelés, kontraszt audit light/dark nézetben.

## 2026-04-28 – Fázis 15 (tesztelés és polish – első kör)

- **Mit:** `npm run test` script bevezetése (`tsx --test`); minimális unit/smoke tesztek a KKI domain számításokra és security utility rétegre (`csrf` + login rate-limit); `docs/testing.md` létrehozása.
- **Állapot:** ellenőrzés alatt.
- **Következő lépés:** API contract és admin flow smoke tesztek, CI tesztlépés bővítés.

## 2026-04-28 – Fázis 16 (tartalmi és API SSOT szinkron – első kör)

- **Mit:** közös fallback policy (`lib/services/content-fetch-policy.ts`) bevezetése; hírekhez közös kliens service és erre átállítás a landing + `/news` listában; nyilvános tartalommodulokban (`LandingNews`, `GuidesModule`, `AboutModule`, `OfficeModule`, `GalleryModule`, `CalendarModule`) a demo fallback production alatt letiltva.
- **Állapot:** ellenőrzés alatt.
- **Következő lépés:** modulonként dedikált service réteg (`events`, `gallery`, `guides`, `about`, `office`) és egységes cache/invalidation stratégia.

## 2026-04-28 – Fázis 17 (feature-first refaktor – news referencia modul)

- **Mit:** `features/news/` struktúra bevezetése (`types`, `schema`, `mapper`, `server`, `client`); news API route-ok vékonyítása úgy, hogy domain műveletek a feature service-be kerüljenek; `LandingNews` és `NewsPageList` átállítása feature importokra; régi news lib fájlok (`lib/validation/news.ts`, `lib/mappers/news.ts`, `lib/services/news-client.ts`) kivezetése.
- **Állapot:** ellenőrzés alatt.
- **Következő lépés:** ugyanennek a mintának alkalmazása `events` és `gallery` modulra.

## 2026-04-28 – Fázis 18 (observability + üzemeltetés – első kör)

- **Mit:** strukturált szerver logger bevezetése (`lib/observability/server-logger.ts`) PII-minimum redakcióval; auth login flow log események (`auth_login_*`); alap operátori health endpoint (`GET /api/health`) DB pinggel; incidens hibakeresési runbook (`docs/incident-debug.md`).
- **Állapot:** ellenőrzés alatt.
- **Következő lépés:** további 5xx route-ok célzott logolása, egyszerű riasztási csatorna (platform/Sentry) prototípus.

## 2026-04-28 – Fázis 19 (SEO + Open Graph – első kör)

- **Mit:** közös SEO helper (`lib/seo.ts`) bevezetése; publikus oldalak metadata beállítása (title/description/canonical/alternates/open graph); `robots.txt` route (`app/robots.ts`) és sitemap finomhangolás (`app/sitemap.ts`, admin URL-ek nélkül); hírek oldalon JSON-LD `CollectionPage`; SEO jegyzet (`docs/seo-audit.md`).
- **Állapot:** ellenőrzés alatt.
- **Következő lépés:** route-szintű locale URL stratégia előkészítése (`/en/...`), Lighthouse mérési eredmények dokumentálása.

## 2026-04-28 – Fázis 20 (hallgatói élmény: keresés + visszajelzés – első kör)

- **Mit:** globális kereső oldal (`/search`) modul-API aggregációval (`news`, `events`, `guides`), mentett keresésekkel (`localStorage`); nav entry point a keresőhöz; nyilvános feedback endpoint (`POST /api/feedback`) validációval és rate limittel; keresési szabályok dokumentálása (`docs/search-rules.md`) és döntés rögzítése (`D-2026-04-28-007`).
- **Állapot:** ellenőrzés alatt.
- **Következő lépés:** szerveroldali keresőindex/profil alapú mentett szűrők mérlegelése, CAPTCHA vagy további anti-spam réteg.

## 2026-04-28 – D1 (design token audit + visual contract – első kör)

- **Mit:** `styles/design-tokens.css` bővítése (radius xs–xl, shadow xs–xl, 4px spacing skála, motion + layout + touch tokenek); `app/globals.css` layout szintű `var(--*)` átállás, hibás `.` / `.back-to-top` selektorok eltávolítása, `pte-page-up-control` SSOT; `ScrollTopButton`, `Core` (`Card` / `SectionHeader`), `LandingHero`, `LandingNews` felső blokk osztály + token; `docs/design-system.md` vizuális szerződés; roadmap D1 jelölés.
- **Állapot:** build + lint ellenőrzés után zöldnek tekintendő.
- **Következő lépés:** `LandingNews` belső grid / modal inline értékek további osztályokra bontása; D4 `prefers-reduced-motion` összhang a motion tokenekkel.

## 2026-04-28 – D2 (design-pack integráció – brand jelenlét, első kör)

- **Mit:** `public/brand/` helyettes SVG-k (jelvény + szójel, `H&#214;K` entitás); `components/brand/BrandMark.tsx` kétrétegű `<img>` + `html[data-theme='dark']` váltás; `Navbar` / `Footer` / `LandingHero` / `(internal)` layout integráció; `docs/design-pack.md` + `design-pack/README` hivatkozás; `globals.css` `.brand-mark-swap*` és belső/footer layout osztályok; roadmap D2 mérföldkövek.
- **Állapot:** UI proof (§32.3): mind a négy zóna (hero, topbar, footer, belső fejléc) megjeleníti a brand SVG-t; sötét témában a „dark-bg” export látható; hivatalos export esetén a fájlok felülírása dokumentált (`docs/design-pack.md`).
- **Következő lépés:** stakeholder által jóváhagyott végső logófájlok bemásolása; opcionális `next/image` + PNG ha a brand útmutató előírja.

## 2026-04-28 – D3 (shared UI primitívek – első kör)

- **Mit:** `Skeleton` (news / search / gallery variantok), `EmptyState`, `ErrorState` (retry), `FilterChip`; `globals.css` animált skeleton + chip + üres/hiba kártya; bekötés: `NewsPageList`, `SearchPageClient` (index hiba + mentett keresés chip), `GalleryModule` (betöltés + üres nézetek), `GuidesModule` (kategória chip + üres); `docs/a11y-audit.md` és `docs/design-system.md` kiegészítés; roadmap D3 jelölés.
- **Állapot:** `npm run lint` + `npm run build` zöld.
- **Következő lépés:** `LandingNews` / további modulok lassú útvonalainak ugyanerre a mintára vitele; mobil menü a11y (D5).

## 2026-04-28 – D4 (motion + navbar scroll – első kör)

- **Mit:** `design-tokens`: `--motion-enter-translate-y`, `--motion-stagger-delay`; `globals.css`: `landing-fade-in` / `landing-rise-in`, `.animate-fade` / `.animate-rise`, `.motion-reveal`, stagger a modul kártyákon IO után, `.topbar-scrolled`, reduced-motion felülírások; `MotionReveal.tsx` (IO + `useLayoutEffect`); `LandingHero` + `Navbar`; `docs/design-system.md`, `docs/a11y-audit.md` (manuális checklist), roadmap D4.
- **Állapot:** build/lint zöld; a checklist tételeit éles QA-n pipálhatja a fejlesztő.
- **Következő lépés:** további szekciók `MotionReveal`-lel (pl. `LandingNews`); D5 mobil menü fókusz.

## 2026-04-28 – D5 (mobil navigáció a11y – első kör)

- **Mit:** `Navbar` mobil panel: `role="dialog"`, `aria-modal`, `aria-controls` / dinamikus `aria-label` a hamburgeren, `Tab` csapda, `Escape` + fókusz vissza a hamburgerre, `html`+`body` scroll lock; `globals.css` érintési minimum a mobil gyors gombokon; döntés **D-2026-04-28-008**; `a11y-audit.md` billentyűzetes séma; roadmap D5.
- **Állapot:** build/lint zöld; keskeny nézetben manuális próba javasolt.
- **Következő lépés:** modál host egységesítése (fókusz visszaállás); D7 `features/*` bővítés (roadmap).

## 2026-04-28 – D6 (publikus modulok vizuális egység – első kör)

- **Mit:** `docs/ui-audit-d6.md` audit táblázat a fő publikus útvonalakra; `/news` `PageShell` + `section`; hír lista kártyák: dátum (`<time>` + `.news-pub-date`) és címke/forrás sor elkülönítése (§32.1 #20); Office modul status-first hero + részlet rács (§32.1 #26); `app/globals.css` tokenes osztályok a fentihez; `docs/design-system.md` hivatkozás.
- **Állapot:** UI audit sor ez a bejegyzés; további route-ok finomhangolása az audit táblázat szerint iterálható.
- **Következő lépés:** `gallery` / `guides` / `about` oldalak PageShell egyezőség ellenőrzése éles QA-n; opcionális Zod áthelyezés `features/*/schema.ts` alá (mint `news`).

## 2026-04-28 – D7 (`features/*` kiterjesztés – első kör)

- **Mit:** Döntés **D-2026-04-28-009** (migrációs sorrend); `features/gallery`, `guides`, `events`, `about`, `office` `server.ts` modulok Prisma + mapper SSOT-tal; `app/api` érintett route-ok vékonyítva; `docs/api.md` SSOT sorok; roadmap D7 mérföldkövek.
- **Állapot:** build + lint zöldnek tekintendő a merge után.
- **Következő lépés:** D8 CI teszt; opcionálisan `bookings` / `calculator` API logika `features/` alá.

## 2026-04-28 – D8 (CI + polish, első kör)

- **Mit:** `.github/workflows/ci.yml` és `.gitlab-ci.yml` bővítése `npm run test` lépéssel a lint és build közé; roadmap D8 első mérföldkő jelölése.
- **Állapot:** helyi `npm run test`, `npm run lint`, `npm run build` futtatással ellenőrizhető.
- **Következő lépés:** opcionális egyszerű vizuális regresszió lista (Lighthouse export legalább egy publikus oldalra).

## 2026-04-28 – Backend hardening (audit trail kiterjesztés, első kör)

- **Mit:** központi audit helper (`lib/audit/write-audit.ts`) bevezetése; írási endpointok audit logolása a tartalom és admin műveletekre (`news`, `events`, `gallery`, `guides`, `about`, `office`, `bookings/[id]`, `calculator/state`, `users`, `categories`); dokumentáció frissítés `docs/security-audit.md`.
- **Állapot:** `npm run lint` + `npm run build` zöld.
- **Következő lépés:** per-route rate limit stratégia (nem csak login), maradék nyilvános POST endpointok audit/perzisztencia döntése.

## 2026-04-28 – Layout/design polish (inline style csokkentes + Lighthouse baseline)

- **Mit:** `SearchPageClient` inline style reszek class alapra allitasa (`search-*` osztalyok); `Core` primitívek inline padding/margin kivezetese (`.card-pad`, `.section-head-spaced`); D8 baseline checklist dokumentacio (`docs/lighthouse-baseline.md`) es roadmap D8 masodik pont jeloles.
- **Állapot:** lint + build zold.
- **Következő lépés:** maradek inline style-ok top 5 komponensben fokozatos kivezetese (D1 nyitott pont teljes zárás).

## 2026-04-28 – Logopack integracio (brand asset csere)

- **Mit:** `logopack/` forrasbol a aktiv hasznalt brand fajlok frissitese `public/brand/` alatt: jelveny light/dark (`szines_natur`, `feher_natur`) es szojel light/dark (`szines_teljes`, `feher_teljes`) a meglevo fajlnevekre masolva.
- **Állapot:** `BrandMark` minden zónában (navbar, hero, footer, internal) automatikusan az uj logokat adja; lint zold.
- **Következő lépés:** vizualis QA light/dark temaban, es ha kell arany/proporcion igazitas a `BrandMark` meretein.
