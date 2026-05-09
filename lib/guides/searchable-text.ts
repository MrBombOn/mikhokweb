import type { CreateGuideInput } from '@/lib/validation/guides';

type GuideTextLike = Pick<
  CreateGuideInput,
  'titleHu' | 'titleEn' | 'excerptHu' | 'excerptEn' | 'bodyHu' | 'bodyEn' | 'category' | 'topic' | 'keywords'
>;

export function buildGuideSearchableText(input: GuideTextLike): string {
  return [
    input.titleHu,
    input.titleEn,
    input.excerptHu,
    input.excerptEn,
    input.bodyHu,
    input.bodyEn,
    input.category,
    input.topic,
    input.keywords,
  ]
    .map((x) => x.trim())
    .filter(Boolean)
    .join('\n')
    .slice(0, 200000);
}

