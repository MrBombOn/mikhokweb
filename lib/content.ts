/**
 * @file Tartalmi és demo adatok központi exportja (`content`)
 *
 * @description
 * A `lib/i18n` kezeli a **statikus szövegeket**; ez a fájl a **mock / demo tartalmat**
 * (hírek, naptár, galéria, kalkulátor kezdőállapot, stb.) aggregálja egy importpont alá,
 * hogy a komponensek `import { … } from '@/lib/content'` formát használhassanak.
 *
 * @szétválasztás_jövőben
 * API + adatbázis bekötésekor ezek a tömbök vagy megszűnnek, vagy „seed” szerepűek
 * maradnak; a típusok (`Semester`) a `@/types`-ból jönnek.
 */
import type { Semester } from '@/types';

/** Szótár és `t()` – lásd `lib/i18n/index.ts`. */
export { dictionary, t, type Messages } from '@/lib/i18n';

/**
 * Főoldali modul-kártyák: `href` + gradiens + HU/EN cím és rövid szöveg.
 * A `LandingHero` / kapcsolódó komponensek iterálnak rajta.
 */
export const landingCards = [
  {
    href: '/calendar',
    cardTone: 'calendar',
    titleHu: 'Naptár',
    titleEn: 'Calendar',
    textHu: 'Események, időrend és tornatermi foglalás.',
    textEn: 'Events, timeline and gym booking.',
  },
  {
    href: '/calculator',
    cardTone: 'calculator',
    titleHu: 'Kalkulátor',
    titleEn: 'Calculator',
    textHu: 'Kreditindex, súlyozott kreditindex és összesített átlag számítása.',
    textEn: 'Credit index, weighted credit index and overall average.',
  },
  {
    href: '/gallery',
    cardTone: 'gallery',
    titleHu: 'Galéria',
    titleEn: 'Gallery',
    textHu: 'Képek, albumok és idővonal nézet.',
    textEn: 'Images, albums and timeline view.',
  },
  {
    href: '/guides',
    cardTone: 'guides',
    titleHu: 'Útmutatók',
    titleEn: 'Guides',
    textHu: 'Dokumentumok és segédanyagok.',
    textEn: 'Documents and support materials.',
  },
  {
    href: '/about',
    cardTone: 'about',
    titleHu: 'Rólunk',
    titleEn: 'About Us',
    textHu: 'A HÖK felépítése és tagjai.',
    textEn: 'Structure and members of the union.',
  },
  {
    href: '/office',
    cardTone: 'office',
    titleHu: 'Iroda',
    titleEn: 'Office',
    textHu: 'Nyitvatartás, ügyintézési állapot és elérhetőség.',
    textEn: 'Opening hours, service status and contact options.',
  },
] as const;

/** Demo hírsor – `LandingNews` és hír modul prototípusok. */
export const newsItems = [
  { id: 1, date: '2026-05-03', category: 'Közélet', titleHu: 'Hallgatói fórum a tavaszi félév végén', titleEn: 'Student forum at the end of spring semester', textHu: 'Nyitott egyeztetés a hallgatói visszajelzésekről és a következő fejlesztési irányokról.', textEn: 'Open discussion about student feedback and the next development directions.' },
  { id: 2, date: '2026-05-06', category: 'Sport', titleHu: 'Tornatermi foglalások új rendszere', titleEn: 'Updated gym booking process', textHu: 'Egyszerűbb kéréskezelés, átláthatóbb admin elfogadással.', textEn: 'Simpler request flow with clearer admin approval.' },
  { id: 3, date: '2026-05-09', category: 'Tanulmányok', titleHu: 'Vizsgaidőszaki segédlet elérhető', titleEn: 'Exam period guide is available', textHu: 'Az útmutatók oldalon új hallgatói anyagok jelentek meg.', textEn: 'New student resources have been published on the guides page.' },
] as const;

