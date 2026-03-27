'use client';

import type { FilterConfig } from '@/lib/compare/filter-config';

interface FilterChipsProps {
  filters: FilterConfig[];
  activeFilters: Record<string, string>;
  onFilterChange: (filterId: string, value: string | null) => void;
  onClearAll: () => void;
}

export function FilterChips({
  filters,
  activeFilters,
  onFilterChange,
  onClearAll,
}: FilterChipsProps) {
  const hasActiveFilters = Object.values(activeFilters).some(
    (v) => v !== 'all',
  );

  return (
    <nav aria-label="Product filters">
      <div className="flex flex-wrap items-center gap-2">
        {/* "All" chip */}
        <button
          onClick={onClearAll}
          className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
            !hasActiveFilters
              ? 'border-primary bg-primary text-primary-foreground'
              : 'border-border bg-background text-foreground hover:bg-accent/10'
          }`}
        >
          All
        </button>

        {/* Filter option chips */}
        {filters.map((filter) =>
          filter.options
            .filter((option) => option.value !== 'all')
            .map((option) => {
              const isActive = activeFilters[filter.id] === option.value;

              return (
                <button
                  key={`${filter.id}-${option.value}`}
                  onClick={() =>
                    onFilterChange(
                      filter.id,
                      isActive ? null : option.value,
                    )
                  }
                  className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-background text-foreground hover:bg-accent/10'
                  }`}
                >
                  {option.label}
                </button>
              );
            }),
        )}
      </div>
    </nav>
  );
}
