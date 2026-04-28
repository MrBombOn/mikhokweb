import { badRequest, created, tooManyRequests } from '@/lib/api/response';
import { serverLogger } from '@/lib/observability/server-logger';
import { registerFeedbackPost, isFeedbackBlocked } from '@/lib/security/feedback-rate-limit';
import { feedbackSchema } from '@/lib/validation/feedback';

export async function POST(request: Request) {
  if (isFeedbackBlocked(request)) {
    return tooManyRequests('Túl sok visszajelzés rövid idő alatt. Próbáld meg később.');
  }

  const json = await request.json().catch(() => null);
  const parsed = feedbackSchema.safeParse(json);
  if (!parsed.success) {
    return badRequest('invalid_body', parsed.error.flatten());
  }

  registerFeedbackPost(request);
  const input = parsed.data;
  const feedbackId = `fb_${Date.now()}`;

  serverLogger.info('public_feedback_received', {
    scope: 'api.feedback',
    feedbackId,
    module: input.module,
    email: input.email,
    messageLength: input.message.length,
  });

  return created({ ok: true, id: feedbackId });
}

