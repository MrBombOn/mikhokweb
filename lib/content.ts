import type { Lang, Semester } from '@/types';
export const dictionary = {
  hu: {
    brand: 'PTE MIK HÖK',
    nav: { calendar: 'Naptár', calculator: 'KKI kalkulátor', gallery: 'Galéria', guides: 'Útmutatók', about: 'About Us', office: 'Office' },
    common: { adminLogin: 'Admin belépés', editOn: 'Szerkeszthető mód', editOff: 'Szerkesztés lezárása', openNews: 'Hírek lenyitása', closeNews: 'Hírek elrejtése', save: 'Mentés', cancel: 'Mégse', accept: 'Elfogadás', reject: 'Elutasítás', timeline: 'Timeline', cards: 'Kártya nézet', calendar: 'Naptár nézet' }
  },
  en: {
    brand: 'PTE MIK HÖK',
    nav: { calendar: 'Calendar', calculator: 'KKI Calculator', gallery: 'Gallery', guides: 'Guides', about: 'About Us', office: 'Office' },
    common: { adminLogin: 'Admin login', editOn: 'Editable mode', editOff: 'Lock editing', openNews: 'Open news', closeNews: 'Hide news', save: 'Save', cancel: 'Cancel', accept: 'Accept', reject: 'Reject', timeline: 'Timeline', cards: 'Card view', calendar: 'Calendar view' }
  }
} as const;
export const landingCards = [
  { href: '/calendar', color: 'linear-gradient(135deg,#2858ff,#567dff)', titleHu: 'Naptár', titleEn: 'Calendar', textHu: 'Programok, idővonal, foglalás.', textEn: 'Programs, timeline and booking.' },
  { href: '/calculator', color: 'linear-gradient(135deg,#0f8f78,#28ba95)', titleHu: 'KKI kalkulátor', titleEn: 'KKI Calculator', textHu: 'KI, KKI, súlyozott átlag.', textEn: 'KI, KKI and weighted average.' },
  { href: '/gallery', color: 'linear-gradient(135deg,#7c49ff,#a06cff)', titleHu: 'Galéria', titleEn: 'Gallery', textHu: 'Mappák, nézetek, feltöltés.', textEn: 'Folders, views and upload.' },
  { href: '/guides', color: 'linear-gradient(135deg,#da7d14,#f2a93c)', titleHu: 'Útmutatók', titleEn: 'Guides', textHu: 'Dokumentumok és segédanyagok.', textEn: 'Documents and support materials.' },
  { href: '/about', color: 'linear-gradient(135deg,#d24b5f,#f07590)', titleHu: 'About Us', titleEn: 'About Us', textHu: 'A HÖK felépítése és tagjai.', textEn: 'Structure and members of the union.' },
  { href: '/office', color: 'linear-gradient(135deg,#305f9f,#4b8de0)', titleHu: 'Office', titleEn: 'Office', textHu: 'Nyitvatartás és ügyintézés.', textEn: 'Office hours and service info.' }
] as const;
export const newsItems = [
  { id: 1, date: '2026-05-03', category: 'Közélet', titleHu: 'Hallgatói fórum a tavaszi félév végén', titleEn: 'Student forum at the end of spring semester', textHu: 'Nyitott egyeztetés a hallgatói visszajelzésekről és a következő fejlesztési irányokról.', textEn: 'Open discussion about student feedback and the next development directions.' },
  { id: 2, date: '2026-05-06', category: 'Sport', titleHu: 'Tornatermi foglalások új rendszere', titleEn: 'Updated gym booking process', textHu: 'Egyszerűbb kéréskezelés, átláthatóbb admin elfogadással.', textEn: 'Simpler request flow with clearer admin approval.' },
  { id: 3, date: '2026-05-09', category: 'Tanulmányok', titleHu: 'Vizsgaidőszaki segédlet elérhető', titleEn: 'Exam period guide is available', textHu: 'Az útmutatók oldalon új hallgatói anyagok jelentek meg.', textEn: 'New student resources have been published on the guides page.' }
] as const;
export const calendarItems = [
  { id: 1, date: '2026-05-03', dayLabel: 'Ma', time: '17:00', titleHu: 'Hallgatói fórum', titleEn: 'Student forum', location: 'Aula', category: 'community' },
  { id: 2, date: '2026-05-04', dayLabel: '+1', time: '18:00', titleHu: 'Kosárlabda edzés', titleEn: 'Basketball practice', location: 'Tornaterem', category: 'sport' },
  { id: 3, date: '2026-05-05', dayLabel: '+2', time: '15:00', titleHu: 'Vizsga felkészítő', titleEn: 'Exam preparation', location: 'B305', category: 'study' }
] as const;
export const bookingRequests = [
  { id: 1, title: 'Röplabda csapat', slot: '2026-05-07 18:00', status: 'pending' },
  { id: 2, title: 'Kari sportkör', slot: '2026-05-08 19:00', status: 'approved' }
] as const;
export const initialSemesters: Semester[] = [
  { id: 1, name: '2025/26 ősz', ghost: false, subjects: [
    { id: 11, name: 'Matematika 1', credits: 5, grade: 4, completed: true },
    { id: 12, name: 'Programozás 1', credits: 6, grade: 5, completed: true },
    { id: 13, name: 'Fizika', credits: 4, grade: 3, completed: false }
  ]},
  { id: 2, name: '2025/26 tavasz', ghost: false, subjects: [
    { id: 21, name: 'Matematika 2', credits: 5, grade: 4, completed: true },
    { id: 22, name: 'Webfejlesztés', credits: 5, grade: 5, completed: true }
  ]}
];
export const galleryFolders = [
  { id: 1, name: 'Rendezvények' },
  { id: 2, name: 'Sport' },
  { id: 3, name: 'Közélet' }
] as const;
export const galleryItems = [
  { id: 1, folderId: 1, titleHu: 'Gólyatábor', titleEn: 'Freshers camp', date: '2025-09-12' },
  { id: 2, folderId: 2, titleHu: 'Sportnap', titleEn: 'Sports day', date: '2026-03-20' },
  { id: 3, folderId: 3, titleHu: 'Hallgatói fórum', titleEn: 'Student forum', date: '2026-04-11' }
] as const;
export const guideItems = [
  { id: 1, titleHu: 'Kollégiumi ügyintézés', titleEn: 'Dorm administration', textHu: 'Lépésről lépésre összefoglaló kollégiumi ügyekhez.', textEn: 'Step-by-step overview for dormitory administration.' },
  { id: 2, titleHu: 'Neptun alapok', titleEn: 'Neptun basics', textHu: 'Hallgatói ügyintézéshez szükséges alap információk.', textEn: 'Core information for student administration.' }
] as const;
export const aboutPeople = [
  { id: 1, name: 'Elnök', roleHu: 'Képviselet és koordináció', roleEn: 'Representation and coordination' },
  { id: 2, name: 'Alelnök', roleHu: 'Belső működés támogatása', roleEn: 'Support of internal operations' },
  { id: 3, name: 'Tanulmányi referens', roleHu: 'Tanulmányi ügyek segítése', roleEn: 'Academic support' }
] as const;
export const officeInfo = {
  hu: 'Az iroda hétfőtől csütörtökig 10:00–15:00 között biztosan nyitva tart, pénteken pedig előzetes egyeztetéssel érhető el.',
  en: 'The office is reliably open Monday to Thursday between 10:00 and 15:00, while Friday visits require prior arrangement.'
} as const;
export function t(lang: Lang) { return dictionary[lang]; }