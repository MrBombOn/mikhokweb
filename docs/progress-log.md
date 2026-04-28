# Progress log

Rövid státusz minden lezárt vagy részben lezárt lépésről (master spec §24.1).

---

## 2026-04-28 – Fázis 0 (részben)

- **Mit:** `.gitignore`, `.env.example`, `docs/roadmap.md`, `docs/workflow.md`, `docs/specification.md` (index), progress/decision log indítás, README linkek, lokális **`git init`** és első commit a teljes jelenlegi fájlállapottal.
- **Állapot:** Remote-okat (`origin`, opcionálisan `gitlab`) a fejlesztő adja hozzá a saját URL-jeivel – lépések: `docs/workflow.md`. CI (lint + build) még hátra.
- **Következő lépés:** `git remote add` + `git push -u origin main`; utána opcionális GitHub Actions / GitLab CI.
