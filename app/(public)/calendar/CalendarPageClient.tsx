'use client';

import { AllModulesStack } from '@/components/landing/AllModulesStack';
import { PublicPageShell } from '@/components/layout/PublicPageShell';

export function CalendarPageClient() {
  return (
    <PublicPageShell>
      <AllModulesStack primary="calendar" />
    </PublicPageShell>
  );
}

