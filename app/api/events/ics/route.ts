import { getCurrentUser } from '@/lib/auth/current-user';
import { listEventsForRole } from '@/features/events/server';

function escIcs(value: string) {
  return value.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
}

function toIcsDateTime(date: string, time: string) {
  const [y, m, d] = date.split('-').map(Number);
  const [hh, mm] = time.split(':').map(Number);
  if (!y || !m || !d || Number.isNaN(hh) || Number.isNaN(mm)) return null;
  const dt = new Date(Date.UTC(y, m - 1, d, hh, mm, 0));
  const p = (n: number) => String(n).padStart(2, '0');
  return `${dt.getUTCFullYear()}${p(dt.getUTCMonth() + 1)}${p(dt.getUTCDate())}T${p(dt.getUTCHours())}${p(dt.getUTCMinutes())}00Z`;
}

export async function GET() {
  const user = await getCurrentUser();
  const payload = await listEventsForRole(user?.role);
  const items = payload.items;
  const now = new Date();
  const p = (n: number) => String(n).padStart(2, '0');
  const dtStamp = `${now.getUTCFullYear()}${p(now.getUTCMonth() + 1)}${p(now.getUTCDate())}T${p(now.getUTCHours())}${p(now.getUTCMinutes())}${p(now.getUTCSeconds())}Z`;

  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//PTE-MIK-HOK//Calendar Export//HU',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
  ];

  for (const item of items) {
    const start = toIcsDateTime(item.date, item.time);
    if (!start) continue;
    const endDate = new Date(start.slice(0, 4) + '-' + start.slice(4, 6) + '-' + start.slice(6, 8) + 'T' + start.slice(9, 11) + ':' + start.slice(11, 13) + ':00Z');
    endDate.setUTCMinutes(endDate.getUTCMinutes() + 60);
    const end = `${endDate.getUTCFullYear()}${p(endDate.getUTCMonth() + 1)}${p(endDate.getUTCDate())}T${p(endDate.getUTCHours())}${p(endDate.getUTCMinutes())}00Z`;

    lines.push('BEGIN:VEVENT');
    lines.push(`UID:event-${item.id}@pte-mik-hok`);
    lines.push(`DTSTAMP:${dtStamp}`);
    lines.push(`DTSTART:${start}`);
    lines.push(`DTEND:${end}`);
    lines.push(`SUMMARY:${escIcs(item.titleHu)}`);
    lines.push(`LOCATION:${escIcs(item.location)}`);
    lines.push(`DESCRIPTION:${escIcs(`${item.category}${item.note ? ` - ${item.note}` : ''}`)}`);
    lines.push('END:VEVENT');
  }

  lines.push('END:VCALENDAR');
  const body = lines.join('\r\n');
  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'attachment; filename="pte-mik-hok-events.ics"',
      'Cache-Control': 'no-store',
    },
  });
}
