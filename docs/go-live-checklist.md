# Go-live checklist – első éles indulás (PTE MIK HÖK Web)

Ez a lista a `docs/phased-master-plan.md` **Fázis 8** kimenete: az **első produkciós** publikálás előtti nem-funkcionális teendők, **felelős szerepkörökkel**. A napi release folyamat továbbra is a [`teljes-uzemeltetesi-kezikonyv.md`](./teljes-uzemeltetesi-kezikonyv.md) §9.1 szerint.

**DR / rollback / kill switch egy oldalon (§12 Fázis 20):** [`dr-bcp-phase20.md`](./dr-bcp-phase20.md).

**DoD (Fázis 8 lezárás — mit tekintünk „kész”-nek):** az alábbi **§1–10** táblázatok releváns sorai az **első produkciós** go-live előtt kipipálva (vagy szándékos kivétel rögzítve PO/TL jóváhagyással); jogi / DNS / titok változás esetén `docs/progress-log.md` és szükség szerint `docs/decision-log.md` bejegyzés.

**Szerepkörök (rövidítés):** **PO** = Product Owner / szakmai felelős; **TL** = Tech Lead; **DO** = DevOps / üzemeltetés; **SEC** = security kontakt; **OF** = office / tartalom; **QA** = minőségbiztosítás. Részletesebb modell: üzemeltetési kézikönyv §10.

---

## 1. Domain és DNS

| # | Feladat | Megjegyzés | Felelős | Állapot |
|---|---------|------------|---------|---------|
| 1.1 | Végleges **produkciós hostname** rögzítése (pl. `www.…` vs apex). | CNAME / A rekordok dokumentálva. | PO + DO | [ ] |
| 1.2 | DNS **A / AAAA** vagy **CNAME** a hosting felé; TTL éles előtt tudatosan választva. | Staging külön aldomain javasolt. | DO | [ ] |
| 1.3 | **E-mail** (SPF, DKIM, DMARC) ha a doménről küldtek levelet. | Opcionális a tiszta webhez. | DO | [ ] |

---

## 2. TLS és HTTPS

| # | Feladat | Megjegyzés | Felelős | Állapot |
|---|---------|------------|---------|---------|
| 2.1 | Tanúsítvány **automatikus megújítás** (pl. ACME) ellenőrzése. | Staging + prod. | DO | [ ] |
| 2.2 | **HTTP → HTTPS** átirányítás; mixed content nincs. | Böngésző DevTools → Security. | TL / DO | [ ] |
| 2.3 | **HSTS** (opcionális, de ajánlott) és megfelelő `max-age` politika. | Csak stabil HTTPS után. | SEC + DO | [ ] |

---

## 3. Hosting, build, környezeti változók

| # | Feladat | Megjegyzés | Felelős | Állapot |
|---|---------|------------|---------|---------|
| 3.1 | **Node LTS** verzió egyeztetése a CI-vel (lásd `.github/workflows`, `.gitlab-ci.yml`). | `engines` a `package.json`-ban, ha kötelező. | TL | [ ] |
| 3.2 | Produkciós **build**: `npm run lint`, `npm run test`, `npm run build` zöld a merge előtt. | Fázis 0 DoD; `lint` = ESLint CLI — [`eslint-cli-migration.md`](./eslint-cli-migration.md) (Fázis 9). | TL + QA | [ ] |
| 3.3 | **`.env` / titkok** csak a hosting titoktárában; `AUTH_SECRET` erős és **nem** commitolt. | Lásd még [`database.md`](./database.md) éles szekció. | TL + SEC | [ ] |
| 3.4 | `DATABASE_URL` **PostgreSQL** éles példány; `prisma migrate deploy` folyamat dokumentálva. | CI / deploy lépésben. | DO + TL | [ ] |
| 3.5 | **Demo fallback** élesben: `ALLOW_DEMO_FALLBACK` alapértelmezés szerint **ki**, csak tudatos opt-in. | [`database.md`](./database.md). | TL + PO | [ ] |

---

## 4. Backup, helyreállítás

| # | Feladat | Megjegyzés | Felelős | Állapot |
|---|---------|------------|---------|---------|
| 4.1 | **Automatikus DB backup** ütemezés (napi minimum javasolt). | Retenció + titkosítás. | DO | [ ] |
| 4.2 | **Restore próba** nem éles időben (DR drill): üres példányra visszaállítás + `migrate` állapot ellenőrzése. | Automatizált SQLite drill: `npm run ops:backup-drill`; részletek: [`docs/backup-restore-drill.md`](./backup-restore-drill.md), lezárás: [`docs/recovery-checklist.md`](./recovery-checklist.md). | DO + TL | [ ] |
| 4.3 | Alkalmazás- és **logarchívum** megőrzési idő (compliance). | Szervezeti szabály. | PO + DO | [ ] |

---

## 5. Megfigyelhetőség, incidens

