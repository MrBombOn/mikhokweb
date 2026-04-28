# Architecture

A rendszer Next.js App Router, feature-first modulok és központi SSOT elvek szerinti felépítését a `PROJECT_MASTER_SPEC.md` és a jelen fájl későbbi bővítése rögzíti.

## Fázis 1 – rögzített alap (bootstrap)

| Réteg | Hely | Szerep |
|--------|------|--------|
| Adat | `prisma/schema.prisma`, `prisma/migrations/` | SQLite fejlesztői DB; `User` + `UserRole` (OFFICE, ADMIN). Élesben ugyanígy séma, `DATABASE_URL` PostgreSQL. |
| DB kliens | `lib/db.ts` | Egy példányos `PrismaClient` (Next hot-reload biztonság). |
| UI szöveg SSOT | `lib/i18n/messages.ts`, `lib/i18n/index.ts` | HU/EN üzenetek; a `lib/content.ts` továbbra is re-exportálja a `t()` / `dictionary`-t a kompatibilitás miatt. |
| Validáció | `lib/validation/auth.ts` (Zod) | Bejelentkezési űrlap séma; bővíthető modulonként. |
| Vizuális tokenek | `styles/design-tokens.css` | `:root` és `html[data-theme='dark']` CSS változók; `app/globals.css` elején `@import`. |

## Fázis 2 – belső admin zóna váz

| Réteg | Hely | Szerep |
|--------|------|--------|
| Middleware | `middleware.ts` | `/admin` és alútvonalak: érvényes `hok_session` JWT (HS256) + `OFFICE` vagy `ADMIN` role. Hiány / hiba → `/?admin=denied`. |
| Belső layout | `app/(internal)/layout.tsx` | Fejléc + vissza a publikus főoldalra. |
| Kliens | `AppProvider`, `AdminDeniedBanner`, `Navbar` | `GET /api/auth/session`; belépés `POST /api/auth/login`; guest `DELETE /api/auth/session`; admin link, ha van session. |

## Fázis 3 – session és jelszó (első kör)

| Réteg | Hely | Szerep |
|--------|------|--------|
| Jelszó | `lib/auth/password.ts` | `bcryptjs` hash / verify |
| JWT session | `lib/auth/session.ts` | `AUTH_SECRET` (≥32), cookie `hok_session`, `SignJWT` / `jwtVerify` |
| Belépés | `app/api/auth/login/route.ts` | Prisma user + bcrypt; session cookie; régi `hok_admin_gate` törlése |
| Session API | `app/api/auth/session/route.ts` | `GET` aktuális user; `DELETE` logout |
| Middleware | `middleware.ts` | JWT ellenőrzés; csak `OFFICE` vagy `ADMIN` role |
| Seed | `prisma/seed.ts` | `admin` + `office` demó felhasználók (env-ből felülírható jelszó) |

## Fázis 4 – hírek

| Réteg | Hely | Szerep |
|--------|------|--------|
| Adat | `News`, enumok | CRUD + soft delete; seed demó hírek |
| API | `/api/news`, `/api/news/[id]` | RBAC: írás OFFICE/ADMIN; olvasás: vendég csak `published` |
| Kliens | `LandingNews`, `/news` | `GET`/`POST`/`PATCH`/`DELETE`; feature modulon át |

## Fázis 5 – naptár és tornaterem

| Réteg | Hely | Szerep |
|--------|------|--------|
| Adat | `CalendarEvent`, `GymBooking`, `BookingStatus` | Események + foglalási igények; seed a korábbi `lib/content` demóval összhangban |
| API | `/api/events`, `/api/bookings` + `[id]` | Esemény: írás OFFICE/ADMIN; foglalás: `POST` nyilvános, státusz PATCH admin |
| Kliens | `CalendarModule` | Egy adatforrás a három nézethez; dinamikus hónap a kiválasztott nap szerint; `types/calendar.ts` |

## Fázis 6 – KKI kalkulátor

| Réteg | Hely | Szerep |
|--------|------|--------|
| Domain | `lib/calculator/compute.ts`, `lib/calculator/export.ts` | KKI / KI / súlyozott átlag; JSON export |
| Validáció | `lib/validation/calculator.ts` | Mentett állapot séma |
| Adat | `CalculatorState` (1 rekord / `User`, JSON `semesters`) | Opcionális szerver oldali szinkron |
| API | `GET`/`PUT /api/calculator/state` | OFFICE/ADMIN |
| Kliens | `CalculatorModule` | `localStorage` + hidratálás után perzisztencia; szerver merge bejelentkezéskor |
| Dokumentáció | `docs/calculator-rules.md` | §12.3 képletek és edge case-ek |

## Fázis 7 – Galéria

