# Progress log

Rövid státusz minden lezárt vagy részben lezárt lépésről (master spec §24.1).

---

## 2026-05-09 – Fázis 10 (LCP / next.image / Lighthouse — lezárás)

- **Mit:** [`docs/lighthouse-baseline.md`](./lighthouse-baseline.md) LHCI + DoD; [`docs/modules/about.md`](./modules/about.md), [`gallery.md`](./modules/gallery.md) Teljesítmény / kép szekció; [`docs/phased-master-plan.md`](./phased-master-plan.md) Fázis 10 harmadik kör. Kód korábban kész: `AboutModule` / `GalleryModule` + `lib/remote-image-hosts.ts` + `next.config.ts`.
- **Állapot:** `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build` zöld.

## 2026-05-09 – Fázis 9 (ESLint CLI / Next kompatibilitás — lezárás)

- **Mit:** [`docs/eslint-cli-migration.md`](./eslint-cli-migration.md) DoD szakasz + Next ESLint link; [`docs/phased-master-plan.md`](./phased-master-plan.md) Fázis 9 harmadik kör; [`docs/go-live-checklist.md`](./go-live-checklist.md) §3.2 megjegyzés (`lint` = ESLint CLI).
- **Állapot:** `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build` zöld.

## 2026-05-09 – Fázis 8 (go-live / üzemeltetés — lezárás)

- **Mit:** [`docs/go-live-checklist.md`](./go-live-checklist.md) DoD + kapcsolódó linkek (privacy / GDPR / recovery); [`docs/teljes-uzemeltetesi-kezikonyv.md`](./teljes-uzemeltetesi-kezikonyv.md) §9.0 phased hivatkozás; [`docs/phased-master-plan.md`](./phased-master-plan.md) Fázis 8 harmadik kör.
- **Állapot:** `npm run typecheck`, `npm run test`, `npm run build` zöld.

## 2026-05-09 – Fázis 7 (mobil / navbar SSOT — lezárás)

- **Mit:** `styles/base.css` — navbar sor duplikátumok kiírva; `styles/components/navbar.css` — `.navbar-full` padding + `.nav-actions`; `Navbar.tsx` — `app-shell navbar-full`; `effects-v11-plus.css` — korai dupla navbar blokk törölve; [`docs/mobile-checklist.md`](./mobile-checklist.md), [`docs/documentation-index.md`](./documentation-index.md), [`docs/phased-master-plan.md`](./phased-master-plan.md).
- **Állapot:** `npm run typecheck`, `npm run test`, `npm run build` zöld.

## 2026-05-09 – Fázis 6 (éles DB-first — lezárás)

- **Mit:** [`docs/database.md`](./database.md) §2 CI migrate gate részletezése (mely jobok futtatják a `prisma migrate deploy`-t); §6 éles checklist bővítése (`provider`, go-live link); [`docs/phased-master-plan.md`](./phased-master-plan.md) Fázis 6 harmadik kör. Implementáció korábban kész: `content-fetch-policy`, `tests/content-fetch-policy.test.ts`, `.env.example` `ALLOW_DEMO_FALLBACK`, CI workflow.
- **Állapot:** `npm run typecheck`, `npm run test`, `npm run build` zöld.

## 2026-05-09 – Fázis 5 (modul dokumentáció — lezárás)

- **Mit:** [`docs/modules/privacy.md`](./modules/privacy.md), [`docs/modules/status.md`](./modules/status.md); [`docs/modules/README.md`](./modules/README.md) DoD + réteg B hivatkozás; [`docs/laikus-kodmagyarazo.md`](./laikus-kodmagyarazo.md) §7; [`docs/phased-master-plan.md`](./phased-master-plan.md) Fázis 5 harmadik kör.
- **Állapot:** `npm run typecheck`, `npm run test`, `npm run build` zöld.

## 2026-05-09 – Fázis 4 (mappastruktúra — lezárás)

- **Mit:** [`docs/folder-structure.md`](./folder-structure.md) publikus **útvonal ↔ réteg** táblázat; új [`features/README.md`](../features/README.md) (feature mappák + backlog: keresés, kalkulátor, stb.); új [`components/modules/README.md`](../components/modules/README.md) (pilot + migrációs checklist); [`features/news/README.md`](../features/news/README.md) UI sor pontosítva; [`docs/documentation-index.md`](./documentation-index.md), [`docs/phased-master-plan.md`](./phased-master-plan.md) Fázis 4 harmadik kör.
- **Állapot:** `npm run typecheck`, `npm run test`, `npm run build` zöld.

## 2026-05-09 – Fázis 3 (globális shell — dokumentáció lezárás)

- **Mit:** [`docs/global-shell.md`](./global-shell.md) szinkron **`app/layout.tsx`**-szel: `SeoJsonLd`, opcionális site design `<style>`, `AppProvider` gyerekek között `DocumentMetaSync` és `CookieConsentBar`, pontos DOM sorrend; `AppProvider` és overlay táblák (`requestConfirm`, session/szerepkör, `ModalHost` + `admin-modal-open`); belső layout `AdminWorkspaceChrome`; §6 gyökér-only komponensek; §7–§8 frissítés. [`docs/phased-master-plan.md`](./phased-master-plan.md) Fázis 3 harmadik kör állapot.
- **Állapot:** `npm run typecheck`, `npm run test`, `npm run build` zöld.

## 2026-05-09 – Fázis 2 (CSS architektúra — partialok)

- **Mit:** `styles/components/landing-news-extras.css`, `modal-grid.css`, `admin-login-form.css`, `admin-modal-scroll-lock.css`; `base.css` ~200 sorral rövidebb; eltávolítva a `admin-modal-*` **duplikát** (egy forrás: `effects-v11-plus.css`). `app/globals.css` import sorrend; `docs/global-shell.md`, `phased-master-plan` Fázis 2 állapot.
- **Állapot:** `npm run build` zöld.

## 2026-05-09 – Fázis 1 (SSOT: inline stílus + részleges i18n)

- **Mit:** minden `style={{…}}` eltávolítva a TSX-ből; új / bővített osztályok: `styles/base.css` (`.input-file-hidden`), `styles/modules/admin.css` (admin utility-k), `styles/modules/calendar.css` (`.calendar-modal-field-gap`, `.calendar-stagger-0…40`, modál `.news-form-actions` override), `styles/modules/status-public.css` + `app/globals.css` import; `/status` → `StatusPageClient` + `messages.statusPage` + `routeMeta.status`; galéria toolbar: `manageFolders` / `uploadImage` / `bulkUpload` i18n kulcsok.
- **Doksi:** [`docs/phased-master-plan.md`](./phased-master-plan.md) Fázis 1 állapot, [`docs/design-system.md`](./design-system.md) §4 pipa.

## 2026-05-09 – §12 Fázis 20 (DR/BCP, go-back)

- **Mit:** új [`docs/dr-bcp-phase20.md`](./dr-bcp-phase20.md) — RTO/RPO javasolt célok, éves DR gyakorlat (DB drill + S3 inventory + deploy/rollback), staging read-only DB chaos jegyzet, go-live / go-back lépések, feature flag + env kill switch táblázat (`lib/feature-flags/registry.ts`, `.env.example` hivatkozások).
- **Kapcsolódó frissítés:** [`docs/recovery-checklist.md`](./recovery-checklist.md), [`docs/go-live-checklist.md`](./go-live-checklist.md), [`docs/documentation-index.md`](./documentation-index.md), [`docs/teljes-modul-keszultseg-es-uzemeltetesi-atadas-2026-05-08.md`](./teljes-modul-keszultseg-es-uzemeltetesi-atadas-2026-05-08.md) §12 Fázis 20.
- **Állapot:** végleges RTO/RPO és PITR a szervezet / DB szolgáltató egyeztetése szerint továbbra is üzemeltetői döntés.

## 2026-05-09 – §12 Fázis 16 (biztonság mélyvíz)

- **Mit:** edge POST burst limit (`middleware.ts` + `edge-critical-post-limit.ts`); `public/.well-known/security.txt`; `docs/security-disclosure.md`, `security-asvs-self-audit.md`, `security-supply-chain.md`; `npm run ops:audit-report`; `security-walkthrough` + átadási doc frissítés.
- **Állapot:** pen-test / SBOM pipeline továbbra is külön szolgáltatás / backlog.

## 2026-05-09 – §12 Fázis 19 (integrációk, API szerződés)

- **Mit:** `GET /api/v1/public/feed` + kulcs/rate limit; `GET /api/admin/integrations-health`, `POST /api/admin/integrations/smtp-verify`; `lib/integrations/*`, `verifySmtpConnection` / `isSmtpConfigured` a mailerben; `/admin/integrations` UI; `docs/integrations-read-api-and-webhooks.md`; `api.md`, quick-links, dashboard link, `.env.example`, átadási doc §12 Fázis 19.
- **Állapot:** webhook utolsó siker időbélyeg tárolása továbbra is backlog.

## 2026-05-09 – §12 Fázis 18 (i18n/SEO/a11y 2.0)

- **Mit:** `lib/seo.ts` hreflang + `plainTextExcerpt`; `lib/seo/jsonld.tsx` + gyökér `@graph`; `PublicRouteJsonLd` fő publikus oldalakon; hír `NewsArticle` + custom Builder `generateMetadata` + JSON-LD; `/search?q=` prefill; `lighthouserc` `/about` + `/search`; doksi `seo-hreflang-jsonld-phase18.md`, `wcag-phase18-backlog.md`, `seo-audit` / `a11y-audit` / átadási doc §12 Fázis 18.
- **Állapot:** külön locale URL-ek és dinamikus Event JSON-LD backlog maradt.

