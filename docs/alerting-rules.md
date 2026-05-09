# Riasztási szabályok (első kör, log + health alap)

A cél: élesben **korai jelzés** a szolgáltatás degradációjára és a visszaélés-szerű mintákra, **PII nélkül** (a `serverLogger` meta mezők ne tartalmazzanak nyers jelszót / tokent / teljes emailt).

## 1) Health endpoint

- **Metrika:** `GET /api/health` válasz `status`, `db`.
- **Figyelmeztetés:** 5xx vagy `db !== "ok"` több egymás utáni próbán (pl. 3 / 5 perc).
- **Súlyos:** `503` vagy `health_check_failed` log esemény több példányban.

## 2) Strukturált log események (JSON sorok)

A `lib/observability/server-logger.ts` minden sorában van `event` mező. Első körben érdemes szűrni:

| Esemény / minta | Javasolt reakció |
|-----------------|------------------|
| `health_check_failed` | DB / `DATABASE_URL` / migráció triage |
| `auth_login_rate_limited` | brute-force vagy rossz kliens; rate limit működés ellenőrzése |
| `public_feedback_rate_limited` | spam / bot; CAPTCHA / Turnstile állapot |
| `news_create_duplicate_ingest` | ingest duplikáció (nem feltétlen incidens) |
| `booking_create_rate_limited` | visszaélés gyanú |
| `admin_*` / `booking_*` / `calendar_*` / `guide_*` / `news_*` (Fázis 4) | audit trail; gyanús volumen esetén manuális review |

**Koreláció:** minden érintett válaszon szerepel az `x-request-id` header; a log meta tartalmazza ugyanazt a `requestId` mezőt.

## 3) Sentry (opcionális)

- Ha be van állítva `SENTRY_DSN` / `NEXT_PUBLIC_SENTRY_DSN`, a kliens és szerver hibák a Sentry projektbe kerülnek.
- **Javasolt riasztás:** új issue spike (pl. 5 perc alatt > N esemény), regresszió a release után.

## 4) Következő bővítések (részben megvalósult — Fázis 17)

- HTTP 5xx arány SLA szerinti dashboard (Sentry / log alapú célok: [`sli-slo-error-budget.md`](./sli-slo-error-budget.md))
- Slow query / Prisma log összekapcsolása `requestId`-val
- Szintetikus check (Playwright, publikus útvonalak): [`synthetic-monitoring.md`](./synthetic-monitoring.md); több régió = külön ütemezés / külső szolgáltatás
