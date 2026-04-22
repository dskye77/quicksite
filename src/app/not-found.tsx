// src/app/not-found.tsx
// ✅ Correct location for App Router 404 page.
// The old code had this at app/not-found/page.tsx which is WRONG — that just
// creates a route at /not-found. This file must live at app/not-found.tsx.

import Link from "next/link";
import { Zap, Home, ArrowRight, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 text-center relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <Link href="/" className="flex items-center gap-2 mb-16">
        <div className="h-9 w-9 rounded-xl bg-primary grid place-items-center">
          <Zap className="h-5 w-5 text-white fill-white" />
        </div>
        <p className="font-bold text-lg">QuickSite</p>
      </Link>

      <div className="relative mb-6">
        <p className="text-[10rem] sm:text-[14rem] font-extrabold leading-none text-foreground/5 select-none">
          404
        </p>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-card border border-border rounded-2xl px-6 py-4 shadow-xl">
            <div className="flex items-center gap-3">
              <Search className="h-5 w-5 text-muted-foreground" />
              <p className="text-sm font-medium text-muted-foreground">
                quicksite.com.ng/
                <span className="text-destructive line-through">this-page</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold mb-3">This page doesn&apos;t exist</h1>
      <p className="text-muted-foreground max-w-sm mb-8 leading-relaxed">
        The page you&apos;re looking for may have been moved, deleted, or never existed. Let&apos;s
        get you back on track.
      </p>

      <div className="flex flex-wrap gap-3 justify-center">
        <Link href="/">
          <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-full h-11 px-6 font-semibold text-sm hover:opacity-90 transition cursor-pointer">
            <Home className="h-4 w-4" /> Back to Home
          </button>
        </Link>
        <Link href="/templates">
          <button className="inline-flex items-center gap-2 border border-border bg-background rounded-full h-11 px-6 font-semibold text-sm hover:bg-muted transition cursor-pointer">
            Browse Templates <ArrowRight className="h-4 w-4" />
          </button>
        </Link>
      </div>

      <div className="mt-12 flex gap-6 text-sm text-muted-foreground">
        <Link href="/pricing" className="hover:text-primary transition">Pricing</Link>
        <Link href="/login" className="hover:text-primary transition">Sign In</Link>
        <Link href="/signup" className="hover:text-primary transition">Get Started</Link>
      </div>
    </div>
  );
}