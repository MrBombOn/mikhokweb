# API

Az `app/api` alatti route handlerek a spec szerint; a stub válaszok 501-es státusszal jelzik a még nem implementált végpontokat.

## Hírek (`/api/news`)

| Módszer | Útvonal | Leírás | Auth |
|--------|---------|--------|------|
| `GET` | `/api/news` | Lista. Vendég: csak `published`. OFFICE/ADMIN: minden, kivéve `deleted` (soft delete). Rendezés: `pinned` desc, majd `listDate` desc. | Opcionális |
| `POST` | `/api/news` | Új hír. Body: JSON a `features/news/schema.ts` `createNewsSchema` szerint (`source`, `category`, `status`, `listDate?`, `titleHu`, `titleEn`, `textHu`, `textEn`, `author`, `cover`, `hasCover`, `scheduledFor?`, `externalUrl?`). | OFFICE vagy ADMIN |
| `GET` | `/api/news/[id]` | Egy hír. Vendég: csak `published`. Admin: nem `deleted`. | Opcionális |
| `PATCH` | `/api/news/[id]` | Részleges frissítés (`patchNewsSchema`). | OFFICE vagy ADMIN |
| `DELETE` | `/api/news/[id]` | Soft delete: `status` → `deleted`. | OFFICE vagy ADMIN |

Válasz alak: `{ items: NewsItem[] }` lista esetén; `{ item: NewsItem }` egy elem; törlés után `{ ok: true }`. Hiba: `{ error: string }`, esetleg `details` (Zod flatten).

A kliens oldali `NewsItem` típus: `types/news.ts`.

**SSOT (D7):** üzleti logika és DTO-képzés `features/news/server.ts` + `features/news/mapper.ts`; a route csak auth + validáció.

## Naptár események (`/api/events`)

| Módszer | Útvonal | Leírás | Auth |
|--------|---------|--------|------|
| `GET` | `/api/events` | Lista. Vendég: csak `published`. OFFICE/ADMIN: minden, kivéve `deleted`. Rendezés: `eventDate`, `time`. | Opcionális |
| `POST` | `/api/events` | Új esemény. Body: `createEventSchema` (`lib/validation/events.ts`). | OFFICE vagy ADMIN |
| `GET` | `/api/events/[id]` | Egy esemény. Vendég: csak `published`. | Opcionális |
| `PATCH` | `/api/events/[id]` | Részleges frissítés (`patchEventSchema`). | OFFICE vagy ADMIN |
| `DELETE` | `/api/events/[id]` | Soft delete → `deleted`. | OFFICE vagy ADMIN |

Válasz: `{ items: CalendarEventItem[] }` vagy `{ item: CalendarEventItem }`. Típus: `types/calendar.ts` (`CalendarEventItem`).

**SSOT (D7):** `features/events/server.ts`.

## Tornaterem foglalások (`/api/bookings`)

| Módszer | Útvonal | Leírás | Auth |
|--------|---------|--------|------|
| `GET` | `/api/bookings` | Összes foglalási sor (státusz, idősáv, igénylő név – ütközés-ellenőrzéshez a kliensen). | Nincs |
| `POST` | `/api/bookings` | Új igény. Body: `createBookingSchema` (`applicantName`, `email`, `bookingDate`, `startTime`, `endTime`, `purpose`, opcionálisan `organization`, `title`). | Nincs |
| `PATCH` | `/api/bookings/[id]` | Státusz: `{ "status": "pending" \| "approved" \| "rejected" }`. | OFFICE vagy ADMIN |

Válasz: `{ items: GymBookingItem[] }` vagy `{ item: GymBookingItem }`. A `slot` string formátuma: `YYYY-MM-DD HH:mm-HH:mm` (mapper).

## KKI kalkulátor mentés (`/api/calculator/state`)

| Módszer | Útvonal | Leírás | Auth |
|--------|---------|--------|------|
| `GET` | `/api/calculator/state` | `{ semesters: Semester[] \| null, updatedAt: string \| null }` – ha nincs mentés, `semesters: null`. | OFFICE vagy ADMIN |
| `PUT` | `/api/calculator/state` | Teljes csere: body a `calculatorStateSchema` szerint (`{ semesters: [...] }`). Max. 50 félév; tárgy mezők: `lib/validation/calculator.ts`. | OFFICE vagy ADMIN |

