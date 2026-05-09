# Iroda (Office)

## Cél

**Iroda pillanatkép:** nyitvatartás, jelenlét / ügyintézési állapot, szolgáltatások, gyors infó — egyetlen `GET` + admin `PATCH` (OFFICE / ADMIN).

## Útvonal és belépési pontok

| Réteg | Fájl |
|--------|------|
| Route | `app/(public)/office/page.tsx` — szerver komponens, közvetlenül `OfficeModule` |
| UI | `components/office/OfficeModule.tsx` |
| Főoldal | `components/landing/AllModulesStack.tsx` (iroda kártya) |

## Adat és API

| Művelet | HTTP |
|----------|--------|
| Olvasás | `GET /api/office` |
| Frissítés (admin) | `PATCH /api/office` |

**Domain:** `features/office/server.ts` — `ensureOfficeSnapshot`, `getOfficeSnapshotForRole`, `patchOfficeSnapshot`.

**Demó:** `OfficeModule` a `canUseDemoFallback()` és `lib/content` `officeInfo` felé eshet vissza — részletek: `docs/database.md`, `features/office/README.md`.

## Viselkedés röviden

- **Layout:** status-first hero + részletek rács (`OfficeModule` fejléc komment).
- **Stílus:** főleg `styles/base.css` (`.office-status-*`, `.office-detail-grid`, …).

## Kapcsolódó dokumentumok

- [`features/office/README.md`](../../features/office/README.md)
- `docs/api.md` — office végpont.
