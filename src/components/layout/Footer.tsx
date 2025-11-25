'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_FOOTER = {
  companyName: 'FinTech Pro',
  tagline: 'Empowering your financial future with cutting-edge technology solutions',
  copyright: '© 2024 FinTech Pro. All rights reserved.',

  // Company Links
  companyLinks: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
  ],

  // Legal Links
  legalLinks: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Security', href: '/security' },
  ],

  // Social Links
  socialLinks: [
    { platform: 'LinkedIn', href: 'https://linkedin.com/company/fintechpro' },
    { platform: 'Twitter', href: 'https://twitter.com/fintechpro' },
  ],

  // Contact Info
  contactEmail: 'contact@fintechpro.com',
  contactPhone: '+1 (555) 123-4567',
  address: '123 Financial District, New York, NY 10004',
} as const;

type FooterProps = Partial<typeof DEFAULT_FOOTER>;

export default function Footer(props: FooterProps) {
  const config = { ...DEFAULT_FOOTER, ...props };
  const navigate = useSmartNavigation();

  const handleNavigation = (href: string) => {
    if (href.startsWith('http')) {
      window.open(href, '_blank', 'noopener,noreferrer');
    } else {
      navigate(href);
    }
  };

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'linkedin':
        return <Linkedin className="h-5 w-5" />;
      case 'twitter':
        return <Twitter className="h-5 w-5" />;
      case 'facebook':
        return <Facebook className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <footer id="footer" className="bg-card text-card-foreground border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid gap-8 lg:grid-cols-4 md:grid-cols-2">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-primary mb-3">
              <span data-editable="companyName">{config.companyName}</span>
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              <span data-editable="tagline">{config.tagline}</span>
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <span data-editable="contactEmail">{config.contactEmail}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <span data-editable="contactPhone">{config.contactPhone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span data-editable="address">{config.address}</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <nav className="space-y-3">
              {config.companyLinks.map((link, idx) => (
                <Button
                  key={idx}
                  variant="ghost"
                  className="h-auto p-0 text-muted-foreground hover:text-primary justify-start"
                  onClick={() => handleNavigation(link.href)}
                  data-editable-href={`companyLinks[${idx}].href`}
                  data-href={link.href}
                >
                  <span data-editable={`companyLinks[${idx}].label`}>{link.label}</span>
                </Button>
              ))}
            </nav>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <nav className="space-y-3">
              {config.legalLinks.map((link, idx) => (
                <Button
                  key={idx}
                  variant="ghost"
                  className="h-auto p-0 text-muted-foreground hover:text-primary justify-start"
                  onClick={() => handleNavigation(link.href)}
                  data-editable-href={`legalLinks[${idx}].href`}
                  data-href={link.href}
                >
                  <span data-editable={`legalLinks[${idx}].label`}>{link.label}</span>
                </Button>
              ))}
            </nav>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            <span data-editable="copyright">{config.copyright}</span>
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground mr-2">Follow us:</span>
            {config.socialLinks.map((social, idx) => (
              <Button
                key={idx}
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0 text-muted-foreground hover:text-primary hover:bg-accent"
                onClick={() => handleNavigation(social.href)}
                data-editable-href={`socialLinks[${idx}].href`}
                data-href={social.href}
                aria-label={`Follow us on ${social.platform}`}
              >
                {getSocialIcon(social.platform)}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
