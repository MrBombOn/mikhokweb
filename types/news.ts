/** Hír lista / landing – API és UI közös alakja (Fázis 4). */

export type NewsStatus = 'published' | 'draft' | 'scheduled' | 'archived' | 'deleted';

/** Űrlap / szerkesztő – a `deleted` csak API-ban (soft delete). */
export type NewsFormStatus = Exclude<NewsStatus, 'deleted'>;
export type NewsSource = 'internal' | 'facebook' | 'instagram';
export type CoverTone = 'blue' | 'pink' | 'teal' | 'gold';

export type NewsItem = {
  id: number;
  source: NewsSource;
  category: string;
  status: NewsStatus;
  pinned: boolean;
  date: string;
  titleHu: string;
  titleEn: string;
  textHu: string;
  textEn: string;
  author: string;
  cover: CoverTone;
  hasCover: boolean;
  /** URL-barát egyedi útvonal; üres lehet régi rekordoknál. */
  slug?: string;
  /** Kanonikus publikus URL (`NEXT_PUBLIC_SITE_URL` + `/news/{slug}`). */
  canonicalUrl?: string;
  coverAltHu?: string;
  coverAltEn?: string;
  scheduledFor?: string;
  archived?: boolean;
  externalUrl?: string;
};
