import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface BestForBadgeProps {
  label: string;
}

export function BestForBadge({ label }: BestForBadgeProps) {
  return (
    <Badge variant="default" className="gap-1">
      <Star className="h-3 w-3" aria-hidden="true" />
      Our Pick: {label}
    </Badge>
  );
}
