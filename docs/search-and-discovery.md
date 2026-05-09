# Keresés és tartalomfeltárás (§12 Fázis 14)

## Központi index

- **`SearchDocument`** tábla: minden **publikált** hír, naptáresemény és útmutató egy sora (`module` + `entityId` egyedi).
- **`searchBlob`**: kisbetűs, több mezőből összerakott szöveg (hír: cím + szöveg + kategória + szerző; útmutató: `searchableText` + cím + excerpt + body + kategória/topic/kulcsszavak; esemény: cím + jegyzet + hely + kategória + dátum/idő).
- Szinkron: hír / útmutató / esemény **létrehozás és frissítés** után (`features/news|guides|events/server.ts`); törlésnél (`deleted` vagy nem `published`) sor törlése az indexből.
- Teljes újraépítés: `npm run ops:rebuild-search-index` (pl. import vagy migráció után). A **`prisma/seed.ts`** a seed végén meghívja a rebuildet.

## Publikus API

- **`GET /api/search?q=...&categories=a,b`** – szerveroldali keresés; `categories` vesszővel elválasztott lista (opcionális).
- **`GET /api/search?facets=1`** – kategória facetek az indexből (`{ categories: string[] }`), rate limit nélkül.
- **Rate limit**: IP + User-Agent kulcs, ~90 kérés / 10 perc (vendég túlforgatás ellen). Válasz: `429` + `{ error: "rate_limited" }`.

**Globális kereső UI (Fázis 18):** a `/search` oldal a `?q=` paramétert előtölti a keresőmezőbe (SEO `SearchAction` és külső linkek összhang); lásd [`seo-hreflang-jsonld-phase18.md`](./seo-hreflang-jsonld-phase18.md).

## Analytics (anonim)

- **`SearchQueryStat`**: `day` (UTC `YYYY-MM-DD`) + `queryNormalized` (max 120 karakter, trim, kisbetű, `@` minták kiszűrve).
- **`GET /api/admin/search-analytics?days=14`** – OFFICE/ADMIN, CSRF same-origin; top lekérdezések és nulla találat súly szerint.
- UI: **`/admin/search-analytics`**.

## Opcionális: hasonló címek

- **`GET /api/admin/search/similar?q=...`** – OFFICE/ADMIN; a `SearchDocument` index alapján rövid részszöveg-egyezés (nem LLM).

## Éles PostgreSQL / FTS

A jelenlegi implementáció **egységes `contains` / `LIKE`** illesztést használ a `searchBlob` mezőn (SQLite fejlesztői mód + egyszerű éles út). Később ugyanez a tábla támaszként cserélhető **Postgres `tsvector` / külső keresőmotorra** (`lib/search/execute-search.ts`).
