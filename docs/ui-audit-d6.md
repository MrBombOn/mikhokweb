# D6 – Publikus route-ok vizuális audit (SSOT oldalnyelv)

Cél: **`PageShell` (`app-shell`) + `section` + `SectionHeader` / `Card`** egységes használata a fő modul útvonalakon (roadmap D6, spec §32.1).

**Ellenőrzés dátuma:** 2026-04-28 (kód + layout; screenshot opcionális).

| Útvonal | `PageShell` | Külső `section` | `SectionHeader` helye | Kártya / rádiusz megjegyzés | D6 módosítás |
|---------|---------------|------------------|-------------------------|-----------------------------|---------------|
| `/news` | Igen (page) | Igen | `news/page.tsx` | Lista: `Card` token rádiusz (`globals` `.news-page-card`) | PageShell bevezetve; meta sor dátum / címke elkülönítve |
| `/gallery` | Igen | Modulban `section` | `GalleryModule` | Toolbar `card`, `Card` komponens | Megfelel |
| `/guides` | Igen | Modulban `section` | `GuidesModule` | `Card` + `grid-2` | Megfelel |
| `/about` | Igen | Modulban `section` | `AboutModule` | Kártyák modulon belül | Megfelel |
| `/office` | Igen | Modulban `section` | `OfficeModule` | `Card` / `Card strong` | Státusz-first hero kártya |
| `/calendar` | Igen | Kliens / modul | `CalendarModule` | Naptár `card` minták | Megfelel |
| `/calculator` | Igen | Modulban `section` | `CalculatorModule` | Kártyák | Megfelel |
| `/search` | Igen | `SearchPageClient` `section` | `SectionHeader` kliensen | Kereső `card` | Megfelel |

## Gomb / CTA sorrend (ajánlott minta)

- Elsődleges: **egy** `btn-primary` soronként / blokkban.
- Másodlagos: `btn-secondary`, tertiary: `btn-ghost`.
- Modulonként a **„Részletek / Megnyitás”** maradjon a vizuálisan domináns CTA, admin műveletek `btn-ghost`.

## §32.1 lefedettség (D6 mérföldkövek)

| # | Téma | Státusz |
|---|------|---------|
| #20 | Hír kártyák: dátum / meta elkülönítés | `NewsPageList` + `.news-pub-date`, `.news-meta-chips` |
| #26 | Office: status-first hierarchia | `OfficeModule` + `.office-status-hero` |

## Következő lépés

- D7: `features/` alá modul migráció (roadmap).
- Vizuális regresszió: Lighthouse / screenshot opcionális (D8).
