# Galéria (Gallery)

## Cél

Képek **rács / mappa / idővonal** nézetben; keresés és mappa szűrés; admin: új elem (demó URL), törlés, mappa szerkesztés stub.

## Útvonal és belépési pontok

| Réteg | Fájl |
|--------|------|
| Route | `app/(public)/gallery/page.tsx` |
| UI | `components/gallery/GalleryModule.tsx` |
| Főoldal | `components/landing/AllModulesStack.tsx` |

## Adat és API

| Művelet | HTTP |
|----------|------|
| Lista | `GET /api/gallery` |
| Elem CRUD (részben demó) | `POST`, `PATCH`, `DELETE /api/gallery/[id]` — szerződés: `docs/api.md` |

**Domain:** `features/gallery/server.ts`.

## Viselkedés röviden

- Nézetváltó + `EmptyState` / `ErrorState` / `Skeleton` (D3 minták).
- **i18n:** `t(lang).gallery`.
- **Stílus:** `styles/modules/gallery.css`.

## Teljesítmény / kép (Fázis 10)

- Külső kép URL: **`next/image`**, ha a host szerepel a [`lib/remote-image-hosts.ts`](../../lib/remote-image-hosts.ts) szabályai között (`next.config.ts` `images.remotePatterns`); egyébként **`<img loading="lazy">`** (biztonságos fallback).
- Kártya thumb: `fill` + `sizes`; modál előnézet: fix méret + `sizes` — részletek: [`lighthouse-baseline.md`](../lighthouse-baseline.md).

## Kapcsolódó dokumentumok

- [`lighthouse-baseline.md`](../lighthouse-baseline.md) — LCP / Lighthouse scope és mérési sablon.
- `docs/design-system.md` — galéria üres állapotok.
- `docs/module-file-responsibility-map.md` — Gallery szekció.
