# PTE MIK HÖK Web – Projekt dokumentáció: munkafolyamat, szerkezet és változások

Ez a fájl a **jelenlegi kódbázis** összefoglaló leírása: fejlesztői munkafolyamat, futásidejű viselkedés, könyvtárstruktúra, CI, valamint a **verziótörténetből és a strukturális átalakításokból** rekonstruálható változások krónikája. Kanonikus termékszabályok továbbra is: [`PROJECT_MASTER_SPEC.md`](../PROJECT_MASTER_SPEC.md). A `docs/` mappa a master spec **§24** szerinti *kötelező* dokumentumokat tartalmazza (lásd alább).

---

## 1. Cél és hatókör

| Elem | Leírás |
|------|--------|
| **Projekt** | PTE MIK HÖK hallgatói önkormányzat webes felülete – landing, modulok (naptár, kalkulátor, galéria, útmutatók, hírek, about, office), belső admin zóna, JWT session + Prisma. |
| **Stack** | Next.js **15** (App Router), React **19**, TypeScript, ESLint 9 (flat config), `globals.css` + `styles/modules/*.css` tokenek. |
| **Adat / API** | **Prisma** (SQLite dev / PostgreSQL éles); `app/api/*` REST végpontok modulonként; a landing kártyák egy része még `lib/content.ts`-ből (SSOT fokozatos átállás). |
| **Ez a dokumentum** | Nem váltja ki a `PROJECT_MASTER_SPEC.md`-t; kiegészíti **operatív** és **történeti** információval. |

---

## 2. Kanonikus hivatkozások

