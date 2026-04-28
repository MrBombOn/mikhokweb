import type { AboutMember, AboutNarrative, OfficeSnapshot } from '@prisma/client';
import type { AboutContentStatus, AboutMemberDto, AboutNarrativeDto, OfficeSnapshotDto } from '@/types/about';

export function aboutNarrativeToDto(row: AboutNarrative): AboutNarrativeDto {
  return {
    id: row.id,
    blockKey: row.blockKey,
    titleHu: row.titleHu,
    titleEn: row.titleEn,
    bodyHu: row.bodyHu,
    bodyEn: row.bodyEn,
    sortOrder: row.sortOrder,
    status: row.status as AboutContentStatus,
  };
}

export function aboutMemberToDto(row: AboutMember): AboutMemberDto {
  return {
    id: row.id,
    name: row.name,
    roleHu: row.roleHu,
    roleEn: row.roleEn,
    bioHu: row.bioHu,
    bioEn: row.bioEn,
    groupHu: row.groupHu,
    groupEn: row.groupEn,
    imageUrl: row.imageUrl,
    sortOrder: row.sortOrder,
    status: row.status as AboutContentStatus,
  };
}

export function officeSnapshotToDto(row: OfficeSnapshot): OfficeSnapshotDto {
  return {
    id: row.id,
    openingHoursHu: row.openingHoursHu,
    openingHoursEn: row.openingHoursEn,
    presentNowHu: row.presentNowHu,
    presentNowEn: row.presentNowEn,
    serviceStatusHu: row.serviceStatusHu,
    serviceStatusEn: row.serviceStatusEn,
    servicesInfoHu: row.servicesInfoHu,
    servicesInfoEn: row.servicesInfoEn,
    nfcInfoHu: row.nfcInfoHu,
    nfcInfoEn: row.nfcInfoEn,
    quickInfoHu: row.quickInfoHu,
    quickInfoEn: row.quickInfoEn,
    status: row.status as AboutContentStatus,
  };
}
