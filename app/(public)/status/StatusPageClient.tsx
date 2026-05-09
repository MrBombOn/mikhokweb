/**
 * @file /status tartalom — kliens i18n + tokenes osztályok (Fázis 1 SSOT).
 */
'use client';

import type { ReactNode } from 'react';
import { useApp } from '@/components/layout/AppProvider';
import { t } from '@/lib/content';

export type StatusHealthJson = {
  status?: string;
  db?: string;
  latencyMs?: number;
  service?: string;
  now?: string;
};

export type StatusPagePayload = {
  ok: boolean;
  httpStatus: number | null;
  error: { kind: 'host' } | { kind: 'fetch'; message: string } | null;
  health: StatusHealthJson | null;
};

export function StatusPageClient({ payload }: { payload: StatusPagePayload }): ReactNode {
  const { lang } = useApp();
  const s = t(lang).statusPage;

  const problemText =
    payload.error?.kind === 'host'
      ? s.hostMissing
      : payload.error?.kind === 'fetch'
        ? `${s.problemErrorPrefix} ${payload.error.message}`
        : `${s.problemHttp.replace(/\{status\}/g, String(payload.httpStatus ?? '—'))}`;

  return (
    <div className="module-page-frame status-public-page">
      <h1 className="status-public-title">{t(lang).routeMeta.status.title}</h1>
      <p className="status-public-lead">{s.lead}</p>
      {payload.ok ? (
        <p className="status-public-banner status-public-banner--ok" role="status">
          <strong>{s.okTitle}</strong> {s.okDb}
          {typeof payload.health?.latencyMs === 'number'
            ? ` ${s.okLatency.replace(/\{ms\}/g, String(payload.health.latencyMs))}`
            : null}
        </p>
      ) : (
        <p className="status-public-banner status-public-banner--bad" role="alert">
          <strong>{s.problemTitle}</strong> {problemText}
        </p>
      )}
      <pre className="status-public-pre">{JSON.stringify({ httpStatus: payload.httpStatus, health: payload.health, service: payload.health?.service }, null, 2)}</pre>
    </div>
  );
}
