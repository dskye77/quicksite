import React from "react";
import { ArrowRight } from "lucide-react";

const CTASection: React.FC = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="rounded-3xl border border-border bg-card p-10 sm:p-16 text-center relative overflow-hidden">
          {/* Mesh Background Overlay */}
          <div className="absolute inset-0 bg-mesh opacity-40 pointer-events-none" />

          <div className="relative z-10">
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-balance">
              Your business deserves to be online.
            </h2>

            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              Join 12,400+ Nigerian businesses growing with QuickSite. Free
              forever — no card needed.
            </p>

            <a href="/dashboard" className="inline-block">
              <button className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full font-semibold h-12 px-8 shadow-lg transition-all duration-300 hover:scale-105">
                Get Started Free
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
