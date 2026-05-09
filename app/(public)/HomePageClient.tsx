'use client';

import { Suspense } from 'react';
import { useEffect, useState } from 'react';
import { LandingHero } from '@/components/landing/LandingHero';
import { LandingNews } from '@/components/landing/LandingNews';
import { AdminDeniedBanner } from '@/components/layout/AdminDeniedBanner';
import { PublicPageShell } from '@/components/layout/PublicPageShell';
import { MotionReveal } from '@/components/ui/MotionReveal';
import { LAYOUT_LANDING_NEWS_REVEAL_SCROLL_PX } from '@/lib/layout/topbar-layout';

export function HomePageClient() {
  const [showNews, setShowNews] = useState(false);

  useEffect(() => {
    const openFromHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#landing-news' || hash === '#news') setShowNews(true);
    };
    openFromHash();
    window.addEventListener('hashchange', openFromHash);
    return () => window.removeEventListener('hashchange', openFromHash);
  }, []);

  useEffect(() => {
    if (showNews) return;
    const onScroll = () => {
      if (window.scrollY > LAYOUT_LANDING_NEWS_REVEAL_SCROLL_PX) setShowNews(true);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [showNews]);

  return (
    <PublicPageShell>
      <Suspense fallback={null}>
        <AdminDeniedBanner />
      </Suspense>
      <LandingHero onOpenNews={() => setShowNews(true)} />
      {showNews ? (
        <MotionReveal>
          <LandingNews />
        </MotionReveal>
      ) : null}
    </PublicPageShell>
  );
}

