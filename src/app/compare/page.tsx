import Link from 'next/link';
import { products } from '#site/content';
import { createMetadata } from '@/lib/metadata';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { CreditCard, Landmark, PiggyBank, Shield } from 'lucide-react';

export const metadata = createMetadata({
  title: 'Product Comparisons',
  description:
    'Side-by-side comparisons of credit cards, loans, savings accounts, and insurance. Every comparison explains exactly how we rank products.',
  path: '/compare',
});

const categoryIcons: Record<string, React.ElementType> = {
  'credit-cards': CreditCard,
  'personal-loans': Landmark,
  'savings-accounts': PiggyBank,
  insurance: Shield,
};

export default function ComparePage() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 md:py-12">
      <h1 className="text-2xl font-semibold text-foreground">
        Product Comparisons
      </h1>
      <p className="mt-3 max-w-[640px] text-base leading-[1.6] text-muted-foreground">
        Side-by-side comparisons of credit cards, loans, savings accounts, and
        insurance. Every comparison explains exactly how we rank products.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {products.map((category) => {
          const Icon = categoryIcons[category.category] || CreditCard;
          return (
            <Link
              key={category.category}
              href={`/compare/${category.category}`}
              className="group"
            >
              <Card className="h-full transition-colors group-hover:border-accent/50">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                    <CardTitle className="text-xl">
                      {category.categoryTitle}
                    </CardTitle>
                  </div>
                  <CardDescription className="mt-1">
                    {category.categoryDescription}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="text-sm text-muted-foreground">
                    {category.products.length} products
                  </span>
                </CardContent>
                <CardFooter>
                  <span className="text-sm font-medium text-accent">
                    Compare products &rarr;
                  </span>
                </CardFooter>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="py-8">
        <p className="text-sm text-muted-foreground">
          See how we rank products:{' '}
          <Link
            href="/how-we-rank"
            className="underline hover:text-foreground"
          >
            Our ranking methodology
          </Link>
        </p>
      </div>
    </div>
  );
}
