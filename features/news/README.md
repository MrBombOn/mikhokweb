# News — domain (`features/news`)

Referencia-feature: **típusok + Zod séma + mapper + szerver + opcionális kliens** egy mappában. Új moduloknál ehhez igazodik a bővítés (ahol kell: `schema`, `types`, `mapper` külön fájl).

| Fájl | Szerep |
|------|--------|
| `types.ts` | Domain / API típusok |
| `schema.ts` | Zod séma (create / patch) — importálható route handlerből |
| `mapper.ts` | DB sor → DTO (`newsRowToItem`) |
| `server.ts` | Lista, egy elem, létrehozás, frissítés, soft delete, jogosultság (`canReadNewsItem`, …) |
| `client.ts` | Kliens oldali fetch / util (ahol van) |
| **HTTP** | `app/api/news/route.ts`, `app/api/news/[id]/route.ts` |
| **UI** | `/news` lista: `components/landing/LandingNews.tsx`; cikk: `app/(public)/news/[slug]/page.tsx`; további admin / hír UI: `components/news/` |

Lásd még: `docs/modules/news.md`, `docs/api.md`.
