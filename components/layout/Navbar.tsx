/**
 * @file Felső navigációs sáv + landing „lebegő” vezérlők
 *
 * @description
 * Két fő mód:
 * 1. **Landing első szakasz**: csak `QuickControls` (nyelv, téma, login) – a teljes navbar
 *    a hírek blokk közelében gördül be (`showFullLandingNav` scroll alapú).
 * 2. **Egyéb oldalak / landing későbbi szakasz**: teljes `topbar` logóval, desktop és mobil menüvel.
 *
 * **D5 (mobil):** nyitott panelnél `role="dialog"` + fókusz-csapda, Escape bezárás, fókusz vissza a
 * hamburgerre, `body`/`html` scroll lock (lásd `docs/decision-log.md` D-2026-04-28-008).
 *
 * @nav_linkek
 * `baseLinks` + opcionális `{ href: '/admin', key: 'admin' }` ha `isAdmin` (session alapú).
 *
 * @i18n
 * Feliratok: `t(lang).nav[...]` a `lib/i18n/messages.ts`-ből.
 */
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { useApp } from '@/components/layout/AppProvider';
import { BrandMark } from '@/components/brand/BrandMark';
import { MoonIcon, SunIcon, GlobeIcon, ShieldIcon } from '@/components/ui/Icons';
import { t } from '@/lib/content';

const MOBILE_NAV_PANEL_ID = 'hok-primary-mobile-nav';

/** Publikus modulok + admin link csak bejelentkezve kerül a listába (lásd `links` alább). */
const baseLinks = [
  { href: '/news', key: 'news' as const },
  { href: '/calendar', key: 'calendar' as const },
  { href: '/calculator', key: 'calculator' as const },
  { href: '/gallery', key: 'gallery' as const },
  { href: '/guides', key: 'guides' as const },
  { href: '/about', key: 'about' as const },
];

/** Jobb felső gyors gombok – landing és desktop nav újrahasználja. */
function QuickControls({
  lang,
  theme,
  isAdmin,
  onLang,
  onTheme,
  onAuth,
  className = '',
}: {
  lang: 'hu' | 'en';
  theme: 'light' | 'dark';
  isAdmin: boolean;
  onLang: () => void;
  onTheme: () => void;
  onAuth: () => void;
  className?: string;
}) {
  return (
    <div className={`nav-actions compact-actions ${className}`.trim()}>
      <button
        className="btn btn-secondary icon-btn nav-icon-btn nav-lang-btn"
        onClick={onLang}
        aria-label={lang === 'hu' ? 'Switch to English' : 'Váltás magyarra'}
      >
        <GlobeIcon />
        <span className="lang-code">{lang === 'hu' ? 'HU' : 'EN'}</span>
      </button>
      <button
        className="btn btn-secondary icon-btn nav-icon-btn"
        onClick={onTheme}
        aria-label={lang === 'hu' ? 'Témaváltás' : 'Toggle theme'}
      >
        {theme === 'light' ? <MoonIcon /> : <SunIcon />}
      </button>
      <button className="btn btn-primary nav-login-btn" onClick={onAuth}>
        <ShieldIcon />
        <span>{isAdmin ? (lang === 'hu' ? 'Guest mód' : 'Guest mode') : lang === 'hu' ? 'Bejelentkezés' : 'Login'}</span>
      </button>
    </div>
  );
}

/** Hamburger – mobil panel; `aria-expanded`, `aria-controls`, fókusz visszaállítás a szülő `ref`-fel (D5). */
const MobileMenuButton = forwardRef<
  HTMLButtonElement,
  { open: boolean; onClick: () => void; lang: 'hu' | 'en' }
>(function MobileMenuButton({ open, onClick, lang }, ref) {
  const label =
    lang === 'hu' ? (open ? 'Mobil menü bezárása' : 'Mobil menü megnyitása') : open ? 'Close mobile menu' : 'Open mobile menu';
  return (
    <button
      ref={ref}
      type="button"
      className="btn btn-secondary mobile-menu-btn"
      aria-label={label}
      aria-expanded={open}
      aria-controls={MOBILE_NAV_PANEL_ID}
      onClick={onClick}
    >
      <span />
      <span />
      <span />
    </button>
  );
});
MobileMenuButton.displayName = 'MobileMenuButton';

function collectFocusables(panel: HTMLElement): HTMLElement[] {
  const sel =
    'a[href]:not([tabindex="-1"]), button:not([disabled]):not([tabindex="-1"]), input:not([disabled]):not([tabindex="-1"]), select:not([disabled]):not([tabindex="-1"]), textarea:not([disabled]):not([tabindex="-1"])';
  return Array.from(panel.querySelectorAll<HTMLElement>(sel)).filter((el) => {
    if (el.getAttribute('aria-hidden') === 'true') return false;
    const style = window.getComputedStyle(el);
    if (style.visibility === 'hidden' || style.display === 'none') return false;
    return true;
  });
}

