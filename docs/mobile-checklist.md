# Mobil viewport ellenőrző lista (navbar / shell)

**Cél:** a `docs/phased-master-plan.md` **Fázis 7** szerinti smoke teszt **keskeny nézeteken** — elsősorban a fejléc, a landing lebegő vezérlők és a mobil menü.

**Eszköz:** böngésző DevTools (Responsive), vagy valódi készülék. Ellenőrizd sorban a **320px**, **360px**, **390px** és **768px** szélességeket (legalább egy magasság: pl. 640–844).

| Szélesség | Tipikus eszköz / szerep |
|-----------|-------------------------|
| **320px** | keskeny telefon (minimum layout) |
| **360px** | közép Android |
| **390px** | nagy telefon / iPhone logika |
| **768px** | tablet / széles mobil; **980px** határ: desktop `nav-links` vs hamburger (`Navbar.tsx`) |

---

## Közös (minden szélesség)

- [ ] Nincs vízszintes „oldal szintű” scroll a fő tartalomnál (kivéve szándékosan görgethető blokkok).
- [ ] `env(safe-area-inset-top)` miatt a fejléc / vezérlők nem lógnak a notch alá (iOS szimuláció, ha elérhető).

---

## 320px (keskeny telefon)

- [ ] **Landing** (`/`): a jobb felső **nyelv / téma / bejelentkezés** blokk látható, nem fut ki a képernyőről; érinthető (touch target).
- [ ] **Belső oldal**: hamburger megjelenik; megnyitva a panel kitölti a logikát, fókusz / Tab nem „szökik” ki a panelből.
- [ ] Hero / első blokk alatti tartalom nem takarja el véglegesen a lebegő vezérlőket (landing).

## 360px

- [ ] Ugyanaz mint 320px, plusz: gombok között megfelelő távolság (nem fedik egymást).
- [ ] Nyelvváltó (emoji + rövid kód) olvasható.

## 390px (tipikus nagy telefon)

- [ ] Mobil menü panel: linkek és alsó **quick controls** (3 oszlop vagy 1 oszlop <700) rendezett.
- [ ] Admin bejelentkezés modál (ha megnyitod) görgethető és zárható.

## 768px (tablet / széles mobil)

- [ ] **≤980px** ág: desktop `nav-links` elrejtve, hamburger aktív, ha a terv szerint így működik.
- [ ] **>980px** (ha a nézet lehetővé teszi): desktop navbar + linkek megjelennek, nincs duplikált menü.

---

## Gyors útvonalak

- Landing: `/`
- Belső + navbar: pl. `/news`, `/calendar`, `/about`
- Admin modal: belső oldalon admin mód / bejelentkezés (ha van jogosultság)

**SSOT (struktúra):** `styles/components/navbar.css` + `components/layout/Navbar.tsx`. **Topbar ív / flex nav finomítás (V14):** `styles/components/effects-v11-plus.css` (a `app/globals.css` import sorrendje szerint a navbar partial *után* töltődik). **Tokenek / kép méretek:** `styles/design-tokens.css`, `lib/layout/topbar-layout.ts`. **Fókusz-csapda / scroll lock:** `docs/decision-log.md` D-2026-04-28-008; részletes a11y: `docs/a11y-audit.md`.
