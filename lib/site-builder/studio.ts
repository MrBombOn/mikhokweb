import { z } from 'zod';

export const siteBlockTypeSchema = z.enum(['hero', 'richText', 'cta', 'faq']);

export const siteBlockSchema = z.object({
  id: z.string().trim().min(1).max(80),
  type: siteBlockTypeSchema,
  titleHu: z.string().trim().max(220).default(''),
  titleEn: z.string().trim().max(220).default(''),
  bodyHu: z.string().trim().max(8000).default(''),
  bodyEn: z.string().trim().max(8000).default(''),
  ctaLabelHu: z.string().trim().max(120).default(''),
  ctaLabelEn: z.string().trim().max(120).default(''),
  ctaHref: z.string().trim().max(500).default(''),
});

export const siteBuilderBodySchema = z.object({
  blocks: z.array(siteBlockSchema).max(30),
});

export type SiteBuilderBlock = z.infer<typeof siteBlockSchema>;
export type SiteBuilderBody = z.infer<typeof siteBuilderBodySchema>;

export function normalizeBodyJson(raw: unknown): SiteBuilderBody {
  if (Array.isArray(raw)) {
    const blocks = raw.map((item, idx) => normalizeBlock(item, idx));
    return siteBuilderBodySchema.parse({ blocks });
  }
  if (raw && typeof raw === 'object' && Array.isArray((raw as { blocks?: unknown[] }).blocks)) {
    const blocks = (raw as { blocks: unknown[] }).blocks.map((item, idx) => normalizeBlock(item, idx));
    return siteBuilderBodySchema.parse({ blocks });
  }
  return { blocks: [] };
}

function normalizeBlock(raw: unknown, idx: number): SiteBuilderBlock {
  const data = raw && typeof raw === 'object' ? (raw as Record<string, unknown>) : {};
  const fallbackType = idx === 0 ? 'hero' : 'richText';
  const type = siteBlockTypeSchema.safeParse(data.type).success ? (data.type as SiteBuilderBlock['type']) : fallbackType;
  return siteBlockSchema.parse({
    id: String(data.id ?? `block-${idx + 1}`),
    type,
    titleHu: asString(data.titleHu),
    titleEn: asString(data.titleEn),
    bodyHu: asString(data.bodyHu),
    bodyEn: asString(data.bodyEn),
    ctaLabelHu: asString(data.ctaLabelHu),
    ctaLabelEn: asString(data.ctaLabelEn),
    ctaHref: asString(data.ctaHref),
  });
}

function asString(v: unknown): string {
  return typeof v === 'string' ? v : '';
}

export function defaultBlock(type: SiteBuilderBlock['type']): SiteBuilderBlock {
  const id = `${type}-${Math.random().toString(36).slice(2, 9)}`;
  if (type === 'hero') {
    return {
      id,
      type,
      titleHu: 'Új hero blokk',
      titleEn: 'New hero block',
      bodyHu: 'Rövid bevezető szöveg.',
      bodyEn: 'Short intro text.',
      ctaLabelHu: 'Tovább',
      ctaLabelEn: 'Continue',
      ctaHref: '/contact',
    };
  }
  if (type === 'cta') {
    return {
      id,
      type,
      titleHu: 'Felhívás',
      titleEn: 'Call to action',
      bodyHu: 'Kiemelt teendő vagy jelentkezés.',
      bodyEn: 'Highlighted action or sign-up.',
      ctaLabelHu: 'Megnyitás',
      ctaLabelEn: 'Open',
      ctaHref: '/',
    };
  }
  if (type === 'faq') {
    return {
      id,
      type,
      titleHu: 'Gyakori kérdés',
      titleEn: 'Frequent question',
      bodyHu: 'Kérdés és rövid válasz.',
      bodyEn: 'Question and short answer.',
      ctaLabelHu: '',
      ctaLabelEn: '',
      ctaHref: '',
    };
  }
  return {
    id,
    type,
    titleHu: 'Szöveges blokk',
    titleEn: 'Text block',
    bodyHu: 'Tartalom magyar nyelven.',
    bodyEn: 'Content in English.',
    ctaLabelHu: '',
    ctaLabelEn: '',
    ctaHref: '',
  };
}

export const SITE_BUILDER_TEMPLATES: Array<{
  key: string;
  titleHu: string;
  titleEn: string;
  descriptionHu: string;
  descriptionEn: string;
  body: SiteBuilderBody;
}> = [
  {
    key: 'admission-landing',
    titleHu: 'Felvételi landing',
    titleEn: 'Admission landing',
    descriptionHu: 'Hero + FAQ + CTA sablon felvételi kommunikációhoz.',
    descriptionEn: 'Hero + FAQ + CTA template for admissions communication.',
    body: {
      blocks: [defaultBlock('hero'), defaultBlock('faq'), defaultBlock('cta')],
    },
  },
  {
    key: 'event-campaign',
    titleHu: 'Rendezvény kampány',
    titleEn: 'Event campaign',
    descriptionHu: 'Hero + szöveges blokk + CTA felépítés.',
    descriptionEn: 'Hero + text block + CTA layout.',
    body: {
      blocks: [defaultBlock('hero'), defaultBlock('richText'), defaultBlock('cta')],
    },
  },
];

const FORBIDDEN_CSS_PATTERNS = [/@import/i, /position\s*:\s*fixed/i, /javascript:/i];

export function validateDesignGuardrails(input: {
  primaryColor?: string;
  accentColor?: string;
  customCss?: string;
}): string | null {
  const { primaryColor, accentColor, customCss } = input;
  if (primaryColor && primaryColor.toLowerCase() === '#ffffff') {
    return 'Az elsődleges szín nem lehet teljesen fehér.';
  }
  if (accentColor && accentColor.toLowerCase() === '#ffffff') {
    return 'A kiemelő szín nem lehet teljesen fehér.';
  }
  if (customCss) {
    for (const p of FORBIDDEN_CSS_PATTERNS) {
      if (p.test(customCss)) {
        return 'A custom CSS tiltott mintát tartalmaz.';
      }
    }
  }
  return null;
}
