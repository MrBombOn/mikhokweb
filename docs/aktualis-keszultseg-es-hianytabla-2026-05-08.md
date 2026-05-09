# Aktuális készültség és hiánytábla (2026-05-08)

Ez a dokumentum az aktuális fejlesztési állapot gyors, döntéstámogató összefoglalója:
- **hány százalékon áll a weboldal**, 
- **mi hiányzik még**, 
- és ez **fázisokra bontva** hogyan néz ki.

---

## 1) Összesített készültség (becslés)

- **Teljes funkcionális készültség:** **~93%**
- **Production-ready készültség:** **~88%**

Rövid indoklás:
- A fő modulok (News, Calendar/Booking, Guides, Gallery, About, Office, Admin, Calculator) működnek.
- P1–P10 mindenhol van kézzelfogható implementáció.
- A nyitott tételek már főleg **operációs/élesítési mélységi** elemek (release governance, monitoring, email/provider integráció, bulk/import/saved views, upload pipeline mélyítés).

---

## 2) Mi hiányzik még röviden

### Kritikus / éles indulás előtt erősen ajánlott
- **P5:** valódi booking e-mail visszaigazolás (SMTP/provider).
- **P6:** tényleges media upload + thumbnail pipeline + bulk upload stabil verzió.
- **P9:** Sentry (vagy ekvivalens) monitorozás + incident runbook bővítés.
- **P10:** release checklist pipeline automatizálás és retention admin beállítás.

### Fontos, de nem feltétlen blocker
- **P3:** spam-score jelzés feedbackhez.
- **P4:** bulk import (`users`, `categories`) + audit export/saved views.
- **P8:** Office automata státusz (open/closed/by-appointment) heti ütemezésből.

### Nice-to-have / következő iteráció
- P6/P8 UX finomítások (social validáció, template-ek, meta workflow).
- P9 további request-scope logolás minden kritikus admin írási route-ra.

---

## 3) Fázisonkénti készültség és nyitott tételek

## P1 – News/feed stabilizálás
- **Készültség:** **100%**
- **Kész:** dedupe fingerprint, revision, slug/canonical, preview token, sanitization, alt-kötelezőség.
- **Nyitott:** nincs kritikus.

## P2 – Security hardening 2. kör
- **Készültség:** **95%**
- **Kész:** session/cookie hardening, brute-force védelem, XSS validációk, security headerek, feedback anti-spam + turnstile opció.
- **Nyitott:** per-route mélyebb security observability finomhangolás (részben P9-ben).

## P3 – Feedback workflow
- **Készültség:** **90%**
- **Kész:** admin lista, státusz, assignee, belső note, CSV export, webhook notifier.
- **Nyitott:** spam-score / prioritásjelzés, export mezők finom i18n és preset-szűrők.

## P4 – Admin operáció
- **Készültség:** **82%**
- **Kész:** audit advanced filter + pagination, permission matrix, user activity, 2-step confirm.
- **Nyitott:** bulk import (`users/categories`), audit export, saved views, egységesített táblás pattern minden admin listára.

## P5 – Calendar/Booking élesítés
- **Készültség:** **84%**
- **Kész:** validációk, conflict check, auto-expire, webhook értesítés, ismétlődő esemény create, státusz-szűrő.
- **Nyitott:** valódi email visszaigazolás, recurring edit stratégia (series/single), booking admin API-oldali oldalazás.

## P6 – Guides/Gallery media bővítés
- **Készültség:** **70%**
- **Kész:** link checkerek, gallery folder CRUD, admin kezelések alapja.
- **Nyitott:** upload backend, thumbnail pipeline, bulk upload, EXIF/meta pipeline, guides attachment teljes workflow (preview/index/versioning/checklist).

## P7 – Calculator domain mélyítés
- **Készültség:** **92%**
- **Kész:** PDF/CSV export, migration helper, import validáció, formula version, read-only share, benchmark compare, domain tesztek bővítés.
- **Nyitott:** több formula-verzió párhuzamos támogatás (ha szabályváltozás jön), compare delta UX.

## P8 – About/Office kiteljesítés
- **Készültség:** **86%**
- **Kész:** timeline/alumni, Office history, publikáció dátum + alumni jelölés, heti ütem + belső/public mező-szétválasztás alap.
- **Nyitott:** automata Office státusz (nyitva/zárva), About social/link validáció és template workflow mélyítés.

## P9 – Megbízhatóság / teszt / observability
- **Készültség:** **90%**
- **Kész:** API contract tesztek, CI bontás (lint/typecheck/test/build), structured log + correlation ID, Sentry opcionális bekötés, kritikus írások request-scope log, backup/restore drill (`ops:backup-drill`) + scheduled health (`ops:health-check`), recovery checklist + kommunikációs sablonok.
- **Nyitott:** Sentry source map / release train finomhangolás; uploads offsite backup stratégia a host szerint.

## P10 – Release governance / performance
- **Készültség:** **92%**
- **Kész:** feature flag rendszer + admin UI, LHCI küszöbök (`error`) véglegesítve, release checklist pipeline gate (`ops:release-checklist`), post-deploy smoke gate (`ops:smoke-gate`), retention admin beállítások (`/admin/retention` + `RetentionConfig`).
- **Nyitott:** retention cleanup worker (automatikus purge), release note/changelog automatizálás finomítása.

---

## 4) Javasolt lezárási sorrend (rövid)

1. **P5 email + P6 upload pipeline** (éles működés legnagyobb gyakorlati érték).
2. **P9 monitorozás (Sentry) + incident runbook mélyítés**.
3. **P10 release checklist + retention**.
4. **P4 bulk import + audit export/saved views**.
5. **P3 spam-score és UX finomítások**.

---

## 5) Megjegyzés

A százalékok **mérnöki becslések** a jelenlegi implementált funkciók, teszt/CI állapot és üzemeltetési érettség alapján.  
Formális go-live döntéshez javasolt egy rövid UAT + staging checklist kör.

