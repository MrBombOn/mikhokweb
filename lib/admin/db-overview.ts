export type DbOverviewGroup = 'auth' | 'content' | 'media' | 'bookings' | 'tools' | 'office' | 'system';

export type DbOverviewTable = {
  key: string;
  model: string;
  labelHu: string;
  descriptionHu: string;
  count: number;
  href: string | null;
  group: DbOverviewGroup;
};

export const DB_OVERVIEW_GROUP_LABELS: Record<DbOverviewGroup, string> = {
  auth: 'Azonosítás',
  content: 'Tartalom',
  media: 'Galéria',
  bookings: 'Foglalások',
  tools: 'Eszközök',
  office: 'Iroda',
  system: 'Rendszer / SSOT',
};
