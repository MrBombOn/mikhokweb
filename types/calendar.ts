/** Naptár + tornaterem – API és `CalendarModule` közös alakok (Fázis 5). */

export type BookingStatus = 'pending' | 'approved' | 'rejected';

export type CalendarEventItem = {
  id: number;
  titleHu: string;
  titleEn: string;
  date: string;
  time: string;
  location: string;
  category: string;
  dayLabel: string;
  note?: string;
};

export type GymBookingItem = {
  id: number;
  title: string;
  slot: string;
  applicant: string;
  status: BookingStatus;
  purpose?: string;
};
