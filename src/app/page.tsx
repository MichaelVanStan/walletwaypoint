import Link from 'next/link';
import {
  Calculator,
  BookOpen,
  Compass,
  Scale,
  ArrowRight,
  Shield,
  CheckCircle,
  Heart,
} from 'lucide-react';
import { createMetadata } from '@/lib/metadata';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CalculatorCarousel } from '@/components/home/calculator-carousel';

export const metadata = createMetadata({
  title: 'WalletWaypoint - Your next financial milestone starts here',
  description:
    'Interactive calculators, top picks, and educational guides for every life stage.',
  path: '/',
});

const sectionCards = [
  {
    icon: Compass,
    title: '10 Journeys',
    desc: 'Curated paths for where you are in life -- student, renter, buyer, parent, retiree.',
    cta: 'Find yours',
    href: '/hubs',
  },
  {
    icon: Calculator,
    title: '14 Calculators',
    desc: 'Paychecks, mortgages, budgets, loans, retirement, taxes -- run the numbers.',
    cta: 'Explore',
    href: '/calculators',
  },
  {
    icon: BookOpen,
    title: '33 Guides',
    desc: 'Clear explanations of the financial concepts that matter most.',
    cta: 'Read',
    href: '/guides',
  },
  {
    icon: Scale,
    title: '8 Top Picks',
    desc: 'Credit cards, loans, savings, insurance, investments, tax software -- side by side.',
    cta: 'See picks',
    href: '/compare',
  },
];

const popularTools = [
  {
    title: 'Mortgage Payment Calculator',
    desc: 'Monthly payment + amortization',
    href: '/calculators/mortgage-payment',
  },
  {
    title: 'Budget Calculator',
    desc: '50/30/20 rule breakdown',
    href: '/calculators/budget',
  },
  {
    title: 'Compound Interest Guide',
    desc: 'Why starting early matters',
    href: '/guides/compound-interest',
  },
  {
    title: 'Credit Card Comparison',
    desc: 'Rewards, fees, and rates',
    href: '/compare/credit-cards',
  },
  {
    title: 'Rent vs. Buy Calculator',
    desc: 'Total cost comparison over time',
    href: '/calculators/rent-vs-buy',
  },
  {
    title: 'Student Loan Guide',
    desc: 'Repayment plan options explained',
    href: '/guides/student-loan',
  },
];

const trustSignals = [
  { icon: Shield, text: 'Independent research' },
  { icon: CheckCircle, text: 'Clear methodology' },
  { icon: Heart, text: 'Educational, not financial advice' },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_380px]">
            {/* Left column */}
            <div>
              <h1 className="text-2xl font-semibold leading-[1.15] text-foreground md:text-[28px] lg:text-4xl">
                Your next financial milestone starts here
              </h1>
              <p className="mt-4 text-sm text-muted-foreground">
                Free calculators, expert guides, and top picks for every stage
                -- from first paycheck to retirement.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  nativeButton={false}
                  render={<Link href="/hubs" />}
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  Find your starting point
                </Button>
                <Button
                  nativeButton={false}
                  variant="outline"
                  render={<Link href="/calculators" />}
                >
                  Browse all tools
                </Button>
              </div>
            </div>

            {/* Right column */}
            <CalculatorCarousel />
          </div>
        </div>
      </section>

      {/* Section Cards */}
      <section className="py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {sectionCards.map((card) => (
              <Link key={card.href} href={card.href}>
                <Card className="flex h-full flex-col transition-shadow hover:ring-accent/50">
                  <CardContent className="flex h-full flex-col gap-3">
                    <div className="flex size-9 items-center justify-center rounded-full bg-accent/[0.08]">
                      <card.icon className="size-[18px] text-accent" />
                    </div>
                    <h3 className="text-[0.9375rem] font-semibold">
                      {card.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">{card.desc}</p>
                    <span className="mt-auto flex items-center gap-1 text-sm font-medium text-accent">
                      {card.cta}
                      <ArrowRight className="size-4" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Tools */}
      <section className="bg-muted py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold text-foreground">
            Popular tools
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {popularTools.map((tool, i) => (
              <Link key={tool.href} href={tool.href}>
                <Card className="h-full transition-shadow hover:ring-accent/50">
                  <CardContent className="flex items-center gap-3">
                    <span className="w-8 shrink-0 text-xl font-extrabold text-accent/15">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold">{tool.title}</h3>
                      <p className="text-xs text-muted-foreground">
                        {tool.desc}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8">
            {trustSignals.map((signal) => (
              <div
                key={signal.text}
                className="flex items-center gap-2 text-[0.8125rem] text-muted-foreground"
              >
                <signal.icon className="size-4 text-accent" />
                {signal.text}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
