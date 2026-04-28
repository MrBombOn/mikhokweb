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
