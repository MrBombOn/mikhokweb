# PTE MIK HÖK Web – roadmap és munkaszabályok

**Hivatkozások:** gyökér [`PROJECT_MASTER_SPEC.md`](../PROJECT_MASTER_SPEC.md), fejlesztői napló: [`docs/progress-log.md`](progress-log.md), döntések: [`docs/decision-log.md`](decision-log.md), git: [`docs/workflow.md`](workflow.md).

**Cél:** a spec szerinti teljes stackű platformot **fázisokban**, áttekinthető PR-ekkel felépíteni; minden fázisnak legyen **elfogadási feltétele** és **dokumentáció-frissítés**.

---

## 1. Kötelező munkaszabályok (minden fázisra)

Ezek a **PROJECT_MASTER_SPEC.md §2, §18, §21, §26** és a jelen roadmap összefoglalója.

| # | Szabály | Gyakorlat |
|---|---------|-----------|
| R1 | **SSOT** | Szín, spacing, státusz, locale kulcs, validációs séma: egy központi hely (token fájl, `lib/i18n`, Zod sémák). Nem másolunk „majdnem ugyanazt” másik mappába. |
| R2 | **Route = kompozíció** | `app/**/page.tsx` és `layout.tsx`: csak layout + feature hívás. Domain logika, jogosultság, számítás: `features/<modul>/` vagy `lib/`. |
| R3 | **Biztonság szerveren** | Minden írás és érzékeny olvasás API-n / server action-ön keresztül, session + RBAC ellenőrzéssel. A UI csak rejteget, nem „dönt”. |
| R4 | **HU + EN** | Minden új felületi szöveg mindkét nyelven; kulcsok központi szótárból vagy i18n fájlból. |
| R5 | **Light + Dark** | Új komponens mindkét témában ellenőrizve (`data-theme`). |
| R6 | **Dokumentáció** | Fázis lezárásakor: `progress-log.md` bejegyzés; lényegi architektúra-/tech-döntés: `decision-log.md`. |
| R7 | **Sanity a fázis végén** | Rövid manuális check: build (`npm run build`), főbb útvonalak HU/EN, light/dark. |

**Kód review szempont:** a fenti szabályok sérelme nélkül merge-elhető-e; ha ideiglenesen sérti (tech debt), a PR-ban és a progress logban legyen jelölve + következő lépés.

---

## 2. Jelenlegi kiindulás (röviden)

- Next.js App Router, TypeScript, **statikus mock** adatok (`lib/content.ts`), kliens oldali „admin” jelleg.
- **Nincs** Prisma, **nincs** `app/api`, **nincs** valódi RBAC / session.
- UI modulok és landing nagyrészt megvannak prototípus szinten.

A roadmap **nem** a prototípus törlését jelenti először, hanem a **rétegek bevezetését**: adat → API → auth → modulonkénti bekötés.

---

## 3. Fázisok – mit építünk, milyen sorrendben

### Fázis 0 – Előkészület és egyeztetés (aktuális)

**Cél:** egy helyen rögzített szabályok, git/repo higiénia, közös nyelv a következő lépésekről.

**Teendők**

- [x] `.gitignore`, `.env.example`
- [x] `docs/roadmap.md`, `docs/workflow.md`, progress/decision log sablon
- [x] Lokális `git init` + első commit (remote URL-t mindenki a saját repójához adja – lásd `workflow.md`)
- [ ] CI minimál: `npm run lint` + `npm run build` (GitHub Actions vagy GitLab CI) – *következő konkrét PR*

**Elfogadás:** a fenti checklist a repóban látszik; a csapat tudja, melyik remote az elsődleges.

---

### Fázis 1 – Projekt bootstrap és SSOT alap

**Cél:** spec szerinti alapfüggőségek és központi tokenek/i18n váz, build stabil.

**Teendők**

- Függőségek: Prisma (vagy egyeztetett ORM), Zod, session/auth könyvtár (döntés: pl. Auth.js / custom – **decision log**).
- `prisma/schema.prisma` első váz (User, Role, vagy kezdetben csak User + role enum).
- Design tokenek: `globals.css` vagy `styles/tokens` + **ne** szórjunk szét új hexeket komponensekben.
- i18n: központi kulcsok (HU/EN); fokozatos migráció a hardcode szövegekről.

**Elfogadás:** `npm run build` zöld; dokumentálva: `docs/architecture.md` váz (1 oldal: rétegek, mappák).

---

### Fázis 2 – Layout, route csoportok, üres admin szegély

**Cél:** spec §23-hoz közelítő `app/(public)` / `app/(internal)` (vagy egyeztetett egyenértékű szerkezet).

**Teendők**

- Route group migráció minimális változással a publikus URL-eken.
- Üres vagy stub `app/(internal)/admin/...` layout (védett, később bekötve).

**Elfogadás:** URL-ek nem törnek; decision log: route szerkezet.

---

### Fázis 3 – Auth, session, RBAC (Guest / Office / Admin)

**Cél:** spec §6: szerveroldali session, szerepkör, jogosultság; mock „bármilyen jelszó admin” megszüntetése.

**Teendők**

- Bejelentkezés, kijelentkezés, védett layoutok.
- Permission helper szerveren; seed felhasználók devhez.

**Elfogadás:** `docs/rbac.md` rövid táblázat; érzékeny útvonalak szerveren elutasítják a guestet.

---

### Fázis 4 – API + első valódi modul (News)

**Cél:** egy modul végig: DB → API → UI; referencia a többi tartalommodulnak (spec §10).

**Teendők**

- News entitás + CRUD API + publikációs státuszok.
- `/news` oldal + landing integráció opcionális második körben.

**Elfogadás:** `docs/api.md` news végpontokkal; audit mezők vagy minimális audit log, ha a spec már követeli.

---

### Fázis 5 – Naptár és foglalás

**Cél:** spec §11: egy közös eseményforrás, három nézet, booking workflow szerveren.

**Elfogadás:** konfliktusjelzés viselkedés dokumentálva (`docs/calculator-rules.md` helyett naptárra: külön szekció vagy `docs/search-rules.md` / naptár appendix – döntés decision logban).

---

### Fázis 6 – KKI kalkulátor domain réteg

**Cél:** spec §12: számítások külön modulban, `docs/calculator-rules.md` képletekkel.

---

### Fázis 7 – Galéria, Guides, About, Office

**Cél:** modulonként ugyanaz a minta: API, jogosultság, HU/EN, Office szerkesztés ahol kell.

---

### Fázis 8 – Admin felület, kategóriák, keresés

**Cél:** spec §17–19; admin dashboard, users, categories, audit viewer.

---

### Fázis 9 – Hardening

**Cél:** spec §21–22: validáció, CSRF/session biztonság, mobil és a11y audit, tesztek ahol kritikus.

---

## 4. Hogyan állunk neki egy konkrét feladathoz

1. **Olvasd** a kapcsolódó spec §-t és e roadmap aktuális fázisát.
2. **Nyiss** kis PR-t (egy fókusz: pl. „csak Prisma + User modell”).
3. **Kövesd** R1–R7; route-ok vékonyak maradjanak.
4. **Frissítsd** `progress-log.md`; döntés esetén `decision-log.md`.
5. **Zárás előtt:** build + HU/EN + light/dark smoke.

---

## 5. A „kész” platform (master spec §27)

A roadmap akkor tekinthető lezártnak, ha a master spec §27 checklistje teljesül; addig a fázisok fölött iterálunk, és a technikai adósság explicit marad a logban.

---

*Utolsó frissítés: roadmap létrehozva a repó előkészítéseként.*
