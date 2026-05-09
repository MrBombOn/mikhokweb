import { serverLogger } from '@/lib/observability/server-logger';
import { sendSmtpMail } from '@/lib/notifications/mailer';

export type BookingNotifyLocale = 'hu' | 'en';

type BookingNotificationInput = {
  id: number;
  title: string;
  applicantName: string;
  email: string;
  organization?: string | null;
  bookingDate: string;
  startTime: string;
  endTime: string;
  purpose: string;
};

type BookingStatus = 'pending' | 'approved' | 'rejected';

function normalizeLocale(raw: string | null | undefined): BookingNotifyLocale {
  return raw === 'en' ? 'en' : 'hu';
}

function formatBookingLine(input: BookingNotificationInput): string {
  return `${input.bookingDate} ${input.startTime}-${input.endTime}`;
}

/** Tesztekhez és más modulokhoz: nyers email tartalom (SMTP küldés nélkül). */
export function buildBookingCreatedEmail(locale: BookingNotifyLocale, input: BookingNotificationInput) {
  const slot = formatBookingLine(input);
  if (locale === 'en') {
    const orgLine = input.organization ? `Organization: ${input.organization}\n` : '';
    const subject = `Gym booking request received (#${input.id})`;
    const text =
      `Dear ${input.applicantName},\n\n` +
      `We have received your gym booking request.\n\n` +
      `Booking ID: #${input.id}\n` +
      `Time slot: ${slot}\n` +
      `Purpose: ${input.purpose}\n` +
      orgLine +
      `Status: pending\n\n` +
      `We will email you again when your request is reviewed.\n` +
      `PTE MIK HÖK`;
    const html =
      `<p>Dear ${input.applicantName},</p>` +
      `<p>We have received your gym booking request.</p>` +
      `<ul>` +
      `<li><strong>Booking ID:</strong> #${input.id}</li>` +
      `<li><strong>Time slot:</strong> ${slot}</li>` +
      `<li><strong>Purpose:</strong> ${input.purpose}</li>` +
      (input.organization ? `<li><strong>Organization:</strong> ${input.organization}</li>` : '') +
      `<li><strong>Status:</strong> pending</li>` +
      `</ul>` +
      `<p>We will email you again when your request is reviewed.<br/>PTE MIK HÖK</p>`;
    return { subject, text, html };
  }

  const orgLine = input.organization ? `Szervezet: ${input.organization}\n` : '';
  const subject = `Foglalási igény rögzítve (#${input.id})`;
  const text =
    `Kedves ${input.applicantName}!\n\n` +
    `Rögzítettük a tornaterem foglalási igényedet.\n\n` +
    `Foglalás azonosító: #${input.id}\n` +
    `Idősáv: ${slot}\n` +
    `Cél: ${input.purpose}\n` +
    orgLine +
    `Státusz: függőben\n\n` +
    `A visszaigazolásról újabb emailt küldünk.\n` +
    `PTE MIK HÖK`;

  const html =
    `<p>Kedves ${input.applicantName}!</p>` +
    `<p>Rögzítettük a tornaterem foglalási igényedet.</p>` +
    `<ul>` +
    `<li><strong>Foglalás azonosító:</strong> #${input.id}</li>` +
    `<li><strong>Idősáv:</strong> ${slot}</li>` +
    `<li><strong>Cél:</strong> ${input.purpose}</li>` +
    (input.organization ? `<li><strong>Szervezet:</strong> ${input.organization}</li>` : '') +
    `<li><strong>Státusz:</strong> függőben</li>` +
    `</ul>` +
    `<p>A visszaigazolásról újabb emailt küldünk.<br/>PTE MIK HÖK</p>`;

  return { subject, text, html };
}

function statusLabel(locale: BookingNotifyLocale, status: BookingStatus): string {
  if (locale === 'en') {
    if (status === 'approved') return 'approved';
    if (status === 'rejected') return 'rejected';
    return 'pending';
  }
  if (status === 'approved') return 'jóváhagyva';
  if (status === 'rejected') return 'elutasítva';
  return 'függőben';
}

