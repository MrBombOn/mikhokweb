/**
 * @file KKI kalkulátor oldal – `/calculator`
 */
'use client';

import { CalculatorModule } from '@/components/calculator/CalculatorModule';
import { PageShell } from '@/components/ui/Core';
export default function CalculatorPage() { return <PageShell><CalculatorModule /></PageShell>; }
