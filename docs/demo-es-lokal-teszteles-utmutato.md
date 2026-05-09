# Teljes körű útmutató: tesztelhető demó indítása (lokálisan)

Ez a dokumentum leírja, hogyan állíts fel **minden szükséges réteget** (környezet, adatbázis, migráció, seed, Next.js dev szerver), hogy a böngészőben végig tudd próbálni a publikus modulokat és a belső admin demót. A végén röviden összekapcsoljuk a **„mit szeretnék változtatni”** jegyzeteléssel és a **fázisolt tervezés** dokumentumaival.

**Kapcsolódó:** [`repository.md`](./repository.md) (klónozás), [`.env.example`](../.env.example), [`testing.md`](./testing.md) (lint/build/test), [`folder-structure.md`](./folder-structure.md) (mappák).

---

## 1. Mit jelent itt a „demó”?

| Réteg | Mit kapsz lokálisan |
|--------|----------------------|
| **UI** | Next.js **fejlesztői** szerver (`next dev`), tipikusan `http://localhost:3000`. |
| **Adat** | **SQLite** fájl (`DATABASE_URL=file:./dev.db` a `prisma` mappához képest) + **seed** demó hírek, események, galéria, stb. |
| **Auth** | JWT session cookie (`hok_session`); seedelt **`admin`** és **`office`** felhasználók bejelentkezéssel. |
| **API** | `app/api/*` route handlerek élő adatbázissal (nem statikus mock oldal). |

Ez **nem** éles üzem: titkok, URL-ek és adatbázis a saját gépeden maradnak.

---

## 2. Előfeltételek

1. **Node.js** (LTS ajánlott, pl. 20.x vagy 22.x) – telepítés után ellenőrzés: `node -v`, `npm -v`.
2. **Git** – a repó klónozása (lásd `docs/repository.md`).
3. **Írási jog** a projekt mappára (SQLite `dev.db` ide kerül a migráció után).
4. **Böngésző** – Chrome / Edge / Firefox; érdemes privát ablakot használni session teszthez.

**Windows:** a repo tartalmaz `scripts/start-dev-test.bat` + `npm run start:dev:test` parancsot (lásd §6).  
**macOS / Linux:** ugyanazok az npm lépések terminálból (§5).

---

## 3. Környezeti változók (kötelező minimum)

1. Másold az **`.env.example`** fájlt **`.env.local`** néven a **repo gyökerébe** (ugyanoda, ahol a `package.json` van).
2. Ellenőrizd legalább ezeket:

| Kulcs | Fejlesztői demóhoz |
|--------|---------------------|
| `DATABASE_URL` | Alapértelmezés: `file:./dev.db` — megfelelő, ha nem változtatsz. |
| `AUTH_SECRET` | **Legalább 32 karakter** éles környezethez kötelező; fejlesztésben az example érték általában elég, ha nem commitolsz valódi titkot. |

3. **Opcionális** (seed felhasználók felülírása):  
   `SEED_ADMIN_USERNAME`, `SEED_ADMIN_PASSWORD`, `SEED_OFFICE_USERNAME`, `SEED_OFFICE_PASSWORD` — részletek a `.env.example` kommentjeiben.

> **Fontos:** a `.env.local` legyen a `.gitignore`-ban (ne kerüljön verziókezelésbe).

> **Prisma és a `.env.local`:** a nyers `prisma migrate` parancs csak a gyökér **`.env`** fájlt tölti be automatikusan. Ebben a repóban a `npm run db:migrate`, `db:seed`, `db:push`, `db:studio`, `db:generate` és a `postinstall` a **`scripts/prisma-env.cjs`** segítségével előbb a `.env`, majd a **`.env.local`** változóit állítja be — elég tehát a Nexthez szokásos **`.env.local`** a `DATABASE_URL`-lel.

---

## 4. Első indítás lépésről lépésre (kézi, minden platform)

A parancsokat a **projekt gyökérből** futtasd.

### 4.1 Függőségek

```bash
npm ci
```

