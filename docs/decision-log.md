# Decision log

Fontos technikai és design döntések (master spec §24.2). Új bejegyzésnél másold a sablont.

---

## D-2026-04-28-001 – Dokumentáció és előkészület

| Mező | Tartalom |
|------|----------|
| **Téma** | Hol legyen a roadmap és a git útmutató |
| **Alternatívák** | Egyetlen README vs külön `docs/` fájlok |
| **Döntés** | `docs/roadmap.md` (termék + szabályok), `docs/workflow.md` (git/GitHub/GitLab), a gyökér `PROJECT_MASTER_SPEC.md` marad a kanonikus spec |
| **Indoklás** | A master spec §24 kötelező docs fájlneveit fokozatosan töltjük; a roadmap és workflow azonnali munkaindítást támogat |
| **Roadmap-hatás** | Fázis 0 checklist; Fázis 1-től `architecture.md`, `rbac.md` stb. |
| **Érintett fájlok** | `docs/roadmap.md`, `docs/workflow.md`, `docs/progress-log.md`, `docs/decision-log.md`, `docs/specification.md` |

---

## D-2026-04-28-002 – CI platform és Node verzió

| Mező | Tartalom |
|------|----------|
| **Téma** | Hol fusson a lint + build |
| **Alternatívák** | Csak GitHub Actions; csak GitLab CI; mindkettő |
| **Döntés** | **Mindkettő**: `.github/workflows/ci.yml` + `.gitlab-ci.yml`, azonos lépések |
| **Indoklás** | A repóhoz GitHub és GitLab is kapcsolódhat; így bármelyik elsődleges remote mellett azonnali visszajelzés |
| **Roadmap-hatás** | Fázis 0 CI kész; Node verzió változásakor két fájl szinkronban tartása |
| **Érintett fájlok** | `.github/workflows/ci.yml`, `.gitlab-ci.yml`, `docs/workflow.md` |

---

## D-2026-04-28-003 – Prisma és fejlesztői adatbázis

| Mező | Tartalom |
|------|----------|
| **Téma** | ORM verzió és lokális DB |
| **Alternatívák** | Prisma 7 + adapter; Prisma 6 klasszikus séma; kizárólag mock adat |
| **Döntés** | **Prisma 6** + **SQLite** (`file:./dev.db`), első migráció `User` + `UserRole`; CI-ben `DATABASE_URL` env a `postinstall` `prisma generate` miatt |
| **Indoklás** | A Prisma 7 adapter-alapú beállítás nagyobb lépés; a Fázis 1 célja a gyors, reprodukálható bootstrap és a séma SSOT |
| **Roadmap-hatás** | Fázis 3: PostgreSQL éles URL, jelszó hash, session; séma bővítés ugyanitt |
| **Érintett fájlok** | `prisma/schema.prisma`, `prisma/migrations/`, `lib/db.ts`, `package.json`, `.env.example`, CI fájlok |

---

## D-2026-04-28-004 – Admin zóna védelme Fázis 2-ben

| Mező | Tartalom |
|------|----------|
| **Téma** | Hogyan legyen `/admin` védett a valódi auth előtt |
| **Alternatívák** | Csak kliens `localStorage`; csak layout üzenet; middleware + httpOnly cookie |
| **Döntés** | **Middleware + httpOnly cookie** (`hok_admin_gate`), API route a beállítás/törléshez; belépés után a kliens `POST`, guest `DELETE` |
| **Indoklás** | A szerver ellenőrizheti a belépést a következő fázisban; a middleware már most blokkolja a közvetlen URL-t; a cookie nem érhető el JS-ből (XSS ellen jobb, mint csak localStorage) |
| **Roadmap-hatás** | Fázis 3: ugyanitt session/JWT vagy NextAuth, a gate logika cseréje |
| **Érintett fájlok** | `middleware.ts`, `AppProvider.tsx`, `Navbar.tsx`, `AdminDeniedBanner.tsx` (korábbi `admin-gate` route Fázis 3-ban törölve) |

---

## D-2026-04-28-005 – Session: JWT cookie vs NextAuth (Fázis 3)

| Mező | Tartalom |
|------|----------|
| **Téma** | Szerveroldali session megvalósítása |
| **Alternatívák** | NextAuth / Auth.js; külső IdP; saját JWT httpOnly süti |
| **Döntés** | **Saját JWT** (`jose`, HS256), `hok_session` httpOnly cookie, `AUTH_SECRET` (≥32); belépés `User` tábla + `bcryptjs` |
| **Indoklás** | Minimális függőség, Edge-barát verify (`jose/jwt/verify`), könnyen bővíthető RBAC claimmel; később NextAuth-ra migrálható |
| **Roadmap-hatás** | Minden védett API: session olvasás + szerepkör; refresh / rotation később |
| **Érintett fájlok** | `lib/auth/session.ts`, `lib/auth/password.ts`, `app/api/auth/login/route.ts`, `app/api/auth/session/route.ts`, `middleware.ts`, `prisma/seed.ts` |

