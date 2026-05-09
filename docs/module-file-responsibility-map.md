# Modul–fájl felelősségi térkép (részletes kommentár)

A **könyvtár-felépítés** rövid összefoglalója: [`docs/folder-structure.md`](./folder-structure.md).

**Modul viselkedés + belépési fájlok (Fázis 5, rövid):** [`docs/modules/README.md`](./modules/README.md).

Ez a dokumentum modulonként és fájlonként összerendezi:
- mely fájlok tartoznak az adott modulhoz,
- pontosan mi a felelősségük,
- mi a bemenet/kimenet,
- milyen függőségeik vannak,
- módosításkor mi lehet a mellékhatás.

---

## 1. Globális réteg (minden modul alapja)

### `app/layout.tsx`
- **Felelősség:** teljes app root szerkezet; minden route ebbe injektálódik.
- **Bemenet:** `children` (aktuális route komponensfa).
- **Kimenet:** globális HTML váz (`Navbar`, `main`, `Footer`, modal/toast host).
- **Függőségek:** `AppProvider`, `Navbar`, `Footer`, `ModalHost`, `AdminLoginModal`, `ToastViewport`.
- **Módosítási hatás:** minden oldal viselkedése és SEO shell változhat.
- **Kockázat:** hydration/layout villanás, globális overlay regresszió.
- **Ellenőrzés:** public + admin route smoke teszt, scroll/modal viselkedés.

### `app/globals.css`
- **Felelősség:** **csak** `@import` lánc (Fázis 2) — kaszkád sorrend SSOT; tényleges szabályok: `styles/base.css`, `styles/components/navbar.css`, `styles/components/skeleton-states-toast.css`, `styles/components/effects-v11-plus.css`, valamint `styles/design-tokens.css` + `styles/modules/*.css`.
- **Bemenet:** tokenek a `styles/design-tokens.css`-ből (`var(--...)`); modul CSS sorrend a fájlban: `about`, `guides`, `gallery`, `calculator`, `news`, `admin`, majd `base` és `components`, végül `calendar` (kaszkád felülírások miatt utoljára); alkalmazásréteg a `base` / `components` partialokban.
- **Kimenet:** konzisztens vizuál minden modulban.
- **Függőségek:** gyakorlatilag minden UI komponens.
- **Módosítási hatás:** keresztmodulos; egy kis változás több oldalt egyszerre érinthet.
- **Kockázat:** duplikált selector vagy specifitási ütközés.
- **Ellenőrzés:** light/dark, desktop/mobile, modal, nav, form elemek.

### `styles/design-tokens.css`
- **Felelősség:** design SSOT token-forrás.
- **Bemenet:** nincs runtime input; kézi konfiguráció.
- **Kimenet:** CSS változók light/dark módban.
- **Módosítási hatás:** teljes brand/kontraszt/ritmus változik.
- **Kockázat:** kontraszt és a11y romolhat.
- **Ellenőrzés:** kritikus oldalak vizuális összehasonlítás, dark mode olvashatóság.

### `lib/layout/topbar-layout.ts`
- **Felelősség:** topbar / navbar HÖK jel **numerikus tükör** a `--layout-nav-brand-mark-size` tokenhez (`next/image` `width` / `height`); módosításkor a CSS tokennel együtt frissítendő.
- **Kockázat:** eltérés esetén layout shift vagy felesleges intrinsic méret.

### `components/layout/AppProvider.tsx`
- **Felelősség:** globális kliens state és app szintű actionök.
- **Bemenet:** user interakciók + auth API válaszok.
- **Kimenet:** context értékek a child komponenseknek.
- **Kockázat:** login/logout, nyelv/téma váltás, toast és modal flow egyszerre sérülhet.
- **Ellenőrzés:** session, login modal, theme/lang toggle, toast kattintás.

### `components/layout/Navbar.tsx`
- **Felelősség:** navigációs IA, landing külön viselkedés, mobil menü, gyorsvezérlők.
- **Bemenet:** route path, auth állapot, theme/lang state.
- **Kimenet:** desktop + mobil nav UI.
- **Kockázat:** fókuszcsapda, scroll lock, route elérhetőség.
- **Ellenőrzés:** mobil menü nyit/zár, Escape, Tab fókusz, linkek.

### `components/layout/Footer.tsx`
- **Felelősség:** statikus navigációs és brand információ.
- **Kockázat:** IA inkonzisztencia a navbarhoz képest.
- **Ellenőrzés:** footer linkek és navbar linkek egyezése.

