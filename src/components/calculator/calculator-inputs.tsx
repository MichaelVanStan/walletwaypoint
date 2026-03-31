"use client";

import { useState } from "react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ChevronDown, ChevronUp } from "lucide-react";
import { InputSliderCombo } from "./input-slider-combo";
import type { InputConfig } from "@/lib/calculators/types";

interface CalculatorInputsProps {
  inputs: InputConfig[];
  advancedInputs?: InputConfig[];
  values: Record<string, number | string>;
  onChange: (key: string, value: number | string) => void;
  scenarioLabel?: string;
  computedHints?: Record<string, string>;
}

export function CalculatorInputs({
  inputs,
  advancedInputs,
  values,
  onChange,
  scenarioLabel,
  computedHints,
}: CalculatorInputsProps) {
  const [advancedOpen, setAdvancedOpen] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      {scenarioLabel && (
        <h3 className="text-sm font-semibold text-foreground">
          {scenarioLabel}
        </h3>
      )}

      {inputs.map((input) =>
        input.type === "select" ? (
          <div key={input.urlKey} className="space-y-2">
            <Label>{input.label}</Label>
            <Select
              value={String(values[input.urlKey] ?? input.default)}
              onValueChange={(v) => { if (v !== null) onChange(input.urlKey, v); }}
            >
              <SelectTrigger className="w-full" aria-label={input.label}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {input.options?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {input.hint && (
              <p className="text-sm text-muted-foreground">{input.hint}</p>
            )}
          </div>
        ) : (
          <InputSliderCombo
            key={input.urlKey}
            label={input.label}
            value={Number(values[input.urlKey] ?? input.default)}
            onChange={(v) => onChange(input.urlKey, v)}
            min={input.min}
            max={input.max}
            step={input.step}
            hint={computedHints?.[input.urlKey] ?? input.hint}
            format={input.type}
            tooltip={input.tooltip}
            unitToggle={input.unitToggle}
          />
        )
      )}

      {advancedInputs && advancedInputs.length > 0 && (
        <Collapsible open={advancedOpen} onOpenChange={setAdvancedOpen}>
          <CollapsibleTrigger
            className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            aria-expanded={advancedOpen}
          >
            {advancedOpen ? (
              <>
                <ChevronUp className="size-4" />
                Hide advanced options
              </>
            ) : (
              <>
                <ChevronDown className="size-4" />
                Show advanced options
              </>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="mt-4 flex flex-col gap-6">
              {advancedInputs.map((input) =>
                input.type === "select" ? (
                  <div key={input.urlKey} className="space-y-2">
                    <Label>{input.label}</Label>
                    <Select
                      value={String(values[input.urlKey] ?? input.default)}
                      onValueChange={(v) => { if (v !== null) onChange(input.urlKey, v); }}
                    >
                      <SelectTrigger
                        className="w-full"
                        aria-label={input.label}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {input.options?.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {input.hint && (
                      <p className="text-sm text-muted-foreground">
                        {input.hint}
                      </p>
                    )}
                  </div>
                ) : (
                  <InputSliderCombo
                    key={input.urlKey}
                    label={input.label}
                    value={Number(values[input.urlKey] ?? input.default)}
                    onChange={(v) => onChange(input.urlKey, v)}
                    min={input.min}
                    max={input.max}
                    step={input.step}
                    hint={input.hint}
                    format={input.type}
                  />
                )
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
}
