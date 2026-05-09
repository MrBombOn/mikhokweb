/**
 * @file Emberi összefoglaló a szolgáltatás állapotáról (Fázis 17) — nem helyettesíti a külső status page szolgáltatást.
 */
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { PublicPageShell } from '@/components/layout/PublicPageShell';
import { messages } from '@/lib/i18n/messages';
import { StatusPageClient, type StatusHealthJson, type StatusPagePayload } from './StatusPageClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const m = messages.hu.routeMeta.status;
  return {
    title: m.title,
    description: m.description,
    robots: { index: false, follow: false },
  };
}

export default async function StatusPage() {
  const h = await headers();
  const host = h.get('x-forwarded-host') ?? h.get('host') ?? '';
  const proto = h.get('x-forwarded-proto') ?? (process.env.NODE_ENV === 'production' ? 'https' : 'http');

  let health: StatusHealthJson | null = null;
  let httpStatus: number | null = null;
  let error: StatusPagePayload['error'] = null;

  if (!host) {
    error = { kind: 'host' };
  } else {
    const url = `${proto}://${host}/api/health`;
    try {
      const res = await fetch(url, { cache: 'no-store', next: { revalidate: 0 } });
      httpStatus = res.status;
      health = (await res.json().catch(() => null)) as StatusHealthJson | null;
    } catch (e) {
      error = { kind: 'fetch', message: e instanceof Error ? e.message : String(e) };
    }
  }

  const ok = httpStatus === 200 && health?.status === 'ok' && health?.db === 'ok';

  const payload: StatusPagePayload = { ok, httpStatus, error, health };

  return (
    <PublicPageShell>
      <StatusPageClient payload={payload} />
    </PublicPageShell>
  );
}
