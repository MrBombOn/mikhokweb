'use client';

import { MotionReveal } from '@/components/ui/MotionReveal';
import { LandingNews } from '@/components/landing/LandingNews';
import { CalendarModule } from '@/components/calendar/CalendarModule';
import { GalleryModule } from '@/components/gallery/GalleryModule';
import { GuidesModule } from '@/components/guides/GuidesModule';
import { AboutModule } from '@/components/modules/about/AboutModule';
import { OfficeModule } from '@/components/office/OfficeModule';
import { CalculatorModule } from '@/components/calculator/CalculatorModule';

type ModuleKey = 'news' | 'calendar' | 'gallery' | 'guides' | 'about' | 'office' | 'calculator';

function renderModule(key: ModuleKey) {
  switch (key) {
    case 'news':
      return <LandingNews />;
    case 'calendar':
      return <CalendarModule />;
    case 'gallery':
      return <GalleryModule />;
    case 'guides':
      return <GuidesModule />;
    case 'about':
      return <AboutModule />;
    case 'office':
      return <OfficeModule />;
    case 'calculator':
      return <CalculatorModule />;
    default:
      return null;
  }
}

export function AllModulesStack({ primary }: { primary: ModuleKey }) {
  const order: ModuleKey[] = ['news', 'calendar', 'gallery', 'guides', 'about', 'office', 'calculator'];
  const uniqueOrder = [primary, ...order.filter((k) => k !== primary)];

  return (
    <div className="all-modules-stack">
      {uniqueOrder.map((key) => (
        <MotionReveal key={key}>{renderModule(key)}</MotionReveal>
      ))}
    </div>
  );
}
