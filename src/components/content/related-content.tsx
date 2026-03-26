import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';

interface RelatedGuide {
  slug: string;
  title: string;
  description: string;
  metadata: { readingTime: number };
}

interface RelatedContentProps {
  guides: RelatedGuide[];
}

export function RelatedContent({ guides }: RelatedContentProps) {
  if (guides.length === 0) return null;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Related Guides</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {guides.map((guide) => (
          <Link key={guide.slug} href={`/guides/${guide.slug}`} className="block">
            <Card className="h-full hover:border-accent/50 transition-colors">
              <CardHeader>
                <CardTitle className="text-base">{guide.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {guide.description}
                </CardDescription>
              </CardHeader>
              <div className="px-4 pb-4">
                <Badge variant="secondary">
                  <Clock className="size-3" data-icon="inline-start" />
                  {guide.metadata.readingTime} min read
                </Badge>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