## 2026-05-09 – §12 Fázis 16 (lezárás: SBOM, WAF, pen-test scope)

- **Mit:** `docs/security-pen-test-scope.md`, `docs/security-waf-proxy-rulebook.md`; `scripts/ops/npm-sbom.cjs` + `npm run ops:sbom` → `.ops/sbom.cdx.json`; GitHub + GitLab CI artifact bővítés; `security-disclosure` / `security-supply-chain` / `security-walkthrough` / `documentation-index` / átadási doc §12 Fázis 16 frissítés.
- **Állapot:** külső pen-test **végrehajtott jegyzőkönyve** és éles WAF tuning továbbra is üzemeltetői / beszállító feladat.

## 2026-05-09 – §12 Fázis 17 (megfigyelhetőség, SRE)

- **Mit:** `docs/sli-slo-error-budget.md`, `docs/synthetic-monitoring.md`; `e2e/production-public-smoke.spec.ts` + `playwright.production.config.ts` + `npm run test:e2e:prod-smoke`; fő `playwright.config.ts` `testIgnore` erre a specre; GitHub `production-smoke.yml` (secret + opcionális `PRODUCTION_SMOKE_ENABLED`); publikus `/status`; index / go-live / alerting / testing / átadási doc frissítés.
- **Állapot:** külső status page + multi-region külső poller továbbra is backlog.

## 2026-05-09 – §12 Fázis 16 (folytatás: audit CI artifact)

- **Mit:** `ops:audit-report` lefuttatva lokálisan (jelenlegi összegzés: 10 finding); GitHub `test` job + GitLab `test` stage: artifact + nem gate (`continue-on-error` / `|| true`), hogy a meglévő npm audit findingek ne állítsák meg a pipeline-ot, de a riport megmaradjon.

## 2026-05-09 – §12 Fázis 15 (média / S3 / DR)

- **Mit:** `STORAGE_DRIVER` local vs S3; `lib/media/storage-write.ts`, `storage-config`, `s3-client`, `s3-presigned`; galéria + útmutató feltöltés refaktor (`upload-policy`); opcionális `UPLOAD_SCAN_WEBHOOK_URL`; `POST/GET /api/admin/storage/presign-*`; `npm run ops:s3-upload-inventory`; `@aws-sdk/client-s3` + presigner; `remotePatterns` bővítés S3 publikus hosttal; `docs/media-object-storage-dr.md`, API + átadási doc.
- **Állapot:** éles S3-hoz env kitöltése szükséges; alapértelmezés továbbra is helyi `public/uploads`.

## 2026-05-09 – §12 Fázis 14 (keresés, analytics)

- **Mit:** `SearchDocument` + `SearchQueryStat` Prisma modellek és migráció; `lib/search/*` (index szinkron, rebuild, lekérdezés, stat); `GET /api/search` + rate limit; `GET /api/admin/search-analytics`, `GET /api/admin/search/similar`; `SearchPageClient` szerverindexre; `/admin/search-analytics`; `npm run ops:rebuild-search-index`; seed végén index rebuild; `docs/search-and-discovery.md`, `docs/api.md`, átadási doc §12 frissítve.
- **Állapot:** `prisma generate` + `db:migrate` után typecheck/build lokálisan.

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

- **Mit:** `SearchPageClient` inline style részek class alapra állítása (`search-*` osztályok); `Core` primitívek inline padding/margin kivezetése (`.card-pad`, `.section-head-spaced`); D8 baseline checklist dokumentáció (`docs/lighthouse-baseline.md`) és roadmap D8 második pont jelölése.
- **Állapot:** lint + build zöld.
- **Következő lépés:** maradek inline style-ok top 5 komponensben fokozatos kivezetese (D1 nyitott pont teljes zárás).

## 2026-04-28 – Logopack integráció (brand asset csere)

- **Mit:** `logopack/` forrásból az aktívan használt brand fájlok frissítése `public/brand/` alatt: jelvény light/dark (`szines_natur`, `feher_natur`) és szójel light/dark (`szines_teljes`, `feher_teljes`) a meglévő fájlnevekre másolva.
- **Állapot:** `BrandMark` minden zónában (navbar, hero, footer, internal) automatikusan az új logókat adja; lint zöld.
- **Következő lépés:** vizuális QA light/dark témában, és ha kell arány/proporció igazítás a `BrandMark` méretein.

## 2026-05-03 – Fázisolt mesterütemterv Fázis 1 (About – első kör)

- **Mit:** `AboutModule` statikus szövegei és toast/confirm üzenetei átkerültek `lib/i18n/messages.ts` alá (`about` + `common.delete`); fallback narratíva és demó tag POST mezők a szótárból; inline `style` eltávolítva, helyette `about-*` osztályok `app/globals.css`-ben (tokenes térközök). Döntés: **D-2026-05-03-001**.
- **Állapot:** `npm run lint`, `npm run test`, `npm run build` zöld.
- **Következő lépés:** Fázis 1 soron `GalleryModule`, majd `GuidesModule`, `CalendarModule`, végül search + admin maradék inline/i18n.

## 2026-05-03 – Fázis 1 (Galéria + Útmutatók SSOT)

- **Mit:** `GalleryModule` és `GuidesModule` feliratai, üres állapotok, toastok, demó API mezők → `messages.ts` (`gallery`, `guides`); törlés gomb → `common.delete`; inline stílusok helyett `gallery-*` és `guides-*` osztályok a `globals.css`-ben; mappa elemszám EN: `item` / `items` helyesragozás.
- **Állapot:** `npm run lint` + `npm run build` zöld.
- **Következő lépés (§27 / fázisolt terv):** `CalendarModule` maradék szövegek i18n; `LandingNews` tömörített JSX inline-jainak szétválasztása; §29 (E2E, SEO `generateMetadata`, kategória-híd, éles DB-first) – döntés és ütem a `decision-log` + stakeholder egyeztetés szerint. A **100% §27** egy ütemterv, nem egy commit: hátralévő tételek: `docs/phased-master-plan.md` Fázis 1–15 + spec §29–§32 ellenőrzőlisták.

## 2026-05-03 – Fázis 1 (Naptár modul i18n)

- **Mit:** `CalendarModule` összes felhasználói szövege (fejléc, nézetváltók, szűrők, navigáció aria, timeline/kártya/naptár üzenetek, foglalási modál, státusz modál, toastok) → `messages.ts` `calendar` blokk; `POST /api/bookings` és `POST /api/events` demó mezők → `messages.hu` / `messages.en`; fallback foglalás cím → `defaultBookingTitle`.
- **Állapot:** `npm run lint` + `npm run build` zöld.
- **Következő lépés:** Fázis 1 maradék: `SearchPageClient` / admin oldalak / `LandingNews` inline; vagy Fázis 2 (`globals.css` partialok) a `phased-master-plan.md` szerint.

## 2026-05-03 – Fázis 2 pilot (CSS modul partialok)

- **Mit:** `styles/modules/about.css`, `guides.css`, `gallery.css` létrehozva; tartalom kivéve az `app/globals.css`-ből; `globals.css` tetején `@import` lánc a tokenek után. `docs/module-file-responsibility-map.md` frissítve.
- **Állapot:** `npm run build` zöld.
- **Következő lépés:** további blokk-kivitelek (`navbar`, `calendar`, `news`, `admin` stb.) vagy `styles/base.css` + `styles/components/*` a `phased-master-plan.md` Fázis 2 szerint.

## 2026-05-03 – Fázis 2 (naptár + hír CSS partial)

- **Mit:** `styles/modules/calendar.css` (naptár / foglalás / v2.7.3 timeline + `event-grid-wide` responsive); `styles/modules/news.css` (lista, részlet, modul rács, `news-form-actions`, `news-admin-actions`, 1080/900/980 breakpointok); duplikált szabályok összevonva ahol kellett (`news-form-actions` + mobil gomb szélesség). A `globals.css`-ben megmaradt: `.muted-text` (több modul), valamint a kereszt-komponens animáció / tap / aria-label szabályokban szereplő `.calendar-day-cell` és `.news-list-card.clickable` hivatkozások.
- **Állapot:** `npm run lint`, `npm run build`, `npm run test` zöld.
- **Következő lépés:** `navbar` / `admin` utility blokkok vagy `styles/base.css` + `styles/components/*`; Fázis 1 maradék i18n/inline (`SearchPageClient`, admin, `LandingNews`).

## 2026-05-03 – Mappa- és struktúra-rend

- **Mit:** Törölve az üres, párhuzamos route-mappák (`app/about`, `app/calendar`, `app/calculator`, `app/gallery`, `app/guides`, `app/office`) — a valós oldalak csak `app/(public)/…` alatt vannak; törölve az üres `components/admin/`. Új kanonikus leírás: `docs/folder-structure.md`; hivatkozás: `docs/documentation-index.md`, `docs/architecture.md`, `PROJECT_MASTER_SPEC.md` §23 bevezető.
- **Állapot:** `npm run build` ellenőrizve.
- **Következő lépés:** — (teljesítve: lásd alább „Dokumentáció + content mappa”.)

## 2026-05-04 – Prisma + `.env.local` + Next patch

- **Mit:** `scripts/prisma-env.cjs` — a `postinstall` / `db:migrate` / `db:seed` / `db:push` / `db:studio` / `db:generate` előtt betölti a `.env`, majd a `.env.local` kulcsait (így a `cp .env.example .env.local` + `npm run db:migrate` nem dob `DATABASE_URL` hiányt). Next.js **15.5.7 → 15.5.15** (biztonsági patch). `.env.example`, `README`, `docs/demo-es-lokal-teszteles-utmutato.md` frissítve; gyakori hiba: EPERM Windows alatt zárolt `node_modules`.
- **Állapot:** `npm run build` zöld (Next 15.5.15).
- **Következő lépés:** opcionális `npm audit` / függőség-tisztítás; Prisma 7 `prisma.config.ts` migráció külön döntés.

