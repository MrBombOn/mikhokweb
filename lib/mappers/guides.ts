import type { Guide } from '@prisma/client';
import type { GuideDto, GuideItemStatus } from '@/types/guides';

export function guideToDto(row: Guide): GuideDto {
  return {
    id: row.id,
    titleHu: row.titleHu,
    titleEn: row.titleEn,
    excerptHu: row.excerptHu,
    excerptEn: row.excerptEn,
    bodyHu: row.bodyHu,
    bodyEn: row.bodyEn,
    category: row.category,
    topic: row.topic,
    keywords: row.keywords,
    documentUrl: row.documentUrl ?? undefined,
    documentType: row.documentType ?? undefined,
    attachmentName: row.attachmentName ?? undefined,
    attachmentMime: row.attachmentMime ?? undefined,
    attachmentSizeBytes: row.attachmentSizeBytes ?? undefined,
    searchableText: row.searchableText,
    listDate: row.listDate,
    status: row.status as GuideItemStatus,
  };
}
