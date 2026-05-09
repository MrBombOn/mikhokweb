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
| `POST` | `/api/bookings` | Új igény. Body: `createBookingSchema` (`applicantName`, `email`, `bookingDate`, `startTime`, `endTime`, `purpose`, opcionálisan `organization`, `title`, **`locale`: `"hu"` \| `"en"`** alap `hu`). Opcionális webhook: `BOOKING_NOTIFY_WEBHOOK_URL`; opcionális SMTP visszaigazolás: `BOOKING_EMAIL_ENABLED=1` + `SMTP_*` / `BOOKING_EMAIL_FROM` (lásd `.env.example`). | Nincs |
| `PATCH` | `/api/bookings/[id]` | Státusz: `{ "status": "pending" \| "approved" \| "rejected" }`. Státuszváltáskor email (ha engedélyezve) a foglaláskor rögzített `notificationLocale` nyelvén. | OFFICE vagy ADMIN |

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

## Globális keresés (`/api/search`)

| Módszer | Útvonal | Leírás | Auth |
|--------|---------|--------|------|
| `GET` | `/api/search?q=&categories=` | Központi index (`SearchDocument`): `{ items: [{ id, module, category?, titleHu, titleEn, textHu, textEn, href }] }`. A `categories` vesszővel felsorolt kategória szűrő (opcionális). Rate limit: túl gyakori kérésre `429`. | Nincs |
| `GET` | `/api/search?facets=1` | `{ categories: string[] }` – indexből egyedi kategóriák. | Nincs |

**SSOT:** `lib/search/execute-search.ts`, index szinkron: `lib/search/sync-documents.ts`, újraépítés: `npm run ops:rebuild-search-index`.

**UI mélylink (Fázis 18):** a `/search` oldal (`app/(public)/search/page.tsx`) a `?q=` query paramétert átadja a kliensnek (prefill); a strukturált adat `SearchAction` ugyanezt az URL mintát hirdeti ([`seo-hreflang-jsonld-phase18.md`](./seo-hreflang-jsonld-phase18.md)).

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
| `GET` | `/api/users` | Felhasználólista (`id`, `username`, `role`, dátumok) + `pageInfo`. Query: `q`, `role`, `sort` (asc vagy desc), `page`, `limit`. | ADMIN |
| `POST` | `/api/users` | Új felhasználó (`username`, `password`, `role`). Bcrypt hash mentés, audit bejegyzés. | ADMIN |
| `POST` | `/api/users/import` | Tömeges import: `{ items: [...] }` (max 50 sor, Zod mint egységes létrehozás). | ADMIN |
| `GET` | `/api/admin/privacy/export-user/[id]` | Belső fiók GDPR JSON export (`buildStaffUserDataExport`); `Content-Disposition: attachment`. Audit: `export_user_gdpr_json`. | ADMIN |
| `DELETE` | `/api/admin/privacy/delete-user/[id]` | Belső fiók törlése (nem lehet az utolsó ADMIN). CSRF. Audit: `delete_user_gdpr`. | ADMIN |
| `GET` | `/api/categories` | Vendég: csak `published`, `{ items }`. OFFICE/ADMIN (`canManageNews`): nem `deleted` + `{ items, pageInfo }`. Query: `q`, `scope`, `status`, `sortKey`, `sortDir`, `page`, `limit`. | Opcionális |
| `POST` | `/api/categories` | Új kategória (`scope`, `nameHu`, `nameEn`, `sortOrder`, `status`), audit bejegyzéssel. | OFFICE vagy ADMIN |
| `POST` | `/api/categories/import` | Tömeges import: `{ items: [...] }` (max 100). | OFFICE vagy ADMIN |
| `GET` | `/api/audit` | Audit lista + `pageInfo` (szűrők: `action`, `actor`, `actorRole`, `entityType`, `entityId`, `q`, `from`, `to`, `sort`, `page`, `limit`). | ADMIN |
| `GET` | `/api/audit/export` | CSV export (UTF-8 BOM); ugyanazok a szűrők + `exportLimit` (max 5000). Audit: `export_audit_csv`. Szabályalapú staff riasztás: gyakori export / nagy sorlimit (`lib/audit/export-alerts.ts`). | ADMIN |
| `GET` | `/api/admin/saved-views?module=` | Mentett nézetek listája (module: audit, users, categories). | Bejelentkezett + modul szerinti RBAC |
| `POST` | `/api/admin/saved-views` | `{ module, name, payload }` (JSON nézetállapot). | Ugyanaz |
| `DELETE` | `/api/admin/saved-views/[id]` | Saját nézet törlése. | Ugyanaz |
| `GET` | `/api/admin/search-analytics?days=14` | Keresési aggregátumok (`topQueries`, `zeroResultQueries`, `sinceDay`). | OFFICE vagy ADMIN |
| `GET` | `/api/admin/search/similar?q=` | Hasonló cím / index találatok szerkesztőknek (max ~10). | OFFICE vagy ADMIN |
| `POST` | `/api/admin/storage/presign-put` | S3 presigned PUT: body `{ purpose: "gallery" \| "guides", filename, contentType, contentLength }` → `{ putUrl, method, key, publicUrl, headers }`. Csak `STORAGE_DRIVER=s3`. CSRF. | OFFICE vagy ADMIN |
| `GET` | `/api/admin/storage/presign-get?key=` | Presigned GET URL (`{ url }`), max pár perc. Kulcs csak `uploads/gallery/` vagy `uploads/guides/` prefixszel. CSRF. | OFFICE vagy ADMIN |
| `GET` | `/api/admin/notifications` | Staff értesítések (`items`, `unreadCount`). Query: `limit`, `unreadOnly=1`. | OFFICE vagy ADMIN |
| `PATCH` | `/api/admin/notifications/[id]` | Olvasottnak jelölés (`{ read: true }`). | OFFICE vagy ADMIN (saját sor) |
| `POST` | `/api/admin/notifications/mark-all-read` | Összes saját értesítés olvasott. | OFFICE vagy ADMIN |
| `GET` | `/api/admin/site-builder/templates` | Builder template lista (`items[]`: key, címek, leírás, blokkok). | ADMIN |
| `GET` | `/api/admin/site-builder/pages/[id]/revisions` | Oldal revíziók listája (diff/rollback). | ADMIN |
| `POST` | `/api/admin/site-builder/pages/[id]/revisions` | Rollback egy revízióra (`{ revisionId }`), az oldal `draft` státuszra áll. | ADMIN |
| `GET` | `/api/admin/site-builder/publish-queue` | Publish queue lista, esedékes elemek automatikus feldolgozásával. | ADMIN |
| `POST` | `/api/admin/site-builder/publish-queue` | Új publish queue elem (`{ pageId, scheduledFor? }`). | ADMIN |
| `GET` | `/api/admin/site-builder/canary` | `{ allowed: boolean }` – Site Builder V2 canary rollout (`FF_SITE_BUILDER_V2_CANARY` + `FF_SITE_BUILDER_V2_CANARY_ROLLOUT`, felhasználó szerinti hash bucket). | ADMIN |
| `GET` | `/api/admin/feature-flags` | Regisztrált flag lista: `enabled`, `rolloutPercent`, `envVar`, stb. | ADMIN |
| `PATCH` | `/api/admin/feature-flags` | `{ key, enabled? }` és/vagy `{ key, rolloutPercent? }` (canary %). CSRF + staff notify. | ADMIN |
| `GET` | `/api/admin/dependency-risk` | `npm audit` / `npm outdated` összegzés (`.ops/dependency-risk-report.json`, generálás: `npm run ops:dependency-risk`). | ADMIN |
| `GET` | `/api/admin/integrations-health` | `{ item: { smtp, webhooks, publicReadApi } }` — webhook env jelenlét + SMTP konfiguráció jelző + read API aktív-e. | OFFICE vagy ADMIN |
| `POST` | `/api/admin/integrations/smtp-verify` | SMTP `verify()` (kapcsolat ellenőrzés, **nem** küld e-mailt). CSRF same-origin. | ADMIN |

