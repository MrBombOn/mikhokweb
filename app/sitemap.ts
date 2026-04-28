import type { MetadataRoute } from 'next';
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.invalid';
  const paths = ['', '/about', '/calendar', '/calculator', '/gallery', '/guides', '/news', '/office', '/admin', '/admin/users', '/admin/categories', '/admin/content', '/admin/audit', '/admin/office'];
  return paths.map((path) => ({ url: `${base}${path || '/'}`, lastModified: new Date() }));
}
