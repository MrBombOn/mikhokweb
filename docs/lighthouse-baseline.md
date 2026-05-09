# Lighthouse baseline (D8 + Fázis 10)

Egyszerű vizuális és **teljesítmény** regresszió checklist. A Fázis 10 után a galéria és a Rólunk avatárok **`next/image`** + [`remotePatterns`](../next.config.ts) alatt futnak (LCP-barátabb külső képek, ahol a host engedélyezett — részletek: [`lib/remote-image-hosts.ts`](../lib/remote-image-hosts.ts)).

## Scope

| Útvonal | Megjegyzés |
|---------|------------|
| `/` | Landing, fő LCP elemek |
| `/news` | Lista |
| `/calendar` | Naptár |
| `/about` | Fázis 10: tag avatárok (`next/image` engedett host esetén) |
| `/gallery` | Fázis 10: kártya thumb + modál előnézet (`fill` / fix méret, `sizes`) |

**CI (LHCI):** a [`lighthouserc.cjs`](../lighthouserc.cjs) **`collect.url`** listája egy kicsit szélesebb (még `/guides`, `/office`, `/privacy`, `/search`) — ugyanaz a **desktop** preset és kategória szűrés. Parancs: `npm run build && npm run lhci` (lásd GitHub Actions `lighthouse` job). A fenti táblázat a **kézi baseline** fókuszt adja; LHCI assert küszöbök: performance ≥0.7, többi ≥0.9.

## Mérési beállítás

- **Chrome** Lighthouse (DevTools → Lighthouse), vagy CLI: `npx lighthouse <url> --only-categories=performance,accessibility,best-practices,seo --preset=desktop` / mobil preset.
- **Profil:** külön **Desktop** és **Mobile** (Lighthouse alapértelmezett viewport).
- **Build:** `npm run build && npm run start` (vagy staging URL); **hard reload** / üres cache ajánlott.
- **Környezet:** Incognito; kiterjesztések kikapcsolva; stabil hálózat.

## Eredmények (kitöltendő)

A táblázatot **merge / release előtt** érdemes frissíteni egy rögzített Chrome verzióval és dátummal. A számok csak **összehasonlítási bázis** (regresszió trigger lentebb).

| Oldal | Profil | Performance | Accessibility | Best Practices | SEO | Megjegyzés |
|-------|--------|-------------|---------------|----------------|-----|------------|
| `/` | desktop | — | — | — | — | Fázis 10 után mérj újra |
| `/` | mobile | — | — | — | — | LCP fókusz |
| `/news` | desktop | — | — | — | — | |
| `/news` | mobile | — | — | — | — | |
| `/calendar` | desktop | — | — | — | — | |
| `/calendar` | mobile | — | — | — | — | |
| `/about` | desktop | — | — | — | — | `next/image` avatárok (engedett host) |
| `/about` | mobile | — | — | — | — | |
| `/gallery` | desktop | — | — | — | — | thumb `fill` + `sizes`, preview 800×520 |
| `/gallery` | mobile | — | — | — | — | |

**Példa kitöltés** (helyettesítsd saját méréssel):

| Oldal | Profil | Performance | A11y | BP | SEO | Megjegyzés |
|-------|--------|-------------|------|----|-----|------------|
| `/gallery` | mobile | *(pl. 78–92)* | *(pl. 96+)* | *(pl. 92+)* | *(pl. 90+)* | Seed `picsum.photos` képekkel |

## Regresszió trigger

- Legalább **10 pont** esés bármelyik kategóriában ugyanazon oldalon/profilon az utolsó rögzített baseline-hoz képest.
- **Accessibility** vagy **SEO** **90** alá esik.
- Új **critical** issue (LCP / CLS / kontraszt / navigáció).

## Fázis 10 technikai összefoglaló

- **`next/image`:** `AboutModule` (62×62, `sizes="62px"`, `loading="lazy"`), `GalleryModule` kártya (`fill`, `sizes`), modál előnézet (800×520 arány, `sizes` a modál szélességéhez).
- **`lib/remote-image-hosts.ts`:** hostlista + `getNextImageRemotePatterns()` → `next.config.ts` `images.remotePatterns`. Ismeretlen host: továbbra is `<img loading="lazy">` (nincs runtime hiba).
- **CSS:** `gallery-card-media-frame` és `gallery-preview-image-wrap` → `position: relative` a `fill` miatt.

---

## DoD — Fázis 10 lezárás

- [ ] **About + Gallery:** külső `imageUrl` esetén `isRemoteImageHostOptimizable()` → `next/image`; egyébként `<img loading="lazy">` + explicit méret / osztály a CLS ellen.
- [ ] **`remotePatterns`:** `next.config.ts` a `getNextImageRemotePatterns()` SSOT-ból; új CDN → `lib/remote-image-hosts.ts` és/vagy `NEXT_PUBLIC_IMAGE_REMOTE_HOSTS` (`.env.example`).
- [ ] **Doksi:** modul oldalak (`docs/modules/about.md`, `gallery.md`) hivatkoznak a képstratégiára; ez a fájl — mérési táblázat merge/release előtt frissítve (Chrome verzió + dátum).
- [ ] **Gate:** `npm run lhci` zöld a CI-ben (vagy lokálisan build + `lhci`); `npm run lint`, `npm run test`, `npm run build` (Fázis 0).

**Mesterütemterv:** [`phased-master-plan.md`](./phased-master-plan.md) → Fázis 10.
