# Guides — domain (`features/guides`)

**Útmutató** dokumentumok listázása és admin CRUD (Guide modell).

| Réteg | Hely |
|--------|------|
| **Domain** | `server.ts` — `listGuidesForRole`, create / get / patch / soft delete, `parseGuideId`, `normalizeCreateGuideDocument` |
| **HTTP** | `app/api/guides/route.ts`, `app/api/guides/[id]/route.ts` |
| **UI** | `components/guides/`, `app/(public)/guides/` |
| **Validáció** | `lib/validation/guides` |
| **Mapper** | `lib/mappers/guides` |

Lásd még: `docs/modules/guides.md`.
