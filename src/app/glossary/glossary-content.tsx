'use client';

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';

interface GlossaryTerm {
  term: string;
  slug: string;
  definition: string;
  longDefinition?: string;
}

interface GlossaryContentProps {
  terms: GlossaryTerm[];
}

export function GlossaryContent({ terms }: GlossaryContentProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTerms = useMemo(() => {
    if (!searchQuery) return terms;
    const query = searchQuery.toLowerCase();
    return terms.filter(
      (t) =>
        t.term.toLowerCase().includes(query) ||
        t.definition.toLowerCase().includes(query)
    );
  }, [terms, searchQuery]);

  const groupedTerms = useMemo(() => {
    const groups = new Map<string, GlossaryTerm[]>();
    for (const term of filteredTerms) {
      const letter = term.term[0].toUpperCase();
      const existing = groups.get(letter);
      if (existing) {
        existing.push(term);
      } else {
        groups.set(letter, [term]);
      }
    }
    // Sort entries alphabetically by letter
    return new Map(
      Array.from(groups.entries()).sort(([a], [b]) => a.localeCompare(b))
    );
  }, [filteredTerms]);

  const availableLetters = useMemo(
    () => Array.from(groupedTerms.keys()),
    [groupedTerms]
  );

  return (
    <>
      {/* Search input */}
      <div className="mt-6">
        <Input
          type="search"
          placeholder="Search terms..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {/* A-Z jump links */}
      {availableLetters.length > 0 && (
        <nav className="mt-6 flex flex-wrap gap-2" aria-label="Alphabetical navigation">
          {availableLetters.map((letter) => (
            <a
              key={letter}
              href={`#letter-${letter}`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {letter}
            </a>
          ))}
        </nav>
      )}

      {/* Letter groups */}
      {filteredTerms.length > 0 ? (
        <div className="mt-8 space-y-8">
          {Array.from(groupedTerms.entries()).map(([letter, letterTerms]) => (
            <section key={letter} id={`letter-${letter}`} className="scroll-mt-20">
              <h2 className="text-xl font-semibold text-foreground mb-4 border-b border-border pb-2">
                {letter}
              </h2>
              <dl className="space-y-4">
                {letterTerms.map((term) => (
                  <div key={term.slug} id={`term-${term.slug}`}>
                    <dt className="font-semibold text-foreground">{term.term}</dt>
                    <dd className="text-base text-muted-foreground mt-1">
                      {term.longDefinition || term.definition}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>
      ) : (
        searchQuery && (
          <p className="text-sm text-muted-foreground mt-8">
            No terms match &ldquo;{searchQuery}&rdquo;. Try a different search
            or browse the full list below.
          </p>
        )
      )}
    </>
  );
}
