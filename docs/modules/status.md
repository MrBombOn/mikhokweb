# Publikus állapot oldal (`/status`)

## Cél

**Emberi összefoglaló** a szolgáltatás egészségéről (Fázis 17): a szerver **belsőleg** meghívja a `GET /api/health` végpontot, és a választ a kliens UI jeleníti meg. **Nem** helyettesíti a külső status page szolgáltatást.

## Útvonal és belépési pontok

| Réteg | Fájl |
|--------|------|
| Route | `app/(public)/status/page.tsx` — `dynamic = 'force-dynamic'` |
| UI | `app/(public)/status/StatusPageClient.tsx` |
| Health API | `app/api/health/route.ts` |

## Adat és API

| Erőforrás | Leírás |
|-----------|--------|
| `GET /api/health` | JSON állapot (cache: `no-store` a status oldal fetch-ben) |

**Metadata:** `robots: { index: false, follow: false }` — ne indexelje a kereső.

## Viselkedés röviden

- Host / proto a `headers()` alapján; hibaág: nincs host, fetch hiba, nem JSON válasz.
- Stílus: `styles/modules/status-public.css` (Fázis 1).

## Kapcsolódó dokumentumok

- [`teljes-modul-keszultseg-es-uzemeltetesi-atadas-2026-05-08.md`](../teljes-modul-keszultseg-es-uzemeltetesi-atadas-2026-05-08.md) — §12 Fázis 17 (synthetic / production smoke kontextus).
- [`api.md`](../api.md) — § „Operáció / Health” (`GET /api/health`).
