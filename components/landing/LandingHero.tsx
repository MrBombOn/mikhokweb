/**
 * @file Landing hero + modulrács (2 oszlopos layout)
 *
 * @description
 * Bal oldal: logó, cím, szöveg, „Ugrás a hírekhez” görgetés (`#landing-news`).
 * Jobb oldal: `landingCards` alapján `Link` kártyák a fő modulokra.
 * D4: `animate-fade` / `animate-rise` + `MotionReveal` + stagger (`landing-module-stagger`).
 */
'use client';

import Link from 'next/link';
import { BrandMark } from '@/components/brand/BrandMark';
import { useApp } from '@/components/layout/AppProvider';
import { MotionReveal } from '@/components/ui/MotionReveal';
import { landingCards } from '@/lib/content';
import { getLandingCopy } from '@/lib/landingDictionary';

export function LandingHero() {
  const { lang } = useApp();
  const copy = getLandingCopy(lang);
  const scrollToNews = () => {
    const target = document.getElementById('landing-news');
    if (!target) return;
    const navbarTriggerTop = target.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top: Math.max(0, navbarTriggerTop), behavior: 'smooth' });
  };
  return (
    <section className="section animate-fade">
      <div className="landing-layout">
        <div className="landing-side animate-rise">
          <div className="hok-logo-hero">
            <BrandMark variant="hero" />
          </div>
          <div className="section-head">
            <small>PTE MIK HÖK</small>
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
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M12 5v14" />
                  <path d="m6 13 6 6 6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div>
          <MotionReveal>
            <div className="card-grid-2x3 landing-module-stagger">
              {landingCards.map((item) => (
                <Link
                  prefetch={false}
                  href={item.href}
                  key={item.href}
                  className="module-card"
                  style={{ background: item.color }}
                >
                  <div className="badge" style={{ background: 'rgba(255,255,255,0.18)', color: 'white' }}>
                    MIK HÖK
                  </div>
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
