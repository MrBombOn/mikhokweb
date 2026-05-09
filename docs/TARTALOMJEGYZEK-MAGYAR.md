# Teljes magyar tartalomjegyzék és dokumentációs térkép

Ez a fájl a **`docs/`** mappa összes jelentős leírását **magyar címmel**, **tagolt szerkezetben** és **rövid tartalmi összefoglalóval** indexeli. A technikai fájlnevek többsége angol maradt (történeti linkek, kereshetőség); a **PDF export** magyar fájlneveket használ (`npm run docs:pdf`, lásd [`export/README.md`](./export/README.md)).

**Gyors belépés (angol fájlnevek):** [`README.md`](./README.md) · [`documentation-index.md`](./documentation-index.md) · [`folder-structure.md`](./folder-structure.md)

---

## Hogyan dolgozz ezzel az indexszel

1. **Új fejlesztő:** olvasd a *Bevezető* és *Architektúra* szakaszokat, majd a neked releváns *modul* vagy *biztonság* fejezetet.
2. **Üzemeltető / élesítés:** *Üzemeltetés, élesítés, visszaállítás* + *Megfigyelhetőség* + *DR/BCP*.
3. **Termék / PM:** *Roadmap és készültség* + *Minőség és audit* + *Modul átadás*.
4. **PDF:** minden alábbi forrás `.md` fájlhoz generálhatsz külön `.pdf`-et egy paranccsal; a fájlnevek magyarul a `scripts/docs/pdf-title-overrides.json` szerint állnak elő.

---

## 1. Bevezető, navigáció, munkafolyamat

| Magyar megnevezés | Fájl | Mit tartalmaz |
|-------------------|------|----------------|
| Dokumentáció hub (angol, rövid linkek) | [`README.md`](./README.md) | A `docs/` belépő: táblázatos gyorslinkek a spechez, API-hoz, modulokhoz, átadási doksihez. |
| Teljes dokumentációs index (angol, részletes lista) | [`documentation-index.md`](./documentation-index.md) | A repo összes elsődleges docjának linkgyűjteménye témakör szerint (design, teszt, release, stb.). |
| Mappa- és réteg-felépítés (kanonikus) | [`folder-structure.md`](./folder-structure.md) | Hol van az `app/`, `features/`, `components/`, `lib/`, `styles/`; route group szabályok; CSS import sorrend; migrációs javaslatok. |
| Git / repository rövid útmutató | [`repository.md`](./repository.md) | Klónozás, ágak, alapvető contrib-infó. |
| Projekt workflow (rövid) | [`project-workflow.md`](./project-workflow.md) | Agilis / PR / review elvek; hivatkozás a hosszú workflow-dokumentumra. |
| Projekt workflow és krónika (teljes) | [`DOCUMENTATION_PROJECT_WORKFLOW.md`](./DOCUMENTATION_PROJECT_WORKFLOW.md) | Operatív munkafolyamat, eszközök, CI, strukturális változások története; nem helyettesíti a `PROJECT_MASTER_SPEC.md`-t. |
| Kanonikus spec belépő | [`specification.md`](./specification.md) | Rövid átirányítás és összefoglaló: a gyökér **`PROJECT_MASTER_SPEC.md`** a termék és műszaki szerződés fő forrása. |

---

## 2. Architektúra, adat, API, jogosultság

| Magyar megnevezés | Fájl | Mit tartalmaz |
|-------------------|------|----------------|
| Rendszerarchitektúra | [`architecture.md`](./architecture.md) | Next.js App Router, feature-first modulok, rétegek (publikus / admin / API), SSOT elvek. |
| Adatbázis és Prisma | [`database.md`](./database.md) | Séma, migráció, seed, demo fallback, kalkulátor állapot tárolás, éles DB-first javaslatok. |
| HTTP API szerződés | [`api.md`](./api.md) | Végpontok, metódusok, válaszformák, hibakódok, admin és publikus API-k összefoglalója. |
| RBAC és szerepkörök | [`rbac.md`](./rbac.md) | Guest / OFFICE / ADMIN jogkörök, szerveroldali ellenőrzés, tipikus tiltások. |
| Globális UI shell | [`global-shell.md`](./global-shell.md) | Gyökér layout, `AppProvider`, navbar, toast, modál, `data-expandable`, közös minták. |
| Modul ↔ fájl felelősségi térkép | [`module-file-responsibility-map.md`](./module-file-responsibility-map.md) | Melyik forrás melyik útvonalért és API-ért felel (nagyobb refaktor előtt kötelező olvasmány). |

---

## 3. Roadmap, fázisok, készültség, átadás

