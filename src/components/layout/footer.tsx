import Link from 'next/link';
import { footerNavigation } from '@/lib/navigation';
import { Separator } from '@/components/ui/separator';

const columnLabels: Record<keyof typeof footerNavigation, string> = {
  tools: 'Tools',
  learn: 'Learn',
  company: 'Company',
  legal: 'Legal',
};

export function Footer() {
  const currentYear = new Date().getFullYear();
  const columns = Object.entries(footerNavigation) as [
    keyof typeof footerNavigation,
    (typeof footerNavigation)[keyof typeof footerNavigation],
  ][];

  return (
    <footer className="bg-secondary">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        {/* Navigation Columns */}
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {columns.map(([key, items]) => (
            <div key={key}>
              <h3 className="mb-3 text-sm font-semibold text-foreground">
                {columnLabels[key]}
              </h3>
              <ul className="flex flex-col gap-2">
                {items.map((item) => (
                  <li key={item.href}>
                    {item.disabled ? (
                      <span className="text-sm text-muted-foreground/70 cursor-default">
                        {item.title}
                      </span>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground hover:underline"
                      >
                        {item.title}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Separator */}
        <Separator className="my-8" />

        {/* Disclaimer */}
        <p className="text-xs leading-relaxed text-muted-foreground">
          WalletWaypoint provides educational content and tools for
          informational purposes only. Nothing on this site constitutes
          financial, tax, or legal advice. Consult a qualified professional
          before making financial decisions.
        </p>

        {/* Copyright */}
        <p className="mt-4 text-xs text-muted-foreground">
          &copy; 2024&ndash;{currentYear} WalletWaypoint. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
