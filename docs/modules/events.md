# Naptári események (Events — domain)

## Cél

`CalendarEvent` rekordok **REST szerződése** és szerver oldali logika. A **felhasználói naptár UI** (rács, timeline, foglalások) külön modul: [`calendar.md`](./calendar.md) — itt csak a domain + API belépési pontok.

## Hol él a UI?

| Szerep | Fájl / útvonal |
|--------|----------------|
| Publikus naptár + admin esemény műveletek | `components/calendar/CalendarModule.tsx`, `app/(public)/calendar/*` |
| API hívások | `GET` / `POST /api/events`, `GET` / `PATCH` / `DELETE /api/events/[id]` |

## Adat és API

| Művelet | HTTP |
|----------|--------|
| Lista | `GET /api/events` |
| Létrehozás | `POST /api/events` |
| Részletek / módosítás / soft delete | `GET`, `PATCH`, `DELETE /api/events/[id]` |

**Domain:** `features/events/server.ts` — `listEventsForRole`, `createCalendarEvent`, lekérés, patch, soft delete, `parseEventId`.

**Validáció / mapper:** `lib/validation/events`, `lib/mappers/calendar` (`calendarEventToItem`).

## Kapcsolódó dokumentumok

- [`calendar.md`](./calendar.md) — teljes modul viselkedés.
- [`features/events/README.md`](../../features/events/README.md)
- `docs/api.md` — events végpontok.
