/**
 * @file Strukturált adat (JSON-LD) segédek — Fázis 18 (SEO 2.0).
 */
import { SITE_NAME, getBaseUrl } from '@/lib/seo';

export function SeoJsonLd(props: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(props.data) }}
    />
  );
}

/** Globális @graph: Organization + WebSite (+ SearchAction a /search?q= mélylinkekhez). */
export function buildRootJsonLdGraph() {
  const base = getBaseUrl().replace(/\/$/, '');
  const orgId = `${base}/#organization`;
  const siteId = `${base}/#website`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': orgId,
        name: SITE_NAME,
        url: base,
      },
      {
        '@type': 'WebSite',
        '@id': siteId,
        url: base,
        name: SITE_NAME,
        inLanguage: ['hu-HU', 'en-US'],
        publisher: { '@id': orgId },
        potentialAction: {
          '@type': 'SearchAction',
          target: `${base}/search?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };
}

export function buildCollectionPageJsonLd(input: {
  name: string;
  description: string;
  path: string;
}) {
  const base = getBaseUrl().replace(/\/$/, '');
  const url = `${base}${input.path.startsWith('/') ? input.path : `/${input.path}`}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: input.name,
    description: input.description,
    url,
    isPartOf: { '@id': `${base}/#website` },
    inLanguage: ['hu-HU', 'en-US'],
  };
}

export function buildWebPageJsonLd(input: { name: string; description: string; path: string }) {
  const base = getBaseUrl().replace(/\/$/, '');
  const url = `${base}${input.path.startsWith('/') ? input.path : `/${input.path}`}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: input.name,
    description: input.description,
    url,
    isPartOf: { '@id': `${base}/#website` },
    inLanguage: ['hu-HU', 'en-US'],
  };
}

export function buildNewsArticleJsonLd(input: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  authorName?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: input.headline,
    description: input.description,
    url: input.url,
    datePublished: input.datePublished,
    author: input.authorName
      ? { '@type': 'Person', name: input.authorName }
      : { '@type': 'Organization', name: SITE_NAME },
    publisher: { '@id': `${getBaseUrl().replace(/\/$/, '')}/#organization` },
    inLanguage: ['hu-HU', 'en-US'],
    mainEntityOfPage: { '@type': 'WebPage', '@id': input.url },
  };
}