- Első alkalommal a `postinstall` lefuttatja a **`prisma generate`**-et is (`scripts/prisma-env.cjs` + `.env` / `.env.local`).

### 4.2 Adatbázis séma (migrációk)

```bash
npm run db:migrate
```

- Ez a `prisma migrate dev` futtatása a **`.env.local` betöltése után**; létrehozza / frissíti a lokális SQLite sémát a `prisma/migrations` alapján.
- Ha a parancs interaktív kérdést tesz fel (pl. új migráció neve), fejlesztői **demó** céljából általában a meglévő migrációk alkalmazása a cél; kövesd a Prisma CLI üzenetét.

### 4.3 Demó adat (seed)

```bash
npm run db:seed
```

- Feltölti a felhasználókat, híreket, naptárat, galériát, útmutatókat, about, office, kategóriákat, stb. (részletek: `prisma/seed.ts`).

### 4.4 Fejlesztői szerver

```bash
npm run dev
```

- Nyisd meg: **http://localhost:3000**

### 4.5 Gyors minőségellenőrzés (opcionális, de ajánlott)

```bash
npm run lint
npm run test
npm run build
```

- CI-szerű „zöld” állapot demó előtt prezentációhoz.

---

## 5. Alapértelmezett belépési adatok (seed, ha nem írtad felül env-ből)

| Szerep | Felhasználónév | Jelszó (fejlesztői default) |
|--------|----------------|----------------------------|
| **ADMIN** | `admin` | `admin-dev-change-me` |
| **OFFICE** | `office` | `office-dev-change-me` |

- Bejelentkezés: a fő navigáció **Belépés** / admin modal, vagy olyan útvonal, ahol a session szükséges.
- **Admin zóna:** `/admin` és aloldalak — a `middleware` csak megfelelő JWT + **OFFICE vagy ADMIN** szerepkörrel enged be.

---

## 6. Windows: egy parancs „mindennel együtt”

Ha a gépen **Node a PATH-on** van és a projekt gyökérben vagy:

```bash
npm run start:dev:test
```

Ez (a `scripts/start-dev-test.bat` szerint):

1. Hiányzó `.env.local` esetén **másolja** a `.env.example`-t `.env.local`-nek.  
2. `npm ci`  
3. `npm run db:migrate`  
4. `npm run db:seed`  
5. `npm run dev`

**Megjegyzés:** PowerShellben ne `&&`-láncot várj mindenhol; a fenti `npm run start:dev:test` önmagában elég Windows cmd kompatibilitáshoz.

---

## 7. Mit érdemes végigklikkelni demó ellenőrzésként?

| Terület | Útvonal / teendő |
|---------|-------------------|
| **Landing** | `/` — hero, modul kártyák, hírek szekció. |
| **Publikus modulok** | `/news`, `/calendar`, `/calculator`, `/gallery`, `/guides`, `/about`, `/office`, `/search` |
| **Téma / nyelv** | Világos–sötét, HU/EN váltás (navbar / landing vezérlők). |
| **Admin** | Bejelentkezés **admin** felhasználóval → `/admin`, `/admin/users`, `/admin/categories`, `/admin/content`, `/admin/audit` |
| **Office szerep** | **office** felhasználóval: jogosultságokkal védett, de nem minden ADMIN funkció (RBAC: `docs/rbac.md`). |

Ha valamelyik oldal üres vagy 500: nézd a terminál logot és a böngésző **Network** fülét (`/api/...` hívások).

---

## 8. Gyakori hibák és megoldás

