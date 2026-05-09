# PTE MIK HÖK Web – Teljes üzemeltetési kézikönyv

Ez a dokumentum a teljes rendszer működését foglalja össze:
- modulonkénti működés,
- indítási és leállítási folyamat,
- napi üzemeltetés,
- incidenskezelés,
- szervezeti működési modell.

---

## 1. Rendszerkép röviden

A webplatform két fő részből áll:
- **Frontend**: publikus oldalak + admin felületek megjelenítése.
- **Backend**: API route-ok, adatbázis, hitelesítés, jogosultság, audit.

Fő technológia:
- Next.js App Router + TypeScript
- Prisma ORM + SQLite (dev), PostgreSQL-kompatibilis séma
- JWT session cookie
- Feature-first domain szolgáltatások (`features/*/server.ts`)

---

## 2. Moduljegyzék (minden működő modul)

### 2.1 Publikus modulok

1. **Landing / főoldal**
   - Hero, navigációs kártyák, modul-bevezetők.
   - A fő belépési pont a felhasználóknak.

2. **News (Hírek)**
   - Lista, szűrés, kategóriázás, forrás-jelölés.
   - Admin/office módban létrehozás, szerkesztés, archiválás/törlés.

3. **Calendar + Gym Booking**
   - Eseménynaptár, nézetek, dátumközpontú lista.
   - Tornaterem foglalási igény leadás és admin státuszkezelés.

4. **Calculator (KKI/KI)**
   - Félévek, tárgyak, súlyozott átlag és index számítás.
   - Lokális mentés + jogosult felhasználónál szerveres szinkron.

5. **Gallery**
   - Mappák, galériaelemek, időrendi és mappa alapú áttekintés.
   - Admin oldalon CRUD jellegű tartalomkezelés.

6. **Guides (Útmutatók)**
   - Kategorizált tudásanyag, dokumentum hivatkozásokkal.
   - Admin oldalon tartalomkezelési workflow.

7. **About**
   - Szervezeti bemutató blokkok + taglisták.
   - Narratív blokkok és szerepkörkártyák kezelése.

8. **Office**
   - Nyitvatartás, bent lévők, ügyintézési státusz, szolgáltatások.
   - Publikus státuszkommunikáció + office/admin frissítés.

9. **Search + Feedback**
   - Több modulból aggregált keresés.
   - Publikus hibajelzés/visszajelzés rate limit védelemmel.

### 2.2 Belső/admin modulok

1. **Admin dashboard**
2. **Felhasználókezelés (users)**
3. **Kategóriakezelés (categories)**
4. **Tartalomkezelő gyorsműveletek (content)**
5. **Audit napló (audit)**
6. **Admin office oldal**

### 2.3 Rendszer-szintű UI modulok

- `not-found.tsx`
- `error.tsx`
- `global-error.tsx`
- `loading.tsx`
- Toast, modal, navbar, footer, page shell
- Custom űrlapelemek (`input`, `select`, `textarea`) mobilbarát szabályokkal

---

## 3. Indítás (start-up) – nulláról működő rendszerig

## 3.1 Előfeltételek

- Node.js LTS
- npm
- `.env.local` a `.env.example` alapján
- Kötelező env kulcsok:
  - `DATABASE_URL`
  - `AUTH_SECRET`

## 3.2 Telepítés és inicializálás

1. `npm ci`
2. `npm run db:migrate`
3. `npm run db:seed`
4. `npm run dev`

## 3.3 Első technikai ellenőrzés

1. Frontend elérhető
2. Bejelentkezés működik (`admin` / `office`)
3. API health endpoint válaszol (`/api/health`)
4. Admin route jogosultság működik

## 3.4 Build előtti minőségkapu

1. `npm run lint`
2. `npm run test`
3. `npm run build`

---

## 4. Rendszer működése modulonként (üzemi logika)

## 4.1 News

- Adatforrás: API + feature service.
- Publikus olvasás: csak publikált tartalom.
- Írási művelet: office/admin jogosultsággal.
- Minden kritikus módosítás auditálható.

## 4.2 Calendar + Booking

- Események és foglalási igények külön domain.
- Foglalási kérés publikus, feldolgozás admin oldali.
- Ütközés kommunikáció UI-ban.

## 4.3 Calculator

- Számítás kliens oldalon determinisztikus képletekkel.
- Szerver oldali mentés szerepkörhöz kötött.
- Export funkció a tanulmányi áttekintéshez.

## 4.4 Gallery

- Mappa + elem struktúra.
- Soft-delete szemlélet.
- Admin oldali tartaloméletciklus.

## 4.5 Guides

- Tartalom + meta + dokumentum link.
- Kereshető és szűrhető nézet.
- Admin oldali gondozás.

## 4.6 About

- Narratív blokkok és tagság külön adatmodellel.
- Nyilvános szervezeti transzparencia.

## 4.7 Office

- Státusz-first vizuális hierarchia.
- Operatív információk gyors frissíthetősége.

## 4.8 Search + Feedback

- Több modulból egységes találati modell.
- Feedback végpont validációval és rate limit védelemmel.

---

## 5. Leállítás (shutdown) és biztonságos karbantartási mód

## 5.1 Tervezett leállítás

1. Új admin tartalomműveletek ideiglenes tiltása (kommunikáció + üzemeltetői döntés)
2. Folyamatban lévő tartalom-módosítások lezárása
3. Alkalmazás leállítása
4. DB backup
5. Frissítés / migráció
6. Rendszer visszaindítás
7. Smoke teszt

## 5.2 Vészleállítás

