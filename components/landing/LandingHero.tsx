/**
 * @file Landing hero + modulrács (2 oszlopos layout)
 *
 * @description
 * Bal oldal: logó, cím, szöveg, „Ugrás a hírekhez” görgetés (`#landing-news`).
 * Jobb oldal: `landingCards` alapján `Link` kártyák a fő modulokra.
 * D4: `animate-fade` / `animate-rise` + `MotionReveal` + stagger (`landing-module-stagger`).
 * Modul kártyák: `landing-module-card` + `#landing-module-cards` – belépő, hover, focus, active (lásd `styles/base.css`).
 */
'use client';

import Link from 'next/link';
import { BrandMark } from '@/components/brand/BrandMark';
import { useApp } from '@/components/layout/AppProvider';
import { ChevronDownIcon } from '@/components/ui/Icons';
import { MotionReveal } from '@/components/ui/MotionReveal';
import { LAYOUT_TOPBAR_SCROLL_CLEARANCE_PX } from '@/lib/layout/topbar-layout';
import { landingCards } from '@/lib/content';
import { getLandingCopy } from '@/lib/landingDictionary';

export function LandingHero({ onOpenNews }: { onOpenNews: () => void }) {
  const { lang } = useApp();
  const copy = getLandingCopy(lang);
  const scrollToNews = () => {
    onOpenNews();
    const target = document.getElementById('landing-news');
    if (target) {
      const navbarTriggerTop = target.getBoundingClientRect().top + window.scrollY - LAYOUT_TOPBAR_SCROLL_CLEARANCE_PX;
      window.scrollTo({ top: Math.max(0, navbarTriggerTop), behavior: 'smooth' });
      return;
    }
    window.setTimeout(() => {
      const nextTarget = document.getElementById('landing-news');
      if (!nextTarget) return;
      const navbarTriggerTop = nextTarget.getBoundingClientRect().top + window.scrollY - LAYOUT_TOPBAR_SCROLL_CLEARANCE_PX;
      window.scrollTo({ top: Math.max(0, navbarTriggerTop), behavior: 'smooth' });
    }, 50);
  };
  return (
    <section className="section animate-fade">
      <div className="landing-layout">
        <div className="landing-side animate-rise">
          <div className="hok-logo-hero">
            <BrandMark variant="hero" />
          </div>
          <div className="section-head">
            <small>{copy.heroBrandEyebrow}</small>
            <h1>{copy.heroTitle}</h1>
            <p>{copy.heroText}</p>
            <div className="hero-news-jump-wrap">
              <button
                type="button"
                className="hero-news-inline-link hero-news-jump"
                aria-label={copy.newsCta}
                onClick={scrollToNews}
              >
                {copy.newsCta}{' '}
                <ChevronDownIcon className="icon--sm" />
              </button>
            </div>
          </div>
        </div>
        <div>
          <MotionReveal>
            <div id="landing-module-cards" className="card-grid-2x3 landing-module-stagger">
              {landingCards.map((item) => (
                <Link
                  prefetch={false}
                  href={item.href}
                  key={item.href}
                  className={`module-card landing-module-card landing-module-card--${item.cardTone}`}
                  aria-label={
                    lang === 'hu'
                      ? `${item.titleHu}. ${item.textHu}`
                      : `${item.titleEn}. ${item.textEn}`
                  }
                >
                  <h3>{lang === 'hu' ? item.titleHu : item.titleEn}</h3>
                  <p>{lang === 'hu' ? item.textHu : item.textEn}</p>
                </Link>
              ))}
            </div>
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}
