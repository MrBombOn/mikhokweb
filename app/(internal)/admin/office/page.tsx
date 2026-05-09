/**
 * @file Belső irodai munkafelület – `/admin/office`
 *
 * @description
 * A nyilvános iroda: `/office`. Szövegek: `messages.internal`.
 */
'use client';

import { useApp } from '@/components/layout/AppProvider';
import { Card, SectionHeader } from '@/components/ui/Core';
import { t } from '@/lib/content';

export default function InternalOfficePage() {
  const { lang } = useApp();
  const m = t(lang).internal;
  return (
    <div className="app-shell section">
      <SectionHeader eyebrow={m.officeEyebrow} title={m.officeTitle} text={m.officeLead} />
      <Card>
        <p className="muted-text">{m.officePublicHint}</p>
      </Card>
    </div>
  );
}
