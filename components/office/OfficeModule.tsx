/**
 * @file Office / iroda modul – nyitvatartás, bent lévők, ügyintézés, szolgáltatások
 *
 * @description
 * D6 (§32.1 #26): **status-first** – az ügyintézési állapot kiemelt hero kártyán, alatta részletek rácsban.
 * OFFICE / ADMIN: teljes snapshot szerkesztés modálban → `PATCH /api/office` (`lib/i18n/messages.ts` → `officePage`).
 */
'use client';

import { useCallback, useEffect, useState } from 'react';
import { useApp } from '@/components/layout/AppProvider';
import { AdminModal } from '@/components/ui/AdminModal';
import { Card, SectionHeader } from '@/components/ui/Core';
import { ErrorState } from '@/components/ui/ErrorState';
import { ModuleAdminToolbar } from '@/components/ui/ModuleAdminToolbar';
import { Skeleton } from '@/components/ui/Skeleton';
import { officeInfo, t } from '@/lib/content';
import { findTodayScheduleLine } from '@/lib/office/today-schedule-hint';
import { canUseDemoFallback } from '@/lib/services/content-fetch-policy';
import type { AboutContentStatus, OfficeSnapshotDto } from '@/types/about';

const WRITABLE_STATUS: Array<'draft' | 'scheduled' | 'published' | 'archived'> = [
  'draft',
  'scheduled',
  'published',
  'archived',
];

function fallbackOffice(): OfficeSnapshotDto {
  const hu = t('hu').officePage;
  const en = t('en').officePage;
  return {
    id: 0,
    openingHoursHu: officeInfo.hu,
    openingHoursEn: officeInfo.en,
    weeklyScheduleHu: '',
    weeklyScheduleEn: '',
    presentNowHu: hu.fallbackPresentNowHu,
    presentNowEn: en.fallbackPresentNowEn,
    serviceStatusHu: hu.fallbackServiceStatusHu,
    serviceStatusEn: en.fallbackServiceStatusEn,
    servicesInfoHu: hu.fallbackServicesInfoHu,
    servicesInfoEn: en.fallbackServicesInfoEn,
    nfcInfoHu: hu.fallbackNfcHu,
    nfcInfoEn: en.fallbackNfcEn,
    quickInfoHu: hu.fallbackQuickInfoHu,
    quickInfoEn: en.fallbackQuickInfoEn,
    internalNoteHu: '',
    internalNoteEn: '',
    status: 'published',
  };
}

function emptyOffice(): OfficeSnapshotDto {
  return {
    id: 0,
    openingHoursHu: '',
    openingHoursEn: '',
    weeklyScheduleHu: '',
    weeklyScheduleEn: '',
    presentNowHu: '',
    presentNowEn: '',
    serviceStatusHu: '',
    serviceStatusEn: '',
    servicesInfoHu: '',
    servicesInfoEn: '',
    nfcInfoHu: '',
    nfcInfoEn: '',
    quickInfoHu: '',
    quickInfoEn: '',
    internalNoteHu: '',
    internalNoteEn: '',
    status: 'published',
  };
}

async function fetchOffice(): Promise<OfficeSnapshotDto | null> {
  const r = await fetch('/api/office', { credentials: 'include' });
  if (!r.ok) return null;
  const data = (await r.json()) as { item?: OfficeSnapshotDto };
  return data.item ?? null;
}

