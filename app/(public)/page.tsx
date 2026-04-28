/**
 * @file Főoldal (landing)
 *
 * @description
 * A route group miatt az URL továbbra is `/`. Felépítés:
 * - `AdminDeniedBanner`: `Suspense` alatt, mert `useSearchParams()` (middleware redirect után).
 * - `LandingHero`, `LandingNews`: fő tartalom.
 * - `PageShell`: közös oldal konténer (lásd `components/ui/Core.tsx`).
 */
'use client';

import { Suspense } from 'react';
import { LandingHero } from '@/components/landing/LandingHero';
import { LandingNews } from '@/components/landing/LandingNews';
import { AdminDeniedBanner } from '@/components/layout/AdminDeniedBanner';
import { PageShell } from '@/components/ui/Core';

export default function HomePage() {
  return (
    <PageShell>
      <Suspense fallback={null}>
        <AdminDeniedBanner />
      </Suspense>
      <LandingHero />
      <LandingNews />
    </PageShell>
  );
}
