/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useDashboardStore } from "@/store/useDashboardStore";
import {
  User,
  Lock,
  MessageCircle,
  Globe,
  ShieldCheck,
  Save,
  Camera,
  Loader2,
  CheckCircle2,
} from "lucide-react";

const SITE_STANDARD_NAME = process.env.NEXT_PUBLIC_SITE_STANDARD_NAME;

// Shared Tab types
type Tab = "profile" | "site" | "security";

// Tab Nav Button Component
function TabButton({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ElementType;
  label: string;
}) {
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

// Profile Tab Component
function ProfileTab({
  photoURL,
  initials,
  displayName,
  setDisplayName,
  user,
  photoInputRef,
  photoUploading,
  handlePhotoChange,
}: {
  photoURL?: string | null;
  initials: string;
  displayName: string;
  setDisplayName: (n: string) => void;
  user: any | null | undefined;
  photoInputRef: any | null | undefined;
  photoUploading: boolean;
  handlePhotoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
      {/* Photo */}
      <div className="flex items-center gap-4">
        <div className="relative group">
          <div className="h-20 w-20 rounded-full bg-primary/10 border-2 border-dashed border-primary/30 grid place-items-center overflow-hidden">
            {photoURL ? (
              <img
                src={photoURL}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-xl font-bold text-primary">{initials}</span>
            )}
          </div>
          <button
            onClick={() => photoInputRef.current?.click()}
            disabled={photoUploading}
            className="absolute bottom-0 right-0 p-1.5 bg-primary text-white rounded-full shadow-lg hover:scale-110 transition cursor-pointer disabled:opacity-60"
          >
            {photoUploading ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <Camera className="h-3 w-3" />
            )}
          </button>
          <input
            ref={photoInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhotoChange}
          />
        </div>
        <div>
          <h3 className="font-bold">Profile Picture</h3>
          <p className="text-xs text-muted-foreground">PNG or JPG. Max 2MB.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Full Name
          </label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="e.g. Amaka Okafor"
            className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Email Address
          </label>
          <input
            type="email"
            disabled
            value={user?.email ?? ""}
            className="w-full bg-muted border border-border rounded-xl px-4 py-2.5 text-sm cursor-not-allowed opacity-70"
          />
        </div>
      </div>
    </div>
  );
}

// Site Defaults Tab Component
function SiteDefaultsTab({
  whatsappNumber,
  setWhatsappNumber,
  defaultMessage,
  setDefaultMessage,
  defaultAuthor,
  setDefaultAuthor,
}: {
  whatsappNumber: string;
  setWhatsappNumber: (n: string) => void;
  defaultMessage: string;
  setDefaultMessage: (n: string) => void;
  defaultAuthor: string;
  setDefaultAuthor: (n: string) => void;
}) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
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
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber("234" + e.target.value)}
              placeholder="8012345678"
              title="Default Phone Number"
              className="flex-1 bg-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <p className="text-[11px] text-muted-foreground">
            Pre-filled when you create new sites.
          </p>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold text-muted-foreground">
            Default Message
          </label>
          <div className="flex gap-2">
            <textarea
              value={defaultMessage}
              onChange={(e) => setDefaultMessage(e.target.value)}
              placeholder="Hi, Id like to get started now"
              title="Default whatsapp message"
              className="flex-1 bg-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <p className="text-[11px] text-muted-foreground">
            Pre-filled when you create new sites.
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
            value={defaultAuthor}
            onChange={(e) => setDefaultAuthor(e.target.value)}
            placeholder="Your Name or Brand"
            className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>
    </div>
  );
}

// Security Tab Component
function SecurityTab({
  user,
  resetSent,
  resetLoading,
  handleReset,
}: {
  user: any | null | undefined;
  resetSent: boolean;
  resetLoading: boolean;
  handleReset: () => void;
}) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-bold flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-emerald-500" />
          Password Reset
        </h3>
        <p className="text-sm text-muted-foreground">
          We&apos;ll send a password reset link to{" "}
          <span className="font-medium text-foreground">{user?.email}</span>.
        </p>
        {resetSent ? (
          <div className="flex items-center gap-2 text-sm text-emerald-600 bg-emerald-500/10 rounded-xl px-4 py-3">
            <CheckCircle2 className="h-4 w-4" />
            Reset email sent! Check your inbox.
          </div>
        ) : (
          <button
            onClick={handleReset}
            disabled={resetLoading}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground h-10 px-6 rounded-full text-sm font-semibold hover:opacity-90 transition disabled:opacity-60 cursor-pointer"
          >
            {resetLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Send Reset Email
          </button>
        )}
      </div>
    </div>
  );
}

