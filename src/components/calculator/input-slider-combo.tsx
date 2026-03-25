"use client";

import { useCallback, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface UnitToggleConfig {
  primary: { label: string; suffix: string };
  alternate: { label: string; suffix: string; multiplier: number };
}

interface InputSliderComboProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  hint?: string;
  format?: "currency" | "percent" | "years" | "number";
  tooltip?: string;
  unitToggle?: UnitToggleConfig;
}

export function InputSliderCombo({
  label,
  value,
  onChange,
  min,
  max,
  step,
  hint,
  format,
  tooltip,
  unitToggle,
}: InputSliderComboProps) {
  const [useAlternateUnit, setUseAlternateUnit] = useState(false);

  const multiplier =
    unitToggle && useAlternateUnit ? unitToggle.alternate.multiplier : 1;
  const displayValue = value * multiplier;
  const displayMin = min * multiplier;
  const displayMax = max * multiplier;
  const displayStep = step * multiplier;

  const [localValue, setLocalValue] = useState<string>(String(displayValue));
  const isExtreme = value < min || value > max;

  const handleSliderChange = useCallback(
    (newValue: number | readonly number[]) => {
      const v = Array.isArray(newValue) ? newValue[0] : newValue;
      setLocalValue(String(v));
      onChange(v / multiplier);
    },
    [onChange, multiplier]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setLocalValue(e.target.value);
      const parsed = parseFloat(e.target.value);
      if (!isNaN(parsed)) {
        onChange(parsed / multiplier);
      }
    },
    [onChange, multiplier]
  );

  const handleInputBlur = useCallback(() => {
    const parsed = parseFloat(localValue);
    if (isNaN(parsed)) {
      setLocalValue(String(displayValue));
      return;
    }
    const clamped = Math.min(Math.max(parsed, displayMin), displayMax);
    setLocalValue(String(clamped));
    onChange(clamped / multiplier);
  }, [localValue, displayValue, displayMin, displayMax, onChange, multiplier]);

  // Keep local value in sync when external value or unit toggle changes
  const [prevValue, setPrevValue] = useState(value);
  const [prevMultiplier, setPrevMultiplier] = useState(multiplier);
  if (value !== prevValue || multiplier !== prevMultiplier) {
    setPrevValue(value);
    setPrevMultiplier(multiplier);
    setLocalValue(String(value * multiplier));
  }

  const inputMode = format === "percent" ? "decimal" : "numeric";

  const prefix = format === "currency" ? "$" : undefined;
  const activeSuffix = unitToggle
    ? useAlternateUnit
      ? unitToggle.alternate.suffix
      : unitToggle.primary.suffix
    : format === "percent"
      ? "%"
      : format === "years"
        ? "yr"
        : undefined;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <Label htmlFor={`input-${label}`}>{label}</Label>
          {tooltip && (
            <TooltipProvider delay={300}>
              <Tooltip>
                <TooltipTrigger
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={`Learn more about ${label}`}
                >
                  <Info className="size-3.5" />
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-[260px]">
                  <p className="text-sm">{tooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          {unitToggle && (
            <button
              type="button"
              onClick={() => setUseAlternateUnit(!useAlternateUnit)}
              className="rounded-md border border-border px-1.5 py-0.5 text-xs text-muted-foreground hover:bg-muted transition-colors"
              aria-label={`Switch to ${useAlternateUnit ? unitToggle.primary.label : unitToggle.alternate.label}`}
            >
              {useAlternateUnit
                ? unitToggle.alternate.label
                : unitToggle.primary.label}
            </button>
          )}
        </div>
        <div className="relative w-28">
          {prefix && (
            <span className="pointer-events-none absolute inset-y-0 left-2 flex items-center text-sm text-muted-foreground">
              {prefix}
            </span>
          )}
          <Input
            id={`input-${label}`}
            type="number"
            value={localValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            className={`w-28 text-right ${prefix ? "pl-6" : ""} ${activeSuffix ? "pr-7" : ""} ${isExtreme ? "border-amber-400" : ""}`}
            aria-label={`${label} value`}
            inputMode={inputMode}
            min={displayMin}
            max={displayMax}
            step={displayStep}
          />
          {activeSuffix && (
            <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-sm text-muted-foreground">
              {activeSuffix}
            </span>
          )}
        </div>
      </div>
      <Slider
        value={[displayValue]}
        onValueChange={handleSliderChange}
        min={displayMin}
        max={displayMax}
        step={displayStep}
        aria-label={label}
      />
      {(hint || isExtreme) && (
        <p className="text-sm text-muted-foreground">
          {hint}
          {isExtreme && (
            <span className="ml-1 text-amber-600">Unusual value</span>
          )}
        </p>
      )}
    </div>
  );
}
