# Progress log

Rövid státusz minden lezárt vagy részben lezárt lépésről (master spec §24.1).

---

## 2026-04-28 – Fázis 0 (részben)

- **Mit:** `.gitignore`, `.env.example`, `docs/roadmap.md`, `docs/workflow.md`, `docs/specification.md` (index), progress/decision log indítás, README linkek, lokális **`git init`** és első commit a teljes jelenlegi fájlállapottal.
- **Állapot:** Remote-okat (`origin`, opcionálisan `gitlab`) a fejlesztő adja hozzá a saját URL-jeivel – lépések: `docs/workflow.md`. CI (lint + build) még hátra.
- **Következő lépés:** `git remote add` + `git push -u origin main` (és GitLab, ha külön remote), hogy a CI fusson a távoli repón.

## 2026-04-28 – CI

- **Mit:** GitHub Actions (`ci.yml`) és GitLab CI (`.gitlab-ci.yml`): `npm ci`, `npm run lint`, `npm run build`. ESLint: `eslint.config.mjs`. Buildhez szükséges javítások: `ScrollTopButton` JSX, `CalendarModule` / `GalleryModule` típusok, `ModalHost` összhang az `AppProvider` modal típusával.
- **Állapot:** Lokálisan `npm run build` zöld.
