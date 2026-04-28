import { z } from 'zod';

const writableAboutStatus = z.enum(['draft', 'scheduled', 'published', 'archived']);

export const createAboutMemberSchema = z.object({
  name: z.string().min(1).max(200),
  roleHu: z.string().min(1).max(400),
  roleEn: z.string().min(1).max(400),
  bioHu: z.string().max(4000).default(''),
  bioEn: z.string().max(4000).default(''),
  groupHu: z.string().max(200).default(''),
  groupEn: z.string().max(200).default(''),
  imageUrl: z.string().max(2000).default(''),
  sortOrder: z.number().int().default(0),
  status: writableAboutStatus.default('published'),
});

export const patchAboutMemberSchema = createAboutMemberSchema.partial();

export const patchAboutNarrativeSchema = z.object({
  titleHu: z.string().min(1).max(400).optional(),
  titleEn: z.string().min(1).max(400).optional(),
  bodyHu: z.string().max(20000).optional(),
  bodyEn: z.string().max(20000).optional(),
  sortOrder: z.number().int().optional(),
  status: writableAboutStatus.optional(),
});

export const patchOfficeSnapshotSchema = z.object({
  openingHoursHu: z.string().min(1).max(2000).optional(),
  openingHoursEn: z.string().min(1).max(2000).optional(),
  presentNowHu: z.string().max(2000).optional(),
  presentNowEn: z.string().max(2000).optional(),
  serviceStatusHu: z.string().min(1).max(2000).optional(),
  serviceStatusEn: z.string().min(1).max(2000).optional(),
  servicesInfoHu: z.string().max(4000).optional(),
  servicesInfoEn: z.string().max(4000).optional(),
  nfcInfoHu: z.string().max(4000).optional(),
  nfcInfoEn: z.string().max(4000).optional(),
  quickInfoHu: z.string().max(4000).optional(),
  quickInfoEn: z.string().max(4000).optional(),
  status: writableAboutStatus.optional(),
});
