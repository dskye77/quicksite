"use client";

// src/features/dashboard/DashboardScreen.tsx
// Real data from Zustand store — no mock values.

import Link from "next/link";
import {
  Users,
  MousePointerClick,
  Globe,
  TrendingUp,
  Plus,
  ChevronRight,
  ArrowUpRight,
  Loader2,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useDashboardStore } from "@/store/useDashboardStore";

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

export default function DashboardScreen() {
  const { user } = useAuth();
  const { sites, stats, sitesLoading, setCreateModal } = useDashboardStore();
  const recentSites = sites.slice(0, 3);

  const STATS = [
    {
      label: "Total Visits",
      icon: Users,
      value: sitesLoading ? null : stats.totalVisits,
      color: "bg-primary/10 text-primary",
    },
    {
      label: "WhatsApp Clicks",
      icon: MousePointerClick,
      value: sitesLoading ? null : stats.totalWhatsappClicks,
      color: "bg-secondary/10 text-secondary",
    },
    {
      label: "Total Sites",
      icon: Globe,
      value: sitesLoading ? null : stats.totalSites,
      color: "bg-emerald-500/10 text-emerald-600",
    },
    {
      label: "Plan",
      icon: TrendingUp,
      value: sitesLoading ? null : "Free",
      color: "bg-violet-500/10 text-violet-600",
    },
  ];

  return (
    <div className="space-y-8">
      {/* ── Stats ──────────────────────────────────────────────────────── */}
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
            {stat.value === null ? (
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground mb-1" />
            ) : (
              <p className="text-2xl font-bold">{stat.value}</p>
            )}
            <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* ── My Sites ───────────────────────────────────────────────────── */}
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

        {sitesLoading ? (
          <div className="bg-card border border-border rounded-2xl p-10 flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : recentSites.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentSites.map((site) => (
              <div
                key={site.id}
                className="bg-card border border-border rounded-2xl p-5 hover:border-primary/40 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 grid place-items-center">
                    <Globe className="h-5 w-5 text-primary" />
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      site.status === "published"
                        ? "bg-emerald-500/10 text-emerald-600"
                        : "bg-orange-500/10 text-orange-500"
                    }`}
                  >
                    {site.status}
                  </span>
                </div>
                <p className="font-bold text-sm truncate">{site.name}</p>
                <p className="text-xs text-primary mt-0.5 truncate">
                  makesite.com.ng/{site.slug}
                </p>
                <p className="text-xs text-muted-foreground mt-3">
                  {site.visits} visits
                </p>
              </div>
            ))}
          </div>
        ) : (
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
            <button
              onClick={() => setCreateModal(true)}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-full h-9 px-5 text-sm font-semibold hover:opacity-90 transition mt-1 cursor-pointer"
            >
              <Plus className="h-4 w-4" /> Create your first site
            </button>
          </div>
        )}
      </div>

      {/* ── Quick Actions ──────────────────────────────────────────────── */}
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