// Footer Actions Component
function FooterActions({
  error,
  saved,
  saving,
  profileLoading,
  handleSave,
}: {
  error: string;
  saved: boolean;
  saving: boolean;
  profileLoading: boolean;
  handleSave: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      {error && <p className="text-sm text-destructive">{error}</p>}
      <div className="flex items-center gap-3 ml-auto">
        {saved && (
          <span className="text-sm text-emerald-600 flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4" /> Saved
          </span>
        )}
        <button
          onClick={handleSave}
          disabled={saving || profileLoading}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-full text-sm font-bold hover:opacity-90 transition disabled:opacity-60 shadow-lg shadow-primary/20 cursor-pointer"
        >
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          Save Changes
        </button>
      </div>
    </div>
  );
}

// Main Dashboard Settings component
export default function DashboardSettings() {
  const { user, sendReset } = useAuth();
  const { profile, saveProfile, changeProfilePhoto, profileLoading } =
    useDashboardStore();
  const [activeTab, setActiveTab] = useState<Tab>("profile");

  // Profile fields
  const [displayName, setDisplayName] = useState(
    profile?.displayName ?? user?.displayName ?? "",
  );
  const [whatsappNumber, setWhatsappNumber] = useState(
    profile?.whatsappNumber ?? "",
  );
  const [defaultMessage, setDefaultMessage] = useState(
    profile?.defaultMessage ?? "",
  );

  const [defaultAuthor, setDefaultAuthor] = useState(
    profile?.defaultAuthor ?? "",
  );

  // UI state
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [photoUploading, setPhotoUploading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [error, setError] = useState("");

  const photoInputRef = useRef<HTMLInputElement>(null);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    setError("");
    try {
      const updates: Record<string, string> = { displayName };
      if (activeTab === "site") {
        updates.whatsappNumber = whatsappNumber.replace(/\D/g, "");
        updates.defaultAuthor = defaultAuthor;
        updates.defaultMessage = defaultMessage;
      }
      await saveProfile(user.uid, updates);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    setPhotoUploading(true);
    try {
      await changeProfilePhoto(user.uid, file);
    } finally {
      setPhotoUploading(false);
    }
  };

  const handleReset = async () => {
    if (!user?.email) return;
    setResetLoading(true);
    try {
      await sendReset(user.email);
      setResetSent(true);
    } finally {
      setResetLoading(false);
    }
  };

  const photoURL = profile?.photoURL || user?.photoURL;
  const initials = (
    profile?.displayName ||
    user?.displayName ||
    user?.email ||
    "ME"
  )
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h2 className="text-xl font-bold">Settings</h2>
        <p className="text-sm text-muted-foreground">
          Manage your account and {SITE_STANDARD_NAME} preferences.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Tabs */}
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

        {/* Form area */}
        <div className="flex-1 space-y-6">
          {activeTab === "profile" && (
            <ProfileTab
              photoURL={photoURL}
              initials={initials}
              displayName={displayName}
              setDisplayName={setDisplayName}
              user={user}
              photoInputRef={photoInputRef}
              photoUploading={photoUploading}
              handlePhotoChange={handlePhotoChange}
            />
          )}

          {activeTab === "site" && (
            <SiteDefaultsTab
              whatsappNumber={whatsappNumber}
              setWhatsappNumber={setWhatsappNumber}
              defaultMessage={defaultMessage}
              setDefaultMessage={setDefaultMessage}
              defaultAuthor={defaultAuthor}
              setDefaultAuthor={setDefaultAuthor}
            />
          )}

          {activeTab === "security" && (
            <SecurityTab
              user={user}
              resetSent={resetSent}
              resetLoading={resetLoading}
              handleReset={handleReset}
            />
          )}

          {activeTab !== "security" && (
            <FooterActions
              error={error}
              saved={saved}
              saving={saving}
              profileLoading={profileLoading}
              handleSave={handleSave}
            />
          )}
        </div>
      </div>
    </div>
  );
}
