import { ArrowRight, Star, Sparkles, MessageCircle } from "lucide-react";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden pt-12 pb-24 sm:pt-20 sm:pb-32 bg-background text-foreground">
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Content */}
        <div className="space-y-7 animate-fade-up">
          <div className="inline-flex items-center border border-border px-2.5 py-1 rounded-full bg-secondary/10 text-secondary-foreground gap-2 font-medium text-xs">
            <span className="bg-secondary text-white rounded-full px-2 py-0.5 text-[10px] font-bold">
              NEW
            </span>
            <span className="text-foreground/80">
              WhatsApp orders are live 🇳🇬
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] text-balance">
            Launch your business website{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-linear-to-br from-primary to-primary/60 bg-clip-text text-transparent">
                today
              </span>
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 12"
                fill="none"
              >
                <path
                  d="M2 9C50 3 150 3 198 9"
                  stroke="var(--secondary)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            — no coding needed.
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
            QuickSite helps Nigerian small businesses go online in minutes. Pick
            a template, add your details, and start selling.
          </p>

          <div className="flex flex-wrap gap-3">
            <button className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:opacity-90 rounded-full font-semibold h-12 px-7 transition-all shadow-lg shadow-primary/20">
              Start for Free <ArrowRight className="h-4 w-4" />
            </button>
            <button className="inline-flex items-center justify-center gap-2 border-2 border-input bg-background hover:bg-muted rounded-full font-semibold h-12 px-7 transition-colors">
              See Templates
            </button>
          </div>

          <div className="flex items-center gap-6 pt-3">
            <div className="flex -space-x-2">
              {["AO", "TB", "CE", "FN"].map((initials, i) => (
                <div
                  key={i}
                  className="h-9 w-9 rounded-full bg-primary border-2 border-background grid place-items-center text-xs font-bold text-white"
                >
                  {initials}
                </div>
              ))}
            </div>
            <div className="text-sm">
              <div className="flex gap-0.5 text-secondary">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <p className="text-muted-foreground">
                <span className="font-semibold text-foreground">12,400+</span>{" "}
                Nigerian businesses
              </p>
            </div>
          </div>
        </div>

        {/* Right Image/Visuals */}
        <div
          className="relative animate-fade-up"
          style={{ animationDelay: "0.15s" }}
        >
          <div className="absolute -inset-4 bg-primary/10 rounded-[2.5rem] blur-3xl"></div>

          <div className="relative rounded-4xl overflow-hidden shadow-2xl border border-border aspect-4/5">
            <Image
              src="/hero-entrepreneur.jpg"
              alt="Nigerian entrepreneur"
              fill
              className="object-cover"
            />
          </div>

          <div className="absolute -left-4 sm:-left-8 top-12 bg-card rounded-2xl shadow-xl border border-border p-3 flex items-center gap-3 animate-float">
            <div className="h-10 w-10 rounded-xl bg-secondary/20 grid place-items-center">
              <Sparkles className="h-5 w-5 text-secondary" />
            </div>
            <div>
              <p className="text-xs font-semibold">Site published!</p>
              <p className="text-[10px] text-muted-foreground">
                amakachef.quicksite.com.ng
              </p>
            </div>
          </div>

          <div
            className="absolute -right-2 sm:-right-6 bottom-16 bg-card rounded-2xl shadow-xl border border-border p-3 flex items-center gap-3 animate-float"
            style={{ animationDelay: "1.2s" }}
          >
            <div className="h-10 w-10 rounded-xl bg-primary/20 grid place-items-center">
              <MessageCircle className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs font-semibold">+₦18,500 today</p>
              <p className="text-[10px] text-muted-foreground">
                3 new WhatsApp orders
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
