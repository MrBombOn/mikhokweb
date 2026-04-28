/**
 * @file Statikus UI szövegek magyar és angol nyelven (SSOT)
 *
 * @description
 * Ez a fájl tartalmazza a **navigációs címkéket** (`nav`) és a **közös UI szövegeket**
 * (`common`), amelyeket a `t(lang)` függvény (`lib/i18n/index.ts`) ad vissza.
 *
 * @szerkezet
 * - `hu` / `en`: két párhuzamos fa, **azonos kulcsokkal** – kötelező mindkét nyelvre kitölteni.
 * - `nav`: `Navbar` `Link` feliratai; az `admin` kulcs csak admin módban megjelenő `/admin` linkhez.
 * - `common`: gombok, modál címkék, naptár nézet nevek, stb.
 *
 * @bővítés
 * Modulonkénti szövegek szétválaszthatók: `messages/news.hu.ts` import és spread –
 * egyelőre egy fájlban tartjuk az átláthatóság miatt.
 *
 * @type
 * `as const` – a string literálok szűk típusként inferálódnak (`Messages` típus).
 */
export const messages = {
  hu: {
    brand: 'PTE MIK HÖK',
    nav: {
      news: 'Hírek',
      calendar: 'Naptár',
      calculator: 'KKI kalkulátor',
      gallery: 'Galéria',
      guides: 'Útmutatók',
      about: 'About Us',
      office: 'Office',
      admin: 'Admin',
    },
    common: {
      adminLogin: 'Admin belépés',
      editOn: 'Szerkeszthető mód',
      editOff: 'Szerkesztés lezárása',
      openNews: 'Hírek lenyitása',
      closeNews: 'Hírek elrejtése',
      save: 'Mentés',
      cancel: 'Mégse',
      accept: 'Elfogadás',
      reject: 'Elutasítás',
      timeline: 'Timeline',
      cards: 'Kártya nézet',
      calendar: 'Naptár nézet',
    },
  },
  en: {
    brand: 'PTE MIK HÖK',
    nav: {
      news: 'News',
      calendar: 'Calendar',
      calculator: 'KKI Calculator',
      gallery: 'Gallery',
      guides: 'Guides',
      about: 'About Us',
      office: 'Office',
      admin: 'Admin',
    },
    common: {
      adminLogin: 'Admin login',
      editOn: 'Editable mode',
      editOff: 'Lock editing',
      openNews: 'Open news',
      closeNews: 'Hide news',
      save: 'Save',
      cancel: 'Cancel',
      accept: 'Accept',
      reject: 'Reject',
      timeline: 'Timeline',
      cards: 'Card view',
      calendar: 'Calendar view',
    },
  },
} as const;
