# PTE MIK HÖK Web

## GitHub repository

A forráskód és a CI a következő repóban van (itt történik a verziókezelés és a publikálás):

**[https://github.com/MrBombOn/mikhokweb](https://github.com/MrBombOn/mikhokweb)**

## Útmutató a fejlesztéshez

- **Dokumentáció hub (itt kezdd):** [docs/README.md](./docs/README.md) · [teljes magyar tartalomjegyzék + PDF útmutató](./docs/TARTALOMJEGYZEK-MAGYAR.md)
- **Git / klónozás (rövid):** [docs/repository.md](./docs/repository.md)
- **Kanonikus spec (docs belépési pont):** [docs/specification.md](./docs/specification.md)
- **Projekt workflow (docs belépési pont):** [docs/project-workflow.md](./docs/project-workflow.md) · [teljes workflow / krónika](./docs/DOCUMENTATION_PROJECT_WORKFLOW.md)
- **Haladás / döntések:** [docs/progress-log.md](./docs/progress-log.md), [docs/decision-log.md](./docs/decision-log.md)
- **Teljes dokumentációs index:** [docs/documentation-index.md](./docs/documentation-index.md)
- **Mappa- és réteg-felépítés:** [docs/folder-structure.md](./docs/folder-structure.md)
- **Lokális demó indítása (lépésről lépésre):** [docs/demo-es-lokal-teszteles-utmutato.md](./docs/demo-es-lokal-teszteles-utmutato.md)

## Gyors indítás

```bash
git clone https://github.com/MrBombOn/mikhokweb.git
cd mikhokweb
# Hozd létre a `.env.local`-t a `.env.example` alapján (DATABASE_URL + AUTH_SECRET).
# A `npm run db:*` parancsok betöltik a `.env.local`-t (lásd `scripts/prisma-env.cjs`).
npm ci
npm run db:migrate
npm run db:seed
npm run dev
```

Belépés: seed után pl. **`admin` / `admin-dev-change-me`** vagy **`office` / `office-dev-change-me`** (lásd `prisma/seed.ts`, élesben cseréld env + seeddel).

További parancsok: `npm run lint`, `npm run build`, `npm run db:studio` (lásd `package.json`). Az adatbázis séma: `prisma/schema.prisma`.

## GUI launcher (Windows)

Általános, több projekthez is használható indító: `launcher/README.md`. Projektprofil a gyökérben: **`web-launcher.json`** (sablon: **`web-launcher.example.json`**). Build: `launcher\build-launcher.bat` → `launcher\dist\WebProjectLauncher.exe`.

## Hírek modul (rövid)

- Külön modálok új hírhez, szerkesztéshez, adapterekhez, archívumhoz, kategóriákhoz.
- Lokális publish / archive / delete demó logika; később API / adatbázis alá köthető.