## 2026-05-03 – Dokumentáció + `content` mappa rend

- **Mit:** `DOCUMENTATION_PROJECT_WORKFLOW.md` áthelyezve → `docs/DOCUMENTATION_PROJECT_WORKFLOW.md` (belső linkek: `../PROJECT_MASTER_SPEC.md`, `./repository.md`, `../README.md`); gyökérben **stub** maradt a régi elérésekhez. `docs/project-workflow.md`, `docs/documentation-index.md`, `docs/folder-structure.md`, `PROJECT_MASTER_SPEC.md` §23 fa frissítve. Üres `content/` mappa törölve; a workflow táblázatban a `content/` sor frissítve.
- **Állapot:** `npm run build` zöld.
- **Következő lépés:** Fázis 1 maradék (i18n/inline: `SearchPageClient`, admin oldalak, `LandingNews`); opcionális Fázis 2 `nav-shell.css`.

## 2026-05-03 – Fázis 2 (admin CSS partial)

- **Mit:** `styles/modules/admin.css`: `admin-chip-row`, `admin-toolbar`, `search-admin-row` (+ 900px), `admin-module-panel` / `actions` / `stage`, `admin-actions-panel` (+ 1100px sticky off), `admin-module-actions.vertical`, valamint az SSOT utility sor (`admin-form-row` … `admin-quick-links`). A `globals.css`-ben megmaradtak a többszörös / V12 modal rétegek (`admin-modal-portal`, `admin-modal-window`, animációk), hogy a kaszkád ne változzon.
- **Állapot:** `npm run lint`, `npm run build`, `npm run test` zöld.
- **Következő lépés:** `nav-shell` / topbar + `nav-links` alap blokk kiszervezése (óvatosan a duplikátumok miatt), vagy Fázis 1 maradék.

## 2026-05-03 – Fázis 8 (go-live dokumentáció)

- **Mit:** Új **[`docs/go-live-checklist.md`](./go-live-checklist.md)** (domain, TLS, hosting/env, PostgreSQL + migráció, backup/restore drill, monitoring/incidens, analytics GDPR, jogi/impresszum és lábléc feladat, SEO/mobil smoke, deploy nap); [`teljes-uzemeltetesi-kezikonyv.md`](./teljes-uzemeltetesi-kezikonyv.md) §9.0 hivatkozás; [`documentation-index.md`](./documentation-index.md), [`phased-master-plan.md`](./phased-master-plan.md) Fázis 8 állapot; döntés: **[D-2026-05-03-002](decision-log.md)**.
- **Állapot:** Dokumentációs változtatás; kód nem módosult.
- **Következő lépés:** Fázis 9 (ESLint CLI) vagy impresszum / adatvédelmi **route-ok** + `Footer` linkek a checklist §7 szerint.

## 2026-05-03 – Fázis 9 (ESLint CLI)

- **Mit:** `package.json` → `"lint": "eslint ."`; [`eslint.config.mjs`](../eslint.config.mjs) — globális **ignores** (`.next`, `node_modules`, …), **`*.cjs`** override (`@typescript-eslint/no-require-imports` off), nevű export a configra. Új **[`docs/eslint-cli-migration.md`](./eslint-cli-migration.md)**; frissítve: [`phased-master-plan.md`](./phased-master-plan.md), [`documentation-index.md`](./documentation-index.md), [`DOCUMENTATION_PROJECT_WORKFLOW.md`](./DOCUMENTATION_PROJECT_WORKFLOW.md); **[D-2026-05-03-003](decision-log.md)**.
- **Állapot:** `npm run lint`, `npm run test`, `npm run build` zöld.
- **Következő lépés:** Fázis 10 (LCP / `next/image`) vagy impresszum route-ok (Fázis 8 checklist).

## 2026-05-03 – Fázis 5 (második kör: modul doc bővítés)

- **Mit:** [`docs/modules/news.md`](./modules/news.md), [`office.md`](./modules/office.md), [`events.md`](./modules/events.md); [`docs/modules/README.md`](./modules/README.md) index táblázat; [`docs/phased-master-plan.md`](./phased-master-plan.md) Fázis 5 állapot; [`docs/laikus-kodmagyarazo.md`](./laikus-kodmagyarazo.md) §7.
- **Állapot:** Dokumentáció; build nem változott.

## 2026-05-03 – Fázis 4 (második kör: feature README-k)

- **Mit:** `features/about`, `office`, `events`, `guides`, `gallery`, `news` — új **`README.md`** (rétegek, API, UI, lib). [`docs/folder-structure.md`](./folder-structure.md) `features/` sor + Fázis 4 blokk; [`docs/phased-master-plan.md`](./phased-master-plan.md) Fázis 4 állapot.
- **Állapot:** Dokumentáció + repo konvenció; build nem változott.

## 2026-05-03 – Fázis 3 (második kör: global-shell doc)

- **Mit:** [`docs/global-shell.md`](./global-shell.md) — `globals.css` **@import sorrend** leírva; `GlobalUiInteractions` **data-expanded + aria-expanded**; közös UI táblázat bővítve (`EmptyState`, `ErrorState`, `Skeleton`, `FilterChip`, `MotionReveal`, `AdminModal`, `BrandMark`); új §7 skip link / metadata / Fázis 11; ellenőrző lista §8. [`docs/phased-master-plan.md`](./phased-master-plan.md) Fázis 3 állapot; [`docs/architecture.md`](./architecture.md) stílus sor.
- **Állapot:** Dokumentáció; build nem változott.

## 2026-05-03 – Fázis 2 (második kör: calculator CSS modul)

- **Mit:** Új [`styles/modules/calculator.css`](../styles/modules/calculator.css) — összegző sáv, metrikák, félév / tárgy sorok (korábban `styles/base.css` végén); [`app/globals.css`](../app/globals.css) `@import` a `calendar` és `news` modulok közé; [`styles/base.css`](../styles/base.css) rövidítve. [`docs/phased-master-plan.md`](./phased-master-plan.md) Fázis 2 állapot; [`docs/folder-structure.md`](./folder-structure.md) példa sor.
- **Állapot:** `npm run lint`, `npm run build` zöld.
- **Következő lépés:** Fázis 2 tovább — `base.css` modál / admin ismétlődő blokkok konszolidálása (külön `components/modal-*.css` döntés + `decision-log`), vagy Fázis 1 maradék.

## 2026-05-03 – Fázis 1 (első kör: LandingNews SSOT)

- **Mit:** `LandingNews.tsx` újraírva olvasható JSX-re; **nincs** `style={{`}; új CSS: `styles/modules/news.css` (`landing-news-*`, `news-modal-meta-*`). `lib/landingDictionary.ts` bővítve (toast hibák, űrlap címkék, adapter placeholder-ek, archívum számláló feliratok, alapértelmezett kategória/szerző/cím). Kártya rács: `landing-news-featured-grid` / `landing-news-row-grid`; billentyűzet: Enter / Space a kártyán.
- **Állapot:** `npm run lint`, `npm run test`, `npm run build` zöld.
- **Következő lépés:** Fázis 1 maradék — `SearchPageClient`, admin oldalak, `CalendarModule` / `GuidesModule` grep `style={{`; opcionálisan a kezdő `customCategories` tömb i18n-be.

## 2026-05-03 – Fázis 10 (LCP / `next/image`)

- **Mit:** [`lib/remote-image-hosts.ts`](../lib/remote-image-hosts.ts) — hostlista + `getNextImageRemotePatterns()` / `isRemoteImageHostOptimizable()`; [`next.config.ts`](../next.config.ts) `images.remotePatterns`. **Galéria:** `next/image` (`fill` + `sizes`, modál 800×520); **About:** 62×62 avatár. Ismeretlen host: `<img loading="lazy">`. **CSS:** `gallery-card-media-frame`, `gallery-preview-image-wrap` → `position: relative`. [`docs/lighthouse-baseline.md`](./lighthouse-baseline.md) — scope `/about`, `/gallery`, mérési útmutató, táblázat. **[D-2026-05-03-004](decision-log.md)**; [`phased-master-plan.md`](./phased-master-plan.md) Fázis 10 állapot.
- **Állapot:** `npm run lint`, `npm run test`, `npm run build` zöld.
- **Következő lépés:** Lighthouse számok kitöltése a baseline táblában egy rögzített méréssel; további `<img>` modulok; impresszum (Fázis 8).

## 2026-05-07 – Fázis P6 (első kör: link checker + broken-link detector alap)

- **Mit:** Új admin endpointok: [`app/api/admin/guides/link-health/route.ts`](../app/api/admin/guides/link-health/route.ts) és [`app/api/admin/gallery/link-health/route.ts`](../app/api/admin/gallery/link-health/route.ts). Mindkettő RBAC-olt (`OFFICE`/`ADMIN`), URL elérhetőséget ellenőriz (`HEAD`, fallback `GET`, timeout), és összesített eredményt ad vissza.
- **Mit (UI):** [`components/guides/GuidesModule.tsx`](../components/guides/GuidesModule.tsx) és [`components/gallery/GalleryModule.tsx`](../components/gallery/GalleryModule.tsx) admin toolbar gombot kapott linkellenőrzésre; toast összegzés + hibás elemek részletező modál.
- **Mit (i18n):** [`lib/i18n/messages.ts`](../lib/i18n/messages.ts) új HU/EN kulcsok a két ellenőrző funkcióhoz.
- **Állapot:** `npm run lint -- <érintett fájlok>` zöld.
- **Következő lépés:** P6 folytatás: fájlfeltöltés backend (`gallery` + `guides`) és galéria thumbnail pipeline.

