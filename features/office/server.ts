import type { UserRole } from '@prisma/client';
import { prisma } from '@/lib/db';
import { canManageNews } from '@/lib/auth/current-user';
import { officeSnapshotToDto } from '@/lib/mappers/about';
import type { z } from 'zod';
import { patchOfficeSnapshotSchema } from '@/lib/validation/about';

const OFFICE_SNAPSHOT_ID = 1;

export async function ensureOfficeSnapshot() {
  return prisma.officeSnapshot.upsert({
    where: { id: OFFICE_SNAPSHOT_ID },
    create: {
      id: OFFICE_SNAPSHOT_ID,
      openingHoursHu: 'Hétfő-csütörtök: 10:00-16:00, péntek: egyeztetéssel.',
      openingHoursEn: 'Monday-Thursday: 10:00-16:00, Friday by appointment.',
      weeklyScheduleHu:
        'Hétfő: 10:00–16:00\nKedd: 10:00–16:00\nSzerda: 10:00–16:00\nCsütörtök: 10:00–16:00\nPéntek: egyeztetéssel',
      weeklyScheduleEn:
        'Monday: 10:00–16:00\nTuesday: 10:00–16:00\nWednesday: 10:00–16:00\nThursday: 10:00–16:00\nFriday: by appointment',
      presentNowHu: 'A jelenléti blokk frissítése folyamatban.',
      presentNowEn: 'Presence block is being updated.',
      serviceStatusHu: 'Ügyfélfogadás elérhető.',
      serviceStatusEn: 'Student service is available.',
      servicesInfoHu: 'Tanulmányi, kollégiumi és általános ügyintézés helyben vagy e-mailben.',
      servicesInfoEn: 'Academic, dormitory, and general administration in person or by email.',
      nfcInfoHu: 'NFC alapú jelenlét későbbi fejlesztési irány.',
      nfcInfoEn: 'NFC-based presence is a planned future direction.',
      quickInfoHu: 'Sürgős ügyben kérjük jelezd e-mailben a tárgyban: SÜRGŐS.',
      quickInfoEn: 'For urgent cases, include URGENT in your email subject.',
      internalNoteHu: 'Belső megjegyzés (csak szerkesztőknek): ügyeleti elérhetőség a tagok levelezőlistáján.',
      internalNoteEn: 'Internal note (staff only): on-call details on the member mailing list.',
      status: 'published',
    },
    update: {},
  });
}

export async function getOfficeSnapshotForRole(role?: UserRole) {
  const canManage = role && canManageNews(role);
  const row = await ensureOfficeSnapshot();

  if (!canManage && row.status !== 'published') {
    return { ok: false as const, status: 404 as const };
  }

  const item = officeSnapshotToDto(row);
  if (!canManage) {
    return {
      ok: true as const,
      item: { ...item, internalNoteHu: '', internalNoteEn: '' },
    };
  }

  return { ok: true as const, item };
}

type PatchOfficeInput = z.infer<typeof patchOfficeSnapshotSchema>;

export async function patchOfficeSnapshot(patch: PatchOfficeInput) {
  const data: {
    openingHoursHu?: string;
    openingHoursEn?: string;
    weeklyScheduleHu?: string;
    weeklyScheduleEn?: string;
    presentNowHu?: string;
    presentNowEn?: string;
    serviceStatusHu?: string;
    serviceStatusEn?: string;
    servicesInfoHu?: string;
    servicesInfoEn?: string;
    nfcInfoHu?: string;
    nfcInfoEn?: string;
    quickInfoHu?: string;
    quickInfoEn?: string;
    internalNoteHu?: string;
    internalNoteEn?: string;
    status?: 'draft' | 'scheduled' | 'published' | 'archived';
  } = {};

  if (patch.openingHoursHu !== undefined) data.openingHoursHu = patch.openingHoursHu;
  if (patch.openingHoursEn !== undefined) data.openingHoursEn = patch.openingHoursEn;
  if (patch.weeklyScheduleHu !== undefined) data.weeklyScheduleHu = patch.weeklyScheduleHu;
  if (patch.weeklyScheduleEn !== undefined) data.weeklyScheduleEn = patch.weeklyScheduleEn;
  if (patch.presentNowHu !== undefined) data.presentNowHu = patch.presentNowHu;
  if (patch.presentNowEn !== undefined) data.presentNowEn = patch.presentNowEn;
  if (patch.serviceStatusHu !== undefined) data.serviceStatusHu = patch.serviceStatusHu;
  if (patch.serviceStatusEn !== undefined) data.serviceStatusEn = patch.serviceStatusEn;
  if (patch.servicesInfoHu !== undefined) data.servicesInfoHu = patch.servicesInfoHu;
  if (patch.servicesInfoEn !== undefined) data.servicesInfoEn = patch.servicesInfoEn;
  if (patch.nfcInfoHu !== undefined) data.nfcInfoHu = patch.nfcInfoHu;
  if (patch.nfcInfoEn !== undefined) data.nfcInfoEn = patch.nfcInfoEn;
  if (patch.quickInfoHu !== undefined) data.quickInfoHu = patch.quickInfoHu;
  if (patch.quickInfoEn !== undefined) data.quickInfoEn = patch.quickInfoEn;
  if (patch.internalNoteHu !== undefined) data.internalNoteHu = patch.internalNoteHu;
  if (patch.internalNoteEn !== undefined) data.internalNoteEn = patch.internalNoteEn;
  if (patch.status !== undefined) data.status = patch.status;

  if (Object.keys(data).length === 0) {
    return { ok: false as const, status: 400 as const, error: 'Nincs frissítendő mező.' };
  }

  await ensureOfficeSnapshot();
  const row = await prisma.officeSnapshot.update({
    where: { id: OFFICE_SNAPSHOT_ID },
    data,
  });

  return { ok: true as const, item: officeSnapshotToDto(row) };
}
