interface HubSectionProps {
  title: string;
  intro: string;
  children: React.ReactNode;
}

export function HubSection({ title, intro, children }: HubSectionProps) {
  return (
    <section className="py-12" aria-label={title}>
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      <p className="mt-1 mb-6 text-sm text-muted-foreground">{intro}</p>
      {children}
    </section>
  );
}
