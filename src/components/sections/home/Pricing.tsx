'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star } from 'lucide-react';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_PRICING = {
  title: 'Investment Solutions for Every Goal',
  subtitle:
    'Professional-grade financial services with transparent pricing and institutional-level security',
  billingToggle: true,
  plans: [
    {
      name: 'Essential',
      description: 'Core investment tools for individual investors',
      monthlyPrice: 49,
      yearlyPrice: 490,
      popular: false,
      features: [
        'Portfolio management up to $100K',
        'Real-time market data & analytics',
        'Tax-loss harvesting',
        'Standard customer support',
        'Mobile & web platform access',
      ],
      ctaText: 'Start 14-Day Trial',
      ctaHref: '/signup/essential',
    },
    {
      name: 'Growth',
      description: 'Advanced strategies for serious wealth building',
      monthlyPrice: 149,
      yearlyPrice: 1490,
      popular: true,
      features: [
        'Portfolio management up to $1M',
        'Advanced algorithmic trading',
        'Dedicated relationship manager',
        'Alternative investment access',
        'Custom portfolio rebalancing',
        'Priority execution & support',
      ],
      ctaText: 'Start 14-Day Trial',
      ctaHref: '/signup/growth',
    },
    {
      name: 'Institutional',
      description: 'Enterprise-grade solutions for wealth management',
      monthlyPrice: 499,
      yearlyPrice: 4990,
      popular: false,
      features: [
        'Unlimited portfolio management',
        'White-label platform options',
        'Institutional-grade custody',
        'Custom API integrations',
        'Regulatory compliance suite',
        'Dedicated institutional support',
      ],
      ctaText: 'Schedule Consultation',
      ctaHref: '/contact/institutional',
    },
  ],
  guarantee: 'SEC-regulated with SIPC protection up to $500,000',
  additionalInfo: 'All plans include bank-level encryption and institutional custody services',
} as const;

type PricingProps = Partial<typeof DEFAULT_PRICING>;

export default function Pricing(props: PricingProps) {
  const config = { ...DEFAULT_PRICING, ...props };
  const navigate = useSmartNavigation();
  const [isYearly, setIsYearly] = useState(true);

  const handlePlanSelect = (href: string) => {
    navigate(href);
  };

  const toggleBilling = () => {
    setIsYearly(!isYearly);
  };

  return (
    <section id="pricing" className="bg-background text-foreground py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span data-editable="title">{config.title}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>

          {/* Billing Toggle */}
          {config.billingToggle && (
            <div className="flex items-center justify-center gap-4 mb-8">
              <span
                className={`text-sm ${!isYearly ? 'text-foreground' : 'text-muted-foreground'}`}
              >
                Monthly
              </span>
              <button
                onClick={toggleBilling}
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                role="switch"
                aria-checked={isYearly}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-primary transition-transform ${
                    isYearly ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-sm ${isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
                Yearly
                <Badge variant="secondary" className="ml-2 text-xs">
                  Save 17%
                </Badge>
              </span>
            </div>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 lg:grid-cols-3 max-w-7xl mx-auto">
          {config.plans.map((plan, idx) => (
            <Card
              key={idx}
              className={`relative bg-card text-card-foreground border-border transition-all duration-300 hover:shadow-lg ${
                plan.popular ? 'border-primary shadow-lg scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-8">
                <h3 className="text-xl font-semibold mb-2">
                  <span data-editable={`plans[${idx}].name`}>{plan.name}</span>
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  <span data-editable={`plans[${idx}].description`}>{plan.description}</span>
                </p>
                <div className="mb-4">
                  <span className="text-4xl font-bold">
                    ${isYearly ? Math.floor(plan.yearlyPrice / 12) : plan.monthlyPrice}
                  </span>
                  <span className="text-muted-foreground">/month</span>
                  {isYearly && (
                    <div className="text-sm text-muted-foreground mt-1">
                      Billed annually (${plan.yearlyPrice})
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">
                        <span data-editable={`plans[${idx}].features[${featureIdx}]`}>
                          {feature}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handlePlanSelect(plan.ctaHref)}
                  className={`w-full ${
                    plan.popular
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                  data-editable-href={`plans[${idx}].ctaHref`}
                  data-href={plan.ctaHref}
                >
                  <span data-editable={`plans[${idx}].ctaText`}>{plan.ctaText}</span>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer Info */}
        <div className="text-center mt-16 space-y-4">
          <p className="text-sm text-muted-foreground">
            <span data-editable="guarantee">{config.guarantee}</span>
          </p>
          <p className="text-sm text-muted-foreground">
            <span data-editable="additionalInfo">{config.additionalInfo}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
