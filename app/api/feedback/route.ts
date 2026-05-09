import { badRequest, created, serverError, tooManyRequests } from '@/lib/api/response';
import { prisma } from '@/lib/db';
import { serverLogger } from '@/lib/observability/server-logger';
import { getRequestId, withRequestId } from '@/lib/observability/request-context';
import { notifyFeedbackCreated } from '@/lib/notifications/feedback';
import { registerFeedbackPost, isFeedbackBlocked } from '@/lib/security/feedback-rate-limit';
import { isTurnstileRequired, verifyTurnstileToken } from '@/lib/security/turnstile-verify';
import { feedbackSchema } from '@/lib/validation/feedback';

function clientIp(request: Request): string | undefined {
  const raw = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  return raw && raw !== '' ? raw : undefined;
}

export async function POST(request: Request) {
  const requestId = getRequestId(request);
  if (isFeedbackBlocked(request)) {
    serverLogger.warn('public_feedback_rate_limited', { scope: 'api.feedback', requestId });
    return withRequestId(tooManyRequests('Túl sok visszajelzés rövid idő alatt. Próbáld meg később.'), requestId);
  }

  const json = await request.json().catch(() => null);
  const parsed = feedbackSchema.safeParse(json);
  if (!parsed.success) {
    serverLogger.warn('public_feedback_invalid_body', { scope: 'api.feedback', requestId });
    return withRequestId(badRequest('invalid_body', parsed.error.flatten()), requestId);
  }

  if (isTurnstileRequired()) {
    const check = await verifyTurnstileToken(parsed.data.turnstileToken, clientIp(request));
    if (!check.ok) {
      serverLogger.warn('public_feedback_captcha_failed', { scope: 'api.feedback', requestId });
      return withRequestId(badRequest('captcha_failed', check.error), requestId);
    }
  }

  registerFeedbackPost(request);

  const input = parsed.data;

  try {
    const row = await prisma.feedbackSubmission.create({
      data: {
        module: input.module,
        message: input.message,
        email: input.email ?? null,
      },
    });

    serverLogger.info('public_feedback_received', {
      scope: 'api.feedback',
      feedbackId: row.id,
      module: input.module,
      email: input.email,
      messageLength: input.message.length,
      requestId,
    });
    void notifyFeedbackCreated({
      id: row.id,
      module: row.module,
      message: row.message,
      email: row.email,
      createdAt: row.createdAt.toISOString(),
      requestId,
    });

    return withRequestId(created({ ok: true, id: row.id }), requestId);
  } catch (e) {
    serverLogger.error('public_feedback_persist_failed', {
      scope: 'api.feedback',
      err: e instanceof Error ? e.message : String(e),
      requestId,
    });
    return withRequestId(serverError('feedback_persist_failed'), requestId);
  }
}