/** Naptár események – `CalendarModule` inicializálja belőle a szerkeszthető listát. */
export const calendarItems = [
  { id: 1, date: '2026-05-03', dayLabel: 'Ma', time: '17:00', titleHu: 'Hallgatói fórum', titleEn: 'Student forum', location: 'Aula', category: 'community' },
  { id: 2, date: '2026-05-04', dayLabel: '+1', time: '18:00', titleHu: 'Kosárlabda edzés', titleEn: 'Basketball practice', location: 'Tornaterem', category: 'sport' },
  { id: 3, date: '2026-05-05', dayLabel: '+2', time: '15:00', titleHu: 'Vizsga felkészítő', titleEn: 'Exam preparation', location: 'B305', category: 'study' },
] as const;

/** Kezdeti foglalási kérések – naptár modul admin sorai; mezők bővíthetők (requester, note). */
export const bookingRequests = [
  { id: 1, title: 'Röplabda csapat', slot: '2026-05-07 18:00', status: 'pending' },
  { id: 2, title: 'Kari sportkör', slot: '2026-05-08 19:00', status: 'approved' },
] as const;

/** KKI kalkulátor induló szemeszterei – `CalculatorModule` state inicializálás. */
export const initialSemesters: Semester[] = [
  {
    id: 1,
    name: '2025/26 ősz',
    ghost: false,
    subjects: [
      { id: 11, name: 'Matematika 1', credits: 5, grade: 4, ghost: false },
      { id: 12, name: 'Programozás 1', credits: 6, grade: 5, ghost: false },
      { id: 13, name: 'Fizika', credits: 4, grade: 3, ghost: false },
    ],
  },
  {
    id: 2,
    name: '2025/26 tavasz',
    ghost: false,
    subjects: [
      { id: 21, name: 'Matematika 2', credits: 5, grade: 4, ghost: false },
      { id: 22, name: 'Webfejlesztés', credits: 5, grade: 5, ghost: false },
    ],
  },
];

/** Galéria mappa lista – album nézet szűréshez. */
export const galleryFolders = [
  { id: 1, name: 'Rendezvények' },
  { id: 2, name: 'Sport' },
  { id: 3, name: 'Közélet' },
] as const;

/** Galéria elemek – kártyák metaadatai. */
export const galleryItems = [
  { id: 1, folderId: 1, titleHu: 'Gólyatábor', titleEn: 'Freshers camp', date: '2025-09-12' },
  { id: 2, folderId: 2, titleHu: 'Sportnap', titleEn: 'Sports day', date: '2026-03-20' },
  { id: 3, folderId: 3, titleHu: 'Hallgatói fórum', titleEn: 'Student forum', date: '2026-04-11' },
] as const;

/** Útmutató kártyák – `GuidesModule`. */
export const guideItems = [
  { id: 1, titleHu: 'Kollégiumi ügyintézés', titleEn: 'Dorm administration', textHu: 'Lépésről lépésre összefoglaló kollégiumi ügyekhez.', textEn: 'Step-by-step overview for dormitory administration.' },
  { id: 2, titleHu: 'Neptun alapok', titleEn: 'Neptun basics', textHu: 'Hallgatói ügyintézéshez szükséges alap információk.', textEn: 'Core information for student administration.' },
] as const;

/** About oldal szerepkör kártyák – statikus bemutató. */
export const aboutPeople = [
  { id: 1, name: 'Elnök', roleHu: 'Képviselet és koordináció', roleEn: 'Representation and coordination' },
  { id: 2, name: 'Alelnök', roleHu: 'Belső működés támogatása', roleEn: 'Support of internal operations' },
  { id: 3, name: 'Tanulmányi referens', roleHu: 'Tanulmányi ügyek segítése', roleEn: 'Academic support' },
] as const;

/** Office modul nyitvatartási szöveg – nyelv szerinti kulcs. */
export const officeInfo = {
  hu: 'Hétfőtől csütörtökig 10:00–15:00 között személyesen is elérhető az iroda; pénteki ügyintézéshez előzetes egyeztetés szükséges.',
  en: 'The office is open in person Monday to Thursday, 10:00–15:00; Friday visits are by appointment.',
} as const;
