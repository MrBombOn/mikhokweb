/**
 * @file Naptár + tornaterem modul (kliens)
 *
 * @description
 * A master spec szerinti **három nézet** ugyanarra a szűrt eseménylistára épül. Napváltó: szélső gombok **hónap**, belső **nap**.
 * Adatforrás:
 * **GET /api/events**, foglalások: **GET/POST /api/bookings**, admin státusz: **PATCH /api/bookings/[id]**,
 * új esemény: **POST /api/events**; szerkesztés: **PATCH /api/events/[id]**; törlés: **DELETE /api/events/[id]** (soft).
 *
 * @i18n
 * Statikus szövegek: `lib/i18n/messages.ts` (`t(lang).calendar`), beleértve a rövid hét napjait és a foglalás-státusz feliratokat.
 */
'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useApp } from '@/components/layout/AppProvider';
import { AdminModal } from '@/components/ui/AdminModal';
import { Card, SectionHeader } from '@/components/ui/Core';
import { ErrorState } from '@/components/ui/ErrorState';
import { ModuleAdminToolbar } from '@/components/ui/ModuleAdminToolbar';
import { CustomSelect } from '@/components/ui/CustomSelect';
import { Skeleton } from '@/components/ui/Skeleton';
import { bookingRequests, calendarItems, t } from '@/lib/content';
import { canUseDemoFallback } from '@/lib/services/content-fetch-policy';
import type { CalendarView } from '@/types';
import type { CalendarEventItem, CalendarEventStatus, GymBookingItem } from '@/types/calendar';

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

