# About — domain (`features/about`)

Szerver oldali CRUD és listázás a **Rólunk** tartalomhoz (narratívák, tagok). Az HTTP réteg vékony: `app/api/about/*` hívja a `server.ts` exportjait.

| Réteg | Hely |
|--------|------|
| **Domain** | `server.ts` — `listAboutPayloadForRole`, narratíva/tag CRUD, ID parse |
| **HTTP** | `app/api/about/route.ts`, `app/api/about/members/*`, `app/api/about/narratives/*` |
| **UI** | `components/modules/about/AboutModule.tsx` |
| **Validáció** | `lib/validation/about` |
| **Mapper** | `lib/mappers/about` |
| **Típusok (DTO)** | `types/about.ts` |

Lásd még: `docs/modules/about.md`, `components/modules/about/README.md`.
