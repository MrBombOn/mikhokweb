import { prisma } from '@/lib/db';
import { canManageNews, getCurrentUser, isAdmin } from '@/lib/auth/current-user';
import { badRequest, forbidden, notFound, ok } from '@/lib/api/response';
import { apiRequestLog } from '@/lib/observability/api-request-log';
import { enforceSameOrigin } from '@/lib/security/csrf';
import { patchFeedbackAdminSchema } from '@/lib/validation/feedback-admin';

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, context: RouteContext) {
  const log = apiRequestLog(request, 'api.admin.feedback.patch');
  const csrf = enforceSameOrigin(request);
  if (csrf) return log.wrap(csrf);

  const user = await getCurrentUser();
  if (!user || !canManageNews(user.role)) {
    return log.wrap(forbidden());
  }

  const { id } = await context.params;
  if (!id || id.length < 10) {
    return log.wrap(badRequest('invalid_id'));
  }

  const json = await request.json().catch(() => null);
  const parsed = patchFeedbackAdminSchema.safeParse(json);
  if (!parsed.success) {
    return log.wrap(badRequest('invalid_body', parsed.error.flatten()));
  }

  if (parsed.data.assigneeId && !isAdmin(user.role)) {
    return log.wrap(forbidden('Csak ADMIN adhat at feleloshoz visszajelzest.'));
  }

  if (parsed.data.assigneeId) {
    const exists = await prisma.user.findUnique({
      where: { id: parsed.data.assigneeId },
      select: { id: true },
    });
    if (!exists) {
      return log.wrap(badRequest('invalid_assignee'));
    }
  }

  const existing = await prisma.feedbackSubmission.findUnique({
    where: { id },
    select: { id: true },
  });
  if (!existing) return log.wrap(notFound('Nem talalhato visszajelzes.'));

  const row = await prisma.feedbackSubmission.update({
    where: { id },
    data: {
      ...(parsed.data.status !== undefined ? { status: parsed.data.status } : {}),
      ...(parsed.data.assigneeId !== undefined ? { assigneeId: parsed.data.assigneeId } : {}),
      ...(parsed.data.internalNote !== undefined ? { internalNote: parsed.data.internalNote } : {}),
    },
    include: { assignee: { select: { id: true, username: true, role: true } } },
  });

  log.info('admin_feedback_patched', { actorId: user.id, feedbackId: id });
  return log.wrap(
    ok({
      item: {
        id: row.id,
        module: row.module,
        message: row.message,
        email: row.email,
        status: row.status,
        assignee: row.assignee,
        assigneeId: row.assigneeId,
        internalNote: row.internalNote,
        createdAt: row.createdAt.toISOString(),
        updatedAt: row.updatedAt.toISOString(),
      },
    }),
  );
}
