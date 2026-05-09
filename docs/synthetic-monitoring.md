# Szintetikus monitorozás (éles, read-only) — Fázis 17

## Cél

A **publikus** kritikus útvonalakat rendszeresen ellenőrizni **külső** nézőpontból (HTTP), jelszó és seed nélkül — kiegészíti az `ops:health-check` egy-URL ellenőrzését.

## Playwright: publikus smoke

- **Spec:** `e2e/production-public-smoke.spec.ts`
- **Config:** `playwright.production.config.ts` — **nincs** `webServer`, nincs DB migráció / seed (globális setup kihagyható).
- **Környezet:** `PRODUCTION_SMOKE_BASE_URL` — teljes origin, **nincs** trailing `/` (pl. `https://portal.example.hu`).

Lokálisan futó szerver ellen (manuális `npm run start` után):

```bash
set PRODUCTION_SMOKE_BASE_URL=http://127.0.0.1:3000
npm run test:e2e:prod-smoke
```

## GitHub Actions (ütemezett + manuális)

- Workflow: [`.github/workflows/production-smoke.yml`](../.github/workflows/production-smoke.yml)
- **Repository secret:** `PRODUCTION_SMOKE_BASE_URL` — éles (vagy staging) nyilvános URL.
- **Repository variable (opcionális):** `PRODUCTION_SMOKE_ENABLED` = `true` — amíg nincs beállítva, az ütemezett futás **kihagyja** a jobot (ne legyen zajos piros pipeline üres secret mellett).
- **Ütemezés:** alapértelmezés óránként (`cron`). Igény szerint ritkítsd a YAML-ban.

## Riasztás (Sentry / ops csatorna)

- A workflow **hiba** esetén a GitHub **e-mail / integráció** (Slack, Teams) natív módon riasztható: *Actions* → workflow → *Notify* beállítások.
- **Sentry:** a Playwright nem küld automatikusan eseményt; a cél, hogy a **pipeline piros** legyen → on-call a megszokott ops csatornán reagáljon. Későbbi bővítés: külső szolgáltatás (Checkly, Pingdom) webhook Sentry-be.

## Emberi státusz oldal

- Belső, **nem indexelt** összefoglaló: publikus route **`/status`** (`app/(public)/status/page.tsx`) — a szerver lekéri a `/api/health`-t és megjeleníti az állapotot.
- Külső **status page** szolgáltatás (pl. Statuspage.io) továbbra is opcionális; a fenti oldal nem helyettesíti a kommunikációs oldalt.

## Kapcsolódó

- SLI/SLO: [`sli-slo-error-budget.md`](./sli-slo-error-budget.md)
- Riasztási minták: [`alerting-rules.md`](./alerting-rules.md)
