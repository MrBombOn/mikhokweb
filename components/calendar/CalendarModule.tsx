/**
 * @file Naptár + tornaterem modul (kliens)
 *
 * @description
 * A master spec szerinti **három nézet** ugyanarra a szűrt eseménylistára épül. Adatforrás:
 * **GET /api/events**, foglalások: **GET/POST /api/bookings**, admin státusz: **PATCH /api/bookings/[id]**,
 * új esemény: **POST /api/events**. A naptár-rács a `selectedDate` év–hónapja szerint dinamikus.
 */
'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useApp } from '@/components/layout/AppProvider';
import { Card, SectionHeader } from '@/components/ui/Core';
import { bookingRequests, calendarItems } from '@/lib/content';
import { canUseDemoFallback } from '@/lib/services/content-fetch-policy';
import type { CalendarView } from '@/types';
import type { CalendarEventItem, GymBookingItem } from '@/types/calendar';

type BookingForm = { name: string; email: string; organization: string; date: string; start: string; end: string; purpose: string };

function getEmptyForm(date: string): BookingForm {
  return { name: '', email: '', organization: '', date, start: '18:00', end: '20:00', purpose: '' };
}

function isoDate(parts: string) {
  return (parts || '').includes('.') ? parts.split('.').reverse().join('-') : parts;
}
function toMinutes(value?: string) {
  if (!value || !value.includes(':')) return null;
  const [h, m] = value.split(':').map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return null;
  return h * 60 + m;
}
function overlaps(aStart?: string, aEnd?: string, bStart?: string, bEnd?: string) {
  const aS = toMinutes(aStart),
    aE = toMinutes(aEnd),
    bS = toMinutes(bStart),
    bE = toMinutes(bEnd);
  if ([aS, aE, bS, bE].some((v) => v === null)) return false;
  return aS! < bE! && aE! > bS!;
}
function parseSlot(slot: string) {
  if (!slot) return { date: '', start: '', end: '' };
  const range = slot.match(/(\d{4}-\d{2}-\d{2})\s+(\d{2}:\d{2})-(\d{2}:\d{2})/);
  if (range) return { date: range[1], start: range[2], end: range[3] };
  const single = slot.match(/(\d{4}-\d{2}-\d{2})\s+(\d{2}:\d{2})/);
  if (single) return { date: single[1], start: single[2], end: single[2] };
  return { date: '', start: '', end: '' };
}

function fallbackEvents(): CalendarEventItem[] {
  return calendarItems.map((item) => ({
    id: item.id,
    titleHu: item.titleHu,
    titleEn: item.titleEn,
    date: item.date,
    time: item.time,
    location: item.location,
    category: item.category,
    dayLabel: item.dayLabel,
  }));
}

function fallbackBookings(): GymBookingItem[] {
  return bookingRequests.map((item, index) => {
    const slotStr = String(item.slot);
    const hasRange = /\d{2}:\d{2}-\d{2}:\d{2}/.test(slotStr);
    return {
      id: index + 100,
      title: item.title || 'Tornaterem foglalás',
      slot: hasRange ? slotStr : `${slotStr}-20:00`,
      applicant: 'requester' in item ? String((item as { requester?: string }).requester) : item.title,
      status: (item.status as GymBookingItem['status']) || 'pending',
      purpose: 'note' in item ? String((item as { note?: string }).note) : '',
    };
  });
}

async function fetchEventsList(): Promise<CalendarEventItem[] | null> {
  const r = await fetch('/api/events', { credentials: 'include' });
  if (!r.ok) return null;
  const data = (await r.json()) as { items?: CalendarEventItem[] };
  return Array.isArray(data.items) ? data.items : null;
}

async function fetchBookingsList(): Promise<GymBookingItem[] | null> {
  const r = await fetch('/api/bookings', { credentials: 'include' });
  if (!r.ok) return null;
  const data = (await r.json()) as { items?: GymBookingItem[] };
  return Array.isArray(data.items) ? data.items : null;
}

const dayNames = { hu: ['H', 'K', 'Sze', 'Cs', 'P', 'Szo', 'V'], en: ['M', 'T', 'W', 'T', 'F', 'S', 'S'] };

function pad2(n: number) {
  return String(n).padStart(2, '0');
}

function formatYmd(y: number, m0: number, day: number) {
  return `${y}-${pad2(m0 + 1)}-${pad2(day)}`;
}