export function OfficeModule() {
  const { lang, openModal, isStaff, toast } = useApp();
  const dict = t(lang);
  const o = dict.officePage;
  const [item, setItem] = useState<OfficeSnapshotDto>(canUseDemoFallback() ? fallbackOffice() : emptyOffice());
  const [loadStatus, setLoadStatus] = useState<'loading' | 'error' | 'ready'>('loading');
  const [editOpen, setEditOpen] = useState(false);
  const [draft, setDraft] = useState<OfficeSnapshotDto | null>(null);
  const [saving, setSaving] = useState(false);

  const refreshData = useCallback(async () => {
    const data = await fetchOffice();
    if (data) {
      setItem(data);
      return true;
    }
    if (canUseDemoFallback()) {
      setItem(fallbackOffice());
      return true;
    }
    setItem(emptyOffice());
    return false;
  }, []);

  const loadInitial = useCallback(async () => {
    setLoadStatus('loading');
    const ok = await refreshData();
    setLoadStatus(ok ? 'ready' : 'error');
  }, [refreshData]);

  useEffect(() => {
    void loadInitial();
  }, [loadInitial, isStaff]);

  function openEdit() {
    setDraft({ ...item });
    setEditOpen(true);
  }

  function closeEdit() {
    setEditOpen(false);
    setDraft(null);
  }

  async function saveOffice() {
    if (!draft) return;
    const openingHoursHu = draft.openingHoursHu.trim();
    const openingHoursEn = draft.openingHoursEn.trim();
    const serviceStatusHu = draft.serviceStatusHu.trim();
    const serviceStatusEn = draft.serviceStatusEn.trim();
    if (!openingHoursHu || !openingHoursEn || !serviceStatusHu || !serviceStatusEn) {
      toast(o.fillRequired, 'warning');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch('/api/office', {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          openingHoursHu,
          openingHoursEn,
          weeklyScheduleHu: draft.weeklyScheduleHu.trim(),
          weeklyScheduleEn: draft.weeklyScheduleEn.trim(),
          presentNowHu: draft.presentNowHu.trim(),
          presentNowEn: draft.presentNowEn.trim(),
          serviceStatusHu,
          serviceStatusEn,
          servicesInfoHu: draft.servicesInfoHu.trim(),
          servicesInfoEn: draft.servicesInfoEn.trim(),
          nfcInfoHu: draft.nfcInfoHu.trim(),
          nfcInfoEn: draft.nfcInfoEn.trim(),
          quickInfoHu: draft.quickInfoHu.trim(),
          quickInfoEn: draft.quickInfoEn.trim(),
          internalNoteHu: draft.internalNoteHu.trim(),
          internalNoteEn: draft.internalNoteEn.trim(),
          status: draft.status === 'deleted' ? 'published' : draft.status,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        toast(data.error ?? o.saveFailed, 'warning');
        return;
      }
      await refreshData();
      toast(o.saved, 'success');
      closeEdit();
    } finally {
      setSaving(false);
    }
  }

  async function showOfficeHistory() {
    const res = await fetch('/api/admin/office/history', { credentials: 'include' });
    const data = (await res.json().catch(() => ({}))) as {
      error?: string;
      items?: Array<{ actorName: string; actorRole: string; details: string; createdAt: string }>;
    };
    if (!res.ok) {
      toast(data.error ?? o.historyLoadFailed, 'warning');
      return;
    }
    const items = Array.isArray(data.items) ? data.items : [];
    if (!items.length) {
      openModal(o.historyModalTitle, o.historyEmpty);
      return;
    }
    const fmt = new Intl.DateTimeFormat(lang === 'hu' ? 'hu-HU' : 'en-GB', { dateStyle: 'medium', timeStyle: 'short' });
    const body = items
      .map((it) => `• ${fmt.format(new Date(it.createdAt))} — ${it.actorName} (${it.actorRole})\n${it.details || o.historyNoDetails}`)
      .join('\n\n');
    openModal(o.historyModalTitle, body);
  }

  const opening = lang === 'hu' ? item.openingHoursHu : item.openingHoursEn;
  const weeklySchedule = lang === 'hu' ? item.weeklyScheduleHu : item.weeklyScheduleEn;
  const present = lang === 'hu' ? item.presentNowHu : item.presentNowEn;
  const serviceStatus = lang === 'hu' ? item.serviceStatusHu : item.serviceStatusEn;
  const services = lang === 'hu' ? item.servicesInfoHu : item.servicesInfoEn;
  const nfc = lang === 'hu' ? item.nfcInfoHu : item.nfcInfoEn;
  const quick = lang === 'hu' ? item.quickInfoHu : item.quickInfoEn;
  const internalNote = lang === 'hu' ? item.internalNoteHu : item.internalNoteEn;
  const todayLine = findTodayScheduleLine(weeklySchedule || opening, lang);

  const statusEyebrow = o.statusEyebrow;
  const modalBody = `${serviceStatus}\n\n${services}\n\n${o.detailsNfcPrefix}: ${nfc}\n\n${o.detailsQuickPrefix}: ${quick}`;

  const setDraftField = <K extends keyof OfficeSnapshotDto>(key: K, value: OfficeSnapshotDto[K]) => {
    setDraft((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  return (
    <section className="section">
      <SectionHeader eyebrow={dict.nav.office} title={o.sectionTitle} text={o.sectionLead} />

      {isStaff ? (
        <ModuleAdminToolbar title={dict.common.moduleAdminToolbarTitle} ariaLabel={dict.common.moduleAdminToolbarAria}>
          <button type="button" className="btn btn-secondary" onClick={openEdit}>
            {o.editContent}
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => void showOfficeHistory()}>
            {o.historyButton}
          </button>
        </ModuleAdminToolbar>
      ) : null}

      <AdminModal
        open={editOpen}
        title={o.modalTitle}
        closeLabel={dict.common.modalClose}
        onClose={closeEdit}
      >
        {draft ? (
          <div className="stack gap-4">
            <p className="text-sm opacity-85">{o.leadNote}</p>
            <div className="grid-2 gap-3">
              <label className="stack gap-1">
                <span className="text-sm">{o.openingHoursHu}</span>
                <textarea
                  className="input"
                  rows={3}
                  value={draft.openingHoursHu}
                  onChange={(e) => setDraftField('openingHoursHu', e.target.value)}
                />
              </label>
              <label className="stack gap-1">
                <span className="text-sm">{o.openingHoursEn}</span>
                <textarea
                  className="input"
                  rows={3}
                  value={draft.openingHoursEn}
                  onChange={(e) => setDraftField('openingHoursEn', e.target.value)}
                />
              </label>
              <label className="stack gap-1">
                <span className="text-sm">{o.weeklyScheduleHu}</span>
                <textarea
                  className="input"
                  rows={4}
                  value={draft.weeklyScheduleHu}
                  onChange={(e) => setDraftField('weeklyScheduleHu', e.target.value)}
                />
              </label>
              <label className="stack gap-1">
                <span className="text-sm">{o.weeklyScheduleEn}</span>
                <textarea
                  className="input"
                  rows={4}
                  value={draft.weeklyScheduleEn}
                  onChange={(e) => setDraftField('weeklyScheduleEn', e.target.value)}
                />
              </label>
              <label className="stack gap-1">
                <span className="text-sm">{o.presentNowHu}</span>
                <textarea
                  className="input"
                  rows={2}
                  value={draft.presentNowHu}
                  onChange={(e) => setDraftField('presentNowHu', e.target.value)}
                />
              </label>
              <label className="stack gap-1">
                <span className="text-sm">{o.presentNowEn}</span>
                <textarea
                  className="input"
                  rows={2}
                  value={draft.presentNowEn}
                  onChange={(e) => setDraftField('presentNowEn', e.target.value)}
                />
              </label>
              <label className="stack gap-1">
                <span className="text-sm">{o.serviceStatusHu}</span>
                <textarea
                  className="input"
                  rows={2}
                  value={draft.serviceStatusHu}
                  onChange={(e) => setDraftField('serviceStatusHu', e.target.value)}
                />
              </label>
              <label className="stack gap-1">
                <span className="text-sm">{o.serviceStatusEn}</span>
                <textarea
                  className="input"
                  rows={2}
                  value={draft.serviceStatusEn}
                  onChange={(e) => setDraftField('serviceStatusEn', e.target.value)}
                />
              </label>
              <label className="stack gap-1">
                <span className="text-sm">{o.servicesInfoHu}</span>
                <textarea
                  className="input"
                  rows={3}
                  value={draft.servicesInfoHu}
                  onChange={(e) => setDraftField('servicesInfoHu', e.target.value)}
                />
              </label>
              <label className="stack gap-1">
                <span className="text-sm">{o.servicesInfoEn}</span>
                <textarea
                  className="input"
                  rows={3}
                  value={draft.servicesInfoEn}
                  onChange={(e) => setDraftField('servicesInfoEn', e.target.value)}
                />
              </label>
              <label className="stack gap-1">
                <span className="text-sm">{o.nfcInfoHu}</span>
                <textarea
                  className="input"
                  rows={2}
                  value={draft.nfcInfoHu}
                  onChange={(e) => setDraftField('nfcInfoHu', e.target.value)}
                />
              </label>
              <label className="stack gap-1">
                <span className="text-sm">{o.nfcInfoEn}</span>
                <textarea
                  className="input"
                  rows={2}
                  value={draft.nfcInfoEn}
                  onChange={(e) => setDraftField('nfcInfoEn', e.target.value)}
                />
              </label>
              <label className="stack gap-1">
                <span className="text-sm">{o.quickInfoHu}</span>
                <textarea
                  className="input"
                  rows={2}
                  value={draft.quickInfoHu}
                  onChange={(e) => setDraftField('quickInfoHu', e.target.value)}
                />
              </label>
              <label className="stack gap-1">
                <span className="text-sm">{o.quickInfoEn}</span>
                <textarea
                  className="input"
                  rows={2}
                  value={draft.quickInfoEn}
                  onChange={(e) => setDraftField('quickInfoEn', e.target.value)}
                />
              </label>
              <label className="stack gap-1">
                <span className="text-sm">{o.internalNoteHu}</span>
                <textarea
                  className="input"
                  rows={2}
                  value={draft.internalNoteHu}
                  onChange={(e) => setDraftField('internalNoteHu', e.target.value)}
                />
              </label>
              <label className="stack gap-1">
                <span className="text-sm">{o.internalNoteEn}</span>
                <textarea
                  className="input"
                  rows={2}
                  value={draft.internalNoteEn}
                  onChange={(e) => setDraftField('internalNoteEn', e.target.value)}
                />
              </label>
            </div>
            <label className="stack gap-1">
              <span className="text-sm">{o.statusLabel}</span>
              <select
                className="input"
                value={draft.status === 'deleted' ? 'published' : draft.status}
                onChange={(e) =>
                  setDraftField('status', e.target.value as AboutContentStatus)
                }
              >
                {WRITABLE_STATUS.map((s) => (
                  <option key={s} value={s}>
                    {s === 'draft'
                      ? o.statusDraft
                      : s === 'scheduled'
                        ? o.statusScheduled
                        : s === 'published'
                          ? o.statusPublished
                          : o.statusArchived}
                  </option>
                ))}
              </select>
            </label>
            <div className="flex gap-2 flex-wrap">
              <button type="button" className="btn btn-primary" disabled={saving} onClick={() => void saveOffice()}>
                {dict.common.save}
              </button>
              <button type="button" className="btn btn-secondary" disabled={saving} onClick={closeEdit}>
                {dict.common.cancel}
              </button>
            </div>
          </div>
        ) : null}
      </AdminModal>

      {loadStatus === 'loading' ? (
        <div role="status" aria-live="polite">
          <Skeleton variant="searchResults" />
        </div>
      ) : null}

      {loadStatus === 'error' ? (
        <ErrorState title={o.loadErrorTitle} message={o.loadErrorMessage} onRetry={() => void loadInitial()} retryLabel={o.retry} />
      ) : null}

      {loadStatus === 'ready' ? (
        <>
          <Card strong className="office-status-hero">
            <p className="office-status-eyebrow">{statusEyebrow}</p>
            <p className="office-status-lead">{serviceStatus}</p>
            <div className="office-status-actions">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => openModal(o.detailsModalTitle, modalBody)}
              >
                {o.detailsButton}
              </button>
            </div>
          </Card>

          <div className="grid-2 office-detail-grid">
            <Card>
              <h3>{o.cardOpeningTitle}</h3>
              <p className="office-muted-block">{opening}</p>
              {weeklySchedule.trim() ? <p className="office-muted-block">{weeklySchedule}</p> : null}
              {todayLine ? (
                <p className="office-muted-block office-tight-p">
                  <strong>{o.todayLinePrefix}: </strong>
                  {todayLine}
                </p>
              ) : null}
              <h4 className="office-subheading">{o.cardPresentHeading}</h4>
              <p className="office-muted-block">{present}</p>
            </Card>

            <Card>
              <h3>{o.cardServicesTitle}</h3>
              <p className="office-muted-block">{services}</p>
              <div className="stack office-extra-stack">
                <div className="badge">{o.badgeNfc}</div>
                <p className="office-muted-block office-tight-p">{nfc}</p>
                <div className="badge">{o.badgeQuick}</div>
                <p className="office-muted-block office-tight-p">{quick}</p>
                {isStaff && internalNote.trim() ? (
                  <>
                    <div className="badge">{o.internalNoteHu}</div>
                    <p className="office-muted-block office-tight-p">{internalNote}</p>
                  </>
                ) : null}
              </div>
            </Card>
          </div>
        </>
      ) : null}
    </section>
  );
}
