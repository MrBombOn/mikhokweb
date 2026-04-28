'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useApp } from '@/components/layout/AppProvider';
import { MoonIcon, SunIcon, GlobeIcon, ShieldIcon } from '@/components/ui/Icons';
import { t } from '@/lib/content';

const links = [
  { href: '/calendar', key: 'calendar' },
  { href: '/calculator', key: 'calculator' },
  { href: '/gallery', key: 'gallery' },
  { href: '/guides', key: 'guides' },
  { href: '/about', key: 'about' },
  { href: '/office', key: 'office' }
] as const;

function QuickControls({ lang, theme, isAdmin, onLang, onTheme, onAuth, className = '' }: { lang: 'hu' | 'en'; theme: 'light' | 'dark'; isAdmin: boolean; onLang: () => void; onTheme: () => void; onAuth: () => void; className?: string; }) {
  return <div className={`nav-actions compact-actions ${className}`.trim()}><button className='btn btn-secondary icon-btn nav-icon-btn nav-lang-btn' onClick={onLang} aria-label={lang === 'hu' ? 'Switch to English' : 'Váltás magyarra'}><GlobeIcon /><span className='lang-code'>{lang === 'hu' ? 'HU' : 'EN'}</span></button><button className='btn btn-secondary icon-btn nav-icon-btn' onClick={onTheme} aria-label={lang === 'hu' ? 'Témaváltás' : 'Toggle theme'}>{theme === 'light' ? <MoonIcon /> : <SunIcon />}</button><button className='btn btn-primary nav-login-btn' onClick={onAuth}><ShieldIcon /><span>{isAdmin ? (lang === 'hu' ? 'Guest mód' : 'Guest mode') : (lang === 'hu' ? 'Bejelentkezés' : 'Login')}</span></button></div>;
}

function MobileMenuButton({ open, onClick }: { open: boolean; onClick: () => void }) {
  return <button type='button' className='btn btn-secondary mobile-menu-btn' aria-label='Menu' aria-expanded={open} onClick={onClick}><span /><span /><span /></button>;
}

export function Navbar() {
  const pathname = usePathname();
  const { lang, toggleLang, theme, toggleTheme, isAdmin, setGuestMode, openAdminLogin } = useApp();
  const dict = t(lang);
  const isLanding = pathname === '/';
  const [showFullLandingNav, setShowFullLandingNav] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  useEffect(() => {
    if (!isLanding) return;
    const ENTER_THRESHOLD = 132;
    const EXIT_THRESHOLD = 180;
    const onScroll = () => {
      const news = document.getElementById('landing-news');
      if (!news) {
        setShowFullLandingNav((prev) => window.scrollY > Math.max(420, window.innerHeight * 0.5) ? true : prev && window.scrollY > Math.max(360, window.innerHeight * 0.42));
        return;
      }
      const top = news.getBoundingClientRect().top;
      setShowFullLandingNav((prev) => {
        if (!prev && top <= ENTER_THRESHOLD) return true;
        if (prev && top > EXIT_THRESHOLD) return false;
        return prev;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [isLanding]);

  const authAction = isAdmin ? setGuestMode : openAdminLogin;

  if (isLanding && !showFullLandingNav) {
    return <div className='floating-landing-controls'><div className='app-shell floating-landing-inner'><QuickControls lang={lang} theme={theme} isAdmin={isAdmin} onLang={toggleLang} onTheme={toggleTheme} onAuth={authAction} className='landing-quick-controls' /></div></div>;
  }

  return <header className='topbar topbar-solid'><div className='app-shell navbar navbar-full'><div className='navbar-mobile-head'><Link href='/' className='brand brand-compact' aria-label='PTE MIK HÖK landing'><span className='brand-logo small' /><div className='brand-copy'><strong>PTE MIK HÖK</strong><div className='brand-sub'>{isAdmin ? (lang === 'hu' ? 'Admin mód' : 'Admin mode') : (lang === 'hu' ? 'Guest mód' : 'Guest mode')}</div></div></Link><MobileMenuButton open={mobileOpen} onClick={() => setMobileOpen((prev) => !prev)} /></div><nav className={`nav-links nav-links-desktop`} aria-label='Desktop navigation'>{links.map((link) => <Link prefetch={false} key={link.href} href={link.href} className={`nav-link ${pathname === link.href ? 'active' : ''}`}>{dict.nav[link.key]}</Link>)}</nav><QuickControls lang={lang} theme={theme} isAdmin={isAdmin} onLang={toggleLang} onTheme={toggleTheme} onAuth={authAction} className='quick-controls-desktop' /></div><div className={`app-shell mobile-nav-panel ${mobileOpen ? 'open' : ''}`}><nav className='mobile-nav-links' aria-label='Mobile navigation'>{links.map((link) => <Link prefetch={false} key={link.href} href={link.href} className={`nav-link mobile-nav-link ${pathname === link.href ? 'active' : ''}`} onClick={() => setMobileOpen(false)}>{dict.nav[link.key]}</Link>)}</nav><QuickControls lang={lang} theme={theme} isAdmin={isAdmin} onLang={toggleLang} onTheme={toggleTheme} onAuth={authAction} className='mobile-quick-controls' /></div></header>;
}
