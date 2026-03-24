'use client';

import Link from 'next/link';
import { mainNavigation } from '@/lib/navigation';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

interface MobileNavProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobileNav({ open, onOpenChange }: MobileNavProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-[280px] sm:w-[320px]">
        <SheetHeader>
          <SheetTitle>
            <Link
              href="/"
              onClick={() => onOpenChange(false)}
              className="text-lg font-semibold text-primary"
            >
              WalletWaypoint
            </Link>
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 px-4">
          {mainNavigation.map((item) => (
            <div key={item.href}>
              {item.disabled ? (
                <span className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground cursor-default">
                  {item.title}
                  <span className="text-xs text-muted-foreground/70">
                    (Coming Soon)
                  </span>
                </span>
              ) : (
                <Link
                  href={item.href}
                  onClick={() => onOpenChange(false)}
                  className="flex items-center rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground"
                >
                  {item.title}
                </Link>
              )}
              {item.children && (
                <div className="ml-4 flex flex-col gap-0.5">
                  {item.children.map((child) => (
                    <div key={child.href}>
                      {child.disabled ? (
                        <span className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm text-muted-foreground/70 cursor-default">
                          {child.title}
                        </span>
                      ) : (
                        <Link
                          href={child.href}
                          onClick={() => onOpenChange(false)}
                          className="flex items-center rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground"
                        >
                          {child.title}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
