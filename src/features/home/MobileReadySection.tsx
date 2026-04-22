// src/features/home/MobileReadySection.tsx
import {
  ArrowRight,
  Smartphone,
  Check,
  MousePointer2,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

export default function MobileReadySection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="rounded-3xl bg-primary p-10 sm:p-14 text-primary-foreground relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 80% 20%, white 0%, transparent 50%)",
            }}
          />

          <div className="relative grid md:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <div className="inline-flex items-center border border-white/20 px-2.5 py-0.5 text-xs font-semibold bg-white/10 rounded-full mb-4">
                Built for mobile
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-balance leading-tight">
                Your customers are on their phones. Your website should be too.
              </h2>
              <p className="text-primary-foreground/80 mb-6 leading-relaxed max-w-md">
                Every QuickSite template looks beautiful on Android, iPhone, and
                tablet — automatically. Edit on the go from your phone.
              </p>
              <Link href="/templates">
                <button className="inline-flex items-center justify-center gap-2 bg-secondary text-secondary-foreground hover:opacity-90 h-11 px-8 rounded-full font-semibold transition-all shadow-lg shadow-black/10">
                  Browse mobile-ready templates
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </button>
              </Link>
            </div>

            {/* Right — visual stack */}
            <div className="relative h-75 sm:h-95 flex items-center justify-center">
              <div className="absolute w-full max-w-[320px] bg-card rounded-2xl shadow-2xl border border-border overflow-hidden transform -rotate-2">
                <div className="h-8 bg-muted/50 border-b flex items-center gap-1.5 px-4">
                  <div className="h-2 w-2 rounded-full bg-destructive/40" />
                  <div className="h-2 w-2 rounded-full bg-secondary/40" />
                  <div className="h-2 w-2 rounded-full bg-primary/40" />
                </div>
                <div className="p-6 space-y-4 bg-background">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Smartphone className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-1.5">
                      <div className="h-2.5 w-24 rounded bg-foreground/10" />
                      <div className="h-2 w-16 rounded bg-foreground/5" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="h-20 rounded-xl bg-muted/50 border border-dashed border-border" />
                    <div className="h-20 rounded-xl bg-muted/50 border border-dashed border-border" />
                  </div>
                  <div className="h-10 w-full rounded-lg bg-primary/80" />
                </div>
              </div>

              {/* Success card */}
              <div className="absolute top-10 right-0 sm:-right-2 w-52 bg-card rounded-xl shadow-2xl border border-primary/20 p-4 transform rotate-6 z-20">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-[11px] font-bold text-foreground">
                      Optimization Complete
                    </p>
                    <p className="text-[10px] text-muted-foreground leading-tight">
                      Your site is 100% responsive for mobile visitors.
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-10 left-1/4 z-30 animate-pulse">
                <MousePointer2 className="h-6 w-6 text-secondary fill-secondary drop-shadow-md" />
              </div>
              <div className="absolute -top-4 left-8 text-white/30 animate-pulse">
                <Sparkles className="h-8 w-8" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
