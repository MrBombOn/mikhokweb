/** @file Első belépés admin onboarding (P8) – localStorage alapú. */
'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useApp } from '@/components/layout/AppProvider';
import { t } from '@/lib/content';

const STORAGE_KEY = 'hok_admin_onboarding_v8_done';

const STEP_COUNT = 5;

export function AdminOnboardingWizard() {
  const { lang } = useApp();
  const m = t(lang).internal;
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(STORAGE_KEY) === '1') return;
      setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const dismiss = useCallback(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      /* ignore */
    }
    setVisible(false);
  }, []);

  const steps = useMemo(
    () => [
      { title: m.onboardingStep1Title, text: m.onboardingStep1Text },
      { title: m.onboardingStep2Title, text: m.onboardingStep2Text },
      { title: m.onboardingStep3Title, text: m.onboardingStep3Text },
      { title: m.onboardingStep4Title, text: m.onboardingStep4Text },
      { title: m.onboardingStep5Title, text: m.onboardingStep5Text },
    ],
    [m],
  );

  if (!visible) return null;

  const current = steps[step] ?? steps[0]!;

  return (
    <div className="admin-onboarding-backdrop" role="presentation">
      <div className="admin-onboarding-dialog card" role="dialog" aria-modal="true" aria-labelledby="admin-onb-title">
        <h2 id="admin-onb-title" className="admin-onboarding-title">
          {m.onboardingTitle}
        </h2>
        <p className="admin-onboarding-meta muted-text">
          {step + 1}/{STEP_COUNT}
        </p>
        <h3 className="admin-onboarding-step-title">{current.title}</h3>
        <p className="admin-onboarding-step-text">{current.text}</p>
        <div className="admin-onboarding-actions">
          <button type="button" className="btn btn-secondary" onClick={dismiss}>
            {m.onboardingSkip}
          </button>
          {step > 0 ? (
            <button type="button" className="btn btn-secondary" onClick={() => setStep((s) => Math.max(0, s - 1))}>
              {m.onboardingBack}
            </button>
          ) : null}
          {step < STEP_COUNT - 1 ? (
            <button type="button" className="btn btn-primary" onClick={() => setStep((s) => Math.min(STEP_COUNT - 1, s + 1))}>
              {m.onboardingNext}
            </button>
          ) : (
            <button type="button" className="btn btn-primary" onClick={dismiss}>
              {m.onboardingDone}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