### `components/ui/Core.tsx`
- **Felelősség:** UI primitívek (`PageShell`, `Card`, `SectionHeader`) szerződése.
- **Kockázat:** teljes rendszer spacing/padding/heading ritmusa borulhat.
- **Ellenőrzés:** 3-4 fő modul vizuális regresszió ellenőrzés.

---

## 2. Landing modul

### `app/(public)/page.tsx`
- **Felelősség:** landing route belépési pont.

### `app/(public)/HomePageClient.tsx`
- **Felelősség:** landing interakciók orkestrációja (hero, hírek modul lazán csatolva).
- **Bemenet:** hash (`#news`, `#landing-news`), scroll pozíció, hero callback.
- **Kimenet:** `LandingNews` modul láthatósága.
- **Kockázat:** hírek modul nem jelenik meg időben vagy duplán renderelődik.
- **Ellenőrzés:** nyíl kattintás, hash URL, kézi görgetés.

### `components/landing/LandingHero.tsx`
- **Felelősség:** hero headline + belépési kártyák + hírek modul nyitó CTA.
- **Kimenet:** landing első képernyő UX.
- **Kockázat:** gyenge CTA fókusz, rossz scroll célpont.
- **Ellenőrzés:** CTA és kártyák route-ja, mobil töréspont.

### `components/landing/LandingNews.tsx`
- **Felelősség:** komplex hír UI (szűrés, rendezés, részlet, admin műveleti modálok).
- **Bemenet:** `/api/news` + auth állapot.
- **Kimenet:** listázott hírek és admin akciók.
- **Kockázat:** inline style/legacy logika miatt regressziók esélye magasabb.
- **Ellenőrzés:** guest/admin nézet, CRUD akciók, modal flow.

### `lib/content.ts` (`landingCards`)
- **Felelősség:** landing kártyák tartalma és sorrendje.
- **Ha módosítod:** mely modulok vannak kiemelve a főoldalon.

---

## 3. News modul

### `app/(public)/news/page.tsx`
- **Felelősség:** `/news` oldal layout + metadata + JSON-LD.

### `app/(public)/news/NewsPageClient.tsx`, `components/news/NewsPageList.tsx`
- **Felelősség:** hírek listanézet, szűrés, megjelenés.

### `app/api/news/route.ts`, `app/api/news/[id]/route.ts`
- **Felelősség:** hírek API endpointok.
- **Bemenet:** HTTP request body/query + session.
- **Kimenet:** JSON API válasz.
- **Kockázat:** auth/csrf/validation törése.
- **Ellenőrzés:** 200/4xx utak, jogosultsági teszt.

### `features/news/*`
- **Felelősség:** news domain SSOT (types/schema/mapper/server/client).
- **Ha módosítod:** API és UI közti szerződés is változhat.

---

## 4. Calendar modul (events + booking)

### `app/(public)/calendar/page.tsx`, `app/(public)/calendar/CalendarPageClient.tsx`
- **Felelősség:** `/calendar` route és kliens oldali modulkompozíció.

### `components/calendar/CalendarModule.tsx`
- **Felelősség:** naptár fő élmény (timeline first), napi navigáció, foglalás.
- **Bemenet:** events/bookings API + lokális szűrők.
- **Kimenet:** 3 nézet + foglalási és admin műveletek.
- **Kockázat:** dátumlogika, ütközésvizsgálat, időzóna jellegű hibák.
- **Ellenőrzés:** napváltás, timeline, booking conflict, admin státuszfrissítés.

### `app/api/events/*`, `app/api/bookings/*`
- **Felelősség:** esemény és tornaterem-foglalás backend útvonalak.

### `features/events/server.ts`
- **Felelősség:** events domain logika.

---

## 5. Calculator modul

### `app/(public)/calculator/page.tsx`, `app/(public)/calculator/CalculatorPageClient.tsx`
- **Felelősség:** `/calculator` route és oldalkompozíció.

### `components/calculator/CalculatorModule.tsx`
- **Felelősség:** kalkulátor UI flow (félév, tárgy, mutatók, export).
- **Bemenet:** user adatok + saved state.
- **Kimenet:** KI/KKI és kapcsolódó mutatók.
- **Kockázat:** félreérthető űrlap flow vagy hibás mezővalidáció.
- **Ellenőrzés:** tipikus hallgatói inputok + edge case (0 kredit, hiányos tárgy).

