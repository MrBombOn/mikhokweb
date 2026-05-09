'use client';

import { GuidesModule } from '@/components/guides/GuidesModule';
import { PublicPageShell } from '@/components/layout/PublicPageShell';
import { MotionReveal } from '@/components/ui/MotionReveal';

export function GuidesPageClient() {
  return (
    <PublicPageShell>
      <div className="module-page-frame">
        <MotionReveal className="module-page-motion">
          <GuidesModule />
        </MotionReveal>
      </div>
    </PublicPageShell>
  );
}

