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