| Réteg | Hely | Szerep |
|--------|------|--------|
| Adat | `GalleryFolder`, `GalleryItem` | Mappák + kép meta (`imageUrl`, `listDate`, státusz) |
| API | `GET`/`POST /api/gallery`, `GET`/`PATCH`/`DELETE /api/gallery/[id]` | Lista egy válaszban; írás OFFICE/ADMIN |
| Kliens | `GalleryModule`, `/gallery` | Grid / mappa / timeline; keresés; demó feltöltés; törlés; letöltés link ha van URL |
| Seed | `prisma/seed.ts` | 3 mappa + 3 elem (picsum URL) |

## Fázis 8 – Útmutatók

| Réteg | Hely | Szerep |
|--------|------|--------|
| Adat | `Guide` | Cím/kivonat/törzs HU/EN, kategória, témakör, kulcsszavak, opcionális dokumentum URL + típus, `listDate`, státusz |
| API | `GET`/`POST /api/guides`, `GET`/`PATCH`/`DELETE /api/guides/[id]` | Lista; írás OFFICE/ADMIN; soft delete |
| Kliens | `GuidesModule`, `/guides` | REST, keresés, kategóriaszűrés, modál a törzshöz, dokumentum link, admin demó POST + törlés |
| Seed | `prisma/seed.ts` | 2 kezdő útmutató (korábbi `guideItems` tartalom bővítve) |

## Fázis 9 – About Us

| Réteg | Hely | Szerep |
|--------|------|--------|
| Adat | `AboutNarrative` (`blockKey`), `AboutMember` | Bemutatkozó / szerkezet / történet / „kihez forduljak” blokkok; szerepkör kártyák csoport címkével, bio, opcionális kép URL |
| API | `GET /api/about`, `POST /api/about/members`, `GET`/`PATCH`/`DELETE /api/about/members/[id]`, `GET`/`PATCH /api/about/narratives/[id]` | Összesítő olvasás; tag CRUD + soft delete; narratívák PATCH (Office UI később) |
| Kliens | `AboutModule`, `/about` → `PageShell` | REST, intro + kártyák, tagok csoportosítva, admin demó tag + törlés |
| Seed | `prisma/seed.ts` | 4 narratív blokk (`intro`, `organization`, `history`, `contact`) + 3 tag |

## Fázis 10 – Office

| Réteg | Hely | Szerep |
|--------|------|--------|
| Adat | `OfficeSnapshot` | Singleton állapot nyitvatartáshoz, bent lévők listájához, ügyintézési státuszhoz, szolgáltatás és NFC/gyors információ blokkokhoz |
| API | `GET`/`PATCH /api/office` | Olvasás publikusan (`published`), írás OFFICE/ADMIN joggal |
| Kliens | `OfficeModule`, `/office` → `PageShell` | REST alapú office panel, részletek modál, admin demó státusz-frissítés |
| Seed | `prisma/seed.ts` | 1 alap `OfficeSnapshot` rekord |

## Fázis 11 – Admin felület

| Réteg | Hely | Szerep |
|--------|------|--------|
| Adat | `Category`, `AuditLog` | Kategória SSOT (scope + HU/EN név + státusz), írási műveletek naplózása |
| API | `/api/users`, `/api/categories`, `/api/audit` | ADMIN lista/létrehozás felhasználókhoz és kategóriákhoz; audit stream |
| Kliens | `/admin`, `/admin/users`, `/admin/categories`, `/admin/content`, `/admin/audit` | Élő API alapú admin dashboard, alap gyorsműveletek és listák |
| Seed | `prisma/seed.ts` | alap kategóriák + baseline audit sor |

## Fázis 12 – API validáció és hardening (első kör)

| Réteg | Hely | Szerep |
|--------|------|--------|
| API response | `lib/api/response.ts` | Egységes siker/hiba JSON válasz-factory |
| Biztonság | `lib/security/login-rate-limit.ts` | Login brute-force lassítás memória-alapú fail bucket-tel |
| Route hardening | `app/api/auth/login/route.ts` | Validációs részletek visszaadása + rate limit + egységes 4xx válaszok |
| Admin API | `app/api/users/route.ts`, `app/api/categories/route.ts`, `app/api/audit/route.ts` | Egységes hibakezelés response factory-vel |

## Fázis 13 – Biztonsági audit (első kör)

| Réteg | Hely | Szerep |
|--------|------|--------|
| CSRF védelem | `lib/security/csrf.ts` | Origin/referer alapú védelem cookie-auth írási kérésekre |
| Route hardening | Több `app/api/**/route.ts` state-changing endpoint | `enforceSameOrigin()` check bekötése |
| Dokumentáció | `docs/security-audit.md` | Állapotkép, nyitott kockázatok, következő védelmi lépések |

## Fázis 14 – Mobil + a11y audit (első kör)

