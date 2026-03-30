"use client";

import { useMemo } from "react";
import { parseAsInteger, parseAsString, parseAsStringLiteral } from "nuqs";
import { CalculatorShell } from "@/components/calculator/calculator-shell";
import { getCalculatorCompute } from "@/lib/calculators/registry";
import type { CalculatorConfig } from "@/lib/calculators/types";

const paycheckFilingStatuses = ["single", "married", "head"] as const;
const payFrequencies = [
  "weekly",
  "biweekly",
  "semimonthly",
  "monthly",
] as const;

interface StatePaycheckClientProps {
  config: CalculatorConfig;
  stateSlug: string;
}

export function StatePaycheckClient({
  config,
  stateSlug,
}: StatePaycheckClientProps) {
  const computeResults = getCalculatorCompute(config.mathModule);

  const params = useMemo(
    () => ({
      salary: parseAsInteger.withDefault(65000),
      state: parseAsString.withDefault(stateSlug),
      filing: parseAsStringLiteral(paycheckFilingStatuses).withDefault("single"),
      frequency: parseAsStringLiteral(payFrequencies).withDefault("biweekly"),
      withholding: parseAsInteger.withDefault(0),
      pretaxDeductions: parseAsInteger.withDefault(0),
    }),
    [stateSlug]
  );

  return (
    <CalculatorShell
      config={config}
      computeResults={computeResults}
      params={params}
    />
  );
}
