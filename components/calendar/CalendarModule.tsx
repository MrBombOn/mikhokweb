'use client';
import { useMemo, useState } from 'react';
import { useApp } from '@/components/layout/AppProvider';
import { Card, SectionHeader } from '@/components/ui/Core';
import { bookingRequests, calendarItems } from '@/lib/content';
import type { CalendarView } from '@/types';

type RequestStatus = 'pending' | 'approved' | 'rejected';
type EventItem = { id:number; titleHu:string; titleEn:string; date:string; time:string; location:string; category:string; dayLabel:string; note?:string; };
type BookingForm = { name:string; email:string; organization:string; date:string; start:string; end:string; purpose:string; };
type BookingRow = { id:number; title:string; slot:string; applicant:string; status:RequestStatus; purpose?:string; };

const initialEvents: EventItem[] = calendarItems.map((item) => ({ ...item }));
const seededRequests: BookingRow[] = bookingRequests.map((item, index) => ({
  id: index + 100,
  title: item.title || 'Tornaterem foglalás',
  slot: item.slot || '',
  applicant: 'requester' in item ? String((item as { requester?: string }).requester) : item.title,
  status: (item.status as RequestStatus) || 'pending',
  purpose: 'note' in item ? String((item as { note?: string }).note) : '',
}));
const emptyForm: BookingForm = { name:'', email:'', organization:'', date:'2026-05-08', start:'18:00', end:'20:00', purpose:'' };
const dayNames = { hu:['H','K','Sze','Cs','P','Szo','V'], en:['M','T','W','T','F','S','S'] };

function isoDate(parts:string){ return (parts || '').includes('.') ? parts.split('.').reverse().join('-') : parts; }
function toMinutes(value?:string){ if (!value || !value.includes(':')) return null; const [h,m] = value.split(':').map(Number); if (Number.isNaN(h) || Number.isNaN(m)) return null; return h * 60 + m; }
function overlaps(aStart?:string,aEnd?:string,bStart?:string,bEnd?:string){ const aS = toMinutes(aStart), aE = toMinutes(aEnd), bS = toMinutes(bStart), bE = toMinutes(bEnd); if ([aS,aE,bS,bE].some((v) => v === null)) return false; return aS! < bE! && aE! > bS!; }
function parseSlot(slot:string){ if (!slot) return { date:'', start:'', end:'' }; const match = slot.match(/(\d{4}-\d{2}-\d{2})\s+(\d{2}:\d{2})-(\d{2}:\d{2})/); if (match) return { date:match[1], start:match[2], end:match[3] }; return { date:'', start:'', end:'' }; }

