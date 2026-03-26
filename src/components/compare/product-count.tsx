interface ProductCountProps {
  count: number;
  total: number;
}

export function ProductCount({ count, total }: ProductCountProps) {
  if (count < total) {
    return (
      <p className="text-sm text-muted-foreground">
        Showing {count} of {total} products
      </p>
    );
  }

  return (
    <p className="text-sm text-muted-foreground">
      Showing {total} products
    </p>
  );
}
