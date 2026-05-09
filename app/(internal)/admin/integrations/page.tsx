'use client';

import { useCallback, useEffect, useState } from 'react';
import { useApp } from '@/components/layout/AppProvider';
import { Card, SectionHeader } from '@/components/ui/Core';
import { ErrorState } from '@/components/ui/ErrorState';
import { t } from '@/lib/content';

type HealthPayload = {
  smtp: { configured: boolean };
  webhooks: {
    staffNotify: boolean;
    bookingNotify: boolean;
    feedbackNotify: boolean;
    uploadScan: boolean;
  };
  publicReadApi: { enabled: boolean };
};

export default function AdminIntegrationsPage() {
  const { lang, isAdminRole, toast } = useApp();
  const m = t(lang).internal;
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [data, setData] = useState<HealthPayload | null>(null);
  const [smtpBusy, setSmtpBusy] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError(false);
    try {
      const res = await fetch('/api/admin/integrations-health', { credentials: 'include' });
      const body = (await res.json().catch(() => ({}))) as { item?: HealthPayload; error?: string };
      if (!res.ok || !body.item) {
        setLoadError(true);
        toast(body.error ?? m.integrationsLoadError, 'warning');
        return;
      }
      setData(body.item);
    } catch {
      setLoadError(true);
      toast(m.integrationsLoadError, 'warning');
    } finally {
      setLoading(false);
    }
  }, [toast, m.integrationsLoadError]);

  useEffect(() => {
    void load();
  }, [load]);

  const verifySmtp = async () => {
    if (!isAdminRole) {
      toast(m.integrationsRbacAdmin, 'warning');
      return;
    }
    setSmtpBusy(true);
    try {
      const res = await fetch('/api/admin/integrations/smtp-verify', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: '{}',
      });
      const body = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (res.ok && body.ok) {
        toast(m.integrationsSmtpVerifyOk, 'success');
      } else {
        toast(body.error ?? m.integrationsSmtpVerifyFail, 'warning');
      }
    } catch {
      toast(m.integrationsSmtpVerifyFail, 'warning');
    } finally {
      setSmtpBusy(false);
    }
  };

  const wh = (set: boolean) => (set ? m.integrationsWebhookSet : m.integrationsWebhookUnset);

  return (
    <div className="app-shell section">
      <SectionHeader eyebrow={m.integrationsEyebrow} title={m.integrationsTitle} text={m.integrationsLead} />
      <p className="muted-text">
        {m.integrationsDocLink}: <code>docs/integrations-read-api-and-webhooks.md</code>
      </p>
      {loadError ? (
        <ErrorState
          title={m.integrationsLoadError}
          message={m.integrationsLoadError}
          onRetry={() => void load()}
          retryLabel={lang === 'hu' ? 'Újra' : 'Retry'}
        />
      ) : null}
      {loading && !data ? <p className="muted-text">{m.loading}</p> : null}
      {data ? (
        <div className="grid-2">
          <Card>
            <h3>SMTP</h3>
            <p className="admin-stat-line">
              {data.smtp.configured ? m.integrationsSmtpConfigured : m.integrationsSmtpNotConfigured}
            </p>
            {isAdminRole ? (
              <button type="button" className="btn btn-secondary" disabled={smtpBusy} onClick={() => void verifySmtp()}>
                {smtpBusy ? m.integrationsSmtpTesting : m.integrationsSmtpTestButton}
              </button>
            ) : (
              <p className="muted-text">{m.integrationsRbacAdmin}</p>
            )}
          </Card>
          <Card>
            <h3>{m.integrationsPublicApi.split('(')[0].trim()}</h3>
            <p className="admin-stat-line">
              {data.publicReadApi.enabled ? m.integrationsPublicApiOn : m.integrationsPublicApiOff}
            </p>
          </Card>
          <Card strong>
            <h3>Webhooks</h3>
            <ul className="stack admin-list-disc">
              <li>
                {m.integrationsWebhookStaff}: {wh(data.webhooks.staffNotify)}
              </li>
              <li>
                {m.integrationsWebhookBooking}: {wh(data.webhooks.bookingNotify)}
              </li>
              <li>
                {m.integrationsWebhookFeedback}: {wh(data.webhooks.feedbackNotify)}
              </li>
              <li>
                {m.integrationsWebhookUploadScan}: {wh(data.webhooks.uploadScan)}
              </li>
            </ul>
          </Card>
        </div>
      ) : null}
    </div>
  );
}
