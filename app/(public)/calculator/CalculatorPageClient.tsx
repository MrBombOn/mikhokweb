'use client';

import { CalculatorModule } from '@/components/calculator/CalculatorModule';
import { PublicPageShell } from '@/components/layout/PublicPageShell';
import { MotionReveal } from '@/components/ui/MotionReveal';

export function CalculatorPageClient() {
  return (
    <PublicPageShell>
      <div className="module-page-frame">
        <MotionReveal className="module-page-motion">
          <CalculatorModule />
        </MotionReveal>
      </div>
    </PublicPageShell>
  );
}

