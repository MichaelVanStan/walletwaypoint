'use client';

import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ArrowRight } from 'lucide-react';

function getIcon(iconName?: string): LucideIcon {
  if (!iconName) return ArrowRight;
  const Icon = (LucideIcons as unknown as Record<string, LucideIcon>)[iconName];
  return Icon || ArrowRight;
}

interface HubIconProps {
  icon: string;
  className?: string;
}

export function HubIcon({ icon, className }: HubIconProps) {
  const Icon = getIcon(icon);
  return <Icon className={className} aria-hidden="true" />;
}
