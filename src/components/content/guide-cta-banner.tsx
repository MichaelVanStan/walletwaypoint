import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator } from 'lucide-react';

interface GuideCtaBannerProps {
  calculatorSlug: string;
  calculatorTitle: string;
}

export function GuideCtaBanner({
  calculatorSlug,
  calculatorTitle,
}: GuideCtaBannerProps) {
  return (
    <aside aria-label="Try the calculator">
      <Card>
        <CardContent className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Calculator className="size-4 text-accent" />
            <p className="text-sm font-semibold">Try the Calculator</p>
          </div>
          <p className="text-sm text-muted-foreground">
            See how the math works with your own numbers.
          </p>
          <Button
            nativeButton={false}
            size="sm"
            render={<Link href={`/calculators/${calculatorSlug}`} />}
          >
            Open {calculatorTitle}
          </Button>
        </CardContent>
      </Card>
    </aside>
  );
}
