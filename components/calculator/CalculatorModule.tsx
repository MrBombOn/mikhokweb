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
import { DownloadIcon, EyeIcon, PlusIcon, TrashIcon } from '@/components/ui/Icons';
import { Skeleton } from '@/components/ui/Skeleton';
import { getCalculatorBenchmark, type CalculatorBenchmarkKey } from '@/lib/calculator/benchmarks';
import { computeSemesterSummary, computeSummary, formatSummaryDisplay } from '@/lib/calculator/compute';
import { CALCULATOR_FORMULA_VERSION } from '@/lib/calculator/formula-version';
import { migrateCalculatorImport } from '@/lib/calculator/migrate';
import { buildCalculatorShareLink, downloadCalculatorCsv, downloadCalculatorJson, parseCalculatorShareToken } from '@/lib/calculator/export';
import { initialSemesters, t } from '@/lib/content';
import { calculatorStateSchema } from '@/lib/validation/calculator';
import type { Semester } from '@/types';

const STORAGE_KEY = 'v26-calculator-semesters';

type SyncUiState = 'idle' | 'saving' | 'saved' | 'error';

export function CalculatorModule() {
  const { lang, toast, isAdmin, requestConfirm } = useApp();
  const dict = t(lang);
  const c = dict.calculator;
  const [semesters, setSemesters] = useState<Semester[]>(initialSemesters);
  const [hydrated, setHydrated] = useState(false);
  const [newSemester, setNewSemester] = useState<string>(c.newSemesterDefault);
  const [compact, setCompact] = useState(false);
  const [syncUi, setSyncUi] = useState<SyncUiState>('idle');
  const [readOnlyMode, setReadOnlyMode] = useState(false);
  const [compareBenchmark, setCompareBenchmark] = useState<CalculatorBenchmarkKey | ''>('');
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const syncSavedClearRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const accountLoadNotifiedRef = useRef(false);
  const importInputRef = useRef<HTMLInputElement | null>(null);

  const summaryDisplay = useMemo(() => formatSummaryDisplay(computeSummary(semesters)), [semesters]);
  const benchmarkSemesters = useMemo(
    () => (compareBenchmark ? getCalculatorBenchmark(compareBenchmark) : null),
    [compareBenchmark],
  );
  const benchmarkDisplay = useMemo(
    () => (benchmarkSemesters ? formatSummaryDisplay(computeSummary(benchmarkSemesters)) : null),
    [benchmarkSemesters],
  );
  const semesterSummaries = useMemo(
    () => semesters.map((semester) => ({ semesterId: semester.id, display: formatSummaryDisplay(computeSemesterSummary(semester)) })),
    [semesters],
  );

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
        const failMsg = t(lang).calculator.toastSyncFailed;
        void (async () => {
          setSyncUi('saving');
          try {
            const res = await fetch('/api/calculator/state', {
              method: 'PUT',
              credentials: 'include',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(parsed.data),
            });
            if (!res.ok) {
              toast(failMsg, 'warning');
              setSyncUi('error');
              return;
            }
            setSyncUi('saved');
            if (syncSavedClearRef.current) clearTimeout(syncSavedClearRef.current);
            syncSavedClearRef.current = setTimeout(() => {
              syncSavedClearRef.current = null;
              setSyncUi('idle');
            }, 2200);
          } catch {
            toast(failMsg, 'warning');
            setSyncUi('error');
          }
        })();
      }, 700);
    },
    [isAdmin, lang, toast],
  );

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 260);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!isAdmin) accountLoadNotifiedRef.current = false;
  }, [isAdmin]);

  useEffect(() => {
    let cancelled = false;
    const cal = t(lang).calculator;
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
              if (!accountLoadNotifiedRef.current) {
                accountLoadNotifiedRef.current = true;
                toast(cal.toastLoadedFromAccount, 'info');
              }
            }
          } catch {
            /* ignore */
          }
        }

        const shareToken = new URL(window.location.href).searchParams.get('share');
        const mode = new URL(window.location.href).searchParams.get('mode');
        if (shareToken && mode === 'readonly') {
          const shared = parseCalculatorShareToken(shareToken);
          if (shared) {
            const migrated = migrateCalculatorImport({ semesters: shared }, { reassignIds: true });
            if (migrated.ok) {
              setSemesters(migrated.semesters);
              setReadOnlyMode(true);
              toast(cal.toastReadonlyLoaded, 'info');
              if (migrated.warnings.length) toast(migrated.warnings.join(' '), 'info');
            }
          }
        }
      } finally {
        if (!cancelled) setHydrated(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [isAdmin, lang, toast]);

  useEffect(() => {
    setNewSemester(c.newSemesterDefault);
  }, [lang, c.newSemesterDefault]);

  useEffect(() => {
    if (!hydrated) return;
    if (readOnlyMode) return;
    persistLocal(semesters);
    scheduleServerSave(semesters);
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [semesters, hydrated, persistLocal, readOnlyMode, scheduleServerSave]);

  useEffect(
    () => () => {
      if (syncSavedClearRef.current) clearTimeout(syncSavedClearRef.current);
    },
    [],
  );

  function addSemester() {
    if (readOnlyMode) return;
    const name = newSemester.trim();
    if (!name) {
      toast(c.addSemesterValidation, 'warning');
      return;
    }
    setSemesters((prev) => [...prev, { id: Date.now(), name, ghost: false, subjects: [] }]);
    setNewSemester(c.newSemesterDefault);
    toast(c.toastSemesterAdded, 'success');
  }

  function addSubject(semesterId: number) {
    if (readOnlyMode) return;
    setSemesters((prev) =>
      prev.map((semester) =>
        semester.id === semesterId
          ? {
              ...semester,
              subjects: [
                ...semester.subjects,
                {
                  id: Date.now(),
                  name: c.newSubjectName,
                  credits: 4,
                  grade: 3,
                  ghost: false,
                },
              ],
            }
          : semester,
      ),
    );
    toast(c.toastSubjectAdded, 'success');
  }

  function updateSubject(semesterId: number, subjectId: number, field: 'name' | 'credits' | 'grade', value: string | number) {
    if (readOnlyMode) return;
    let nextVal: string | number = value;
    if (field === 'credits') {
      const n = typeof value === 'number' ? value : Number(value);
      nextVal = Number.isFinite(n) ? Math.max(0, Math.round(n)) : 0;
    }
    if (field === 'grade') {
      const n = typeof value === 'number' ? value : Number(value);
      nextVal = Number.isFinite(n) ? Math.min(5, Math.max(1, Math.round(n))) : 1;
    }
    setSemesters((prev) =>
      prev.map((semester) =>
        semester.id === semesterId
          ? {
              ...semester,
              subjects: semester.subjects.map((subject) => (subject.id === subjectId ? { ...subject, [field]: nextVal } : subject)),
            }
          : semester,
      ),
    );
  }

  function toggleSubjectGhost(semesterId: number, subjectId: number) {
    if (readOnlyMode) return;
    setSemesters((prev) =>
      prev.map((semester) =>
        semester.id === semesterId
          ? {
              ...semester,
              subjects: semester.subjects.map((subject) =>
                subject.id === subjectId ? { ...subject, ghost: !subject.ghost } : subject,
              ),
            }
          : semester,
      ),
    );
  }

  function removeSubject(semesterId: number, subjectId: number) {
    if (readOnlyMode) return;
    setSemesters((prev) =>
      prev.map((semester) =>
        semester.id === semesterId ? { ...semester, subjects: semester.subjects.filter((subject) => subject.id !== subjectId) } : semester,
      ),
    );
  }

  async function removeSemester(semesterId: number) {
    if (readOnlyMode) return;
    const sure = await requestConfirm({
      message: c.confirmDeleteSemester,
      title: dict.common.confirmDialogTitle,
      confirmLabel: dict.common.delete,
      cancelLabel: dict.common.cancel,
      destructive: true,
    });
    if (!sure) return;
    setSemesters((prev) => prev.filter((semester) => semester.id !== semesterId));
  }

  function onExportJson() {
    downloadCalculatorJson(semesters, { lang, filePrefix: c.exportFilePrefix });
    toast(c.toastExportDone, 'success');
  }

  function onExportCsv() {
    downloadCalculatorCsv(semesters, { lang, filePrefix: c.exportFilePrefix });
    toast(c.toastExportDone, 'success');
  }

  function onExportPdf() {
    window.print();
    toast(c.toastPrintStarted, 'info');
  }

  async function onShareReadonly() {
    const link = buildCalculatorShareLink(semesters);
    try {
      await navigator.clipboard.writeText(link);
      toast(c.toastShareCopied, 'success');
    } catch {
      toast(link, 'info');
    }
  }

  function onImportJsonClick() {
    importInputRef.current?.click();
  }

  async function onImportFileChange(fileList: FileList | null) {
    const file = fileList?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const json = JSON.parse(text) as unknown;
      const result = migrateCalculatorImport(json, { reassignIds: true });
      if (!result.ok) {
        toast(result.error, 'warning');
        return;
      }
      setSemesters(result.semesters);
      if (result.warnings.length) toast(result.warnings.join(' '), 'info');
      toast(c.toastImportDone, 'success');
    } catch {
      toast(c.toastImportInvalid, 'warning');
    }
  }

  const syncStatusLine =
    isAdmin && syncUi === 'saving'
      ? c.syncSaving
      : isAdmin && syncUi === 'saved'
        ? c.syncSaved
        : isAdmin && syncUi === 'error'
          ? c.syncErrorShort
          : null;

  return (
    <section className="section">
      <SectionHeader eyebrow={c.eyebrow} title={c.title} text={c.lead} />

      <div className={`calculator-summary-sticky${compact ? ' calculator-summary-sticky--compact' : ''}`}>
        <div className={`card card-strong calculator-summary ${compact ? 'compact' : ''}`}>
          <input
            ref={importInputRef}
            type="file"
            accept="application/json,.json"
            className="calculator-sr-only"
            aria-hidden
            tabIndex={-1}
            onChange={(e) => {
              void onImportFileChange(e.target.files);
              e.target.value = '';
            }}
          />
          <div className="metric-grid">
            <div className="metric-card color-blue">
              <span className="badge">{c.badgeKi}</span>
              <strong>{summaryDisplay.ki}</strong>
            </div>
            <div className="metric-card color-pink">
              <span className="badge">{c.badgeKki}</span>
              <strong>{summaryDisplay.kki}</strong>
            </div>
            <div className="metric-card color-purple">
              <span className="badge">{c.badgeWeightedAvg}</span>
              <strong>{summaryDisplay.weighted}</strong>
            </div>
            <div className="metric-card color-gold">
              <span className="badge">{c.badgeRegCredits}</span>
              <strong>{summaryDisplay.totalRegistered}</strong>
            </div>
            <div className="metric-card color-green">
              <span className="badge">{c.badgeDoneCredits}</span>
              <strong>{summaryDisplay.totalCompleted}</strong>
            </div>
          </div>
          {benchmarkDisplay ? (
            <div className="calculator-compare-panel" aria-label={c.compareAria}>
              <p className="calculator-compare-title">{c.compareTitle}</p>
              <div className="metric-grid calculator-compare-grid">
                <div className="metric-card color-blue">
                  <span className="badge">{c.badgeKi}</span>
                  <strong>{benchmarkDisplay.ki}</strong>
                </div>
                <div className="metric-card color-pink">
                  <span className="badge">{c.badgeKki}</span>
                  <strong>{benchmarkDisplay.kki}</strong>
                </div>
                <div className="metric-card color-purple">
                  <span className="badge">{c.badgeWeightedAvg}</span>
                  <strong>{benchmarkDisplay.weighted}</strong>
                </div>
                <div className="metric-card color-gold">
                  <span className="badge">{c.badgeRegCredits}</span>
                  <strong>{benchmarkDisplay.totalRegistered}</strong>
                </div>
                <div className="metric-card color-green">
                  <span className="badge">{c.badgeDoneCredits}</span>
                  <strong>{benchmarkDisplay.totalCompleted}</strong>
                </div>
              </div>
              <p className="muted-text calculator-sync-hint">{c.compareHint}</p>
            </div>
          ) : null}
          {readOnlyMode ? <p className="muted-text calculator-sync-hint">{c.readonlyHint}</p> : isAdmin ? <p className="muted-text calculator-sync-hint">{c.syncHintShort}</p> : null}
          <p className="muted-text calculator-formula-version">{c.formulaVersionLine.replace('{v}', String(CALCULATOR_FORMULA_VERSION))}</p>
          <div className="calculator-summary-actions">
            {syncStatusLine ? (
              <span className={`calculator-sync-status${syncUi === 'error' ? ' calculator-sync-status--error' : ''}`} role="status" aria-live="polite">
                {syncStatusLine}
              </span>
            ) : null}
            <button type="button" className="btn btn-secondary" onClick={onExportJson}>
              <DownloadIcon className="icon--sm" />
              {c.exportJson}
            </button>
            <button type="button" className="btn btn-secondary" onClick={onExportCsv}>
              <DownloadIcon className="icon--sm" />
              {c.exportCsv}
            </button>
            <button type="button" className="btn btn-secondary" onClick={onExportPdf}>
              <DownloadIcon className="icon--sm" />
              {c.exportPdf}
            </button>
            <button type="button" className="btn btn-secondary" onClick={onImportJsonClick} disabled={readOnlyMode}>
              {c.importJson}
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => void onShareReadonly()}>
              {c.shareReadonly}
            </button>
            <select
              className="select calculator-compare-select"
              value={compareBenchmark}
              onChange={(e) => setCompareBenchmark((e.target.value || '') as CalculatorBenchmarkKey | '')}
              aria-label={c.compareSelectAria}
            >
              <option value="">{c.compareOff}</option>
              <option value="good_standing">{c.compareGoodStanding}</option>
              <option value="mixed">{c.compareMixed}</option>
              <option value="low_completion">{c.compareLowCompletion}</option>
            </select>
          </div>
        </div>
      </div>

      {!hydrated ? (
        <div role="status" aria-live="polite" aria-label={c.loadingAria}>
          <Skeleton variant="searchResults" />
        </div>
      ) : (
        <>
          <div className="stack calculator-semester-stack">
            {semesters.map((semester) => {
              const semDisplay = semesterSummaries.find((item) => item.semesterId === semester.id)?.display;
              return (
                <div key={semester.id} className={`semester-card${semester.ghost ? ' semester-card--ghost' : ''}`}>
                  <div className="calculator-semester-head">
                    <input
                      className="input"
                      value={semester.name}
                      aria-label={c.semesterTitleAria}
                      readOnly={readOnlyMode}
                      onChange={(e) =>
                        setSemesters((prev) => prev.map((item) => (item.id === semester.id ? { ...item, name: e.target.value } : item)))
                      }
                    />
                    <div className="calculator-semester-head-actions" role="toolbar" aria-label={c.semesterActionsAria}>
                      <button
                        type="button"
                        className={`btn ${semester.ghost ? 'btn-primary' : 'btn-secondary'} calculator-mini-action`}
                        onClick={() => {
                          if (readOnlyMode) return;
                          setSemesters((prev) => prev.map((item) => (item.id === semester.id ? { ...item, ghost: !item.ghost } : item)));
                        }}
                        aria-label={semester.ghost ? c.ghostSemesterDisable : c.ghostSemesterEnable}
                        disabled={readOnlyMode}
                      >
                        <EyeIcon className="icon--sm" />
                      </button>
                      <button
                        type="button"
                        className="btn btn-ghost calculator-mini-action"
                        onClick={() => void removeSemester(semester.id)}
                        aria-label={c.deleteSemesterAria}
                        disabled={readOnlyMode}
                      >
                        <TrashIcon className="icon--sm" />
                      </button>
                    </div>
                  </div>
                  {semDisplay ? (
                    <div className="calculator-semester-metrics" aria-label={c.semesterMetricsAria}>
                      <div className="semester-metric-cell color-blue">
                        <span className="semester-metric-label">{c.badgeKi}</span>
                        <strong>{semDisplay.ki}</strong>
                      </div>
                      <div className="semester-metric-cell color-pink">
                        <span className="semester-metric-label">{c.badgeKki}</span>
                        <strong>{semDisplay.kki}</strong>
                      </div>
                      <div className="semester-metric-cell color-purple">
                        <span className="semester-metric-label">{c.avgShort}</span>
                        <strong>{semDisplay.weighted}</strong>
                      </div>
                      <div className="semester-metric-cell color-gold">
                        <span className="semester-metric-label">{c.regShort}</span>
                        <strong>{semDisplay.totalRegistered}</strong>
                      </div>
                      <div className="semester-metric-cell color-green">
                        <span className="semester-metric-label">{c.doneShort}</span>
                        <strong>{semDisplay.totalCompleted}</strong>
                      </div>
                    </div>
                  ) : null}
                  <div className="stack">
                    {semester.subjects.map((subject) => (
                      <div key={subject.id} className={`subject-row${subject.ghost ? ' subject-row--ghost' : ''}`}>
                        <div className="calculator-subject-row">
                          <label>
                            <span className="calculator-field-label">{c.fieldSubjectName}</span>
                            <input
                              className="input"
                              value={subject.name}
                              aria-label={c.fieldSubjectName}
                              readOnly={readOnlyMode}
                              onChange={(e) => updateSubject(semester.id, subject.id, 'name', e.target.value)}
                            />
                          </label>
                          <label>
                            <span className="calculator-field-label">{c.fieldCredits}</span>
                            <input
                              className="input"
                              type="number"
                              min={0}
                              aria-label={c.fieldCredits}
                              value={subject.credits}
                              readOnly={readOnlyMode}
                              onChange={(e) => updateSubject(semester.id, subject.id, 'credits', Number(e.target.value))}
                            />
                          </label>
                          <label>
                            <span className="calculator-field-label">{c.fieldGrade}</span>
                            <input
                              className="input"
                              type="number"
                              min={1}
                              max={5}
                              aria-label={c.fieldGrade}
                              value={subject.grade}
                              readOnly={readOnlyMode}
                              onChange={(e) => updateSubject(semester.id, subject.id, 'grade', Number(e.target.value))}
                            />
                          </label>
                          <div className="calculator-subject-actions">
                            <button
                              type="button"
                              className={`btn ${subject.ghost ? 'btn-primary' : 'btn-secondary'} calculator-mini-action`}
                              onClick={() => toggleSubjectGhost(semester.id, subject.id)}
                              aria-label={subject.ghost ? c.ghostSubjectDisable : c.ghostSubjectEnable}
                              disabled={readOnlyMode}
                            >
                              <EyeIcon className="icon--sm" />
                            </button>
                            <button
                              type="button"
                              className="btn btn-ghost calculator-mini-action"
                              onClick={() => removeSubject(semester.id, subject.id)}
                              aria-label={c.deleteSubjectAria}
                              disabled={readOnlyMode}
                            >
                              <TrashIcon className="icon--sm" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="calculator-semester-add-subject">
                    <button
                      type="button"
                      className="btn btn-primary calculator-mini-action"
                      onClick={() => addSubject(semester.id)}
                      disabled={readOnlyMode}
                    >
                      <PlusIcon className="icon--sm" />
                      <span>{c.addSubject}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <Card strong>
            <div className="calculator-semester-create">
              <input
                className="input"
                value={newSemester}
                placeholder={c.semesterNamePlaceholder}
                aria-label={c.newSemesterInputAria}
                readOnly={readOnlyMode}
                onChange={(e) => setNewSemester(e.target.value)}
              />
              <button type="button" className="btn btn-primary" onClick={addSemester} disabled={readOnlyMode}>
                {c.addSemester}
              </button>
            </div>
          </Card>
        </>
      )}
    </section>
  );
}
