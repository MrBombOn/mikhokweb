# Teljes modul készültség és üzemeltetési átadás (2026-05-08)

Egy helyen: modulok, becsült készültség, módok szerinti jogosultság, ellenőrzési lépések, seed belépés, launcher-first workflow, lezárt fázisok (§8) és a következő érettségi sor (§12).

---

## Tartalomjegyzék

1. [Gyors összkép](#1-gyors-összkép)
2. [Módok és jogosultságok](#2-módok-és-jogosultságok)
3. [Modulonkénti készültség](#3-modulonkénti-készültség)
4. [Funkciótérkép (ki mit tud)](#4-funkciótérkép-ki-mit-tud)
5. [Ellenőrzés és smoke](#5-ellenőrzés-és-smoke)
6. [Seed belépés](#6-seed-belépés)
7. [Launcher-first workflow](#7-launcher-first-workflow)
8. [Lezárt fázisok 1–10 (§8)](#8-lezárt-fázisok-1–10)
9. [Plusz ötletek (§9)](#9-plusz-ötletek)
10. [Következő ciklus célja](#10-következő-ciklus-célja)
11. [Kapcsolódó dokumentumok](#11-kapcsolódó-dokumentumok)
12. [Fázisok 11–20 – érettség, éles](#12-fázisok-11–20–érettség-éles)

---

## 1. Gyors összkép

| Mutató | Érték | Megjegyzés |
|--------|--------|------------|
| Funkcionális készültség | **~98%** | Teljes körű használat; §8 fázis 1–10 lezárva |
| Production-ready | **~94%** | SMTP/titkok, retention worker, DR fájl stratégia, §12 részletek |
| Aktuális fókusz | | Upload pipeline / provider; retention worker; UX polish; **§12 Fázis 11** (boot-time env validáció); §3 / §9 backlog |

**Egy mondatban:** a rendszer élesíthető bázison áll; a „nice-to-have” és a **§12** további fázisai adják a maradék ütemet.

---

## 2. Módok és jogosultságok

| Mód | Tipikus szerep | Elérhető (röviden) | Nem / korlátozott |
|-----|----------------|--------------------|-------------------|
| **Publikus** | Látogató | Moduloldalak, keresés, feedback, booking kérés, téma/nyelv | Admin írás, védett mezők |
| **OFFICE** | Operátor | Tartalom írás (jogkörben), részleges admin, feedback workflow | Tiszta ADMIN-only (pl. teljes user management) |
| **ADMIN** | Rendszergazda | Teljes admin, bulk import, audit export, feature flag + canary %, dependency risk, Builder V2, értesítések | — |

**Publikus útvonalak (olvasás + nyilvános műveletek):** `/`, `/news`, `/calendar`, `/gallery`, `/guides`, `/about`, `/office`, `/search`, `/calculator`.

**ADMIN kiemeltek:** `/admin`, `/admin/site-builder`, `/admin/dependency-risk`; canary: `GET /api/admin/site-builder/canary`; dependency jelentés: `npm run ops:dependency-risk` → `.ops/dependency-risk-report.json`; audit export utáni riasztás: `lib/audit/export-alerts.ts`.

---

## 3. Modulonkénti készültség

A százalékok **mérnöki becslések** (implementáció + tesztek + üzemeltetési érettség).

| Modul / terület | % | Publikus | OFFICE / ADMIN | Nyitott / polish |
|-----------------|:-:|----------|----------------|------------------|
| News | 100 | Olvasás | CRUD, preview, revisió | — |
| Security | 96 | — | Session, RBAC, CSRF, rate limit, fejek | E2E cookie: `E2E_ALLOW_HTTP_COOKIES` |
| Feedback | 90 | Beküldés | Lista, CSV, webhook | Spam-score, saved filter preset |
| Admin ops | 95 | — | Audit, bulk import, saved views, permission matrix, dependency risk | Retention **automatikus worker**; extra riportok |
| Calendar + Booking | 92 | Naptár, foglalás | Események, jóváhagyás, email HU/EN, E2E | Recurring szerkesztés stratégia |
| Gallery + Guides | 78 | Lista / részletek | Feltöltés, thumbnail, bulk, PDF, link-health, revisió, `searchableText` | PDF szöveg index; galéria meta bulk |
| Calculator | 92 | Számítás, export | Import, formula version | Több formula párhuzamosan; compare UX |
| About + Office | 86 | Publikus mezők | Narratíva, tagok, office history | Auto open/closed logika |
| Reliability / test / obs. | 93 | — | Lint, test, E2E, contract, `x-request-id`, Sentry opció | Sentry release/source map; DR **fájl** offsite doc |
| Release / performance | 94 | — | Feature flags, LHCI, release checklist, smoke, retention UI | Retention worker; changelog rutina |
| Builder Studio V2 | 90 | `/custom/[slug]` | Drag-drop, HU/EN, queue, rollback, guardrails, templates | Élő preview; marketplace; „full IDE” polish |

Részletes viselkedés: lásd `docs/phased-master-plan.md`, `docs/progress-log.md` és a modul-specifikus `docs/modules/*.md` fájlokat.

---

## 4. Funkciótérkép (ki mit tud)

- **Publikus:** böngészés minden nyilvános modulban, keresés, feedback, tornaterem foglalás, kalkulátor, nyelv/téma.
- **OFFICE:** engedélyezett tartalom- és office-frissítés, feedback alap workflow, dashboard részletek.
- **ADMIN:** teljes dashboard, user/kategória (bulk), audit + CSV + saved views, feature flag + canary %, staff értesítések, command palette, onboarding, hír diff, dependency risk, Builder V2 + design.
- **Üzemeltető:** migráció/seed, `npm run lint` / `typecheck` / `test` / `build`, `npm run test:e2e`, ops scriptek (`ops:smoke-gate`, `ops:release-checklist`, `ops:backup-drill`, `ops:health-check`, `ops:dependency-risk`, `ops:generate-changelog`, `ops:audit-export-alerts`), CI (GitHub/GitLab), env: `scripts/prisma-env.cjs`, `.env.example`.

---

## 5. Ellenőrzés és smoke

### 5.1 Első indítás

1. `npm ci`  
2. `npm run db:migrate`  
3. `npm run db:seed`  
4. `npm run dev`  
5. Böngésző: `http://localhost:3000`

### 5.2 Kötelező smoke

| Terület | Teendő |
|---------|--------|
| Publikus | Betöltés: `/`, `/news`, `/calendar`, `/gallery`, `/guides`, `/about`, `/office`, `/search`, `/calculator` |
| Auth | Bejelentkezés, admin elérés |
| Admin | Legalább 1 create + 1 edit + 1 lista |
| Builder | Oldal létrehozás → publish → ellenőrzés `/custom/<slug>` |

### 5.3 Release előtt

`npm run lint` → `typecheck` → `test` → `build`; érdemes: `npm run test:e2e` (változó szerverkód előtt `build`; Playwright `globalSetup`: migrate + seed a `e2e/resolve-database-url.ts` szerinti `DATABASE_URL`-en).

**Megjegyzés:** lokális LHCI néha `NO_NAVSTART`; éles validáció Linux CI-n.

---

## 6. Seed belépés

| Szerep | Felhasználónév | Jelszó (alap seed) |
|--------|----------------|---------------------|
| ADMIN | `admin` | `admin-dev-change-me` |
| OFFICE | `office` | `office-dev-change-me` |

Felülírás env-ből: `SEED_ADMIN_USERNAME`, `SEED_ADMIN_PASSWORD`, `SEED_OFFICE_USERNAME`, `SEED_OFFICE_PASSWORD`.

Belépés után: `/admin`, Builder: `/admin/site-builder`.

---

## 7. Launcher-first workflow

**Windows (ajánlott):** `npm run start:dev:test` — `.env.local` ellenőrzés/másolás, `npm ci`, migrate, seed, `dev`. **Alternatíva:** `npm run start:dev:ps1`.

**Cél:** sikeres launcher után jellemzően **bugfix**, **design/spacing/typo/mobil**, kisebb **UX** tuning marad.

**Rövid napi rutin:** smoke (publikus + admin) → aktív hibák → branch → design pass → lint/test/typecheck/build.

---

## 8. Lezárt fázisok 1–10

A részletes pipák változatlanul érvényesek; itt csak a címek **áttekintéshez**.

| Fázis | Téma | Állapot |
|-------|------|--------|
| 1 | Booking lezárás (SMTP, email HU/EN, webhook, E2E) | Kész |
| 2 | Media pipeline alap (galéria upload, thumb, bulk, meta) | Kész |
| 3 | Guides (PDF preview, link-health, revisió, kereshetőség) | Kész |
| 4 | Monitoring / incidens (Sentry, `x-request-id`, alerting, runbook) | Kész |
| 5 | Backup/restore drill, recovery, health, kommunikációs sablonok | Kész |
| 6 | Release governance, retention admin, smoke gate, LHCI | Kész |
| 7 | Admin ops (bulk import, audit CSV, saved views, táblázat minta) | Kész |
| 8 | Product/UX (onboarding, command palette, hír diff, saved filters, notifications) | Kész |
| 9 | Builder Studio V2 (drag-drop, HU/EN, queue, rollback, guardrails, templates) | Kész |
| 10 | Engineering/ops (Playwright E2E, dependency risk, canary changelog, audit alerts) | Kész |

Fázisonkénti **[x] pipák** és dátumok: `docs/progress-log.md`, ütem összefoglaló: `docs/phased-master-plan.md`. Változáskor ezeket is szinkronban tartandó.

---

## 9. Plusz ötletek

További „production grade” javaslatok **§12 (Fázis 11–20)** alatt vannak összefűzve; kapcsolódik: health score, tartalomminőség, admin help, template marketplace, synthetic monitoring — részletek a `docs/phased-product-hardening-roadmap.md`-ben.

---

## 10. Következő ciklus célja

| Mutató | Jelenleg | Cél |
|--------|----------|-----|
| Funkcionális | ~98% | **99%+** (§3 nyitott részek, §9) |
| Production-ready | ~94% | **96%+** (SMTP/titkok, monitoring, retention worker, DR fájl, §12) |

Következő nagy egységek: **§12 Fázis 11** (kötelező env validáció induláskor), §3 modulok és §9 maradék tételei.

---

## 11. Kapcsolódó dokumentumok

- `docs/aktualis-keszultseg-es-hianytabla-2026-05-08.md`
- `docs/demo-es-lokal-teszteles-utmutato.md`
- `docs/teljes-uzemeltetesi-kezikonyv.md`
- `docs/phased-product-hardening-roadmap.md`
- `docs/progress-log.md`
- `docs/testing.md`
- `docs/auto-changelog.md`

---

## 12. Fázisok 11–20 – professzionális érettség, éles

A **§8** lefedi a jelen ütem nagy részét; az alábbi blokk **üzemeltetés, biztonság, teljesítmény, megfelelőség** irányú érettséget céloz. A pipák és a „Kimenet / Nyitott” sorok változatlan tartalmi szerződést adnak — részletes felsorolásokért lásd a hivatkozott docokat és a repo fájlokat.

### Fázis 11 – Éles környezet, titkok, konfiguráció

- Kötelező env validáció induláskor (Zod): `AUTH_SECRET`, `DATABASE_URL`, SMTP, Sentry, storage URL-k — fail fast, érthető hiba.
- Titkok: élesben ne csak `.env` fájl; host secret store / CI OIDC minta dokumentálva.
- Session / JWT audit (TTL, rotáció, `SameSite` / `Secure`).
- **Kimenet:** boot fail-fast + dokumentált secret lifecycle.

### Fázis 12 – Adatvédelem, megfelelőség, auditálhatóság

- [x] Belső GDPR export + törlés (`/admin/users`, privacy API-k; utolsó ADMIN védve).
- [x] Publikus `/privacy` + süti consent (`CookieConsentBar`).
- [x] Retention batch: `npm run ops:retention-prune` (`RETENTION_PRUNE_DRY_RUN`).
- [x] Doc: `privacy-and-gdpr.md`, `api.md`, `retention-settings.md`.
- **Nyitott:** jogi szöveg egyeztetés; vendég feedback automatikus export/törlés.
- **Kimenet:** műszaki adatkezelési összefoglaló + belső export/törlés + retention batch.

### Fázis 13 – Teljesítmény, skálázás, CDN

- [x] Irányelvek: `performance-scaling-cdn.md`.
- [x] `NEXT_PUBLIC_IMAGE_REMOTE_HOSTS` + `lib/remote-image-hosts.ts`.
- [x] Builder design CSS cache: `lib/site-design/layout-css.ts`.
- [x] LHCI: `/calendar`, `/privacy` stb. (`lighthouserc.cjs`).
- **Nyitott:** route-onkénti revalidate tábla; edge cache; S3 részletek §15 / `media-object-storage-dr.md`.
- **Kimenet:** performance budget + design cache + image host env.

### Fázis 14 – Keresés és feltárás

- [x] `SearchDocument` / `searchBlob`, rebuild: `npm run ops:rebuild-search-index`.
- [x] `GET /api/search` + facets; `SearchPageClient`.
- [x] Analytics: `SearchQueryStat`, `/admin/search-analytics`.
- [x] Opcionális: `GET /api/admin/search/similar?q=`.
- **Nyitott:** Postgres `tsvector` vagy külső motor; CTR / rangsor.
- **Kimenet:** központi keresés + belső analytics.

### Fázis 15 – Média és fájlok éles szinten

- [x] S3-kompatibilis tároló (`STORAGE_DRIVER=s3`); helyi `local`.
- [x] Presign PUT/GET; `media-object-storage-dr.md`, `api.md`.
- [x] Opcionális scan: `UPLOAD_SCAN_WEBHOOK_URL`; policy: `lib/media/upload-policy.ts`.
- [x] DR: `npm run ops:s3-upload-inventory` + doc.
- **Nyitott:** kliens PUT a galériában; privát bucket + proxy; AV szerződés szerint.
- **Kimenet:** éles fájl-pipeline + DR eszköz + env doc.

### Fázis 16 – Biztonság 3. kör

- [x] Edge rate limit: `middleware.ts`, `lib/security/edge-critical-post-limit.ts`.
- [x] `public/.well-known/security.txt`; disclosure, ASVS self-audit, supply chain, pen-test scope, SBOM, WAF rulebook.
- **Nyitott:** külső pen-test lezárt jegyzőkönyv + retest; WAF finomhangolás.
- **Kimenet:** kisebb támadási felület + auditálható security story.

### Fázis 17 – Megfigyelhetőség és SRE

- [x] SLI/SLO: `sli-slo-error-budget.md`.
- [x] Prod smoke: `e2e/production-public-smoke.spec.ts`, `test:e2e:prod-smoke`, GH workflow, `synthetic-monitoring.md`.
- [x] Publikus `/status`.
- **Nyitott:** külső status page; több régió; Sentry SLO dashboard.
- **Kimenet:** proaktív üzemeltetés.

### Fázis 18 – i18n, SEO, elérhetőség 2.0

- [x] Locale / hreflang / JSON-LD (`lib/seo.ts`, `PublicRouteJsonLd`, docok).
- [x] Builder `generateMetadata`, hír excerpt, kereső mélylink, LHCI `/about`, `/search`.
- [x] WCAG backlog: `wcag-phase18-backlog.md`, `a11y-audit.md`.
- **Nyitott:** külön `/en/...`; Event JSON-LD; axe CI.
- **Kimenet:** jobb organikus elérés + a11y útvonal.

### Fázis 19 – Integrációk és API-szerződés

- [x] `GET /api/v1/public/feed` + kulcs, rate limit; webhooks + iCal doc.
- [x] Integrations health UI + SMTP verify.
- **Nyitott:** webhook success perzisztencia; API v2; kulcs rotáció ütemezés.
- **Kimenet:** kiszámítható partner integráció.

### Fázis 20 – Katasztrófa, visszaállítás, BCP

- [x] RTO/RPO, DR gyakorlat, chaos egyszerűsített, go-live/go-back: `dr-bcp-phase20.md`; keresztlinkek: `recovery-checklist.md`, `go-live-checklist.md`.
- **Nyitott:** szervezeti RTO/RPO jóváhagyás; PITR ha RPO < 24h; prod chaos automatizálás.
- **Kimenet:** dokumentált üzmenfolytonossági bizalom.

**Szinkron:** §9 ötletek egy része ide került; tartsd egyben a `phased-product-hardening-roadmap.md` és a `progress-log.md` sorrendjével.
