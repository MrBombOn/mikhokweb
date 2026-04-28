import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

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
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