| Magyar megnevezés | Fájl | Mit tartalmaz |
|-------------------|------|----------------|
| Fázisolt mesterütemterv (SSOT) | [`phased-master-plan.md`](./phased-master-plan.md) | Fázisok A–E, mobil, doksi, UX, lezárt és nyitott tételek; a projekt ütemének fő táblázata. |
| Product hardening roadmap | [`phased-product-hardening-roadmap.md`](./phased-product-hardening-roadmap.md) | Érettségi és keményítési irányok a master spec mellett. |
| Design és SSOT fázis roadmap | [`design-and-ssot-phase-roadmap.md`](./design-and-ssot-phase-roadmap.md) | Design rendszer és SSOT fejlesztések fázisolt nézete. |
| Készültségi dimenziók ↔ fázisok 1–10 | [`keszultseg-dimenzio-fazisok-1-10.md`](./keszultseg-dimenzio-fazisok-1-10.md) | Mely dimenzió (biztonság, média, stb.) mely fázishoz kötődik. |
| Aktuális készültség és hiánytábla | [`aktualis-keszultseg-es-hianytabla-2026-05-08.md`](./aktualis-keszultseg-es-hianytabla-2026-05-08.md) | Pillanatkép dátumozott hiányokról és kész állapotról. |
| Modul készültség és üzemeltetési átadás | [`teljes-modul-keszultseg-es-uzemeltetesi-atadas-2026-05-08.md`](./teljes-modul-keszultseg-es-uzemeltetesi-atadas-2026-05-08.md) | Modulonkénti %, módok (publikus/OFFICE/ADMIN), smoke lista, seed, launcher, fázis 11–20 összefoglaló. |
| Teljes minőségi audit | [`teljes-minosegi-audit-2026-05-08.md`](./teljes-minosegi-audit-2026-05-08.md) | Minőségdimenziók átfogó auditja (dátumozott). |
| Frontend + backend végső audit | [`final-frontend-backend-audit.md`](./final-frontend-backend-audit.md) | Átfogó technikai állapotfelmérés. |

---

## 4. Publikus modulok (viselkedés, útvonal, API)

A részletes modul-leírások a [`modules/README.md`](./modules/README.md) alatt indulnak; minden modul egy fájl ≈ egy felület.

| Modul (magyar) | Fájl | Mit tartalmaz |
|----------------|------|----------------|
| Modulok index | [`modules/README.md`](./modules/README.md) | Táblázat: modul ↔ doc fájl; réteg C (dokumentáció) SSOT. |
| Rólunk | [`modules/about.md`](./modules/about.md) | `/about`, tagok, narratíva, kép, OFFICE szerkesztés, API hivatkozások. |
| Hírek | [`modules/news.md`](./modules/news.md) | Lista, slug, preview, admin folyamat, dedupe említés. |
| Naptár (UI + foglalások) | [`modules/calendar.md`](./modules/calendar.md) | Publikus naptár és foglalási folyamat, kapcsolódó API-k. |
| Naptári események (domain) | [`modules/events.md`](./modules/events.md) | Esemény domain, `ics`, admin CRUD. |
| Galéria | [`modules/gallery.md`](./modules/gallery.md) | Mappák, feltöltés, thumbnail, LCP / `next/image` (Fázis 10). |
| Útmutatók | [`modules/guides.md`](./modules/guides.md) | Dokumentumok, PDF, link-health, revisiók. |
| Iroda | [`modules/office.md`](./modules/office.md) | Nyitvatartás, history, publikus vs belső mezők. |
| Kalkulátor | [`modules/calculator.md`](./modules/calculator.md) | KKI/KI, import/export, formula verzió. |
| Keresés | [`modules/search.md`](./modules/search.md) | Globális kereső oldal, index, analytics hivatkozás. |
| Adatvédelem oldal | [`modules/privacy.md`](./modules/privacy.md) | `/privacy`, HU/EN, süti sáv kapcsolat. |
| Publikus állapot | [`modules/status.md`](./modules/status.md) | `/status`, health integráció (nem külső status page). |

---

## 5. Design, UX, mobil, Lighthouse, a11y, SEO

