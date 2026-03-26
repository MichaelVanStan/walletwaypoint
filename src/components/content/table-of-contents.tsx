'use client';

import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const elements = document.querySelectorAll('article h2[id], article h3[id]');
    const items: TocItem[] = Array.from(elements).map((el) => ({
      id: el.id,
      text: el.textContent || '',
      level: el.tagName === 'H2' ? 2 : 3,
    }));
    setHeadings(items);
  }, []);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-80px 0px -80% 0px' }
    );

    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter(Boolean) as HTMLElement[];

    for (const el of elements) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <>
      {/* Desktop TOC */}
      <nav className="hidden lg:block" aria-label="Table of contents">
        <p className="text-sm font-semibold text-foreground mb-3">
          On this page
        </p>
        <ul className="space-y-1">
          {headings.map((heading) => (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                aria-current={activeId === heading.id ? 'true' : undefined}
                className={`block text-sm transition-colors duration-150 ${
                  heading.level === 3 ? 'pl-4' : 'pl-3'
                } border-l-2 py-1 ${
                  activeId === heading.id
                    ? 'text-foreground font-semibold border-accent'
                    : 'text-muted-foreground border-transparent hover:text-foreground hover:border-muted-foreground/30'
                }`}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile TOC */}
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex items-center gap-2 text-sm font-semibold text-foreground w-full"
          aria-expanded={mobileOpen}
        >
          On this page
          <ChevronDown
            className={`size-4 transition-transform duration-150 ${
              mobileOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
        {mobileOpen && (
          <div className="flex flex-wrap gap-2 mt-2">
            {headings
              .filter((h) => h.level === 2)
              .map((heading) => (
                <a
                  key={heading.id}
                  href={`#${heading.id}`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150 px-2 py-1 rounded-md bg-muted/50"
                  onClick={() => setMobileOpen(false)}
                >
                  {heading.text}
                </a>
              ))}
          </div>
        )}
      </div>
    </>
  );
}