## 2026-05-07 – Fázis P7 (első kör: export + read-only share link)

- **Mit:** [`lib/calculator/export.ts`](../lib/calculator/export.ts) bővítve `CSV` exporttal (`downloadCalculatorCsv`) és read-only share token/link helperrel (`buildCalculatorShareLink`, `parseCalculatorShareToken`).
- **Mit (UI):** [`components/calculator/CalculatorModule.tsx`](../components/calculator/CalculatorModule.tsx) új műveletek: `CSV` export, `PDF/print` export (`window.print()`), read-only megosztó link másolás; `?share=...&mode=readonly` esetén megosztott állapot betöltése és szerkesztés tiltása.
- **Mit (i18n):** [`lib/i18n/messages.ts`](../lib/i18n/messages.ts) új HU/EN kalkulátor kulcsok az export/share/read-only jelzésekhez.
- **Állapot:** `npm run lint -- <érintett fájlok>` + `npm run build` zöld.
- **Következő lépés:** P7 folytatás: state migration helper + import validáció javítás + compare/benchmark nézet + domain tesztek bővítése.

## 2026-05-08 – Fázis P7 (második kör: migráció, import, benchmark, formula verzió)

- **Mit (képlet SSOT):** [`lib/calculator/formula-version.ts`](../lib/calculator/formula-version.ts) — `CALCULATOR_FORMULA_VERSION`; az export payload és a share token tartalmazza (`lib/calculator/export.ts`).
- **Mit (import / migráció):** [`lib/calculator/migrate.ts`](../lib/calculator/migrate.ts) — `migrateCalculatorImport` (nyers tömb, `{ semesters }`, export wrapper), legacy `completed` boolean → jegy normalizálás, opcionális `reassignCalculatorIds`; read-only share betöltés a modulban is ezen megy keresztül.
- **Mit (compare):** [`lib/calculator/benchmarks.ts`](../lib/calculator/benchmarks.ts) három mintaállapot; [`components/calculator/CalculatorModule.tsx`](../components/calculator/CalculatorModule.tsx) összehasonlító összegző sor + rejtett JSON fájl import.
- **Mit (UI/CSS):** [`styles/modules/calculator.css`](../styles/modules/calculator.css) compare panel + `calculator-sr-only`.
- **Mit (doksi/teszt):** [`docs/calculator-rules.md`](../docs/calculator-rules.md) export/import megjegyzés; új [`tests/calculator-migrate.test.ts`](../tests/calculator-migrate.test.ts).
- **Mit (i18n):** [`lib/i18n/messages.ts`](../lib/i18n/messages.ts) import + compare + formula sor HU/EN.
- **Állapot:** `npm run typecheck`, `npm run test` zöld.
- **Következő lépés:** P7 tovább: képlet változás esetén verziófüggő számítási ág (ha a szabályok eltérnek), összehasonlító UX finomítás (delta / különbség), opcionális szerveroldali import validáció.

## 2026-05-07 – Fázis P8 (első kör: About timeline/alumni + Office history)

- **Mit (About):** [`components/modules/about/AboutModule.tsx`](../components/modules/about/AboutModule.tsx) kiegészítve timeline blokk megjelenítéssel (`blockKey` alapján) és külön alumni szekcióval (csoportnév alapján szétválasztott aktív/alumni taglisták).
- **Mit (Office):** új admin endpoint [`app/api/admin/office/history/route.ts`](../app/api/admin/office/history/route.ts) az iroda módosítási előzményekhez (audit logból), és UI gomb/modálos megjelenítés az [`components/office/OfficeModule.tsx`](../components/office/OfficeModule.tsx) toolbarban.
- **Mit (i18n):** [`lib/i18n/messages.ts`](../lib/i18n/messages.ts) új HU/EN kulcsok: About timeline/alumni címsorok, Office history feliratok/hibák/üres állapot.
- **Állapot:** `npm run lint -- <érintett fájlok>` + `npm run build` zöld.
- **Következő lépés:** P8 folytatás: Office heti ütemező + nyitvatartás alapú automata státusz prototípus, About publikációs dátum + csoporton belüli sorrend finomhangolás.

## 2026-05-08 – Fázis P8 (második kör: About publikáció/alumni + Office heti ütem + belső mező)

- **Mit (adatmodell):** `AboutMember` bővítve `publishedAt`, `isAlumni`; `OfficeSnapshot` bővítve `weeklyScheduleHu/En`, `internalNoteHu/En` mezőkkel. Migráció: [`prisma/migrations/20260508183000_p8_about_member_office_extended/migration.sql`](../prisma/migrations/20260508183000_p8_about_member_office_extended/migration.sql).
- **Mit (About):** [`components/modules/about/AboutModule.tsx`](../components/modules/about/AboutModule.tsx) csoporton belüli rendezés finomítva (`sortOrder`, majd `publishedAt`), alumni szétválasztás explicit `isAlumni` alapján is; member szerkesztő modal új mezőket kapott (`publishedAt`, `isAlumni`) és a kártyákon megjelenik a publikációs dátum.
- **Mit (Office):** [`components/office/OfficeModule.tsx`](../components/office/OfficeModule.tsx) heti ütemezés mezők és belső megjegyzés szerkesztése; publikus nézeten „mai sor” kiemelés (`findTodayScheduleLine` helper), belső megjegyzés csak staff számára látható.
- **Mit (RBAC/API):** [`features/office/server.ts`](../features/office/server.ts) vendég válaszból `internalNote*` kitakarás; patch támogatja az új mezőket.
- **Mit (SSOT):** [`types/about.ts`](../types/about.ts), [`lib/mappers/about.ts`](../lib/mappers/about.ts), [`lib/validation/about.ts`](../lib/validation/about.ts), [`lib/i18n/messages.ts`](../lib/i18n/messages.ts) frissítve az új mezőkhöz.
- **Állapot:** `npm run db:generate`, `npm run typecheck`, `npm run test` zöld.
- **Következő lépés:** P8 folytatás: Office státusz automata szabály (`open/closed/by-appointment`) a heti sor alapján, About social/link validáció + képfeltöltés workflow.

## 2026-05-07 – Fázis P9 (első kör: API contract tesztek + CI bontás)

- **Mit (teszt):** új [`tests/api-contract.test.ts`](../tests/api-contract.test.ts) smoke/contract tesztek a fő publikus írási payloadokra (`bookings`, `events`, `feedback`) és `calculator state` keretszabályra.
- **Mit (npm script):** [`package.json`](../package.json) új `typecheck` script: `tsc --noEmit`.
- **Mit (CI):** GitHub Actions [`ci.yml`](../.github/workflows/ci.yml) szétbontva külön jobokra: `lint`, `typecheck`, `test`, `build` (`build` a többi sikerére vár); GitLab pipeline [` .gitlab-ci.yml`](../.gitlab-ci.yml) külön stage-ekre bontva ugyanezzel a sorrenddel.
- **Állapot:** `npm run typecheck`, `npm run test`, `npm run build` zöld.
- **Következő lépés:** P9 folytatás: structured log + correlation ID (request scope) legalább kritikus auth/content endpointokra, majd health/incident runbook kiterjesztés.

## 2026-05-08 – Fázis P9 (második kör: correlation ID + structured log kiterjesztés)

- **Mit (observability helper):** új [`lib/observability/request-context.ts`](../lib/observability/request-context.ts) helper (`getRequestId`, `withRequestId`) az `x-request-id` fejléchez; bejövő header megtartás, hiány esetén UUID generálás.
- **Mit (auth):** [`app/api/auth/login/route.ts`](../app/api/auth/login/route.ts) minden log esemény (`invalid_body`, `rate_limited`, `invalid_credentials`, `success`) `requestId` meta-val megy; minden válaszra felkerül az `x-request-id` header.
- **Mit (feedback):** [`app/api/feedback/route.ts`](../app/api/feedback/route.ts) bővítve structured logokkal (`rate_limited`, `invalid_body`, `captcha_failed`, `persist_failed`) és egységes `x-request-id` response headerrel.
- **Mit (content):** [`app/api/news/route.ts`](../app/api/news/route.ts) POST flow logolás (`forbidden`, `invalid_json`, `validation_failed`, `duplicate_ingest`, `success`) `requestId` meta-val; válasz headeren `x-request-id`.
- **Mit (teszt):** új [`tests/request-context.test.ts`](../tests/request-context.test.ts) a request ID helper viselkedésére.
- **Állapot:** `npm run typecheck`, `npm run test` zöld.
- **Következő lépés:** P9 folytatás: ugyanilyen request-scope logolás további kritikus írási endpointokra (`/api/bookings`, `/api/events`, admin írási route-ok), majd incidents runbook frissítés konkrét query példákkal.

## 2026-05-07 – Fázis P10 (első kör: feature flag rendszer v1)

