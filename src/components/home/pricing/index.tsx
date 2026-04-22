import React from "react";
import { Check, ArrowRight } from "lucide-react";

// --- Types ---

interface PricingPlan {
  name: string;
  price: string;
  features: string[];
  buttonText: string;
  isPopular: boolean;
}

interface PricingCardProps {
  plan: PricingPlan;
}

// --- Sub-components ---

const PricingHeader: React.FC = () => (
  <div className="text-center max-w-2xl mx-auto mb-14">
    <div className="inline-flex items-center border border-border px-2.5 py-0.5 text-xs rounded-full mb-4 font-medium text-foreground bg-muted/50">
      Simple pricing
    </div>
    <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-balance mb-4">
      Plans that grow with your business.
    </h2>
    <p className="text-muted-foreground">
      Start free. Upgrade anytime. No surprise charges.
    </p>
  </div>
);

const PricingCard: React.FC<PricingCardProps> = ({ plan }) => {
  const { name, price, features, buttonText, isPopular } = plan;

  return (
    <div
      className={`relative rounded-2xl p-6 border transition-all duration-300 flex flex-col ${
        isPopular
          ? "bg-primary text-primary-foreground border-primary shadow-xl scale-[1.05] z-10"
          : "bg-card border-border hover:border-primary/40 text-card-foreground"
      }`}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
          Most popular
        </div>
      )}

      <p
        className={`text-sm font-semibold mb-1 ${
          isPopular ? "text-primary-foreground/80" : "text-muted-foreground"
        }`}
      >
        {name}
      </p>

      <p className="font-display text-3xl font-bold mb-4">
        ₦{price}
        <span
          className={`text-sm font-normal ${
            isPopular ? "text-primary-foreground/70" : "text-muted-foreground"
          }`}
        >
          /mo
        </span>
      </p>

      <ul className="space-y-3 mb-8 text-sm grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <Check
              className={`h-4 w-4 mt-0.5 shrink-0 ${
                isPopular ? "text-accent" : "text-primary"
              }`}
            />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <a className="block mt-auto" href="/pricing">
        <button
          className={`w-full py-2 px-4 rounded-full text-sm font-bold transition-colors ${
            isPopular
              ? "bg-secondary text-secondary-foreground hover:opacity-90"
              : "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
          }`}
        >
          {buttonText}
        </button>
      </a>
    </div>
  );
};

// --- Main Component ---

const PricingSection: React.FC = () => {
  const plans: PricingPlan[] = [
    {
      name: "Free",
      price: "0",
      features: [
        "1 mini-site",
        "Quicksite URL (quicksite.com.ng/sites/username)",
        "Basic templates",
        "Up to 5 sections",
        "Quicksite branding",
      ],
      buttonText: "Start Free",
      isPopular: false,
    },
    {
      name: "Basic",
      price: "1,500",
      features: [
        "Remove Quicksite branding",
        "Up to 10 sections",
        "Better templates",
        "Social links (WhatsApp, Instagram, TikTok)",
        "Basic customization (colors, fonts)",
      ],
      buttonText: "Upgrade to Basic",
      isPopular: true, // 👈 THIS is your money plan
    },
    {
      name: "Growth",
      price: "3,000",
      features: [
        "Unlimited sections",
        "Image gallery / product showcase",
        "Contact form",
        "Basic analytics (views & clicks)",
        "Everything in Basic",
      ],
      buttonText: "Go Growth",
      isPopular: false,
    },
    {
      name: "Pro",
      price: "6,000",
      features: [
        "Accept payments (Paystack / Flutterwave)",
        "Sell simple products",
        "Priority performance",
        "Advanced customization",
        "Everything in Growth",
      ],
      buttonText: "Go Pro",
      isPopular: false,
    },
  ];

  return (
    <section className="py-24 border-t border-border/60 bg-background" id="pricing">
      <div className="container mx-auto px-4">
        <PricingHeader />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <PricingCard key={index} plan={plan} />
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            className="text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1"
            href="/pricing"
          >
            See full pricing details <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