A vendég **nem** hívja ezt a végpontot; a böngészőben a `CalculatorModule` `localStorage`-t használ (`docs/calculator-rules.md`).

## Galéria (`/api/gallery`)

| Módszer | Útvonal | Leírás | Auth |
|--------|---------|--------|------|
| `GET` | `/api/gallery` | `{ folders: GalleryFolderDto[], items: GalleryItemDto[] }`. Vendég: csak `published` elemek; mappák teljes lista. | Opcionális |
| `POST` | `/api/gallery` | Új elem. Body: `createGalleryItemSchema` (`lib/validation/gallery.ts`): `folderId`, `titleHu`, `titleEn`, `listDate`, opcionális `imageUrl` (http(s) vagy üres), `status`, `sortOrder`. | OFFICE vagy ADMIN |
| `GET` | `/api/gallery/[id]` | Egy elem. Vendég: csak `published`. | Opcionális |
| `PATCH` | `/api/gallery/[id]` | Részleges frissítés (`patchGalleryItemSchema`). | OFFICE vagy ADMIN |
| `DELETE` | `/api/gallery/[id]` | Soft delete → `deleted`. | OFFICE vagy ADMIN |

Típusok: `types/gallery.ts`. Képek: jelenleg URL mező (demó: picsum); fájlfeltöltés külön storage réteggel (§13.3).

**SSOT (D7):** `features/gallery/server.ts`.

## Útmutatók (`/api/guides`)

| Módszer | Útvonal | Leírás | Auth |
|--------|---------|--------|------|
| `GET` | `/api/guides` | `{ items: GuideDto[] }`. Vendég: csak `published`. OFFICE/ADMIN: minden, kivéve `deleted`. Rendezés: `listDate` desc, majd `id` desc. | Opcionális |
| `POST` | `/api/guides` | Új útmutató. Body: `createGuideSchema` (`lib/validation/guides.ts`): `titleHu`, `titleEn`, opcionális `excerptHu` / `excerptEn` / `bodyHu` / `bodyEn`, `category`, `topic`, `keywords`, `documentUrl` (http(s) vagy üres / null), `documentType`, `listDate` (YYYY-MM-DD), `status`. | OFFICE vagy ADMIN |
| `GET` | `/api/guides/[id]` | Egy elem. Vendég: csak `published`. | Opcionális |
| `PATCH` | `/api/guides/[id]` | Részleges frissítés (`patchGuideSchema`). `documentUrl`: `null` vagy üres string → törlés (`null` a DB-ben); ha a mező nincs a body-ban → nem változik. | OFFICE vagy ADMIN |
| `DELETE` | `/api/guides/[id]` | Soft delete → `deleted`. | OFFICE vagy ADMIN |

Típus: `types/guides.ts` (`GuideDto`).

**SSOT (D7):** `features/guides/server.ts`.

## About Us (`/api/about`)

| Módszer | Útvonal | Leírás | Auth |
|--------|---------|--------|------|
| `GET` | `/api/about` | `{ narratives: AboutNarrativeDto[], members: AboutMemberDto[] }`. Vendég: csak `published`. OFFICE/ADMIN: minden, kivéve `deleted`. Narratívák: `sortOrder` asc; tagok: `sortOrder` asc. | Opcionális |
| `POST` | `/api/about/members` | Új tagkártya. Body: `createAboutMemberSchema` (`lib/validation/about.ts`): `name`, `roleHu`, `roleEn`, opcionális `bioHu` / `bioEn`, `groupHu` / `groupEn`, `imageUrl` (http(s) vagy üres), `sortOrder`, `status`. | OFFICE vagy ADMIN |
| `GET` | `/api/about/members/[id]` | Egy tag. Vendég: csak `published`. | Opcionális |
| `PATCH` | `/api/about/members/[id]` | Részleges frissítés (`patchAboutMemberSchema`). | OFFICE vagy ADMIN |
| `DELETE` | `/api/about/members/[id]` | Soft delete → `deleted`. | OFFICE vagy ADMIN |
| `GET` | `/api/about/narratives/[id]` | Egy szöveges blokk (`blockKey` a DTO-ban). Vendég: csak `published`. | Opcionális |
| `PATCH` | `/api/about/narratives/[id]` | Részleges frissítés (`patchAboutNarrativeSchema`): címek, törzs HU/EN, `sortOrder`, `status`. A `blockKey` nem változtatható (szerkesztéshez azonosító: `id`). | OFFICE vagy ADMIN |

