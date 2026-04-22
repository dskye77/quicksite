"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/lib/useAuth";
import Link from "next/link";
import {
  Zap,
  LayoutDashboard,
  Globe,
  BarChart2,
  Settings,
  LogOut,
  Plus,
  Eye,
  Edit3,
  ExternalLink,
  TrendingUp,
  Users,
  MousePointerClick,
  ShoppingBag,
  Bell,
  Sun,
  Moon,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";

const sidebarLinks = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Globe, label: "My Sites" },
  { icon: BarChart2, label: "Analytics" },
  { icon: Settings, label: "Settings" },
];

export default function DashboardPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/signin");
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    setLoggingOut(true);
    await signOut(auth);
    router.push("/");
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 rounded-xl bg-primary grid place-items-center animate-pulse">
            <Zap className="h-4 w-4 text-white fill-white" />
          </div>
          <p className="text-sm text-muted-foreground">Loading...</p>
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

  const firstName = user.displayName?.split(" ")[0] ?? "there";

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 h-screen z-40 flex flex-col w-64 bg-sidebar border-r border-sidebar-border transition-transform duration-300 ${
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
          {sidebarLinks.map(({ icon: Icon, label, active }) => (
            <button
              key={label}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
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
        <div className="p-4 border-t border-sidebar-border">
          <div className="bg-primary/10 rounded-xl p-4 mb-4">
            <p className="text-xs font-semibold text-foreground mb-1">
              Free Plan
            </p>
            <p className="text-[11px] text-muted-foreground mb-3">
              Upgrade to remove branding & accept payments.
            </p>
            <Link href="/pricing">
              <button className="w-full bg-primary text-primary-foreground rounded-lg text-xs font-semibold py-2 hover:opacity-90 transition">
                Upgrade Now
              </button>
            </Link>
          </div>

          {/* User */}
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
              title="Logout"
              className="text-muted-foreground hover:text-destructive transition disabled:opacity-50"
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-20 bg-background/80 backdrop-blur border-b border-border px-5 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden text-muted-foreground hover:text-foreground"
              onClick={() => setSidebarOpen(true)}
            >
              <LayoutDashboard className="h-5 w-5" />
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
              type="button"
              title="Notifications"
              className="relative text-muted-foreground hover:text-foreground transition p-2"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-secondary rounded-full" />
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              title="Toggle theme"
              className="text-muted-foreground hover:text-foreground transition p-2"
            >
              {darkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-full h-9 px-4 text-sm font-semibold hover:opacity-90 transition">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">New Site</span>
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-5 sm:p-7 space-y-7 overflow-y-auto">
          {/* Stats — empty state until real analytics are wired */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                label: "Total Visits",
                icon: Users,
                color: "bg-primary/10 text-primary",
              },
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
            ].map((stat) => (
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

          {/* My Sites — empty state */}
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

            <div className="space-y-3">
              {/* Empty state */}
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
                <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-full h-9 px-5 text-sm font-semibold hover:opacity-90 transition mt-1">
                  <Plus className="h-4 w-4" /> Create your first site
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="font-bold text-lg mb-4">Quick Actions</h2>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
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
              ].map((action) => (
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
