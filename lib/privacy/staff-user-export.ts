import { prisma } from '@/lib/db';

/** Összefoglaló JSON (jelszó hash nélkül) — belső fiókok (OFFICE/ADMIN) adatexportja. */
export async function buildStaffUserDataExport(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      username: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  if (!user) return null;

  const [calculatorState, savedViews, notifications, auditAsActor, assignedFeedback] = await Promise.all([
    prisma.calculatorState.findUnique({ where: { userId } }),
    prisma.adminSavedView.findMany({ where: { userId }, orderBy: { updatedAt: 'desc' } }),
    prisma.staffNotification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 500,
      select: {
        id: true,
        eventKey: true,
        severity: true,
        titleHu: true,
        titleEn: true,
        bodyHu: true,
        bodyEn: true,
        meta: true,
        readAt: true,
        createdAt: true,
      },
    }),
    prisma.auditLog.findMany({
      where: { actorId: userId },
      orderBy: { createdAt: 'desc' },
      take: 2000,
      select: {
        id: true,
        action: true,
        entityType: true,
        entityId: true,
        details: true,
        createdAt: true,
      },
    }),
    prisma.feedbackSubmission.findMany({ where: { assigneeId: userId }, orderBy: { updatedAt: 'desc' } }),
  ]);

  return {
    exportVersion: 1,
    exportedAt: new Date().toISOString(),
    kind: 'staff_account' as const,
    legalNote:
      'Export a belső RBAC fiókhoz kapcsolódó perzisztens adatokról. A vendég visszajelzések önálló táblában vannak; azok kezelése: lásd docs/privacy-and-gdpr.md.',
    user,
    calculatorState,
    adminSavedViews: savedViews,
    staffNotifications: notifications,
    auditLogAsActor: auditAsActor,
    feedbackAssignedAsStaff: assignedFeedback,
  };
}
