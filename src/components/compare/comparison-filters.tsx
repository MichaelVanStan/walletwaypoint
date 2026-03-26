'use client';

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import type { FilterConfig } from '@/lib/compare/filter-config';

interface ComparisonFiltersProps {
  filters: FilterConfig[];
  activeFilters: Record<string, string>;
  onFilterChange: (filterId: string, value: string | null) => void;
  onClearAll: () => void;
}

export function ComparisonFilters({
  filters,
  activeFilters,
  onFilterChange,
  onClearAll,
}: ComparisonFiltersProps) {
  const hasActiveFilters = Object.values(activeFilters).some(
    (value) => value !== 'all',
  );

  return (
    <nav aria-label="Product filters">
      <div className="flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:items-center">
        <span className="text-sm font-medium text-foreground">Filter by:</span>
        {filters.map((filter) => (
          <Select
            key={filter.id}
            value={activeFilters[filter.id] ?? 'all'}
            onValueChange={(value) => {
              onFilterChange(filter.id, value === 'all' ? null : value);
            }}
          >
            <SelectTrigger size="sm">
              <SelectValue placeholder={filter.label} />
            </SelectTrigger>
            <SelectContent>
              {filter.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ))}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            aria-label="Clear all filters"
          >
            Clear filters
          </Button>
        )}
      </div>
    </nav>
  );
}
