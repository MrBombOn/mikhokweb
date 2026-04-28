# SEO audit notes

## Lefedett alapok (Fázis 19 – első kör)

- Oldalszintű metadata a fő publikus route-okra (`/`, `/news`, `/about`, `/calendar`, `/calculator`, `/gallery`, `/guides`, `/office`).
- Központi SEO helper: `lib/seo.ts` (kanonikus URL + Open Graph alap + nyelvi alternatívák).
- `sitemap.xml` publikus oldalakra fókuszálva (`app/sitemap.ts`), admin route-ok nélkül.
- `robots.txt` beállítva (`app/robots.ts`): admin és API tiltás crawlernek.
- Strukturált adat példa: híroldal `CollectionPage` JSON-LD (`/news`).

## Nyelvi alternatíva stratégia

- A jelenlegi routing egy URL-t használ, ahol a tartalmi nyelv kliensállapotból vált.
- Emiatt a `alternates.languages` jelenleg ugyanarra a kanonikus URL-re mutat HU/EN esetben.
- Ha később külön locale útvonalak jönnek (pl. `/en/news`), ezt a mappinget route-szinten kell szétválasztani.

## Lighthouse SEO alap checklist (javasolt futtatás)

- Fő route-ok: `/`, `/news`, `/calendar`, `/guides`.
- Ellenőrzendő minimum:
  - egyedi `<title>`,
  - `meta description`,
  - indexelhető státusz,
  - működő `robots.txt` és `sitemap.xml`.