- **Mit:** új feature flag registry [`lib/feature-flags/registry.ts`](../lib/feature-flags/registry.ts) központi definíciókkal, env alapértékkel és futásidejű (in-memory) override-dal.
- **Mit (API):** új admin endpoint [`app/api/admin/feature-flags/route.ts`](../app/api/admin/feature-flags/route.ts) (`GET` lista, `PATCH` toggle), ADMIN jogosultság ellenőrzéssel.
- **Mit (UI):** új admin oldal [`app/(internal)/admin/feature-flags/page.tsx`](../app/(internal)/admin/feature-flags/page.tsx) kapcsolókkal; bekötve az admin dashboard quick action-be és belső fejléc navigációba.
- **Mit (flag usage):** [`app/api/admin/office/history/route.ts`](../app/api/admin/office/history/route.ts) az `officeHistoryPanel` flag alapján enged/tilt.
- **Mit (i18n):** [`lib/i18n/messages.ts`](../lib/i18n/messages.ts) új HU/EN kulcsok a feature flag admin nézethez.
- **Állapot:** `npm run lint -- <érintett fájlok>` + `npm run build` zöld.
- **Következő lépés:** P10 folytatás: Lighthouse CI gate (perf budget) + release checklist pipeline + retention beállítások admin UI.

## 2026-05-08 – Fázis P10 (második kör: Lighthouse CI gate – performance budget)

- **Mit (LHCI):** új `lighthouserc.cjs` alapszabályokkal (desktop preset, 5 publikus URL, kategória-minimumok warn szinten).
- **Mit (npm):** `package.json` új `lhci` script (`lhci autorun`) és `@lhci/cli` devDependency.
- **Mit (CI):** GitHub Actions `ci.yml` új `lighthouse` jobbal (build után fut), GitLab pipeline új `lighthouse` stage+job (Debian image).
- **Állapot:** lokális `typecheck/test` zöld; CI-ben a gate első futás után finomhangolható (minScore, URL lista, run count).

## 2026-05-08 – Teljes minőségi ellenőrzés (cross-phase audit)

- **Mit:** teljes automatizált ellenőrzési kör futtatva (`lint`, `typecheck`, `test`, `build`, `lhci`, `npm audit --omit=dev`), eredmények dokumentálva: [`docs/teljes-minosegi-audit-2026-05-08.md`](./teljes-minosegi-audit-2026-05-08.md).
- **Állapot:** lint/typecheck/test/build zöld; LHCI helyi futás `NO_NAVSTART` hibával reprodukálható, CI gate továbbra konfigurálva; npm audit transitive issue-k nyitottak (Next/Prisma lánc).

## 2026-05-08 – Fázis P3 (első kör: feedback admin workflow)

- **Mit (API/UI):** létrehozva `/admin/feedback` admin oldal (lista + szerkesztő modál) a `GET /api/admin/feedback` és `PATCH /api/admin/feedback/[id]` végpontokra építve (státusz: `new/in_progress/closed`, assignee: csak ADMIN, `internalNote`).
- **Mit (navigation):** `app/api/admin/db-overview/route.ts` frissítve, hogy a DB overview kártya a `Visszajelzések` sort `'/admin/feedback'`-re hivatkozza.
- **Mit (dashboard):** admin dashboard quick link kiegészítve `/admin/feedback`-kel (staff jogosultsággal).
- **Állapot:** `npm run typecheck`, `npm run test`, `npm run build` zöld.
- **Következő lépés:** P3 folytatás: CSV export + modul szerinti keresési UX finomítás, webhook/email értesítés, opcionális spam-score.

## 2026-05-08 – Fázis P3 (második kör: CSV export + webhook értesítés)

- **Mit (API export):** új [`app/api/admin/feedback/export/route.ts`](../app/api/admin/feedback/export/route.ts) CSV export endpoint státusz/modul/q/limit szűrőkkel (RBAC: `OFFICE/ADMIN`).
- **Mit (admin UI):** [`app/(internal)/admin/feedback/page.tsx`](../app/(internal)/admin/feedback/page.tsx) új `Export CSV` gomb, amely az aktuális szűrőkkel nyitja az export route-ot.
- **Mit (értesítés):** új [`lib/notifications/feedback.ts`](../lib/notifications/feedback.ts) opcionális webhook notifier (`FEEDBACK_NOTIFY_WEBHOOK_URL`) és bekötés a publikus feedback create flow-ba (`app/api/feedback/route.ts`).
- **Mit (env):** [`.env.example`](../.env.example) dokumentálja a `FEEDBACK_NOTIFY_WEBHOOK_URL` változót.
- **Állapot:** `npm run typecheck`, `npm run test` zöld.
- **Következő lépés:** P3 folytatás: spam-score jelzés/pontozás (admin listában), export mezők i18n címkézése és saved filter preset.

## 2026-05-08 – Fázis P4 (első kör: operációs admin bővítések)

- **Mit (audit API):** [`app/api/audit/route.ts`](../app/api/audit/route.ts) advanced szűrés és szerveroldali lapozás: új query paramok `actorRole`, `entityId`, `from`, `to`, `sort`, `page`, `limit`; válaszban `pageInfo` (`total`, `totalPages`, `hasNext`, `hasPrev`).
- **Mit (audit UI):** [`app/(internal)/admin/audit/page.tsx`](../app/(internal)/admin/audit/page.tsx) új filter mezők (role, entityId, dátum tartomány, rendezés), és lapozó gombok (`Prev/Next`) szerveroldali `pageInfo` alapján.
- **Mit (dashboard KPI / operáció):** új endpointok: [`app/api/admin/user-activity/route.ts`](../app/api/admin/user-activity/route.ts) (7 napos activity feed auditból), [`app/api/admin/permission-matrix/route.ts`](../app/api/admin/permission-matrix/route.ts) (OFFICE/ADMIN capability mátrix). Ezek megjelenítése az [`app/(internal)/admin/page.tsx`](../app/(internal)/admin/page.tsx) irányítópulton.
- **Mit (2-step confirm):** veszélyesebb create műveleteknél confirm dialógus bevezetve: [`app/(internal)/admin/users/page.tsx`](../app/(internal)/admin/users/page.tsx), [`app/(internal)/admin/categories/page.tsx`](../app/(internal)/admin/categories/page.tsx).
- **Állapot:** `npm run typecheck`, `npm run test`, `npm run build` zöld.
- **Következő lépés:** P4 folytatás: bulk import (`users/categories`), táblás nézetek egységes server-side sort/filter/pagination mintára, audit export / saved views.

## 2026-05-08 – Fázis P5 (első kör: booking élesítési hardening)

- **Mit (bookings API):** [`app/api/bookings/route.ts`](../app/api/bookings/route.ts) szigorúbb validáció: múltbeli dátum tiltás, minimum 30 perc, időablak 06:00–23:00, ütközésellenőrzés közös helperrel; `GET` oldalon új szűrők (`status`, `dateFrom`, `dateTo`, `q`, `limit`) és automatikus pending lejártatás.
- **Mit (auto-expire):** új helper [`lib/bookings/maintenance.ts`](../lib/bookings/maintenance.ts) + [`lib/bookings/time.ts`](../lib/bookings/time.ts), amely a lejárt `pending` foglalásokat `rejected` státuszra frissíti.
- **Mit (booking státusz PATCH):** [`app/api/bookings/[id]/route.ts`](../app/api/bookings/[id]/route.ts) jóváhagyásnál idősáv-ütközés ellenőrzés (approved foglalásokkal) + múltbeli jóváhagyás tiltás; audit részletesebb `slot/applicant/org` diff-et ír.
- **Mit (értesítés):** opcionális booking webhook értesítés új foglaláskor (`BOOKING_NOTIFY_WEBHOOK_URL`) via [`lib/notifications/booking.ts`](../lib/notifications/booking.ts); dokumentáció: [`.env.example`](../.env.example).
- **Mit (events):** `createEventSchema` és events create flow támogatja a heti ismétlődő létrehozást (`repeatWeeklyCount`), az API visszaadja a létrehozott sorokat és darabszámot.
- **Mit (admin status szűrés):** [`components/calendar/CalendarModule.tsx`](../components/calendar/CalendarModule.tsx) booking status modal kapott státusz + szöveg szűrőt.
- **Állapot:** `npm run typecheck`, `npm run test`, `npm run build` zöld.
- **Következő lépés:** P5 folytatás: valódi e-mail visszaigazolás (SMTP/provider), ismétlődő események szerkesztési stratégiája (series edit), booking státusz API oldali oldalazás/szűrés az admin modálnál.

## 2026-05-08 – Fázis P6 (első kör: galéria mappa CRUD)

- **Mit (API):** új végpontok a galéria mappák kezelésére: [`app/api/gallery/folders/route.ts`](../app/api/gallery/folders/route.ts) (`GET`, `POST`) és [`app/api/gallery/folders/[id]/route.ts`](../app/api/gallery/folders/[id]/route.ts) (`PATCH`, `DELETE`). Jogosultság: `OFFICE`/`ADMIN` írásra; CSRF védelem; névduplikáció ellenőrzés; törlés tiltása, ha aktív galéria elemek tartoznak a mappához.
- **Mit (validáció):** új [`lib/validation/gallery-folders.ts`](../lib/validation/gallery-folders.ts) a mappa create/patch séma számára (`name`, opcionális `sortOrder`).
- **Mit (UI):** [`components/gallery/GalleryModule.tsx`](../components/gallery/GalleryModule.tsx) admin toolbar bővítve „Mappák kezelése” gombbal, új modállal (létrehozás, átnevezés, törlés), valamint a mappa-kártyák „Szerkesztés” gombja is a valódi kezelőmodált nyitja.
- **Állapot:** `npm run typecheck` zöld, célzott lint diagnosztika tiszta.
- **Következő lépés:** P6 folytatás: guides dokumentum-feltöltés pipeline (meta + minőség checklist), gallery upload/thumbnail pipeline és bulk upload előkészítés.

## 2026-05-08 – Fázis P4/P6 kiterjesztés: Admin Builder Studio (alap)

