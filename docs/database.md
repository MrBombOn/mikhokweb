# Adatbázis és éles (DB-first) — Fázis 6

Prisma ORM, séma: `prisma/schema.prisma`, migrációk: `prisma/migrations/`, seed: `prisma/seed.ts` (`npm run db:seed`).

---

## 1. `provider` és `DATABASE_URL`

| Környezet | `datasource db` | `DATABASE_URL` példa |
|-----------|-----------------|----------------------|
| **Fejlesztés (aktuális repo)** | SQLite (`provider = "sqlite"`) | `file:./dev.db` vagy `file:./prisma/dev.db` — lásd `.env.example` / `scripts/prisma-env.cjs` |
| **Éles (javasolt)** | PostgreSQL (`provider = "postgresql"`) | `postgresql://USER:PASS@HOST:5432/DB?schema=public` |

**Éles átállás:** a séma fájlban cseréld `sqlite` → `postgresql`, futtasd `prisma migrate dev` (vagy új migrációt készíts a diffből), majd élesen **`prisma migrate deploy`**. Ugyanaz a modell-struktúra maradhat; SQLite-specifikus típusok (pl. `String` @db.Text) ellenőrizendők PostgreSQLen.

**Titok:** `DATABASE_URL` soha ne kerüljön verziókezelőbe; csak `.env` / hosting titoktár.

---

## 2. Migrációk és CI

| Parancs | Mikor |
|---------|--------|
| `npm run db:migrate` | Lokálisan: új séma → `migrate dev` |
| `npx prisma migrate deploy` | **Éles / staging / CI:** csak alkalmazza a meglévő migrációkat, nem generál újat |

**CI (Fázis 6):** [`.github/workflows/ci.yml`](../.github/workflows/ci.yml) — `DATABASE_URL: file:./dev.db` + `npx prisma migrate deploy` lépés a következő jobokban (mind a dependency install után, a migrációk alkalmazhatóságának gate-je):

- **`test`** — migrate deploy → backup restore drill → `npm run test`
- **`build`** — migrate deploy → `npm run build` → `ops:smoke-gate`
- **`lighthouse`** — migrate deploy → build → LHCI
- **`release_checklist`** — migrate deploy → `ops:release-checklist`

Éles PostgreSQL környezetben ugyanaz a parancs; a `DATABASE_URL` a hosting titoktárából töltődjön, ne a repóból.

---

## 3. Demó fallback (mock tartalom) — `canUseDemoFallback()`

Forrás: `lib/services/content-fetch-policy.ts` (`readDemoFallbackPolicy` + `canUseDemoFallback()`).

| Környezet | Viselkedés |
|-----------|------------|
| `NODE_ENV === 'production'` | Fallback **ki**, kivéve ha explicit `ALLOW_DEMO_FALLBACK=1` (ritka staging). |
| Egyéb (development / test) | Fallback **be**, kivéve ha `ALLOW_DEMO_FALLBACK=0`. |

**Éles checklist:** `ALLOW_DEMO_FALLBACK` **ne** legyen `1` hacsak szándékosan nem demózol élesen; alapból nincs beállítva → nincs mock tartalom API hibánál.

---

## 4. Kalkulátor: `localStorage` vs szerver

| Felhasználó | Betöltés | Mentés |
|-------------|----------|--------|
| **Vendég / nincs session** | Csak böngésző `localStorage` (`v26-calculator-semesters`); üres esetén `initialSemesters` a `lib/content`-ből. | Csak `localStorage`. |
| **OFFICE / ADMIN** (`isAdmin`) | Először `localStorage`; ha a **`GET /api/calculator/state`** visszaad nem üres `semesters` tömböt, az **felülírja** a kliens állapotot (szerver SSOT bejelentkezve). | Debounced **`PUT /api/calculator/state`** (Zod + CSRF + audit) + párhuzamosan `localStorage`. |

API: `app/api/calculator/state/route.ts` — `CalculatorState` sor felhasználónként (`prisma/schema.prisma`).

---

## 5. Seed és éles adat

- `prisma/seed.ts` demó felhasználók / tartalom — **éles production** adatbázison csak szándékos, kontrollált futtatás (vagy egyáltalán ne futtasd automatikusan).
- Éles indulás: saját admin felhasználó + valós tartalom migráció / import — külön üzemeltetési lista: `docs/teljes-uzemeltetesi-kezikonyv.md`.

---

## 6. Éles indulás — rövid DB-first checklist

- [ ] `prisma/schema.prisma` → `datasource db.provider` megegyezik a cél adatbázissal (fejlesztésben tipikusan `sqlite`, élesen `postgresql` — lásd §1).
- [ ] `DATABASE_URL` production PostgreSQL (vagy jóváhagyott SQLite csak ha tudatos döntés).
- [ ] `AUTH_SECRET` ≥32 karakter, nem commitolt.
- [ ] `prisma migrate deploy` lefut hiba nélkül a cél környezetben (lokálisan / CI minta: `.github/workflows/ci.yml`).
- [ ] `ALLOW_DEMO_FALLBACK` **nincs** `1`-re állítva élesen (vagy szándékos demó mód dokumentálva) — §3, `.env.example`.
- [ ] Seed / demó script nem fut deploy hookon véletlenül.
- [ ] Backup és visszaállítás stratégia rögzítve (`docs/teljes-uzemeltetesi-kezikonyv.md`, `docs/go-live-checklist.md`).

Tágabb go-live: [`docs/go-live-checklist.md`](./go-live-checklist.md) (3.5 demo fallback sor).

---

*Utolsó frissítés (2026-05-09): Fázis 6 harmadik kör — CI migrate gate részletezve, checklist bővítve.*
