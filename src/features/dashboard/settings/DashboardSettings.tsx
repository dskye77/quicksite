/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import {
  User,
  Lock,
  MessageCircle,
  Globe,
  ShieldCheck,
  Save,
  Camera,
} from "lucide-react";

export default function SettingsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h2 className="text-xl font-bold">Settings</h2>
        <p className="text-sm text-muted-foreground">
          Manage your account and MakeSite preferences.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* ── Sidebar Tabs ────────────────────────────────────────────── */}
        <aside className="w-full md:w-48 flex flex-row md:flex-col gap-1 overflow-x-auto pb-2 md:pb-0">
          <TabButton
            active={activeTab === "profile"}
            onClick={() => setActiveTab("profile")}
            icon={User}
            label="Profile"
          />
          <TabButton
            active={activeTab === "site"}
            onClick={() => setActiveTab("site")}
            icon={MessageCircle}
            label="Site Defaults"
          />
          <TabButton
            active={activeTab === "security"}
            onClick={() => setActiveTab("security")}
            icon={Lock}
            label="Security"
          />
        </aside>

        {/* ── Main Form Area ──────────────────────────────────────────── */}
        <div className="flex-1 space-y-6">
          {activeTab === "profile" && (
            <div className="bg-card border border-border rounded-2xl p-6 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center gap-4">
                <div className="relative group">
                  <div className="h-20 w-20 rounded-full bg-primary/10 grid place-items-center border-2 border-dashed border-primary/30">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                  <button className="absolute bottom-0 right-0 p-1.5 bg-primary text-white rounded-full shadow-lg hover:scale-110 transition cursor-pointer">
                    <Camera className="h-3 w-3" />
                  </button>
                </div>
                <div>
                  <h3 className="font-bold">Profile Picture</h3>
                  <p className="text-xs text-muted-foreground">
                    PNG or JPG. Max 2MB.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. John Doe"
                    defaultValue={user?.displayName || ""}
                    className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="user@example.com"
                    disabled
                    value={user?.email || ""}
                    className="w-full bg-muted border border-border rounded-xl px-4 py-2.5 text-sm cursor-not-allowed opacity-70"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "site" && (
            <div className="bg-card border border-border rounded-2xl p-6 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="space-y-4">
                <h3 className="text-sm font-bold flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-primary" />
                  Global WhatsApp Settings
                </h3>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted-foreground">
                    Default Phone Number
                  </label>
                  <div className="flex gap-2">
                    <span className="flex items-center px-4 bg-muted border border-border rounded-xl text-sm font-medium">
                      +234
                    </span>
                    <input
                      type="text"
                      placeholder="8012345678"
                      className="flex-1 bg-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    This number will be pre-filled when you create new MakeSite
                    templates.
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-border">
                <h3 className="text-sm font-bold flex items-center gap-2 mb-4">
                  <Globe className="h-4 w-4 text-primary" />
                  SEO Defaults
                </h3>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted-foreground">
                    Default Site Author
                  </label>
                  <input
                    type="text"
                    placeholder="Your Name or Brand"
                    title="Default Site Author"
                    className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="bg-card border border-border rounded-2xl p-6 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="space-y-4">
                <h3 className="text-sm font-bold flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  Password Management
                </h3>
                <p className="text-xs text-muted-foreground">
                  Update your password to keep your account secure.
                </p>
                <button className="text-sm font-semibold text-primary hover:underline cursor-pointer">
                  Send Password Reset Email
                </button>
              </div>
            </div>
          )}

          {/* ── Footer Actions ──────────────────────────────────────────── */}
          <div className="flex items-center justify-end gap-3">
            <button className="px-6 py-2 rounded-full text-sm font-medium hover:bg-muted transition cursor-pointer">
              Cancel
            </button>
            <button className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2 rounded-full text-sm font-bold hover:opacity-90 transition shadow-lg shadow-primary/20 cursor-pointer">
              <Save className="h-4 w-4" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon: Icon, label }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
        active
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      }`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}
