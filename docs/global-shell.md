# Globális UI shell és közös primitívek

Ez a dokumentum a **minden oldalon egyszer importált / megjelenő** réteget írja le: gyökér layout, provider, navigáció, globális overlayek, valamint a leggyakrabban használt `components/ui` elemek és a `data-expandable` szerződés.

**Kapcsolódó:** `docs/architecture.md`, `docs/module-file-responsibility-map.md`, `docs/design-system.md`, `docs/a11y-audit.md`.

---

## 1. Gyökér layout (`app/layout.tsx`)

**Szerverkomponens.** Minden útvonal (`/`, `/calendar`, `/admin`, …) ide ágyazódik; a tényleges oldal a `<main id="main-content">` gyermeke (`children`).

**`<body>` közvetlen gyermekei (DOM sorrend):**

1. **`SeoJsonLd`** (`lib/seo/jsonld.tsx`) — gyökér `@graph` JSON-LD (szerveren `buildRootJsonLdGraph()`).
2. **Opcionális Builder / site design CSS** — ha van cache-elt inline szabály: `<style dangerouslySetInnerHTML={{ __html: designCss }} />` (`getSiteDesignInlineCssCached()`).
3. **`AppProvider`** — az alábbi lista egy csomagban; minden gyerek kliens oldali contexthez fér.

**Az `AppProvider` gyermekei (DOM sorrend):**

1. **`DocumentMetaSync`** — kliens: `document.title` + `meta[name="description"]` a választott nyelv és útvonal szerint (`messages[lang].routeMeta`, lásd fájl fejléc).
2. **`SkipLink`** (`components/layout/SkipLink.tsx`) — szöveg SSOT: `t(lang).internal.skipToContent` (`#main-content`).
3. **`Navbar`** — sticky topbar, publikus linkek + nyelv / téma / belépés.
4. **`main`** — `id="main-content"`; route-specifikus tartalom (`children`).
5. **`Footer`**.
6. **`ToastViewport`** — `aria-live="polite"` toast lista.
7. **`ModalHost`** — `openModal` + `requestConfirm` portál (`createPortal` → `body`); scroll lock: `html` és `body` **`admin-modal-open`** osztály (`admin-modal-scroll-lock.css`).
8. **`AdminLoginModal`** — JWT bejelentkezés / guest (Zod validált űrlap a providerben).
9. **`ScrollTopButton`** — lebegő „lap tetejére” gomb.
10. **`CookieConsentBar`** — süti / hozzájárulás sáv (`localStorage`, `messages.privacyPage`).
11. **`GlobalUiInteractions`** — delegált eseménykezelők (jelenleg: `data-expandable`); **nincs vizuális kimenete** (`return null`).

**Háttér:** halvány futó fotó + gradiens `styles/base.css` (`html::before`, `body`); mozgás `prefers-reduced-motion` alatt kikapcsolva.

Stílus: `app/globals.css` → **`@import` lánc SSOT** (sorrend, a fájl szerint pontosan): `styles/design-tokens.css` → `styles/modules/about.css` → `guides.css` → `gallery.css` → `calculator.css` → `news.css` → `status-public.css` → `admin.css` → `styles/base.css` → `styles/components/landing-news-extras.css` → `navbar.css` → `skeleton-states-toast.css` → `effects-v11-plus.css` → `modal-grid.css` → `admin-login-form.css` → `admin-modal-scroll-lock.css` → `cookie-consent.css` → `styles/modules/calendar.css`. A topbar / nav jel méret tokenjei: `design-tokens.css` (`--layout-nav-brand-mark-size`, stb.); `next/image` intrinsic px: `lib/layout/topbar-layout.ts`. Részletek: `docs/folder-structure.md`, Fázis 2 / 7 a `phased-master-plan.md`-ben.

**Megjegyzés:** `<html lang="hu">` és `data-theme="dark"` a kezdő érték; a kliensen az `AppProvider` szinkronban állítja a `document.documentElement.dataset.theme`-et, valamint a `document.documentElement.lang`-et a választott nyelvhez (`hu` / `en`).

---

## 2. Publikus oldalburkoló: `PublicPageShell`

**Fájl:** `components/layout/PublicPageShell.tsx`

**Szerepe:** a publikus moduloldalakon egységes **max szélesség** és függőleges ritmus: `PageShell` (`app-shell`) + belül `div.public-page-shell`.

**Használat:** a `app/(public)/**` útvonalak és az `app/error.tsx`, `app/not-found.tsx` tipikusan ezt importálják. A főoldal (`HomePageClient`) szintén.

