/**
 * @file Dokumentum `<title>` és `meta[name=description]` szinkron a választott nyelvvel
 *
 * A szerver által küldött alap-SEO magyar; bejelentkezés nélküli nyelvváltáskor a böngészőcím
 * és leírás a `messages[lang].routeMeta` SSOT-ból frissül.
 */
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useApp } from '@/components/layout/AppProvider';
import { t } from '@/lib/content';
import type { RouteMetaKey } from '@/lib/seo';
import { SITE_NAME } from '@/lib/seo';

function routeMetaKeyForPath(pathname: string): RouteMetaKey {
  const base = pathname.replace(/\/$/, '') || '/';
  const map: Record<string, RouteMetaKey> = {
    '/': 'home',
    '/calendar': 'calendar',
    '/calculator': 'calculator',
    '/gallery': 'gallery',
    '/guides': 'guides',
    '/about': 'about',
    '/office': 'office',
    '/search': 'search',
    '/news': 'news',
  };
  if (base.startsWith('/admin')) return 'admin';
  return map[base] ?? 'fallback';
}

export function DocumentMetaSync() {
  const pathname = usePathname();
  const { lang } = useApp();

  useEffect(() => {
    const key = routeMetaKeyForPath(pathname ?? '/');
    const pack = t(lang).routeMeta[key];
    document.title = `${pack.title} | ${SITE_NAME}`;
    let el = document.querySelector('meta[name="description"]');
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('name', 'description');
      document.head.appendChild(el);
    }
    el.setAttribute('content', pack.description);
  }, [lang, pathname]);

  return null;
}
