/**
 * @file Dinamikus sitemap generálás (`/sitemap.xml`)
 *
 * @description
 * A Next.js `MetadataRoute.Sitemap` típust vár vissza: URL + opcionális
 * `lastModified`, `changeFrequency`, `priority`.
 *
 * @környezet
 * - `NEXT_PUBLIC_SITE_URL`: productionben állítsd a valós domainre (pl. `https://hok.pte.hu`),
 *   különben a fallback `example.invalid` kerül a linkekbe (fejlesztői figyelmeztetés).
 *
 * @bővítés
 * Új publikus oldal → add hozzá a `paths` tömbhöz; belső admin URL-ek opcionálisan
 * kivehetők a sitemap-ból, ha nem kell indexelés.
 */
import type { MetadataRoute } from 'next';
import { getBaseUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getBaseUrl();
  const paths = [
    '',
    '/about',
    '/calendar',
    '/calculator',
    '/gallery',
    '/guides',
    '/news',
    '/office',
  ];
  return paths.map((path) => ({
    url: `${base}${path || '/'}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'daily' : 'weekly',
    priority: path === '' ? 1 : 0.7,
  }));
}
