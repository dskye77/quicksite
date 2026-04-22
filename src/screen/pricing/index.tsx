"use client";

import React, { useState } from "react";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

interface PricingPlan {
  name: string;
  price: number;
  description: string;
  features: string[];
  buttonText: string;
  isPopular?: boolean;
}

const plans: PricingPlan[] = [
  {
    name: "Free",
    price: 0,
    description: "Start building your mini-site",
    features: [
      "1 mini-site",
      "Quicksite subdomain",
      "Basic templates",
      "Up to 5 sections",
      "Quicksite branding",
    ],
    buttonText: "Get Started",
  },
  {
    name: "Basic",
    price: 1500,
    description: "Perfect for small businesses",
    isPopular: true,
    features: [
      "Remove Quicksite branding",
      "Up to 10 sections",
      "Better templates",
      "Social links (WhatsApp, Instagram, TikTok)",
      "Basic customization",
    ],
    buttonText: "Upgrade Now",
  },
  {
    name: "Growth",
    price: 3000,
    description: "Grow your online presence",
    features: [
      "Unlimited sections",
      "Image gallery / product showcase",
      "Contact form",
      "Basic analytics",
      "Everything in Basic",
    ],
    buttonText: "Go Growth",
  },
  {
    name: "Pro",
    price: 6000,
    description: "For serious businesses",
    features: [
      "Accept payments (Paystack / Flutterwave)",
      "Sell products online",
      "Advanced customization",
      "Priority performance",
      "Everything in Growth",
    ],
    buttonText: "Go Pro",
  },
];

export default function PricingPage() {
  const [billing] = useState("monthly");

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <section className="text-center py-20 px-4">
        <div className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full border mb-4">
          <Sparkles className="w-3 h-3" /> Simple Pricing
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Build your website in minutes
        </h1>

        <p className="text-muted-foreground max-w-xl mx-auto">
          Choose a plan that fits your business. Upgrade anytime as you grow.
        </p>
      </section>

      {/* Pricing Grid */}
      <section className="px-4 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border p-6 flex flex-col transition hover:-translate-y-1 hover:shadow-xl $
                plan.isPopular ? "border-primary shadow-lg" : "border-border"
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}

              <h3 className="text-lg font-semibold">{plan.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {plan.description}
              </p>

              <div className="mb-6">
                <span className="text-3xl font-bold">
                  ₦{plan.price.toLocaleString()}
                </span>
                <span className="text-sm text-muted-foreground"> /mo</span>
              </div>

              <ul className="space-y-3 mb-6 flex-1">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link href="/signup">
                <button
                  className={`w-full py-2 rounded-full text-sm font-semibold transition $
                    plan.isPopular
                      ? "bg-primary text-white hover:opacity-90"
                      : "border border-border hover:bg-accent"
                  }`}
                >
                  {plan.buttonText}
                </button>
              </Link>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            Back to home <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