| Forrás | Szerep |
|--------|--------|
| **GitHub repó** | [MrBombOn/mikhokweb](https://github.com/MrBombOn/mikhokweb) – kanonikus remote, CI (Actions), issue-k. |
| `PROJECT_MASTER_SPEC.md` | Master spec: célok, modulok, RBAC elv, javasolt mappaszerkezet, kötelező `docs/` fájlok. |
| `docs/specification.md` | Specifikáció index / rövid összekötő (§24). |
| `docs/architecture.md`, `docs/design-system.md`, `docs/rbac.md`, `docs/database.md`, `docs/api.md` | Rövid vázak; bővítendők a spec szerint. |
| `docs/progress-log.md`, `docs/decision-log.md` | Haladás és döntések naplója. |
| `docs/calculator-rules.md`, `docs/search-rules.md` | KKI és keresési szabályok helye (tartalom bővítendő). |
| `docs/repository.md` | GitHub repó URL és klónozási parancs (a webes UI-ban nincs repó link). |

**Megjegyzés (2026-04-28):** A `docs/` mappa a master spec **§24** szerinti kötelező fájlokat tartalmazza, **plusz** `repository.md` a távoli repó hivatkozásához. A korábbi `roadmap.md`, `workflow.md` és `V*.md` mellékletek eltávolítva. A **`README.md`** a repó URL-t és a fejlesztői dokumentumokat hivatkozza.

---

## 3. Technológiai összetevők

### 3.1 Függőségek (összefoglaló)

A `package.json` alapján:

- **Futás:** `next@15.5.7`, `react@19.1.0`, `react-dom@19.1.0`
- **Opcionális / előkészített:** `@prisma/client`, `zod` (séma és DB irány; **Prisma séma fájl** a repóban jelenleg nem kötelezően jelen van – bekötés fázis szerint.)
- **Fejlesztés:** `typescript`, `eslint`, `eslint-config-next`, `@eslint/eslintrc` (flat ESLint és Next preset összekapcsolásához)

### 3.2 NPM szkriptek

| Parancs | Funkció |
|---------|---------|
| `npm run dev` | Next fejlesztői szerver |
| `npm run build` | Production build + típusellenőrzés + lint (build pipeline része) |
| `npm run start` | Production szerver (build után) |
| `npm run lint` | **`eslint .`** (flat `eslint.config.mjs`; `next lint` deprecated — lásd `docs/eslint-cli-migration.md`) |

### 3.3 Konfigurációs fájlok

| Fájl | Szerep |
|------|--------|
| `next.config.ts` | `reactStrictMode: true` |
| `tsconfig.json` | `paths`: `@/*` → gyökér |
| `eslint.config.mjs` | Flat config, `next/core-web-vitals` + `next/typescript` (FlatCompat) |
| `tailwind.config.ts` | Fenntartott hely; a tényleges stílus döntően `app/globals.css` tokenekből épül. |
| `.env.example` | Környezeti változók sablonja (kitöltés helyi / CI szekrény szerint). |

---

## 4. Könyvtárstruktúra (aktuális, működő rétegek)

### 4.1 App Router (`app/`)

| Útvonal / csoport | Tartalom |
|-------------------|----------|
| `app/layout.tsx` | Gyökér layout: `globals.css`, `AppProvider`, `Navbar`, `main`, `Footer`, toast, modál host, admin belépés, scroll-top. |
| `app/globals.css` | CSS belépési pont: `@import` lánc (`design-tokens`, `styles/modules/*`, `styles/base.css`, `styles/components/*`). |
| `app/loading.tsx` | Globális töltő állapot. |
| `app/error.tsx` | Hiba boundary (kliens), újrapróbálás gombbal. |
| `app/not-found.tsx` | 404 oldal. |
| `app/sitemap.ts` | `MetadataRoute.Sitemap`; base URL: `NEXT_PUBLIC_SITE_URL` vagy placeholder. |
| **`app/(public)/`** | Nyilvános oldalak. A route group **nem** változtat URL-t. `layout.tsx` jelenleg átlátszó (children). |
| `app/(public)/page.tsx` | Főoldal: `LandingHero`, `LandingNews`, `PageShell`. |
| `app/(public)/about`, `calendar`, `calculator`, `gallery`, `guides`, `news`, `office` | Modul oldalak (részlet a §5-ben). |
| **`app/(internal)/`** | Belső / admin jellegű oldalak (URL-en elérhetők). |
| `app/(internal)/admin/page.tsx` | Admin dashboard váz. |
| `app/(internal)/admin/users`, `categories`, `content`, `audit` | Admin aloldalak vázon. |
| `app/(internal)/admin/office/page.tsx` | **Belső** irodai munkafelület: **`/admin/office`**. |

**Fontos megjegyzés a master spec fájához:** A spec javasolt fájában szerepelhet `(public)/office` és `(internal)/office` egyszerre. Next.js-ben a `(group)` nem része az URL-nek, ezért két `office/page.tsx` **ugyanarra a `/office` útvonalra** ütközne. A jelenlegi megoldás: nyilvános iroda **`/office`** (`(public)/office`), belső iroda **`/admin/office`** (`(internal)/admin/office`).

### 4.2 API route-ok (`app/api/`)

Közös minta: `lib/utils/not-implemented-response.ts` → `notImplemented()` → JSON `{ error: 'Not implemented' }`, HTTP **501**.

| Végpont | Állapot |
|---------|---------|
| `auth/[...nextauth]/route.ts` | GET/POST stub (NextAuth nincs bekötve). |
| `news`, `news/[id]` | Lista / elem stub. |
| `events`, `events/[id]` | Stub. |
| `gallery`, `gallery/[id]` | Stub. |
| `guides`, `guides/[id]` | Stub. |
| `office` | Stub. |
| `bookings`, `users`, `categories`, `audit` | Stub. |

### 4.3 Komponensek (`components/`)

A master spec **javasolt** fája szerint elsődlegesen `ui/`, `layout/`, `shared/` szerepel; a tényleges kódban a **modul UI** még a `components/<modul>/` alatt van (átmeneti elrendezés):

| Terület | Fájlok (fő szerep) |
|---------|---------------------|
| `layout/` | `Navbar`, `Footer`, `AppProvider`, `ModalHost`, `AdminLoginModal`, `ToastViewport`, `ScrollTopButton` |
| `ui/` | `Core` (PageShell, Card, SectionHeader…), `Icons`, `AdminModal` |
| `landing/` | `LandingHero`, `LandingNews` |
| `calendar/`, `calculator/`, `gallery/`, `guides/`, `about/`, `office/` | Modul szintű UI és mock admin viselkedés |
| `shared/` | Jelenleg `.gitkeep` (helyfoglaló a spec szerinti shared primitíveknek). |

### 4.4 `lib/` és `types/`

| Elem | Szerep |
|------|--------|
| `lib/content.ts` | Re-export + mock adatok (`landingCards`, `newsItems`, …); szövegek SSOT: `lib/i18n`. |
| `lib/landingDictionary.ts` | Landing szövegek HU/EN; `getLandingCopy`. |
| `lib/utils/not-implemented-response.ts` | API stub válasz. |
| `lib/auth`, `db`, `i18n`, `theme`, `audit`, `validation`, `search`, `storage`, `state` | Üres vagy `.gitkeep` – a spec szerinti rétegek **helyfoglalói**. |
| `types/index.ts` | `Lang`, `Theme`, `ToastItem`, naptár/kalkulátor típusok. |

### 4.5 `features/`

Modulonkénti mappa (`news`, `calendar`, …) – **előkészített** feature helyek (jelenleg főleg könyvtár szerkezet; a tényleges modul komponensek még `components/` alatt).

### 4.6 Egyéb gyökér elemek

| Elem | Megjegyzés |
|------|------------|
| `prisma/`, `styles/`, `tests/`, `public/` | Spec szerinti mappák; tartalom DB + API (régi `content/` mappa nincs). |
| `.github/workflows/ci.yml` | GitHub Actions: Node 22, `npm ci`, `lint`, `build`. |
| `.gitlab-ci.yml` | GitLab CI: azonos lépések, `node:22-alpine`. |

---

## 5. Alkalmazás működése (futásidejű workflow)

### 5.1 Kérés → oldal

1. A böngésző egy útvonalat kér (pl. `/calendar`).
2. A Next a megfelelő `app/(public)/calendar/page.tsx` (vagy más route) **Server/Client** komponensét rendereli a `app/layout.tsx` gyerekeként.
3. A layout **minden** nyilvános nézetre ráteszi a `Navbar`-t, `Footer`-t, globális providereket.

### 5.2 `AppProvider` (globális kliens állapot)

Fájl: `components/layout/AppProvider.tsx`.

| Állapot / API | Viselkedés |
|---------------|------------|
| `lang` (`hu` \| `en`) | `localStorage` kulcs: `v26-lang`; `toggleLang` vált. |
| `theme` (`light` \| `dark`) | `document.documentElement.dataset.theme`; `localStorage`: `v26-theme`. |
| `isAdmin` | Mock admin: `localStorage` `v26-admin`; bejelentkezés modal + nem valós auth. |
| `toast` / `toasts` | Rövid élettartamú üzenetek. |
| `modal` / `openModal` / `closeModal` | Egyszerű tartalmi modál (`ModalHost`). |
| `showAdminLogin`, `loginForm`, `submitAdminLogin` | Mock belépés: nem üres felhasználónév + jelszó → admin mód. |

**Fontos:** A master spec szerint a **valódi** jogosultság a **szerveren** dől el; jelenleg a demo **csak kliensoldali** flag.

### 5.3 Navigáció és landing

- **`Navbar`**: útvonalak között `Link`; szótár `lib/content.ts` → `t(lang).nav`. **Hírek** link: `/news`. Landing speciális viselkedés: kezdetben szűk vezérlősáv, a hírek blokk közelében teljes nav (lásd `Navbar.tsx` scroll logika).
- **Footer**: szerver komponens; belső navigációs `Link`-ek (nincs külső repó link a felületen). A GitHub URL a repó dokumentációjában van: [`repository.md`](./repository.md), [`README.md`](../README.md).
- **Landing kártyák**: `landingCards` a `content.ts`-ben (href-ek modulokhoz).

### 5.4 Modulok röviden

| Útvonal | Fő komponens / tartalom |
|---------|-------------------------|
| `/` | `LandingHero`, `LandingNews` |
| `/news` | Hír modul váz (`SectionHeader` + kártya) |
| `/calendar` | `CalendarModule` – nézetváltás, mock foglalás, admin panel jelleg |
| `/calculator` | `CalculatorModule` – szemeszterek, KKI/KI mock számítás |
| `/gallery` | `GalleryModule` – nézetek, admin demo |
| `/guides` | `GuidesModule` |
| `/about` | Statikus rich layout (`Card`, `SectionHeader`) |
| `/office` | Statikus office oldal + külön `OfficeModule` használata más kontextusban lehetséges |
| `/admin`, `/admin/users`, … | Admin váz oldalak |
| `/admin/office` | Belső office váz |

### 5.5 Stílus és téma

- Forrás: **`app/globals.css`** – `:root` és `html[data-theme='dark']` változók.
- Komponensek inline `style` vagy osztálynevek kombinációja a meglévő CSS-hez igazodva.

---

## 6. Fejlesztői munkafolyamat (end-to-end)

### 6.1 Első klónozás

```bash
git clone https://github.com/MrBombOn/mikhokweb.git
cd mikhokweb
npm ci
cp .env.example .env.local   # szükség szerint
```

### 6.2 Napi fejlesztés

1. **`git checkout -b feature/<rövid-leírás>`** (vagy a csapat ágpolitikája szerint).
2. **`npm run dev`** – http://localhost:3000
3. Módosítás után lokálisan: **`npm run lint`** és **`npm run build`** (a CI ugyanezt futtatja).
4. Commit üzenet: érthető, tagolt (lásd meglévő git stílus).
5. Push → **GitHub** és/vagy **GitLab** remote; PR/MR esetén a pipeline zöld legyen.

### 6.3 CI pipeline (mindkét platform)

| Lépés | GitHub Actions | GitLab CI |
|-------|----------------|-----------|
| Trigger | `push`/`pull_request` ágak: `main`, `master` | Pipeline push/merge szerint |
| Node | **22** | **22** (alpine image) |
| Parancsok | `npm ci` → `npm run lint` → `npm run build` | Ugyanaz |

### 6.4 Dokumentáció frissítési szokás (master spec §24)

- **Progress log:** lezárt lépés → rövid bejegyzés dátummal.
- **Decision log:** új bejegyzés a sablonnal (téma, alternatívák, döntés, indoklás, érintett fájlok).
- **Specifikáció / architektúra / RBAC / API / DB:** szakaszos bővítés, ne hagyjunk követhetetlen „V” verziós szórást a kötelező `docs/` alatt (a kötelező fájlnevek rögzítettek).

---

## 7. Változások krónikája

### 7.1 Git történet (rövidített, fontos commitok)

A repóban látható korai történet (időrendben felülről lefelé):

| Commit | Üzenet / tartalom (összefoglaló) |
|--------|----------------------------------|
| `8a53f72` | **CI + szerkezet + build javítások:** GitHub Actions (`ci.yml`) és GitLab CI; publikus oldalak áthelyezése `app/(public)/` alá; belső admin útvonalak `app/(internal)/admin/...`; új `/news`; API stub route-ok; `loading` / `error` / `not-found` / `sitemap`; `eslint.config.mjs`; `tailwind.config.ts`; `lib/utils/not-implemented-response`; feature és lib almappák `.gitkeep`; **ScrollTopButton**, **CalendarModule**, **GalleryModule**, **ModalHost** javítások; **Eltávolítva:** `weblap.md`, `run_weblap_snapshot.bat`, `make_weblap_snapshot_max_precision.ps1` (nagy törlés). |
| `7da2219` | Roadmap frissítés (fázis 0 git init jelölés) – *megjegyzés: a `roadmap.md` később a spec-takarítás részeként törölhető volt a `docs/` szűkítésekor*. |
| `435a253` | Progress log frissítés git init után. |
| `f29c740` | Kezdeti chore: git init, roadmap, workflow, repo higiénia – *a `workflow.md` szintén később törölhető a kötelező docs szűkítésekor*. |

### 7.2 Strukturális és dokumentációs események (repo állapot alapján)

1. **App Router route groupok:** `(public)` és `(internal)` bevezetése a master spec §23 szerinti elkülönítés követéséhez.
2. **API váz:** Minden felsorolt REST helyen stub, egységes 501 válasz.
3. **Globális Next fájlok:** `loading`, `error`, `not-found`, `sitemap` – jobb UX és SEO alap.
4. **ESLint flat:** `.eslintrc.json` helyett `eslint.config.mjs` + `@eslint/eslintrc`.
5. **`docs/` szűkítés:** Csak a master spec **§24** szerinti tíz fájl maradt; verziózott fejlesztői jegyzetek (`V*.md`), `roadmap.md`, `workflow.md` eltávolítva (nem kötelezőek a spec szerint).
6. **Nagy törlések a CI commit környékén:** `weblap.md` és snapshot scriptek – csökkent zaj, egyetlen kanonikus spec marad a gyökérben.

### 7.3 `package.json` evolúció (észlelhető irány)

- **Prisma client** és **Zod** megjelenése: adat és validáció réteg előkészítése; a tényleges Prisma séma és migrációk a további lépések részei.
- A pontos verziók mindig a aktuális `package.json` / lock fájlból olvasandók.

---

## 8. Ismert korlátok és adósságok

| Téma | Állapot |
|------|---------|
| Auth | Mock; nincs valós NextAuth / session a `app/api/auth/[...nextauth]` stub mögött. |
| API | 501; nincs perzisztens adatbázis integráció a UI mögött. |
| README | GitHub repó + workflow dokumentum linkelve; a törölt `docs/roadmap.md` típusú fájlokra már nem mutat. |
| `progress-log.md` / `decision-log.md` | Szövegben még hivatkozhatnak törölt `roadmap.md` / `workflow.md` útvonalakra – szöveg szinkronizálása javasolt. |
| Spec vs belső office útvonal | Master spec fája és a Next.js route szabályok közötti `/office` ütközés feloldva `/admin/office`-szal. |
| `features/` vs `components/` | Modul logika a spec szerint `features/`-be vándorolhat; jelenleg a UI nagy része `components/<modul>/`. |
| ESLint | `AppProvider` `useMemo` dependency figyelmeztetés – opcionális tisztítás. |

---

## 9. Következő logikus lépések (nem kötelező sorrend)

1. **Progress / decision log** szövegek szinkronja: ahol még `roadmap.md` / `workflow.md` szerepel, cserélhető élő linkekre vagy erre a dokumentumra.
2. **Prisma** `schema.prisma` + migrációk; API stubok fokozatos cseréje valós handlerekre.
3. **NextAuth** (vagy más session megoldás) bekötése a `auth/[...nextauth]` útvonalon.
4. **Modulok** áthelyezése `features/<modul>/` alá típusokkal, sémával, service réteggel (master spec §2.2, §2.3).
5. **`tailwind.config.ts`** tényleges integrációja, ha a csapat Tailwindre vált a tokenek mellé/ helyett.

---

## 10. Verzió és karbantartás

| Mező | Érték |
|------|--------|
| **Dokumentum** | `docs/DOCUMENTATION_PROJECT_WORKFLOW.md` (gyökér stub: `DOCUMENTATION_PROJECT_WORKFLOW.md`) |
| **Utolsó átfogó frissítés** | 2026-04-28 |
| **Struktúra (2026-05)** | Áthelyezve `docs/` alá; belső linkek a gyökérhez `../` relatív úttal. |
| **Karbantartó** | A projekt aktív fejlesztője / HÖK tech felelős |

Új nagyobb strukturális változáskor érdemes:

- ide **beemelni** egy rövid szakaszt a §7 krónikába,
- párhuzamosan a **`docs/progress-log.md`** és szükség esetén **`docs/decision-log.md`** bejegyzéseit frissíteni.

---

*Vége a dokumentumnak.*
