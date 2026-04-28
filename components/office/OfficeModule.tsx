/**
 * @file Office / iroda modul – nyitvatartás, bent lévők, ügyintézés, szolgáltatások
 *
 * @description
 * D6 (§32.1 #26): **status-first** – az ügyintézési állapot kiemelt hero kártyán, alatta részletek rácsban.
 */
'use client';

import { useCallback, useEffect, useState } from 'react';
import { useApp } from '@/components/layout/AppProvider';
import { Card, SectionHeader } from '@/components/ui/Core';
import { officeInfo } from '@/lib/content';
import { canUseDemoFallback } from '@/lib/services/content-fetch-policy';
import type { OfficeSnapshotDto } from '@/types/about';

function fallbackOffice(): OfficeSnapshotDto {
  return {
    id: 0,
    openingHoursHu: officeInfo.hu,
    openingHoursEn: officeInfo.en,
    presentNowHu: 'A jelenléti blokk később automatizálható.',
    presentNowEn: 'Presence block can be automated later.',
    serviceStatusHu: 'Az ügyintézés elérhető.',
    serviceStatusEn: 'Student administration is available.',
    servicesInfoHu: 'Tanulmányi, kollégiumi és általános információs ügyek támogatása.',
    servicesInfoEn: 'Support for academic, dormitory and general information requests.',
    nfcInfoHu: 'NFC-alapú jelenlét előkészítési irányként nyitva marad.',
    nfcInfoEn: 'NFC-based presence remains a planned extension point.',
    quickInfoHu: 'Sürgős ügyben írásban jelezz előre.',
    quickInfoEn: 'For urgent cases, notify the office in advance.',
    status: 'published',
  };
}

function emptyOffice(): OfficeSnapshotDto {
  return {
    id: 0,
    openingHoursHu: '',
    openingHoursEn: '',
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
  const { lang, openModal, isAdmin, toast } = useApp();
  const [item, setItem] = useState<OfficeSnapshotDto>(canUseDemoFallback() ? fallbackOffice() : emptyOffice());

  const reload = useCallback(async () => {
    const data = await fetchOffice();
    setItem(data ?? (canUseDemoFallback() ? fallbackOffice() : emptyOffice()));
  }, []);

  useEffect(() => {
    void reload();
  }, [reload, isAdmin]);

  async function patchOfficeDemo() {
    const now = new Date();
    const stamp = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const res = await fetch('/api/office', {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        serviceStatusHu: `Frissítve: ${stamp} - ügyfélfogadás aktív.`,
        serviceStatusEn: `Updated: ${stamp} - service desk active.`,
      }),
    });
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    if (!res.ok) {
      toast(data.error ?? (lang === 'hu' ? 'Mentés sikertelen.' : 'Save failed.'), 'warning');
      return;
    }
    await reload();
    toast(lang === 'hu' ? 'Office blokk frissítve.' : 'Office block updated.', 'success');
  }

  const opening = lang === 'hu' ? item.openingHoursHu : item.openingHoursEn;
  const present = lang === 'hu' ? item.presentNowHu : item.presentNowEn;
  const serviceStatus = lang === 'hu' ? item.serviceStatusHu : item.serviceStatusEn;
  const services = lang === 'hu' ? item.servicesInfoHu : item.servicesInfoEn;
  const nfc = lang === 'hu' ? item.nfcInfoHu : item.nfcInfoEn;
  const quick = lang === 'hu' ? item.quickInfoHu : item.quickInfoEn;

  const statusEyebrow = lang === 'hu' ? 'Ügyintézési állapot' : 'Service status';
  const modalBody = `${serviceStatus}\n\n${services}\n\n${lang === 'hu' ? 'NFC:' : 'NFC:'} ${nfc}\n\n${lang === 'hu' ? 'Gyors infó:' : 'Quick info:'} ${quick}`;

  return (
    <section className="section">
      <SectionHeader
        eyebrow="Office"
        title={lang === 'hu' ? 'Irodai információk egy pillantásra' : 'Office information at a glance'}
        text={
          lang === 'hu'
            ? 'Nyitvatartás, bent lévők, ügyintézési státusz és szolgáltatási információk egy egységes modulban.'
            : 'Opening hours, current presence, service status and support information in one module.'
        }
      />

      <Card strong className="office-status-hero">
        <p className="office-status-eyebrow">{statusEyebrow}</p>
        <p className="office-status-lead">{serviceStatus}</p>
        <div className="office-status-actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => openModal(lang === 'hu' ? 'Office részletek' : 'Office details', modalBody)}
          >
            {lang === 'hu' ? 'Részletek' : 'Details'}
          </button>
          {isAdmin ? (
            <button type="button" className="btn btn-secondary" onClick={() => void patchOfficeDemo()}>
              {lang === 'hu' ? 'Státusz frissítése (demó)' : 'Update status (demo)'}
            </button>
          ) : null}
        </div>
      </Card>

      <div className="grid-2 office-detail-grid">
        <Card>
          <h3>{lang === 'hu' ? 'Aktuális nyitvatartás' : 'Current opening hours'}</h3>
          <p className="office-muted-block">{opening}</p>
          <h4 className="office-subheading">{lang === 'hu' ? 'Bent lévők' : 'Currently present'}</h4>
          <p className="office-muted-block">{present}</p>
        </Card>

        <Card>
          <h3>{lang === 'hu' ? 'Szolgáltatások és kiegészítők' : 'Services and extras'}</h3>
          <p className="office-muted-block">{services}</p>
          <div className="stack office-extra-stack">
            <div className="badge">{lang === 'hu' ? 'NFC előkészítés' : 'NFC preparation'}</div>
            <p className="office-muted-block office-tight-p">{nfc}</p>
            <div className="badge">{lang === 'hu' ? 'Gyors információk' : 'Quick info'}</div>
            <p className="office-muted-block office-tight-p">{quick}</p>
          </div>
        </Card>
      </div>
    </section>
  );
}
