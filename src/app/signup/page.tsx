"use client";

import { useState } from "react";
import Link from "next/link";
import { Zap, Eye, EyeOff, ArrowRight, Globe, Check } from "lucide-react";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1); // 1 = account, 2 = business info
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    businessName: "",
    category: "",
  });

  const categories = [
    "Restaurant / Food",
    "Fashion / Clothing",
    "Salon / Beauty",
    "Retail / Shop",
    "Freelancer",
    "Other",
  ];

  const update = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel */}
      <div className="hidden lg:flex w-1/2 bg-primary flex-col justify-between p-12 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 80%, white 0%, transparent 50%), radial-gradient(circle at 80% 20%, white 0%, transparent 40%)",
          }}
        />
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-white/5 -mr-16 -mb-16" />

        <Link href="/" className="flex items-center gap-3 relative z-10">
          <div className="h-10 w-10 rounded-xl bg-white/20 grid place-items-center">
            <Zap className="h-5 w-5 text-white fill-white" />
          </div>
          <div>
            <p className="font-bold text-xl text-white">QuickSite</p>
            <p className="text-xs text-white/60">.com.ng</p>
          </div>
        </Link>

        <div className="relative z-10 space-y-5">
          <p className="text-3xl font-bold text-white leading-snug text-balance">
            Your business website, live in 5 minutes.
          </p>
          <ul className="space-y-3">
            {[
              "Free forever plan",
              "No credit card needed",
              "Beautiful mobile-ready templates",
              "Accept payments via Paystack",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 text-white/90 text-sm"
              >
                <div className="h-5 w-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <Check className="h-3 w-3 text-white" />
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative z-10 bg-white/10 rounded-2xl p-5">
          <p className="text-white/80 text-sm italic leading-relaxed">
            &quot;I launched my fashion store in 10 minutes. No developer, no stress.
            QuickSite is a game changer for Nigerian business owners.&quot;
          </p>
          <div className="flex items-center gap-2 mt-4">
            <div className="h-8 w-8 rounded-full bg-white/20 grid place-items-center text-xs font-bold text-white">
              TB
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Tunde Bakare</p>
              <p className="text-[10px] text-white/50">TB Cuts — Ibadan</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12">
        <Link href="/" className="flex items-center gap-2 mb-8 lg:hidden">
          <div className="h-9 w-9 rounded-xl bg-primary grid place-items-center">
            <Zap className="h-5 w-5 text-white fill-white" />
          </div>
          <p className="font-bold text-lg">QuickSite</p>
        </Link>

        <div className="w-full max-w-md">
          {/* Step Indicator */}
          <div className="flex items-center gap-3 mb-8">
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`h-7 w-7 rounded-full text-xs font-bold flex items-center justify-center transition-all ${
                    s < step
                      ? "bg-primary text-white"
                      : s === step
                        ? "bg-primary text-white ring-4 ring-primary/20"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {s < step ? <Check className="h-3.5 w-3.5" /> : s}
                </div>
                <span
                  className={`text-xs font-medium ${
                    s === step ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {s === 1 ? "Your Account" : "Your Business"}
                </span>
                {s < 2 && <div className="w-8 h-px bg-border ml-1" />}
              </div>
            ))}
          </div>

          {step === 1 && (
            <>
              <div className="mb-7">
                <h1 className="text-3xl font-bold mb-1.5">
                  Create your account
                </h1>
                <p className="text-muted-foreground text-sm">
                  Free forever. No credit card required.
                </p>
              </div>

              <button className="w-full flex items-center justify-center gap-3 border border-border rounded-xl h-11 text-sm font-medium hover:bg-muted transition mb-5">
                <Globe className="h-4 w-4" />
                Sign up with Google
              </button>

              <div className="flex items-center gap-3 mb-5">
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted-foreground">or</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Full name
                  </label>
                  <input
                    type="text"
                    placeholder="Amaka Okafor"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    className="w-full h-11 px-4 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Email address
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className="w-full h-11 px-4 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Min. 8 characters"
                      value={form.password}
                      onChange={(e) => update("password", e.target.value)}
                      className="w-full h-11 px-4 pr-11 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring transition"
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="w-full h-11 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:opacity-90 transition flex items-center justify-center gap-2 mt-1"
                >
                  Continue <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="mb-7">
                <h1 className="text-3xl font-bold mb-1.5">
                  Tell us about your business
                </h1>
                <p className="text-muted-foreground text-sm">
                  We&apos;ll pick the best templates for you.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Business name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Amaka's Kitchen"
                    value={form.businessName}
                    onChange={(e) => update("businessName", e.target.value)}
                    className="w-full h-11 px-4 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Business category
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => update("category", cat)}
                        className={`h-10 px-3 rounded-xl text-sm font-medium border transition-all ${
                          form.category === cat
                            ? "bg-primary text-primary-foreground border-primary"
                            : "border-border hover:border-primary/40 hover:bg-muted"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <button className="w-full h-11 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:opacity-90 transition flex items-center justify-center gap-2 mt-1">
                  Create My Free Site <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  onClick={() => setStep(1)}
                  className="w-full text-sm text-muted-foreground hover:text-foreground transition"
                >
                  ← Back
                </button>
              </div>
            </>
          )}

          <p className="text-center text-xs text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="text-primary font-semibold hover:underline"
            >
              Sign in
            </Link>
          </p>

          <p className="text-center text-xs text-muted-foreground mt-3">
            By signing up, you agree to our{" "}
            <Link href="#" className="underline">
              Terms
            </Link>{" "}
            &{" "}
            <Link href="#" className="underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
