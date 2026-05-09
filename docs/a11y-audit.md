# A11y audit

Mobil és akadálymentességi gyorsaudit jegyzetek (spec §22, §25 következő lépéshez).

## 2026-04-28 – Fázis 14 (első kör)

### Bevezetett javítások

- **Skip link** a gyökér layoutban (`Ugrás a tartalomra`), célpont: `#main-content`.
- **Globális fókuszjelölés**: `:focus-visible` outline minden interaktív elemhez.
- **Reduced motion támogatás**: `prefers-reduced-motion: reduce` esetén animáció/transition tiltás + smooth scroll kikapcsolás.
- **Admin űrlapok**: `aria-label` mezők és `role="alert"` hibaszöveg a `/admin/users` és `/admin/categories` oldalon.

## 2026-04-28 – D3 (shared állapot komponensek)

### Bevezetett minták

- **`FilterChip`**: `<button type="button">`, `aria-pressed` a kiválasztott állapotra, `aria-label` a mentett kereséseknél (globális kereső).
- **`ErrorState`**: `role="alert"`, újrapróbálás elsődleges gombbal (`/news` lista, `/search` index).
- **`EmptyState`**: `aria-labelledby` + cím (`h2`), leírás szöveg; kontraszt a `var(--text)` / `var(--muted)` párossal.
- **`Skeleton`**: díszítő `aria-hidden`; `prefers-reduced-motion: reduce` alatt nincs pulzáló animáció (statikus halvány kitöltés).

## 2026-04-28 – D4 (motion + reduced motion)

### Implementált viselkedés

- **Landing:** `animate-fade` / `animate-rise` keyframe-ek `--motion-duration-slow` + `--ease-out` + `--motion-enter-translate-y`; modulrács **IntersectionObserver** (`MotionReveal`) után stagger `--motion-stagger-delay`.
- **`prefers-reduced-motion: reduce`:** animációk és átmenetek kikapcsolva; hero / reveal / kártyák / toast **látható alapállapot**.
- **Navbar:** görgetés után `topbar-scrolled` – erősebb blur; fókusz `:focus-visible` változatlan.

### Manuális ellenőrzőlista (elfogadás)

- [ ] HU / EN szövegek megjelennek, a hero animáció nem takar tartalmat véglegesen.
- [ ] Light + dark téma: topbar olvasható, `topbar-scrolled` nem romlik a kontraszt.
- [ ] OS / böngésző **csökkentett mozgás** bekapcsolva: főoldal modulrács azonnali, nincs „beragadt” átlátszó blokk.
- [ ] Billentyűzet: modul kártyák továbbra is fókuszálható `Link` elemek.

## 2026-04-28 – D5 (mobil navigáció + érintés)

### Bevezetett viselkedés (`Navbar`)

- **Fókusz-csapda:** `Tab` / `Shift+Tab` a `#hok-primary-mobile-nav` panelen belül körbejár; első fókusz a lista első linkje.
- **Escape:** bezárja a panelt (capture fázis), fókusz vissza a **hamburger** gombra.
- **`aria-*`:** nyitott állapotban `role="dialog"`, `aria-modal="true"`, `aria-label` (HU/EN); hamburger `aria-controls` + dinamikus `aria-label` + `aria-expanded`.
- **Scroll lock:** `html` + `body` `overflow: hidden` nyitás alatt – döntés: `docs/decision-log.md` **D-2026-04-28-008**.
- **Érintés:** `.mobile-nav-link` min. magasság `max(48px, var(--touch-target-min))`; `.mobile-quick-controls .btn` legalább `--touch-target-min`.

### Billentyűzetes végigjárás (manuális sablon, ≤980px szélesség)

1. **Tab** a hamburgerre → **Enter / Space** menü nyit.
2. **Tab** sorban végigmegy a nav linkeken, majd a három gyors gombon (nyelv, téma, bejelentkezés).
3. Utolsó gombról **Tab** → fókusz az **első** nav linkre (csapda).
4. **Shift+Tab** az első linkről → utolsó gyors gomb.
5. **Escape** → menü zár, fókusz a hamburgeren.
6. **Linkre kattintás** → menü zár, navigáció (fókusz az új oldalon a böngésző szerint).

### Következő auditpontok

- Színek kontrasztellenőrzése (light/dark) kritikus komponenseken.
- Form mezők vizuális label + leíró szöveg egységesítése.

## 2026-05-09 – Fázis 18 (WCAG backlog dokumentálás)

- **Mit:** ütemezhető manuális WCAG 2.2 checklista és hátralék: [`wcag-phase18-backlog.md`](./wcag-phase18-backlog.md) (a fenti D3–D5 javításokra épül).
- Billentyűzetes végigjárás és tab sorrend ellenőrzése az admin route-okon.
