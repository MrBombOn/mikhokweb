# KKI / KI kalkulátor (Calculator)

## Cél

Szemeszterek és tárgyak **súlyozott átlaga**, KI és KKI összefoglalók; ghost tárgyak kizárása a számításból.

## Útvonal és belépési pontok

| Réteg | Fájl |
|--------|------|
| Route | `app/(public)/calculator/page.tsx` |
| Oldal kliens | `app/(public)/calculator/CalculatorPageClient.tsx` |
| UI | `components/calculator/CalculatorModule.tsx` |
| Főoldal | `components/landing/AllModulesStack.tsx` |

## Adat és API

| Művelet | HTTP / logika |
|----------|----------------|
| Állapot (belépve) | `GET` / `PUT /api/calculator/state` — OFFICE/ADMIN; részletek `docs/api.md` |
| Számítás | Kliensen `lib/calculator/compute.ts` (`computeSummary`, `subjectsExcludingGhost`) — teszt: `tests/calculator.compute.test.ts` |

## Viselkedés röviden

- Szemeszterek listája, tárgy sorok (kredit, jegy), ghost kapcsoló.
- Sticky összefoglaló sáv és modul-specifikus layout: **`styles/modules/calculator.css`** (Fázis 2; import: `app/globals.css`).
- **localStorage vs szerver:** vendég csak lokális; bejelentkezve szerver felülírhatja a betöltést, PUT szinkron — részletes táblázat: **`docs/database.md` §4**.

## Kapcsolódó dokumentumok

- `docs/testing.md` — kalkulátor unit tesztek.
- `docs/api.md` — calculator state API, ha dokumentálva.