Típusok: `types/about.ts`.

**SSOT (D7):** `features/about/server.ts` (aggregát GET, tag CRUD, narratíva GET/PATCH).

## Office (`/api/office`)

| Módszer | Útvonal | Leírás | Auth |
|--------|---------|--------|------|
| `GET` | `/api/office` | `{ item: OfficeSnapshotDto }` singleton snapshot. Vendég: csak `published`. OFFICE/ADMIN: bármely státusz. | Opcionális |
| `PATCH` | `/api/office` | Részleges frissítés (`patchOfficeSnapshotSchema`): nyitvatartás, bent lévők, ügyintézési státusz, szolgáltatás infó, NFC blokk, gyors infó, `status`. | OFFICE vagy ADMIN |

Típus: `types/about.ts` (`OfficeSnapshotDto`).

**SSOT (D7):** `features/office/server.ts`.

## Admin API (`/api/users`, `/api/categories`, `/api/audit`)

| Módszer | Útvonal | Leírás | Auth |
|--------|---------|--------|------|
| `GET` | `/api/users` | Felhasználólista (`id`, `username`, `role`, dátumok). | ADMIN |
| `POST` | `/api/users` | Új felhasználó (`username`, `password`, `role`). Bcrypt hash mentés, audit bejegyzés. | ADMIN |
| `GET` | `/api/categories` | Kategórialista. Vendég: `published`; ADMIN: minden, kivéve `deleted`. | Opcionális |
| `POST` | `/api/categories` | Új kategória (`scope`, `nameHu`, `nameEn`, `sortOrder`, `status`), audit bejegyzéssel. | ADMIN |
| `GET` | `/api/audit` | Legutóbbi audit események (max 120). | ADMIN |

## Operáció / Health (`/api/health`)

| Módszer | Útvonal | Leírás | Auth |
|--------|---------|--------|------|
| `GET` | `/api/health` | Alap health check az üzemeltetéshez: DB ping (`SELECT 1`), egyszerű latencia és timestamp. Sikernél `200` + `{ status: "ok", db: "ok" }`, DB hiba esetén `503` + `{ status: "degraded", db: "error" }`. | Nincs |

## Nyilvános visszajelzés (`/api/feedback`)

| Módszer | Útvonal | Leírás | Auth |
|--------|---------|--------|------|
| `POST` | `/api/feedback` | Rövid hibajelzés/korrekciós visszajelzés. Body: `module`, `message`, opcionális `email`. Siker: `{ ok: true, id }`. | Nincs |

Rate limit: 5 kérés / 10 perc / kliens kulcs (`x-forwarded-for`), hiba esetén `429`.

## Hardening alapok (Fázis 12)

- Egységes API válasz segédek: `lib/api/response.ts` (`ok`, `created`, `badRequest`, `forbidden`, stb.).
- Bejelentkezés rate limit: `lib/security/login-rate-limit.ts` (`x-forwarded-for + username` kulcs, 6 hiba / 10 perc után 15 perc tiltás).
- A legérzékenyebb admin route-ok (`/api/users`, `/api/categories`, `/api/audit`) már az egységes hibaválasz-factory-t használják.

## Biztonsági audit kiegészítés (Fázis 13)

- CSRF origin/referer guard: `lib/security/csrf.ts`.
- A cookie-auth state-changing route-ok origin check-et futtatnak (`enforceSameOrigin`).
- Audit jegyzet és nyitott kockázatok: `docs/security-audit.md`.
