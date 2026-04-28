# Incident debug runbook

Rövid, gyakorlati folyamat élő incidens (5xx, auth hiba, DB elérés) kezelésére.

## 1) Gyors állapotellenőrzés

- Ellenőrizd a health endpointot: `GET /api/health`.
- Várt sikeres válasz: `status: "ok"` és `db: "ok"`.
- Ha `503` vagy `degraded`, elsődleges gyanú: DB kapcsolat vagy környezeti konfiguráció.

## 2) Structured log keresés

- A szerver logok JSON sorokat írnak (`lib/observability/server-logger.ts`).
- Elsőként keresd ezeket az eseményeket:
  - `health_check_failed`
  - `auth_login_invalid_body`
  - `auth_login_rate_limited`
  - `auth_login_invalid_credentials`
  - `auth_login_success`
- A logok PII-minimum elvet követnek: érzékeny mezők (`password`, `token`, `cookie`, `authorization`, `email`) redaktálva vannak.

## 3) Auth hiba triage

- Sok `auth_login_invalid_credentials` + rövid idő alatt sok próbálkozás:
  - brute-force vagy hibás kliens lehetőség.
  - ellenőrizd, hogy a `tooManyRequests` ág aktiválódik-e.
- Sok `auth_login_invalid_body`:
  - kliens payload regresszió gyanú.
  - ellenőrizd az aktuális login form JSON formátumot.

## 4) DB / platform triage

- `health_check_failed` esetén ellenőrizd:
  - `DATABASE_URL` helyesség,
  - DB szerver elérhetőség,
  - futó migrációk állapotát.
- Lokális ellenőrzés:
  - `npm run build`
  - `npm run lint`
  - `npm run test`

## 5) Lezárás

- Dokumentáld röviden:
  - kiváltó ok,
  - detektálás ideje,
  - javítás,
  - megelőző lépés.
- Frissítsd a `docs/progress-log.md`-ot, ha a javítás fejlesztési feladatot eredményez.

