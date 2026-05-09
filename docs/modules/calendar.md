# Naptár és tornaterem (Calendar)

## Cél

Események **három nézetben** (timeline, kártyák, naptár rács), szűrés nap és kategória szerint; **tornaterem foglalás** külön folyamat (kérés + admin státusz).

## Útvonal és belépési pontok

| Réteg | Fájl |
|--------|------|
| Route | `app/(public)/calendar/page.tsx` |
| Oldal kliens | `app/(public)/calendar/CalendarPageClient.tsx` |
| UI | `components/calendar/CalendarModule.tsx` |
| Főoldal | `components/landing/AllModulesStack.tsx` |

## Adat és API

| Erőforrás | HTTP |
|-----------|------|
| Események | `GET /api/events`, `POST /api/events`, szerkesztés `PATCH` (részletek: `docs/api.md`) |
| Foglalások | `GET/POST /api/bookings`, státusz `PATCH /api/bookings/[id]` |

**Domain:** `features/events/server.ts` — események és kapcsolódó szerverlogika.

## Viselkedés röviden

- Nézetváltás ugyanarra a **kiválasztott napra** és szűrésre épül.
- Admin: gyors esemény, szerkesztő stub, foglalási sorok elfogadás/elutasítás.
- **i18n:** `t(lang).calendar` + egyes POST mezők `messages.hu` / `messages.en` párok (demó címek).
- **Kiterjesztés:** `data-expandable` + `GlobalUiInteractions` a timeline soroknál / kártyáknál — lásd `docs/global-shell.md`.

## Kapcsolódó dokumentumok

- [`events.md`](./events.md) — csak a **CalendarEvent** domain + REST (összefoglaló API tábla).
- `docs/api.md` — events, bookings.
- `styles/modules/calendar.css`.