- **Mit (adatmodell):** új Prisma modellek: `SiteBuilderPage` (slug + HU/EN cím + JSON tartalom + státusz) és `SiteDesignConfig` (globális design tokenek + custom CSS), migrációval: [`prisma/migrations/20260508214500_admin_site_builder_foundation/migration.sql`](../prisma/migrations/20260508214500_admin_site_builder_foundation/migration.sql).
- **Mit (API):** új admin route-ok: [`/api/admin/site-builder/pages`](../app/api/admin/site-builder/pages/route.ts) (`GET`, `POST`), [`/api/admin/site-builder/pages/[id]`](../app/api/admin/site-builder/pages/[id]/route.ts) (`PATCH`, `DELETE`), [`/api/admin/site-builder/design`](../app/api/admin/site-builder/design/route.ts) (`GET`, `PATCH`).
- **Mit (UI):** új belső oldal: [`app/(internal)/admin/site-builder/page.tsx`](../app/(internal)/admin/site-builder/page.tsx) – új oldal létrehozás, oldal státusz kezelés, design szerkesztés, DB-csoport összesítő; admin navigáció és dashboard quick action bővítve.
- **Mit (publikus):** új publikus oldal-render endpoint: [`/custom/[slug]`](../app/(public)/custom/[slug]/page.tsx), publikált oldalak megjelenítése (admin preview opcióval).
- **Mit (runtime design):** gyökér layout (`app/layout.tsx`) most beolvassa a `SiteDesignConfig` értékeit és CSS változókon keresztül alkalmazza az alap stílus-override-okat.
- **Állapot:** `npm run typecheck` zöld.

## 2026-05-08 – Teljes modul készültségi és üzemeltetési átadó dokumentum

- **Mit:** új, egyben kezelhető, részletes átadó dokumentum készült a teljes platformról: [`docs/teljes-modul-keszultseg-es-uzemeltetesi-atadas-2026-05-08.md`](./teljes-modul-keszultseg-es-uzemeltetesi-atadas-2026-05-08.md).
- **Tartalom:** modulonkénti készültség százalékok, publikus/OFFICE/ADMIN funkciótérkép, end-to-end ellenőrzési checklist, seed login adatok, launcher-first workflow és külön plusz ötletlista.
- **Állapot:** dokumentációs átadás kész; közvetlenül használható bugfix/design fókuszú következő ciklusokhoz.

## 2026-05-08 – Fázis 1 lezárás: Booking email confirmation workflow

- **Mit (email provider):** új SMTP mailer réteg: [`lib/notifications/mailer.ts`](../lib/notifications/mailer.ts), amely környezeti változó alapján küld tranzakciós emailt.
- **Mit (booking create):** [`lib/notifications/booking.ts`](../lib/notifications/booking.ts) bővítve foglalás létrehozáskor küldött visszaigazoló email sablonnal (`BOOKING_EMAIL_ENABLED=1` esetén).
- **Mit (booking status):** státuszváltáskor (`pending/approved/rejected`) email értesítés bekötve: [`app/api/bookings/[id]/route.ts`](../app/api/bookings/[id]/route.ts) -> `notifyBookingStatusChanged`.
- **Mit (env):** [`.env.example`](../.env.example) frissítve SMTP + booking email kulcsokkal (`BOOKING_EMAIL_ENABLED`, `BOOKING_EMAIL_FROM`, `SMTP_*`).
- **Állapot:** email workflow backend oldalon kész; beüzemeléshez valós SMTP adatok szükségesek env-ben.

## 2026-05-08 – Fázis 2 lezárás: Gallery media upload + thumbnail + bulk + meta

- **Mit (adatmodell):** `GalleryItem` bővítve media pipeline mezőkkel (`thumbnailUrl`, `imageWidth`, `imageHeight`, `mimeType`, `fileSizeBytes`, `exifJson`), migráció: [`prisma/migrations/20260508223000_gallery_media_pipeline_phase2/migration.sql`](../prisma/migrations/20260508223000_gallery_media_pipeline_phase2/migration.sql).
- **Mit (backend):** új feltöltés helper [`lib/media/gallery-upload.ts`](../lib/media/gallery-upload.ts) lokális fájlmentéssel (`public/uploads/gallery/...`), `sharp` thumbnail generálással és alap meta/EXIF extracttal.
- **Mit (API):** új admin upload endpointok: [`app/api/admin/gallery/upload/route.ts`](../app/api/admin/gallery/upload/route.ts) (single) és [`app/api/admin/gallery/upload/bulk/route.ts`](../app/api/admin/gallery/upload/bulk/route.ts) (bulk).
- **Mit (UI):** [`components/gallery/GalleryModule.tsx`](../components/gallery/GalleryModule.tsx) admin toolbar új "Kép feltöltése" + "Bulk feltöltés" gombokkal, rejtett file inputokkal és feltöltési flow-val.
- **Mit (DTO/mapper/validáció):** gallery DTO és mapper bővítve a media mezőkkel; `imageUrl` validáció most relatív (`/uploads/...`) pathot is enged.
- **Állapot:** `npm run db:generate`, `npm run typecheck`, `npm run test` zöld.

## 2026-05-09 – Átadó doc §8 Fázis 3: Guides attachment + verzió + kereshetőség

- **Mit (séma/migráció):** `Guide` bővítve csatolmány meta + `searchableText` mezőkkel; új `GuideRevision` modell és indexek (lásd `prisma/migrations/20260508232000_guides_attachment_revision_phase3/`).
- **Mit (domain):** `buildGuideSearchableText`, `createGuideRevision`, create/patch útmutatónál index + revision snapshot; admin `POST /api/admin/guides/upload`, `GET /api/admin/guides/quality-check`, `GET /api/admin/guides/[id]/revisions`; link-health bővítve helyi path ellenőrzéssel.
- **Mit (UI):** `GuidesModule` – quality gomb, verziók modál, feltöltés, PDF előnézet, relatív dokumentum link; feltöltés után a szerkesztő űrlap `documentUrl`/`documentType` szinkron; lista keresés `searchableText` + törzsszövegre is.
- **Mit (doksi):** [`docs/teljes-modul-keszultseg-es-uzemeltetesi-atadas-2026-05-08.md`](./teljes-modul-keszultseg-es-uzemeltetesi-atadas-2026-05-08.md) §8 Fázis 3 tételek lepipálva; §3.6 guides rész frissítve.
- **Állapot:** `npm run db:generate`, `npm run typecheck`, `npm run test` lefuttatva a záráskor.
- **Megjegyzés:** a `searchableText` jelenleg szöveges mezőkből épül; PDF belső szöveg indexelése külön pipeline (nem része ennek a körbnek).

## 2026-05-09 – Átadó doc §8 Fázis 4: monitoring + Sentry + request-scope log

- **Mit (Sentry):** `@sentry/nextjs` függőség; [`instrumentation.ts`](../instrumentation.ts), [`sentry.server.config.ts`](../sentry.server.config.ts), [`sentry.edge.config.ts`](../sentry.edge.config.ts), [`instrumentation-client.ts`](../instrumentation-client.ts); [`app/global-error.tsx`](../app/global-error.tsx) kivétel jelentés; [`next.config.ts`](../next.config.ts) CSP `connect-src` bővítve Sentry ingest hostokkal; [`.env.example`](../.env.example) Sentry változók.
- **Mit (API log):** új [`lib/observability/api-request-log.ts`](../lib/observability/api-request-log.ts); kritikus írások: admin (guides/gallery upload, feature flag, feedback patch, site-builder), `POST/PATCH` foglalás, esemény `POST/PATCH/DELETE`, hír `PATCH/DELETE`, útmutató `POST/PATCH/DELETE` — minden válasz `x-request-id` + siker/figyelmeztetés `serverLogger` esemény.
- **Mit (doksi):** új [`docs/alerting-rules.md`](./alerting-rules.md); [`docs/incident-debug.md`](./incident-debug.md), [`docs/documentation-index.md`](./documentation-index.md), [`docs/teljes-uzemeltetesi-kezikonyv.md`](./teljes-uzemeltetesi-kezikonyv.md), [`docs/teljes-modul-keszultseg-es-uzemeltetesi-atadas-2026-05-08.md`](./teljes-modul-keszultseg-es-uzemeltetesi-atadas-2026-05-08.md) §8 Fázis 4 lezárva.
- **Mit (teszt):** [`tests/api-request-log.test.ts`](../tests/api-request-log.test.ts).
- **Állapot:** `npm run typecheck`, `npm run test`, `npm run build` lefuttatva a záráskor.

## 2026-05-09 – Átadó doc §8 Fázis 5: backup/restore drill + recovery + health rutin

- **Mit (npm):** [`package.json`](../package.json) — `ops:backup-drill`, `ops:health-check`; [`scripts/ops/backup-restore-drill.cjs`](../scripts/ops/backup-restore-drill.cjs), [`scripts/ops/system-check.cjs`](../scripts/ops/system-check.cjs), [`scripts/lib/load-env.cjs`](../scripts/lib/load-env.cjs).
- **Mit (CI):** [`.github/workflows/ci.yml`](../.github/workflows/ci.yml) és [`.gitlab-ci.yml`](../.gitlab-ci.yml) `test` szakasz: `prisma migrate deploy` + `ops:backup-drill` a tesztek előtt.
- **Mit (doksi):** [`docs/backup-restore-drill.md`](./backup-restore-drill.md), [`docs/recovery-checklist.md`](./recovery-checklist.md), [`docs/scheduled-health-routine.md`](./scheduled-health-routine.md), [`docs/incident-communication-templates.md`](./incident-communication-templates.md); [`docs/teljes-modul-keszultseg-es-uzemeltetesi-atadas-2026-05-08.md`](./teljes-modul-keszultseg-es-uzemeltetesi-atadas-2026-05-08.md) §8 Fázis 5; [`go-live-checklist.md`](./go-live-checklist.md) §4.2; [`.gitignore`](../.gitignore) `.ops/`; [`.env.example`](../.env.example) megjegyzések.
- **Állapot:** `npm run test` zöld; CI-szerű drill: tiszta `file:./dev.db` + `migrate deploy` után `ops:backup-drill` strict mód elvárás szerint zöld.

