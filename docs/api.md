# API

Az `app/api` alatti route handlerek a spec szerint; a stub válaszok 501-es státusszal jelzik a még nem implementált végpontokat.

## Hírek (`/api/news`)

| Módszer | Útvonal | Leírás | Auth |
|--------|---------|--------|------|
| `GET` | `/api/news` | Lista. Vendég: csak `published`. OFFICE/ADMIN: minden, kivéve `deleted` (soft delete). Rendezés: `pinned` desc, majd `listDate` desc. | Opcionális |
| `POST` | `/api/news` | Új hír. Body: JSON a `lib/validation/news.ts` `createNewsSchema` szerint (`source`, `category`, `status`, `listDate?`, `titleHu`, `titleEn`, `textHu`, `textEn`, `author`, `cover`, `hasCover`, `scheduledFor?`, `externalUrl?`). | OFFICE vagy ADMIN |
| `GET` | `/api/news/[id]` | Egy hír. Vendég: csak `published`. Admin: nem `deleted`. | Opcionális |
| `PATCH` | `/api/news/[id]` | Részleges frissítés (`patchNewsSchema`). | OFFICE vagy ADMIN |
| `DELETE` | `/api/news/[id]` | Soft delete: `status` → `deleted`. | OFFICE vagy ADMIN |

Válasz alak: `{ items: NewsItem[] }` lista esetén; `{ item: NewsItem }` egy elem; törlés után `{ ok: true }`. Hiba: `{ error: string }`, esetleg `details` (Zod flatten).

A kliens oldali `NewsItem` típus: `types/news.ts`.

## Naptár események (`/api/events`)

| Módszer | Útvonal | Leírás | Auth |
|--------|---------|--------|------|
| `GET` | `/api/events` | Lista. Vendég: csak `published`. OFFICE/ADMIN: minden, kivéve `deleted`. Rendezés: `eventDate`, `time`. | Opcionális |
| `POST` | `/api/events` | Új esemény. Body: `createEventSchema` (`lib/validation/events.ts`). | OFFICE vagy ADMIN |
| `GET` | `/api/events/[id]` | Egy esemény. Vendég: csak `published`. | Opcionális |
| `PATCH` | `/api/events/[id]` | Részleges frissítés (`patchEventSchema`). | OFFICE vagy ADMIN |
| `DELETE` | `/api/events/[id]` | Soft delete → `deleted`. | OFFICE vagy ADMIN |

Válasz: `{ items: CalendarEventItem[] }` vagy `{ item: CalendarEventItem }`. Típus: `types/calendar.ts` (`CalendarEventItem`).

## Tornaterem foglalások (`/api/bookings`)

| Módszer | Útvonal | Leírás | Auth |
|--------|---------|--------|------|
| `GET` | `/api/bookings` | Összes foglalási sor (státusz, idősáv, igénylő név – ütközés-ellenőrzéshez a kliensen). | Nincs |
| `POST` | `/api/bookings` | Új igény. Body: `createBookingSchema` (`applicantName`, `email`, `bookingDate`, `startTime`, `endTime`, `purpose`, opcionálisan `organization`, `title`). | Nincs |
| `PATCH` | `/api/bookings/[id]` | Státusz: `{ "status": "pending" \| "approved" \| "rejected" }`. | OFFICE vagy ADMIN |

Válasz: `{ items: GymBookingItem[] }` vagy `{ item: GymBookingItem }`. A `slot` string formátuma: `YYYY-MM-DD HH:mm-HH:mm` (mapper).
