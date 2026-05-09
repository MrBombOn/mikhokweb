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
  /** YYYY-MM-DD vagy üres – megjelenítés / rendezés */
  publishedAt: string | null;
  isAlumni: boolean;
  sortOrder: number;
  status: AboutContentStatus;
};

export type OfficeSnapshotDto = {
  id: number;
  openingHoursHu: string;
  openingHoursEn: string;
  weeklyScheduleHu: string;
  weeklyScheduleEn: string;
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
  /** Csak OFFICE/ADMIN – vendégnek üres */
  internalNoteHu: string;
  internalNoteEn: string;
  status: AboutContentStatus;
};