---

## D-2026-04-28-006 – CSRF stratégia első körben

| Mező | Tartalom |
|------|----------|
| **Téma** | Hogyan védekezzünk CSRF ellen cookie-auth API-knál |
| **Alternatívák** | Csak SameSite cookie; teljes token-alapú CSRF minden formhoz; origin/referer ellenőrzés + SameSite |
| **Döntés** | **Origin/referer guard** (`enforceSameOrigin`) a state-changing, cookie-auth route-okra; SameSite/Lax cookie marad; tokenes CSRF későbbi körben mérlegelendő |
| **Indoklás** | Gyorsan és konzisztensen bevezethető védelem minimális UI-változtatással; böngészős cross-site POST/PATCH/DELETE támadásokat csökkenti |
| **Roadmap-hatás** | Fázis 13 gyors hardening; következő körben centralizált middleware / tokenes kiterjesztés |
| **Érintett fájlok** | `lib/security/csrf.ts`, több `app/api/**/route.ts`, `docs/security-audit.md` |

---

## D-2026-04-28-007 – Globális keresés architektúra (Fázis 20)

| Mező | Tartalom |
|------|----------|
| **Téma** | Központi keresőindex vs modul-API aggregáció |
| **Alternatívák** | Dedikált kereső index/tábla; kliens oldali modulonkénti aggregáció |
| **Döntés** | Első körben **kliens aggregáció** a meglévő publikus API-kon (`/api/news`, `/api/events`, `/api/guides`) |
| **Indoklás** | Gyors bevezetés schema/migráció nélkül; meglévő SSOT API-k újrahasználata; később indexelt backend keresőre migrálható |
| **Roadmap-hatás** | Fázis 20 gyors értékadás; nagyobb adatmennyiségnél dedikált index/service szükséges |
| **Érintett fájlok** | `app/(public)/search/*`, `docs/search-rules.md`, `components/layout/Navbar.tsx` |

---

## D-2026-04-28-008 – Mobil menü: háttér görgetés tiltása

| Mező | Tartalom |
|------|----------|
| **Téma** | Nyitott mobil nav panel alatt a dokumentum görgetése |
| **Alternatívák** | Csak fókusz-trap, görgetés szabadon; `overflow: hidden` a `html`+`body`-n; teljes képernyős overlay + lock |
| **Döntés** | **`document.documentElement` és `document.body` `overflow: hidden`** a panel nyitva léte alatt; panel bezárásakor visszaállítás a korábbi inline értékre |
| **Indoklás** | D5 roadmap „scroll lock opció”; egyszerű, iOS/desktop között jól ismert minta; overlay nélkül is csökken a véletlen háttér-görgetés |
| **Roadmap-hatás** | D5 elfogadás; modálok későbbi döntése külön bejegyzésben |
| **Érintett fájlok** | `components/layout/Navbar.tsx` |

---

## D-2026-04-28-009 – D7: `features/*` modulok kiterjesztése és sorrend

| Mező | Tartalom |
|------|----------|
| **Téma** | Mely tartalmi modulok kerüljenek `features/` alá a `news` mintához igazítva |
| **Alternatívák** | Csak galéria; csak naptár; minden publikus CRUD modul egyszerre |
| **Döntés** | **Sorrend:** `gallery` → `guides` → `events` (naptár) → `about` → `office`. Mindegyikhez `features/<modul>/server.ts` (Prisma + DTO mapper), az `app/api/.../route.ts` handlerek **vékonyak**: auth + Zod + `enforceSameOrigin`, majd a szerver függvény hívása. A Zod sémák maradnak `lib/validation/*` (D7 első kör); későbbi kör opcionálisan `features/<modul>/schema.ts` mint a híreknél. |
| **Indoklás** | Egységes SSOT a domain logikához; route fájlok olvashatók; a roadmap D7 elfogadása (`api.md` + build) teljesül |
| **Roadmap-hatás** | D7 mérföldkövek; D8 előtt további modulok (pl. `bookings`) külön döntésben |
| **Érintett fájlok** | `features/gallery/server.ts`, `features/guides/server.ts`, `features/events/server.ts`, `features/about/server.ts`, `features/office/server.ts`, érintett `app/api/**/route.ts`, `docs/api.md` |

---

### Sablon (másolás új döntéshez)

```
## D-ÉÉÉÉ-HH-NN-### – Cím

| Mező | Tartalom |
|------|----------|
| **Téma** | |
| **Alternatívák** | |
| **Döntés** | |
| **Indoklás** | |
| **Roadmap-hatás** | |
| **Érintett fájlok** | |
```
