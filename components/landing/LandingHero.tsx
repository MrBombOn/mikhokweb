'use client';
import Link from 'next/link';
import { useApp } from '@/components/layout/AppProvider';
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
  return <section className='section animate-fade'><div className='landing-layout'><div className='landing-side animate-rise'><div className='hok-logo-hero' style={{ marginBottom: 22 }} /><div className='section-head'><small>PTE MIK HÖK</small><h1>{copy.heroTitle}</h1><p>{copy.heroText}</p><div className='hero-news-jump-wrap'><button type='button' className='hero-news-inline-link hero-news-jump' aria-label={copy.newsCta} onClick={scrollToNews}>{copy.newsCta} <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' aria-hidden='true'><path d='M12 5v14' /><path d='m6 13 6 6 6-6' /></svg></button></div></div></div><div><div className='card-grid-2x3 animate-rise'>{landingCards.map((item) => <Link prefetch={false} href={item.href} key={item.href} className='module-card' style={{ background: item.color }}><div className='badge' style={{ background: 'rgba(255,255,255,0.18)', color: 'white' }}>MIK HÖK</div><h3 style={{ fontSize: 28, marginBottom: 10 }}>{lang === 'hu' ? item.titleHu : item.titleEn}</h3><p style={{ lineHeight: 1.7, maxWidth: 280, margin: 0 }}>{lang === 'hu' ? item.textHu : item.textEn}</p></Link>)}</div></div></div></section>;
}
