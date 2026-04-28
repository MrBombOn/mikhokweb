# Decision log

Fontos technikai és design döntések (master spec §24.2). Új bejegyzésnél másold a sablont.

---

## D-2026-04-28-001 – Dokumentáció és előkészület

| Mező | Tartalom |
|------|----------|
| **Téma** | Hol legyen a roadmap és a git útmutató |
| **Alternatívák** | Egyetlen README vs külön `docs/` fájlok |
| **Döntés** | `docs/roadmap.md` (termék + szabályok), `docs/workflow.md` (git/GitHub/GitLab), a gyökér `PROJECT_MASTER_SPEC.md` marad a kanonikus spec |
| **Indoklás** | A master spec §24 kötelező docs fájlneveit fokozatosan töltjük; a roadmap és workflow azonnali munkaindítást támogat |
| **Roadmap-hatás** | Fázis 0 checklist; Fázis 1-től `architecture.md`, `rbac.md` stb. |
| **Érintett fájlok** | `docs/roadmap.md`, `docs/workflow.md`, `docs/progress-log.md`, `docs/decision-log.md`, `docs/specification.md` |

---

## D-2026-04-28-002 – CI platform és Node verzió

| Mező | Tartalom |
|------|----------|
| **Téma** | Hol fusson a lint + build |
| **Alternatívák** | Csak GitHub Actions; csak GitLab CI; mindkettő |
| **Döntés** | **Mindkettő**: `.github/workflows/ci.yml` + `.gitlab-ci.yml`, azonos lépések |
| **Indoklás** | A repóhoz GitHub és GitLab is kapcsolódhat; így bármelyik elsődleges remote mellett azonnali visszajelzés |
| **Roadmap-hatás** | Fázis 0 CI kész; Node verzió változásakor két fájl szinkronban tartása |
| **Érintett fájlok** | `.github/workflows/ci.yml`, `.gitlab-ci.yml`, `docs/workflow.md` |

---

### Sablon (másolás új döntéshez)

```
## D-ÉÉÉÉ-HH-NN-### – Cím

| Mező | Tartalom |
|------|----------|
| **Téma** | |
| **Alternatívák** | |
| **Döntés** | |
| **Indoklás** | |
| **Roadmap-hatás** | |
| **Érintett fájlok** | |
```
