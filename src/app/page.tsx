import Link from 'next/link';
import { Shield, BookOpen, Scale } from 'lucide-react';
import { createMetadata } from '@/lib/metadata';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const metadata = createMetadata({
  title: 'WalletWaypoint - Your next financial milestone starts here',
  description:
    'Interactive calculators, comparison tools, and educational guides for every life stage.',
  path: '/',
});

const placeholderCards = [
  {
    title: 'Calculators',
    description:
      'Interactive tools to help you plan mortgages, savings, loans, and more.',
  },
  {
    title: 'Guides',
    description:
      'Clear, jargon-free explanations of the financial topics that matter most.',
  },
  {
    title: 'Life Stage Hubs',
    description:
      'Financial tools and guides organized by where you are in life.',
  },
  {
    title: 'Comparisons',
    description:
      'Side-by-side comparisons of credit cards, loans, and financial products.',
  },
];

const trustSignals = [
  {
    icon: Shield,
    text: 'Independent research -- no sponsored rankings',
  },
  {
    icon: BookOpen,
    text: 'Clear methodology -- see how we create content',
  },
  {
    icon: Scale,
    text: 'No financial advice -- educational tools you can trust',
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-16 md:py-24 lg:py-32">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold leading-[1.15] text-foreground md:text-[28px] lg:text-4xl">
            Navigate money with confidence
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-[1.6] text-muted-foreground">
            Free calculators, expert guides, and comparison tools for every
            financial milestone -- from your first paycheck to retirement.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              render={<Link href="/calculators" />}
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              Explore Calculators
            </Button>
            <Button variant="outline" render={<Link href="/guides" />}>
              Read Our Guides
            </Button>
          </div>
        </div>
      </section>

      {/* Placeholder Cards Section */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
            {placeholderCards.map((card) => (
              <Card key={card.title} className="bg-muted">
                <CardContent className="space-y-2">
                  <Badge variant="secondary">Coming Soon</Badge>
                  <p className="font-semibold text-foreground">{card.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {card.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Signals Section */}
      <section className="bg-secondary py-12 md:py-16">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-8 text-xl font-semibold text-foreground">
            Built on transparency
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {trustSignals.map((signal) => (
              <Card key={signal.text} className="bg-background">
                <CardContent className="flex flex-col items-center gap-3">
                  <signal.icon className="h-6 w-6 text-muted-foreground" />
                  <p className="text-sm font-medium text-foreground">
                    {signal.text}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
