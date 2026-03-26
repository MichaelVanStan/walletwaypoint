'use client';

import { glossary } from '#site/content';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';

export function Term({ children }: { children: string }) {
  const searchTerm = children.toString().toLowerCase();
  const match = glossary.terms.find(
    (t) => t.term.toLowerCase() === searchTerm
  );

  if (!match) {
    return <span>{children}</span>;
  }

  return (
    <Popover>
      <PopoverTrigger
        className="cursor-help border-b border-dotted border-muted-foreground/50 hover:border-accent text-inherit inline transition-colors duration-150"
      >
        {children}
      </PopoverTrigger>
      <PopoverContent className="max-w-[280px] text-sm">
        <p className="font-semibold mb-1">{match.term}</p>
        <p className="text-muted-foreground">{match.definition}</p>
      </PopoverContent>
    </Popover>
  );
}
