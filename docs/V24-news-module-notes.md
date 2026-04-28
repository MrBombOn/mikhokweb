# V24.1 hírek modul – javítások és tudnivalók

## 1. Javított build hiba

A build hibát az okozta, hogy a `LandingNews.tsx` fájlban Python-szerű logikai értékek szerepeltek JavaScript helyett.
A hibás értékek:
- `True`
- `False`

JavaScriptben és TypeScriptben helyesen így kell használni őket:
- `true`
- `false`

Ezért a hiba oka ez volt:

```ts
hasCover: True
```

A javított forma:

```ts
hasCover: true
```

## 2. Hírek modulba bekerült további irányok

A hírek modul jelenlegi szerkezete már elő van készítve a következő fejlesztésekhez:
- borítókép kezelés,
- teljes kattintható hírkártyák,
- kiemelt hírblokk,
- részletek modal,
- admin belépési pontok,
- forráskezelés előkészítése,
- archiválás és ütemezés előkészítése.

A következő fejlesztési körökben ide érdemes még beépíteni:
- új hír létrehozása űrlappal,
- meglévő hír szerkesztése valódi mezőkkel,
- státusz módosítás,
- borítókép feltöltés,
- publikálási időpont megadása,
- kategória kezelés,
- külső link hozzárendelése,
- social source adapterek valós bekötése.

## 3. Animációs irányok

A design most már stabil, ezért a következő animációk húzhatók rá úgy, hogy ne bontsák meg az arculatot:
- landing kártyák finom hover-emelése,
- hírkártyák belépő animációi,
- modálok fade + slide nyitása,
- statisztikai blokkok enyhe count-up megjelenése,
- forrásszűrők és selectek finom állapotváltása,
- sticky navbar megjelenésének kisimítása.

Javaslat: ezeket külön animációs rétegben vagy utility osztályokkal érdemes kezelni, ne az üzleti logikába keverve.

## 4. Hol találod a logók cseréjét

A jelenlegi projektben a logó több helyen vizuális blokk vagy egyszerű stíluselem formájában jelenik meg.
A legfontosabb helyek:

### Navbar logó
Fájl:
- `components/layout/Navbar.tsx`

Itt a `brand-logo` elem felel a navbar logó megjelenítéséért.

### Landing hero logó
Fájl:
- `components/landing/LandingHero.tsx`

Itt a `hok-logo-hero` elem a nagy kezdőlapi logóhely.

### Hozzá tartozó stílusok
Fájl:
- `app/globals.css`

Itt találod a következő classokat:
- `.brand-logo`
- `.hok-logo-hero`

## 5. Ha valódi képet szeretnél beszúrni

A Next.js projektben a legegyszerűbb módszer:

1. Tedd a képet a `public/` mappába, például:
- `public/images/logo-navbar.png`
- `public/images/logo-hero.png`

2. Ezután a hivatkozás útvonala így lesz használható:
- `/images/logo-navbar.png`
- `/images/logo-hero.png`

A `public` mappa tartalma a gyökér URL-ről érhető el.[cite:227][cite:212]

## 6. Példa logó csere

### Navbarban
A mostani vizuális blokk helyett használhatsz például sima képet vagy `next/image` komponenst.

Egyszerű példa:

```tsx
<img src="/images/logo-navbar.png" alt="PTE MIK HÖK logó" width={42} height={42} />
```

### Hero részben

```tsx
<img src="/images/logo-hero.png" alt="PTE MIK HÖK nagy logó" width={340} height={340} />
```

A `public` könyvtárból érkező képeket Next.js-ben gyökérútvonalról lehet elérni, például `/images/logo-navbar.png` formában.[cite:227]

## 7. Gyakorlati javaslat

Érdemes külön mappát létrehozni:
- `public/images/branding/`

Például:
- `public/images/branding/logo-navbar.png`
- `public/images/branding/logo-hero.png`
- `public/images/branding/logo-dark.png`
- `public/images/branding/logo-light.png`

Így később a világos és sötét témához is külön logó használható.