'use client';

import { Suspense } from 'react';
import { LandingHero } from '@/components/landing/LandingHero';
import { AllModulesStack } from '@/components/landing/AllModulesStack';
import { AdminDeniedBanner } from '@/components/layout/AdminDeniedBanner';
import { PublicPageShell } from '@/components/layout/PublicPageShell';

export function HomePageClient() {
  return (
    <PublicPageShell>
      <Suspense fallback={null}>
        <AdminDeniedBanner />
      </Suspense>
      <LandingHero />
      <AllModulesStack primary="news" />
    </PublicPageShell>
  );
}

