'use client';

import { AboutModule } from '@/components/modules/about/AboutModule';
import { PublicPageShell } from '@/components/layout/PublicPageShell';
import { MotionReveal } from '@/components/ui/MotionReveal';

export function AboutPageClient() {
  return (
    <PublicPageShell>
      <div className="module-page-frame">
        <MotionReveal className="module-page-motion">
          <AboutModule />
        </MotionReveal>
      </div>
    </PublicPageShell>
  );
}

