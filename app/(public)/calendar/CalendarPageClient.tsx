'use client';

import { CalendarModule } from '@/components/calendar/CalendarModule';
import { MotionReveal } from '@/components/ui/MotionReveal';
import { PublicPageShell } from '@/components/layout/PublicPageShell';

export function CalendarPageClient() {
  return (
    <PublicPageShell>
      <div className="module-page-frame">
        <MotionReveal className="module-page-motion">
          <CalendarModule />
        </MotionReveal>
      </div>
    </PublicPageShell>
  );
}

