/**
 * @file Admin – Prisma táblák sorainak száma (GET, OFFICE/ADMIN, same-origin).
 */
import { prisma } from '@/lib/db';
import { DB_OVERVIEW_GROUP_LABELS, type DbOverviewTable } from '@/lib/admin/db-overview';
import { canManageNews, getCurrentUser, isAdmin } from '@/lib/auth/current-user';
import { forbidden, ok } from '@/lib/api/response';
import { enforceSameOrigin } from '@/lib/security/csrf';

export async function GET(request: Request) {
  const csrf = enforceSameOrigin(request);
  if (csrf) return csrf;

  const user = await getCurrentUser();
  if (!user || !canManageNews(user.role)) {
    return forbidden();
  }

  const [
    userCount,
    newsCount,
    calendarEventCount,
    gymBookingCount,
    calculatorStateCount,
    galleryFolderCount,
    galleryItemCount,
    guideCount,
    aboutNarrativeCount,
    aboutMemberCount,
    officeSnapshotCount,
    categoryCount,
    auditLogCount,
    feedbackSubmissionCount,
    siteBuilderPageCount,
    siteDesignConfigCount,
    siteBuilderRevisionRows,
    siteBuilderPublishQueueRows,
    retentionConfigCount,
    searchDocumentCount,
    searchQueryStatCount,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.news.count(),
    prisma.calendarEvent.count(),
    prisma.gymBooking.count(),
    prisma.calculatorState.count(),
    prisma.galleryFolder.count(),
    prisma.galleryItem.count(),
    prisma.guide.count(),
    prisma.aboutNarrative.count(),
    prisma.aboutMember.count(),
    prisma.officeSnapshot.count(),
    prisma.category.count(),
    prisma.auditLog.count(),
    prisma.feedbackSubmission.count(),
    prisma.siteBuilderPage.count(),
    prisma.siteDesignConfig.count(),
    prisma.$queryRawUnsafe('SELECT COUNT(*) as count FROM "SiteBuilderPageRevision"'),
    prisma.$queryRawUnsafe('SELECT COUNT(*) as count FROM "SiteBuilderPublishQueue"'),
    prisma.retentionConfig.count(),
    prisma.searchDocument.count(),
    prisma.searchQueryStat.count(),
  ]);
  const siteBuilderRevisionCount = Number((siteBuilderRevisionRows as Array<{ count: number | bigint | string }>)[0]?.count ?? 0);
  const siteBuilderPublishQueueCount = Number(
    (siteBuilderPublishQueueRows as Array<{ count: number | bigint | string }>)[0]?.count ?? 0,
  );

  const tables: DbOverviewTable[] = [
    {
      key: 'user',
      model: 'User',
      labelHu: 'Felhasználók',
      descriptionHu: 'Office / Admin fiókok, jelszó hash',
      count: userCount,
      href: '/admin/users',
      group: 'auth',
    },
    {
      key: 'news',
      model: 'News',
      labelHu: 'Hírek',
      descriptionHu: 'Forrás, kategória, állapot, ütemezés',
      count: newsCount,
      href: '/admin/content',
      group: 'content',
    },
    {
      key: 'calendarEvent',
      model: 'CalendarEvent',
      labelHu: 'Naptár események',
      descriptionHu: 'Publikált / vázlat naptárbejegyzések',
      count: calendarEventCount,
      href: '/admin/content',
      group: 'content',
    },
    {
      key: 'guide',
      model: 'Guide',
      labelHu: 'Útmutatók',
      descriptionHu: 'Tudásbázis bejegyzések',
      count: guideCount,
      href: '/admin/content',
      group: 'content',
    },
    {
      key: 'aboutNarrative',
      model: 'AboutNarrative',
      labelHu: 'About – szövegblokkok',
      descriptionHu: 'Bemutatkozás, szerkezet, történet…',
      count: aboutNarrativeCount,
      href: '/about',
      group: 'content',
    },
    {
      key: 'aboutMember',
      model: 'AboutMember',
      labelHu: 'About – tagkártyák',
      descriptionHu: 'Szerepkörök, bios, csoportok',
      count: aboutMemberCount,
      href: '/about',
      group: 'content',
    },
    {
      key: 'galleryFolder',
      model: 'GalleryFolder',
      labelHu: 'Galéria mappák',
      descriptionHu: 'Albumok, rendezés',
      count: galleryFolderCount,
      href: '/admin/content',
      group: 'media',
    },
    {
      key: 'galleryItem',
      model: 'GalleryItem',
      labelHu: 'Galéria elemek',
      descriptionHu: 'Képek metaadatai',
      count: galleryItemCount,
      href: '/admin/content',
      group: 'media',
    },
    {
      key: 'gymBooking',
      model: 'GymBooking',
      labelHu: 'Tornaterem foglalások',
      descriptionHu: 'Igények, jóváhagyás / elutasítás',
      count: gymBookingCount,
      href: '/calendar',
      group: 'bookings',
    },
    {
      key: 'calculatorState',
      model: 'CalculatorState',
      labelHu: 'KKI kalkulátor állapot',
      descriptionHu: 'Felhasználónként egy snapshot (JSON)',
      count: calculatorStateCount,
      href: '/calculator',
      group: 'tools',
    },
    {
      key: 'siteBuilderPage',
      model: 'SiteBuilderPage',
      labelHu: 'Builder oldalak',
      descriptionHu: 'Adminban létrehozott dinamikus oldalak',
      count: siteBuilderPageCount,
      href: '/admin/site-builder',
      group: 'tools',
    },
    {
      key: 'siteDesignConfig',
      model: 'SiteDesignConfig',
      labelHu: 'Design konfiguráció',
      descriptionHu: 'Globális design tokenek és custom CSS',
      count: siteDesignConfigCount,
      href: '/admin/site-builder',
      group: 'tools',
    },
    {
      key: 'siteBuilderPageRevision',
      model: 'SiteBuilderPageRevision',
      labelHu: 'Builder revíziók',
      descriptionHu: 'Oldal snapshotok diffhez és rollbackhez',
      count: siteBuilderRevisionCount,
      href: '/admin/site-builder',
      group: 'tools',
    },
    {
      key: 'siteBuilderPublishQueue',
      model: 'SiteBuilderPublishQueue',
      labelHu: 'Builder publish queue',
      descriptionHu: 'Ütemezett / feldolgozott publikálási műveletek',
      count: siteBuilderPublishQueueCount,
      href: '/admin/site-builder',
      group: 'tools',
    },
    {
      key: 'officeSnapshot',
      model: 'OfficeSnapshot',
      labelHu: 'Iroda pillanatkép',
      descriptionHu: 'Nyitvatartás, bent lévők, szolgáltatás',
      count: officeSnapshotCount,
      href: '/admin/office',
      group: 'office',
    },
    {
      key: 'category',
      model: 'Category',
      labelHu: 'Kategóriák (SSOT)',
      descriptionHu: 'Hírek, események, galéria, útmutatók, iroda',
      count: categoryCount,
      href: '/admin/categories',
      group: 'system',
    },
    {
      key: 'auditLog',
      model: 'AuditLog',
      labelHu: 'Audit napló',
      descriptionHu: 'Érzékeny írási műveletek',
      count: auditLogCount,
      href: '/admin/audit',
      group: 'system',
    },
    {
      key: 'feedbackSubmission',
      model: 'FeedbackSubmission',
      labelHu: 'Visszajelzések',
      descriptionHu: 'Globális kereső / modul szerinti üzenetek',
      count: feedbackSubmissionCount,
      href: '/admin/feedback',
      group: 'system',
    },
    {
      key: 'retentionConfig',
      model: 'RetentionConfig',
      labelHu: 'Retention beállítás',
      descriptionHu: 'Audit/feedback/request log megőrzési idők',
      count: retentionConfigCount,
      href: '/admin/retention',
      group: 'system',
    },
    {
      key: 'searchDocument',
      model: 'SearchDocument',
      labelHu: 'Kereső index sorok',
      descriptionHu: 'Publikus központi kereső (hír / esemény / útmutató)',
      count: searchDocumentCount,
      href: '/admin/search-analytics',
      group: 'system',
    },
    {
      key: 'searchQueryStat',
      model: 'SearchQueryStat',
      labelHu: 'Keresési statisztika',
      descriptionHu: 'Napi + normalizált kulcs aggregátumok',
      count: searchQueryStatCount,
      href: '/admin/search-analytics',
      group: 'system',
    },
  ];

  const tablesOut =
    user && isAdmin(user.role)
      ? tables
      : tables.filter((row) => row.key !== 'user' && row.key !== 'auditLog');

  return ok({ tables: tablesOut, groupLabels: DB_OVERVIEW_GROUP_LABELS });
}
