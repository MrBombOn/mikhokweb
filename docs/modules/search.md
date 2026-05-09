# Globális keresés (Search)

## Cél

Egy felületen keresés a **hírek**, **események** és **útmutatók** között; mentett keresések és (admin) egyéni kategóriák `localStorage`-ban; visszajelzés űrlap rate limit mögött.

## Útvonal és belépési pontok

| Réteg | Fájl |
|--------|------|
| Route | `app/(public)/search/page.tsx` |
| UI | `app/(public)/search/SearchPageClient.tsx` |

## Adat és API

| Erőforrás | HTTP |
|-----------|------|
| Index | Párhuzamos `GET /api/news`, `/api/events`, `/api/guides` — mind hibás esetén index hiba állapot |
| Visszajelzés | `POST /api/feedback` — séma: `lib/validation/feedback.ts`; rate limit: `lib/security/feedback-rate-limit.ts` |

**Megjegyzés:** nincs külön `features/search/` — aggregáció a kliensen; a feedback domain a route handlerben és security utilban él.

## Viselkedés röviden

- Szűrés: szabad szöveg + opcionális kategória chipek; eredmény modul badge fordítva (i18n).
- **i18n:** `t(lang).search`, mentés: `common.save`.
- **Stílus:** `search-*` osztályok a globális partialokban (`styles/base.css` / kapcsolódó).

## Kapcsolódó dokumentumok

- `docs/security-walkthrough.md` — feedback rate limit, CSRF kontextus.
- `docs/api.md` — feedback endpoint.