| Magyar megnevezés | Fájl | Mit tartalmaz |
|-------------------|------|----------------|
| Design rendszer és tokenek | [`design-system.md`](./design-system.md) | `design-tokens.css`, radius, árnyék, motion, topbar változók; kötelező olvasmány UI munkához. |
| Design pack export | [`design-pack.md`](./design-pack.md) | Brand assetek, export útvonalak a `public/brand` felé. |
| Kalkulátor üzleti szabályok | [`calculator-rules.md`](./calculator-rules.md) | Számítási szabályok, KKI/KI definíciók dokumentálva. |
| Mobil és navbar checklist | [`mobile-checklist.md`](./mobile-checklist.md) | Érintési célok, keskeny kijelző, Fázis 7 smoke lista. |
| Lighthouse és LCP baseline | [`lighthouse-baseline.md`](./lighthouse-baseline.md) | LHCI útvonalak, küszöbök, CI, Fázis 10 DoD. |
| Akadálymentesség audit | [`a11y-audit.md`](./a11y-audit.md) | A11y megállapítások és javítási irányok. |
| WCAG 2.2 backlog (Fázis 18) | [`wcag-phase18-backlog.md`](./wcag-phase18-backlog.md) | Kézi audit tételek, kapcsolódás az a11y docokhoz. |
| SEO audit | [`seo-audit.md`](./seo-audit.md) | Meta, kanonikus URL, alap SEO ellenőrzőlista. |
| SEO hreflang és JSON-LD | [`seo-hreflang-jsonld-phase18.md`](./seo-hreflang-jsonld-phase18.md) | Fázis 18: `hreflang`, structured data, Search Console rutina. |
| UI audit (D6) | [`ui-audit-d6.md`](./ui-audit-d6.md) | Felületi követelmények és audit jegyzetek. |

---

## 6. Biztonság (séta, disclosure, ASVS, supply chain, WAF, pen-test)

| Magyar megnevezés | Fájl | Mit tartalmaz |
|-------------------|------|----------------|
| Biztonsági séta (réteg D) | [`security-walkthrough.md`](./security-walkthrough.md) | Middleware, session, CSRF, rate limit, fejek — operátori szintű végigvezetés. |
| Disclosure és security.txt | [`security-disclosure.md`](./security-disclosure.md) | Felelős közlés, `public/.well-known/security.txt`. |
| OWASP ASVS önellenőrzés | [`security-asvs-self-audit.md`](./security-asvs-self-audit.md) | ASVS checklist rövidített projekt nézetben. |
| Supply chain és audit export | [`security-supply-chain.md`](./security-supply-chain.md) | `npm audit`, SBOM, CI artefaktok. |
| Pen-test scope sablon | [`security-pen-test-scope.md`](./security-pen-test-scope.md) | Külső tesztelés scope és várható evidenciák. |
| WAF / reverse proxy szabálykönyv | [`security-waf-proxy-rulebook.md`](./security-waf-proxy-rulebook.md) | Nginx példa, CDN, edge limit táblázattal összhang. |
| Biztonsági audit összefoglaló | [`security-audit.md`](./security-audit.md) | Átfogó biztonsági állapot összkép. |

---

## 7. Keresés és tartalomfeltárás

| Magyar megnevezés | Fájl | Mit tartalmaz |
|-------------------|------|----------------|
| Keresési szabályok (spec kereszthivatkozás) | [`search-rules.md`](./search-rules.md) | Modulonkénti szűrés és közös alapok hivatkozása a master spechez. |
| Központi keresés és index | [`search-and-discovery.md`](./search-and-discovery.md) | `SearchDocument`, rebuild script, publikus API, admin analytics (Fázis 14). |

---

## 8. Média, tároló, teljesítmény, skálázás

| Magyar megnevezés | Fájl | Mit tartalmaz |
|-------------------|------|----------------|
| Objektumtár, S3, presign, DR | [`media-object-storage-dr.md`](./media-object-storage-dr.md) | `STORAGE_DRIVER`, presigned PUT/GET, inventory script, visszaállítási próba. |
| Teljesítmény, Postgres, CDN | [`performance-scaling-cdn.md`](./performance-scaling-cdn.md) | Indexelés, pool, cache, `next/image` hostok, Builder design cache (Fázis 13). |

---

## 9. Üzemeltetés, élesítés, incidens, backup, release, DR

