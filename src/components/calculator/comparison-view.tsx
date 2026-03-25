"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { CsvExportButton } from "@/components/calculator/csv-export";
import { formatByType } from "@/lib/calculators/formatters";
import type { ComparisonDelta } from "@/lib/calculators/types";

interface ComparisonViewProps {
  deltas: ComparisonDelta[];
  calculatorSlug: string;
  detailRowsA?: Array<Record<string, string | number>>;
  detailRowsB?: Array<Record<string, string | number>>;
  detailColumns?: Array<{
    key: string;
    label: string;
    format?: "currency" | "percent" | "number";
  }>;
}

/** Format delta value with semantic prefix/suffix */
function formatDelta(delta: ComparisonDelta): string {
  if (delta.delta === 0) return "No change";
  const formatted = formatByType(Math.abs(delta.delta), delta.format);
  if (delta.direction === "positive") {
    return `saves ${formatted}`;
  }
  if (delta.direction === "negative") {
    return `${formatted} more`;
  }
  // neutral with non-zero delta
  return delta.delta > 0 ? `${formatted} higher` : `${formatted} lower`;
}

/** Get aria-label for delta badge */
function getDeltaAriaLabel(delta: ComparisonDelta): string {
  if (delta.delta === 0) return "no change";
  if (delta.direction === "positive") {
    return `saves ${formatByType(Math.abs(delta.delta), delta.format)}`;
  }
  if (delta.direction === "negative") {
    return `costs ${formatByType(Math.abs(delta.delta), delta.format)} more`;
  }
  return `${formatByType(Math.abs(delta.delta), delta.format)} difference`;
}

/** Render delta badge with semantic color */
function DeltaBadge({ delta }: { delta: ComparisonDelta }) {
  if (delta.direction === "positive") {
    return (
      <Badge
        className="bg-accent/10 text-accent"
        aria-label={getDeltaAriaLabel(delta)}
      >
        {formatDelta(delta)}
      </Badge>
    );
  }
  if (delta.direction === "negative") {
    return (
      <Badge
        className="bg-destructive/10 text-destructive"
        aria-label={getDeltaAriaLabel(delta)}
      >
        {formatDelta(delta)}
      </Badge>
    );
  }
  return (
    <Badge
      className="bg-muted text-muted-foreground"
      aria-label={getDeltaAriaLabel(delta)}
    >
      No change
    </Badge>
  );
}

export function ComparisonView({
  deltas,
  calculatorSlug,
  detailRowsA,
  detailRowsB,
  detailColumns,
}: ComparisonViewProps) {
  const [detailOpen, setDetailOpen] = useState(false);
  const hasDetailRows =
    detailColumns &&
    detailColumns.length > 0 &&
    ((detailRowsA && detailRowsA.length > 0) ||
      (detailRowsB && detailRowsB.length > 0));

  return (
    <div className="space-y-4">
      {/* Comparison summary table */}
      <Table>
        <TableHeader>
          <TableRow className="bg-secondary">
            <TableHead scope="col">Metric</TableHead>
            <TableHead scope="col">Your Scenario</TableHead>
            <TableHead scope="col">Alternative Scenario</TableHead>
            <TableHead scope="col">Difference</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deltas.map((delta, i) => (
            <TableRow
              key={delta.key}
              className={i % 2 === 1 ? "bg-muted" : undefined}
            >
              <TableHead scope="row" className="font-medium">
                {delta.label}
              </TableHead>
              <TableCell>{formatByType(delta.valueA, delta.format)}</TableCell>
              <TableCell>{formatByType(delta.valueB, delta.format)}</TableCell>
              <TableCell>
                <DeltaBadge delta={delta} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* CSV export button */}
      <div className="flex justify-end">
        <CsvExportButton
          data={deltas}
          calculatorSlug={calculatorSlug}
          disabled={deltas.length === 0}
        />
      </div>

      {/* Expandable detail table for comparison breakdown */}
      {hasDetailRows && detailColumns && (
        <Collapsible open={detailOpen} onOpenChange={setDetailOpen}>
          <CollapsibleTrigger
            render={
              <Button variant="ghost" className="w-full justify-between" />
            }
          >
            {detailOpen ? "Hide full breakdown" : "Show full breakdown"}
            {detailOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="mt-4 space-y-6">
              {detailRowsA && detailRowsA.length > 0 && (
                <div>
                  <h4 className="mb-2 text-sm font-semibold text-foreground">
                    Your Scenario
                  </h4>
                  <DetailTable
                    rows={detailRowsA}
                    columns={detailColumns}
                  />
                </div>
              )}
              {detailRowsB && detailRowsB.length > 0 && (
                <div>
                  <h4 className="mb-2 text-sm font-semibold text-foreground">
                    Alternative Scenario
                  </h4>
                  <DetailTable
                    rows={detailRowsB}
                    columns={detailColumns}
                  />
                </div>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
}

/** Reusable detail breakdown table */
function DetailTable({
  rows,
  columns,
}: {
  rows: Array<Record<string, string | number>>;
  columns: Array<{
    key: string;
    label: string;
    format?: "currency" | "percent" | "number";
  }>;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="sticky top-0 bg-secondary">
          {columns.map((col) => (
            <TableHead key={col.key} scope="col">
              {col.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row, i) => (
          <TableRow
            key={i}
            className={i % 2 === 1 ? "bg-muted" : undefined}
          >
            {columns.map((col, j) => {
              const value = row[col.key];
              const formatted =
                col.format && typeof value === "number"
                  ? formatByType(value, col.format)
                  : String(value ?? "");
              return j === 0 ? (
                <TableHead key={col.key} scope="row" className="font-medium">
                  {formatted}
                </TableHead>
              ) : (
                <TableCell key={col.key}>{formatted}</TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