export function CalendarModule() {
  const { lang, isAdmin, toast, openModal } = useApp();
  const [view, setView] = useState<CalendarView>('calendar');
  const [events, setEvents] = useState<CalendarEventItem[]>([]);
  const [requests, setRequests] = useState<GymBookingItem[]>([]);
  const [selectedDate, setSelectedDate] = useState('2026-05-08');
  const [form, setForm] = useState<BookingForm>(() => getEmptyForm('2026-05-08'));
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [query, setQuery] = useState('');

  const reloadFromApi = useCallback(async () => {
    const [ev, bk] = await Promise.all([fetchEventsList(), fetchBookingsList()]);
    if (ev) setEvents(ev);
    else setEvents(canUseDemoFallback() ? fallbackEvents() : []);
    if (bk) setRequests(bk);
    else setRequests(canUseDemoFallback() ? fallbackBookings() : []);
  }, []);

  useEffect(() => {
    void reloadFromApi();
  }, [reloadFromApi, isAdmin]);

  const eventDates = useMemo(() => events.map((item) => ({ ...item, iso: isoDate(item.date) })), [events]);
  const categories = useMemo(() => Array.from(new Set(events.map((item) => item.category))), [events]);
  const filteredEvents = useMemo(
    () =>
      eventDates
        .filter(
          (item) =>
            (categoryFilter === 'all' || item.category === categoryFilter) &&
            `${item.titleHu} ${item.titleEn} ${item.location} ${item.category}`.toLowerCase().includes(query.toLowerCase()),
        )
        .sort((a, b) => `${a.iso} ${a.time}`.localeCompare(`${b.iso} ${b.time}`)),
    [eventDates, categoryFilter, query],
  );
  const selectedDayEvents = useMemo(() => filteredEvents.filter((item) => item.iso === selectedDate), [filteredEvents, selectedDate]);
  const selectedDayBookings = useMemo(
    () =>
      requests.filter((item) => {
        const parsed = parseSlot(item.slot);
        return parsed.date === selectedDate && item.status !== 'rejected';
      }),
    [requests, selectedDate],
  );
  const bookingConflicts = useMemo(
    () =>
      requests
        .filter((item) => item.status !== 'rejected')
        .filter((item) => {
          const parsed = parseSlot(item.slot);
          if (!parsed.date || parsed.date !== form.date) return false;
          return overlaps(form.start, form.end, parsed.start, parsed.end);
        }),
    [requests, form],
  );

  const monthMeta = useMemo(() => {
    const parts = selectedDate.split('-').map(Number);
    const year = parts[0] ?? 2026;
    const month0 = (parts[1] ?? 5) - 1;
    return { year, month0 };
  }, [selectedDate]);

  const monthLabel = useMemo(() => {
    const d = new Date(monthMeta.year, monthMeta.month0, 1);
    return d.toLocaleDateString(lang === 'hu' ? 'hu-HU' : 'en-US', { year: 'numeric', month: 'long' });
  }, [monthMeta.year, monthMeta.month0, lang]);

  const monthDays = useMemo(() => {
    const { year, month0 } = monthMeta;
    const days: {
      day: number;
      date: string;
      muted: boolean;
      events: typeof filteredEvents;
      bookings: number;
      isSelected: boolean;
    }[] = [];

    const firstDay = new Date(year, month0, 1);
    const startOffset = (firstDay.getDay() + 6) % 7;
    const daysInMonth = new Date(year, month0 + 1, 0).getDate();
    const prevMonthLast = new Date(year, month0, 0);
    const prevDaysInMonth = prevMonthLast.getDate();
    const prevYear = month0 === 0 ? year - 1 : year;
    const prevMonth0 = month0 === 0 ? 11 : month0 - 1;

    for (let i = startOffset - 1; i >= 0; i--) {
      const day = prevDaysInMonth - i;
      const date = formatYmd(prevYear, prevMonth0, day);
      days.push({ day, date, muted: true, events: [], bookings: 0, isSelected: selectedDate === date });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = formatYmd(year, month0, day);
      days.push({
        day,
        date,
        muted: false,
        events: filteredEvents.filter((item) => item.iso === date),
        bookings: requests.filter((item) => parseSlot(item.slot).date === date && item.status !== 'rejected').length,
        isSelected: selectedDate === date,
      });
    }

    let tail = 0;
    while (days.length < 42) {
      tail += 1;
      const d = new Date(year, month0, daysInMonth + tail);
      const date = formatYmd(d.getFullYear(), d.getMonth(), d.getDate());
      days.push({
        day: d.getDate(),
        date,
        muted: true,
        events: [],
        bookings: 0,
        isSelected: selectedDate === date,
      });
    }

    return days;
  }, [filteredEvents, requests, selectedDate, monthMeta]);

  async function submitBooking() {
    if (!form.name.trim() || !form.email.trim() || !form.purpose.trim()) {
      toast(lang === 'hu' ? 'Töltsd ki a kötelező mezőket.' : 'Please fill in the required fields.', 'warning');
      return;
    }
    if ((toMinutes(form.start) ?? 0) >= (toMinutes(form.end) ?? 0)) {
      toast(lang === 'hu' ? 'A befejezés legyen később, mint a kezdés.' : 'End time must be later than start time.', 'warning');
      return;
    }
    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        applicantName: form.name.trim(),
        email: form.email.trim(),
        organization: form.organization.trim() || undefined,
        bookingDate: form.date,
        startTime: form.start,
        endTime: form.end,
        purpose: form.purpose.trim(),
        title: lang === 'hu' ? 'Tornaterem foglalás' : 'Gym booking',
      }),
    });
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    if (!res.ok) {
      toast(data.error ?? (lang === 'hu' ? 'Küldés sikertelen.' : 'Submit failed.'), 'warning');
      return;
    }
    setSelectedDate(form.date);
    setForm(getEmptyForm(form.date));
    await reloadFromApi();
    toast(lang === 'hu' ? 'Tornaterem foglalási igény rögzítve.' : 'Gym booking request submitted.', 'success');
  }

  async function updateRequest(id: number, status: GymBookingItem['status']) {
    const res = await fetch(`/api/bookings/${id}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) {
      toast(lang === 'hu' ? 'Státusz frissítése sikertelen.' : 'Could not update status.', 'warning');
      return;
    }
    await reloadFromApi();
    toast(
      status === 'approved' ? (lang === 'hu' ? 'Foglalás jóváhagyva.' : 'Booking approved.') : lang === 'hu' ? 'Foglalás elutasítva.' : 'Booking rejected.',
      status === 'approved' ? 'success' : 'warning',
    );
  }

  function openAdminPanel() {
    openModal(
      lang === 'hu' ? 'Naptár admin műveletek' : 'Calendar admin actions',
      lang === 'hu'
        ? 'Az admin kezelőgombok közvetlenül az eseménykártyákon és a foglalási sorokon érhetők el. Itt a felület egységes az admin szerkesztési mintával.'
        : 'Admin controls are available directly on event cards and booking rows. This modal confirms the unified admin editing pattern.',
    );
  }

  function editEvent(item: CalendarEventItem) {
    openModal(
      lang === 'hu' ? 'Esemény szerkesztése' : 'Edit event',
      `${lang === 'hu' ? item.titleHu : item.titleEn}
${item.date} • ${item.time}
${item.location}`,
    );
    toast(lang === 'hu' ? 'Eseményszerkesztő megnyitva (API PATCH később).' : 'Event editor opened (API PATCH later).', 'info');
  }

  async function createQuickEvent() {
    const res = await fetch('/api/events', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        titleHu: 'Új kari esemény',
        titleEn: 'New faculty event',
        eventDate: selectedDate,
        time: '16:00',
        location: 'MIK Aula',
        category: 'Közösség',
        dayLabel: lang === 'hu' ? 'Új esemény' : 'New event',
        note: lang === 'hu' ? 'Admin által létrehozott gyors esemény.' : 'Quick event created by admin.',
        status: 'published',
      }),
    });
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    if (!res.ok) {
      toast(data.error ?? (lang === 'hu' ? 'Létrehozás sikertelen.' : 'Create failed.'), 'warning');
      return;
    }
    await reloadFromApi();
    toast(lang === 'hu' ? 'Új esemény létrehozva.' : 'New event created.', 'success');
  }

  return (
    <section className="section calendar-v273">
      <SectionHeader
        eyebrow={lang === 'hu' ? 'Naptár és tornaterem' : 'Calendar and gym'}
        title={lang === 'hu' ? 'Szellős, egybefüggő naptárélmény' : 'Airy, unified calendar experience'}
        text={
          lang === 'hu'
            ? 'A három nézet ugyanarra a kiválasztott napra és szűrésre épül, a foglalás pedig kizárólag a tornateremhez tartozik. Adat: REST API.'
            : 'The three views share the same selected day and filters, while the booking flow is dedicated to the gym only. Data: REST API.'
        }
      />

      <div className="card calendar-master-panel">
        <div className="calendar-topline">
          <div className="calendar-topline-copy">
            <div className="badge">{monthLabel}</div>
            <h3>{selectedDate}</h3>
            <p>{lang === 'hu' ? 'A kijelölt nap minden nézetben szinkronban marad.' : 'The selected day stays synced across all views.'}</p>
          </div>
          <div className="calendar-topline-actions">
            <div className="calendar-view-switch">
              <button type="button" className={`btn ${view === 'timeline' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setView('timeline')}>
                Timeline
              </button>
              <button type="button" className={`btn ${view === 'cards' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setView('cards')}>
                Cards
              </button>
              <button type="button" className={`btn ${view === 'calendar' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setView('calendar')}>
                {lang === 'hu' ? 'Naptár' : 'Calendar'}
              </button>
            </div>
            {isAdmin ? (
              <button type="button" className="btn btn-secondary" onClick={openAdminPanel}>
                {lang === 'hu' ? 'Admin műveletek' : 'Admin actions'}
              </button>
            ) : null}
          </div>
        </div>

        <div className="calendar-filter-band">
          <input className="input" placeholder={lang === 'hu' ? 'Keresés események között' : 'Search events'} value={query} onChange={(e) => setQuery(e.target.value)} />
          <select className="select" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="all">{lang === 'hu' ? 'Minden kategória' : 'All categories'}</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <div className="calendar-summary-inline">
            <span>
              {filteredEvents.length} {lang === 'hu' ? 'esemény' : 'events'}
            </span>
            <span>
              {selectedDayBookings.length} {lang === 'hu' ? 'foglalás' : 'bookings'}
            </span>
          </div>
        </div>

        {view === 'timeline' ? (
          <div className="calendar-view-panel stack">
            <div className="calendar-day-banner">
              <div>
                <strong>{lang === 'hu' ? 'Kijelölt nap' : 'Selected day'}:</strong> {selectedDate}
              </div>
              <div className="muted-text">
                {selectedDayEvents.length ? (lang === 'hu' ? 'Események és időrend lentebb.' : 'Events and chronology below.') : lang === 'hu' ? 'Erre a napra nincs esemény.' : 'No events for this day.'}
              </div>
            </div>
            {selectedDayEvents.length ? (
              selectedDayEvents.map((item) => (
                <div key={item.id} className="card schedule-timeline-row">
                  <div className="schedule-time-box">
                    <div className="badge">{item.time}</div>
                    <span>{item.location}</span>
                  </div>
                  <div>
                    <h3>{lang === 'hu' ? item.titleHu : item.titleEn}</h3>
                    <p>
                      {item.category} • {item.date}
                    </p>
                    {item.note ? <p className="muted-text">{item.note}</p> : null}
                  </div>
                  {isAdmin ? (
                    <div className="news-admin-actions">
                      <button type="button" className="btn btn-ghost" onClick={() => editEvent(item)}>
                        {lang === 'hu' ? 'Szerkesztés' : 'Edit'}
                      </button>
                    </div>
                  ) : null}
                </div>
              ))
            ) : (
              <div className="card empty-state-card">{lang === 'hu' ? 'Nincs esemény a kiválasztott napra.' : 'No events for the selected day.'}</div>
            )}
          </div>
        ) : null}

        {view === 'cards' ? (
          <div className="calendar-view-panel event-grid-wide">
            {filteredEvents.map((item) => (
              <Card key={item.id} strong>
                <div className="badge">{item.date}</div>
                <h3 style={{ fontSize: 22 }}>{lang === 'hu' ? item.titleHu : item.titleEn}</h3>
                <p>
                  {item.time} • {item.location}
                </p>
                <p className="muted-text">{item.category}</p>
                {isAdmin ? (
                  <div className="news-admin-actions" style={{ marginTop: 12 }}>
                    <button type="button" className="btn btn-ghost" onClick={() => editEvent(item)}>
                      {lang === 'hu' ? 'Szerkesztés' : 'Edit'}
                    </button>
                  </div>
                ) : null}
              </Card>
            ))}
          </div>
        ) : null}

        {view === 'calendar' ? (
          <div className="calendar-view-panel">
            <div className="calendar-weekdays">
              {dayNames[lang].map((day) => (
                <div key={day} className="badge">
                  {day}
                </div>
              ))}
            </div>
            <div className="calendar-month-grid">
              {monthDays.map((day) => (
                <button
                  key={day.date}
                  type="button"
                  className={`calendar-day-cell ${day.muted ? 'muted' : ''} ${day.isSelected ? 'selected' : ''}`}
                  onClick={() => !day.muted && setSelectedDate(day.date)}
                >
                  <div className="calendar-day-head">
                    <strong>{day.day}</strong>
                    <span>{day.events.length + day.bookings}</span>
                  </div>
                  <div className="calendar-day-events">
                    {day.events.slice(0, 2).map((event) => (
                      <div key={event.id} className="calendar-day-pill">
                        {lang === 'hu' ? event.titleHu : event.titleEn}
                      </div>
                    ))}
                    {day.bookings ? (
                      <div className="calendar-booking-mini">
                        {day.bookings} {lang === 'hu' ? 'foglalás' : 'bookings'}
                      </div>
                    ) : null}
                    {!day.events.length && !day.bookings ? <div className="calendar-empty-mini">{lang === 'hu' ? 'Nincs esemény' : 'No events'}</div> : null}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <div className="calendar-bottom-grid">
        <div className="card booking-surface">
          <div className="badge">{lang === 'hu' ? 'Tornaterem foglalás' : 'Gym booking'}</div>
          <h3>{lang === 'hu' ? 'Foglalási igény a tornateremhez' : 'Booking request for the gym'}</h3>
          <p className="muted-text">{lang === 'hu' ? 'Ez a modul kizárólag a tornateremre vonatkozó foglalási igényeket kezeli.' : 'This form handles gym booking requests only.'}</p>
          <div className="stack" style={{ marginTop: 16 }}>
            <input className="input" placeholder={lang === 'hu' ? 'Név' : 'Name'} value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />
            <input className="input" placeholder="Email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} />
            <input className="input" placeholder={lang === 'hu' ? 'Szervezet / csapat' : 'Organization / team'} value={form.organization} onChange={(e) => setForm((p) => ({ ...p, organization: e.target.value }))} />
            <div className="calendar-form-grid">
              <input className="input" type="date" value={form.date} onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))} />
              <input className="input" type="time" value={form.start} onChange={(e) => setForm((p) => ({ ...p, start: e.target.value }))} />
              <input className="input" type="time" value={form.end} onChange={(e) => setForm((p) => ({ ...p, end: e.target.value }))} />
            </div>
            <textarea className="input" placeholder={lang === 'hu' ? 'Edzés vagy program célja' : 'Purpose of the training or event'} value={form.purpose} onChange={(e) => setForm((p) => ({ ...p, purpose: e.target.value }))} />
            {bookingConflicts.length ? (
              <div className="booking-conflict-box">
                <strong>{lang === 'hu' ? 'Lehetséges ütközés' : 'Possible conflict'}</strong>
                <div className="stack" style={{ marginTop: 8 }}>
                  {bookingConflicts.map((item) => (
                    <div key={item.id} className="muted-text">
                      {item.slot} • {item.applicant}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="booking-ok-box">{lang === 'hu' ? 'Nincs észlelt ütközés a tornatermi idősávban.' : 'No conflict detected for the gym time slot.'}</div>
            )}
            <button type="button" className="btn btn-primary" onClick={() => void submitBooking()}>
              {lang === 'hu' ? 'Foglalási igény küldése' : 'Send booking request'}
            </button>
          </div>
        </div>

        <div className="card queue-panel">
          <div className="badge">{lang === 'hu' ? 'Foglalási állapotok' : 'Booking statuses'}</div>
          <h3>{lang === 'hu' ? 'Tornaterem igények' : 'Gym requests'}</h3>
          <div className="stack" style={{ marginTop: 16 }}>
            {requests.map((item) => (
              <div key={item.id} className="request-row admin-row">
                <div>
                  <strong>{item.title}</strong>
                  <div className="muted-text">
                    {item.slot} • {item.applicant}
                  </div>
                  {item.purpose ? <div className="muted-text">{item.purpose}</div> : null}
                  <div className={`status-pill ${item.status}`}>{item.status}</div>
                </div>
                {isAdmin ? (
                  <div className="news-admin-actions">
                    <button type="button" className="btn btn-ghost" onClick={() => void updateRequest(item.id, 'approved')}>
                      {lang === 'hu' ? 'Elfogadás' : 'Approve'}
                    </button>
                    <button type="button" className="btn btn-ghost" onClick={() => void updateRequest(item.id, 'rejected')}>
                      {lang === 'hu' ? 'Elutasítás' : 'Reject'}
                    </button>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
          {isAdmin ? (
            <div className="news-admin-actions" style={{ marginTop: 16 }}>
              <button type="button" className="btn btn-secondary" onClick={() => void createQuickEvent()}>
                {lang === 'hu' ? 'Új esemény' : 'New event'}
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
