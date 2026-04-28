import type { Prisma, UserRole } from '@prisma/client';
import { prisma } from '@/lib/db';
import { canManageNews } from '@/lib/auth/current-user';
import { aboutMemberToDto, aboutNarrativeToDto } from '@/lib/mappers/about';
import { parseOptionalHttpUrl } from '@/lib/validation/guides';
import type { z } from 'zod';
import { createAboutMemberSchema, patchAboutMemberSchema, patchAboutNarrativeSchema } from '@/lib/validation/about';

export function parseAboutMemberId(raw: string): number | null {
  const n = Number(raw);
  return Number.isInteger(n) && n > 0 ? n : null;
}

export function parseAboutNarrativeId(raw: string): number | null {
  const n = Number(raw);
  return Number.isInteger(n) && n > 0 ? n : null;
}

export async function listAboutPayloadForRole(role?: UserRole) {
  const canManage = role && canManageNews(role);

  const narrativeWhere: Prisma.AboutNarrativeWhereInput = canManage
    ? { status: { not: 'deleted' } }
    : { status: 'published' };

  const memberWhere: Prisma.AboutMemberWhereInput = canManage ? { status: { not: 'deleted' } } : { status: 'published' };

  const [narratives, members] = await Promise.all([
    prisma.aboutNarrative.findMany({
      where: narrativeWhere,
      orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }],
    }),
    prisma.aboutMember.findMany({
      where: memberWhere,
      orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }],
    }),
  ]);

  return {
    narratives: narratives.map(aboutNarrativeToDto),
    members: members.map(aboutMemberToDto),
  };
}

type CreateAboutMemberInput = z.infer<typeof createAboutMemberSchema>;

export async function createAboutMember(d: CreateAboutMemberInput) {
  const rawImg = d.imageUrl.trim() === '' ? undefined : d.imageUrl.trim();
  const img = parseOptionalHttpUrl(rawImg);
  if (img === 'invalid') {
    return { ok: false as const, error: 'A kép URL csak http(s) lehet vagy üres.' };
  }

  const row = await prisma.aboutMember.create({
    data: {
      name: d.name,
      roleHu: d.roleHu,
      roleEn: d.roleEn,
      bioHu: d.bioHu,
      bioEn: d.bioEn,
      groupHu: d.groupHu,
      groupEn: d.groupEn,
      imageUrl: img === undefined || img === null ? '' : img,
      sortOrder: d.sortOrder,
      status: d.status,
    },
  });

  return { ok: true as const, member: aboutMemberToDto(row) };
}

export async function getAboutMemberDto(id: number, role?: UserRole) {
  const row = await prisma.aboutMember.findUnique({ where: { id } });
  if (!row || row.status === 'deleted') {
    return { ok: false as const, status: 404 as const };
  }

  const guest = !role || !canManageNews(role);
  if (guest && row.status !== 'published') {
    return { ok: false as const, status: 404 as const };
  }

  return { ok: true as const, member: aboutMemberToDto(row) };
}

type PatchAboutMemberInput = z.infer<typeof patchAboutMemberSchema>;

export async function patchAboutMember(id: number, patch: PatchAboutMemberInput) {
  const existing = await prisma.aboutMember.findUnique({ where: { id } });
  if (!existing || existing.status === 'deleted') {
    return { ok: false as const, status: 404 as const, error: 'Nem található.' };
  }

  const updateData: Prisma.AboutMemberUpdateInput = {};

  if (patch.name !== undefined) updateData.name = patch.name;
  if (patch.roleHu !== undefined) updateData.roleHu = patch.roleHu;
  if (patch.roleEn !== undefined) updateData.roleEn = patch.roleEn;
  if (patch.bioHu !== undefined) updateData.bioHu = patch.bioHu;
  if (patch.bioEn !== undefined) updateData.bioEn = patch.bioEn;
  if (patch.groupHu !== undefined) updateData.groupHu = patch.groupHu;
  if (patch.groupEn !== undefined) updateData.groupEn = patch.groupEn;
  if (patch.sortOrder !== undefined) updateData.sortOrder = patch.sortOrder;
  if (patch.status !== undefined) updateData.status = patch.status;

  if (patch.imageUrl !== undefined) {
    const rawImg = patch.imageUrl.trim() === '' ? undefined : patch.imageUrl.trim();
    const img = parseOptionalHttpUrl(rawImg);
    if (img === 'invalid') {
      return { ok: false as const, status: 400 as const, error: 'A kép URL csak http(s) lehet vagy üres.' };
    }
    updateData.imageUrl = img === undefined || img === null ? '' : img;
  }

  if (Object.keys(updateData).length === 0) {
    return { ok: false as const, status: 400 as const, error: 'Nincs frissítendő mező.' };
  }

  const row = await prisma.aboutMember.update({ where: { id }, data: updateData });
  return { ok: true as const, member: aboutMemberToDto(row) };
}

export async function softDeleteAboutMember(id: number) {
  const existing = await prisma.aboutMember.findUnique({ where: { id } });
  if (!existing || existing.status === 'deleted') {
    return { ok: false as const, status: 404 as const };
  }

  await prisma.aboutMember.update({
    where: { id },
    data: { status: 'deleted' },
  });

  return { ok: true as const };
}

export async function getAboutNarrativeDto(id: number, role?: UserRole) {
  const row = await prisma.aboutNarrative.findUnique({ where: { id } });
  if (!row || row.status === 'deleted') {
    return { ok: false as const, status: 404 as const };
  }

  const guest = !role || !canManageNews(role);
  if (guest && row.status !== 'published') {
    return { ok: false as const, status: 404 as const };
  }

  return { ok: true as const, narrative: aboutNarrativeToDto(row) };
}

type PatchAboutNarrativeInput = z.infer<typeof patchAboutNarrativeSchema>;

export async function patchAboutNarrative(id: number, patch: PatchAboutNarrativeInput) {
  const existing = await prisma.aboutNarrative.findUnique({ where: { id } });
  if (!existing || existing.status === 'deleted') {
    return { ok: false as const, status: 404 as const, error: 'Nem található.' };
  }

  const updateData: Prisma.AboutNarrativeUpdateInput = {};
  if (patch.titleHu !== undefined) updateData.titleHu = patch.titleHu;
  if (patch.titleEn !== undefined) updateData.titleEn = patch.titleEn;
  if (patch.bodyHu !== undefined) updateData.bodyHu = patch.bodyHu;
  if (patch.bodyEn !== undefined) updateData.bodyEn = patch.bodyEn;
  if (patch.sortOrder !== undefined) updateData.sortOrder = patch.sortOrder;
  if (patch.status !== undefined) updateData.status = patch.status;

  if (Object.keys(updateData).length === 0) {
    return { ok: false as const, status: 400 as const, error: 'Nincs frissítendő mező.' };
  }

  const row = await prisma.aboutNarrative.update({ where: { id }, data: updateData });
  return { ok: true as const, narrative: aboutNarrativeToDto(row) };
}
