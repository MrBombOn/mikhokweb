# PTE MIK HÖK Web

## GitHub repository

A forráskód és a CI a következő repóban van (itt történik a verziókezelés és a publikálás):

**[https://github.com/MrBombOn/mikhokweb](https://github.com/MrBombOn/mikhokweb)**

## Útmutató a fejlesztéshez

- **Git / klónozás (rövid):** [docs/repository.md](./docs/repository.md)
- **Kanonikus spec (docs belépési pont):** [docs/specification.md](./docs/specification.md)
- **Projekt workflow (docs belépési pont):** [docs/project-workflow.md](./docs/project-workflow.md)
- **Haladás / döntések:** [docs/progress-log.md](./docs/progress-log.md), [docs/decision-log.md](./docs/decision-log.md)
- **Teljes dokumentációs index:** [docs/documentation-index.md](./docs/documentation-index.md)

## Gyors indítás

```bash
git clone https://github.com/MrBombOn/mikhokweb.git
cd mikhokweb
# Hozd létre a `.env.local`-t a `.env.example` alapján (DATABASE_URL + AUTH_SECRET).
npm ci
npm run db:migrate
npm run db:seed
npm run dev
```

Belépés: seed után pl. **`admin` / `admin-dev-change-me`** vagy **`office` / `office-dev-change-me`** (lásd `prisma/seed.ts`, élesben cseréld env + seeddel).

További parancsok: `npm run lint`, `npm run build`, `npm run db:studio` (lásd `package.json`). Az adatbázis séma: `prisma/schema.prisma`.

## Hírek modul (rövid)

- Külön modálok új hírhez, szerkesztéshez, adapterekhez, archívumhoz, kategóriákhoz.
- Lokális publish / archive / delete demó logika; később API / adatbázis alá köthető.
