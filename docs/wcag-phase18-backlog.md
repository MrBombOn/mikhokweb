# WCAG 2.0 / 2.2 – Fázis 18 hátralék és manuális audit

## Már a kódban (referencia)

- Skip link → `#main-content` (`SkipLink`, `app/layout.tsx`).
- `:focus-visible` minták (`styles/base.css`, modul CSS-ek).
- `prefers-reduced-motion` (`styles/base.css`, motion komponensek).
- Űrlap / lista: `role="alert"`, `aria-pressed`, `EmptyState` / `ErrorState` minták — részletek: [`a11y-audit.md`](./a11y-audit.md).

## Manuális ellenőrzőlista (ütemezendő)

Javasolt eszköz: axe DevTools + billentyűzet-only + Windows **Narrátor** vagy macOS **VoiceOver**.

- [ ] **1.4.3 Kontraszt:** light + dark téma; fő gombok, linkek, `muted` szöveg olvashatósága.
- [ ] **2.4.7 Fókusz láthatóság:** minden interaktív elem tab sorrendben; nincs „eltűnt” fókusz modálban.
- [ ] **3.3.1 / 3.3.3 Űrlap hibák:** kereső, visszajelzés, foglalás — hibaüzenet + mező asszociáció (`aria-describedby` ahol hiányzik).
- [ ] **1.3.1 Szemantika:** fő tartalom `h1` egy oldalon; modulok `h2` hierarchia.
- [ ] **2.4.4 Link célok:** „tovább”, „itt” helyett értelmes link szöveg (HU/EN).
- [ ] **4.1.2 Név, szerep, érték:** custom select, filter chip, mobil menü — frissített állapot jelzése.

## Kimenet

Ez a lista a **Fázis 18** „WCAG célzott audit + backlog” tétel dokumentált megfelelője; a pipák kitöltése üzemeltetői / QA feladat.
