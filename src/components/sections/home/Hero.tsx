'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, TrendingUp, Shield, Zap, Users, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_HERO = {
  eyebrow: 'Trusted by 1,000+ Financial Institutions Worldwide',
  title: 'Next-Generation Financial Intelligence Platform',
  subtitle:
    'Revolutionize your financial operations with AI-powered automation, advanced analytics, and enterprise-grade security. Reduce operational costs by up to 45% while ensuring complete regulatory compliance across all markets.',
  primaryCtaText: 'Start Free Trial',
  primaryCtaHref: '/free-trial',
  secondaryCtaText: 'Schedule Demo',
  secondaryCtaHref: '/demo',
  heroImageUrl:
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2426&q=80',
  heroImageAlt: 'Advanced financial analytics dashboard with real-time market data and AI insights',
  trustLogos: [
    {
      name: 'JPMorgan Chase',
      url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=120&h=60&fit=crop',
    },
    {
      name: 'Goldman Sachs',
      url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=120&h=60&fit=crop',
    },
    {
      name: 'BlackRock',
      url: 'https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=120&h=60&fit=crop',
    },
  ],
  keyMetrics: [
    { value: '99.9%', label: 'Uptime Guarantee', icon: 'Shield' },
    { value: '45%', label: 'Cost Savings', icon: 'TrendingUp' },
    { value: '1,000+', label: 'Global Clients', icon: 'Users' },
  ],
  benefits: [
    'Automated compliance reporting across 50+ jurisdictions',
    'Real-time fraud detection and risk monitoring',
    'AI-powered portfolio optimization and forecasting',
  ],
} as const;

type HeroProps = Partial<typeof DEFAULT_HERO>;

export default function Hero(props: HeroProps) {
  const config = { ...DEFAULT_HERO, ...props };
  const navigate = useSmartNavigation();
  const [isVisible, setIsVisible] = useState(false);
  const [activeMetric, setActiveMetric] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveMetric(prev => (prev + 1) % config.keyMetrics.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [config.keyMetrics.length]);

  const handlePrimaryClick = () => {
    navigate(config.primaryCtaHref);
  };

  const handleSecondaryClick = () => {
    navigate(config.secondaryCtaHref);
  };

  const getIcon = (iconName: string) => {
    const icons = { Shield, Zap, Users, TrendingUp };
    const IconComponent = icons[iconName as keyof typeof icons] || TrendingUp;
    return <IconComponent className="h-5 w-5" />;
  };

  return (
    <section id="hero" className="bg-background text-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="py-20 lg:py-32">
          {/* Trust Badge */}
          <div
            className={`text-center mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary border-primary/20 px-4 py-2"
            >
              <span data-editable="eyebrow">{config.eyebrow}</span>
            </Badge>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Content */}
            <div
              className={`space-y-8 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                  <span data-editable="title">{config.title}</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                  <span data-editable="subtitle">{config.subtitle}</span>
                </p>
              </div>

              {/* Benefits List */}
              <div className="space-y-3">
                {config.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground" data-editable={`benefits[${idx}]`}>
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="lg"
                  onClick={handlePrimaryClick}
                  data-editable-href="primaryCtaHref"
                  data-href={config.primaryCtaHref}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 group shadow-lg hover:shadow-xl"
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
                  className="border-border hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                >
                  <span data-editable="secondaryCtaText">{config.secondaryCtaText}</span>
                </Button>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                {config.keyMetrics.map((metric, idx) => (
                  <Card
                    key={idx}
                    className={`bg-card border-border transition-all duration-500 ${activeMetric === idx ? 'ring-2 ring-primary shadow-lg scale-105' : 'hover:shadow-md'}`}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="flex justify-center mb-2 text-primary">
                        {getIcon(metric.icon)}
                      </div>
                      <div
                        className="text-2xl font-bold text-card-foreground"
                        data-editable={`keyMetrics[${idx}].value`}
                      >
                        {metric.value}
                      </div>
                      <div
                        className="text-sm text-muted-foreground"
                        data-editable={`keyMetrics[${idx}].label`}
                      >
                        {metric.label}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Right Column - Visual */}
            <div
              className={`relative transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-3xl transform rotate-6" />
                <Card className="relative bg-card border-border shadow-2xl overflow-hidden">
                  <Image
                    src={config.heroImageUrl}
                    alt={config.heroImageAlt}
                    data-editable-src="heroImageUrl"
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
                </Card>
              </div>

              {/* Floating Stats */}
              <div className="absolute -top-6 -right-6 bg-primary text-primary-foreground p-4 rounded-2xl shadow-xl animate-pulse">
                <TrendingUp className="h-8 w-8" />
              </div>
            </div>
          </div>

          {/* Trust Logos */}
          <div
            className={`mt-20 text-center transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <p className="text-sm text-muted-foreground mb-8">Trusted by industry leaders</p>
            <div className="flex justify-center items-center space-x-12 opacity-60">
              {config.trustLogos.map((logo, idx) => (
                <div key={idx} className="grayscale hover:grayscale-0 transition-all duration-300">
                  <Image
                    src={logo.url}
                    alt={logo.name}
                    data-editable-src={`trustLogos[${idx}].url`}
                    width={120}
                    height={60}
                    className="h-8 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
