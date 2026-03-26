'use client';

import * as runtime from 'react/jsx-runtime';
import { mdxComponents } from './mdx-components';

interface MDXContentProps {
  code: string;
  components?: Record<string, React.ComponentType<any>>;
}

function useMDXComponent(code: string) {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
}

export function MDXContent({ code, components }: MDXContentProps) {
  const Component = useMDXComponent(code);
  return <Component components={{ ...mdxComponents, ...components }} />;
}
