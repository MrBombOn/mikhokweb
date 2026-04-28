/**
 * @file KKI kalkulátor UI – szemeszterek, tárgyak, összegző panel
 *
 * @description
 * Összegzés: `lib/calculator/compute.ts`. Kezdő adat: `initialSemesters` + `localStorage` + (belépve) `GET /api/calculator/state`.
 * Mentés: `localStorage`; belépve debounced `PUT /api/calculator/state`. Export: JSON (`lib/calculator/export.ts`).
 */
'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useApp } from '@/components/layout/AppProvider';
import { Card, SectionHeader } from '@/components/ui/Core';
import { computeSummary, formatSummaryDisplay } from '@/lib/calculator/compute';
import { downloadCalculatorJson } from '@/lib/calculator/export';
import { initialSemesters } from '@/lib/content';
import { calculatorStateSchema } from '@/lib/validation/calculator';
import type { Semester } from '@/types';

const STORAGE_KEY = 'v26-calculator-semesters';

export function CalculatorModule() {
  const { lang, toast, isAdmin } = useApp();
  const [semesters, setSemesters] = useState<Semester[]>(initialSemesters);
  const [hydrated, setHydrated] = useState(false);
  const [newSemester, setNewSemester] = useState('Új félév');
  const [compact, setCompact] = useState(false);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const summaryDisplay = useMemo(() => formatSummaryDisplay(computeSummary(semesters)), [semesters]);

  const persistLocal = useCallback((next: Semester[]) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }, []);

  const scheduleServerSave = useCallback(
    (next: Semester[]) => {
      if (!isAdmin) return;
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
      saveTimerRef.current = setTimeout(() => {
        saveTimerRef.current = null;
        const parsed = calculatorStateSchema.safeParse({ semesters: next });
        if (!parsed.success) return;
        void fetch('/api/calculator/state', {
          method: 'PUT',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(parsed.data),
        }).catch(() => {
          /* offline: ignore */
        });
      }, 700);
    },
    [isAdmin],
  );

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 260);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        try {
          const raw = window.localStorage.getItem(STORAGE_KEY);
          if (raw) {
            const arr = JSON.parse(raw) as unknown;
            const parsed = calculatorStateSchema.safeParse({ semesters: arr });
            if (parsed.success && !cancelled) setSemesters(parsed.data.semesters);
          }
        } catch {
          /* ignore */
        }

        if (isAdmin) {
          try {
            const res = await fetch('/api/calculator/state', { credentials: 'include' });
            if (!res.ok || cancelled) return;
            const data = (await res.json()) as { semesters?: Semester[] | null };
            if (data.semesters && Array.isArray(data.semesters) && data.semesters.length > 0 && !cancelled) {
              setSemesters(data.semesters);
            }
          } catch {
            /* ignore */
          }
        }
      } finally {
        if (!cancelled) setHydrated(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [isAdmin]);

  useEffect(() => {
    if (!hydrated) return;
    persistLocal(semesters);
    scheduleServerSave(semesters);
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [semesters, hydrated, persistLocal, scheduleServerSave]);

  function addSemester() {
    setSemesters((prev) => [...prev, { id: Date.now(), name: newSemester, ghost: false, subjects: [] }]);
    setNewSemester('Új félév');
    toast(lang === 'hu' ? 'Új félév hozzáadva.' : 'New semester added.', 'success');
  }

  function addSubject(semesterId: number) {
    setSemesters((prev) =>
      prev.map((semester) =>
        semester.id === semesterId
          ? {
              ...semester,
              subjects: [
                ...semester.subjects,
                {
                  id: Date.now(),
                  name: lang === 'hu' ? 'Új tárgy' : 'New subject',
                  credits: 4,
                  grade: 3,
                  completed: true,
                },
              ],
            }
          : semester,
      ),
    );
  }

  function updateSubject(semesterId: number, subjectId: number, field: 'name' | 'credits' | 'grade' | 'completed', value: string | number | boolean) {
    setSemesters((prev) =>
      prev.map((semester) =>
        semester.id === semesterId
          ? {
              ...semester,
              subjects: semester.subjects.map((subject) => (subject.id === subjectId ? { ...subject, [field]: value } : subject)),
            }
          : semester,
      ),
    );
  }

  function removeSubject(semesterId: number, subjectId: number) {
    setSemesters((prev) =>
      prev.map((semester) =>
        semester.id === semesterId ? { ...semester, subjects: semester.subjects.filter((subject) => subject.id !== subjectId) } : semester,
      ),
    );
  }

  function onExportJson() {
    downloadCalculatorJson(semesters, lang);
    toast(lang === 'hu' ? 'Export letöltve.' : 'Export downloaded.', 'success');
  }

  return (
    <section className="section">
      <SectionHeader
        eyebrow="KKI"
        title={lang === 'hu' ? 'Egysávos KKI elrendezés külön félév hozzáadás gombbal' : 'Single-column KKI layout with separate add-semester button'}
        text={
          lang === 'hu'
            ? 'A számítások a `lib/calculator/compute.ts` domain rétegben vannak; részletek: `docs/calculator-rules.md`. Mentés: böngésző + (belépve) szerver.'
            : 'Figures are computed in `lib/calculator/compute.ts`; see `docs/calculator-rules.md`. Storage: browser + (when signed in) server.'
        }
      />

      <div className={`sticky-summary-top card card-strong ${compact ? 'compact' : ''}`} style={{ padding: 18, marginBottom: 18 }}>
        <div className="metric-grid">
          <div className="metric-card color-blue">
            <span className="badge">KI</span>
            <strong>{summaryDisplay.ki}</strong>
          </div>
          <div className="metric-card color-pink">
            <span className="badge">KKI</span>
            <strong>{summaryDisplay.kki}</strong>
          </div>
          <div className="metric-card color-purple">
            <span className="badge">{lang === 'hu' ? 'Súlyozott átlag' : 'Weighted average'}</span>
            <strong>{summaryDisplay.weighted}</strong>
          </div>
          <div className="metric-card color-gold">
            <span className="badge">{lang === 'hu' ? 'Felvett kredit' : 'Registered credits'}</span>
            <strong>{summaryDisplay.totalRegistered}</strong>
          </div>
          <div className="metric-card color-green">
            <span className="badge">{lang === 'hu' ? 'Teljesített kredit' : 'Completed credits'}</span>
            <strong>{summaryDisplay.totalCompleted}</strong>
          </div>
        </div>
        <div style={{ marginTop: 14, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          <button type="button" className="btn btn-secondary" onClick={onExportJson}>
            {lang === 'hu' ? 'Export (JSON)' : 'Export (JSON)'}
          </button>
        </div>
      </div>

      <Card strong>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <input className="input" value={newSemester} onChange={(e) => setNewSemester(e.target.value)} style={{ maxWidth: 320 }} />
          <button type="button" className="btn btn-primary" onClick={addSemester}>
            {lang === 'hu' ? 'Félév hozzáadása' : 'Add semester'}
          </button>
        </div>
      </Card>

      <div className="stack" style={{ marginTop: 18 }}>
        {semesters.map((semester) => (
          <div key={semester.id} className="semester-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginBottom: 14 }}>
              <input
                className="input"
                value={semester.name}
                onChange={(e) => setSemesters((prev) => prev.map((item) => (item.id === semester.id ? { ...item, name: e.target.value } : item)))}
                style={{ maxWidth: 320 }}
              />
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setSemesters((prev) => prev.map((item) => (item.id === semester.id ? { ...item, ghost: !item.ghost } : item)))}>
                  {semester.ghost ? 'Ghost OFF' : 'Ghost ON'}
                </button>
                <button type="button" className="btn btn-primary" onClick={() => addSubject(semester.id)}>
                  {lang === 'hu' ? 'Tárgy hozzáadása' : 'Add subject'}
                </button>
              </div>
            </div>
            <div className="stack">
              {semester.subjects.map((subject) => (
                <div key={subject.id} className="subject-row">
                  <div className="grid-2">
                    <input className="input" value={subject.name} onChange={(e) => updateSubject(semester.id, subject.id, 'name', e.target.value)} />
                    <input className="input" type="number" value={subject.credits} onChange={(e) => updateSubject(semester.id, subject.id, 'credits', Number(e.target.value))} />
                  </div>
                  <div className="grid-2" style={{ marginTop: 12 }}>
                    <input className="input" type="number" min={1} max={5} value={subject.grade} onChange={(e) => updateSubject(semester.id, subject.id, 'grade', Number(e.target.value))} />
                    <select className="select" value={String(subject.completed)} onChange={(e) => updateSubject(semester.id, subject.id, 'completed', e.target.value === 'true')}>
                      <option value="true">{lang === 'hu' ? 'Teljesített' : 'Completed'}</option>
                      <option value="false">{lang === 'hu' ? 'Nem teljesített' : 'Not completed'}</option>
                    </select>
                  </div>
                  <div style={{ marginTop: 12 }}>
                    <button type="button" className="btn btn-ghost" onClick={() => removeSubject(semester.id, subject.id)}>
                      {lang === 'hu' ? 'Eltávolítás' : 'Remove'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
