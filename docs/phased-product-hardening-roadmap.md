# Fázisolt termék-hardening roadmap (v2)

Ez a dokumentum a jelenlegi állapotbecslésekre és a következő körös ötletekre épülő, végrehajtható roadmap.

## 0) Kiinduló állapot (összefoglaló)

- Teljes készültség: kb. `87%`
- Production-ready készültség: kb. `82–85%`
- Erős: funkciós lefedettség, adatmodell, admin alapok
- Közepes: i18n/SSOT konzisztencia, UX polish
- Fejlesztendő: tesztelés/monitoring/ops, security mélyítés

---

## 1) Kritikus probléma: Insta/Facebook feed duplikáció

Ha ugyanaz a hír megy ki mindkét csatornára, kell egy központi deduplikációs stratégia.

### Javasolt megoldás (3 lépés)

1. **Canonical key számítás**
   - A bejövő feed-elemekből számoljunk stabil kulcsot:
   - `sha256(normalized(title) + normalized(text) + date_bucket(+/-24h))`
   - plusz opcionális kulcsok: `externalUrl`, platform post ID.

2. **Dedupe tábla + time window**
   - Új tábla (pl. `NewsIngestFingerprint`):
     - `id`, `fingerprint`, `source`, `sourcePostId`, `firstSeenAt`, `newsId`
   - Egyedi index: `fingerprint`
   - Ingest közben:
     - ha van egyező fingerprint és friss időablakban van -> merge/skip
     - ha nincs -> új hír vagy meglévő frissítése szabály szerint

3. **Admin review policy**
   - Ütközésnél ne csendes törlés legyen:
   - jelölés: `possible_duplicate`
   - admin listában összevonás/eldobás gomb

### Elfogadási kritérium

- Ugyanaz a FB+IG tartalom legfeljebb egyszer jelenik meg nyilvánosan.
- Adminban látszik, ha dedupe miatt skip/merge történt.

---

## 2) Fázisok (végrehajtási sorrend)

## Fázis P1 – News/Feeed stabilizálás és dedupe

- Insta/Facebook dedupe (fingerprint + tábla + admin review)
- News revision history
- News slug + canonical URL
- News preview tokenes link
- News rich-text sanitization policy
- News image alt kötelezőség

**Kimenet:** duplikációmentes feed + auditálható news workflow.

## Fázis P2 – Security hardening 2. kör

- Session/cookie audit (flag-ek, expiry, rotáció)
- Brute-force mélyítés auth endpointokra
- XSS célzott payload tesztek kritikus mezőkre
- Security headers teljes körű felülvizsgálat
- Feedback anti-spam: IP+UA rate limit + CAPTCHA opció

**Kimenet:** éles környezethez közelítő security baseline.

## Fázis P3 – Feedback modul teljesítése

- Feedback admin lista
- státusz: új/folyamatban/lezárt
- hozzárendelés userhez
- CSV export
- modul szerinti keresés
- webhook/email értesítés
- opcionális spam-score

**Kimenet:** feedback már nem csak gyűjtés, hanem kezelhető backlog.

## Fázis P4 – Admin operációs fejlesztések

- Admin dashboard KPI widgetek
- audit advanced filterek
- permission matrix nézet
- user activity feed
- 2-step confirm veszélyes műveletekre
- táblák server-side lapozás/szűrés/rendezés
- bulk import (users/categories)

**Kimenet:** admin felület operátori szinten használható.

## Fázis P5 – Calendar/Booking élesítés

- iCal export + Google Calendar link
- ismétlődő események kezelése
- booking validáció szigorítás (idősáv/ütközés)
- booking email visszaigazolás
- auto-expire szabály
- booking admin státusz szűrők
- booking audit diff részletesítés

**Kimenet:** naptár és foglalás folyamatok üzemszerűen működnek.

## Fázis P6 – Guides/Gallery médiás bővítés

- Guides: fájlcsatolmány upload, PDF preview, full-text index, link checker
- Guides: verziózás + quality checklist
- Gallery: upload backend, thumbnail pipeline, bulk upload
- Gallery: folder CRUD, drag-drop rendezés, EXIF/meta, broken-link detector
- Gallery: role-based visibility

**Kimenet:** médiakezelés és tudásbázis teljes értékű tartalommodullá válik.

## Fázis P7 – Calculator domain mélyítés

- PDF/CSV export
- state migration helper
- import validáció javítás
- verziózott képletrendszer
- read-only share link
- compare mód + benchmark minták
- domain tesztek bővítése

**Kimenet:** kalkulátor hosszú távon stabil és ellenőrizhető.

## Fázis P8 – About/Office workflow kiteljesítése

- About: timeline, alumni szekció, képkezelés, social validáció, template rendszer
- About: aktív jelölések, publikációs dátumok, csoporton belüli sorrend
- Office: snapshot history, heti ütemező, nyitvatartás alapú automata státusz
- Office: public/internal mezőszétválasztás, értesítések, audit diff

**Kimenet:** szervezeti és irodai modulok teljes szerkesztési workflow-val működnek.

## Fázis P9 – Megbízhatóság, teszt és megfigyelhetőség

- E2E csomag Playwrighttal
- API contract tesztek
- CI pipeline bontás: lint / typecheck / test / build
- Sentry vagy hasonló monitoring
- structured log + correlation ID
- backup/restore drill automatizáció

**Kimenet:** incidens esetén gyors hibakeresés és reprodukálhatóság.

## Fázis P10 – Release governance és performance

- feature flag rendszer
- performance budget + Lighthouse gate CI-ben
- release checklist automatizált pipeline
- adatmegőrzési (retention) beállítások adminban

**Kimenet:** kontrollált, ismételhető release folyamat.

---

## 3) Prioritási rövidlista (ha kevés a kapacitás)

Először ezt a 12 tételt érdemes meglépni:

1. Feed dedupe (FB+IG)
2. News sanitization + revision history
3. Feedback admin lista + státusz
4. Security hardening 2. kör
5. Audit advanced filterek
6. Booking email + validáció
7. Guides upload + Gallery upload
8. E2E smoke csomag
9. API contract tesztek
10. Sentry/monitoring
11. Correlation ID logolás
12. Release checklist pipeline

---

## 4) Dokumentációs karbantartás szabály

Minden fázis végén frissítendő:

- `docs/progress-log.md`
- `docs/decision-log.md` (ha új döntés/eltérés van)
- `docs/api.md` (ha API szerződés változott)
- `docs/architecture.md` (ha modulhatár vagy adatáramlás változott)

