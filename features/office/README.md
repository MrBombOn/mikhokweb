# Office — domain (`features/office`)

Egysoros **iroda / ügyfélfogadás** pillanatkép (nyitvatartás, jelenlét, szolgáltatások). `ensureOfficeSnapshot` biztosítja az alap sort.

| Réteg | Hely |
|--------|------|
| **Domain** | `server.ts` — `getOfficeSnapshotForRole`, `patchOfficeSnapshot`, `ensureOfficeSnapshot` |
| **HTTP** | `app/api/office/route.ts` |
| **UI** | `components/office/` (route: `app/(public)/office/`) |
| **Validáció** | `lib/validation/about` (`patchOfficeSnapshotSchema`) |
| **Mapper** | `lib/mappers/about` (`officeSnapshotToDto`) |

Lásd még: `docs/module-file-responsibility-map.md` (iroda / office útvonal).
