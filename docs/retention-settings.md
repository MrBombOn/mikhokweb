# Retention beállítások (admin) — Fázis 6

Az adatmegőrzési időablakok admin felületről állíthatók:

- oldal: `/admin/retention`
- API: `GET/PATCH /api/admin/retention`
- tárolás: `RetentionConfig` singleton rekord (`id=1`)

## Mezők

- `auditLogDays` — audit napló ajánlott megőrzés (nap)
- `feedbackDays` — visszajelzések ajánlott megőrzés (nap)
- `requestLogDays` — request-scope log ajánlott megőrzés (nap)

## Tartományok

- `auditLogDays`, `feedbackDays`: `7..3650`
- `requestLogDays`: `1..3650`

## Megjegyzés

A tényleges DB cleanup: **`npm run ops:retention-prune`** (`scripts/ops/retention-prune.cjs`) — törli a `RetentionConfig` szerint lejárt `AuditLog` és `FeedbackSubmission` sorokat. Száraz futás: `RETENTION_PRUNE_DRY_RUN=1`. Részletek: [`docs/privacy-and-gdpr.md`](./privacy-and-gdpr.md).

A **request log** (`requestLogDays`) nem Prisma táblához kötött — a hoston rotáld / archiváld a strukturált logokat.
