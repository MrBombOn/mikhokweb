# Dokumentációs Index (Végső)

**Gyors belépés:** [`docs/README.md`](./README.md) (strukturált hub + táblázat).

Ez a fájl a projekt összes elsődleges dokumentációjának gyűjtőpontja.

## Alapdokumentumok

- Specifikáció: `docs/specification.md`
- Architektúra: `docs/architecture.md`
- **Globális UI shell** (layout, provider, toast/modál, `data-expandable`, közös UI): [`docs/global-shell.md`](./global-shell.md)
- **Modulonkénti viselkedés + fájlok (Fázis 5, réteg C):** [`docs/modules/README.md`](./modules/README.md)
- **Biztonsági séta** (middleware, JWT, CSRF, rate limit — réteg D): [`docs/security-walkthrough.md`](./security-walkthrough.md)
- **Fázis 16 – disclosure, ASVS, supply chain, SBOM, WAF, pen-test scope:** [`docs/security-disclosure.md`](./security-disclosure.md), [`docs/security-asvs-self-audit.md`](./security-asvs-self-audit.md), [`docs/security-supply-chain.md`](./security-supply-chain.md) (`npm run ops:audit-report`, `npm run ops:sbom`), [`docs/security-waf-proxy-rulebook.md`](./security-waf-proxy-rulebook.md), [`docs/security-pen-test-scope.md`](./security-pen-test-scope.md), `public/.well-known/security.txt`
- **Mappa- és réteg-felépítés (aktuális repo):** [`docs/folder-structure.md`](./folder-structure.md) — domain index: [`features/README.md`](../features/README.md); migrált modul UI: [`components/modules/README.md`](../components/modules/README.md)
- API szerződés: `docs/api.md`
- Adatbázis és éles DB-first (Prisma, migráció, demo fallback, kalkulátor állapot): [`docs/database.md`](./database.md)
- RBAC és jogosultság: `docs/rbac.md`
- Tesztelés: `docs/testing.md`
- **ESLint CLI** (`next lint` helyett, Next 16 kompatibilitás): [`docs/eslint-cli-migration.md`](./eslint-cli-migration.md)

## Design és UX

- **Mobil / navbar smoke (Fázis 7):** [`docs/mobile-checklist.md`](./mobile-checklist.md)
- Design system: `docs/design-system.md`
- Design pack: `docs/design-pack.md`
- UI audit (D6): `docs/ui-audit-d6.md`
- A11y audit: `docs/a11y-audit.md`
- SEO audit: `docs/seo-audit.md`
- **Fázis 18 – hreflang / JSON-LD / Search Console:** [`docs/seo-hreflang-jsonld-phase18.md`](./seo-hreflang-jsonld-phase18.md); WCAG backlog: [`docs/wcag-phase18-backlog.md`](./wcag-phase18-backlog.md)
- **Fázis 19 – integrációk / partner read API / iCal szerződés:** [`docs/integrations-read-api-and-webhooks.md`](./integrations-read-api-and-webhooks.md) (`/api/v1/public/feed`, `/admin/integrations`)
- Lighthouse baseline (Fázis 10: `next/image`, `/about` + `/gallery` scope): [`docs/lighthouse-baseline.md`](./lighthouse-baseline.md)

## Folyamat és nyomon követés

- **Lokális demó + tesztelés (teljes körű indítás):** [`docs/demo-es-lokal-teszteles-utmutato.md`](./demo-es-lokal-teszteles-utmutato.md)
- **Készültségi dimenziók → fázisok 1–10:** [`docs/keszultseg-dimenzio-fazisok-1-10.md`](./keszultseg-dimenzio-fazisok-1-10.md)
- **Fázisolt mesterütemterv** (SSOT, DB, mobil, dokumentáció, mappa, **UX 11–15** — toast/i18n, custom select, validáció, szellősség, záró polish): [`docs/phased-master-plan.md`](./phased-master-plan.md)
- Roadmap és fázisok: `docs/design-and-ssot-phase-roadmap.md`
- Haladási napló: `docs/progress-log.md`
- Döntési napló: `docs/decision-log.md`
- Incidens és hibakövetés: `docs/incident-debug.md`
- Riasztási szabályok (log + health, első kör): `docs/alerting-rules.md`
- **Fázis 17 – SRE / szintetikus:** [`docs/sli-slo-error-budget.md`](./sli-slo-error-budget.md), [`docs/synthetic-monitoring.md`](./synthetic-monitoring.md) (`npm run test:e2e:prod-smoke`, GitHub `production-smoke.yml`, publikus `/status`)
- Backup / restore drill, recovery, ütemezett health, kommunikációs sablonok (Fázis 5): `docs/backup-restore-drill.md`, `docs/recovery-checklist.md`, `docs/scheduled-health-routine.md`, `docs/incident-communication-templates.md`
- **Fázis 20 – DR/BCP, go-back, kill switch:** [`docs/dr-bcp-phase20.md`](./dr-bcp-phase20.md) (RTO/RPO javaslat, éves gyakorlat, DB read-only chaos, rollback sorrend)
- **Fázis 1 (mesterütemterv) – inline TSX stílus kiírás:** [`docs/phased-master-plan.md`](./phased-master-plan.md) Fázis 1; publikus `/status` layout: `styles/modules/status-public.css`
- Release checklist pipeline + smoke gate (Fázis 6): `docs/release-checklist-pipeline.md`
- Retention admin beállítások (Fázis 6): `docs/retention-settings.md`
- Adatvédelem / GDPR / retention batch (Fázis 12): `docs/privacy-and-gdpr.md`
- Teljesítmény, Postgres, CDN, cache (Fázis 13): `docs/performance-scaling-cdn.md`
- Keresés, index, analytics (Fázis 14): [`docs/search-and-discovery.md`](./search-and-discovery.md)
- Média / S3 feltöltés, presigned URL, DR (Fázis 15): [`docs/media-object-storage-dr.md`](./media-object-storage-dr.md)
- **Első éles indulás (go-live):** [`docs/go-live-checklist.md`](./go-live-checklist.md) — társítva: [`docs/teljes-uzemeltetesi-kezikonyv.md`](./teljes-uzemeltetesi-kezikonyv.md) §9.0
- Repository és workflow: `docs/repository.md`, `docs/project-workflow.md`, `docs/DOCUMENTATION_PROJECT_WORKFLOW.md` (teljes munkafolyamat + krónika)

## Végső összefoglalók

- Frontend + backend végső állapot: `docs/final-frontend-backend-audit.md`
- Laikus kódmagyarázó: `docs/laikus-kodmagyarazo.md`
- Modul-fájl felelősségi térkép: `docs/module-file-responsibility-map.md`

## Megjegyzés

A gyökérben a `DOCUMENTATION_PROJECT_WORKFLOW.md` **csak rövid stub** (átirányítás); a teljes szöveg: `docs/DOCUMENTATION_PROJECT_WORKFLOW.md`. Egyéb aktív belépési pont: `docs/documentation-index.md`.

## Vázlat checklistek (nem SSOT)

- [`checklists/README.md`](./checklists/README.md) – történeti / személyes listák helye.
- [`checklists/befejezesi-hianylista-vazlat.md`](./checklists/befejezesi-hianylista-vazlat.md) – korai „100%” vázlat (a tényleges ütem: `phased-master-plan.md` + `progress-log.md`).
