import React from "react";
import { LayoutTemplate, Palette, Rocket, Wallet } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      id: "01",
      title: "Pick a Template",
      description:
        "Choose from beautiful designs made for Nigerian businesses — restaurants, salons, vendors, and more.",
      icon: <LayoutTemplate className="h-6 w-6" />,
    },
    {
      id: "02",
      title: "Customize Your Brand",
      description:
        "Change colors, upload your logo, and add your story. No design skills required, ever.",
      icon: <Palette className="h-6 w-6" />,
    },
    {
      id: "03",
      title: "Go Live Instantly",
      description:
        "Hit publish and your site is online on a free quicksite.com.ng subdomain. It's that fast.",
      icon: <Rocket className="h-6 w-6" />,
    },
    {
      id: "04",
      title: "Accept Payments",
      description:
        "Connect Paystack or Flutterwave to start collecting orders directly through your website.",
      icon: <Wallet className="h-6 w-6" />,
    },
  ];

  return (
    <section
      id="features"
      className="py-24 border-t border-border/60 bg-background"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <div className="inline-flex items-center border border-border px-2.5 py-0.5 text-xs rounded-full mb-4 font-medium text-foreground bg-muted/50">
            Why QuickSite
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-balance">
            Everything you need to{" "}
            <span className="text-primary">go online fast.</span>
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="group relative rounded-2xl border border-border bg-card p-7 hover:border-primary/40 hover:shadow-lg transition-all duration-300"
            >
              {/* Icon Container */}
              <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary grid place-items-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                {feature.icon}
              </div>

              {/* Text Content */}
              <h3 className="font-display font-bold text-lg mb-2 text-card-foreground">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>

              {/* Decorative Number */}
              <span className="absolute top-5 right-5 text-xs text-muted-foreground/40 font-display font-bold">
                {feature.id}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
