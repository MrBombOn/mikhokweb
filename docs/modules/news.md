# Hírek (News)

## Cél

Közzétett hírek **listázása** a `/news` útvonalon; a főoldalon bejelentkezés után **szerkesztés / státusz** (OFFICE / ADMIN). A feature mappa a referencia-modell: `types`, `schema`, `mapper`, `server`, `client`.

## Útvonal és belépési pontok

| Réteg | Fájl |
|--------|------|
| Route | `app/(public)/news/page.tsx` |
| Oldal kliens | `app/(public)/news/NewsPageClient.tsx` |
| Lista UI | `components/news/NewsPageList.tsx` |
| Főoldal | `components/landing/` — hír blokk (landing szótár + `news.css` osztályok) |

## Adat és API

| Művelet | HTTP |
|----------|--------|
| Lista (szerepkör szerinti szűrés) | `GET /api/news` |
| Egy elem / frissítés / törlés | `GET`, `PATCH`, `DELETE /api/news/[id]` |
| Létrehozás | `POST /api/news` |

**Domain:** `features/news/` — `server.ts`, `schema.ts`, `mapper.ts`, `types.ts`, `client.ts`.

**Védelem:** írásoknál `getCurrentUser`, `canManageNews`, `enforceSameOrigin` — minta: `docs/security-walkthrough.md` §4–5.

## Viselkedés röviden

- **i18n:** `t(lang).news` és kapcsolódó kulcsok; landing és lista közös szótár minták.
- **Stílus:** `styles/modules/news.css` (import: `app/globals.css`).

## Kapcsolódó dokumentumok

- [`features/news/README.md`](../../features/news/README.md)
- `docs/api.md` — news végpontok.