**P8 diszpécser:** `STAFF_NOTIFY_WEBHOOK_URL` (JSON POST), opcionális `STAFF_NOTIFY_EMAIL_ENABLED` + `STAFF_NOTIFY_EMAIL_TO` (meglévő SMTP mezőkkel) – lásd `.env.example`.

## Partner read API — verzió `v1` (Fázis 19)

| Módszer | Útvonal | Leírás | Auth |
|--------|---------|--------|------|
| `GET` | `/api/v1/public/feed` | Publikált hírek + naptáresemények **szűkített** JSON (`apiVersion`, `generatedAt`, `news`, `events`). Rate limit: IP+UA. | `PUBLIC_READ_API_KEY` kötelező: fejléc `X-Hok-Public-Api-Key` vagy `Authorization: Bearer` |

Ha `PUBLIC_READ_API_KEY` nincs beállítva: **404** `public_feed_disabled`. Hibás kulcs: **401**. Részletek: [`integrations-read-api-and-webhooks.md`](./integrations-read-api-and-webhooks.md).

## Operáció / Health (`/api/health`)

| Módszer | Útvonal | Leírás | Auth |
|--------|---------|--------|------|
| `GET` | `/api/health` | Alap health check az üzemeltetéshez: DB ping (`SELECT 1`), egyszerű latencia és timestamp. Sikernél `200` + `{ status: "ok", db: "ok" }`, DB hiba esetén `503` + `{ status: "degraded", db: "error" }`. | Nincs |

**HTML (nem JSON API):** `GET /status` — emberi összefoglaló ugyanebből a health állapotból (Fázis 17, `noindex`); lásd [`synthetic-monitoring.md`](./synthetic-monitoring.md).

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
