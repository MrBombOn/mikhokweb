# SEO 2.0 – hreflang, canonical, JSON-LD (Fázis 18)

## Nyelv URL stratégia (jelenlegi döntés)

- A HU/EN váltás **ugyanazon az URL-en** történik (`localStorage`, lásd `AppProvider`); **nincs** külön `/en/...` útvonal.
- **`alternates.languages`:** minden publikus oldal meta a [`lib/seo.ts`](../lib/seo.ts) `buildPageMetadata` segítségével **`x-default`** + **`hu-HU`** → ugyan a kanonikus URL (a korábbi `en-US` → ugyanazon URL duplikáció elkerülése).
- **Open Graph:** `alternateLocale: ['en_US']` — társadalmi megosztás jelzi, hogy van angol UI; nem helyettesíti a hreflang logikát.

Ha később bevezetitek a **locale prefix** URL-eket, itt frissíteni kell: `alternates.languages` minden nyelvhez külön abszolút URL.

## Kanonikus és fő route audit

| Útvonal | Meta forrás | JSON-LD |
|---------|-------------|---------|
| `/` | `routeMeta.home` | `WebPage` (`PublicRouteJsonLd`) |
| `/news` | `routeMeta.news` | `CollectionPage` |
| `/news/[slug]` | `generateMetadata` + `plainTextExcerpt` | `NewsArticle` |
| `/calendar`, `/guides`, `/gallery` | `routeMeta.*` | `CollectionPage` |
| `/about`, `/office`, `/privacy`, `/calculator`, `/search` | `routeMeta.*` | `WebPage` |
| `/custom/[slug]` | `generateMetadata` (Builder) | `WebPage` |
| Globális | `app/layout` | `@graph`: `Organization` + `WebSite` + `SearchAction` (`/search?q={search_term_string}`) |

**Mélylink keresés:** `GET /search?q=` — a szerver átadja az `initialQuery`-t a kliensnek (prefill).

## Google Search Console rutin (javasolt)

1. Tulajdon igazolás (`DNS` vagy HTML fájl).
2. **Sitemap:** `https://<domain>/sitemap.xml` beküldése.
3. **Indexelés** → oldalak próba (főoldal, hír lista, egy hír URL, `/search`).
4. **Kézi keresés** / lefedettség: új route-ok deploy után 1–2 hét ellenőrzés.
5. **Core Web Vitals** / mobil használhatóság: Lighthouse CI (`lighthouserc.cjs`) + Search Console összevetés.

## Kapcsolódó

- Általános SEO jegyzet: [`seo-audit.md`](./seo-audit.md)
- Lighthouse URL lista: [`lighthouserc.cjs`](../lighthouserc.cjs)
