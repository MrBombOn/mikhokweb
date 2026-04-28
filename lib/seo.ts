import type { Metadata } from 'next';

export const SITE_NAME = 'PTE MIK HÖK';

export function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.invalid';
}

export function buildPageMetadata(input: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const canonical = `${getBaseUrl()}${input.path}`;
  return {
    title: `${input.title} | ${SITE_NAME}`,
    description: input.description,
    alternates: {
      canonical,
      languages: {
        'hu-HU': canonical,
        'en-US': canonical,
      },
    },
    openGraph: {
      title: `${input.title} | ${SITE_NAME}`,
      description: input.description,
      url: canonical,
      siteName: SITE_NAME,
      locale: 'hu_HU',
      type: 'website',
    },
  };
}

