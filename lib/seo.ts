import type { Metadata } from 'next';
import { messages } from '@/lib/i18n/messages';

export const SITE_NAME = 'PTE MIK HÖK';

/** Útvonal-meta kulcsok – SSOT: `messages.*.routeMeta` (szerveren HU). */
export type RouteMetaKey = keyof typeof messages.hu.routeMeta;

export function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.invalid';
}

/** SEO meta / JSON-LD leírás: HTML címkék nélküli rövid szöveg. */
export function plainTextExcerpt(html: string, maxLen: number): string {
  const t = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  if (t.length <= maxLen) return t;
  return `${t.slice(0, Math.max(0, maxLen - 1)).trim()}…`;
}

export function buildPageMetadata(input: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const base = getBaseUrl().replace(/\/$/, '');
  const canonical = `${base}${input.path.startsWith('/') ? input.path : `/${input.path}`}`;
  /** Egy URL-en fut a HU/EN váltás (localStorage); hreflang-nál ne duplikáljuk ugyanazt `en-US`-ként. */
  return {
    title: `${input.title} | ${SITE_NAME}`,
    description: input.description,
    alternates: {
      canonical,
      languages: {
        'x-default': canonical,
        'hu-HU': canonical,
      },
    },
    openGraph: {
      title: `${input.title} | ${SITE_NAME}`,
      description: input.description,
      url: canonical,
      siteName: SITE_NAME,
      locale: 'hu_HU',
      alternateLocale: ['en_US'],
      type: 'website',
    },
  };
}

/** SEO mezők a magyar `routeMeta` szövegekből (egyetlen forrás a cím + leírás szerveren). */
export function buildPageMetadataFromMessages(key: RouteMetaKey, path: string): Metadata {
  const m = messages.hu.routeMeta[key];
  return buildPageMetadata({ title: m.title, description: m.description, path });
}

