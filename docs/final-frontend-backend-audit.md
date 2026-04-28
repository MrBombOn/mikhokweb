# Végső Frontend + Backend Audit

Ez a dokumentum a jelenlegi állapotot összegzi a master spec szempontjai szerint.

## Frontend állapot

- Public oldalak egységes layouton futnak (`PublicPageShell`, kártya/section szemlélet).
- Landing és navbar 6 fő publikus útvonalra van szűkítve.
- Design token alapú styling használatban van (`styles/design-tokens.css`, `app/globals.css`).
- Egyedi rendszeroldalak elérhetők:
  - `app/not-found.tsx`
  - `app/error.tsx`
  - `app/global-error.tsx`
  - `app/loading.tsx`
- Űrlapelemek testreszabva:
  - dropdown (`.select` és `select.input`)
  - textarea (`textarea.input`)
  - fókusz és mobil touch-target javítás

## Backend állapot

- Feature-first szerkezet kiterjesztve a fő domainekre (`features/*/server.ts`).
- API route-ok vékony rétegként működnek, a domain logika szolgáltatásba szervezve.
- Írási műveleteknél audit trail központosítva (`lib/audit/write-audit.ts`).
- Jogosultságkezelés és auth szerveroldali döntéssel fut.
- CSRF és validációs védelmek több route-on be vannak kötve.

## CI/CD és minőség

- GitHub Actions és GitLab CI is futtat `lint -> test -> build` láncot.
- Dokumentált baseline és auditok:
  - `docs/lighthouse-baseline.md`
  - `docs/a11y-audit.md`
  - `docs/seo-audit.md`

## Nyitott véglegesítési pontok (100%-hoz)

- Vizuális regresszió automatizálása (snapshot/e2e pipeline).
- Minden write endpoint audit middleware-szintű egységesítése.
- Teljeskörű i18n fedettség-ellenőrzés minden admin/public feliratra.
- E2E tesztkészlet bővítése kritikus user journey-kre.

## Javasolt “release close” checklist

1. `npm run lint`
2. `npm run test`
3. `npm run build`
4. manuális smoke test: `news`, `calendar`, `calculator`, `gallery`, `guides`, `about`, admin login
5. docs frissítés: `progress-log`, `decision-log`, jelen fájl
