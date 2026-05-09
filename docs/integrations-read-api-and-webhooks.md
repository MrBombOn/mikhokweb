# Integrációk: partner read API, webhookok, iCal szerződés (§12 Fázis 19)

## Cél

Kiszámítható **külső integráció**: verziózott read végpont, webhook env-ek áttekinthetősége, iCal export változási szabályok, admin **integration health** panel.

## 1) Partner read API (`GET /api/v1/public/feed`)

| Elem | Részlet |
|------|---------|
| **URL** | `GET /api/v1/public/feed` |
| **Auth** | Kötelező env: `PUBLIC_READ_API_KEY` (min. 16 karakter). Fejléc: `X-Hok-Public-Api-Key: <key>` vagy `Authorization: Bearer <key>`. Ha nincs kulcs beállítva, a végpont **404** `public_feed_disabled`. |
| **Válasz** | JSON: `{ apiVersion, generatedAt, news[], events[] }` — csak **publikált** vendég nézet; híreknél **nincs** teljes HTML body (partner adatcsökkentés). |
| **Rate limit** | ~120 kérés / 10 perc / IP+UA (`lib/integrations/public-read-rate-limit.ts`). Túllépés: **429** `rate_limited`. |
| **Verzió** | `apiVersion: "1.0"`. **Breaking** mezőeltávolítás / szemantika változás → új útvonal (`/api/v2/...`) vagy új `apiVersion` + dokumentált migráció. |

**Kulcs rotáció:** állíts új `PUBLIC_READ_API_KEY`-t, frissítsd a partner rendszerét, majd vedd le a régi kulcsot. Ne commitold a kulcsot; csak host secret / CI secret.

## 2) Webhookok (outbound, szerver → partner)

| Env | Modul |
|-----|--------|
| `STAFF_NOTIFY_WEBHOOK_URL` | Staff értesítések (bulk import, audit export, feature flag) |
| `BOOKING_NOTIFY_WEBHOOK_URL` | Új / státusz foglalás |
| `FEEDBACK_NOTIFY_WEBHOOK_URL` | Új visszajelzés |
| `UPLOAD_SCAN_WEBHOOK_URL` | Opcionális feltöltés utáni scan hook |

A payload szerződése a megfelelő `lib/notifications/*` modulokban; változáskor **sémabontás** vagy `eventVersion` mező bevezetése javasolt.

## 3) iCal (`GET /api/events/ics`)

- **Jelenlegi viselkedés:** `text/calendar`, publikált események (vendég nézet), `METHOD:PUBLISH`, `UID:event-{id}@pte-mik-hok`.
- **Breaking change policy:**  
  - **Minor:** új VEVENT mezők, PRODID string finomítás — kompatibilis olvasók.  
  - **Major:** `UID` forma változása, törlés jelzés (`METHOD:CANCEL`), időzóna szemantika — előre **egyeztetett** verzió + dátum; dokumentáld a `CHANGELOG` / `docs/progress-log.md`-ben.

## 4) Admin: integration health

- **Útvonal:** `/admin/integrations`
- **API:** `GET /api/admin/integrations-health` — OFFICE + ADMIN; `{ item: { smtp, webhooks, publicReadApi } }`.
- **SMTP verify:** `POST /api/admin/integrations/smtp-verify` — **csak ADMIN**, CSRF same-origin; `nodemailer.verify()` — **nem küld** e-mailt.

## Kapcsolódó

- Publikus API táblázat: [`api.md`](./api.md)
- SMTP részletek: `.env.example`, `lib/notifications/mailer.ts`