## 2026-05-09 – Átadó doc §8 Fázis 6: release governance + retention + smoke gate

- **Mit (pipeline):** új [`scripts/ops/release-checklist-gate.cjs`](../scripts/ops/release-checklist-gate.cjs) és `npm run ops:release-checklist` (lint/typecheck/test/build/backup drill/smoke gate + opcionális LHCI).
- **Mit (smoke gate):** új [`scripts/ops/post-deploy-smoke.cjs`](../scripts/ops/post-deploy-smoke.cjs) + `npm run ops:smoke-gate`; kritikus publikus/API útvonalak ellenőrzése `next start` alatt.
- **Mit (retention):** új Prisma modell `RetentionConfig` + migráció [`prisma/migrations/20260509025500_retention_config_phase6/migration.sql`](../prisma/migrations/20260509025500_retention_config_phase6/migration.sql); új admin endpoint [`app/api/admin/retention/route.ts`](../app/api/admin/retention/route.ts); új admin oldal [`app/(internal)/admin/retention/page.tsx`](../app/(internal)/admin/retention/page.tsx); admin navigáció + DB overview bővítés.
- **Mit (release gate):** `lighthouserc.cjs` küszöbök véglegesítve (`error`), `lighthouseCiGate` default bekapcsolva; CI frissítve (GitHub/GitLab smoke gate + release checklist job/stage).
- **Mit (doksi):** új [`docs/release-checklist-pipeline.md`](./release-checklist-pipeline.md), [`docs/retention-settings.md`](./retention-settings.md); frissítve: [`docs/teljes-modul-keszultseg-es-uzemeltetesi-atadas-2026-05-08.md`](./teljes-modul-keszultseg-es-uzemeltetesi-atadas-2026-05-08.md) §3.10 + §8 Fázis 6, [`docs/documentation-index.md`](./documentation-index.md), [`.env.example`](../.env.example).
- **Állapot:** `npm run db:generate`, `npm run typecheck`, `npm run test`, `npm run build`, `npm run ops:smoke-gate`, `FF_LIGHTHOUSE_CI_GATE=0 npm run ops:release-checklist` zöld.

## 2026-05-09 – Átadó doc §8 Fázis 7: admin operáció (táblák, import, export, mentett nézetek)

- **Mit (Prisma):** `AdminSavedView` + migráció [`prisma/migrations/20260509120000_phase7_admin_saved_views/migration.sql`](../prisma/migrations/20260509120000_phase7_admin_saved_views/migration.sql).
- **Mit (API):** [`app/api/users/import/route.ts`](../app/api/users/import/route.ts), [`app/api/categories/import/route.ts`](../app/api/categories/import/route.ts), [`app/api/audit/export/route.ts`](../app/api/audit/export/route.ts), [`app/api/admin/saved-views/route.ts`](../app/api/admin/saved-views/route.ts) + [`[id]/route.ts`](../app/api/admin/saved-views/[id]/route.ts); `GET /api/users` és kezelői `GET /api/categories` bővítve `pageInfo` + szűrő query-kkel; audit lista [`lib/audit/audit-list-params.ts`](../lib/audit/audit-list-params.ts) + [`lib/api/page-info.ts`](../lib/api/page-info.ts).
- **Mit (UI):** [`app/(internal)/admin/users/page.tsx`](../app/(internal)/admin/users/page.tsx), [`categories/page.tsx`](../app/(internal)/admin/categories/page.tsx), [`audit/page.tsx`](../app/(internal)/admin/audit/page.tsx) + [`components/admin/AdminSavedViewsToolbar.tsx`](../components/admin/AdminSavedViewsToolbar.tsx); [`app/(internal)/admin/page.tsx`](../app/(internal)/admin/page.tsx) stat számláló `pageInfo.total`-ra.
- **Mit (doksi):** [`docs/api.md`](./api.md), [`docs/teljes-modul-keszultseg-es-uzemeltetesi-atadas-2026-05-08.md`](./teljes-modul-keszultseg-es-uzemeltetesi-atadas-2026-05-08.md) §8 Fázis 7.
- **Mit (teszt):** [`tests/api-contract.test.ts`](../tests/api-contract.test.ts) bulk import Zod szerződés.
- **Állapot:** `npm run typecheck`, `npm run test`, `npm run lint`, `npm run build` zöld. Ha `npx prisma generate` Windows-on `EPERM` a query engine fájlra: IDE/Node folyamat zárása, majd újra `prisma generate`.

## 2026-05-09 – Átadó doc §8 Fázis 8: product/UX (onboarding, palette, diff, értesítések)

- **Mit (Prisma):** `StaffNotification` + migráció [`prisma/migrations/20260509140000_phase8_staff_notifications/migration.sql`](../prisma/migrations/20260509140000_phase8_staff_notifications/migration.sql).
- **Mit (notifications):** [`lib/notifications/staff-dispatch.ts`](../lib/notifications/staff-dispatch.ts); API [`app/api/admin/notifications/route.ts`](../app/api/admin/notifications/route.ts), [`[id]/route.ts`](../app/api/admin/notifications/[id]/route.ts), [`mark-all-read/route.ts`](../app/api/admin/notifications/mark-all-read/route.ts); események: bulk import, audit CSV export, feature flag ( [`app/api/admin/feature-flags/route.ts`](../app/api/admin/feature-flags/route.ts) + CSRF).
- **Mit (UI):** [`components/admin/AdminOnboardingWizard.tsx`](../components/admin/AdminOnboardingWizard.tsx), [`AdminCommandPalette.tsx`](../components/admin/AdminCommandPalette.tsx), [`AdminWorkspaceChrome.tsx`](../components/admin/AdminWorkspaceChrome.tsx), [`AdminNotificationBell.tsx`](../components/admin/AdminNotificationBell.tsx), [`NewsRevisionDiffPanel.tsx`](../components/admin/NewsRevisionDiffPanel.tsx); fejléc: [`InternalLayoutHeader.tsx`](../components/layout/InternalLayoutHeader.tsx) + belső layout [`app/(internal)/layout.tsx`](../app/(internal)/layout.tsx); mentett nézetek UX: [`AdminSavedViewsToolbar.tsx`](../components/admin/AdminSavedViewsToolbar.tsx).
- **Mit (egyéb):** [`lib/admin/quick-links.ts`](../lib/admin/quick-links.ts), [`lib/news/revision-diff.ts`](../lib/news/revision-diff.ts); teszt [`tests/revision-diff.test.ts`](../tests/revision-diff.test.ts); [`.env.example`](../.env.example) `STAFF_NOTIFY_*`.
- **Mit (doksi):** [`docs/teljes-modul-keszultseg-es-uzemeltetesi-atadas-2026-05-08.md`](./teljes-modul-keszultseg-es-uzemeltetesi-atadas-2026-05-08.md) §8 Fázis 8.
- **Állapot:** `npm run typecheck`, `npm run test`, `npm run lint`, `npm run build` (helyi környezetben).

## 2026-05-09 – §12 Fázis 13: teljesítmény, skálázás, CDN, layout design cache

- **Mit (cache):** [`lib/site-design/layout-css.ts`](../lib/site-design/layout-css.ts); [`app/layout.tsx`](../app/layout.tsx); [`app/api/admin/site-builder/design/route.ts`](../app/api/admin/site-builder/design/route.ts) — `revalidateTag(SITE_DESIGN_CACHE_TAG)`.
- **Mit (image):** [`lib/remote-image-hosts.ts`](../lib/remote-image-hosts.ts) — `NEXT_PUBLIC_IMAGE_REMOTE_HOSTS`; teszt [`tests/remote-image-hosts.test.ts`](../tests/remote-image-hosts.test.ts).
- **Mit (LHCI):** [`lighthouserc.cjs`](../lighthouserc.cjs) — `/calendar`, `/privacy`.
- **Mit (doksi):** [`docs/performance-scaling-cdn.md`](./performance-scaling-cdn.md), [`docs/documentation-index.md`](./documentation-index.md), [`docs/teljes-modul-keszultseg-es-uzemeltetesi-atadas-2026-05-08.md`](./teljes-modul-keszultseg-es-uzemeltetesi-atadas-2026-05-08.md) §12 Fázis 13, [`.env.example`](../.env.example).

## 2026-05-09 – §12 Fázis 12: adatvédelem, GDPR export/törlés, cookie sáv, retention prune

