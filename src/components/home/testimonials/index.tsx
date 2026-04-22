import React from "react";
import { Star } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      initials: "AO",
      name: "Amaka Okafor",
      business: "Amaka's Kitchen — Lagos",
      quote:
        "I built my restaurant site in 20 minutes during lunch break. Orders started coming in the same day!",
    },
    {
      initials: "TB",
      name: "Tunde Bakare",
      business: "TB Cuts Barbershop — Ibadan",
      quote:
        "My customers can now book appointments online. QuickSite changed how I run my business completely.",
    },
    {
      initials: "CE",
      name: "Chiamaka Eze",
      business: "ChiChi Fashion House — Abuja",
      quote:
        "I'm not a tech person at all, but this was so easy. My boutique looks like a million-naira brand now.",
    },
  ];

  return (
    <section className="py-24 border-t border-border/60 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <div className="inline-flex items-center border border-border px-2.5 py-0.5 text-xs rounded-full mb-4 font-medium text-foreground bg-muted/50">
            Loved across Nigeria
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-balance">
            Real businesses. <span className="text-primary">Real results.</span>
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="rounded-2xl bg-card border border-border p-7 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Stars */}
                <div className="flex gap-0.5 text-secondary mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <p className="font-display text-lg leading-relaxed mb-6 text-balance text-card-foreground">
                  &quot;{t.quote}&quot;
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3 pt-5 border-t border-border">
                <div className="h-11 w-11 rounded-full bg-primary grid place-items-center text-sm font-bold text-primary-foreground shrink-0 shadow-sm">
                  {t.initials}
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">
                    {t.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{t.business}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