| Réteg | Hely | Szerep |
|--------|------|--------|
| Layout | `app/layout.tsx` | Skip link a fő tartalomhoz (`#main-content`) |
| Stílus | `app/globals.css` | Globális `:focus-visible` és `prefers-reduced-motion` fallback |
| Admin UI | `app/(internal)/admin/users/page.tsx`, `app/(internal)/admin/categories/page.tsx` | Űrlapmezők ARIA címkézése, `role="alert"` hibaszöveg |
| Dokumentáció | `docs/a11y-audit.md` | Audit jegyzetek és nyitott teendők |

## Fázis 15 – Tesztelés és polish (első kör)

| Réteg | Hely | Szerep |
|--------|------|--------|
| Tesztek | `tests/*.test.ts` | Unit/smoke tesztek domain és security utility rétegre |
| NPM script | `package.json` | `npm run test` a tesztfuttatáshoz |
| Dokumentáció | `docs/testing.md` | Futtatás, lefedés, következő tesztkörök |

## Fázis 16 – Tartalmi/API SSOT szinkron (első kör)

| Réteg | Hely | Szerep |
|--------|------|--------|
| Közös fetch policy | `lib/services/content-fetch-policy.ts` | Demo fallback csak nem-production környezetben |
| Hírek service | `features/news/client.ts` | Landing + `/news` közös `GET /api/news` kliens szerződés |
| Modul fallback szabály | `LandingNews`, `NewsPageList`, `GuidesModule`, `AboutModule`, `OfficeModule`, `GalleryModule`, `CalendarModule` | Production útvonalon API hiba esetén nincs hardcoded demo tartalom, csak dev fallback |

## Fázis 17 – Feature-first refaktor (news referencia modul)

| Réteg | Hely | Szerep |
|--------|------|--------|
| Feature modul | `features/news/` | `types.ts`, `schema.ts`, `mapper.ts`, `server.ts`, `client.ts` egy helyen |
| API route vékonyítás | `app/api/news/route.ts`, `app/api/news/[id]/route.ts` | Route csak auth/csrf/HTTP kezelést végez; domain logika feature service-ben |
| UI átállítás | `LandingNews`, `NewsPageList` | Közvetlen `features/news/client` és `features/news/types` importok |

## Fázis 18 – Observability és üzemeltetés (első kör)

| Réteg | Hely | Szerep |
|--------|------|--------|
| Structured logger | `lib/observability/server-logger.ts` | JSON log sorok (`info`/`warn`/`error`), alap redakció érzékeny kulcsokra |
| Auth események | `app/api/auth/login/route.ts` | Login siker/hiba/rate-limit események strukturált logolása |
| Health endpoint | `app/api/health/route.ts` | Operátori API ping + DB connectivity check |
| Incident runbook | `docs/incident-debug.md` | Rövid hibakeresési folyamat éles incidenshez |

## Fázis 19 – SEO + Open Graph (első kör)

| Réteg | Hely | Szerep |
|--------|------|--------|
| Közös SEO helper | `lib/seo.ts` | Kanonikus URL, Open Graph alap, HU/EN alternates |
| Route metadata | `app/(public)/**/page.tsx` | Fő publikus oldalak dedikált title/description beállítása |
| Sitemap/robots | `app/sitemap.ts`, `app/robots.ts` | Publikus indexelés finomhangolása, admin/API tiltás |
| Strukturált adat | `app/(public)/news/page.tsx` | `CollectionPage` JSON-LD a hírekhez |
| Audit jegyzet | `docs/seo-audit.md` | SEO állapot + nyelvi alternatíva stratégia |

## Fázis 20 – Hallgatói élmény: keresés + visszajelzés (első kör)

| Réteg | Hely | Szerep |
|--------|------|--------|
| Globális kereső oldal | `app/(public)/search/*` | Modul-API aggregáció (`news`, `events`, `guides`), mentett keresések |
| Navigáció entry point | `components/layout/Navbar.tsx`, `lib/i18n/messages.ts` | Kereső link a fő navigációban |
| Visszajelzés API | `app/api/feedback/route.ts` | Nyilvános feedback endpoint validációval és rate limittel |
| Validáció + védelem | `lib/validation/feedback.ts`, `lib/security/feedback-rate-limit.ts` | Input séma + spamfékező limit |
| Keresési szabályok | `docs/search-rules.md`, `docs/decision-log.md` | Keresési viselkedés és architekturális döntés dokumentálva |

## Kötelező architektúra- és UX-listák

A szerver- és kliensoldali, illetve a design / brand **kötelező ellenőrzőlistái** a `PROJECT_MASTER_SPEC.md` **§30** (backend), **§31** (frontend) és **§32** (design, design-pack, „fancy” UI) fejezeteiben találhatók. Ettől való eltérés csak a `docs/decision-log.md` szerint rögzített döntéssel engedélyezett.
