"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { formatCurrency, formatPercent } from "@/lib/calculators/formatters";
import { Info } from "lucide-react";

interface BracketTableProps {
  brackets?: {
    single: Array<{ min: number; max: number; rate: number }>;
    married: Array<{ min: number; max: number; rate: number }>;
    head: Array<{ min: number; max: number; rate: number }>;
  };
  stateName: string;
  taxType: "graduated" | "flat" | "none";
  flatRate?: number;
  hasIncomeTax: boolean;
}

function formatRange(min: number, max: number, isLast: boolean): string {
  if (isLast || max >= 999999990) {
    return `Over ${formatCurrency(min)}`;
  }
  return `${formatCurrency(min)} - ${formatCurrency(max)}`;
}

function calculateBracketTax(min: number, max: number, rate: number, isLast: boolean): number {
  if (isLast || max >= 999999990) {
    return 0;
  }
  return ((max - min + 1) * rate) / 100;
}

function BracketRows({
  brackets,
}: {
  brackets: Array<{ min: number; max: number; rate: number }>;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-muted/50">
          <TableHead className="text-xs font-semibold px-2 py-2">
            Income Range
          </TableHead>
          <TableHead className="text-xs font-semibold px-2 py-2 text-right">
            Tax Rate
          </TableHead>
          <TableHead className="text-xs font-semibold px-2 py-2 text-right">
            Tax on Bracket
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {brackets.map((bracket, index) => {
          const isLast = index === brackets.length - 1;
          const tax = calculateBracketTax(
            bracket.min,
            bracket.max,
            bracket.rate,
            isLast
          );
          return (
            <TableRow
              key={index}
              className={index % 2 === 1 ? "bg-muted/30" : ""}
            >
              <TableCell className="text-sm px-2 py-2">
                {formatRange(bracket.min, bracket.max, isLast)}
              </TableCell>
              <TableCell className="text-sm px-2 py-2 text-right">
                {formatPercent(bracket.rate)}
              </TableCell>
              <TableCell className="text-sm px-2 py-2 text-right">
                {isLast || tax === 0 ? "--" : formatCurrency(Math.round(tax))}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

export function BracketTable({
  brackets,
  stateName,
  taxType,
  flatRate,
  hasIncomeTax,
}: BracketTableProps) {
  if (!hasIncomeTax) {
    return (
      <div className="rounded-lg border border-border bg-muted/30 p-6">
        <div className="flex items-start gap-3">
          <Info className="size-5 text-accent shrink-0 mt-0.5" />
          <div>
            <p className="text-base font-semibold text-foreground">
              {stateName} has no state income tax
            </p>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Your entire salary is exempt from state income tax withholding.
              Only federal income tax and FICA (Social Security and Medicare) are
              deducted from your paycheck.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (taxType === "flat" && flatRate !== undefined) {
    return (
      <div>
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="text-xs font-semibold px-2 py-2">
                Income Range
              </TableHead>
              <TableHead className="text-xs font-semibold px-2 py-2 text-right">
                Tax Rate
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="text-sm px-2 py-2">All taxable income</TableCell>
              <TableCell className="text-sm px-2 py-2 text-right">
                {formatPercent(flatRate)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <p className="mt-3 text-sm text-muted-foreground">
          {stateName} uses a flat income tax rate of {formatPercent(flatRate)} on
          all taxable income, regardless of income level or filing status.
        </p>
      </div>
    );
  }

  if (!brackets) {
    return null;
  }

  const filingStatuses = [
    { value: "single", label: "Single" },
    { value: "married", label: "Married Filing Jointly" },
    { value: "head", label: "Head of Household" },
  ] as const;

  return (
    <Tabs defaultValue="single">
      <TabsList className="mb-4">
        {filingStatuses.map((status) => (
          <TabsTrigger key={status.value} value={status.value}>
            {status.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {filingStatuses.map((status) => (
        <TabsContent key={status.value} value={status.value}>
          <div className="rounded-lg border">
            <BracketRows brackets={brackets[status.value]} />
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
