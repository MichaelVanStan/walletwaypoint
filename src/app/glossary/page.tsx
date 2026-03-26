import { glossary } from '#site/content';
import { createMetadata } from '@/lib/metadata';
import { GlossaryContent } from './glossary-content';

export const metadata = createMetadata({
  title: 'Financial Glossary',
  description:
    'Plain-English definitions of common financial terms. No jargon, no fine print.',
  path: '/glossary',
});

export default function GlossaryPage() {
  return (
    <div className="mx-auto max-w-[720px] px-4 sm:px-6 py-12 md:py-16">
      <h1 className="text-2xl font-semibold text-foreground">
        Financial Glossary
      </h1>
      <p className="text-base text-muted-foreground mt-3">
        Plain-English definitions of common financial terms. No jargon, no fine
        print.
      </p>

      <GlossaryContent terms={glossary.terms} />
    </div>
  );
}
