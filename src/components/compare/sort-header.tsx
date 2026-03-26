'use client';

import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

interface SortHeaderProps {
  column: string;
  label: string;
  active: boolean;
  direction: 'asc' | 'desc' | null;
  onSort: (column: string) => void;
}

export function SortHeader({ column, label, active, direction, onSort }: SortHeaderProps) {
  const Icon = active
    ? direction === 'asc' ? ArrowUp : ArrowDown
    : ArrowUpDown;

  return (
    <button
      onClick={() => onSort(column)}
      className="inline-flex items-center gap-1 hover:text-accent"
      aria-label={`Sort by ${label}`}
    >
      {label}
      <Icon className={`h-4 w-4 ${active ? 'text-foreground' : 'text-muted-foreground'}`} />
    </button>
  );
}
