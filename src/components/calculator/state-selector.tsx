"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface StateSelectorProps {
  value: string;
  onChange: (slug: string) => void;
  disabled?: boolean;
  states: Array<{ slug: string; name: string; abbreviation: string }>;
}

export function StateSelector({
  value,
  onChange,
  disabled = false,
  states,
}: StateSelectorProps) {
  const selectedState = states.find((s) => s.slug === value);
  const displayLabel = selectedState
    ? `${selectedState.name} (${selectedState.abbreviation})`
    : "Select a state";

  return (
    <Select
      value={value}
      onValueChange={(val) => { if (val) onChange(val); }}
      disabled={disabled}
      aria-label="Select your state"
    >
      <SelectTrigger className="w-full" aria-label="Select your state">
        <SelectValue placeholder="Select a state">
          {displayLabel}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {states.map((state) => (
          <SelectItem key={state.slug} value={state.slug}>
            {state.name} ({state.abbreviation})
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