| Jelenség | Tipikus ok | Mit tegyél |
|----------|------------|------------|
| `PrismaClient` / DB hiba | Nincs migráció vagy rossz `DATABASE_URL` | `npm run db:migrate`, ellenőrizd `.env.local`. |
| `Environment variable not found: DATABASE_URL` (Prisma) | Csak `.env.local` van, nyers `prisma` CLI | Mindig **`npm run db:migrate`** / **`npm run db:seed`** — ne közvetlenül `npx prisma …`, hacsak nem adsz meg `.env`-t is. |
| `npm ci` / `postinstall` EPERM (Windows) | `node_modules` vagy Prisma engine zárolva (IDE, futó `next dev`) | Zárd be a futó Node folyamatokat / IDE-t, töröld `node_modules`-t, futtasd újra `npm ci`. |
| Login nem működik | `AUTH_SECRET` hiány / seed nem futott | Futtasd `npm run db:seed`; indítsd újra a dev szervert. |
| `/admin` átirányít | Nincs session vagy rossz role | Jelentkezz be `admin` vagy `office`-szal. |
| Port foglalt | Már fut egy `next dev` | Állítsd le a másik folyamatot, vagy `npx next dev -p 3001`. |
| `npm ci` elhasal | `package-lock.json` és `node_modules` inkonzisztencia | Töröld a `node_modules`-t, futtasd újra `npm ci`. |

---

## 9. Következő lépés a te oldaladon: „min kéne változtatni?”

Ha a demó alapján **konkrét módosításokat** szeretnél, érdemes egy rövid jegyzetet írni (issue, wiki vagy email szerkezetben is), hogy abból később **fázisolt terv** legyen. Minimális szerkezet:

1. **Cél** — mit kell elérni (pl. új mező az Office modulban, új admin listaoszlop, kereső finomhangolás).  
2. **Hatókör** — mely útvonalak / komponensek / API-k (`app/(public)/…`, `app/api/…`, `components/…`, `features/…`).  
3. **Nem cél** — mit explicit nem nyúlunk (csökkenti a scope creep-et).  
4. **Függőségek** — DB migráció kell-e, env változó, külső szolgáltatás.  
5. **Elfogadási kritériumok** — hogyan tudjuk lezárni a kört (teszt, manuális checklist).

Ezeket be lehet tenni a **`docs/decision-log.md`** rövid döntésbe (D-azonosító), vagy külön issue-ba hivatkozva a **`docs/progress-log.md`**-ben.

---

## 10. Fázisolt tervezés — hol és hogyan folytasd?

Ha a fenti „változtatási jegyzet” megvan, a projektben már van **fázisolt ütemterv-minta**:

| Dokumentum | Szerep |
|------------|--------|
| [`docs/phased-master-plan.md`](./phased-master-plan.md) | Nagyobb program fázisokra bontása (SSOT, DB, mobil, dokumentáció, mappa). |
| [`docs/design-and-ssot-phase-roadmap.md`](./design-and-ssot-phase-roadmap.md) | Design / SSOT / technikai adósság roadmap. |
| [`docs/decision-log.md`](./decision-log.md) | Architekturális döntések (D-… azonosító). |
| [`docs/progress-log.md`](./progress-log.md) | Lezárt lépések rövid naplója. |

**Javasolt folyamat:**

1. A te §9 szerinti jegyzetet átemezed **1–3 konkrét fázisra** (pl. Fázis A: API + DB, Fázis B: UI, Fázis C: dokumentáció + teszt).  
2. A `phased-master-plan.md`-hez **új alfejezetet** vagy táblázatsort adsz (vagy külön `docs/phases/<téma>.md`-t, ha a csapat így szereti).  
3. Döntés esetén **egy bejegyzés** a `decision-log.md`-ben (scope, alternatívák, trade-off).  
4. Minden lezárt körben **egy sor** a `progress-log.md`-ben.

Így a „demó → igény → fázisolt terv” lánc egyértelműen visszakövethető marad.

---

## 11. Összefoglaló parancssor (másolható)

```bash
cp .env.example .env.local   # Windows: copy .env.example .env.local
# szerkeszd .env.local ha kell

npm ci
npm run db:migrate
npm run db:seed
npm run dev
```

Ezután böngésző: **http://localhost:3000** — bejelentkezés seed felhasználókkal (§5), majd végig a §7 checklisten.

---

*Utolsó átfogó szerkesztés célja: lokális demó SSOT; kapcsolódó spec: `PROJECT_MASTER_SPEC.md` (üzemeltetés, RBAC, modulok).*