**Nem cseréli le** a gyökér layoutot: csak a `main` belsejében fut, a `Navbar` / `Footer` felett és alatt továbbra is a gyökér layout adja a keretet.

**Belső (`/admin`) útvonalak:** külön `app/(internal)/layout.tsx` — `InternalLayoutHeader` (kompakt fejléc + „Vissza a publikus oldalra”) + `children` + **`AdminWorkspaceChrome`** (`AdminOnboardingWizard`, `AdminCommandPalette`). Itt **nincs** `PublicPageShell`; a gyökér `Navbar` + `Footer` továbbra is látható (a belső layout a `main`-ben bővíti a tartalmat).

---

## 3. `AppProvider` (rövid szerződés)

**Fájl:** `components/layout/AppProvider.tsx` — `'use client'`.

| Terület | Viselkedés röviden |
|--------|---------------------|
| Nyelv / téma | `lang`, `setLang`, `toggleLang`; `theme`, `setTheme`, `toggleTheme`; localStorage (`STORAGE` kulcsok); `html[data-theme]`, `document.documentElement.lang`. |
| Session / szerepkör UI | Mount után `GET /api/auth/session` → `sessionUser`, `isAdmin` (van user), `isStaff` (OFFICE vagy ADMIN), `isAdminRole` (ADMIN szerepkör). |
| Toast | `toast(text, type?)`, `toasts[]`, `removeToast`. |
| Tartalom modál | `openModal` / `closeModal` — szöveg + cím (`ModalHost`). |
| Megerősítés | `requestConfirm(opts)` → `Promise<boolean>`; `resolveConfirm(ok)`; megjelenő állapot: `confirmDialog` (UI: `ModalHost`). |
| Belépés modál | `openAdminLogin` / `closeAdminLogin`, `submitAdminLogin`, `setGuestMode`, űrlap állapot, hibák / pending. |

**Hook:** `useApp()` — csak provider alatt használható; többi layout komponens ebből olvas.

---

## 4. Globális overlay és kiegészítő komponensek

| Komponens | Felelősség |
|-----------|------------|
| `DocumentMetaSync` | Kliens szinkron: böngészőcím és leírás a nyelv + útvonal alapján (kiegészíti a szerver `metadata` exportot). |
| `ToastViewport` | `toasts` mapelése; minden sor kattintható (bezárás). |
| `ModalHost` | `createPortal` → `document.body`; tartalom modál + `alertdialog` megerősítés; Escape + underlay katt; nyitáskor `html`/`body` **`admin-modal-open`** (scroll lock CSS). |
| `AdminLoginModal` | `AdminModal` + űrlap; POST login a provider callbackben. |
| `ScrollTopButton` | `scrollY > 220` után megjelenik; `pte-page-up-control` osztály. |
| `CookieConsentBar` | Süti banner; `localStorage` kulcs; elfogadás után eltűnik. |
| `GlobalUiInteractions` | Lásd §5. |

**Navbar / Footer:** részletes viselkedés (mobil panel, scroll, landing) a komponens fájlok fejlécében és az `docs/a11y-audit.md`-ben; itt csak annyi, hogy **minden route-on** megjelennek a gyökér layout részeként.

---

## 5. `GlobalUiInteractions` és a `data-expandable` szerződés

**Fájl:** `components/layout/GlobalUiInteractions.tsx`

Egyszer fut a gyökérben; **delegált** `click` és `keydown` (Enter / Space) figyelés a `document`-en.

### Szerződés

- A kinyitható blokk gyökere: **`data-expandable="true"`** (string).
- A kinyíló részlet: egy gyerek elem **`[data-expand-details]`** — kezdésben `hidden`, togglekor a script a `hidden` attribútumot állítja.
- A konténeren a **`GlobalUiInteractions`** frissíti: **`data-expanded="true|false"`** és **`aria-expanded="true|false"`** (mindkettő szinkronban). A kezdő **`data-expanded`** a HTML-ben elhagyható; elég a kezdeti **`aria-expanded`** (pl. `false`) a markupban.
- Ha a kattintás belső interaktív elemre esik (`a`, `button`, `input`, `textarea`, `select`, `[role="button"]`) **és** az nem maga a konténer, a toggle **nem** fut (így linkek/gombok működnek a kártyán belül).

### Stílus

- A kártyán legyen **`expand-on-tap`** (globális CSS a `styles/components/effects-v11-plus.css`-ben), hogy kurzor / fókusz illeszkedjen.

