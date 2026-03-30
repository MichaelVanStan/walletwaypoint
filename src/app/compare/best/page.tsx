import Link from 'next/link';
import { listicles } from '#site/content';
import { createMetadata } from '@/lib/metadata';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import {
  CreditCard,
  Landmark,
  PiggyBank,
  Shield,
  TrendingUp,
  Car,
  Home,
  Calculator,
} from 'lucide-react';

export const metadata = createMetadata({
  title: 'Best Financial Products',
  description:
    'Expert-researched picks for the best credit cards, personal loans, savings accounts, insurance, and more -- for every financial goal.',
  path: '/compare/best',
});

const categoryIcons: Record<string, React.ElementType> = {
  'credit-cards': CreditCard,
  'personal-loans': Landmark,
  'savings-accounts': PiggyBank,
  insurance: Shield,
  'auto-insurance': Car,
  'life-insurance': Shield,
  'investment-platforms': TrendingUp,
  'tax-software': Calculator,
  home: Home,
};

export default function ListicleIndexPage() {
  return (
    <div className="mx-auto max-w-[1080px] px-4 py-8 sm:px-6 md:py-12">
      <h1 className="text-2xl font-semibold text-foreground">
        Best Financial Products
      </h1>
      <p className="mt-3 max-w-[640px] text-base leading-[1.6] text-muted-foreground">
        Expert-researched picks for every financial goal. Each article explains
        our methodology and who each product is best for.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {listicles.map((listicle) => {
          const Icon =
            categoryIcons[listicle.relatedCategory] || TrendingUp;
          return (
            <Link
              key={listicle.slug}
              href={`/compare/best/${listicle.slug}`}
              className="group"
            >
              <Card className="h-full transition-colors group-hover:border-accent/50">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                    <CardDescription>{listicle.category}</CardDescription>
                  </div>
                  <CardTitle>{listicle.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {listicle.description}
                  </p>
                </CardContent>
                <CardFooter>
                  <span className="text-sm font-medium text-accent">
                    Read comparison &rarr;
                  </span>
                </CardFooter>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
