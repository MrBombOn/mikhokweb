/** Útmutatók – API és UI DTO (Fázis 8). */

export type GuideItemStatus = 'published' | 'draft' | 'scheduled' | 'archived' | 'deleted';

export type GuideDto = {
  id: number;
  titleHu: string;
  titleEn: string;
  excerptHu: string;
  excerptEn: string;
  bodyHu: string;
  bodyEn: string;
  category: string;
  topic: string;
  keywords: string;
  documentUrl?: string;
  documentType?: string;
  attachmentName?: string;
  attachmentMime?: string;
  attachmentSizeBytes?: number;
  searchableText: string;
  listDate: string;
  status: GuideItemStatus;
};
