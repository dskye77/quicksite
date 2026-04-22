"use client";

import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { LogOut, LayoutDashboard, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function SignBtns() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const handleLogout = () => {
    logout();
    setOpen(false);
    router.push("/");
  };

  if (loading) {
    return <div className="h-8 w-24 rounded-lg bg-muted animate-pulse" />;
  }

  if (user) {
    // Initials avatar
    const initials = user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    return (
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setOpen((p) => !p)}
          className="flex items-center gap-2 rounded-full border border-border bg-card px-2 py-1 hover:bg-muted transition"
        >
          <div className="h-7 w-7 rounded-full bg-primary text-primary-foreground text-xs font-bold grid place-items-center">
            {initials}
          </div>
          <span className="text-sm font-medium hidden md:block max-w-[120px] truncate">
            {user.name.split(" ")[0]}
          </span>
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
        </button>

        {open && (
          <div className="absolute right-0 top-full mt-2 w-52 rounded-xl border border-border bg-card shadow-xl overflow-hidden z-50">
            <div className="px-4 py-3 border-b border-border">
              <p className="text-sm font-semibold truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">
                {user.email}
              </p>
            </div>

            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-muted transition"
            >
              <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
              Dashboard
            </Link>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="lg"
        className="cursor-pointer hidden md:inline-flex"
        asChild
      >
        <Link href="/login">Sign In</Link>
      </Button>
      <Button
        variant="default"
        size="lg"
        className="cursor-pointer md:hidden"
        asChild
      >
        <Link href="/login">Sign In</Link>
      </Button>
      <Button
        className="cursor-pointer hidden md:inline-flex"
        size="lg"
        asChild
      >
        <Link href="/signup">Get Started Free</Link>
      </Button>
    </div>
  );
}
