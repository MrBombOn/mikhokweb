/**
 * @file Staff értesítések: in-app rekordok + opcionális webhook / SMTP (P8).
 */
import { prisma } from '@/lib/db';
import { serverLogger } from '@/lib/observability/server-logger';
import { sendSmtpMail } from '@/lib/notifications/mailer';

export type StaffNotifySeverity = 'info' | 'warning' | 'critical';

export type StaffNotifyInput = {
  eventKey: string;
  severity?: StaffNotifySeverity;
  titleHu: string;
  titleEn: string;
  bodyHu?: string;
  bodyEn?: string;
  meta?: Record<string, unknown>;
};

function staffWebhookUrl(): string | null {
  const u = process.env.STAFF_NOTIFY_WEBHOOK_URL?.trim();
  return u || null;
}

function staffEmailEnabled(): boolean {
  return process.env.STAFF_NOTIFY_EMAIL_ENABLED === '1';
}

function staffNotifyEmailTo(): string | null {
  const raw = process.env.STAFF_NOTIFY_EMAIL_TO?.trim();
  return raw || null;
}

async function postWebhook(payload: Record<string, unknown>) {
  const url = staffWebhookUrl();
  if (!url) return;
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    serverLogger.warn('staff_notify_webhook_failed', {
      scope: 'notifications.staff',
      err: err instanceof Error ? err.message : String(err),
    });
  }
}

async function maybeSendSmtpBroadcast(subject: string, text: string, html: string) {
  if (!staffEmailEnabled()) return;
  const to = staffNotifyEmailTo();
  if (!to) return;
  const ok = await sendSmtpMail({ to, subject, text, html });
  if (!ok) {
    serverLogger.warn('staff_notify_smtp_skipped', { scope: 'notifications.staff', to });
  }
}

/**
 * Nem blokkolja a hívó kérést: hátérben futtatja az IO-t.
 */
export function dispatchStaffNotification(input: StaffNotifyInput): void {
  void dispatchStaffNotificationAsync(input);
}

async function dispatchStaffNotificationAsync(input: StaffNotifyInput) {
  const severity = input.severity ?? 'info';
  const bodyHu = input.bodyHu ?? '';
  const bodyEn = input.bodyEn ?? '';

  try {
    const users = await prisma.user.findMany({
      where: { role: { in: ['OFFICE', 'ADMIN'] } },
      select: { id: true },
    });
    if (users.length) {
      const metaJson = input.meta ? (JSON.parse(JSON.stringify(input.meta)) as object) : null;
      await prisma.staffNotification.createMany({
        data: users.map((u) => ({
          userId: u.id,
          eventKey: input.eventKey,
          severity,
          titleHu: input.titleHu,
          titleEn: input.titleEn,
          bodyHu,
          bodyEn,
          ...(metaJson ? { meta: metaJson } : {}),
        })),
      });
    }
  } catch (err) {
    serverLogger.warn('staff_notify_db_failed', {
      scope: 'notifications.staff',
      err: err instanceof Error ? err.message : String(err),
      eventKey: input.eventKey,
    });
  }

  const ts = new Date().toISOString();
  void postWebhook({
    eventKey: input.eventKey,
    severity,
    titleHu: input.titleHu,
    titleEn: input.titleEn,
    bodyHu,
    bodyEn,
    meta: input.meta ?? null,
    ts,
  });

  const subject = `[HÖK admin] ${input.titleHu}`;
  const text = `${input.titleHu}\n${input.titleEn}\n\n${bodyHu}\n\n${bodyEn}`;
  const html = `<p><strong>${escapeHtml(input.titleHu)}</strong><br/><span>${escapeHtml(input.titleEn)}</span></p><p>${escapeHtml(bodyHu)}</p><p>${escapeHtml(bodyEn)}</p><p><small>${escapeHtml(input.eventKey)} · ${escapeHtml(severity)}</small></p>`;
  void maybeSendSmtpBroadcast(subject, text, html);
}

function escapeHtml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
