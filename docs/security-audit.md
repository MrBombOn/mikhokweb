# Security audit

Biztonsági audit jegyzetek a master spec §21 és §25(18) mentén.

## 2026-04-28 – Fázis 13 (első kör)

### Lefedett védelmek

- **Auth/session:** JWT (`jose`), httpOnly session cookie, middleware route-védelem `/admin` alatt. (`secure` süti flag productionban; Playwright E2E HTTP-n: csak `E2E_ALLOW_HTTP_COOKIES=1` a `playwright.config` webServer env-ben — élesben ne állítsd.)
- **Rate limit (login):** memória-alapú fail bucket (`lib/security/login-rate-limit.ts`) – túl sok sikertelen belépés esetén ideiglenes tiltás.
- **CSRF origin/referer check:** `lib/security/csrf.ts`, alkalmazva a cookie-auth state-changing endpointokra (loopback normalizálás: `localhost` ↔ `127.0.0.1` ↔ `::1` azonos porton, E2E / dev zaj csökkentés).
- **RBAC:** szerveroldali role-check az írási műveleteknél (`OFFICE`/`ADMIN`, illetve admin-only útvonalak).
- **Input validáció:** Zod minden fő create/patch/put útvonalon.
- **Audit:** központi helper (`lib/audit/write-audit.ts`) a fő írási tartalom endpointokon: `news`, `events`, `gallery`, `guides`, `about`, `office`, `bookings/[id]`, `calculator/state`, valamint admin `users` és `categories`.

### Alkalmazott CSRF check (fő útvonalak)

- `POST /api/auth/login`
- `DELETE /api/auth/session`
- `POST /api/users`
- `POST /api/categories`
- `PATCH /api/office`
- `POST/PATCH/DELETE /api/news`, `/api/news/[id]`
- `POST/PATCH/DELETE /api/events`, `/api/events/[id]`
- `POST/PATCH/DELETE /api/gallery`, `/api/gallery/[id]`
- `POST/PATCH/DELETE /api/guides`, `/api/guides/[id]`
- `POST/PATCH/DELETE /api/about/members`, `/api/about/members/[id]`
- `PATCH /api/about/narratives/[id]`
- `PUT /api/calculator/state`
- `PATCH /api/bookings/[id]`
- `PATCH /api/admin/feature-flags` (P8)
- `PATCH /api/admin/notifications/[id]`, `POST /api/admin/notifications/mark-all-read` (P8)

### Nyitott tételek (következő kör)

- Egységes, per-route configurable rate-limit (nem csak loginra).
- Audit middleware/adapter a maradék nem-auth írási végpontra (`/api/bookings` nyilvános POST, opcionális `/api/feedback` perzisztens audit).
- Session anomaly logging (pl. gyanús user-agent / burst).
- Restore workflow kritikus entitásokhoz.
- CSRF tokenes stratégia mérlegelése (origin check mellett).