export function Navbar() {
  const pathname = usePathname();
  const { lang, toggleLang, theme, toggleTheme, isAdmin, setGuestMode, openAdminLogin } = useApp();
  const dict = t(lang);
  const links = isAdmin ? [...baseLinks, { href: '/admin', key: 'admin' as const }] : baseLinks;
  const isLanding = pathname === '/';
  const [showFullLandingNav, setShowFullLandingNav] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [topbarScrolled, setTopbarScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Landing: a `#landing-news` DOM pozíciója alatt döntünk a teljes navbar megjelenéséről
  useEffect(() => {
    if (!isLanding) return;
    const ENTER_THRESHOLD = 132;
    const EXIT_THRESHOLD = 180;
    const onScroll = () => {
      const news = document.getElementById('landing-news');
      if (!news) {
        setShowFullLandingNav((prev) =>
          window.scrollY > Math.max(420, window.innerHeight * 0.5) ? true : prev && window.scrollY > Math.max(360, window.innerHeight * 0.42),
        );
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

  useEffect(() => {
    if (isLanding && !showFullLandingNav) return;
    const onScroll = () => setTopbarScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isLanding, showFullLandingNav]);

  /** D5: fókusz-csapda, Escape, scroll lock, visszafókusz a hamburgerre */
  useEffect(() => {
    if (!mobileOpen) return;

    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    const panel = mobilePanelRef.current;
    const trigger = menuButtonRef.current;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        closeMobile();
        return;
      }
      if (e.key !== 'Tab' || !panel) return;

      const focusables = collectFocusables(panel);
      if (focusables.length < 2) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;

      const onFirst = active && (active === first || first.contains(active));
      const onLast = active && (active === last || last.contains(active));

      if (e.shiftKey) {
        if (onFirst) {
          e.preventDefault();
          last.focus();
        }
      } else if (onLast) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown, true);

    const rafId = requestAnimationFrame(() => {
      if (!panel) return;
      const focusables = collectFocusables(panel);
      if (focusables.length > 0) {
        focusables[0].focus();
      } else {
        panel.setAttribute('tabindex', '-1');
        panel.focus();
      }
    });

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('keydown', onKeyDown, true);
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
      if (panel?.getAttribute('tabindex') === '-1') {
        panel.removeAttribute('tabindex');
      }
      trigger?.focus();
    };
  }, [mobileOpen, closeMobile, links.length]);

  const authAction = isAdmin ? setGuestMode : openAdminLogin;

  if (isLanding && !showFullLandingNav) {
    return (
      <div className="floating-landing-controls">
        <div className="app-shell floating-landing-inner">
          <QuickControls
            lang={lang}
            theme={theme}
            isAdmin={isAdmin}
            onLang={toggleLang}
            onTheme={toggleTheme}
            onAuth={authAction}
            className="landing-quick-controls"
          />
        </div>
      </div>
    );
  }

  const dialogLabel = lang === 'hu' ? 'Oldal navigáció' : 'Site navigation';

  return (
    <header className={`topbar topbar-solid${topbarScrolled ? ' topbar-scrolled' : ''}`}>
      <div className="app-shell navbar navbar-full">
        <div className="navbar-mobile-head">
          <Link href="/" className="brand brand-compact" aria-label="PTE MIK HÖK landing">
            <BrandMark variant="nav" />
            <div className="brand-copy">
              <strong>PTE MIK HÖK</strong>
              <div className="brand-sub">{isAdmin ? (lang === 'hu' ? 'Admin mód' : 'Admin mode') : lang === 'hu' ? 'Guest mód' : 'Guest mode'}</div>
            </div>
          </Link>
          <MobileMenuButton ref={menuButtonRef} open={mobileOpen} lang={lang} onClick={() => setMobileOpen((prev) => !prev)} />
        </div>
        <nav className="nav-links nav-links-desktop" aria-label="Desktop navigation">
          {links.map((link) => (
            <Link prefetch={false} key={link.href} href={link.href} className={`nav-link ${pathname === link.href ? 'active' : ''}`}>
              {dict.nav[link.key]}
            </Link>
          ))}
        </nav>
        <QuickControls lang={lang} theme={theme} isAdmin={isAdmin} onLang={toggleLang} onTheme={toggleTheme} onAuth={authAction} className="quick-controls-desktop" />
      </div>
      <div
        ref={mobilePanelRef}
        id={MOBILE_NAV_PANEL_ID}
        className={`app-shell mobile-nav-panel ${mobileOpen ? 'open' : ''}`}
        role={mobileOpen ? 'dialog' : undefined}
        aria-modal={mobileOpen ? true : undefined}
        aria-label={mobileOpen ? dialogLabel : undefined}
        aria-hidden={!mobileOpen}
      >
        <nav className="mobile-nav-links" aria-label={lang === 'hu' ? 'Linkek' : 'Links'}>
          {links.map((link) => (
            <Link
              prefetch={false}
              key={link.href}
              href={link.href}
              className={`nav-link mobile-nav-link ${pathname === link.href ? 'active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              {dict.nav[link.key]}
            </Link>
          ))}
        </nav>
        <QuickControls lang={lang} theme={theme} isAdmin={isAdmin} onLang={toggleLang} onTheme={toggleTheme} onAuth={authAction} className="mobile-quick-controls" />
      </div>
    </header>
  );
}
