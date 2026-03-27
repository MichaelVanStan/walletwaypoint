import Link from 'next/link';
import { guides } from '#site/content';
import { createMetadata } from '@/lib/metadata';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, ArrowRight } from 'lucide-react';

export const metadata = createMetadata({
  title: 'Financial Guides',
  description:
    'Clear, jargon-free explanations of the financial topics that matter most. Written like a smart friend who happens to know money.',
  path: '/guides',
});

export default function GuidesPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 sm:px-6 py-12 md:py-16">
      <h1 className="text-2xl font-semibold">Financial Guides</h1>
      <p className="text-base text-muted-foreground mt-3 max-w-[640px]">
        Clear, jargon-free explanations of the financial topics that matter
        most. Written like a smart friend who happens to know money.
      </p>

      {guides.length === 0 ? (
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Guides are on the way. Check back soon.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="block"
            >
              <Card className="h-full hover:border-accent/50 transition-colors">
                <CardHeader className="flex-1">
                  <CardTitle className="line-clamp-2 min-h-[2lh]">{guide.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {guide.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="justify-between">
                  <Badge variant="secondary">
                    <Clock className="size-3" data-icon="inline-start" />
                    {guide.metadata.readingTime} min read
                  </Badge>
                  <span className="inline-flex items-center gap-1 text-sm text-accent">
                    Read this guide
                    <ArrowRight className="size-3.5" />
                  </span>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
