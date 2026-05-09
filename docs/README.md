# Dokumentáció – belépési pont

Ez a mappa a **projekt SSOT szöveges** leírásait tartalmazza (spec, architektúra, üzemeltetés, biztonság, modulok).

## Magyar nyelvű teljes térkép

- **[Teljes magyar tartalomjegyzék (címek + leírások + linkek)](./TARTALOMJEGYZEK-MAGYAR.md)** — tagolt fejezetek, modulok, biztonság, üzemeltetés, PDF export útmutató.
- **PDF minden dokumentumhoz:** `npm run docs:pdf` → részletek: [`export/README.md`](./export/README.md)

## Kezdés három lépésben (angol fájlnevek)

1. **Mappa- és kódréteg-felépítés:** [`folder-structure.md`](./folder-structure.md) (mit hova tegyünk: `app/`, `features/`, `components/`, `lib/`).
2. **Teljes doc-tartalomjegyzék:** [`documentation-index.md`](./documentation-index.md) (minden aktív `.md` linkelve, témakör szerint).
3. **Kanonikus termékszabályok:** a gyökér [`../PROJECT_MASTER_SPEC.md`](../PROJECT_MASTER_SPEC.md) (§23 fa + §24 kötelező docok).

## Gyors linkek

| Téma | Fájl |
|------|------|
| API szerződés | [`api.md`](./api.md) |
| Adatbázis / Prisma | [`database.md`](./database.md) |
| RBAC | [`rbac.md`](./rbac.md) |
| Tesztelés (unit + E2E) | [`testing.md`](./testing.md) |
| Lokális demó | [`demo-es-lokal-teszteles-utmutato.md`](./demo-es-lokal-teszteles-utmutato.md) |
| Mesterütemterv (fázisok) | [`phased-master-plan.md`](./phased-master-plan.md) |
| Haladás / döntések | [`progress-log.md`](./progress-log.md), [`decision-log.md`](./decision-log.md) |
| Modulonkénti viselkedés | [`modules/README.md`](./modules/README.md) |
| Üzemeltetés / átadás | [`teljes-modul-keszultseg-es-uzemeltetesi-atadas-2026-05-08.md`](./teljes-modul-keszultseg-es-uzemeltetesi-atadas-2026-05-08.md) |
| Operatív workflow + krónika | [`DOCUMENTATION_PROJECT_WORKFLOW.md`](./DOCUMENTATION_PROJECT_WORKFLOW.md) |

## Almappák

| Mappa | Tartalom |
|-------|----------|
| [`modules/`](./modules/) | Publikus modulok: útvonal, API, belépési fájlok |
| [`checklists/`](./checklists/) | Vázlat / hianylista (nem SSOT; frissítés: phased-master + progress-log) |

A gyökér [`README.md`](../README.md) a klónozás és gyors `npm` parancsok felől vezet ide.
