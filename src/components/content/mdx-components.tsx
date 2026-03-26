import type { ComponentType } from 'react';
import { KeyTakeaway } from './key-takeaway';
import { ProTip } from './pro-tip';
import { Definition } from './definition';
import { Term } from './term';

export const mdxComponents: Record<string, ComponentType<any>> = {
  // Custom MDX components
  KeyTakeaway,
  ProTip,
  Definition,
  Term,

  // Override default HTML elements for consistent guide styling
  h2: (props: any) => (
    <h2 id={props.id} className="mt-10 mb-4 scroll-mt-20 text-xl font-semibold" {...props} />
  ),
  h3: (props: any) => (
    <h3 id={props.id} className="mt-8 mb-3 scroll-mt-20 text-lg font-semibold" {...props} />
  ),
  p: (props: any) => (
    <p className="mb-4 text-base leading-[1.7]" {...props} />
  ),
  ul: (props: any) => (
    <ul className="mb-4 list-disc space-y-2 pl-6 text-base leading-[1.6]" {...props} />
  ),
  ol: (props: any) => (
    <ol className="mb-4 list-decimal space-y-2 pl-6 text-base leading-[1.6]" {...props} />
  ),
  a: (props: any) => (
    <a className="text-accent underline hover:text-foreground" {...props} />
  ),
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-accent/30 pl-4 italic text-muted-foreground" {...props} />
  ),
  table: (props: any) => (
    <div className="overflow-x-auto mb-4">
      <table className="w-full text-sm" {...props} />
    </div>
  ),
  th: (props: any) => (
    <th className="border-b border-border px-3 py-2 text-left font-semibold" {...props} />
  ),
  td: (props: any) => (
    <td className="border-b border-border px-3 py-2" {...props} />
  ),
};