export function CalendarModule() {
  const { lang, isAdmin, toast, openModal } = useApp();
  const [view, setView] = useState<CalendarView>('calendar');
  const [events, setEvents] = useState<EventItem[]>(initialEvents);
  const [requests, setRequests] = useState<BookingRow[]>(seededRequests);
  const [form, setForm] = useState<BookingForm>(emptyForm);
  const [selectedDate, setSelectedDate] = useState('2026-05-08');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [query, setQuery] = useState('');

  const eventDates = useMemo(() => events.map((item) => ({ ...item, iso: isoDate(item.date) })), [events]);
  const categories = useMemo(() => Array.from(new Set(events.map((item) => item.category))), [events]);
  const filteredEvents = useMemo(() => eventDates.filter((item) => (categoryFilter === 'all' || item.category === categoryFilter) && `${item.titleHu} ${item.titleEn} ${item.location} ${item.category}`.toLowerCase().includes(query.toLowerCase())).sort((a,b) => `${a.iso} ${a.time}`.localeCompare(`${b.iso} ${b.time}`)), [eventDates, categoryFilter, query]);
  const selectedDayEvents = useMemo(() => filteredEvents.filter((item) => item.iso === selectedDate), [filteredEvents, selectedDate]);
  const selectedDayBookings = useMemo(() => requests.filter((item) => { const parsed = parseSlot(item.slot); return parsed.date === selectedDate && item.status !== 'rejected'; }), [requests, selectedDate]);
  const bookingConflicts = useMemo(() => requests.filter((item) => item.status !== 'rejected').filter((item) => { const parsed = parseSlot(item.slot); if (!parsed.date || parsed.date !== form.date) return false; return overlaps(form.start, form.end, parsed.start, parsed.end); }), [requests, form]);

  const monthDays = useMemo(() => {
    const days = [] as { day:number; date:string; muted:boolean; events:typeof filteredEvents; bookings:number; isSelected:boolean }[];
    const year = 2026; const month = 4;
    const firstDay = new Date(year, month, 1);
    const startOffset = (firstDay.getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = startOffset - 1; i >= 0; i--) {
      const day = prevMonthDays - i;
      days.push({ day, date:`2026-04-${String(day).padStart(2,'0')}`, muted:true, events:[], bookings:0, isSelected:false });
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const date = `2026-05-${String(day).padStart(2,'0')}`;
      days.push({ day, date, muted:false, events:filteredEvents.filter((item) => item.iso === date), bookings:requests.filter((item) => parseSlot(item.slot).date === date && item.status !== 'rejected').length, isSelected:selectedDate === date });
    }
    while (days.length < 42) {
      const nextDay = days.length - (startOffset + daysInMonth) + 1;
      days.push({ day:nextDay, date:`2026-06-${String(nextDay).padStart(2,'0')}`, muted:true, events:[], bookings:0, isSelected:false });
    }
    return days;
  }, [filteredEvents, requests, selectedDate]);

  function submitBooking() {
    if (!form.name.trim() || !form.email.trim() || !form.purpose.trim()) {
      toast(lang === 'hu' ? 'Töltsd ki a kötelező mezőket.' : 'Please fill in the required fields.', 'warning');
      return;
    }
    if ((toMinutes(form.start) ?? 0) >= (toMinutes(form.end) ?? 0)) {
      toast(lang === 'hu' ? 'A befejezés legyen később, mint a kezdés.' : 'End time must be later than start time.', 'warning');
      return;
    }
    const slot = `${form.date} ${form.start}-${form.end}`;
    setRequests((prev) => [{ id: Date.now(), title: lang === 'hu' ? 'Tornaterem foglalás' : 'Gym booking', slot, applicant: form.name, status:'pending', purpose: form.purpose }, ...prev]);
    setSelectedDate(form.date);
    setForm(emptyForm);
    toast(lang === 'hu' ? 'Tornaterem foglalási igény rögzítve.' : 'Gym booking request submitted.', 'success');
  }

  function updateRequest(id:number, status:RequestStatus) {
    setRequests((prev) => prev.map((item) => item.id === id ? { ...item, status } : item));
    toast(status === 'approved' ? (lang === 'hu' ? 'Foglalás jóváhagyva.' : 'Booking approved.') : (lang === 'hu' ? 'Foglalás elutasítva.' : 'Booking rejected.'), status === 'approved' ? 'success' : 'warning');
  }

  function openAdminPanel() {
    openModal(lang === 'hu' ? 'Naptár admin műveletek' : 'Calendar admin actions', lang === 'hu' ? 'Az admin kezelőgombok közvetlenül az eseménykártyákon és a foglalási sorokon érhetők el. Itt a felület egységes az admin szerkesztési mintával.' : 'Admin controls are available directly on event cards and booking rows. This modal confirms the unified admin editing pattern.');
  }

  function editEvent(item:EventItem) {
    openModal(lang === 'hu' ? 'Esemény szerkesztése' : 'Edit event', `${lang === 'hu' ? item.titleHu : item.titleEn}
${item.date} • ${item.time}
${item.location}`);
    toast(lang === 'hu' ? 'Eseményszerkesztő megnyitva.' : 'Event editor opened.', 'info');
  }

  function createQuickEvent() {
    const newEvent: EventItem = { id: Date.now(), titleHu:'Új kari esemény', titleEn:'New faculty event', date:selectedDate, time:'16:00', location:'MIK Aula', category:'Közösség', dayLabel:lang === 'hu' ? 'Új esemény' : 'New event', note:lang === 'hu' ? 'Admin által létrehozott gyors esemény.' : 'Quick event created by admin.' };
    setEvents((prev) => [newEvent, ...prev]);
    toast(lang === 'hu' ? 'Új esemény létrehozva.' : 'New event created.', 'success');
  }

  return <section className='section calendar-v273'><SectionHeader eyebrow={lang === 'hu' ? 'Naptár és tornaterem' : 'Calendar and gym'} title={lang === 'hu' ? 'Szellős, egybefüggő naptárélmény' : 'Airy, unified calendar experience'} text={lang === 'hu' ? 'A három nézet ugyanarra a kiválasztott napra és szűrésre épül, a foglalás pedig kizárólag a tornateremhez tartozik.' : 'The three views share the same selected day and filters, while the booking flow is dedicated to the gym only.'} />

  <div className='card calendar-master-panel'>
    <div className='calendar-topline'>
      <div className='calendar-topline-copy'><div className='badge'>{lang === 'hu' ? '2026. május' : 'May 2026'}</div><h3>{selectedDate}</h3><p>{lang === 'hu' ? 'A kijelölt nap minden nézetben szinkronban marad.' : 'The selected day stays synced across all views.'}</p></div>
      <div className='calendar-topline-actions'><div className='calendar-view-switch'><button className={`btn ${view === 'timeline' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setView('timeline')}>Timeline</button><button className={`btn ${view === 'cards' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setView('cards')}>Cards</button><button className={`btn ${view === 'calendar' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setView('calendar')}>{lang === 'hu' ? 'Naptár' : 'Calendar'}</button></div>{isAdmin ? <button className='btn btn-secondary' onClick={openAdminPanel}>{lang === 'hu' ? 'Admin műveletek' : 'Admin actions'}</button> : null}</div>
    </div>

    <div className='calendar-filter-band'><input className='input' placeholder={lang === 'hu' ? 'Keresés események között' : 'Search events'} value={query} onChange={(e)=>setQuery(e.target.value)} /><select className='select' value={categoryFilter} onChange={(e)=>setCategoryFilter(e.target.value)}><option value='all'>{lang === 'hu' ? 'Minden kategória' : 'All categories'}</option>{categories.map((cat)=><option key={cat} value={cat}>{cat}</option>)}</select><div className='calendar-summary-inline'><span>{filteredEvents.length} {lang === 'hu' ? 'esemény' : 'events'}</span><span>{selectedDayBookings.length} {lang === 'hu' ? 'foglalás' : 'bookings'}</span></div></div>

    {view === 'timeline' ? <div className='calendar-view-panel stack'><div className='calendar-day-banner'><div><strong>{lang === 'hu' ? 'Kijelölt nap' : 'Selected day'}:</strong> {selectedDate}</div><div className='muted-text'>{selectedDayEvents.length ? (lang === 'hu' ? 'Események és időrend lentebb.' : 'Events and chronology below.') : (lang === 'hu' ? 'Erre a napra nincs esemény.' : 'No events for this day.')}</div></div>{selectedDayEvents.length ? selectedDayEvents.map((item)=><div key={item.id} className='card schedule-timeline-row'><div className='schedule-time-box'><div className='badge'>{item.time}</div><span>{item.location}</span></div><div><h3>{lang === 'hu' ? item.titleHu : item.titleEn}</h3><p>{item.category} • {item.date}</p>{item.note ? <p className='muted-text'>{item.note}</p> : null}</div>{isAdmin ? <div className='news-admin-actions'><button className='btn btn-ghost' onClick={() => editEvent(item)}>{lang === 'hu' ? 'Szerkesztés' : 'Edit'}</button></div> : null}</div>) : <div className='card empty-state-card'>{lang === 'hu' ? 'Nincs esemény a kiválasztott napra.' : 'No events for the selected day.'}</div>}</div> : null}

    {view === 'cards' ? <div className='calendar-view-panel event-grid-wide'>{filteredEvents.map((item)=><Card key={item.id} strong><div className='badge'>{item.date}</div><h3 style={{ fontSize: 22 }}>{lang === 'hu' ? item.titleHu : item.titleEn}</h3><p>{item.time} • {item.location}</p><p className='muted-text'>{item.category}</p>{isAdmin ? <div className='news-admin-actions' style={{ marginTop: 12 }}><button className='btn btn-ghost' onClick={() => editEvent(item)}>{lang === 'hu' ? 'Szerkesztés' : 'Edit'}</button></div> : null}</Card>)}</div> : null}

    {view === 'calendar' ? <div className='calendar-view-panel'><div className='calendar-weekdays'>{dayNames[lang].map((day)=><div key={day} className='badge'>{day}</div>)}</div><div className='calendar-month-grid'>{monthDays.map((day)=><button key={day.date} type='button' className={`calendar-day-cell ${day.muted ? 'muted' : ''} ${day.isSelected ? 'selected' : ''}`} onClick={() => !day.muted && setSelectedDate(day.date)}><div className='calendar-day-head'><strong>{day.day}</strong><span>{day.events.length + day.bookings}</span></div><div className='calendar-day-events'>{day.events.slice(0,2).map((event)=><div key={event.id} className='calendar-day-pill'>{lang === 'hu' ? event.titleHu : event.titleEn}</div>)}{day.bookings ? <div className='calendar-booking-mini'>{day.bookings} {lang === 'hu' ? 'foglalás' : 'bookings'}</div> : null}{!day.events.length && !day.bookings ? <div className='calendar-empty-mini'>{lang === 'hu' ? 'Nincs esemény' : 'No events'}</div> : null}</div></button>)}</div></div> : null}
  </div>

  <div className='calendar-bottom-grid'>
    <div className='card booking-surface'><div className='badge'>{lang === 'hu' ? 'Tornaterem foglalás' : 'Gym booking'}</div><h3>{lang === 'hu' ? 'Foglalási igény a tornateremhez' : 'Booking request for the gym'}</h3><p className='muted-text'>{lang === 'hu' ? 'Ez a modul kizárólag a tornateremre vonatkozó foglalási igényeket kezeli.' : 'This form handles gym booking requests only.'}</p><div className='stack' style={{ marginTop: 16 }}><input className='input' placeholder={lang === 'hu' ? 'Név' : 'Name'} value={form.name} onChange={(e)=>setForm((p)=>({...p,name:e.target.value}))} /><input className='input' placeholder='Email' value={form.email} onChange={(e)=>setForm((p)=>({...p,email:e.target.value}))} /><input className='input' placeholder={lang === 'hu' ? 'Szervezet / csapat' : 'Organization / team'} value={form.organization} onChange={(e)=>setForm((p)=>({...p,organization:e.target.value}))} /><div className='calendar-form-grid'><input className='input' type='date' value={form.date} onChange={(e)=>setForm((p)=>({...p,date:e.target.value}))} /><input className='input' type='time' value={form.start} onChange={(e)=>setForm((p)=>({...p,start:e.target.value}))} /><input className='input' type='time' value={form.end} onChange={(e)=>setForm((p)=>({...p,end:e.target.value}))} /></div><textarea className='input' style={{ minHeight: 120 }} placeholder={lang === 'hu' ? 'Edzés vagy program célja' : 'Purpose of the training or event'} value={form.purpose} onChange={(e)=>setForm((p)=>({...p,purpose:e.target.value}))} />{bookingConflicts.length ? <div className='booking-conflict-box'><strong>{lang === 'hu' ? 'Lehetséges ütközés' : 'Possible conflict'}</strong><div className='stack' style={{ marginTop: 8 }}>{bookingConflicts.map((item)=><div key={item.id} className='muted-text'>{item.slot} • {item.applicant}</div>)}</div></div> : <div className='booking-ok-box'>{lang === 'hu' ? 'Nincs észlelt ütközés a tornatermi idősávban.' : 'No conflict detected for the gym time slot.'}</div>}<button className='btn btn-primary' onClick={submitBooking}>{lang === 'hu' ? 'Foglalási igény küldése' : 'Send booking request'}</button></div></div>

    <div className='card queue-panel'><div className='badge'>{lang === 'hu' ? 'Foglalási állapotok' : 'Booking statuses'}</div><h3>{lang === 'hu' ? 'Tornaterem igények' : 'Gym requests'}</h3><div className='stack' style={{ marginTop: 16 }}>{requests.map((item)=><div key={item.id} className='request-row admin-row'><div><strong>{item.title}</strong><div className='muted-text'>{item.slot} • {item.applicant}</div>{item.purpose ? <div className='muted-text'>{item.purpose}</div> : null}<div className={`status-pill ${item.status}`}>{item.status}</div></div>{isAdmin ? <div className='news-admin-actions'><button className='btn btn-ghost' onClick={() => updateRequest(item.id,'approved')}>{lang === 'hu' ? 'Elfogadás' : 'Approve'}</button><button className='btn btn-ghost' onClick={() => updateRequest(item.id,'rejected')}>{lang === 'hu' ? 'Elutasítás' : 'Reject'}</button></div> : null}</div>)}</div>{isAdmin ? <div className='news-admin-actions' style={{ marginTop: 16 }}><button className='btn btn-secondary' onClick={createQuickEvent}>{lang === 'hu' ? 'Új esemény' : 'New event'}</button></div> : null}</div>
  </div></section>;
}
