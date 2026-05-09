# Adatvédelem / süti tájékoztató (Privacy)

## Cél

A **privacy** oldal a süti / adatkezelési szöveget mutatja **i18n**-ből (`messages.*.privacyPage`); összhangban a gyökér [`CookieConsentBar`](../global-shell.md) szövegeivel és linkekkel.

## Útvonal és belépési pontok

| Réteg | Fájl |
|--------|------|
| Route | `app/(public)/privacy/page.tsx` |
| UI | `app/(public)/privacy/PrivacyPageClient.tsx` |

## Adat és API

Nincs saját REST modul — statikus / szótár alapú tartalom. A **jogi részletek** és üzemeltetői checklist: `docs/go-live-checklist.md`, `docs/database.md` (adattárolás) ahol releváns.

## Viselkedés röviden

- `PublicPageShell` + `SectionHeader` (eyebrow, cím, lead).
- **SEO:** `PublicRouteJsonLd` a `page.tsx`-ben; metadata: `buildPageMetadataFromMessages('privacy', '/privacy')`.

## Kapcsolódó dokumentumok

- [`global-shell.md`](../global-shell.md) — `CookieConsentBar`, gyökér layout.
- [`folder-structure.md`](../folder-structure.md) — útvonal ↔ réteg táblázat.
