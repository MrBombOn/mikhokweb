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
