/**
 * @file Felső navigációs sáv + landing „lebegő” vezérlők
 *
 * @description
 * **CSS SSOT:** `styles/components/navbar.css` (+ `styles/components/effects-v11-plus.css` link díszítés). Topbar tokenek: `styles/design-tokens.css`, `lib/layout/topbar-layout.ts`.
 * Fő módok:
 * 1. **Landing a hírek előtt**: csak a három gyorsgomb (`QuickControls`), **fix** jobb felső, `app-shell` igazítással — görgetéskor sem mozdul el.
 * 2. **Landing a híreknél**: `#landing-news` a viewportban (vagy mély görgetés / `#news` hash) → teljes **topbar** (`topbar-landing-reveal`), ugyanott a 3 gomb mint a teljes sávban.
 * 3. **Egyéb oldalak**: teljes `topbar` logóval, desktop és mobil menüvel.
 *
 * **D5 (mobil):** nyitott panelnél `role="dialog"` + fókusz-csapda, Escape bezárás, fókusz vissza a
 * hamburgerre, `body`/`html` scroll lock (lásd `docs/decision-log.md` D-2026-04-28-008).
 *
 * @nav_linkek
 * `baseLinks` + `{ href: '/admin', key: 'admin' }` minden **bejelentkezett szerkesztőnek** (`isStaff`);
 * a `/admin/users` és `/admin/audit` útvonalakat a middleware továbbra is csak **ADMIN**-nak engedi.
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
import { MoonIcon, SunIcon, GlobeIcon, ShieldIcon, SettingsIcon, CalendarIcon, CalculatorIcon, GalleryIcon, BookOpenIcon, UsersIcon } from '@/components/ui/Icons';
import { collectFocusables } from '@/lib/a11y/focusables';
import { t } from '@/lib/content';

const MOBILE_NAV_PANEL_ID = 'hok-primary-mobile-nav';

function navIconFor(href: string) {
  if (href === '/calendar') return <CalendarIcon className="icon--sm" />;
  if (href === '/calculator') return <CalculatorIcon className="icon--sm" />;
  if (href === '/gallery') return <GalleryIcon className="icon--sm" />;
  if (href === '/guides') return <BookOpenIcon className="icon--sm" />;
  if (href === '/about') return <UsersIcon className="icon--sm" />;
  if (href === '/office') return <ShieldIcon className="icon--sm" />;
  if (href === '/admin') return <SettingsIcon className="icon--sm" />;
  return null;
}

/** Publikus modulok + admin link csak bejelentkezve kerül a listába (lásd `links` alább). */
const baseLinks = [
  { href: '/calendar', key: 'calendar' as const },
  { href: '/calculator', key: 'calculator' as const },
  { href: '/gallery', key: 'gallery' as const },
  { href: '/guides', key: 'guides' as const },
  { href: '/about', key: 'about' as const },
  { href: '/office', key: 'office' as const },
];

/** Jobb felső gyors gombok – landing és desktop nav újrahasználja. */
function QuickControls({
  lang,
  theme,
  isAdmin,
  onLang,
  onTheme,
  onAuth,
  langToggleAria,
  themeToggleAria,
  signInLabel,
  signOutLabel,
  className = '',
}: {
  lang: 'hu' | 'en';
  theme: 'light' | 'dark';
  isAdmin: boolean;
  onLang: () => void;
  onTheme: () => void;
  onAuth: () => void;
  langToggleAria: string;
  themeToggleAria: string;
  signInLabel: string;
  signOutLabel: string;
  className?: string;
}) {
  return (
    <div className={`nav-actions compact-actions ${className}`.trim()}>
      <button
        className="btn btn-secondary icon-btn nav-icon-btn nav-lang-btn"
        onClick={onLang}
        aria-label={langToggleAria}
      >
        <GlobeIcon />
        <span className="lang-code">{lang === 'hu' ? 'HU' : 'EN'}</span>
      </button>
      <button
        className="btn btn-secondary icon-btn nav-icon-btn"
        onClick={onTheme}
        aria-label={themeToggleAria}
      >
        {theme === 'light' ? <MoonIcon /> : <SunIcon />}
      </button>
      <button className="btn btn-primary nav-login-btn" onClick={onAuth}>
        <ShieldIcon />
        <span>{isAdmin ? signOutLabel : signInLabel}</span>
      </button>
    </div>
  );
}

/** Hamburger – mobil panel; `aria-expanded`, `aria-controls`, fókusz visszaállítás a szülő `ref`-fel (D5). */
const MobileMenuButton = forwardRef<
  HTMLButtonElement,
  { open: boolean; onClick: () => void; openLabel: string; closedLabel: string }
