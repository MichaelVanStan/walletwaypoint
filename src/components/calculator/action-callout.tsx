"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface ActionCalloutProps {
  title: string;
  href: string;
  icon?: string;
}

function getIcon(iconName?: string): LucideIcon {
  if (!iconName) return ArrowRight;
  const Icon = (LucideIcons as unknown as Record<string, LucideIcon>)[iconName];
  return Icon || ArrowRight;
}

export function ActionCallout({ title, href, icon }: ActionCalloutProps) {
  const Icon = getIcon(icon);

  return (
    <Link href={href} className="block">
      <Card className="p-4 hover:border-accent/50 transition-colors cursor-pointer">
        <CardContent className="flex items-center gap-3 p-0">
          <Icon className="size-5 shrink-0 text-accent" />
          <span className="text-sm font-semibold text-foreground">
            {title}
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}