| Magyar megnevezés | Fájl | Mit tartalmaz |
|-------------------|------|----------------|
| Teljes üzemeltetési kézikönyv | [`teljes-uzemeltetesi-kezikonyv.md`](./teljes-uzemeltetesi-kezikonyv.md) | Környezetek, deploy, naplók, hibaelhárítás — nagy összefoglaló. |
| Lokális demó és tesztelés | [`demo-es-lokal-teszteles-utmutato.md`](./demo-es-lokal-teszteles-utmutato.md) | Lépésről lépésre indítás, env, seed, tipikus hibák. |
| Riasztási szabályok | [`alerting-rules.md`](./alerting-rules.md) | Health, log események, Sentry javaslatok. |
| Incidens debug runbook | [`incident-debug.md`](./incident-debug.md) | `requestId`, Sentry, logok gyűjtése éles hiba közben. |
| Incidens kommunikációs sablonok | [`incident-communication-templates.md`](./incident-communication-templates.md) | Szövegminták stakeholdereknek. |
| Backup / restore drill | [`backup-restore-drill.md`](./backup-restore-drill.md) | `npm run ops:backup-drill`, elvárt lépések, CI. |
| Recovery checklist | [`recovery-checklist.md`](./recovery-checklist.md) | Visszaállítás sorrendje. |
| Ütemezett health rutin | [`scheduled-health-routine.md`](./scheduled-health-routine.md) | `ops:health-check` és ütemezés javaslat. |
| Release checklist pipeline | [`release-checklist-pipeline.md`](./release-checklist-pipeline.md) | `ops:release-checklist`, gate-ek, changelog. |
| Go-live checklist | [`go-live-checklist.md`](./go-live-checklist.md) | Első éles indulás lépései. |
| DR / BCP (Fázis 20) | [`dr-bcp-phase20.md`](./dr-bcp-phase20.md) | RTO/RPO, chaos gyakorlat, go-back, kill switch táblázat. |
| Szintetikus monitoring | [`synthetic-monitoring.md`](./synthetic-monitoring.md) | Production smoke Playwright, GitHub workflow, `/status`. |
| SLI / SLO és error budget | [`sli-slo-error-budget.md`](./sli-slo-error-budget.md) | Döntési keret a rendelkezésre álláshoz és hibákhoz. |
| Auto-changelog | [`auto-changelog.md`](./auto-changelog.md) | `ops:generate-changelog` használata. |
| Retention beállítások | [`retention-settings.md`](./retention-settings.md) | Admin UI, API, `ops:retention-prune` száraz futás. |
| Adatvédelem és GDPR összefoglaló | [`privacy-and-gdpr.md`](./privacy-and-gdpr.md) | Belső export/törlés, publikus tájékoztató, jogi egyeztetés hiányok. |
| Integrációk és partner read API | [`integrations-read-api-and-webhooks.md`](./integrations-read-api-and-webhooks.md) | `GET /api/v1/public/feed`, kulcs, rate limit, iCal szerződés, admin health panel. |
| ESLint CLI migráció | [`eslint-cli-migration.md`](./eslint-cli-migration.md) | `eslint .` vs `next lint`, Next 16 kompatibilitás. |
| Tesztelés (unit + E2E) | [`testing.md`](./testing.md) | `npm run test`, Playwright, CI jobok, adatbázis URL E2E-hez. |

---

## 10. Naplók és laikus anyagok

| Magyar megnevezés | Fájl | Mit tartalmaz |
|-------------------|------|----------------|
| Haladási napló | [`progress-log.md`](./progress-log.md) | Dátumozott változások, fázis lezárások — történeti SSOT. |
| Döntési napló | [`decision-log.md`](./decision-log.md) | Architekturális és folyamat döntések rögzítve. |
| Laikus kódmagyarázó | [`laikus-kodmagyarazo.md`](./laikus-kodmagyarazo.md) | Nem fejlesztőknek magyarázott fogalmak és linkek. |

---

## 11. Vázlat checklistek (nem kanonikus ütemterv)

| Magyar megnevezés | Fájl | Mit tartalmaz |
|-------------------|------|----------------|
| Checklist mappa magyarázat | [`checklists/README.md`](./checklists/README.md) | Miért vannak külön a vázlatok a phased-master től. |
| Befejezési hiánylista (vázlat) | [`checklists/befejezesi-hianylista-vazlat.md`](./checklists/befejezesi-hianylista-vazlat.md) | Korai P1–P10 jegyzet; a tényleges állapot a progress-log és phased-master szerint. |

---

## PDF export (minden Markdownhoz külön fájl)

1. Telepítés: a repo már tartalmazza a **`md-to-pdf`** csomagot (`devDependency`).
2. Futtatás: **`npm run docs:pdf`**
3. Kimenet: **`docs/export/pdf/`** — fájlnevek magyar slugokkal a `scripts/docs/pdf-title-overrides.json` alapján; a mappa **nincs** a gitben (`.gitignore`).
4. Részletek és hibakeresés: [`export/README.md`](./export/README.md)

Az automatikusan generált **`_INDEX.md`** a PDF mappában felsorolja, melyik forrás `.md` melyik `.pdf`-et kapta.

---

*Utolsó szerkesztés célja: egy helyen magyar nyelvű navigáció és tartalomleírás; a műszaki fájlnevek változatlanok maradtak a stabil linkek miatt.*
