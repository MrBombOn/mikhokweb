# Teljesítmény, skálázás, CDN (§12 Fázis 13)

## Összkép

- A publikus modulok jelentős része **kliens oldali fetch**-sel tölt (`useEffect` → REST). A **gyökérlayout** Builder design CSS-e **`unstable_cache`** mögött van (300 s, `revalidateTag` design PATCH után) — kevesebb sorozatos DB olvasás élesben.
- **Lighthouse gate:** `lighthouserc.cjs` — performance / a11y / best-practices / SEO küszöbök CI-ben.
- **`next/image`:** `lib/remote-image-hosts.ts` + `NEXT_PUBLIC_IMAGE_REMOTE_HOSTS` (éles CDN / objektumtár hostok) — build újra szükséges a pattern bővítéshez.

## PostgreSQL (éles) — Prisma

- **Connection string:** `DATABASE_URL=postgresql://user:pass@host:5432/db?schema=public`
- **Kapcsolatszám:** dedikált Node szerveren tipikusan `connection_limit` a query stringben (pl. `?connection_limit=10`) — értékét a host CPU / PgBouncer / párhuzamos instance száma szerint állítsd.
- **PgBouncer / pooler:** serverless vagy sok rövid életű konténer esetén transaction pooling + Prisma `directUrl` / `datasource` beállítások a Prisma dokumentáció szerint.
- **Index audit:** `schema.prisma` `@@index` direktívák; élesben futtasd `EXPLAIN ANALYZE`-t a legforgalmasabb listákra (`audit`, `news`, `guides` keresés, stb.).
- **Lassú lekérdezések:** Postgres `log_min_duration_statement`, vagy APM; korreláld az `x-request-id` fejléccel (`docs/incident-debug.md`).

## SQLite (fejlesztés / CI)

- Egyszerű, fájlalapú; skálázás nem cél. Élesben migrálj Postgresre ugyanazzal a sémával.

## Cache / ISR

- **Design CSS:** `getSiteDesignInlineCssCached` — tag: `site-design-css`; invalidálás: `PATCH /api/admin/site-builder/design`.
- **További ISR:** ha egy route tiszta szerverkomponens + `fetch(..., { next: { revalidate: N }})`, bevezethető route szintű `revalidate`. A jelenlegi app sok **client** modult használ — részletes route-táblázat a `docs/modules/README.md` és az egyes `*PageClient.tsx` fájlok alapján.
- **CDN a statikum előtt:** `/_next/static` és `public/` kiszolgálása reverse proxy / CDN-en — hosszú `Cache-Control` a buildelt assetekre (Next alapértelmezés); `public/uploads` élesben érdemes objektumtár + dedikált domain (lásd §12 Fázis 15).

## Performance budget (ajánlott célértékek)

| Metrika | Cél (indikatív) | Megjegyzés |
|--------|------------------|------------|
| LCP (desktop, LHCI) | Lighthouse performance ≥ 0.7 | `lighthouserc.cjs` |
| TTI / TBT | Trend csökkenő | Profilozás: Chrome Performance |
| API p95 | &lt; 300 ms (egyszerű listák) | Host + DB függő |
| Build idő | CI-ben stabil | `npm run build` |

## Kapcsolódó

- `docs/scheduled-health-routine.md` — rendszerellenőrzés
- `docs/incident-debug.md` — requestId
- `lib/remote-image-hosts.ts`, `next.config.ts`
