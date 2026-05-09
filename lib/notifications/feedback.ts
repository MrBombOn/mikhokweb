import { serverLogger } from '@/lib/observability/server-logger';

type FeedbackNotifyPayload = {
  id: string;
  module: string;
  message: string;
  email?: string | null;
  createdAt: string;
  requestId?: string;
};

export async function notifyFeedbackCreated(payload: FeedbackNotifyPayload): Promise<void> {
  const webhook = process.env.FEEDBACK_NOTIFY_WEBHOOK_URL?.trim();
  if (!webhook) return;

  try {
    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'feedback_created',
        payload,
      }),
    });
    if (!res.ok) {
      serverLogger.warn('feedback_notify_webhook_failed', {
        scope: 'lib.notifications.feedback',
        status: res.status,
        requestId: payload.requestId,
      });
    }
  } catch (err) {
    serverLogger.warn('feedback_notify_webhook_error', {
      scope: 'lib.notifications.feedback',
      err: err instanceof Error ? err.message : String(err),
      requestId: payload.requestId,
    });
  }
}

