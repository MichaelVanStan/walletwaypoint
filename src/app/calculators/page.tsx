import Link from 'next/link';
import { calculators } from '#site/content';
import { createMetadata } from '@/lib/metadata';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const metadata = createMetadata({
  title: 'Financial Calculators',
  description:
    'Free interactive tools that update in real time. Adjust the sliders, see your numbers, and share the results.',
  path: '/calculators',
});

function categoryLabel(category: string): string {
  const labels: Record<string, string> = {
    home: 'Home & Housing',
    savings: 'Savings & Investing',
    loans: 'Loans & Debt',
    retirement: 'Retirement',
    budget: 'Budgeting',
    tax: 'Taxes',
  };
  return labels[category] || category;
}

export default function CalculatorsPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 sm:px-6 py-12 md:py-16">
      <h1 className="text-2xl font-semibold text-foreground">
        Financial Calculators
      </h1>
      <p className="mt-3 text-base leading-[1.6] text-muted-foreground">
        Free interactive tools that update in real time. Adjust the sliders, see
        your numbers, and share the results.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {calculators.map((calc) => (
          <Link
            key={calc.slug}
            href={`/calculators/${calc.slug}`}
            className="group"
          >
            <Card className="h-full transition-colors group-hover:border-accent/50">
              <CardHeader>
                <Badge variant="secondary" className="w-fit mb-2">
                  {categoryLabel(calc.category)}
                </Badge>
                <CardTitle className="text-lg">{calc.title}</CardTitle>
                <CardDescription>{calc.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <span className="text-sm font-medium text-accent">
                  Try this calculator &rarr;
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
