'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Shield, BarChart3, Clock, HeadphonesIcon } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_HERO = {
  title: 'Transform Your Financial Operations with Smart Technology',
  subtitle:
    'Streamline payments, automate accounting, and scale your business with our comprehensive fintech platform trusted by over 10,000 companies worldwide.',
  primaryCtaText: 'Start Free Trial',
  primaryCtaHref: '/signup',
  secondaryCtaText: 'Watch Demo',
  secondaryCtaHref: '/demo',
  trustBadge: 'Trusted by 10,000+ companies',
  heroImageUrl:
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
  heroImageAlt: 'Financial dashboard showing analytics and charts',
  features: [
    {
      icon: 'Clock',
      title: 'Instant payments & transfers',
      description: 'Process transactions in real-time',
    },
    {
      icon: 'BarChart3',
      title: 'Real-time analytics dashboard',
      description: 'Monitor your financial metrics live',
    },
    {
      icon: 'Shield',
      title: 'Bank-level security & compliance',
      description: 'Enterprise-grade protection',
    },
    {
      icon: 'HeadphonesIcon',
      title: '24/7 customer support',
      description: 'Always here when you need us',
    },
  ],
} as const;

type HeroProps = Partial<typeof DEFAULT_HERO>;

export default function Hero(props: HeroProps) {
  const config = { ...DEFAULT_HERO, ...props };
  const navigate = useSmartNavigation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handlePrimaryClick = () => {
    navigate(config.primaryCtaHref);
  };

  const handleSecondaryClick = () => {
    navigate(config.secondaryCtaHref);
  };

  const getIcon = (iconName: string) => {
    const icons = {
      Clock: Clock,
      BarChart3: BarChart3,
      Shield: Shield,
      HeadphonesIcon: HeadphonesIcon,
    };
    const IconComponent = icons[iconName as keyof typeof icons] || Clock;
    return <IconComponent className="h-6 w-6" />;
  };

  return (
    <section id="hero" className="bg-background text-foreground py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Content Column */}
          <div
            className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            {/* Trust Badge */}
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
            >
              <span data-editable="trustBadge">{config.trustBadge}</span>
            </Badge>

            {/* Headlines */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                <span data-editable="title">{config.title}</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                <span data-editable="subtitle">{config.subtitle}</span>
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={handlePrimaryClick}
                data-editable-href="primaryCtaHref"
                data-href={config.primaryCtaHref}
                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 group"
              >
                <span data-editable="primaryCtaText">{config.primaryCtaText}</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleSecondaryClick}
                data-editable-href="secondaryCtaHref"
                data-href={config.secondaryCtaHref}
                className="border-border hover:bg-accent hover:text-accent-foreground transition-all duration-200"
              >
                <span data-editable="secondaryCtaText">{config.secondaryCtaText}</span>
              </Button>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8">
              {config.features.map((feature, idx) => (
                <Card
                  key={idx}
                  className="bg-card border-border hover:shadow-lg transition-all duration-300 group"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 text-primary p-3 rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                        {getIcon(feature.icon)}
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-semibold text-card-foreground">
                          <span data-editable={`features[${idx}].title`}>{feature.title}</span>
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          <span data-editable={`features[${idx}].description`}>
                            {feature.description}
                          </span>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Image Column */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-card">
              <Image
                src={config.heroImageUrl}
                alt={config.heroImageAlt}
                data-editable-src="heroImageUrl"
                width={800}
                height={600}
                className="w-full h-auto object-cover"
                priority
              />
              {/* Overlay gradient for better text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
            </div>

            {/* Floating elements for visual interest */}
            <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground p-4 rounded-xl shadow-lg animate-bounce">
              <BarChart3 className="h-8 w-8" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-accent text-accent-foreground p-4 rounded-xl shadow-lg animate-pulse">
              <Shield className="h-8 w-8" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
