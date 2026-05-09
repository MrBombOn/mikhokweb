# Release checklist pipeline (Fázis 6)

Cél: a release minőségkapu ne csak dokumentáció legyen, hanem **automatizált pipeline gate**.

## 1) Egységes gate script

Parancs:

```bash
npm run ops:release-checklist
```

A script (`scripts/ops/release-checklist-gate.cjs`) sorrendben futtatja:

1. `npm run lint`
2. `npm run typecheck`
3. `npm run test`
4. `npm run build`
5. `npm run ops:backup-drill`
6. `npm run ops:smoke-gate`
7. `npm run lhci` *(ha `FF_LIGHTHOUSE_CI_GATE=1`)*

Ha bármelyik lépés hibás, a pipeline hibára fut.

## 2) Post-deploy smoke gate

`npm run ops:smoke-gate` (`scripts/ops/post-deploy-smoke.cjs`) lokálisan elindítja a buildelt appot (`next start`), majd ellenőrzi:

- `/`
- `/news`
- `/guides`
- `/api/health` (`status=db=ok`)
- `/api/news`
- `/api/guides`

## 3) CI integráció

- GitHub Actions:
  - `build` job végén `ops:smoke-gate`
  - `lighthouse` job gate küszöbökkel
  - külön `release_checklist` job: `ops:release-checklist`
- GitLab:
  - új `release-checklist` stage + `release_checklist` job
  - `build` job végén `ops:smoke-gate`

## 4) Kapcsolódó

- LHCI küszöbök: `lighthouserc.cjs`
- Retention admin: [`retention-settings.md`](./retention-settings.md)
- Üzemeltetési rutin: [`scheduled-health-routine.md`](./scheduled-health-routine.md)
