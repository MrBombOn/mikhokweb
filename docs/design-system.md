# Design system – vizuális szerződés (D1)

Ez a dokumentum a **`PROJECT_MASTER_SPEC.md` §32.1** (design tokenek, radius, árnyék, motion) és a **`styles/design-tokens.css`** SSOT közötti híd. Új felületi kód **innen** veszi a mértékeket; új token = először `design-tokens.css`, majd hivatkozás itt.

---

## 1. Forrásfájlok

| Szerep | Fájl |
|--------|------|
| Token SSOT | `styles/design-tokens.css` |
| Globális layout / osztályok | `app/globals.css` |
| Újrafelhasználható primitívek | `components/ui/Core.tsx` (és további `components/ui/*`) |
| Brand logó (D2) | `components/brand/BrandMark.tsx` + `public/brand/*.svg` + `docs/design-pack.md` |
| Állapot UI (D3) | `components/ui/Skeleton.tsx`, `EmptyState.tsx`, `ErrorState.tsx`, `FilterChip.tsx` + `app/globals.css` (`.skeleton-*`, `.empty-state`, `.error-state`, `.filter-chip`) |
| Motion / reveal (D4) | `components/ui/MotionReveal.tsx`; `app/globals.css` (`.animate-fade`, `.animate-rise`, `.motion-reveal`, `.landing-module-stagger`, `.topbar-scrolled`) |
| Mobil nav (D5) | `components/layout/Navbar.tsx` (`#hok-primary-mobile-nav`, fókusz-csapda, Escape, scroll lock); `docs/decision-log.md` D-2026-04-28-008 |
| Publikus modul oldalak (D6) | `docs/ui-audit-d6.md`; `app/globals.css` (`.news-page-card*`, `.news-pub-date`, `.office-status-*`); `NewsPageList`, `OfficeModule`; `app/(public)/news/page.tsx` (PageShell + section) |

---

## 2. Kötelező token csoportok (§32.1 összhang)

### Színek és felület

`--bg`, `--bg-soft`, `--surface`, `--surface-strong`, `--text`, `--muted`, `--line`, `--primary`, `--primary-strong`, `--accent`, státusz: `--success`, `--warning`, `--danger`, illetve modul színek (`--pink`, `--purple`, `--teal`) ahol releváns.

### Radius (`--radius-*`)

| Token | Tipikus használat |
|-------|-------------------|
| `--radius-xs` | kis chip, kompakt vezérlő |
| `--radius-sm` | gomb, input, skip link |
| `--radius-md` | alap kártya, modális panel |
| `--radius-lg` | nagy kártya, hír lista kártya, modul kártya |
| `--radius-xl` | kiemelt landing blokk (pl. hír felület) |
| `--radius-full` | kör / pill |

### Árnyék (`--shadow-*`)

`--shadow-xs` … `--shadow-xl` – a súly növekszik; erős kiemeléshez `lg` / `xl`. Dark theme alatt ugyanezek a nevek, sötétített értékekkel.

### Spacing (`--space-*`, 4px rács)

`--space-1` = 4px … `--space-16` = 64px, plusz `--space-20`, `--space-25` (100px) nagy layout távolságokhoz. **Új** margin / padding / gap értékekhez először a legközelebbi token; ha egyedi „42px” kell, **szemantikus** layout token (`--layout-*`), ne nyers szám a komponensben.

### Motion (`--motion-duration-*`, `--ease-*`, `--transition`)

| Token | Érték / szerep |
|-------|----------------|
| `--motion-duration-fast` | 120ms – finom hover |
| `--motion-duration-base` | 180ms – alap átmenet |
| `--motion-duration-slow` | 280ms – nagyobb mozgás |
| `--ease-standard`, `--ease-out`, `--ease-in-out` | görbe |
| `--transition` | rövid forma: `var(--motion-duration-base) var(--ease-standard)` |
| `--motion-enter-translate-y` | belépő `translateY` (px) – hero / reveal |
| `--motion-stagger-delay` | modul kártyák egymás utáni késleltetése |

**D4 viselkedés:** `prefers-reduced-motion: reduce` esetén a globális blokk kikapcsolja az animációkat és **azonnal látható** állapotba teszi a `.animate-*`, `.motion-reveal` és a staggerelt modul kártyákat; a toast is. A `MotionReveal` `useLayoutEffect`-ben olvassa a reduced-motion médiát, hogy ne villanjon be üres állapot. A topbar **`topbar-scrolled`** osztállyal erősödik a blur / háttér görgetés után (finom, tokenes `transition` a `.topbar`-on).

### Layout és érintés

| Token | Jelentés |
|-------|----------|
| `--layout-max-width` | fő tartalom max szélesség |
| `--layout-shell-gutter` | vízszintes „befoglaló” (pl. `calc(100% - gutter)`) |
| `--layout-main-pad-bottom` | `main` alsó padding (lebegő FAB miatt) |
| `--layout-section-padding-y` | `.section` függőleges ritmus |
| `--layout-fab-edge` | jobb alsó FAB távolság a széltől |
| `--touch-target-min` | minimum érintési cél (44px) |
| `--touch-target-fab` | lebegő gomb méret (56px) |

---

## 3. Szabályok („nem szerződés szerinti” minták)

1. **Ne** írj új **nyers px** értékeket spacing / radius / shadow / tipikus motion célra **inline** React `style`-ban vagy szórakozó helyi CSS-ben – használj `var(--…)`-t vagy bővítsd a globális osztályt (`globals.css`).
2. **Színek** és felületi tokenek: ne duplikáld hex/rgba-t komponensekben; kivétel: **brand / modul** egyedi gradiens (pl. modul kártya háttér), ahol a token csak kiegészít (pl. `var(--surface)` mellett).
3. **Új token** csak `design-tokens.css`-ben, egy sor magyarázattal; ez a fájl frissül dark módban is (`html[data-theme='dark']`).
4. **Fő útvonalak** (`/`, `/news`, `/calendar`): layout szinten a fenti tokenek + `PageShell` / `SectionHeader` / `Card` – részletes komponens-szintű audit folyamatban (D1 „top 5” kiirtás).

---

## 4. Elfogadás (D1 roadmap)

- [x] Token skála: radius xs–xl, shadow xs–xl, spacing, motion, layout FAB.
- [x] `docs/design-system.md` (ez a dokumentum) + §32.1 hivatkozás.
- [ ] Inline magic number-ek fokozatos kiirtása a legnagyobb komponensekben (`LandingNews` bő része még inline grid/gap).

---

## 5. További olvasmány

- `docs/design-and-ssot-phase-roadmap.md` – D1–D6 ütemterv.
- `docs/ui-audit-d6.md` – D6 publikus útvonalak vizuális audit (§32.1 #20 hír meta, #26 Office status-first).
- `PROJECT_MASTER_SPEC.md` §31–§32 – UX és design rendszer részletek.
