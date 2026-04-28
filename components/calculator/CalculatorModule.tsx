/**
 * @file KKI kalkulátor UI – szemeszterek, tárgyak, összesítő panel
 *
 * @description
 * Kezdőállapot: `initialSemesters` a `lib/content.ts`-ből. `useMemo` számolja a
 * KI/KKI/súlyozott átlag demó értékeket. Scroll esetén „compact” összegző sáv.
 */
'use client';

import { useEffect, useMemo, useState } from 'react';
import { useApp } from '@/components/layout/AppProvider';
import { Card, SectionHeader } from '@/components/ui/Core';
import { initialSemesters } from '@/lib/content';
import type { Semester } from '@/types';
export function CalculatorModule() {
  const { lang, toast } = useApp();
  const [semesters, setSemesters] = useState<Semester[]>(initialSemesters);
  const [newSemester, setNewSemester] = useState('Új félév');
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 260);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const summary = useMemo(() => {
    const included = semesters.filter((semester) => !semester.ghost);
    const allSubjects = included.flatMap((semester) => semester.subjects);
    const totalRegistered = allSubjects.reduce((sum, subject) => sum + subject.credits, 0);
    const totalCompleted = allSubjects.filter((subject) => subject.completed).reduce((sum, subject) => sum + subject.credits, 0);
    const weightedBase = allSubjects.reduce((sum, subject) => sum + subject.credits * subject.grade, 0);
    const weighted = totalRegistered ? weightedBase / totalRegistered : 0;
    const ki = totalRegistered ? totalCompleted / totalRegistered : 0;
    const kki = weighted * ki;
    return { weighted: weighted.toFixed(2), ki: ki.toFixed(2), kki: kki.toFixed(2), totalRegistered, totalCompleted };
  }, [semesters]);
  function addSemester() {
    setSemesters((prev) => [...prev, { id: Date.now(), name: newSemester, ghost: false, subjects: [] }]);
    setNewSemester('Új félév');
    toast(lang === 'hu' ? 'Új félév hozzáadva.' : 'New semester added.', 'success');
  }
  function addSubject(semesterId: number) {
    setSemesters((prev) => prev.map((semester) => semester.id === semesterId ? { ...semester, subjects: [...semester.subjects, { id: Date.now(), name: lang === 'hu' ? 'Új tárgy' : 'New subject', credits: 4, grade: 3, completed: true }] } : semester));
  }
  function updateSubject(semesterId: number, subjectId: number, field: 'name' | 'credits' | 'grade' | 'completed', value: string | number | boolean) {
    setSemesters((prev) => prev.map((semester) => semester.id === semesterId ? { ...semester, subjects: semester.subjects.map((subject) => subject.id === subjectId ? { ...subject, [field]: value } : subject) } : semester));
  }
  function removeSubject(semesterId: number, subjectId: number) {
    setSemesters((prev) => prev.map((semester) => semester.id === semesterId ? { ...semester, subjects: semester.subjects.filter((subject) => subject.id !== subjectId) } : semester));
  }
  return <section className="section"><SectionHeader eyebrow="KKI" title={lang === 'hu' ? 'Egysávos KKI elrendezés külön félév hozzáadás gombbal' : 'Single-column KKI layout with separate add-semester button'} text={lang === 'hu' ? 'A kalkulátor most egy oszlopban rendeződik, így a félévek és tárgyak kezelése lineárisabb és áttekinthetőbb lett.' : 'The calculator now uses a single-column layout so semesters and subjects are edited in a more linear and readable way.'} /><div className={`sticky-summary-top card card-strong ${compact ? 'compact' : ''}`} style={{ padding: 18, marginBottom: 18 }}><div className="metric-grid"><div className="metric-card color-blue"><span className="badge">KI</span><strong>{summary.ki}</strong></div><div className="metric-card color-pink"><span className="badge">KKI</span><strong>{summary.kki}</strong></div><div className="metric-card color-purple"><span className="badge">{lang === 'hu' ? 'Súlyozott átlag' : 'Weighted average'}</span><strong>{summary.weighted}</strong></div><div className="metric-card color-gold"><span className="badge">{lang === 'hu' ? 'Felvett kredit' : 'Registered credits'}</span><strong>{summary.totalRegistered}</strong></div><div className="metric-card color-green"><span className="badge">{lang === 'hu' ? 'Teljesített kredit' : 'Completed credits'}</span><strong>{summary.totalCompleted}</strong></div></div></div><Card strong><div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}><input className="input" value={newSemester} onChange={(e) => setNewSemester(e.target.value)} style={{ maxWidth: 320 }} /><button className="btn btn-primary" onClick={addSemester}>{lang === 'hu' ? 'Félév hozzáadása' : 'Add semester'}</button></div></Card><div className="stack" style={{ marginTop: 18 }}>{semesters.map((semester) => <div key={semester.id} className="semester-card"><div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginBottom: 14 }}><input className="input" value={semester.name} onChange={(e) => setSemesters((prev) => prev.map((item) => item.id === semester.id ? { ...item, name: e.target.value } : item))} style={{ maxWidth: 320 }} /><div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}><button className="btn btn-secondary" onClick={() => setSemesters((prev) => prev.map((item) => item.id === semester.id ? { ...item, ghost: !item.ghost } : item))}>{semester.ghost ? 'Ghost OFF' : 'Ghost ON'}</button><button className="btn btn-primary" onClick={() => addSubject(semester.id)}>{lang === 'hu' ? 'Tárgy hozzáadása' : 'Add subject'}</button></div></div><div className="stack">{semester.subjects.map((subject) => <div key={subject.id} className="subject-row"><div className="grid-2"><input className="input" value={subject.name} onChange={(e) => updateSubject(semester.id, subject.id, 'name', e.target.value)} /><input className="input" type="number" value={subject.credits} onChange={(e) => updateSubject(semester.id, subject.id, 'credits', Number(e.target.value))} /></div><div className="grid-2" style={{ marginTop: 12 }}><input className="input" type="number" min={1} max={5} value={subject.grade} onChange={(e) => updateSubject(semester.id, subject.id, 'grade', Number(e.target.value))} /><select className="select" value={String(subject.completed)} onChange={(e) => updateSubject(semester.id, subject.id, 'completed', e.target.value === 'true')}><option value="true">{lang === 'hu' ? 'Teljesített' : 'Completed'}</option><option value="false">{lang === 'hu' ? 'Nem teljesített' : 'Not completed'}</option></select></div><div style={{ marginTop: 12 }}><button className="btn btn-ghost" onClick={() => removeSubject(semester.id, subject.id)}>{lang === 'hu' ? 'Eltávolítás' : 'Remove'}</button></div></div>)}</div></div>)}</div></section>;
}