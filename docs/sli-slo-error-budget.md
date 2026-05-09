# SLI / SLO és error budget (Fázis 17)

## Cél

A szolgáltatás **mérhető** rendelkezésre állását és hibatűrését rögzíteni belső célértékekkel (SLO), hogy a riasztások és a fejlesztési tempó ne „érzésre”, hanem számokra épüljön.

## Javasolt SLI-k (mit mérünk)

| SLI | Forrás | Megjegyzés |
|-----|--------|------------|
| **Elérhetőség (availability)** | Külső poller vagy ütemezett HTTP: `GET /api/health` → 200, `status=ok`, `db=ok` | Lásd [`synthetic-monitoring.md`](./synthetic-monitoring.md), [`alerting-rules.md`](./alerting-rules.md) §1. |
| **Hibaarány (server error rate)** | Sentry issue rate + alkalmazáslog `5xx` / `health_check_failed` | SLO-t csak stabil ingest mellett érdemes szigorúan kötni. |
| **Latencia (p95)** | Reverse proxy access log vagy APM; az app `latencyMs` mező a health válaszban csak **DB ping**, nem teljes oldal. | Teljes oldal LHCI: [`lighthouse-baseline.md`](./lighthouse-baseline.md). |

## Példa belső SLO (induló cél — finomítsd éles forgalom után)

| SLO | Időablak | Cél | Megjegyzés |
|-----|-----------|-----|------------|
| Health-alapú elérhetőség | 30 nap | ≥ 99,5% sikeres health check | Egyetlen régióból mérve; több régió = külön SLI. |
| Kritikus API hiba (Sentry P1) | 7 nap | Nincs sustained spike a baseline felett | Release utáni 24 h fokozott figyelem. |

**Számítás (availability):** `sikeres_check / összes_check` az időablakon belül (pl. óránkénti vagy 15 perces poller).

## Error budget

- **Definíció:** ha az SLO pl. 99,5% / 30 nap, a **budget** ≈ 3,6 óra „megengedett” downtime / hó (összegzett health hiba).
- **Használat:** ha a budget gyorsan fogy, **állítsd vissza** a változtatást (rollback), fagyassz be feature-t, vagy csökkents release gyakoriságot, amíg a stabilitás helyre nem áll.
- **Dokumentáld** a nagyobb kimaradásokat: [`incident-debug.md`](./incident-debug.md), [`incident-communication-templates.md`](./incident-communication-templates.md).

## Kapcsolódó

- Riasztások (első kör): [`alerting-rules.md`](./alerting-rules.md)
- Ütemezett health CLI: `npm run ops:health-check` — [`scheduled-health-routine.md`](./scheduled-health-routine.md)
- Szintetikus éles smoke (Playwright): [`synthetic-monitoring.md`](./synthetic-monitoring.md)
