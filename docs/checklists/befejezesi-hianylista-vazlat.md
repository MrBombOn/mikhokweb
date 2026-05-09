# Befejezési hiánylista (vázlat, archív)

> **Fontos:** korai jegyzet; a **tényleges** ütem és backlog: [`phased-master-plan.md`](../phased-master-plan.md), [`phased-product-hardening-roadmap.md`](../phased-product-hardening-roadmap.md), [`progress-log.md`](../progress-log.md). Sok alábbi tétel a kódban már megvalósult. *(Gyökér: korábban `bejefezes.md`.)*

Ez a lista a `docs/phased-product-hardening-roadmap.md` és a `docs/progress-log.md` bejegyzései alapján készült vázlatként.  
Cél: **production-ready + üzemeltethető + auditálható** állapot leírása.

## 1) Kritikus, meg nyitott elemek (P1–P5)

### P1 – News/Feed stabilizalas es dedupe
- [ ] FB/IG deduplikacio teljes workflow (fingerprint + tarolas + admin review merge/skip).
- [ ] News revision history (verziok visszakereshetoen).
- [ ] News slug + canonical URL teljes bevezetese.
- [ ] Tokenes preview link szerkesztoi nezethez.
- [ ] Rich-text sanitization policy formalizalasa es kenyszeritese.
- [ ] Kotelezo image alt ellenorzes publikacio elott.

### P2 – Security hardening 2. kor
- [ ] Session/cookie rotacios strategia + invalidation szabalyok (logout/all-session revoke).
- [ ] Brute-force vedelem tovabbi melyitese auth endpointokra.
- [ ] Celzott XSS payload smoke tesztek kritikus mezokre.
- [ ] Security header policy teljes felulvizsgalata (hianyok megszuntetese).
- [ ] Feedback anti-spam teljesites (IP+UA rate limit + CAPTCHA opcio).

### P3 – Feedback modul teljes workflow
- [ ] Feedback CSV export admin oldalon.
- [ ] Webhook/email ertesites uj vagy allapotvaltozas eseten.
- [ ] Opcionális spam-score logika.
- [ ] Kezelesi SLA/folyamat szabalyok dokumentalasa.

### P4 – Admin operacios fejlesztesek
- [ ] Permission matrix nezet veglegesitese.
- [ ] User activity feed teljesebb nezete.
- [ ] Veszelyes muveletek 2-step confirm kiterjesztese minden kritikus actionre.
- [ ] Server-side pagination/szures/rendezes admin tablaban altalanositva.
- [ ] Bulk import (users/categories) stabil workflow + rollback hibaag.

### P5 – Calendar/Booking elesites (meg hatralevo)
- [ ] Ismetlodo esemenyek kezelese.
- [ ] Booking email visszaigazolas (provider-ready, nem csak stub).
- [ ] Auto-expire szabaly idozitett takaritassal.
- [ ] Booking admin status-szurek vegleges UI/API.
- [ ] Booking audit diff reszletezese.

## 2) P6–P10 fazisok hatralevo resze

### P6 – Guides/Gallery medias bovites
- [ ] Guides fajlcsatolmany upload backend.
- [ ] Guides PDF preview.
- [ ] Guides full-text index.
- [ ] Guides verziozas + quality checklist.
- [ ] Gallery upload backend.
- [ ] Gallery thumbnail pipeline.
- [ ] Gallery bulk upload.
- [ ] Gallery folder CRUD.
- [ ] Gallery drag-drop rendezes.
- [ ] Gallery EXIF/meta kezeles.
- [ ] Gallery role-based visibility.

### P7 – Calculator domain melyites
- [ ] State migration helper (export/import schema evoluciohoz).
- [ ] Import validacio javitas + hibaturo parse.
- [ ] Verziozott kepletrendszer.
- [ ] Compare mod + benchmark mintak.
- [ ] Domain tesztek bovitese (edge case + regresszio csomag).
- [ ] PDF export jelenleg print-alapu; valodi, stabil export workflow veglegesitese.

### P8 – About/Office workflow kiteljesites
- [ ] About kepkezeles teljes workflow (upload/valida/kezeles).
- [ ] About social link validacio.
- [ ] About template rendszer.
- [ ] About aktiv jelolesek + publikacios datum mezok.
- [ ] About csoporton beluli sorrendezes finomhangolas.
- [ ] Office heti utemezo.
- [ ] Office nyitvatartas-alapu automata statusz.
- [ ] Office public/internal mezoszetvalasztas vegleges formaja.
- [ ] Office ertesitesek.
- [ ] Office audit diff reszletezes.

### P9 – Megbizhatosag, teszt, megfigyelhetoseg
- [ ] E2E smoke csomag Playwrighttal.
- [ ] Sentry/monitoring (vagy ekvivalens) bekotese.
- [ ] Structured logging + correlation ID request-szinten.
- [ ] Backup/restore drill automatizalasa.
- [ ] Incident runbook tovabbi konkretizalasa monitorozasi jelekkel.

### P10 – Release governance es performance
- [ ] Lighthouse performance budget + CI gate.
- [ ] Release checklist automatizalt pipeline.
- [ ] Retention (adatmegorzes) beallitasok admin UI/API.
- [ ] Feature flag rendszer v1 megvan; rollout policy, naming standard es kill-switch runbook veglegesitendo.

## 3) Minosegi kilepesi kriteriumok (100% definicio)

- [ ] Minden fenti tétel kesz + ellenorizve.
- [ ] `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build` stabilan zold.
- [ ] E2E smoke minimum publikus + admin kritikus flow-kon zold.
- [ ] Security smoke (auth, XSS, CSRF, rate-limit) dokumentaltan sikeres.
- [ ] Monitoring + alerting + incident response legalabb alapszinten uzemben.
- [ ] Release folyamat reprodukalhato (pipeline + checklist).
- [ ] Dokumentacio friss: `progress-log`, `decision-log`, `api`, `architecture`.

## 4) Javasolt vegso sorrend (gyors 100%-hoz)

1. P1 dedupe + P2 security lyukak zarasa  
2. P5 booking elesites befejezese  
3. P6 media upload + thumbnail pipeline  
4. P9 observability + E2E  
5. P10 Lighthouse gate + release checklist + retention  
