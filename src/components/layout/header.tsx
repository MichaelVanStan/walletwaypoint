import Link from 'next/link';
import { mainNavigation } from '@/lib/navigation';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from '@/components/ui/navigation-menu';
import { HeaderMobile } from './header-mobile';
import { StateIndicator } from '@/components/calculator/state-indicator';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/60">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:bg-background focus:px-4 focus:py-2 focus:text-foreground"
      >
        Skip to main content
      </a>
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 md:h-16 md:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="text-lg font-semibold text-primary"
        >
          WalletWaypoint
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex" aria-label="Main navigation">
          <NavigationMenu>
            <NavigationMenuList>
              {mainNavigation.map((item) => (
                <NavigationMenuItem key={item.href}>
                  {item.children && item.children.length > 0 ? (
                    <>
                      <NavigationMenuTrigger
                        className={
                          item.disabled
                            ? 'cursor-default text-muted-foreground hover:bg-transparent'
                            : 'text-muted-foreground transition-colors duration-150 hover:text-foreground'
                        }
                        disabled={item.disabled}
                      >
                        {item.title}
                        {item.disabled && (
                          <span className="ml-1 text-xs text-muted-foreground/70">
                            (Coming Soon)
                          </span>
                        )}
                      </NavigationMenuTrigger>
                      {!item.disabled && (
                        <NavigationMenuContent>
                          <ul className={`grid gap-1 p-2 ${item.children && item.children.length > 5 ? 'w-[560px] grid-cols-2' : 'w-[400px]'}`}>
                            {item.children.map((child) => (
                              <li key={child.href}>
                                <NavigationMenuLink
                                  href={child.href}
                                  render={<Link href={child.href} />}
                                  className={
                                    child.disabled
                                      ? 'cursor-default opacity-50'
                                      : ''
                                  }
                                >
                                  <div>
                                    <div className="text-sm font-medium">
                                      {child.title}
                                    </div>
                                    {child.description && (
                                      <p className="text-xs text-muted-foreground leading-snug">
                                        {child.description}
                                      </p>
                                    )}
                                  </div>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      )}
                    </>
                  ) : (
                    <>
                      {item.disabled ? (
                        <span className="inline-flex h-9 items-center px-2.5 py-1.5 text-sm font-medium text-muted-foreground cursor-default">
                          {item.title}
                          <span className="ml-1 text-xs text-muted-foreground/70">
                            (Coming Soon)
                          </span>
                        </span>
                      ) : (
                        <NavigationMenuLink
                          href={item.href}
                          render={<Link href={item.href} />}
                          className="text-muted-foreground transition-colors duration-150 hover:text-foreground"
                        >
                          {item.title}
                        </NavigationMenuLink>
                      )}
                    </>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* State Indicator + Mobile Hamburger */}
        <div className="flex items-center gap-2">
          <StateIndicator />
          <HeaderMobile />
        </div>
      </div>
    </header>
  );
}
