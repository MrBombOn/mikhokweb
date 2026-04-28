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
  { href: '/news', color: 'linear-gradient(135deg,#1a6fd4,#4a9fff)', titleHu: 'Hírek', titleEn: 'News', textHu: 'Hírlista, archívum és keresés.', textEn: 'News list, archive and search.' },
  { href: '/calendar', color: 'linear-gradient(135deg,#2858ff,#567dff)', titleHu: 'Naptár', titleEn: 'Calendar', textHu: 'Programok, idővonal, foglalás.', textEn: 'Programs, timeline and booking.' },
  { href: '/calculator', color: 'linear-gradient(135deg,#0f8f78,#28ba95)', titleHu: 'KKI kalkulátor', titleEn: 'KKI Calculator', textHu: 'KI, KKI, súlyozott átlag.', textEn: 'KI, KKI and weighted average.' },
  { href: '/gallery', color: 'linear-gradient(135deg,#7c49ff,#a06cff)', titleHu: 'Galéria', titleEn: 'Gallery', textHu: 'Mappák, nézetek, feltöltés.', textEn: 'Folders, views and upload.' },
  { href: '/guides', color: 'linear-gradient(135deg,#da7d14,#f2a93c)', titleHu: 'Útmutatók', titleEn: 'Guides', textHu: 'Dokumentumok és segédanyagok.', textEn: 'Documents and support materials.' },
  { href: '/about', color: 'linear-gradient(135deg,#d24b5f,#f07590)', titleHu: 'About Us', titleEn: 'About Us', textHu: 'A HÖK felépítése és tagjai.', textEn: 'Structure and members of the union.' },
  { href: '/office', color: 'linear-gradient(135deg,#305f9f,#4b8de0)', titleHu: 'Office', titleEn: 'Office', textHu: 'Nyitvatartás és ügyintézés.', textEn: 'Office hours and service info.' },
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
      { id: 11, name: 'Matematika 1', credits: 5, grade: 4, completed: true },
      { id: 12, name: 'Programozás 1', credits: 6, grade: 5, completed: true },
      { id: 13, name: 'Fizika', credits: 4, grade: 3, completed: false },
    ],
  },
  {
    id: 2,
    name: '2025/26 tavasz',
    ghost: false,
    subjects: [
      { id: 21, name: 'Matematika 2', credits: 5, grade: 4, completed: true },
      { id: 22, name: 'Webfejlesztés', credits: 5, grade: 5, completed: true },
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
  hu: 'Az iroda hétfőtől csütörtökig 10:00–15:00 között biztosan nyitva tart, pénteken pedig előzetes egyeztetéssel érhető el.',
  en: 'The office is reliably open Monday to Thursday between 10:00 and 15:00, while Friday visits require prior arrangement.',
} as const;
