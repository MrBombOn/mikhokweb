import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { rebuildSearchIndex } from '@/lib/search/rebuild-index';

const prisma = new PrismaClient();

async function main() {
  const username = (process.env.SEED_ADMIN_USERNAME || 'admin').trim();
  const password = process.env.SEED_ADMIN_PASSWORD || 'admin-dev-change-me';
  const hash = await bcrypt.hash(password, 12);
  await prisma.user.upsert({
    where: { username },
    create: { username, passwordHash: hash, role: 'ADMIN' },
    update: { passwordHash: hash, role: 'ADMIN' },
  });
  const officeUser = (process.env.SEED_OFFICE_USERNAME || 'office').trim();
  const officePass = process.env.SEED_OFFICE_PASSWORD || 'office-dev-change-me';
  const officeHash = await bcrypt.hash(officePass, 12);
  await prisma.user.upsert({
    where: { username: officeUser },
    create: { username: officeUser, passwordHash: officeHash, role: 'OFFICE' },
    update: { passwordHash: officeHash, role: 'OFFICE' },
  });

  const seedNews = [
    {
      id: 1,
      source: 'internal' as const,
      category: 'Közélet',
      status: 'published' as const,
      pinned: true,
      listDate: '2026-04-12',
      titleHu: 'Tavaszi kari fórum',
      titleEn: 'Spring faculty forum',
      textHu: 'A HÖK fórumot szervez a hallgatói visszajelzések összegyűjtésére.',
      textEn: 'The student union organizes a forum to gather student feedback.',
      author: 'MIK HÖK',
      cover: 'blue',
      hasCover: true,
      slug: 'tavaszi-kari-forum',
      coverAltHu: 'Hallgatók a kari fórumon',
      coverAltEn: 'Students at the faculty forum',
      scheduledFor: null as string | null,
      externalUrl: null as string | null,
    },
    {
      id: 2,
      source: 'facebook' as const,
      category: 'Közösség',
      status: 'published' as const,
      pinned: false,
      listDate: '2026-04-10',
      titleHu: 'Facebook bejegyzés: közösségi program',
      titleEn: 'Facebook post: community event',
      textHu: 'Közösségi program ajánló a hivatalos Facebook kommunikációból.',
      textEn: 'Community event highlight coming from the official Facebook communication.',
      author: 'Facebook feed',
      cover: 'pink',
      hasCover: true,
      slug: 'facebook-bejegyzes-kozossegi-program',
      coverAltHu: 'Közösségi program illusztráció',
      coverAltEn: 'Community program illustration',
      scheduledFor: null as string | null,
      externalUrl: 'https://facebook.com',
    },
    {
      id: 3,
      source: 'instagram' as const,
      category: 'Képek',
      status: 'published' as const,
      pinned: false,
      listDate: '2026-04-09',
      titleHu: 'Instagram feed: eseményfotók',
      titleEn: 'Instagram feed: event photos',
      textHu: 'Instagram poszt alapú képes összefoglaló a legutóbbi eseményről.',
      textEn: 'Instagram-based visual recap of the most recent event.',
      author: 'Instagram feed',
      cover: 'pink',
      hasCover: true,
      slug: 'instagram-feed-esemenyfotok',
      coverAltHu: 'Esemény fotó összefoglaló',
      coverAltEn: 'Event photo recap',
      scheduledFor: null as string | null,
      externalUrl: 'https://instagram.com',
    },
  ];

  for (const n of seedNews) {
    await prisma.news.upsert({
      where: { id: n.id },
      create: n,
      update: {
        source: n.source,
        category: n.category,
        status: n.status,
        pinned: n.pinned,
        listDate: n.listDate,
        titleHu: n.titleHu,
        titleEn: n.titleEn,
        textHu: n.textHu,
        textEn: n.textEn,
        author: n.author,
        cover: n.cover,
        hasCover: n.hasCover,
        slug: n.slug,
        coverAltHu: n.coverAltHu,
        coverAltEn: n.coverAltEn,
        scheduledFor: n.scheduledFor,
        externalUrl: n.externalUrl,
      },
    });
  }

  const seedEvents = [
    {
      id: 1,
      titleHu: 'Hallgatói fórum',
      titleEn: 'Student forum',
      eventDate: '2026-05-03',
      time: '17:00',
      location: 'Aula',
      category: 'community',
      dayLabel: 'Ma',
      note: null as string | null,
      status: 'published' as const,
    },
    {
      id: 2,
      titleHu: 'Kosárlabda edzés',
      titleEn: 'Basketball practice',
      eventDate: '2026-05-04',
      time: '18:00',
      location: 'Tornaterem',
      category: 'sport',
      dayLabel: '+1',
      note: null as string | null,
      status: 'published' as const,
    },
    {
      id: 3,
      titleHu: 'Vizsga felkészítő',
      titleEn: 'Exam preparation',
      eventDate: '2026-05-05',
      time: '15:00',
      location: 'B305',
      category: 'study',
      dayLabel: '+2',
      note: null as string | null,
      status: 'published' as const,
    },
  ];

  for (const e of seedEvents) {
    await prisma.calendarEvent.upsert({
      where: { id: e.id },
      create: e,
      update: {
        titleHu: e.titleHu,
        titleEn: e.titleEn,
        eventDate: e.eventDate,
        time: e.time,
        location: e.location,
        category: e.category,
        dayLabel: e.dayLabel,
        note: e.note,
        status: e.status,
      },
    });
  }

  const seedBookings = [
    {
      id: 1,
      title: 'Röplabda csapat',
      applicantName: 'Röplabda csapat',
      email: 'volleyball@example.invalid',
      organization: null as string | null,
      bookingDate: '2026-05-07',
      startTime: '18:00',
      endTime: '20:00',
      purpose: 'Edzés',
      status: 'pending' as const,
    },
    {
      id: 2,
      title: 'Kari sportkör',
      applicantName: 'Kari sportkör',
      email: 'sportkor@example.invalid',
      organization: null as string | null,
      bookingDate: '2026-05-08',
      startTime: '19:00',
      endTime: '21:00',
      purpose: 'Közösségi program',
      status: 'approved' as const,
    },
  ];

  for (const b of seedBookings) {
    await prisma.gymBooking.upsert({
      where: { id: b.id },
      create: b,
      update: {
        title: b.title,
        applicantName: b.applicantName,
        email: b.email,
        organization: b.organization,
        bookingDate: b.bookingDate,
        startTime: b.startTime,
        endTime: b.endTime,
        purpose: b.purpose,
        status: b.status,
      },
    });
  }

  const seedGalleryFolders = [
    { id: 1, name: 'Rendezvények', sortOrder: 0 },
    { id: 2, name: 'Sport', sortOrder: 1 },
    { id: 3, name: 'Közélet', sortOrder: 2 },
  ];
  for (const f of seedGalleryFolders) {
    await prisma.galleryFolder.upsert({
      where: { id: f.id },
      create: f,
      update: { name: f.name, sortOrder: f.sortOrder },
    });
  }

  const seedGalleryItems = [
    {
      id: 1,
      folderId: 1,
      titleHu: 'Gólyatábor',
      titleEn: 'Freshers camp',
      listDate: '2025-09-12',
      imageUrl: 'https://picsum.photos/seed/gallery-mik-1/800/520',
      status: 'published' as const,
      sortOrder: 0,
    },
    {
      id: 2,
      folderId: 2,
      titleHu: 'Sportnap',
      titleEn: 'Sports day',
      listDate: '2026-03-20',
      imageUrl: 'https://picsum.photos/seed/gallery-mik-2/800/520',
      status: 'published' as const,
      sortOrder: 0,
    },
    {
      id: 3,
      folderId: 3,
      titleHu: 'Hallgatói fórum',
      titleEn: 'Student forum',
      listDate: '2026-04-11',
      imageUrl: 'https://picsum.photos/seed/gallery-mik-3/800/520',
      status: 'published' as const,
      sortOrder: 0,
    },
  ];
  for (const it of seedGalleryItems) {
    await prisma.galleryItem.upsert({
      where: { id: it.id },
      create: it,
      update: {
        folderId: it.folderId,
        titleHu: it.titleHu,
        titleEn: it.titleEn,
        listDate: it.listDate,
        imageUrl: it.imageUrl,
        status: it.status,
        sortOrder: it.sortOrder,
      },
    });
  }

  const seedGuides = [
    {
      id: 1,
      titleHu: 'Kollégiumi ügyintézés',
      titleEn: 'Dorm administration',
      excerptHu: 'Lépésről lépésre összefoglaló kollégiumi ügyekhez.',
      excerptEn: 'Step-by-step overview for dormitory administration.',
      bodyHu:
        'Részletes kollégiumi ügyintézés: igénylés, dokumentumok, határidők. A teljes tartalom a HÖK irodában vagy a belső wiki-n érhető el.',
      bodyEn:
        'Detailed dorm administration: application, documents, deadlines. Full content is available at the union office or internal wiki.',
      category: 'Kollégium',
      topic: 'Ügyintézés',
      keywords: 'kollégium,szoba,igénylés',
      documentUrl: null as string | null,
      documentType: null as string | null,
      listDate: '2026-04-01',
      status: 'published' as const,
    },
    {
      id: 2,
      titleHu: 'Neptun alapok',
      titleEn: 'Neptun basics',
      excerptHu: 'Hallgatói ügyintézéshez szükséges alap információk.',
      excerptEn: 'Core information for student administration.',
      bodyHu:
        'Bejelentkezés, tárgyfelvétel, indexkövetés – rövid áttekintés. A hivatalos Neptun súgó és a tanulmányi iroda az elsődleges forrás.',
      bodyEn:
        'Login, course registration, grade tracking – short overview. The official Neptun help and the academic office are the primary sources.',
      category: 'Hallgató',
      topic: 'Neptun',
      keywords: 'neptun,tárgyfelvétel,index',
      documentUrl: null as string | null,
      documentType: null as string | null,
      listDate: '2026-04-05',
      status: 'published' as const,
    },
  ];
  for (const g of seedGuides) {
    await prisma.guide.upsert({
      where: { id: g.id },
      create: g,
      update: {
        titleHu: g.titleHu,
        titleEn: g.titleEn,
        excerptHu: g.excerptHu,
        excerptEn: g.excerptEn,
        bodyHu: g.bodyHu,
        bodyEn: g.bodyEn,
        category: g.category,
        topic: g.topic,
        keywords: g.keywords,
        documentUrl: g.documentUrl,
        documentType: g.documentType,
        listDate: g.listDate,
        status: g.status,
      },
    });
  }

  const seedAboutNarratives = [
    {
      blockKey: 'intro',
      titleHu: 'Részletesebb HÖK bemutatkozó oldal',
      titleEn: 'A richer HÖK introduction page',
      bodyHu:
        'Az About Us oldal a szervezet felépítését, szerepköreit és azt mutatja meg, kihez érdemes fordulni különböző ügyekben. A tartalom Office módban szerkeszthető (§15).',
      bodyEn:
        'The About page explains the union structure, roles, and who to contact for different topics. Content is editable in Office mode (§15).',
      sortOrder: 0,
      status: 'published' as const,
    },
    {
      blockKey: 'organization',
      titleHu: 'Szervezeti felépítés',
      titleEn: 'Organizational structure',
      bodyHu:
        'A vezetői és képviselői struktúra külön blokkban, áttekinthető kártyákkal jelenik meg. A hierarchia: elnökség, alelnökök, referátumok és képviselők.',
      bodyEn:
        'Leadership and representative structure appears in dedicated blocks with clear cards: board, vice roles, desks, and delegates.',
      sortOrder: 1,
      status: 'published' as const,
    },
    {
      blockKey: 'history',
      titleHu: 'Történeti áttekintés',
      titleEn: 'Historical overview',
      bodyHu:
        'A korábbi évek és tagság bemutatása rövid idővonal-szerű szöveggel bővíthető; a seed csak helyőrző szöveget ad.',
      bodyEn:
        'Past years and membership can be expanded with a short timeline-style text; the seed provides placeholder copy only.',
      sortOrder: 2,
      status: 'published' as const,
    },
    {
      blockKey: 'contact',
      titleHu: 'Kihez forduljak?',
      titleEn: 'Who should I contact?',
      bodyHu:
        'Tanulmányi ügyekben a tanulmányi referenshez, kollégiumi kérdésekben a megfelelő referálushoz, általános információért az irodához érdemes fordulni.',
      bodyEn:
        'For academic matters contact the academic delegate; for dorm topics the relevant desk; for general information the office is the first stop.',
      sortOrder: 3,
      status: 'published' as const,
    },
  ];
  for (const n of seedAboutNarratives) {
    await prisma.aboutNarrative.upsert({
      where: { blockKey: n.blockKey },
      create: n,
      update: {
        titleHu: n.titleHu,
        titleEn: n.titleEn,
        bodyHu: n.bodyHu,
        bodyEn: n.bodyEn,
        sortOrder: n.sortOrder,
        status: n.status,
      },
    });
  }

  const seedAboutMembers = [
    {
      id: 1,
      name: 'Elnök',
      roleHu: 'Képviselet és koordináció',
      roleEn: 'Representation and coordination',
      bioHu: 'A HÖK külső és belső képviseletének összefogása, stratégiai egyeztetés.',
      bioEn: 'Coordinates external and internal representation and strategy.',
      groupHu: 'Elnökség',
      groupEn: 'Board',
      imageUrl: '',
      sortOrder: 0,
      status: 'published' as const,
    },
    {
      id: 2,
      name: 'Alelnök',
      roleHu: 'Belső működés támogatása',
      roleEn: 'Support of internal operations',
      bioHu: 'Operatív feladatok, eseményszervezés és belső kommunikáció támogatása.',
      bioEn: 'Supports operations, events, and internal communication.',
      groupHu: 'Elnökség',
      groupEn: 'Board',
      imageUrl: '',
      sortOrder: 1,
      status: 'published' as const,
    },
    {
      id: 3,
      name: 'Tanulmányi referens',
      roleHu: 'Tanulmányi ügyek segítése',
      roleEn: 'Academic support',
      bioHu: 'Neptun, index, tárgyfelvétel és tanulmányi fellebbezések első kontakt pontja.',
      bioEn: 'First contact for Neptun, grades, registration, and academic appeals.',
      groupHu: 'Referátumok',
      groupEn: 'Desks',
      imageUrl: '',
      sortOrder: 2,
      status: 'published' as const,
    },
  ];
  for (const m of seedAboutMembers) {
    await prisma.aboutMember.upsert({
      where: { id: m.id },
      create: m,
      update: {
        name: m.name,
        roleHu: m.roleHu,
        roleEn: m.roleEn,
        bioHu: m.bioHu,
        bioEn: m.bioEn,
        groupHu: m.groupHu,
        groupEn: m.groupEn,
        imageUrl: m.imageUrl,
        sortOrder: m.sortOrder,
        status: m.status,
      },
    });
  }

  await prisma.officeSnapshot.upsert({
    where: { id: 1 },
    create: {
      id: 1,
      openingHoursHu: 'Hétfő-csütörtök: 10:00-16:00, péntek: egyeztetéssel.',
      openingHoursEn: 'Monday-Thursday: 10:00-16:00, Friday by appointment.',
      presentNowHu: 'Ügyfélfogadás alatt legalább egy office tag bent tartózkodik.',
      presentNowEn: 'At least one office member is available during service hours.',
      serviceStatusHu: 'A hallgatói ügyintézés aktív.',
      serviceStatusEn: 'Student administration is active.',
      servicesInfoHu: 'Tanulmányi, kollégiumi és általános információs ügyekben nyújtunk segítséget.',
      servicesInfoEn: 'We support academic, dormitory, and general information requests.',
      nfcInfoHu: 'NFC alapú jelenlétkezelés előkészítve, későbbi automatizációhoz.',
      nfcInfoEn: 'NFC-based presence tracking is prepared for future automation.',
      quickInfoHu: 'Sürgős ügy esetén e-mail tárgyban jelezd: SÜRGŐS.',
      quickInfoEn: 'For urgent issues include URGENT in the email subject.',
      status: 'published',
    },
    update: {
      openingHoursHu: 'Hétfő-csütörtök: 10:00-16:00, péntek: egyeztetéssel.',
      openingHoursEn: 'Monday-Thursday: 10:00-16:00, Friday by appointment.',
      presentNowHu: 'Ügyfélfogadás alatt legalább egy office tag bent tartózkodik.',
      presentNowEn: 'At least one office member is available during service hours.',
      serviceStatusHu: 'A hallgatói ügyintézés aktív.',
      serviceStatusEn: 'Student administration is active.',
      servicesInfoHu: 'Tanulmányi, kollégiumi és általános információs ügyekben nyújtunk segítséget.',
      servicesInfoEn: 'We support academic, dormitory, and general information requests.',
      nfcInfoHu: 'NFC alapú jelenlétkezelés előkészítve, későbbi automatizációhoz.',
      nfcInfoEn: 'NFC-based presence tracking is prepared for future automation.',
      quickInfoHu: 'Sürgős ügy esetén e-mail tárgyban jelezd: SÜRGŐS.',
      quickInfoEn: 'For urgent issues include URGENT in the email subject.',
      status: 'published',
    },
  });

  const seedCategories = [
    { id: 1, scope: 'news' as const, nameHu: 'Közélet', nameEn: 'Public affairs', sortOrder: 0, status: 'published' as const },
    { id: 2, scope: 'events' as const, nameHu: 'Szakmai', nameEn: 'Professional', sortOrder: 0, status: 'published' as const },
    { id: 3, scope: 'gallery' as const, nameHu: 'Rendezvények', nameEn: 'Events', sortOrder: 0, status: 'published' as const },
    { id: 4, scope: 'guides' as const, nameHu: 'Hallgatói ügyek', nameEn: 'Student affairs', sortOrder: 0, status: 'published' as const },
    { id: 5, scope: 'office' as const, nameHu: 'Ügyintézés', nameEn: 'Administration', sortOrder: 0, status: 'published' as const },
  ];
  for (const c of seedCategories) {
    await prisma.category.upsert({
      where: { id: c.id },
      create: c,
      update: {
        scope: c.scope,
        nameHu: c.nameHu,
        nameEn: c.nameEn,
        sortOrder: c.sortOrder,
        status: c.status,
      },
    });
  }

  const admin = await prisma.user.findUnique({ where: { username } });
  if (admin) {
    await prisma.auditLog.create({
      data: {
        actorId: admin.id,
        actorName: admin.username,
        actorRole: admin.role,
        action: 'seed_phase11_admin',
        entityType: 'system',
        entityId: 'phase11',
        details: 'Users/Categories/Audit admin baseline seeded.',
      },
    });
  }

  await rebuildSearchIndex();
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
