'use client';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_NAVIGATION = {
  logo: 'FinanceFlow',
  logoHref: '/',
  navItems: [
    { label: 'Home', href: '#hero' },
    { label: 'Pricing', href: '#pricing' },
  ],
  ctaText: 'Start Free Trial',
  ctaHref: '#pricing',
  mobileMenuLabel: 'Open navigation menu',
  closeMenuLabel: 'Close navigation menu',
} as const;

type NavigationProps = Partial<typeof DEFAULT_NAVIGATION>;

export default function Navigation(props: NavigationProps) {
  const config = { ...DEFAULT_NAVIGATION, ...props };
  const navigate = useSmartNavigation();
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (href: string) => {
    navigate(href);
    setIsOpen(false);
  };

  const handleLogoClick = () => {
    navigate(config.logoHref);
  };

  const handleCtaClick = () => {
    navigate(config.ctaHref);
  };

  return (
    <section
      id="navigation"
      className="bg-background text-foreground border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-background/95"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={handleLogoClick}
              className="text-xl font-bold text-primary hover:text-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md px-2 py-1"
              data-editable-href="logoHref"
              data-href={config.logoHref}
              aria-label="Go to homepage"
            >
              <span data-editable="logo">{config.logo}</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center space-x-8"
            role="navigation"
            aria-label="Main navigation"
          >
            {config.navItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleNavClick(item.href)}
                className="text-foreground hover:text-primary transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md px-3 py-2"
                data-editable-href={`navItems[${idx}].href`}
                data-href={item.href}
              >
                <span data-editable={`navItems[${idx}].label`}>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex">
            <Button
              onClick={handleCtaClick}
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              data-editable-href="ctaHref"
              data-href={config.ctaHref}
            >
              <span data-editable="ctaText">{config.ctaText}</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground hover:text-primary hover:bg-accent"
                  aria-label={config.mobileMenuLabel}
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-card text-card-foreground w-80">
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="flex items-center justify-between pb-6 border-b border-border">
                    <button
                      onClick={handleLogoClick}
                      className="text-xl font-bold text-primary hover:text-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md px-2 py-1"
                      data-editable-href="logoHref"
                      data-href={config.logoHref}
                    >
                      <span data-editable="logo">{config.logo}</span>
                    </button>
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex-1 py-6" role="navigation" aria-label="Mobile navigation">
                    <div className="space-y-4">
                      {config.navItems.map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleNavClick(item.href)}
                          className="block w-full text-left text-lg font-medium text-card-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md px-3 py-3 hover:bg-accent"
                          data-editable-href={`navItems[${idx}].href`}
                          data-href={item.href}
                        >
                          <span data-editable={`navItems[${idx}].label`}>{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </nav>

                  {/* Mobile CTA */}
                  <div className="pt-6 border-t border-border">
                    <Button
                      onClick={handleCtaClick}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                      data-editable-href="ctaHref"
                      data-href={config.ctaHref}
                    >
                      <span data-editable="ctaText">{config.ctaText}</span>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
}
