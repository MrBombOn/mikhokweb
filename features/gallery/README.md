# Gallery — domain (`features/gallery`)

**Galéria** mappák és elemek — lista, elem létrehozás / szerkesztés / soft delete.

| Réteg | Hely |
|--------|------|
| **Domain** | `server.ts` — `listGalleryForRole`, `createGalleryItem`, get / patch / soft delete, `parseGalleryItemId` |
| **HTTP** | `app/api/gallery/route.ts`, `app/api/gallery/[id]/route.ts` |
| **UI** | `components/gallery/`, `app/(public)/gallery/` |
| **Validáció** | `lib/validation/gallery` |
| **Mapper** | `lib/mappers/gallery` |

Lásd még: `docs/modules/gallery.md`.
