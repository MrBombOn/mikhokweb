/** About Us – API és UI DTO (Fázis 9). */

export type AboutContentStatus = 'published' | 'draft' | 'scheduled' | 'archived' | 'deleted';

export type AboutNarrativeDto = {
  id: number;
  blockKey: string;
  titleHu: string;
  titleEn: string;
  bodyHu: string;
  bodyEn: string;
  sortOrder: number;
  status: AboutContentStatus;
};

export type AboutMemberDto = {
  id: number;
  name: string;
  roleHu: string;
  roleEn: string;
  bioHu: string;
  bioEn: string;
  groupHu: string;
  groupEn: string;
  imageUrl: string;
  sortOrder: number;
  status: AboutContentStatus;
};

export type OfficeSnapshotDto = {
  id: number;
  openingHoursHu: string;
  openingHoursEn: string;
  presentNowHu: string;
  presentNowEn: string;
  serviceStatusHu: string;
  serviceStatusEn: string;
  servicesInfoHu: string;
  servicesInfoEn: string;
  nfcInfoHu: string;
  nfcInfoEn: string;
  quickInfoHu: string;
  quickInfoEn: string;
  status: AboutContentStatus;
};
