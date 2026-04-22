"use client";

// src/features/dashboard/DashboardScreen.tsx

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import {
  Zap,
  LayoutDashboard,
  Globe,
  BarChart2,
  Settings,
  LogOut,
  Plus,
  TrendingUp,
  Users,
  MousePointerClick,
  ShoppingBag,
  Bell,
  Sun,
  Moon,
  ChevronRight,
  ArrowUpRight,
  Menu,
} from "lucide-react";

const SIDEBAR_LINKS = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Globe, label: "My Sites" },
  { icon: BarChart2, label: "Analytics" },
  { icon: Settings, label: "Settings" },
];

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

export default function DashboardScreen() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const router = useRouter();
  const { user, loading, logOut } = useAuth();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    setLoggingOut(true);
    await logOut();
    router.push("/");
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 rounded-xl bg-primary grid place-items-center animate-pulse">
            <Zap className="h-4 w-4 text-white fill-white" />
          </div>
          <p className="text-sm text-muted-foreground">Loading…</p>
        </div>
      </div>
    );
  }

  const initials = user.displayName
    ? user.displayName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : (user.email?.slice(0, 2).toUpperCase() ?? "ME");

  const firstName =
    user.displayName?.split(" ")[0] ?? user.email?.split("@")[0] ?? "there";

  return (
    <div className="min-h-screen bg-background flex">
      {/* ── Sidebar ─────────────────────────────────────────────────────── */}
      <aside
        className={`fixed lg:sticky top-0 h-screen z-40 flex flex-col w-64 bg-sidebar border-r border-sidebar-border transition-transform duration-300 shrink-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="p-5 border-b border-sidebar-border">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-primary grid place-items-center">
              <Zap className="h-5 w-5 text-white fill-white" />
            </div>
            <div>
              <p className="font-bold text-base text-sidebar-foreground">
                QuickSite
              </p>
              <p className="text-[10px] text-muted-foreground">.com.ng</p>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {SIDEBAR_LINKS.map(({ icon: Icon, label, active }) => (
            <button
              key={label}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                active
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </nav>

        {/* Upgrade CTA + User */}
        <div className="p-4 border-t border-sidebar-border space-y-4">
          <div className="bg-primary/10 rounded-xl p-4">
            <p className="text-xs font-semibold mb-1">Free Plan</p>
            <p className="text-[11px] text-muted-foreground mb-3">
              Upgrade to remove branding & accept payments.
            </p>
            <Link href="/pricing">
              <button className="w-full bg-primary text-primary-foreground rounded-lg text-xs font-semibold py-2 hover:opacity-90 transition cursor-pointer">
                Upgrade Now
              </button>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-primary grid place-items-center text-xs font-bold text-white shrink-0">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">
                {user.displayName ?? "My Account"}
              </p>
              <p className="text-[11px] text-muted-foreground truncate">
                {user.email}
              </p>
            </div>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              title="Sign out"
              className="text-muted-foreground hover:text-destructive transition disabled:opacity-50 cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Main ────────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-background/80 backdrop-blur border-b border-border px-5 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden text-muted-foreground hover:text-foreground cursor-pointer"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <h1 className="font-bold text-lg leading-tight">Dashboard</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                Welcome back, {firstName} 👋
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              title="Notifications"
              className="relative text-muted-foreground hover:text-foreground transition p-2 cursor-pointer"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-secondary rounded-full" />
            </button>

            {/* Working dark mode toggle */}
            {mounted && (
              <button
                onClick={() =>
                  setTheme(resolvedTheme === "dark" ? "light" : "dark")
                }
                title="Toggle theme"
                className="text-muted-foreground hover:text-foreground transition p-2 cursor-pointer"
              >
                {resolvedTheme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
            )}

            <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-full h-9 px-4 text-sm font-semibold hover:opacity-90 transition cursor-pointer">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">New Site</span>
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-5 sm:p-7 space-y-8 overflow-y-auto">
          {/* Stats */}
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

          {/* My Sites */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-lg">My Sites</h2>
              <Link
                href="#"
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

          {/* Quick Actions */}
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
        </main>
      </div>
    </div>
  );
}
