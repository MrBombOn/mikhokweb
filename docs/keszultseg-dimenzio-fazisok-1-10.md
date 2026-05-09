# Készültségi dimenziók → fázisok 1–10

Ez a dokumentum az előző **dimenziónkénti készültség** összefoglalót bontja **végrehajtható, számozott fázisokra** (1–10). Nem helyettesí a [`phased-master-plan.md`](./phased-master-plan.md) részletes technikai fázisait; **összekapcsolja** a „hol tartunk” témákat egy ütemezhető sorrenddel. *(A mesterütemtervben a **Fázis 11–15** külön UX / i18n / validáció / szellősség sprintek — itt nem dimenzió-számozva.)*

**Alapelv:** minden fázis végén érdemes: `npm run lint` + `npm run test` + `npm run build` zöld, rövid bejegyzés a [`progress-log.md`](./progress-log.md)-ben; döntés esetén [`decision-log.md`](./decision-log.md).

---

## Fázis 1 – Funkció: modul- és API-rések lezárása

**Dimenzió:** modulok + DB + API maradék része.

**Cél:** a master specben már jelölt, de még hiányzó **üzleti/funkcionális** tételek (pl. Office teljes szerkesztő UI, esemény PATCH a modulból, kategória-híd a `Category` modell és a szabad szöveges mezők között, fájlfeltöltés pipeline ha kötelező).

**Kimenet:** a „demóban látszik, de még nincs kész” funkciók listája üresedik vagy explicit „később / nem scope” döntésre kerül.

---

## Fázis 2 – Kiberbiztonság (második kör)

**Dimenzió:** kiberbiztonság nyitott tételei.

**Cél:** a [`security-audit.md`](./security-audit.md) szerinti következő kör: per-route rate limit stratégia (nem csak login), audit bővítés a maradék írásokra (pl. nyilvános `POST /api/bookings`, opcionális feedback), session / anomaly jegyzés, restore workflow igény szerint, CSRF stratégia dokumentált mérlegelése.

**Kimenet:** frissített security audit + csökkenő „nyitott tétel” lista.

---

## Fázis 3 – SSOT: i18n + CSS maradék

**Dimenzió:** i18n + inline / `globals.css` karbantarthatóság.

**Cél:** maradék `style={{…}}` és fix HU/EN szöveg kiiktatása a legláthatóbb helyeken (`SearchPageClient`, admin oldalak, `LandingNews`); további `styles/modules/*.css` partialok (pl. nav-shell) ahol a duplikáció nagy.

**Kimenet:** a [`phased-master-plan.md`](./phased-master-plan.md) **Fázis 1–2** céljai gyakorlatban lezárva vagy mérhetően csökkenve.

---

## Fázis 4 – Design rendszer és §32 „szépség” / egység

**Dimenzió:** design / szépséghibák / §32 részletek.

**Cél:** design tokenek és komponens-szerződés **vizuálisan** egységes minden fő modulon; brand zónák finomhangolása; [`design-and-ssot-phase-roadmap.md`](./design-and-ssot-phase-roadmap.md) D1 maradék (pl. top inline komponensek) lezárása ahol még nyitott.

**Kimenet:** stakeholder vagy belső „UI proof” + friss design / UI audit jegyzet.

---

## Fázis 5 – Mobil nézet + a11y

**Dimenzió:** mobil + akadálymentesség.

**Cél:** a phased terv **Fázis 7** irányába: navbar / mobil menü **egyesített** CSS és viselkedés; fókusz-trap, Escape, 320–768px checklist ([`a11y-audit.md`](./a11y-audit.md) nyitott pontok); opcionális `docs/mobile-checklist.md`.

**Kimenet:** lefuttatott mobil checklist + a11y audit frissítés.

---

## Fázis 6 – Mappastruktúra és feature-first kiterjesztés

**Dimenzió:** mappa- és felelősség-struktúra.

**Cél:** a [`folder-structure.md`](./folder-structure.md) szerinti konvenciók betartása új kódnál; meglévő moduloknál `features/<modul>/` kiterjesztése ahol még nincs; vékony `app/(public)/**/page.tsx`; opcionálisan `docs/global-shell.md` (globális shell SSOT) – a [`phased-master-plan.md`](./phased-master-plan.md) **Fázis 3–4** összhangja.

**Kimenet:** legalább egy újabb modul „news mintájú” feature mappával + dokumentált minta.

---

## Fázis 7 – Dokumentáció mélység (réteg C–D)

**Dimenzió:** dokumentáció teljes spektrumon túl a „core”-on.

**Cél:** `docs/modules/*.md` modulonkénti viselkedés; kritikus auth/csrf útvonalak **rövid security walkthrough** (a phased terv **Fázis 5**); API példák és edge case-ek ahol hiányos.

**Kimenet:** kereshető modul-doksik + csökkenő „csak a fejben létező” tudás.

---

## Fázis 8 – Production-érettség (adat + viselkedés)

**Dimenzió:** éles üzem / DB-first / dev fallback.

**Cél:** a phased terv **Fázis 6**: PostgreSQL / `DATABASE_URL` stratégia; `NODE_ENV=production` alatt demo fallback **kikapcsolva** vagy explicit flag; `prisma migrate deploy` CI/éles lépés; kalkulátor `localStorage` vs szerver döntés dokumentálva.

**Kimenet:** frissített [`database.md`](./database.md) + éles go-live előtti checklist.

---

## Fázis 9 – Minőség, teljesítmény, teszt bővítés

**Dimenzió:** átfogó minőség (részben a korábbi dimenziók visszaellenőrzése).

**Cél:** API contract tesztek (opcionális); E2E (ha a spec §29 előírja); Lighthouse / teljesítmény **rögzített** eredmény; [`testing.md`](./testing.md) és SEO/perf jegyzetek szinkronban.

**Kimenet:** mérhető baseline + növekvő automata lefedés.

---

## Fázis 10 – Záró audit és üzemeltetés

**Dimenzió:** összkép + üzemeltetés + elfogadás.

**Cél:** [`teljes-uzemeltetesi-kezikonyv.md`](./teljes-uzemeltetesi-kezikonyv.md) / incident / backup / monitoring egyeztetése a tényleges hosttal; végleges **go-live** döntés a [`decision-log.md`](./decision-log.md)-ben; maradék „nice to have” külön backlogba.

**Kimenet:** „éles indulás” vagy „még N hét” explicit döntés + zárt progress bejegyzés.

---

## Dimenzió → fázis táblázat (áttekintés)

| Korábbi dimenzió | Elsősorban e fázis(ok) |
|------------------|-------------------------|
| Modulok + DB + API | **1** |
| Kiberbiztonság | **2** |
| SSOT i18n + CSS | **3** |
| Design / §32 / szépség | **4** |
| Mobil + a11y | **5** |
| Mappastruktúra / feature-first | **6** |
| Dokumentáció mélység | **7** |
| Production | **8** |
| Teszt / teljesítmény / E2E | **9** |
| Üzemeltetés + záró elfogadás | **10** |

---

## Kapcsolódó dokumentumok

- [`phased-master-plan.md`](./phased-master-plan.md) – részletes technikai fázisok (0–8+), CSS, docs, mobil, éles.
- [`design-and-ssot-phase-roadmap.md`](./design-and-ssot-phase-roadmap.md) – D1–D4 design és SSOT mérföldkövek.
- [`demo-es-lokal-teszteles-utmutato.md`](./demo-es-lokal-teszteles-utmutato.md) – lokális demó indítás.
