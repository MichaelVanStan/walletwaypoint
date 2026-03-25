"use client";

import { useState } from "react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { ChevronDown, ChevronUp } from "lucide-react";
import { formatByType } from "@/lib/calculators/formatters";

interface DetailTableProps {
  detailRows?: Array<Record<string, string | number>>;
  detailColumns?: Array<{
    key: string;
    label: string;
    format?: "currency" | "percent" | "number";
  }>;
  triggerLabel?: string;
}

export function DetailTable({
  detailRows,
  detailColumns,
  triggerLabel = "Show full amortization schedule",
}: DetailTableProps) {
  const [open, setOpen] = useState(false);

  if (!detailRows || detailRows.length === 0 || !detailColumns || detailColumns.length === 0) {
    return null;
  }

  const closedLabel = triggerLabel;
  const openLabel = triggerLabel.replace(/^Show/, "Hide");

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger
        className="inline-flex shrink-0 items-center justify-center gap-1 rounded-lg text-sm font-medium whitespace-nowrap transition-all outline-none select-none hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 h-8 px-2.5"
      >
        {open ? (
          <ChevronUp className="size-4" />
        ) : (
          <ChevronDown className="size-4" />
        )}
        {open ? openLabel : closedLabel}
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="mt-4 max-h-[400px] overflow-y-auto rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                {detailColumns.map((col) => (
                  <TableHead key={col.key} scope="col">
                    {col.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {detailRows.map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  className={rowIndex % 2 === 0 ? "bg-muted" : ""}
                >
                  {detailColumns.map((col) => {
                    const cellValue = row[col.key];
                    const displayValue =
                      col.format && typeof cellValue === "number"
                        ? formatByType(cellValue, col.format)
                        : String(cellValue ?? "");
                    return (
                      <TableCell key={col.key}>{displayValue}</TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
