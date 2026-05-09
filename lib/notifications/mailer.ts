import nodemailer from 'nodemailer';
import { serverLogger } from '@/lib/observability/server-logger';

type SmtpConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
};

export function isSmtpConfigured(): boolean {
  return readSmtpConfig() !== null;
}

function readSmtpConfig(): SmtpConfig | null {
  const host = process.env.SMTP_HOST?.trim();
  const portRaw = process.env.SMTP_PORT?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  const from = process.env.BOOKING_EMAIL_FROM?.trim() || process.env.SMTP_FROM?.trim();

  if (!host || !portRaw || !user || !pass || !from) return null;
  const port = Number(portRaw);
  if (!Number.isInteger(port) || port <= 0) return null;
  return {
    host,
    port,
    secure: port === 465,
    user,
    pass,
    from,
  };
}

export type SendMailInput = {
  to: string;
  subject: string;
  text: string;
  html: string;
};

export async function sendSmtpMail(input: SendMailInput): Promise<boolean> {
  const cfg = readSmtpConfig();
  if (!cfg) return false;

  try {
    const transporter = nodemailer.createTransport({
      host: cfg.host,
      port: cfg.port,
      secure: cfg.secure,
      auth: { user: cfg.user, pass: cfg.pass },
    });

    await transporter.sendMail({
      from: cfg.from,
      to: input.to,
      subject: input.subject,
      text: input.text,
      html: input.html,
    });
    return true;
  } catch (err) {
    serverLogger.warn('smtp_send_failed', {
      scope: 'notifications.mailer',
      err: err instanceof Error ? err.message : String(err),
      to: input.to,
      subject: input.subject,
    });
    return false;
  }
}

/** SMTP szerver elérhetőség (`verify`) — nem küld e-mailt. */
export async function verifySmtpConnection(): Promise<{ ok: true } | { ok: false; message: string }> {
  const cfg = readSmtpConfig();
  if (!cfg) return { ok: false, message: 'smtp_not_configured' };
  try {
    const transporter = nodemailer.createTransport({
      host: cfg.host,
      port: cfg.port,
      secure: cfg.secure,
      auth: { user: cfg.user, pass: cfg.pass },
    });
    await transporter.verify();
    return { ok: true };
  } catch (err) {
    return { ok: false, message: err instanceof Error ? err.message : String(err) };
  }
}