>(function MobileMenuButton({ open, onClick, openLabel, closedLabel }, ref) {
  const label = open ? openLabel : closedLabel;
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

export function Navbar() {
  const pathname = usePathname();
  const { lang, toggleLang, theme, toggleTheme, isAdmin, isStaff, setGuestMode, openAdminLogin } = useApp();
  const dict = t(lang);
  const c = dict.common;
  const n = dict.nav;
  const links = isStaff ? [...baseLinks, { href: '/admin', key: 'admin' as const }] : baseLinks;
  const langToggleAria = lang === 'hu' ? c.langSwitchToEn : c.langSwitchToHu;
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

  // Landing: teljes navbar, ha a hírek blokk a DOM-ban van és metszi a nézetet, vagy mély görgetés / hash (összhang: `LAYOUT_TOPBAR_SCROLL_CLEARANCE_PX`, landing scroll reveal)
  useEffect(() => {
    if (!isLanding) return;
    const SCROLL_ENTER = 138;
    const NEWS_EXIT_BOTTOM = -120;
    const SCROLL_EXIT = 56;
    const evaluate = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#landing-news' || hash === '#news') {
        setShowFullLandingNav(true);
        return;
      }
      const news = document.getElementById('landing-news');
      if (news) {
        const r = news.getBoundingClientRect();
        const intersects = r.top < window.innerHeight && r.bottom > 72;
        setShowFullLandingNav((prev) => {
          if (!prev && (window.scrollY >= SCROLL_ENTER || intersects)) return true;
          if (prev && r.bottom < NEWS_EXIT_BOTTOM && window.scrollY < SCROLL_EXIT) return false;
          return prev;
        });
        return;
      }
      setShowFullLandingNav((prev) => {
        if (!prev && window.scrollY >= SCROLL_ENTER) return true;
        if (prev && window.scrollY < SCROLL_EXIT) return false;
        return prev;
      });
    };
    evaluate();
    window.addEventListener('scroll', evaluate, { passive: true });
    window.addEventListener('resize', evaluate);
    window.addEventListener('hashchange', evaluate);
    return () => {
      window.removeEventListener('scroll', evaluate);
      window.removeEventListener('resize', evaluate);
      window.removeEventListener('hashchange', evaluate);
    };
  }, [isLanding]);

  useEffect(() => {
    const onScroll = () => setTopbarScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
  const dialogLabel = n.siteNavigationAria;

  const fullTopbar = (
    <header
      className={`topbar topbar-solid${topbarScrolled ? ' topbar-scrolled' : ''}${isLanding && showFullLandingNav ? ' topbar-landing-reveal' : ''}`}
    >
      <div className="app-shell navbar-full">
        <div className={`navbar-mobile-head${isLanding && showFullLandingNav ? ' navbar-mobile-head--landing-reveal' : ''}`}>
          <Link href="/" className="brand brand-compact" aria-label={n.brandHomeAria}>
            <BrandMark variant="nav" />
          </Link>
          {isLanding && showFullLandingNav ? (
            <QuickControls
              lang={lang}
              theme={theme}
              isAdmin={isAdmin}
              onLang={toggleLang}
              onTheme={toggleTheme}
              onAuth={authAction}
              langToggleAria={langToggleAria}
              themeToggleAria={c.themeToggleAria}
              signInLabel={c.navSignIn}
              signOutLabel={c.navSignOut}
              className="landing-reveal-head-quick"
            />
          ) : null}
          <MobileMenuButton
            ref={menuButtonRef}
            open={mobileOpen}
            openLabel={n.mobileMenuClose}
            closedLabel={n.mobileMenuOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
          />
        </div>
        <nav className="nav-links nav-links-desktop" aria-label={n.desktopNavAria}>
          {links.map((link) => (
            <Link prefetch={false} key={link.href} href={link.href} className={`nav-link ${pathname === link.href ? 'active' : ''}`}>
              {navIconFor(link.href)}
              {dict.nav[link.key]}
            </Link>
          ))}
        </nav>
        <QuickControls
          lang={lang}
          theme={theme}
          isAdmin={isAdmin}
          onLang={toggleLang}
          onTheme={toggleTheme}
          onAuth={authAction}
          langToggleAria={langToggleAria}
          themeToggleAria={c.themeToggleAria}
          signInLabel={c.navSignIn}
          signOutLabel={c.navSignOut}
          className="quick-controls-desktop"
        />
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
        <nav className="mobile-nav-links" aria-label={n.mobileNavAria}>
          {links.map((link) => (
            <Link
              prefetch={false}
              key={link.href}
              href={link.href}
              className={`nav-link mobile-nav-link ${pathname === link.href ? 'active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              {navIconFor(link.href)}
              {dict.nav[link.key]}
            </Link>
          ))}
        </nav>
        {!isLanding ? (
          <QuickControls
            lang={lang}
            theme={theme}
            isAdmin={isAdmin}
            onLang={toggleLang}
            onTheme={toggleTheme}
            onAuth={authAction}
            langToggleAria={langToggleAria}
            themeToggleAria={c.themeToggleAria}
            signInLabel={c.navSignIn}
            signOutLabel={c.navSignOut}
            className="mobile-quick-controls"
          />
        ) : null}
      </div>
    </header>
  );

  if (isLanding && !showFullLandingNav) {
    return (
      <nav className="landing-fixed-quick-wrap" aria-label={n.landingQuickControlsAria}>
        <div className="app-shell landing-fixed-quick-row">
          <QuickControls
            lang={lang}
            theme={theme}
            isAdmin={isAdmin}
            onLang={toggleLang}
            onTheme={toggleTheme}
            onAuth={authAction}
            langToggleAria={langToggleAria}
            themeToggleAria={c.themeToggleAria}
            signInLabel={c.navSignIn}
            signOutLabel={c.navSignOut}
            className="quick-controls-desktop"
          />
        </div>
      </nav>
    );
  }

  return fullTopbar;
}
