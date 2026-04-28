# PTE MIK HÖK Web

## GitHub repository

A forráskód és a CI a következő repóban van (itt történik a verziókezelés és a publikálás):

**[https://github.com/MrBombOn/mikhokweb](https://github.com/MrBombOn/mikhokweb)**

## Útmutató a fejlesztéshez

- **Git / klónozás (rövid):** [docs/repository.md](./docs/repository.md)
- **Kanonikus spec:** [PROJECT_MASTER_SPEC.md](./PROJECT_MASTER_SPEC.md)
- **Projekt workflow, szerkezet, változások:** [DOCUMENTATION_PROJECT_WORKFLOW.md](./DOCUMENTATION_PROJECT_WORKFLOW.md)
- **Haladás / döntések:** [docs/progress-log.md](./docs/progress-log.md), [docs/decision-log.md](./docs/decision-log.md)

## Gyors indítás

```bash
git clone https://github.com/MrBombOn/mikhokweb.git
cd mikhokweb
npm ci
npm run dev
```

További parancsok: `npm run lint`, `npm run build` (lásd `package.json`).

## Hírek modul (rövid)

- Külön modálok új hírhez, szerkesztéshez, adapterekhez, archívumhoz, kategóriákhoz.
- Lokális publish / archive / delete demó logika; később API / adatbázis alá köthető.
