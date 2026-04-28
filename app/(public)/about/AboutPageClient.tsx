'use client';

import { AllModulesStack } from '@/components/landing/AllModulesStack';
import { PublicPageShell } from '@/components/layout/PublicPageShell';

export function AboutPageClient() {
  return (
    <PublicPageShell>
      <AllModulesStack primary="about" />
    </PublicPageShell>
  );
}

