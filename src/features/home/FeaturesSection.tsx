// src/features/home/FeaturesSection.tsx
import { LayoutTemplate, Palette, Rocket, Wallet } from "lucide-react";

const FEATURES = [
  {
    id: "01",
    icon: LayoutTemplate,
    title: "Pick a Template",
    description:
      "Choose from beautiful designs made for Nigerian businesses — restaurants, salons, vendors, and more.",
  },
  {
    id: "02",
    icon: Palette,
    title: "Customize Your Brand",
    description:
      "Change colors, upload your logo, and add your story. No design skills required, ever.",
  },
  {
    id: "03",
    icon: Rocket,
    title: "Go Live Instantly",
    description:
      "Hit publish and your site is online on a free quicksite.com.ng subdomain. It's that fast.",
  },
  {
    id: "04",
    icon: Wallet,
    title: "Accept Payments",
    description:
      "Connect Paystack or Flutterwave to start collecting orders directly through your website.",
  },
];

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="py-24 border-t border-border/60 bg-background"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mb-14">
          <div className="inline-flex items-center border border-border px-2.5 py-0.5 text-xs rounded-full mb-4 font-medium bg-muted/50">
            Why QuickSite
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-balance">
            Everything you need to{" "}
            <span className="text-primary">go online fast.</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map(({ id, icon: Icon, title, description }) => (
            <div
              key={id}
              className="group relative rounded-2xl border border-border bg-card p-7 hover:border-primary/40 hover:shadow-lg transition-all duration-300"
            >
              <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary grid place-items-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {description}
              </p>
              <span className="absolute top-5 right-5 text-xs text-muted-foreground/30 font-bold">
                {id}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