| # | Feladat | Megjegyzés | Felelős | Állapot |
|---|---------|------------|---------|---------|
| 5.1 | **`/api/health`** (vagy egyenértékű) külső uptime check alatt. | 200-as válasz, kritikus függőségek opcionálisan. Opcionális ütemezett Playwright: [`synthetic-monitoring.md`](./synthetic-monitoring.md). Emberi összefoglaló: `/status`. | DO | [ ] |
| 5.2 | Alkalmazás- és **szerver naplók** elérhetősége; kereshetőség hiba esetén. | Platformfüggő. | DO | [ ] |
| 5.3 | **Riasztási csatorna** (e-mail / chat) és ügyeletes felelős. | [`incident-debug.md`](./incident-debug.md). | TL + DO | [ ] |

---

## 6. Analytics (opcionális)

| # | Feladat | Megjegyzés | Felelős | Állapot |
|---|---------|------------|---------|---------|
| 6.1 | Szükség esetén **cookie / beleegyezés** (GDPR / ePrivacy) jogi egyeztetés. | Csak mérőkód előtt. | PO + SEC | [ ] |
| 6.2 | Eszköz kiválasztása (pl. Matomo self-host vs harmadik fél); **IP anonimizálás** beállítása. | Adatvédelmi tájékoztató frissítése. | OF + SEC | [ ] |

---

## 7. Jogi és impresszum (tartalom + lábléc)

| # | Feladat | Megjegyzés | Felelős | Állapot |
|---|---------|------------|---------|---------|
| 7.1 | **Impresszum** (cím, elérhetőség, felelős kiadó) szöveg jóváhagyása. | Jogi egyeztetés az intézménnyel. | PO + OF | [ ] |
| 7.2 | **Adatkezelési tájékoztató** (auth, naplózás, űrlapok, analytics). | [`security-audit.md`](./security-audit.md), [`rbac.md`](./rbac.md) áttekintés. | SEC + OF | [ ] |
| 7.3 | **Lábléc linkek** a fenti oldalakra (`Footer.tsx` vagy külön route-ok). | Jelenleg a lábléc csak modul-linkeket tartalmaz; éles előtt érdemes kiegészíteni. | TL + OF | [ ] |

---

## 8. Tartalom és SEO (pre-launch)

| # | Feladat | Megjegyzés | Felelős | Állapot |
|---|---------|------------|---------|---------|
| 8.1 | Főoldal / modulok **meta** (title, description) éles szöveggel. | [`seo-audit.md`](./seo-audit.md). | OF + QA | [ ] |
| 8.2 | `robots.txt` / `sitemap.xml` éles **base URL**-lel ellenőrizve. | Next route-ok. | TL | [ ] |
| 8.3 | **Mobil smoke** (navbar, menü): [`mobile-checklist.md`](./mobile-checklist.md). | 320–768 px. | QA | [ ] |

---

## 9. Hozzáférés és üzemeltetés után

| # | Feladat | Megjegyzés | Felelős | Állapot |
|---|---------|------------|---------|---------|
| 9.1 | **Admin** felhasználók listája; jelszópolitika; kilépés / szerepváltás folyamat. | Seed nem éles adat. | TL + SEC | [ ] |
| 9.2 | **Kulcsrotáció** naptár (`AUTH_SECRET`, DB jelszó, API kulcsok). | Negyedéves minimum javaslat. | SEC | [ ] |
| 9.3 | Dokumentáció **SSOT** linkek frissek: [`documentation-index.md`](./documentation-index.md). | PR merge után. | TL | [ ] |

---

## 10. Deploy nap és utána

| # | Feladat | Megjegyzés | Felelős | Állapot |
|---|---------|------------|---------|---------|
| 10.1 | **Deploy ablak** és kommunikáció a stakeholderek felé. | PO | [ ] |
| 10.2 | Migráció futtatása; **post-deploy smoke**: főoldal, bejelentkezés, egy admin és egy publikus CRUD útvonal. | Üzemeltetési kézikönyv §9.1. | DO + QA | [ ] |
| 10.3 | **Rollback** út ismertetése a csapatnak (kód + DB külön stratégia). | Kézikönyv §9.2. | TL | [ ] |

---

## Kapcsolódó dokumentumok

- Üzemeltetési kézikönyv (modulok, release, szervezet): [`teljes-uzemeltetesi-kezikonyv.md`](./teljes-uzemeltetesi-kezikonyv.md)
- Éles adatbázis és demo policy: [`database.md`](./database.md)
- Biztonság: [`security-audit.md`](./security-audit.md), [`security-walkthrough.md`](./security-walkthrough.md)
- **Süti sáv + privacy route + globális shell:** [`global-shell.md`](./global-shell.md), modul leírás: [`modules/privacy.md`](./modules/privacy.md), adatvédelmi réteg: [`privacy-and-gdpr.md`](./privacy-and-gdpr.md)
- Helyreállítás / kommunikáció: [`recovery-checklist.md`](./recovery-checklist.md), [`incident-communication-templates.md`](./incident-communication-templates.md)
- Lokális / demó indítás: [`demo-es-lokal-teszteles-utmutato.md`](./demo-es-lokal-teszteles-utmutato.md)
