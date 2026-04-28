'use client';

import { AllModulesStack } from '@/components/landing/AllModulesStack';
import { PublicPageShell } from '@/components/layout/PublicPageShell';

export function CalculatorPageClient() {
  return (
    <PublicPageShell>
      <AllModulesStack primary="calculator" />
    </PublicPageShell>
  );
}