1. Hibás komponens izolálása
2. Szükség esetén write endpoint ideiglenes tiltása
3. Incident log és időbélyeg rögzítés
4. Rollback vagy hotfix döntés

---

## 6. Napi üzemeltetés

## 6.1 Daily checks

- API health státusz
- Bejelentkezés és session ellenőrzés
- Friss tartalom betöltése (news/events/gallery)
- Admin alapfunkciók működése

## 6.2 Heti checks

- Audit log mintavételes ellenőrzés
- Rate limit események áttekintése
- Hibalogok vizsgálata (JSON `event` mező; `requestId` / `x-request-id` koreláció kritikus írásoknál; részletek: `docs/incident-debug.md`, riasztási minták: `docs/alerting-rules.md`)
- Opcionális: `npm run ops:health-check` ütemezve (lásd `docs/scheduled-health-routine.md`); backup drill: `docs/backup-restore-drill.md`
- Sentry (ha aktív DSN): új issue trend és release regresszió
- Biztonsági és jogosultsági gyorsellenőrzés

## 6.3 Havi checks

- Függőségfrissítési terv
- Backup visszaállítás-próba
- Minőségkapu teljes futtatás
- Dokumentációfrissítés

---

## 7. Incidenskezelés (runbook szemlélet)

## 7.1 Incidens osztályok

- **P1**: teljes szolgáltatás kiesés / auth összeomlás / adatvesztési kockázat
- **P2**: kritikus modul kiesés (pl. booking vagy admin CRUD)
- **P3**: részleges funkcióhiba, kerülőúttal használható
- **P4**: kisebb UI/UX hiba

## 7.2 Reagálási célidők

- P1: azonnali
- P2: 1 órán belüli reakció
- P3: munkanapon belül
- P4: backlog/priorizálás alapján

## 7.3 Incidens folyamat

1. Észlelés
2. Priorizálás
3. Felelős kijelölés
4. Mitigáció
5. Végleges javítás
6. Postmortem + dokumentálás

---

## 8. Biztonság és compliance működés

- Szerveroldali auth és RBAC döntés
- CSRF védelem írási endpointokon
- Input validáció (Zod)
- Audit naplózás kritikus műveleteknél
- Rate limit (login és feedback)
- Publikus és belső útvonalak elválasztása middleware-rel

---

## 9. Kiadási modell (release operation)

### 9.0 Go-live (első éles indulás)

Az **első produkciós domainre** lépéshez (DNS, TLS, backup, monitoring, jogi oldalak, lábléc, deploy nap) részletes, szerepkörökre bontott lista: **[`docs/go-live-checklist.md`](./go-live-checklist.md)** — a [`phased-master-plan.md`](./phased-master-plan.md) **Fázis 8** kimenete; DoD és kapcsolódó linkek a checklist elején / végén. A napi / ismétlődő kiadások továbbra is az alábbi §9.1 szerint zajlanak.

## 9.1 Release checklist

1. Fejlesztői ellenőrzés
2. `lint + test + build`
3. Dokumentáció frissítés (`progress-log`, `decision-log`, üzemeltetési leírás)
4. Deploy
5. Post-deploy smoke test

## 9.2 Rollback alapelv

- Minden release-hez rollback terv kötelező.
- Adatbázis-migrációknál külön rollback stratégia szükséges.
- Incidens esetén a legkisebb hatású visszaállítást kell preferálni.

---

## 10. Teljes üzemeltetéshez szükséges szervezeti felépítés

## 10.1 Javasolt szervezeti modell

1. **Product Owner / Szakmai felelős**
   - Funkcionális prioritások, modulok üzleti iránya.

2. **Tech Lead / Rendszerfelelős**
   - Architektúra, kódminőség, release jóváhagyás.

3. **Frontend felelős**
   - UI konzisztencia, reszponzivitás, a11y, design rendszer.

4. **Backend felelős**
   - API, adatmodell, auth, biztonság, teljesítmény.

5. **DevOps/Üzemeltetési felelős**
   - Pipeline, deploy, monitoring, backup, incidensfolyamat.

6. **Tartalomfelelős (Office)**
   - Hírek, útmutatók, office adatok, nyilvános kommunikáció.

7. **QA felelős**
   - Regression check, release smoke tesztek, hibák visszaellenőrzése.

8. **Security kontakt**
   - Jogosultság, naplózás, védelem és kockázatkezelés felügyelete.

## 10.2 RACI röviden

- **Accountable**: Tech Lead
- **Responsible**: fejlesztői és üzemeltetői szerepkörök modulonként
- **Consulted**: Product + Security + Office
- **Informed**: teljes szervezeti stakeholder kör

## 10.3 Működési ritmus

- Napi: gyors státusz + incidens check
- Heti: release/quality review
- Havi: architektúra és biztonsági review
- Negyedéves: roadmap és kapacitás újratervezés

---

## 11. Dokumentációs struktúra (hol mit találsz)

- Belépési pont: `docs/documentation-index.md`
- Architektúra: `docs/architecture.md`
- API: `docs/api.md`
- Biztonság: `docs/security-audit.md`
- Tesztelés: `docs/testing.md`
- Üzemeltetési incidens: `docs/incident-debug.md`
- Első éles indulás: `docs/go-live-checklist.md`
- Végső audit: `docs/final-frontend-backend-audit.md`
- Laikus magyarázó: `docs/laikus-kodmagyarazo.md`

---

## 12. Záró megjegyzés

Ez a kézikönyv a teljes rendszer üzemeltetéséhez készült. A modulok bővülésekor kötelező frissíteni:
- a moduljegyzéket,
- az indítás/leállítás részt,
- az incidens- és szervezeti működési fejezeteket.