### `lib/calculator/compute.ts`, `lib/calculator/export.ts`
- **Felelősség:** számítási és export domain.

### `app/api/calculator/state/route.ts`, `lib/validation/calculator.ts`
- **Felelősség:** szerveres mentés és validáció.

---

## 6. Gallery modul

### `app/(public)/gallery/page.tsx`
- **Felelősség:** `/gallery` route.

### `components/gallery/GalleryModule.tsx`
- **Felelősség:** galéria nézetváltás (grid/folder/timeline), keresés, admin műveletek.
- **Kockázat:** képfallback, külső URL kezelés, timeline stílus regresszió.
- **Ellenőrzés:** mindhárom nézet és mappaszűrés.

### `app/api/gallery/*`, `features/gallery/server.ts`
- **Felelősség:** galéria API és domain réteg.

### `types/gallery.ts`, `lib/mappers/gallery.ts`, `lib/validation/gallery.ts`
- **Felelősség:** DTO/mapping/validáció szerződés.

---

## 7. Guides modul

### `app/(public)/guides/page.tsx`, `app/(public)/guides/GuidesPageClient.tsx`
- **Felelősség:** `/guides` route.

### `components/guides/GuidesModule.tsx`
- **Felelősség:** útmutatók keresés/szűrés/lista + admin akciók.
- **Kockázat:** inline style maradványok miatt vizuális inkoherencia.
- **Ellenőrzés:** keresés, kategória, üres állapot, dokumentum link.

### `app/api/guides/*`, `features/guides/server.ts`
- **Felelősség:** útmutatók backend és domain logika.

---

## 8. About modul

### `app/(public)/about/page.tsx`, `app/(public)/about/AboutPageClient.tsx`
- **Felelősség:** `/about` route.

### `components/modules/about/AboutModule.tsx`
- **Felelősség:** szervezeti narratívák és tagkártyák (Fázis 4 pilot hely: `components/modules/about/`).
- **Kockázat:** csoportosítás, fallback avatar, admin törlés flow.
- **Ellenőrzés:** narrative + member groups + admin mód.

### `app/api/about/*`, `features/about/server.ts`
- **Felelősség:** about domain API és szerveroldali logika.

---

## 9. Office modul

### `app/(public)/office/page.tsx`
- **Felelősség:** `/office` route.

### `components/office/OfficeModule.tsx`
- **Felelősség:** status-first office dashboard.
- **Kockázat:** kritikus státusz-szöveg félrekommunikálása.
- **Ellenőrzés:** lead státusz, részletek modal, admin update.

### `app/api/office/route.ts`, `features/office/server.ts`
- **Felelősség:** office snapshot API/domain.

---

## 10. Search + Feedback modul

### `app/(public)/search/page.tsx`, `app/(public)/search/SearchPageClient.tsx`
- **Felelősség:** aggregált keresés + visszajelzés.
- **Bemenet:** több API forrás + query.
- **Kimenet:** keresési találatlista + feedback API hívás.
- **Kockázat:** részindex hiba esetén rossz UX.
- **Ellenőrzés:** fallback/hibaállapot + feedback siker/limit.

### `app/api/feedback/route.ts`, `lib/validation/feedback.ts`, `lib/security/feedback-rate-limit.ts`
- **Felelősség:** feedback endpoint, validáció és rate limit.

---

## 11. Admin modulok

### Route-ok
- **Közös felelősség:** admin operációs felületek (users, categories, content, audit).
- **Kockázat:** jogosultsági csúszás vagy félreértett admin művelet.
- **Ellenőrzés:** admin login + route guard + CRUD műveletek.
- `app/(internal)/admin/page.tsx`
- `app/(internal)/admin/users/page.tsx`
- `app/(internal)/admin/categories/page.tsx`
- `app/(internal)/admin/content/page.tsx`
- `app/(internal)/admin/audit/page.tsx`
- `app/(internal)/admin/office/page.tsx`

