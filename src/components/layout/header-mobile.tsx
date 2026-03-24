'use client';

import { useState } from 'react';
import { MenuIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MobileNav } from './mobile-nav';

export function HeaderMobile() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(true)}
        aria-label="Open navigation menu"
        className="min-h-[44px] min-w-[44px]"
      >
        <MenuIcon className="size-5" />
      </Button>
      <MobileNav open={open} onOpenChange={setOpen} />
    </div>
  );
}
