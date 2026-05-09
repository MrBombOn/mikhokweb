/**
 * Verziózott képletrendszer – a számítási szabályok változásakor növelni kell,
 * és az export / share token meta mezőben meg kell jelennie (`docs/calculator-rules.md`).
 */
export const CALCULATOR_FORMULA_VERSION = 1 as const;

export type CalculatorFormulaVersion = typeof CALCULATOR_FORMULA_VERSION;
