"use client";

import Link from "next/link";
import { 
  Users, 
  MousePointerClick, 
  ShoppingBag, 
  TrendingUp, 
  Globe, 
  Plus, 
  ChevronRight, 
  ArrowUpRight 
} from "lucide-react";

const STATS = [
  { label: "Total Visits", icon: Users, color: "bg-primary/10 text-primary" },
  {
    label: "Link Clicks",
    icon: MousePointerClick,
    color: "bg-secondary/10 text-secondary",
  },
  {
    label: "WhatsApp Orders",
    icon: ShoppingBag,
    color: "bg-emerald-500/10 text-emerald-600",
  },
  {
    label: "Revenue (est.)",
    icon: TrendingUp,
    color: "bg-violet-500/10 text-violet-600",
  },
];

const QUICK_ACTIONS = [
  {
    label: "Browse Templates",
    sub: "Find the perfect design",
    href: "/templates",
    color: "bg-primary/10 text-primary",
  },
  {
    label: "Upgrade to Basic",
    sub: "Remove branding — ₦1,500/mo",
    href: "/pricing",
    color: "bg-secondary/10 text-secondary",
  },
  {
    label: "Connect Domain",
    sub: "Use your own .com.ng domain",
    href: "#",
    color: "bg-violet-500/10 text-violet-600",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* ── Stats Grid ────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="bg-card border border-border rounded-2xl p-5"
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className={`h-9 w-9 rounded-xl ${stat.color} grid place-items-center`}
              >
                <stat.icon className="h-4 w-4" />
              </div>
            </div>
            <p className="text-2xl font-bold text-muted-foreground/40">—</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* ── My Sites Section ─────────────────────────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-lg">My Sites</h2>
          <Link
            href="/dashboard/sites"
            className="text-sm text-primary hover:underline flex items-center gap-1"
          >
            View all <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="bg-card border border-border rounded-2xl p-10 flex flex-col items-center justify-center text-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-muted grid place-items-center">
            <Globe className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <p className="font-semibold text-sm">No sites yet</p>
            <p className="text-xs text-muted-foreground mt-1">
              Create your first site and go live in minutes.
            </p>
          </div>
          <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-full h-9 px-5 text-sm font-semibold hover:opacity-90 transition mt-1 cursor-pointer">
            <Plus className="h-4 w-4" /> Create your first site
          </button>
        </div>
      </div>

      {/* ── Quick Actions ───────────────────────────────────────────── */}
      <div>
        <h2 className="font-bold text-lg mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-3 gap-3">
          {QUICK_ACTIONS.map((action) => (
            <Link key={action.label} href={action.href}>
              <div className="bg-card border border-border rounded-2xl p-5 hover:shadow-md hover:border-primary/30 transition-all duration-200 cursor-pointer group">
                <div
                  className={`h-9 w-9 rounded-xl ${action.color} grid place-items-center mb-3`}
                >
                  <ArrowUpRight className="h-4 w-4 group-hover:scale-110 transition-transform" />
                </div>
                <p className="font-semibold text-sm">{action.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {action.sub}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}