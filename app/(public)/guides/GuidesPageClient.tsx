'use client';

import { AllModulesStack } from '@/components/landing/AllModulesStack';
import { PublicPageShell } from '@/components/layout/PublicPageShell';

export function GuidesPageClient() {
  return (
    <PublicPageShell>
      <AllModulesStack primary="guides" />
    </PublicPageShell>
  );
}

