'use client';

import { PublicPageShell } from '@/components/layout/PublicPageShell';
import { SectionHeader } from '@/components/ui/Core';
import { useApp } from '@/components/layout/AppProvider';
import { t } from '@/lib/content';

export function PrivacyPageClient() {
  const { lang } = useApp();
  const p = t(lang).privacyPage;

  return (
    <PublicPageShell>
      <div className="app-shell section module-page-frame">
        <SectionHeader eyebrow={p.eyebrow} title={p.title} text={p.lead} />
        <div className="stack card card-pad legal-doc-stack">
          <section>
            <h2>{p.sectionCookiesTitle}</h2>
            <p className="muted-text">{p.sectionCookiesBody}</p>
          </section>
          <section>
            <h2>{p.sectionStaffTitle}</h2>
            <p className="muted-text">{p.sectionStaffBody}</p>
          </section>
          <section>
            <h2>{p.sectionPublicTitle}</h2>
            <p className="muted-text">{p.sectionPublicBody}</p>
          </section>
          <section>
            <h2>{p.sectionRetentionTitle}</h2>
            <p className="muted-text">{p.sectionRetentionBody}</p>
          </section>
          <section>
            <h2>{p.sectionLegalTitle}</h2>
            <p className="muted-text">{p.sectionLegalBody}</p>
          </section>
        </div>
      </div>
    </PublicPageShell>
  );
}
