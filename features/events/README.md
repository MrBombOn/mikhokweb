# Events — domain (`features/events`)

Naptári **események** (`CalendarEvent`) — lista, létrehozás, részleges frissítés, soft delete. A publikus naptár UI más útvonalon van; ez a modul az API/domain SSOT az esemény entitáshoz.

| Réteg | Hely |
|--------|------|
| **Domain** | `server.ts` — `listEventsForRole`, `createCalendarEvent`, `getCalendarEventDto`, patch, soft delete, `parseEventId` |
| **HTTP** | `app/api/events/route.ts`, `app/api/events/[id]/route.ts` |
| **UI** | naptár / admin esemény kezelés — `components/calendar/` és admin útvonalak |
| **Validáció** | `lib/validation/events` |
| **Mapper** | `lib/mappers/calendar` (`calendarEventToItem`) |

Lásd még: `docs/modules/calendar.md`.
