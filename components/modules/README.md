# `components/modules/` — migrált modul UI

**Fázis 4 konvenció:** egy almappa = **egy publikus modul** nagyobb kliens UI-ja (jellemzően `*Module.tsx`), a gyökér [`features/<név>/`](../../features/) domain réteggel és a vékony `app/(public)/<route>/` oldalakkal együtt olvasandó.

## Pilot

| Mappa | Belépő komponens | Doksi |
|--------|------------------|--------|
| [`about/`](./about/) | `AboutModule.tsx` | [`about/README.md`](./about/README.md), [`docs/modules/about.md`](../../docs/modules/about.md) |

## Új modul vagy migráció (checklist)

1. Domain: `features/<név>/` + `README.md` (+ `server.ts`, séma, típusok — lásd `features/news`).
2. HTTP: `app/api/<név>/*` — csak hívja a `features/<név>/server` exportokat.
3. UI: **`components/modules/<név>/`** + lokális `README.md`; a route `page.tsx` maradjon vékony (metadata + JSON-LD + egy kliens burkoló vagy közvetlen modul import).
4. Doksi: `docs/folder-structure.md` útvonal-tábla; opcionálisan `docs/modules/<név>.md`.

A régi elrendezés (`components/calendar/`, `components/news/`, …) **legacy**; migráció modulonként, külön PR-ben — [`docs/folder-structure.md`](../../docs/folder-structure.md) §Fázis 4.
