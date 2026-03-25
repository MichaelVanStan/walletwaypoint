"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { downloadCsv } from "@/lib/calculators/csv";
import { formatByType } from "@/lib/calculators/formatters";
import type { ComparisonDelta } from "@/lib/calculators/types";

interface CsvExportButtonProps {
  data: ComparisonDelta[];
  calculatorSlug: string;
  disabled?: boolean;
}

export function CsvExportButton({
  data,
  calculatorSlug,
  disabled = false,
}: CsvExportButtonProps) {
  function handleExport() {
    const headers = [
      "Metric",
      "Your Scenario",
      "Alternative Scenario",
      "Difference",
    ];
    const rows = data.map((delta) => [
      delta.label,
      formatByType(delta.valueA, delta.format),
      formatByType(delta.valueB, delta.format),
      formatByType(delta.delta, delta.format),
    ]);
    downloadCsv(`${calculatorSlug}-comparison`, headers, rows);
  }

  if (disabled) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button variant="ghost" disabled className="opacity-50">
              <Download className="mr-2 h-4 w-4" data-icon="inline-start" />
              Export to CSV
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            Enable comparison mode to export data.
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <Button variant="outline" onClick={handleExport}>
      <Download className="mr-2 h-4 w-4" data-icon="inline-start" />
      Export to CSV
    </Button>
  );
}