- **Mit (privacy API):** [`lib/privacy/staff-user-export.ts`](../lib/privacy/staff-user-export.ts), [`lib/privacy/can-delete-staff-user.ts`](../lib/privacy/can-delete-staff-user.ts); [`app/api/admin/privacy/export-user/[id]/route.ts`](../app/api/admin/privacy/export-user/[id]/route.ts), [`app/api/admin/privacy/delete-user/[id]/route.ts`](../app/api/admin/privacy/delete-user/[id]/route.ts).
- **Mit (admin UI):** [`app/(internal)/admin/users/page.tsx`](../app/(internal)/admin/users/page.tsx) — Export (JSON) + Fiók törlése.
- **Mit (publikus):** [`app/(public)/privacy/`](../app/(public)/privacy/) + [`components/legal/CookieConsentBar.tsx`](../components/legal/CookieConsentBar.tsx); [`components/layout/Footer.tsx`](../components/layout/Footer.tsx); [`styles/components/cookie-consent.css`](../styles/components/cookie-consent.css); [`app/layout.tsx`](../app/layout.tsx).
- **Mit (ops):** [`scripts/ops/retention-prune.cjs`](../scripts/ops/retention-prune.cjs), `npm run ops:retention-prune`.
- **Mit (i18n):** [`lib/i18n/messages.ts`](../lib/i18n/messages.ts) — `privacyPage`, `nav.privacy`, `routeMeta.privacy`, belső users GDPR szövegek.
- **Mit (teszt):** [`tests/privacy-delete-guard.test.ts`](../tests/privacy-delete-guard.test.ts).
- **Mit (doksi):** [`docs/privacy-and-gdpr.md`](./privacy-and-gdpr.md), [`docs/api.md`](./api.md), [`docs/retention-settings.md`](./retention-settings.md), [`docs/teljes-modul-keszultseg-es-uzemeltetesi-atadas-2026-05-08.md`](./teljes-modul-keszultseg-es-uzemeltetesi-atadas-2026-05-08.md) §12 Fázis 12, [`docs/documentation-index.md`](./documentation-index.md), [`.env.example`](../.env.example), [`package.json`](../package.json).

## 2026-05-09 – Átadó doc §8 Fázis 1: booking email (HU/EN) + E2E

- **Mit (Prisma):** `GymBooking.notificationLocale` + migráció [`prisma/migrations/20260509190000_gym_booking_notification_locale/migration.sql`](../prisma/migrations/20260509190000_gym_booking_notification_locale/migration.sql).
- **Mit (email):** [`lib/notifications/booking.ts`](../lib/notifications/booking.ts) — webhook és SMTP szétválasztva; HU/EN sablonok (`buildBookingCreatedEmail`, `buildBookingStatusEmail`); státusz email a DB-ben tárolt nyelven.
- **Mit (API / UI):** [`lib/validation/bookings.ts`](../lib/validation/bookings.ts) `locale`; [`app/api/bookings/route.ts`](../app/api/bookings/route.ts), [`app/api/bookings/[id]/route.ts`](../app/api/bookings/[id]/route.ts); [`components/calendar/CalendarModule.tsx`](../components/calendar/CalendarModule.tsx) `locale: lang` a POST body-ban.
- **Mit (teszt):** [`tests/booking-email-templates.test.ts`](../tests/booking-email-templates.test.ts), [`tests/api-contract.test.ts`](../tests/api-contract.test.ts); E2E [`e2e/booking-flow.spec.ts`](../e2e/booking-flow.spec.ts) (egyedi idősáv + POST 201 assert); [`e2e/smoke-roles.spec.ts`](../e2e/smoke-roles.spec.ts) OFFICE ág: URL takarítás miatt `rbac=admin_only` helyett „nem `/admin/users`” assert.
- **Mit (doksi):** [`docs/teljes-modul-keszultseg-es-uzemeltetesi-atadas-2026-05-08.md`](./teljes-modul-keszultseg-es-uzemeltetesi-atadas-2026-05-08.md) §1, §3.5, §3.9, §8 Fázis 1; [`docs/api.md`](./api.md); [`docs/testing.md`](./testing.md); [`.env.example`](../.env.example).
- **Állapot:** `npx prisma migrate deploy`, `npm run typecheck`, `npm run test`, `npm run build`, `npm run test:e2e` célzott ellenőrzés.

## 2026-05-09 – Átadó doc §8 Fázis 9: Builder Studio V2

- **Mit (Prisma):** `SiteBuilderPageRevision`, `SiteBuilderPublishQueue` modellek + migráció [`prisma/migrations/20260509164000_builder_studio_v2_phase9/migration.sql`](../prisma/migrations/20260509164000_builder_studio_v2_phase9/migration.sql).
- **Mit (API):** revízió/rollback endpoint [`app/api/admin/site-builder/pages/[id]/revisions/route.ts`](../app/api/admin/site-builder/pages/[id]/revisions/route.ts), publish queue endpoint [`app/api/admin/site-builder/publish-queue/route.ts`](../app/api/admin/site-builder/publish-queue/route.ts), template feed [`app/api/admin/site-builder/templates/route.ts`](../app/api/admin/site-builder/templates/route.ts), valamint guardrail validation a design route-ban.
- **Mit (Builder UI):** [`app/(internal)/admin/site-builder/page.tsx`](../app/(internal)/admin/site-builder/page.tsx) V2 workflow: drag-drop blokklista, HU/EN side-by-side inline editor, template alkalmazás, draft diff, queue és rollback.
- **Mit (shared lib):** [`lib/site-builder/studio.ts`](../lib/site-builder/studio.ts) blokk séma/normalizálás, template-ek, design guardrail helper; validáció bővítés [`lib/validation/site-builder.ts`](../lib/validation/site-builder.ts).
- **Mit (publikus render):** [`app/(public)/custom/[slug]/page.tsx`](../app/(public)/custom/[slug]/page.tsx) blokk-alapú render (HU/EN tartalom + CTA).
- **Mit (doksi):** [`docs/api.md`](./api.md), [`docs/architecture.md`](./architecture.md), [`docs/module-file-responsibility-map.md`](./module-file-responsibility-map.md), [`docs/teljes-modul-keszultseg-es-uzemeltetesi-atadas-2026-05-08.md`](./teljes-modul-keszultseg-es-uzemeltetesi-atadas-2026-05-08.md) Fázis 9 pipák.
- **Állapot:** `npx prisma migrate deploy`, `npm run typecheck`, `npm run test`, `npm run lint`, `npm run build` zöld.

## 2026-05-09 – Átadó doc §8 Fázis 10: engineering / ops automatizálás

- **Mit (E2E):** [`playwright.config.ts`](../playwright.config.ts) (`globalSetup`, közös `DATABASE_URL`, `E2E_ALLOW_HTTP_COOKIES=1` a http:// session sütihez), [`e2e/global-setup.ts`](../e2e/global-setup.ts), [`e2e/resolve-database-url.ts`](../e2e/resolve-database-url.ts), [`e2e/smoke-roles.spec.ts`](../e2e/smoke-roles.spec.ts), [`e2e/helpers/login.ts`](../e2e/helpers/login.ts), `npm run test:e2e`; CI: [`.github/workflows/ci.yml`](../.github/workflows/ci.yml) `e2e` job, [`.gitlab-ci.yml`](../.gitlab-ci.yml) `e2e` stage.
- **Mit (E2E / CSRF):** [`lib/security/csrf.ts`](../lib/security/csrf.ts) loopback origin normalizálás; [`lib/auth/session.ts`](../lib/auth/session.ts) `E2E_ALLOW_HTTP_COOKIES` opció.
- **Mit (Prisma env):** [`scripts/prisma-env.cjs`](../scripts/prisma-env.cjs) — előre beállított `DATABASE_URL` / `AUTH_SECRET` nem íródik felül `.env.local`-ból.
- **Mit (dependency risk):** [`scripts/ops/dependency-risk-dashboard.cjs`](../scripts/ops/dependency-risk-dashboard.cjs), [`app/api/admin/dependency-risk/route.ts`](../app/api/admin/dependency-risk/route.ts), [`app/(internal)/admin/dependency-risk/page.tsx`](../app/(internal)/admin/dependency-risk/page.tsx); build/release pipeline generálja a `.ops/dependency-risk-report.json` fájlt (lásd `.gitignore`).
- **Mit (canary):** [`lib/feature-flags/registry.ts`](../lib/feature-flags/registry.ts) (`siteBuilderV2Canary`, `FF_SITE_BUILDER_V2_CANARY_ROLLOUT`, `isFeatureEnabledForIdentity`), [`app/api/admin/site-builder/canary/route.ts`](../app/api/admin/site-builder/canary/route.ts), feature flag UI rollout mező [`app/(internal)/admin/feature-flags/page.tsx`](../app/(internal)/admin/feature-flags/page.tsx) + [`app/api/admin/feature-flags/route.ts`](../app/api/admin/feature-flags/route.ts); Builder Studio gating [`app/(internal)/admin/site-builder/page.tsx`](../app/(internal)/admin/site-builder/page.tsx).
- **Mit (changelog):** [`scripts/ops/generate-changelog.cjs`](../scripts/ops/generate-changelog.cjs) → [`docs/auto-changelog.md`](./auto-changelog.md); [`scripts/ops/release-checklist-gate.cjs`](../scripts/ops/release-checklist-gate.cjs) bővítés.
- **Mit (audit export riasztás):** [`lib/audit/export-alerts.ts`](../lib/audit/export-alerts.ts) + [`app/api/audit/export/route.ts`](../app/api/audit/export/route.ts); batch: [`scripts/ops/audit-export-alerts.cjs`](../scripts/ops/audit-export-alerts.cjs).
- **Mit (doksi):** [`docs/api.md`](./api.md), [`docs/architecture.md`](./architecture.md), [`docs/module-file-responsibility-map.md`](./module-file-responsibility-map.md), [`docs/teljes-modul-keszultseg-es-uzemeltetesi-atadas-2026-05-08.md`](./teljes-modul-keszultseg-es-uzemeltetesi-atadas-2026-05-08.md) Fázis 10.
- **Állapot:** `npm ci` + `npm run typecheck`, `npm run test`, `npm run lint`, `npm run build`, `npm run test:e2e` (seedelt DB + build után) zöld ellenőrzés cél.
