# KKI kalkulátor – szabályok és képletek

A §12.3 szerinti rögzítés; a tényleges implementáció: `lib/calculator/compute.ts`.

## Adatmodell (UI / API)

- **Félév (`Semester`)**: `id`, `name`, `ghost` (ghost félévek **kimaradnak** az összesítésből), `subjects[]`.
- **Tárgy (`SemesterSubject`)**: `id`, `name`, `credits` (kredit), `grade` (1–5), `completed` (teljesített-e).

## Ghost mód

- Ha `ghost === true`, a félév **egy tárgya sem** számít bele a KI / súlyozott / KKI / kreditösszegekbe.
- A félév neve továbbra szerkeszthető (pl. tervezett félév jelölés).

## Képletek (nem ghost tárgyak együttes halmaza: `S`)

1. **Felvett kredit (összesen)**  
   `totalRegistered = Σ_{s ∈ S} s.credits`

2. **Teljesített kredit**  
   `totalCompleted = Σ_{s ∈ S, s.completed} s.credits`

3. **Súlyozott átlag**  
   Ha `totalRegistered = 0` → `weighted = 0`.  
   Egyébként: `weighted = (Σ_{s ∈ S} s.credits × s.grade) / totalRegistered`

4. **KI (teljesítési arány kreditben)**  
   Ha `totalRegistered = 0` → `ki = 0`.  
   Egyébként: `ki = totalCompleted / totalRegistered`

5. **KKI**  
   `kki = weighted × ki`

## Megjelenítés

- A UI a fenti értékeket általában **2 tizedesre** kerekíti (`formatSummaryDisplay`).

## Edge case-ek

- Üres félévlista → minden összeg 0.
- Csak ghost félévek → `S` üres → minden összeg 0.
- Negatív vagy nem egész kredit / jegy: a **validáció** (`lib/validation/calculator.ts`) és az űrlap `type="number"` korlátozza; a domain réteg nem javít csendben.

## Export

- JSON export a kliensen: `lib/calculator/export.ts` – tartalmazza a `semesters` tömböt és meta (`exportedAt`, `lang`, `version`).

## Mentés

- **Vendég / mindenki**: böngésző `localStorage` (`CalculatorModule` kulcs).
- **Bejelentkezett OFFICE/ADMIN**: opcionálisan `GET`/`PUT /api/calculator/state` – egy rekord / felhasználó (`CalculatorState`).
