# Rólunk (About)

## Cél

Szervezeti **narratív blokkok** és **tagok** csoportosítva; admin módban demó tag felvétele és tag törlése.

## Útvonal és belépési pontok

| Réteg | Fájl |
|--------|------|
| Route (metadata) | `app/(public)/about/page.tsx` |
| Oldal kliens | `app/(public)/about/AboutPageClient.tsx` → `PublicPageShell` + `AboutModule` |
| UI (Fázis 4 pilot) | `components/modules/about/AboutModule.tsx` |
| Főoldal beágyazás | `components/landing/AllModulesStack.tsx` (ha a felhasználó a „Rólunk” modult választja) |

## Adat és API

| Művelet | HTTP |
|----------|------|
| Lista | `GET /api/about` → narratívák + tagok |
| Új tag (demó) | `POST /api/about/members` |
| Tag törlés | `DELETE /api/about/members/[id]` |
| Narratíva szerkesztés (később) | `PATCH /api/about/narratives/[id]` |

**Domain:** `features/about/server.ts` — route handlerek ide delegálnak.

## Viselkedés röviden

- Első betöltés: `fetchAbout()`; ha hiba és `canUseDemoFallback()` → statikus fallback (`lib/content` + `messages`).
- Tagok **csoportja** a `groupHu` / `groupEn` címke szerint; üres címke → `about.memberGroupDefault` (i18n).
- **i18n:** `t(lang).about`, törlés gomb: `common.delete` — lásd `lib/i18n/messages.ts`.
- **Stílus:** `styles/modules/about.css` (`about-*` osztályok).

## Teljesítmény / kép (Fázis 10)

- Tag **avatár** külső URL-lel: **`next/image`** (62×62, `sizes`, `loading="lazy"`), ha a host optimalizálható — [`lib/remote-image-hosts.ts`](../../lib/remote-image-hosts.ts); egyébként `<img>` ugyanazzal a mérettel és `loading="lazy"`.
- Összefoglaló és mérési lista: [`lighthouse-baseline.md`](../lighthouse-baseline.md).

## Kapcsolódó dokumentumok

- [`lighthouse-baseline.md`](../lighthouse-baseline.md) — `/about` Lighthouse scope.
- `docs/api.md` — about végpontok részletei, ha szerepelnek.
- `docs/module-file-responsibility-map.md` — § About modul.
- `components/modules/about/README.md` — fejlesztői réteg táblázat.
