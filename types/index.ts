export type Lang = 'hu' | 'en';
export type Theme = 'light' | 'dark';
export type ToastItem = { id: number; text: string; type: 'success' | 'info' | 'warning' };
export type CalendarView = 'timeline' | 'cards' | 'calendar';
export type SemesterSubject = { id: number; name: string; credits: number; grade: number; completed: boolean };
export type Semester = { id: number; name: string; ghost: boolean; subjects: SemesterSubject[] };