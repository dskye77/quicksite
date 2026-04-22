"use client";

// src/features/dashboard/create/CreateSiteScreen.tsx
// Modal + full-page flow for creating a new site.
// Validates slug uniqueness against Firestore before saving.

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Globe, ArrowRight, X, Check } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useDashboardStore } from "@/store/useDashboardStore";
import { isSlugTaken } from "@/lib/firestore";

const TEMPLATES = [
  { id: "naija-bites", label: "Naija Bites", category: "Restaurant" },
  { id: "fashion-house", label: "FashionHouse", category: "Store" },
  { id: "glow-salon", label: "GlowSalon", category: "Service" },
  { id: "techfix", label: "TechFix", category: "Service" },
  { id: "freshmart", label: "FreshMart", category: "Store" },
  { id: "creative-port", label: "CreativePort", category: "Portfolio" },
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

interface Props {
  onClose?: () => void;
}

export default function CreateSiteScreen({ onClose }: Props) {
  const { user } = useAuth();
  const { addSite } = useDashboardStore();
  const router = useRouter();

  const [step, setStep] = useState<1 | 2>(1);
  const [templateId, setTemplateId] = useState("");
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [slugManual, setSlugManual] = useState(false);
  const [slugError, setSlugError] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleNameChange = (v: string) => {
    setName(v);
    if (!slugManual) setSlug(slugify(v));
  };

  const handleSlugChange = (v: string) => {
    setSlugManual(true);
    setSlug(slugify(v));
    setSlugError("");
  };

  const validateAndCreate = async () => {
    if (!name.trim()) {
      setError("Site name is required.");
      return;
    }
    if (!slug.trim()) {
      setError("URL slug is required.");
      return;
    }
    if (!user) {
      setError("You must be logged in.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const taken = await isSlugTaken(slug);
      if (taken) {
        setSlugError("This URL is already taken. Try another.");
        setLoading(false);
        return;
      }
      await addSite(user.uid, {
        name: name.trim(),
        slug,
        templateId,
        status: "draft",
        content: {},
      });
      onClose?.();
      router.push("/dashboard/sites");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4 py-8 overflow-y-auto">
      <div className="bg-card border border-border rounded-2xl w-full max-w-lg shadow-2xl relative">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="font-bold text-lg">Create a new site</h2>
            <p className="text-xs text-muted-foreground">Step {step} of 2</p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Step 1: Pick template */}
        {step === 1 && (
          <div className="p-6 space-y-5">
            <p className="text-sm text-muted-foreground">
              Pick a starting template, or start blank.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {/* Blank option */}
              <button
                onClick={() => setTemplateId("")}
                className={`p-4 rounded-xl border-2 text-left transition cursor-pointer ${
                  templateId === ""
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/40"
                }`}
              >
                <div className="h-8 w-8 rounded-lg bg-muted grid place-items-center mb-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="font-semibold text-sm">Blank</p>
                <p className="text-[11px] text-muted-foreground">
                  Start from scratch
                </p>
              </button>

              {TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTemplateId(t.id)}
                  className={`p-4 rounded-xl border-2 text-left transition cursor-pointer relative ${
                    templateId === t.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/40"
                  }`}
                >
                  {templateId === t.id && (
                    <span className="absolute top-2 right-2 h-5 w-5 bg-primary rounded-full grid place-items-center">
                      <Check className="h-3 w-3 text-white" />
                    </span>
                  )}
                  <div className="h-8 w-8 rounded-lg bg-primary/10 grid place-items-center mb-2">
                    <span className="text-xs font-bold text-primary">
                      {t.label[0]}
                    </span>
                  </div>
                  <p className="font-semibold text-sm">{t.label}</p>
                  <p className="text-[11px] text-muted-foreground">
                    {t.category}
                  </p>
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep(2)}
              className="w-full h-11 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              Continue <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Step 2: Name + slug */}
        {step === 2 && (
          <div className="p-6 space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium">Site name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="Amaka's Kitchen"
                className="w-full h-10 rounded-xl border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring transition"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Your URL</label>
              <div className="flex items-center gap-0 border border-input rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-ring">
                <span className="bg-muted px-3 py-2.5 text-xs text-muted-foreground whitespace-nowrap border-r border-input font-mono">
                  makesite.com.ng/
                </span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => handleSlugChange(e.target.value)}
                  placeholder="your-site-name"
                  className="flex-1 bg-background px-3 py-2.5 text-sm font-mono focus:outline-none"
                />
              </div>
              {slugError && (
                <p className="text-xs text-destructive">{slugError}</p>
              )}
              {slug && !slugError && (
                <p className="text-xs text-muted-foreground">
                  makesite.com.ng/
                  <span className="text-primary font-medium">{slug}</span>
                </p>
              )}
            </div>

            {error && (
              <p className="text-sm text-destructive bg-destructive/10 rounded-xl px-3 py-2">
                {error}
              </p>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 h-11 rounded-full border border-border text-sm font-medium hover:bg-muted transition cursor-pointer"
              >
                Back
              </button>
              <button
                onClick={validateAndCreate}
                disabled={loading}
                className="flex-1 h-11 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Create Site"
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