### API-k
- `app/api/users/route.ts`, `app/api/users/import/route.ts`
- `app/api/categories/route.ts`, `app/api/categories/import/route.ts`
- `app/api/audit/route.ts`, `app/api/audit/export/route.ts`
- `app/api/admin/saved-views/route.ts`, `app/api/admin/saved-views/[id]/route.ts`
- `lib/audit/audit-list-params.ts`, `lib/api/page-info.ts`
- `components/admin/AdminSavedViewsToolbar.tsx`
- `components/admin/AdminOnboardingWizard.tsx`, `AdminCommandPalette.tsx`, `AdminWorkspaceChrome.tsx`, `AdminNotificationBell.tsx`, `NewsRevisionDiffPanel.tsx`
- `lib/admin/quick-links.ts`, `lib/news/revision-diff.ts`, `lib/notifications/staff-dispatch.ts`
- `app/api/admin/notifications/route.ts`, `app/api/admin/notifications/[id]/route.ts`, `app/api/admin/notifications/mark-all-read/route.ts`
- `app/(internal)/admin/site-builder/page.tsx`
- `app/api/admin/site-builder/pages/route.ts`, `app/api/admin/site-builder/pages/[id]/route.ts`
- `app/api/admin/site-builder/pages/[id]/revisions/route.ts`, `app/api/admin/site-builder/publish-queue/route.ts`, `app/api/admin/site-builder/templates/route.ts`
- `app/api/admin/site-builder/canary/route.ts`
- `lib/site-builder/studio.ts`, `lib/validation/site-builder.ts`
- **P10 ops:** `playwright.config.ts`, `e2e/smoke-roles.spec.ts`, `e2e/helpers/login.ts`
- `scripts/ops/dependency-risk-dashboard.cjs`, `scripts/ops/generate-changelog.cjs`, `scripts/ops/audit-export-alerts.cjs`
- `app/api/admin/dependency-risk/route.ts`, `app/(internal)/admin/dependency-risk/page.tsx`
- `lib/audit/export-alerts.ts`, `lib/feature-flags/registry.ts` (canary rollout + `isFeatureEnabledForIdentity`)

### Keresztmetszeti biztonság
- `middleware.ts` (admin route-védelem)
- `lib/auth/*` (session/jogosultság)
- `lib/security/csrf.ts`

---

## 12. Auth / session / belépés

### `components/layout/AdminLoginModal.tsx`
- **Felelősség:** belépési UI és hibaüzenet UX.
- **Kockázat:** lock/pending állapot hibás kezelése.
- **Ellenőrzés:** hibás jelszó, rate limit, sikeres login/logout.

### `app/api/auth/login/route.ts`, `app/api/auth/session/route.ts`
- **Felelősség:** hitelesítés + session.

### `lib/auth/session.ts`, `lib/auth/current-user.ts`, `lib/auth/password.ts`
- **Felelősség:** JWT, user feloldás, jelszó hash/verify.

---

## 13. Brand és logók

### `components/brand/BrandMark.tsx`
- **Felelősség:** központi brand render light/dark tematikával.
- **Kockázat:** rossz asset vagy torz méret mindenhol egyszerre.
- **Ellenőrzés:** nav/hero/footer/internal logók mindkét témában.

### `public/brand/*.svg`
- **Felelősség:** tényleges logó assetek.
- **Ha módosítod:** teljes site brand megjelenés változik.

---

## 14. Dokumentáció és működtetés

### Fő docs
- `docs/documentation-index.md` (belépési pont)
- `docs/architecture.md` (rendszerkép)
- `docs/api.md` (API szerződés)
- `docs/design-system.md` (vizuális SSOT)
- `docs/teljes-uzemeltetesi-kezikonyv.md` (üzemeltetési kézikönyv)

---

## 15. Gyors változtatási szabályok (hogy ne törjön a rendszer)

1. **Design változtatás:** először `styles/design-tokens.css`; modul-specifikus osztályok: `styles/modules/<modul>.css` (import az `app/globals.css`-ben); kereszt-modul globál: `styles/base.css` vagy `styles/components/*.css` (új fájl esetén sorrend a `app/globals.css`-ben).
2. **Modul logika:** route fájl helyett inkább `features/*/server.ts` (domain SSOT).
3. **API szerződés:** DTO + mapper + validation együtt változzon.
4. **Nagy módosítás után:** `lint`, `test`, `build` kötelező.
5. **Doksi frissítés:** legalább `docs/progress-log.md` + érintett szakterületi doksi.

---

## 16. Javasolt “fájl-kommentár” sablon új fájlhoz

Új vagy jelentősen módosított fájlnál ezt a mini-sablont használd:

1. **Felelősség (1 mondat):** mi ez a fájl?
2. **Bemenet:** honnan kap adatot?
3. **Kimenet:** mit ad vissza / mit renderel?
4. **Függőségek:** mely modulokra támaszkodik?
5. **Kockázat:** mi romolhat el legkönnyebben?
6. **Ellenőrzés:** milyen gyors teszt igazolja, hogy jó?
