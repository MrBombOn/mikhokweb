# Penetration test – scope és briefing (Fázis 16)

## Cél

Külső (vagy belső dedikált) **penetration test** megrendelése előtt egy **egységes briefing** és **hatókör**, hogy a jegyzőkönyv összehasonlítható legyen és ne maradjanak kritikus „szürke zónák”.

> **Megjegyzés:** a tényleges teszt **végrehajtása** és aláírt jegyzőkönyve szolgáltatói feladat; ez a dokumentum a **felkészülést** és az **elvárásokat** rögzíti.

## Alkalmazás összefoglaló (briefing egy oldal)

- **Termék:** Next.js alapú HÖK / intézményi portál (`hok-web-v11`).
- **Érintett szerepkörök:** vendég (publikus űrlapok, naptár, hírek), OFFICE, ADMIN; JWT cookie + middleware RBAC.
- **Kritikus felületek:** bejelentkezés, admin CRUD, fájl feltöltés (galéria / útmutató), foglalás, visszajelzés, Site Builder, kereső API.
- **Edge védelem:** `middleware.ts` burst limit kritikus `POST` útvonalakon; részletek: [`security-walkthrough.md`](./security-walkthrough.md).
- **Disclosure:** [`security-disclosure.md`](./security-disclosure.md), `/.well-known/security.txt`.

## Javasolt hatókör (in scope)

| Terület | Példa fókusz |
|---------|----------------|
| Auth / session | JWT forgatás, cookie flag-ek, session fixation, brute-force (route + edge limit együtt) |
| RBAC | OFFICE → ADMIN-only útvonalak, IDOR admin API-kon |
| Input / XSS | Hírek, útmutatók, Builder tartalom, feedback mezők |
| Fájl / feltöltés | MIME bypass, méret, path traversal, presigned URL ha S3 |
| Üzleti logika | Foglalás ütközés, státusz, rate limit megkerülés |
| Konfiguráció | Security header-ek, CORS, open redirect |
| Supply chain | Lockfile / SBOM áttekintés (nem teljes forráskód audit helyett): [`security-supply-chain.md`](./security-supply-chain.md) |

## Kifejezetten out of scope (alapértelmezés)

- Harmadik féltől származó **npm** dependency forráskód mély auditja (külön vendor scope).
- **Fizikai** biztonság, személyzeti social engineering (külön megállapodás nélkül).
- **DDoS** volumen teszt éles környezeten (csak izolált staging / lab + írásos engedély).

## Környezetek

- **Elsődleges cél:** staging, production-paritású adat (**szintetikus** vagy anonymizált).
- **Éles:** csak írásos engedéllyel, időablakkal, rollback tervvel; kritikus írások minimalizálása.

## Deliverables (elvárt kimenetek a szolgáltatótól)

1. **Executive summary** (nem technikai vezetőnek is érthető).
2. **Technikai leletlista:** CVSS vagy egyeztetett súlyossági skála, reprodukciós lépések, érintett URL / komponens.
3. **Retest** opció javítás után (szerződésben rögzítve).
4. **Adatkezelés:** a teszt során keletkező naplók / dumpok törlése vagy visszaadása.

## Belső előkészület (checklist)

- [ ] Staging URL + teszt fiókok (OFFICE / ADMIN) átadása jelszócsatornán.
- [ ] IP allowlist / időablak, ha WAF szűkítés kell.
- [ ] Backup / rollback kontakt (lásd [`recovery-checklist.md`](./recovery-checklist.md)).
- [ ] SBOM és audit riport legfrissebb példánya: `npm run ops:sbom`, `npm run ops:audit-report`.

## Kapcsolódó

- ASVS önellenőrzés: [`security-asvs-self-audit.md`](./security-asvs-self-audit.md)
- WAF / proxy: [`security-waf-proxy-rulebook.md`](./security-waf-proxy-rulebook.md)