/** Tesztekhez: státuszváltás email tartalom. */
export function buildBookingStatusEmail(
  locale: BookingNotifyLocale,
  input: BookingNotificationInput,
  status: BookingStatus,
) {
  const slot = formatBookingLine(input);
  const statusText = statusLabel(locale, status);
  if (locale === 'en') {
    const subject = `Gym booking status updated (#${input.id})`;
    const text =
      `Dear ${input.applicantName},\n\n` +
      `The status of your gym booking request has been updated.\n\n` +
      `Booking ID: #${input.id}\n` +
      `Time slot: ${slot}\n` +
      `New status: ${statusText}\n\n` +
      `PTE MIK HÖK`;
    const html =
      `<p>Dear ${input.applicantName},</p>` +
      `<p>The status of your gym booking request has been updated.</p>` +
      `<ul>` +
      `<li><strong>Booking ID:</strong> #${input.id}</li>` +
      `<li><strong>Time slot:</strong> ${slot}</li>` +
      `<li><strong>New status:</strong> ${statusText}</li>` +
      `</ul>` +
      `<p>PTE MIK HÖK</p>`;
    return { subject, text, html };
  }

  const subject = `Foglalási státusz frissítve (#${input.id})`;
  const text =
    `Kedves ${input.applicantName}!\n\n` +
    `A tornaterem foglalási igényed státusza frissült.\n\n` +
    `Foglalás azonosító: #${input.id}\n` +
    `Idősáv: ${slot}\n` +
    `Új státusz: ${statusText}\n\n` +
    `PTE MIK HÖK`;
  const html =
    `<p>Kedves ${input.applicantName}!</p>` +
    `<p>A tornaterem foglalási igényed státusza frissült.</p>` +
    `<ul>` +
    `<li><strong>Foglalás azonosító:</strong> #${input.id}</li>` +
    `<li><strong>Idősáv:</strong> ${slot}</li>` +
    `<li><strong>Új státusz:</strong> ${statusText}</li>` +
    `</ul>` +
    `<p>PTE MIK HÖK</p>`;
  return { subject, text, html };
}

async function postBookingWebhook(webhook: string, input: BookingNotificationInput): Promise<void> {
  try {
    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'booking_created',
        booking: input,
      }),
    });
    if (!res.ok) {
      serverLogger.warn('booking_notify_webhook_failed', {
        scope: 'notifications.booking',
        bookingId: input.id,
        status: res.status,
      });
    }
  } catch (err) {
    serverLogger.warn('booking_notify_webhook_error', {
      scope: 'notifications.booking',
      bookingId: input.id,
      err: err instanceof Error ? err.message : String(err),
    });
  }
}

/**
 * Opcionális webhook értesítés új bookingról + opcionális SMTP (BOOKING_EMAIL_ENABLED=1).
 * A webhook hiánya nem akadályozza az email küldést.
 */
export async function notifyBookingCreated(
  input: BookingNotificationInput,
  locale: BookingNotifyLocale,
): Promise<void> {
  const webhook = process.env.BOOKING_NOTIFY_WEBHOOK_URL?.trim();
  if (webhook) {
    await postBookingWebhook(webhook, input);
  }

  const emailEnabled = process.env.BOOKING_EMAIL_ENABLED === '1';
  if (!emailEnabled) return;

  const payload = buildBookingCreatedEmail(locale, input);
  const ok = await sendSmtpMail({
    to: input.email,
    subject: payload.subject,
    text: payload.text,
    html: payload.html,
  });
  if (!ok) {
    serverLogger.warn('booking_confirmation_email_skipped', {
      scope: 'notifications.booking',
      bookingId: input.id,
      hint: 'configure SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, BOOKING_EMAIL_FROM or SMTP_FROM',
    });
  }
}

export async function notifyBookingStatusChanged(
  input: BookingNotificationInput,
  status: BookingStatus,
  localeRaw: string | null | undefined,
): Promise<void> {
  const emailEnabled = process.env.BOOKING_EMAIL_ENABLED === '1';
  if (!emailEnabled) return;

  const locale = normalizeLocale(localeRaw);
  const payload = buildBookingStatusEmail(locale, input, status);
  const ok = await sendSmtpMail({
    to: input.email,
    subject: payload.subject,
    text: payload.text,
    html: payload.html,
  });
  if (!ok) {
    serverLogger.warn('booking_status_email_skipped', {
      scope: 'notifications.booking',
      bookingId: input.id,
      hint: 'configure SMTP_* and BOOKING_EMAIL_FROM',
    });
  }
}
