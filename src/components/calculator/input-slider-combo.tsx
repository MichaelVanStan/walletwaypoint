"use client";

import { useCallback, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InputSliderComboProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  hint?: string;
  format?: "currency" | "percent" | "years" | "number";
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
}: InputSliderComboProps) {
  const [localValue, setLocalValue] = useState<string>(String(value));
  const isExtreme = value < min || value > max;

  const handleSliderChange = useCallback(
    (newValue: number | readonly number[]) => {
      const v = Array.isArray(newValue) ? newValue[0] : newValue;
      setLocalValue(String(v));
      onChange(v);
    },
    [onChange]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setLocalValue(e.target.value);
      const parsed = parseFloat(e.target.value);
      if (!isNaN(parsed)) {
        onChange(parsed);
      }
    },
    [onChange]
  );

  const handleInputBlur = useCallback(() => {
    const parsed = parseFloat(localValue);
    if (isNaN(parsed)) {
      setLocalValue(String(value));
      return;
    }
    const clamped = Math.min(Math.max(parsed, min), max);
    setLocalValue(String(clamped));
    onChange(clamped);
  }, [localValue, value, min, max, onChange]);

  // Keep local value in sync when external value changes (e.g., reset)
  const [prevValue, setPrevValue] = useState(value);
  if (value !== prevValue) {
    setPrevValue(value);
    setLocalValue(String(value));
  }

  const inputMode =
    format === "percent" ? "decimal" : "numeric";

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <Label htmlFor={`input-${label}`}>{label}</Label>
        <Input
          id={`input-${label}`}
          type="number"
          value={localValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          className={`w-28 text-right ${isExtreme ? "border-amber-400" : ""}`}
          aria-label={`${label} value`}
          inputMode={inputMode}
          min={min}
          max={max}
          step={step}
        />
      </div>
      <Slider
        value={[value]}
        onValueChange={handleSliderChange}
        min={min}
        max={max}
        step={step}
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
