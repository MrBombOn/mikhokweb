import { prisma } from '@/lib/db';
import { todayYmdUtc } from '@/lib/bookings/time';

/** P5: régi függő foglalások automatikus lejártatása (`pending` -> `rejected`). */
export async function expireOldPendingBookings(): Promise<number> {
  const today = todayYmdUtc();
  const out = await prisma.gymBooking.updateMany({
    where: {
      status: 'pending',
      bookingDate: { lt: today },
    },
    data: {
      status: 'rejected',
    },
  });
  return out.count;
}

