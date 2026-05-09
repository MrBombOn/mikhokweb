# `features/` — domain réteg index

A **Fázis 4** szerinti *feature-first* elrendezés: ide kerül a **megosztható domain logika** (szerver oldali függvények), amit a vékony `app/api/*` route handlerek hívnak. Minden almappában legyen legalább egy **`README.md`** (rétegek, HTTP útvonalak, UI hely, `lib` hivatkozások).

## Jelenlegi feature mappák

| Mappa | Publikus kapcsolat (tipikus) | HTTP | Fő UI hely |
|--------|------------------------------|------|------------|
| [`about/`](./about/) | `/about` | `app/api/about/*` | `components/modules/about/` |
| [`events/`](./events/) | `/calendar` (események) | `app/api/events/*` | `components/calendar/` |
| [`gallery/`](./gallery/) | `/gallery` | `app/api/gallery/*` | `components/gallery/` |
| [`guides/`](./guides/) | `/guides` | `app/api/guides/*` | `components/guides/` |
| [`news/`](./news/) | `/news`, `/` (landing hír) | `app/api/news/*` | `components/news/` |
| [`office/`](./office/) | `/office` | `app/api/office/*` | `components/office/` |

Referencia-struktúra (típusok + séma + mapper + szerver): [`news/README.md`](./news/README.md).

## Még nincs külön `features/<név>/` mappa

A következők **jelenleg** `lib/`, `app/api/*` és/vagy `app/(public)/*` alatt vannak; későbbi PR-ben lehet ide szervezni a domain réteget (egy modul = egy PR):

| Terület | API / lib | UI |
|---------|-----------|-----|
| Keresés | `app/api/search/route.ts` | `app/(public)/search/SearchPageClient.tsx` |
| Kalkulátor | `app/api/calculator/*`, `lib/` (állapot, formula) | `components/calculator/`, `CalculatorPageClient` |
| Adatvédelem | — (statikus / i18n) | `app/(public)/privacy/PrivacyPageClient.tsx` — [`docs/modules/privacy.md`](../docs/modules/privacy.md) |
| Állapot oldal | `GET /api/health` | `app/(public)/status/` (RSC + `StatusPageClient`) — [`docs/modules/status.md`](../docs/modules/status.md) |
| Site Builder (custom oldalak) | admin + Prisma | `app/(public)/custom/[slug]/page.tsx`, `lib/site-builder/*` |

Részletes „mit hova” táblázat: [`docs/folder-structure.md`](../docs/folder-structure.md).
