# Testing

Minimális tesztfutás és polish checklist (Fázis 15 első kör).

**Teljes demó stack** (env, migráció, seed, `next dev`, kézi checklist): [demo-es-lokal-teszteles-utmutato.md](./demo-es-lokal-teszteles-utmutato.md).

## Lokális futtatás

- `npm run test` – node:test + tsx alapon futó unit/smoke tesztek.
- `npm run test:e2e` – Playwright: szerepkör smoke (`e2e/smoke-roles.spec.ts`) + **tornaterem foglalás** (`e2e/booking-flow.spec.ts`: vendég POST + OFFICE jóváhagyás). A `globalSetup` lefuttatja a `prisma migrate deploy` + `db:seed`-et a `e2e/resolve-database-url.ts` szerinti `DATABASE_URL`-re; a `webServer` ugyanezt az URL-t adja a `next start`-nak. **Ha a szerverkód / CSRF / auth változott, előtte `npm run build`.** A `production-public-smoke.spec.ts` **nincs** benne (külön config).
- `npm run test:e2e:prod-smoke` – csak publikus HTTP ellenőrzés **külső** `PRODUCTION_SMOKE_BASE_URL`-re (`playwright.production.config.ts`); éles smoke: [`synthetic-monitoring.md`](./synthetic-monitoring.md).
- `npm run lint`
- `npm run build`
- `npm run ops:retention-prune` — retention batch (élő törlés); száraz futás: `RETENTION_PRUNE_DRY_RUN=1` (lásd `docs/privacy-and-gdpr.md`).

## Jelenlegi tesztlefedés (első kör)

- `tests/calculator.compute.test.ts`
  - KKI domain számítások (ghost kizárás, weighted/KI/KKI, üres input).
- `tests/csrf-and-rate-limit.test.ts`
  - CSRF origin ellenőrzés alaplogikája.
  - Login rate-limit küszöb és reset.

## Következő kör

- API route contract tesztek (HTTP integráció).
- Admin flow smoke bővítés (audit export, builder).
- CI: lásd GitHub `e2e` job + GitLab `e2e` stage.

