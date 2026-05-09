# Útmutatók (Guides)

## Cél

Útmutató kártyák **keresés + kategória + témakör** szűréssel; részletes szöveg modálban; letöltés link, ha van; admin: demó útmutató létrehozás, törlés.

## Útvonal és belépési pontok

| Réteg | Fájl |
|--------|------|
| Route | `app/(public)/guides/page.tsx` |
| Oldal kliens | `app/(public)/guides/GuidesPageClient.tsx` |
| UI | `components/guides/GuidesModule.tsx` |
| Főoldal | `components/landing/AllModulesStack.tsx` |

## Adat és API

| Művelet | HTTP |
|----------|------|
| Lista | `GET /api/guides` |
| CRUD | `POST`, `PATCH`, `DELETE /api/guides/[id]` |

**Domain:** `features/guides/server.ts`.

## Viselkedés röviden

- `FilterChip` kategóriák, `CustomSelect` témakör (ahol van).
- **i18n:** `t(lang).guides`; demó POST mezők `messages.hu` / `messages.en`.
- **Stílus:** `styles/modules/guides.css`.

## Kapcsolódó dokumentumok

- `docs/api.md` — guides végpontok.