function fallbackBookings(defaultTitle: string): GymBookingItem[] {
  return bookingRequests.map((item, index) => {
    const slotStr = String(item.slot);
    const hasRange = /\d{2}:\d{2}-\d{2}:\d{2}/.test(slotStr);
    return {
      id: index + 100,
      title: item.title || defaultTitle,
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

function pad2(n: number) {
  return String(n).padStart(2, '0');
}

function formatYmd(y: number, m0: number, day: number) {
  return `${y}-${pad2(m0 + 1)}-${pad2(day)}`;
}

function todayYmd() {
  const d = new Date();
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

function timelineToneClass(category: string) {
  const value = category.toLowerCase();
  if (value.includes('sport')) return 'timeline-tone-sport';
  if (value.includes('tanulm') || value.includes('study')) return 'timeline-tone-study';
  if (value.includes('köz') || value.includes('community')) return 'timeline-tone-community';
  return 'timeline-tone-default';
}

function toGoogleDateTime(date: string, time: string, addMinutes = 0) {
  const [y, m, d] = date.split('-').map(Number);
  const [hh, mm] = time.split(':').map(Number);
  if (!y || !m || !d || Number.isNaN(hh) || Number.isNaN(mm)) return null;
  const dt = new Date(Date.UTC(y, m - 1, d, hh, mm, 0));
  dt.setUTCMinutes(dt.getUTCMinutes() + addMinutes);
  const p = (n: number) => String(n).padStart(2, '0');
  return `${dt.getUTCFullYear()}${p(dt.getUTCMonth() + 1)}${p(dt.getUTCDate())}T${p(dt.getUTCHours())}${p(dt.getUTCMinutes())}00Z`;
}

function buildGoogleCalendarUrl(item: CalendarEventItem, lang: 'hu' | 'en') {
  const title = lang === 'hu' ? item.titleHu : item.titleEn;
  const start = toGoogleDateTime(item.date, item.time, 0);
  const end = toGoogleDateTime(item.date, item.time, 60);
  if (!start || !end) return null;
  const details = `${item.category}${item.note ? ` - ${item.note}` : ''}`;
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${start}/${end}`,
    location: item.location,
    details,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

const EVENT_STATUS_OPTIONS: CalendarEventStatus[] = ['draft', 'scheduled', 'published', 'archived'];

export function CalendarModule() {
  const { lang, isAdmin, sessionUser, toast, openModal, requestConfirm } = useApp();
  const canManageNewsUi = sessionUser?.role === 'OFFICE' || sessionUser?.role === 'ADMIN';
  const dict = t(lang);
  const c = dict.calendar;
  const [view, setView] = useState<CalendarView>('timeline');
  const [events, setEvents] = useState<CalendarEventItem[]>([]);
  const [requests, setRequests] = useState<GymBookingItem[]>([]);
  const [loadStatus, setLoadStatus] = useState<'loading' | 'error' | 'ready'>('loading');
  const [selectedDate, setSelectedDate] = useState(() => todayYmd());
  const [form, setForm] = useState<BookingForm>(() => getEmptyForm(todayYmd()));
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState<'all' | GymBookingItem['status']>('all');
  const [statusQuery, setStatusQuery] = useState('');
  const [showEventEditModal, setShowEventEditModal] = useState(false);
  const [eventEditingId, setEventEditingId] = useState<number | null>(null);
  const [eventEditForm, setEventEditForm] = useState({
    titleHu: '',
    titleEn: '',
    eventDate: '',
    time: '',
    location: '',
    category: '',
    dayLabel: '',
    note: '',
    status: 'published' as CalendarEventStatus,
  });
  const [showDayInlineDetails, setShowDayInlineDetails] = useState(false);

  const refreshData = useCallback(async () => {
    const cal = t(lang).calendar;
    const [ev, bk] = await Promise.all([fetchEventsList(), fetchBookingsList()]);
    if (ev !== null) setEvents(ev);
    else if (canUseDemoFallback()) setEvents(fallbackEvents());
    else setEvents([]);
    if (bk !== null) setRequests(bk);
    else if (canUseDemoFallback()) setRequests(fallbackBookings(cal.defaultBookingTitle));
    else setRequests([]);
  }, [lang]);

  const loadInitial = useCallback(async () => {
    setLoadStatus('loading');
    const cal = t(lang).calendar;
    const [ev, bk] = await Promise.all([fetchEventsList(), fetchBookingsList()]);
    let eventsOk = false;
    let bookingsOk = false;
    if (ev !== null) {
      setEvents(ev);
      eventsOk = true;
    } else if (canUseDemoFallback()) {
      setEvents(fallbackEvents());
      eventsOk = true;
    } else {
      setEvents([]);
    }
    if (bk !== null) {
      setRequests(bk);
      bookingsOk = true;
    } else if (canUseDemoFallback()) {
      setRequests(fallbackBookings(cal.defaultBookingTitle));
      bookingsOk = true;
    } else {
      setRequests([]);
    }
    if (!eventsOk && !bookingsOk) setLoadStatus('error');
    else setLoadStatus('ready');
  }, [lang]);

  useEffect(() => {
    void loadInitial();
  }, [loadInitial, isAdmin]);

  const goToToday = useCallback(() => {
    const ymd = todayYmd();
    setSelectedDate(ymd);
    setForm((p) => ({ ...p, date: ymd }));
  }, []);

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
  const statusModalRows = useMemo(
    () =>
      requests
        .filter((item) => statusFilter === 'all' || item.status === statusFilter)
        .filter((item) => {
          const q = statusQuery.trim().toLowerCase();
          if (!q) return true;
          return `${item.title} ${item.applicant} ${item.slot} ${item.purpose ?? ''}`.toLowerCase().includes(q);
        }),
    [requests, statusFilter, statusQuery],
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

  const selectedDateLabel = useMemo(() => {
    const d = new Date(`${selectedDate}T00:00:00`);
    return d.toLocaleDateString(lang === 'hu' ? 'hu-HU' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    });
  }, [selectedDate, lang]);

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
      toast(c.fillRequired, 'warning');
      return false;
    }
    if ((toMinutes(form.start) ?? 0) >= (toMinutes(form.end) ?? 0)) {
      toast(c.endAfterStart, 'warning');
      return false;
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
        title: lang === 'hu' ? c.bookingPostTitleHu : c.bookingPostTitleEn,
        locale: lang,
      }),
    });
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    if (!res.ok) {
      toast(data.error ?? c.submitFailed, 'warning');
      return false;
    }
    setSelectedDate(form.date);
    setForm(getEmptyForm(form.date));
    await refreshData();
    toast(c.bookingSubmitted, 'success');
    return true;
  }

  async function updateRequest(id: number, status: GymBookingItem['status']) {
    const res = await fetch(`/api/bookings/${id}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) {
      toast(c.statusUpdateFailed, 'warning');
      return;
    }
    await refreshData();
    toast(status === 'approved' ? c.bookingApproved : c.bookingRejected, status === 'approved' ? 'success' : 'warning');
  }

  function openAdminPanel() {
    openModal(c.adminPanelTitle, c.adminPanelBody);
  }

  function openEventEditor(item: CalendarEventItem) {
    setEventEditingId(item.id);
    const st = item.status && item.status !== 'deleted' ? item.status : 'published';
    setEventEditForm({
      titleHu: item.titleHu,
      titleEn: item.titleEn,
      eventDate: item.date,
      time: item.time,
      location: item.location,
      category: item.category,
      dayLabel: item.dayLabel ?? '',
      note: item.note ?? '',
      status: EVENT_STATUS_OPTIONS.includes(st as CalendarEventStatus) ? (st as CalendarEventStatus) : 'published',
    });
    setShowEventEditModal(true);
  }

  async function saveEventEdit() {
    if (eventEditingId == null) return;
    const body = {
      titleHu: eventEditForm.titleHu.trim(),
      titleEn: eventEditForm.titleEn.trim(),
      eventDate: eventEditForm.eventDate,
      time: eventEditForm.time.trim(),
      location: eventEditForm.location.trim(),
      category: eventEditForm.category.trim(),
      dayLabel: eventEditForm.dayLabel.trim() || undefined,
      note: eventEditForm.note.trim() || undefined,
      status: eventEditForm.status,
    };
    const res = await fetch(`/api/events/${eventEditingId}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    if (!res.ok) {
      toast(data.error ?? c.eventSaveFailed, 'warning');
      return;
    }
    await refreshData();
    setShowEventEditModal(false);
    setEventEditingId(null);
    toast(c.eventSaved, 'success');
  }

  async function deleteEventEdit() {
    if (eventEditingId == null) return;
    const ok = await requestConfirm({
      message: c.eventDeleteConfirm,
      destructive: true,
      confirmLabel: dict.common.delete,
      cancelLabel: dict.common.cancel,
    });
    if (!ok) return;
    const res = await fetch(`/api/events/${eventEditingId}`, { method: 'DELETE', credentials: 'include' });
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    if (!res.ok) {
      toast(data.error ?? c.eventDeleteFailed, 'warning');
      return;
    }
    await refreshData();
    setShowEventEditModal(false);
    setEventEditingId(null);
    toast(c.eventDeleted, 'success');
  }

  function eventStatusLabel(s: CalendarEventStatus) {
    switch (s) {
      case 'draft':
        return c.eventStatusDraft;
      case 'scheduled':
        return c.eventStatusScheduled;
      case 'published':
        return c.eventStatusPublished;
      case 'archived':
        return c.eventStatusArchived;
      default:
        return s;
    }
  }

  function bookingStatusLabel(s: GymBookingItem['status']) {
    switch (s) {
      case 'pending':
        return c.bookingStatusPending;
      case 'approved':
        return c.bookingStatusApproved;
      case 'rejected':
        return c.bookingStatusRejected;
      default:
        return s;
    }
  }

  async function createQuickEvent() {
    const res = await fetch('/api/events', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        titleHu: c.quickTitleHu,
        titleEn: c.quickTitleEn,
        eventDate: selectedDate,
        time: '16:00',
        location: c.quickLocation,
        category: c.quickCategory,
        dayLabel: lang === 'hu' ? c.quickDayLabelHu : c.quickDayLabelEn,
        note: lang === 'hu' ? c.quickNoteHu : c.quickNoteEn,
        status: 'published',
      }),
    });
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    if (!res.ok) {
      toast(data.error ?? c.createFailed, 'warning');
      return;
    }
    await refreshData();
    toast(c.eventCreated, 'success');
  }

  function shiftSelectedMonth(months: number) {
    const d = new Date(`${selectedDate}T00:00:00`);
    d.setMonth(d.getMonth() + months);
    setSelectedDate(`${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`);
  }

  function shiftSelectedDay(days: number) {
    const d = new Date(`${selectedDate}T00:00:00`);
    d.setDate(d.getDate() + days);
    setSelectedDate(`${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`);
  }

  function openDayPreview(date: string) {
    setSelectedDate(date);
    setShowDayInlineDetails(true);
  }

  return (
    <section className="section calendar-v273">
      <SectionHeader eyebrow={c.eyebrow} title={c.title} text={c.lead} />

      {isAdmin ? (
        <ModuleAdminToolbar title={dict.common.moduleAdminToolbarTitle} ariaLabel={dict.common.moduleAdminToolbarAria}>
          {canManageNewsUi ? (
            <>
              <button type="button" className="btn btn-secondary" onClick={openAdminPanel}>
                {c.adminActions}
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => void createQuickEvent()}>
                {c.newEvent}
              </button>
            </>
          ) : null}
          <button type="button" className="btn btn-secondary" onClick={() => setShowStatusModal(true)}>
            {c.bookingStatuses}
          </button>
        </ModuleAdminToolbar>
      ) : null}

      {loadStatus === 'loading' ? (
        <div role="status" aria-live="polite" aria-label={c.loadingAria}>
          <Skeleton variant="searchResults" />
        </div>
      ) : loadStatus === 'error' ? (
        <ErrorState
          title={c.loadErrorTitle}
          message={c.loadErrorMessage}
          onRetry={() => void loadInitial()}
          retryLabel={c.retry}
        />
      ) : (
      <div className="card calendar-master-panel">
        <div className="calendar-topline">
          <div className="calendar-topline-copy">
            <div className="badge">{monthLabel}</div>
            <h3>{selectedDateLabel}</h3>
            <p>{c.syncNote}</p>
          </div>
          <div className="calendar-topline-actions">
            <Link className="btn btn-secondary" href="/api/events/ics">
              {c.exportIcs}
            </Link>
            <div className="calendar-view-switch" role="group" aria-label={c.eyebrow}>
              <button
                type="button"
                aria-pressed={view === 'timeline'}
                className={`btn ${view === 'timeline' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setView('timeline')}
              >
                {c.viewTimeline}
              </button>
              <button
                type="button"
                aria-pressed={view === 'cards'}
                className={`btn ${view === 'cards' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setView('cards')}
              >
                {c.viewCards}
              </button>
              <button
                type="button"
                aria-pressed={view === 'calendar'}
                className={`btn ${view === 'calendar' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setView('calendar')}
              >
                {c.viewCalendar}
              </button>
            </div>
          </div>
        </div>

        <div className="calendar-filter-band">
          <input
            className="input"
            placeholder={c.searchPlaceholder}
            aria-label={c.searchAria}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <CustomSelect
            ariaLabel={c.categoryAria}
            value={categoryFilter}
            onChange={setCategoryFilter}
            options={[{ value: 'all', label: c.categoryAll }, ...categories.map((cat) => ({ value: cat, label: cat }))]}
          />
          <div className="calendar-summary-inline">
            <span>
              {lang === 'en'
                ? `${filteredEvents.length} ${filteredEvents.length === 1 ? c.eventsOne : c.eventsMany}`
                : `${filteredEvents.length} ${c.eventsLabel}`}
            </span>
            <span>
              {`${selectedDayBookings.length} ${selectedDayBookings.length === 1 ? c.bookingOne : c.bookingMany}`}
            </span>
          </div>
        </div>

        <div className="calendar-day-nav">
          <div className="calendar-day-nav-actions">
            <button type="button" className="btn btn-secondary calendar-nav-arrow" onClick={() => shiftSelectedMonth(-1)} aria-label={c.ariaPrevMonth}>
              «
            </button>
            <button type="button" className="btn btn-secondary calendar-nav-arrow" onClick={() => shiftSelectedDay(-1)} aria-label={c.ariaPrevDay}>
              ‹
            </button>
            <div className="calendar-day-nav-label" aria-label={c.dateNavIsoAria}>
              {selectedDate}
            </div>
            <button type="button" className="btn btn-secondary calendar-nav-arrow" onClick={() => shiftSelectedDay(1)} aria-label={c.ariaNextDay}>
              ›
            </button>
            <button type="button" className="btn btn-secondary calendar-nav-arrow" onClick={() => shiftSelectedMonth(1)} aria-label={c.ariaNextMonth}>
              »
            </button>
            <button type="button" className="btn btn-secondary" onClick={goToToday}>
              {c.jumpToToday}
            </button>
          </div>
        </div>

        <div className="calendar-booking-actions">
          <button type="button" className="btn btn-primary" onClick={() => setShowBookingModal(true)}>
            {c.bookingRequest}
          </button>
          {isAdmin ? (
            <button type="button" className="btn btn-secondary" onClick={() => setShowStatusModal(true)}>
              {c.bookingStatuses}
            </button>
          ) : null}
        </div>

        {view === 'timeline' ? (
          <div className="calendar-view-panel stack">
            <div className="calendar-day-banner calendar-day-status" role="status" aria-live="polite">
              <span className="calendar-day-status-badge">
                {selectedDayEvents.length === 0 && selectedDayBookings.length === 0
                  ? c.timelineStatusEmpty
                  : lang === 'hu'
                    ? `${selectedDayEvents.length} ${c.eventsLabel} · ${selectedDayBookings.length} ${selectedDayBookings.length === 1 ? c.bookingOne : c.bookingMany}`
                    : `${selectedDayEvents.length} ${selectedDayEvents.length === 1 ? c.eventsOne : c.eventsMany} · ${selectedDayBookings.length} ${selectedDayBookings.length === 1 ? c.bookingOne : c.bookingMany}`}
              </span>
            </div>
            {selectedDayEvents.length ? (
              <div className="calendar-timeline-stack">
                {selectedDayEvents.map((item, index) => (
                <div
                  key={item.id}
                  className={`card schedule-timeline-row ${timelineToneClass(item.category)} expand-on-tap calendar-stagger-${Math.min(index, 40)}`}
                  data-expandable="true"
                  role="button"
                  tabIndex={0}
                  aria-expanded="false"
                >
                  <div className="schedule-time-box">
                    <div className="badge">{item.time}</div>
                    <span>{item.location}</span>
                  </div>
                  <div>
                    <h3>{lang === 'hu' ? item.titleHu : item.titleEn}</h3>
                    <p>
                      {item.category} · {item.location}
                    </p>
                    {item.note ? <p className="muted-text">{item.note}</p> : null}
                    <div className="tap-details muted-text" data-expand-details hidden>
                      {c.details}: {item.time} • {item.location}
                    </div>
                    {buildGoogleCalendarUrl(item, lang) ? (
                      <a
                        className="btn btn-secondary"
                        href={buildGoogleCalendarUrl(item, lang)!}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {c.addToGoogleCalendar}
                      </a>
                    ) : null}
                  </div>
                  {canManageNewsUi ? (
                    <div className="module-admin-inline-actions">
                      <button type="button" className="btn btn-secondary" onClick={() => openEventEditor(item)}>
                        {c.edit}
                      </button>
                    </div>
                  ) : null}
                </div>
                ))}
              </div>
            ) : (
              <div className="card empty-state-card">{c.noEventsEmptyCard}</div>
            )}
          </div>
        ) : null}

        {view === 'cards' ? (
          <div className="calendar-view-panel event-grid-wide">
            <div className="calendar-view-sync-hint muted-text" role="status">
              {c.viewCardsHint.replace(/\{date\}/g, selectedDate)}
            </div>
            {selectedDayEvents.length ? (
              selectedDayEvents.map((item, index) => (
                <div key={item.id} className={`calendar-event-card-anim calendar-stagger-${Math.min(index, 40)}`}>
                  <Card
                    strong
                    className={`expand-on-tap calendar-event-day-card ${timelineToneClass(item.category)}`}
                    dataExpandable
                  >
                    <div className="badge">{item.time}</div>
                    <h3 className="calendar-event-card-title">{lang === 'hu' ? item.titleHu : item.titleEn}</h3>
                    <p>
                      {item.time} • {item.location}
                    </p>
                    <p className="muted-text">{item.category}</p>
                    <div className="tap-details muted-text" data-expand-details hidden>
                      {item.note ?? c.noNote}
                    </div>
                    {buildGoogleCalendarUrl(item, lang) ? (
                      <a
                        className="btn btn-secondary"
                        href={buildGoogleCalendarUrl(item, lang)!}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {c.addToGoogleCalendar}
                      </a>
                    ) : null}
                    {canManageNewsUi ? (
                      <div className="module-admin-inline-actions calendar-event-card-actions">
                        <button type="button" className="btn btn-secondary" onClick={() => openEventEditor(item)}>
                          {c.edit}
                        </button>
                      </div>
                    ) : null}
                  </Card>
                </div>
              ))
            ) : (
              <div className="card empty-state-card">{c.noEventsEmptyCard}</div>
            )}
          </div>
        ) : null}

        {view === 'calendar' ? (
          <div className="calendar-view-panel">
            <div className="calendar-view-sync-hint muted-text" role="status">
              {c.viewCalendarHint.replace(/\{date\}/g, selectedDate)}
            </div>
            <div className="calendar-weekdays">
              {c.weekdaysShort.map((day, i) => (
                <div key={`${i}-${day}`} className="badge">
                  {day}
                </div>
              ))}
            </div>
            <div className="calendar-month-grid">
              {monthDays.map((day) => (
                <button
                  key={day.date}
                  type="button"
                  disabled={day.muted}
                  className={`calendar-day-cell ${day.muted ? 'muted' : ''} ${day.isSelected ? 'selected' : ''}`}
                  onClick={() => openDayPreview(day.date)}
                >
                  <div className="calendar-day-head">
                    <strong>{day.day}</strong>
                    <span>{day.events.length + day.bookings}</span>
                  </div>
                  <div className="calendar-day-events">
                    {day.events.slice(0, 2).map((event) => (
                      <div key={event.id} className={`calendar-day-pill ${timelineToneClass(event.category)}`}>
                        {lang === 'hu' ? event.titleHu : event.titleEn}
                      </div>
                    ))}
                    {day.bookings ? (
                      <div className="calendar-booking-mini">
                        {day.bookings}{' '}
                        {day.bookings === 1 ? c.bookingOne : c.bookingMany}
                      </div>
                    ) : null}
                    {!day.events.length && !day.bookings ? <div className="calendar-empty-mini">{c.miniNoEvents}</div> : null}
                  </div>
                </button>
              ))}
            </div>
            {showDayInlineDetails ? (
              <div className="card card-pad">
                <div className="admin-toolbar">
                  <div>
                    <h3 className="calendar-day-inline-title">{c.dayEventsTitle}</h3>
                    <p className="muted-text calendar-day-inline-sub">
                      {selectedDateLabel}
                    </p>
                  </div>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowDayInlineDetails(false)}>
                    {c.close}
                  </button>
                </div>
                {selectedDayEvents.length ? (
                  <div className="stack">
                    {selectedDayEvents.map((item) => (
                      <div key={item.id} className="card card-pad">
                        <h4 className="calendar-day-item-title">{lang === 'hu' ? item.titleHu : item.titleEn}</h4>
                        <p className="muted-text calendar-day-item-meta">
                          {item.time} • {item.location}
                        </p>
                        <p className="muted-text calendar-day-item-cat">
                          {item.category}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="muted-text">{c.noEventsDay}</p>
                )}
                <div className="news-form-actions">
                  <button type="button" className="btn btn-primary" onClick={() => setView('timeline')}>
                    {c.goTimeline}
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
      )}

      <AdminModal
        open={showBookingModal}
        title={c.bookingModalTitle}
        closeLabel={dict.common.modalClose}
        onClose={() => setShowBookingModal(false)}
        disableAnimation
      >
        <div className="stack calendar-modal-stack calendar-unified-modal-content">
          <p className="muted-text">{c.bookingIntro}</p>
          <input className="input" placeholder={c.placeholderName} value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />
          <input className="input" placeholder={c.placeholderEmail} value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} />
          <input className="input" placeholder={c.placeholderOrg} value={form.organization} onChange={(e) => setForm((p) => ({ ...p, organization: e.target.value }))} />
          <div className="calendar-form-grid">
            <input
              className="input"
              type="date"
              aria-label={c.bookingFieldDate}
              value={form.date}
              onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
            />
            <input
              className="input"
              type="time"
              aria-label={c.bookingFieldStart}
              value={form.start}
              onChange={(e) => setForm((p) => ({ ...p, start: e.target.value }))}
            />
            <input
              className="input"
              type="time"
              aria-label={c.bookingFieldEnd}
              value={form.end}
              onChange={(e) => setForm((p) => ({ ...p, end: e.target.value }))}
            />
          </div>
          <textarea className="input" placeholder={c.placeholderPurpose} value={form.purpose} onChange={(e) => setForm((p) => ({ ...p, purpose: e.target.value }))} />
          {bookingConflicts.length ? (
            <div className="booking-conflict-box">
              <strong>{c.conflictHeading}</strong>
              <div className="stack calendar-conflict-list">
                {bookingConflicts.map((item) => (
                  <div key={item.id} className="muted-text">
                    {item.slot} • {item.applicant}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="booking-ok-box">{c.noConflict}</div>
          )}
          <button
            type="button"
            className="btn btn-primary"
            onClick={async () => {
              const ok = await submitBooking();
              if (ok) setShowBookingModal(false);
            }}
          >
            {c.sendBooking}
          </button>
        </div>
      </AdminModal>

      <AdminModal
        open={isAdmin && showStatusModal}
        title={c.statusModalTitle}
        closeLabel={dict.common.modalClose}
        onClose={() => setShowStatusModal(false)}
        disableAnimation
      >
        <div className="stack calendar-modal-stack calendar-unified-modal-content">
          <div className="admin-toolbar">
            <select className="select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as 'all' | GymBookingItem['status'])}>
              <option value="all">all</option>
              <option value="pending">{c.bookingStatusPending}</option>
              <option value="approved">{c.bookingStatusApproved}</option>
              <option value="rejected">{c.bookingStatusRejected}</option>
            </select>
            <input
              className="input"
              value={statusQuery}
              onChange={(e) => setStatusQuery(e.target.value)}
              placeholder={lang === 'hu' ? 'Keresés (név, idősáv, cél)' : 'Search (name, slot, purpose)'}
              aria-label={lang === 'hu' ? 'Foglalás szűrés keresés' : 'Booking filter search'}
            />
          </div>
          {!statusModalRows.length ? <p className="muted-text">{c.bookingsListEmpty}</p> : null}
          {statusModalRows.map((item) => (
            <div key={item.id} className="request-row admin-row">
              <div>
                <strong>{item.title}</strong>
                <div className="muted-text">
                  {item.slot} • {item.applicant}
                </div>
                {item.purpose ? <div className="muted-text">{item.purpose}</div> : null}
                <div className={`status-pill ${item.status}`}>{bookingStatusLabel(item.status)}</div>
              </div>
              {isAdmin ? (
                <div className="module-admin-inline-actions">
                  <button type="button" className="btn btn-secondary" onClick={() => void updateRequest(item.id, 'approved')}>
                    {c.bookingApprove}
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={() => void updateRequest(item.id, 'rejected')}>
                    {c.bookingReject}
                  </button>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </AdminModal>

      <AdminModal
        open={showEventEditModal}
        title={c.editEventTitle}
        closeLabel={dict.common.modalClose}
        onClose={() => {
          setShowEventEditModal(false);
          setEventEditingId(null);
        }}
        disableAnimation
      >
        <div className="stack calendar-modal-stack calendar-unified-modal-content">
          <p className="muted-text">{c.eventEditLead}</p>
          <label className="stack calendar-modal-field-gap">
            <span className="muted-text">{c.eventLabelTitleHu}</span>
            <input className="input" value={eventEditForm.titleHu} onChange={(e) => setEventEditForm((p) => ({ ...p, titleHu: e.target.value }))} />
          </label>
          <label className="stack calendar-modal-field-gap">
            <span className="muted-text">{c.eventLabelTitleEn}</span>
            <input className="input" value={eventEditForm.titleEn} onChange={(e) => setEventEditForm((p) => ({ ...p, titleEn: e.target.value }))} />
          </label>
          <div className="calendar-form-grid">
            <label className="stack calendar-modal-field-gap">
              <span className="muted-text">{c.eventLabelDate}</span>
              <input className="input" type="date" value={eventEditForm.eventDate} onChange={(e) => setEventEditForm((p) => ({ ...p, eventDate: e.target.value }))} />
            </label>
            <label className="stack calendar-modal-field-gap">
              <span className="muted-text">{c.eventLabelTime}</span>
              <input className="input" value={eventEditForm.time} onChange={(e) => setEventEditForm((p) => ({ ...p, time: e.target.value }))} />
            </label>
            <label className="stack calendar-modal-field-gap">
              <span className="muted-text">{c.eventLabelLocation}</span>
              <input className="input" value={eventEditForm.location} onChange={(e) => setEventEditForm((p) => ({ ...p, location: e.target.value }))} />
            </label>
          </div>
          <label className="stack calendar-modal-field-gap">
            <span className="muted-text">{c.eventLabelCategory}</span>
            <input className="input" value={eventEditForm.category} onChange={(e) => setEventEditForm((p) => ({ ...p, category: e.target.value }))} />
          </label>
          <label className="stack calendar-modal-field-gap">
            <span className="muted-text">{c.eventLabelDayLabel}</span>
            <input className="input" value={eventEditForm.dayLabel} onChange={(e) => setEventEditForm((p) => ({ ...p, dayLabel: e.target.value }))} />
          </label>
          <label className="stack calendar-modal-field-gap">
            <span className="muted-text">{c.eventLabelNote}</span>
            <textarea className="input" rows={3} value={eventEditForm.note} onChange={(e) => setEventEditForm((p) => ({ ...p, note: e.target.value }))} />
          </label>
          <label className="stack calendar-modal-field-gap">
            <span className="muted-text">{c.eventLabelStatus}</span>
            <select
              className="input select"
              value={eventEditForm.status}
              onChange={(e) => setEventEditForm((p) => ({ ...p, status: e.target.value as CalendarEventStatus }))}
            >
              {EVENT_STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {eventStatusLabel(s)}
                </option>
              ))}
            </select>
          </label>
          <div className="news-form-actions">
            <button type="button" className="btn btn-primary" onClick={() => void saveEventEdit()}>
              {c.eventSave}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setShowEventEditModal(false);
                setEventEditingId(null);
              }}
            >
              {c.eventCancel}
            </button>
            {canManageNewsUi ? (
              <button type="button" className="btn btn-secondary" onClick={() => void deleteEventEdit()}>
                {c.eventDelete}
              </button>
            ) : null}
          </div>
        </div>
      </AdminModal>

    </section>
  );
}
