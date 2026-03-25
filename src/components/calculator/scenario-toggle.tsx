"use client";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface ScenarioToggleProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

export function ScenarioToggle({ enabled, onToggle }: ScenarioToggleProps) {
  return (
    <div className="flex items-center gap-3">
      <Switch
        checked={enabled}
        onCheckedChange={onToggle}
        aria-label="Compare two scenarios"
        className="data-[state=checked]:bg-accent"
      />
      <Label className="cursor-pointer" onClick={() => onToggle(!enabled)}>
        {enabled ? "Comparing two scenarios" : "Compare scenarios"}
      </Label>
    </div>
  );
}
