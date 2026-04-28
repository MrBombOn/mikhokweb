/**
 * @file Naptár oldal – `/calendar`
 *
 * @description
 * Vékony route wrapper: csak `PageShell` + `CalendarModule` (üzleti logika a modulban).
 */
'use client';

import { CalendarModule } from '@/components/calendar/CalendarModule';
import { PageShell } from '@/components/ui/Core';
export default function CalendarPage() { return <PageShell><CalendarModule /></PageShell>; }