### Példa (minta a naptár modulból)

```tsx
<div
  className="card schedule-timeline-row expand-on-tap"
  data-expandable="true"
  role="button"
  tabIndex={0}
  aria-expanded="false"
>
  {/* összefoglaló sor */}
  <div className="tap-details muted-text" data-expand-details hidden>
    {/* részletes tartalom */}
  </div>
</div>
```

A **`Card`** primitív (`components/ui/Core.tsx`) támogatja a `dataExpandable` propot: beállítja a `data-expandable="true"`, `role="button"`, `tabIndex={0}`, kezdeti `aria-expanded="false"` értékeket — a részlet blokkot kézzel kell `data-expand-details` + `hidden`-nel ellátni.

---

## 6. Közös UI: mikor mit használj

| Elem / fájl | Mikor válaszd |
|-------------|----------------|
| **`PageShell`** (`Core.tsx`) | Max szélességű konténer (`app-shell`) — a `PublicPageShell` is ezt használja. |
| **`Card`** | Dobozos tartalom, opcionálisan `strong`, opcionálisan `dataExpandable` + `expand-on-tap` + részlet `data-expand-details`. |
| **`SectionHeader`** | Három soros modulfejléc: eyebrow, cím, lead — marketing / modul oldalak. |
| **`CustomSelect`** | Egységes, stílusolt legördülő (lista `options` + `value` + `onChange`); kötelező **`ariaLabel`** (képernyőolvasó). Kliens komponens — csak ahol kell interakció. |
| **`Icons.tsx`** | Minden **inline SVG** ikon (Sun, Moon, Globe, nyilak, stb.) — `currentColor`, közös stroke; ne hozz be másik ikoncsomagot ugyanerre a célra. |
| **`EmptyState`** | Üres lista / nincs találat — cím + rövid szöveg + opcionális akció. |
| **`ErrorState`** | Hibaállapot blokk (pl. API hiba) — üzenet + opcionális újrapróba. |
| **`Skeleton`** | Betöltés helykitöltő — lista / kártya váz; ne használd tartós tartalom helyett. |
| **`FilterChip`** | Szűrő címke / toggle chip egységes stílussal. |
| **`MotionReveal`** | Opcionális scroll-trigger animáció (wrapper + `data-*` minta a fájl fejlécében). |
| **`AdminModal`** | Admin és modul modálok — fókusz-csapda, Escape, overlay; az `AdminLoginModal` és a többi belső felület ezt építi. |

**Gyökér shell (nem `Core.tsx`, csak layoutban egyszer):**

| Komponens | Mikor / hol |
|-----------|-------------|
| **`DocumentMetaSync`** | Dinamikus `<title>` + meta description nyelvváltáskor; ne másold le modulokba. |
| **`CookieConsentBar`** | Jogi / süti értesítés; szövegek `messages.privacyPage`; ne duplikáld más route-on. |

**Márka:** `BrandMark` (`components/brand/BrandMark.tsx`) — `Navbar`, hero, footer, belső fejléc; **ne** duplikáld a nyers SVG-t ezeken kívül.

---

## 7. Gyökér layout: szöveg és metadata (jelenlegi állapot)

- A **skip link** szövege a **`messages.internal.skipToContent`** ágon van (HU/EN); a **`metadata`** export (`app/layout.tsx`) továbbra is egy **alapértelmezett** (főleg magyar) SEO szöveg — teljes dinamikus metadata a nyelvváltáshoz külön döntés / iteráció.
- A háttér vízjel **kétszer** `next/image` (`unoptimized`) — világos / sötét téma osztályváltással; lásd `layout.tsx`.

---

## 8. Ellenőrző lista (változtatás után)

- Publikus oldal: `PublicPageShell` + `main` görgetés, skip link cél létezik (`#main-content`).
- Toast / modál / belépés / **`requestConfirm`**: smoke teszt light és dark módban.
- Süti sáv: első betöltés / localStorage törlés után megjelenik, elfogadás után eltűnik.
- Ha új **delegált** mintát adsz a `GlobalUiInteractions`-höz: dokumentáld itt és kerüld a dupla listener ütközést.

---

*Utolsó frissítés (2026-05-09): Fázis 3 harmadik kör — `app/layout.tsx` DOM teljes egyezés (`SeoJsonLd`, design `<style>`, `DocumentMetaSync`, `CookieConsentBar`, sorrend); `ModalHost` scroll lock; belső layout `AdminWorkspaceChrome`; `AppProvider` táblázat bővítve.*
