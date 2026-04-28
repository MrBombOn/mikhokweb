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

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.invalid';
  const paths = [
    '',
    '/about',
    '/calendar',
    '/calculator',
    '/gallery',
    '/guides',
    '/news',
    '/office',
    '/admin',
    '/admin/users',
    '/admin/categories',
    '/admin/content',
    '/admin/audit',
    '/admin/office',
  ];
  return paths.map((path) => ({
    url: `${base}${path || '/'}`,
    lastModified: new Date(),
  }));
}
