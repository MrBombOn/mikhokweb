# Design- és SSOT-fókuszú fázisút + mérföldkövek

Ez a dokumentum a **`PROJECT_MASTER_SPEC.md`** alapján készült, és követi a spec **§24** (dokumentáció, progress log, decision log, checkpoint), **§26** (fejlesztési szabályok: SSOT, route = kompozíció, security nem csak kliensen), **§27** (kész állapot), **§31** (frontend UX), **§32** (design rendszer, design-pack, „fancy” UI) elvárásait.

**Nem** helyettesíti a master specot; kiegészíti a **§25** utáni, **vizuális és élménybeli** mélyítést célzó ütemtervet.

---

## Workflow szabályok (rövid, kötelező)

Minden alábbi fázis lezárásakor:

1. **`docs/progress-log.md`** – rövid bejegyzés (mit, állapot, következő lépés).
2. **`docs/decision-log.md`** – ha eltérés van a §30–§32 checklisttől vagy új vizuális konvenció jön (sablon: §24.2).
3. **Checkpoint (§24.3)** – checkpoint ID, érintett fájlok, nyitott kérdések, visszatérési pont.
4. **Sanity** – light + dark + HU + EN; mobil nézet a fő útvonalakon.
5. **SSOT** – új szín/spacing/radius/motion csak `styles/design-tokens.css` (vagy dokumentált hely) + `docs/design-system.md` / `docs/design-pack.md` szinkron.

---

## Recap: mi hiányzik még az „SSOT-fullos, egységes design, animált, élő, mobilkompatibilis, DB-alapú” állapothoz?

### Adat és API (alap már megvan; egységesítés hiányzik)

- **Tartalom-SSOT:** minden publikus modul ugyanazon mintán: `features/<modul>/` (types, schema, server, client) – jelenleg referencia szinten főleg **`news`**; többi modul még `components/` + szétszórt `lib/validation` úton.
- **Kategória-híd:** `Category` modell vs modulokban lévő szabad szöveges `category` mezők – teljes összekötés és UI-szűrő SSOT nélkül fragmentált.
- **Keresés:** globális `/search` aggregáció van; a spec szerinti **indexelt / szervert oldali** keresés és szűrő séma még nincs.
- **Visszajelzés:** `POST /api/feedback` logol – opcionális perzisztencia + office feldolgozási UI később.

### Design rendszer és „élő” felület (§32 – nagy rés hátra)

- **Design token bővítés:** radius/shadow/motion **nevek szerinti** skála (§32.1 #5–7), display vs body tipográfia (#8–9), modulonkénti vizuális szabályok (#17–27) részben vagy egyáltalán nincs kódolva.
- **Design-pack beépítés:** `design-pack/` + `public/brand/` – hero, nav, footer, admin fejléc **következetes** logó- és színhasználat (§32.2–32.3).
- **Egységes primitívek:** skeleton, empty/error state, filter chip, file-card, breadcrumb – shared komponensként (§31 #31–33, #39).
- **Motion:** „lélegző / élő” oldal = **mérsékelt** scroll/hover belépés, staggered kártyák, navbar blur – **§22** `prefers-reduced-motion` mellett; motion tokenek SSOT-ban.
- **Mobil:** teljes képernyős menü + **fókusz-trap + Escape** (a11y audit nyitott pont); hüvelykujj-zónák (§32.1 #33).

### Minőség és üzemeltetés

- CI: **`npm run test`** beépítése (jelenleg gyakran csak lint + build).
- Lighthouse / kontraszt jegyzőkönyv rögzített eredménnyel (`docs/seo-audit.md` kiegészítése vagy külön performance doc).

---

## Új fázisok és mérföldkövek (design + frontend hangsúly)

A számozás a **korábbi belső fázis-számozást** követi logikailag; a master spec **§25** pontjai előrébb vannak lezárva.

### Fázis D1 – Design token audit + „visual contract”

**Cél:** Egy oldalas **vizuális szerződés**: mely tokenek kötelezők minden új képernyőn (surface, radius, shadow, spacing, motion duration).

**Mérföldkövek:**

- [x] `design-tokens.css` kitöltése a §32.1 hiányzó tokenekkel (radius sm–xl, shadow scale, motion).
- [x] `docs/design-system.md` frissítése (vagy létrehozás), hivatkozás a §32.1 táblára.
- [ ] „Nem használható” lista: inline magic number-ek fokozatos kiirtása (top 5 komponens).

**Elfogadás:** legalább 3 fő útvonal (`/`, `/news`, `/calendar`) csak tokenekből építkezik layout szinten.

---

### Fázis D2 – Design-pack integráció (brand jelenlét)

**Cél:** Logó és brand színek **minden fő zónában** (hero, topbar, footer, belső layout fejléc).

**Mérföldkövek:**

- [x] `public/brand/` exportok dokumentált lépéssel (`docs/design-pack.md`).
- [x] `Navbar` / `Footer` / `LandingHero` – választott logóvariánsok + megfelelő `next/image` vagy `<img>` szabály.
- [x] Dark mode logócsere ahol szükséges.

**Elfogadás:** stakeholder vagy progress log „UI proof” bejegyzés §32.3 szerint.

---

### Fázis D3 – Shared UI primitívek és állapotok

**Cél:** Üres, hiba, betöltés, retry – **egységes** komponensek; filter chip SSOT.

**Mérföldkövek:**

- [x] `components/ui/Skeleton*.tsx` (vagy egy komponens, variantokkal) – layout-hű.
- [x] `EmptyState`, `ErrorState` (CTA + retry) – legalább news, gallery, search.
- [x] `FilterChip` – keresés + modul szűrők újrafelhasználása.

**Elfogadás:** `docs/a11y-audit.md` kiegészítés: fókusz és kontraszt ezeken a komponenseken. *(2026-04-28: D3 első kör – `a11y-audit.md` „D3” szakasz.)*

---

### Fázis D4 – „Élő” oldal: motion és mikro-interakció (§32.3 + §22)

**Cél:** Finom belépő animációk, hover/focus, navbar scroll blur – **nem** túlzó, reduced-motion alatt kikapcsolva.

**Mérföldkövek:**

- [x] Motion tokenek: `--motion-duration-*`, `--ease-*`.
- [x] Landing modulgrid / kártyák: `prefers-reduced-motion` alatti viselkedés ellenőrizve.
- [x] Opcionális: intersection observer alapú fade-in (csak ha tokenekkel és a11y OK).

**Elfogadás:** manuális checklist HU/EN + light/dark + reduced motion bekapcsolva. *(Sablon: `docs/a11y-audit.md` „D4” szakasz.)*

---

### Fázis D5 – Mobil-first navigáció és érintés

**Cél:** §31 #36 + a11y audit zárása: mobil menü **akadálymentesen** működik.

**Mérföldkövek:**

- [x] Mobil panel: fókusz-trap, Escape bezárás, visszaállás a hamburgerre.
- [x] Min. 44px érintési célok a kritikus gombokon.
- [x] Scroll lock opció modál/mobil menü alatt (döntés decision logban).

**Elfogadás:** billentyűzetes végigjárás dokumentálva `docs/a11y-audit.md`-ben. *(2026-04-28: D5 szakasz + `Navbar`.)*

---

### Fázis D6 – Modulonkénti vizuális egység (SSOT oldalak)

**Cél:** Minden publikus route **ugyanazt a PageShell + section + card nyelvet** beszélje; modul-specifikus csak a tartalom és a §32.1 modul-sáv szerinti finomhangolás.

**Mérföldkövek:**

- [x] `/news`, `/gallery`, `/guides`, `/about`, `/office`, `/calendar`, `/calculator`, `/search` – vizuális audit táblázat (egységes section header, kártya rádiusz, gomb sorrend). → `docs/ui-audit-d6.md`
- [x] Hír kártyák: dátum / státusz vizuális elkülönítés (§32.1 #20). → `NewsPageList` + `globals.css` `.news-page-card*`
- [x] Office: status-first vizuális hierarchia (§32.1 #26). → `OfficeModule` + `globals.css` `.office-status-*`

**Elfogadás:** egy „UI audit” sor a `progress-log.md`-ben + screenshot vagy leírás opcionálisan. *(2026-04-28: D6 első kör + tokenes stílusok.)*

---

### Fázis D7 – Feature mappa kiterjesztése (design mögötti SSOT)

**Cél:** `events`, `gallery`, `guides` (és szükség szerint `about`, `office`) **`features/`** alá, hogy a route tényleg vékony maradjon (§26, §29.2).

**Mérföldkövek:**

- [x] Sorrend a `decision-log.md`-ben rögzítve (melyik modul következik). → **D-2026-04-28-009**
- [x] API route-ok vékonyítása mint a `news` mintánál. → `features/gallery|guides|events|about|office/server.ts`

**Elfogadás:** minden migrált modulnál `docs/api.md` egy sor frissítés. *(2026-04-28: D7 első kör.)*

---

### Fázis D8 – Polish záró kör és CI

**Cél:** Fenntarthatóság.

**Mérföldkövek:**

- [x] `npm run test` a GitHub Actions + GitLab CI fájlokban.
- [x] Opcionális: egyszerű vizuális regresszió lista (Lighthouse egy oldal export / baseline sablon). → `docs/lighthouse-baseline.md`

---

## Összefoglaló táblázat

| Fázis | Fő hangsúly | Kulcs deliverable |
|-------|----------------|-------------------|
| D1 | Token SSOT | Visual contract + token kit |
| D2 | Brand | design-pack a UI-ban |
| D3 | Állapotok | Skeleton / empty / error |
| D4 | Motion | Élő, de a11y-safe animáció |
| D5 | Mobil | Nav fókusz-trap + touch |
| D6 | Oldalak egysége | Modulonkénti vizuális audit |
| D7 | Kód SSOT | features/* bővítés |
| D8 | CI | teszt a pipeline-ban |

---

## Kapcsolódó kanonikus dokumentumok

- `PROJECT_MASTER_SPEC.md` – §2.1 SSOT, §24–§27, §29–§32  
- `docs/decision-log.md` – eltérések  
- `docs/progress-log.md` – státusz  
- `docs/design-pack.md`, `design-pack/README.md`  
- `docs/a11y-audit.md`, `docs/seo-audit.md`, `docs/search-rules.md`

---

*Utolsó frissítés: a roadmap fájl bevezetése a repóba; konkrét dátumok ütemezéshez a csapat naptárába emelendők.*
