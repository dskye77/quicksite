"use client";

// src/features/dashboard/create/CreateSiteScreen.tsx
// Modal + full-page flow for creating a new site.
// Step 1: Pick template (with live preview)
// Step 2: Name + slug
// On create: seeds Firestore with template default content.

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Loader2,
  Globe,
  ArrowRight,
  X,
  Check,
  Eye,
  ArrowLeft,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useDashboardStore } from "@/store/useDashboardStore";
import { isSlugTaken } from "@/lib/firestore";
import {
  TEMPLATE_REGISTRY,
  getDefaultContent,
  isTemplateImplemented,
} from "@/lib/templateRegistry";

// Template previews (lazy)
import dynamic from "next/dynamic";
const NaijaBitesTemplate = dynamic(
  () => import("@/features/templates/naija-bites/NaijaBitesTemplate"),
  { ssr: false },
);
import { defaultNaijaBitesContent } from "@/features/templates/naija-bites/defaultContent";

// ── Template cards ─────────────────────────────────────────────────────────────
const TEMPLATES = Object.values(TEMPLATE_REGISTRY);

// ── Slug helper ────────────────────────────────────────────────────────────────
function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ── Preview Modal ──────────────────────────────────────────────────────────────
function PreviewModal({
  templateId,
  onClose,
  onUse,
}: {
  templateId: string;
  onClose: () => void;
  onUse: () => void;
}) {
  const info = TEMPLATE_REGISTRY[templateId];

  return (
    <div className="fixed inset-0 z-60 bg-black/70 flex flex-col">
      {/* Header bar */}
      <div className="flex items-center justify-between px-5 py-3 bg-card border-b border-border shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition flex items-center gap-1.5 text-sm"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          <span className="text-muted-foreground">|</span>
          <span className="font-semibold text-sm">
            {info?.label ?? templateId} — Preview
          </span>
          {isTemplateImplemented(templateId) ? (
            <span className="text-[10px] bg-emerald-500/10 text-emerald-600 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              Live
            </span>
          ) : (
            <span className="text-[10px] bg-orange-500/10 text-orange-500 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              Coming Soon
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onUse}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-full h-9 px-5 text-sm font-semibold hover:opacity-90 transition"
          >
            <Check className="h-4 w-4" /> Use This Template
          </button>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground p-1"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Preview area */}
      <div className="flex-1 overflow-auto bg-zinc-100">
        {isTemplateImplemented(templateId) ? (
          <div className="min-h-full">
            {templateId === "naija-bites" && (
              <NaijaBitesTemplate
                content={defaultNaijaBitesContent}
                isPreview
              />
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full min-h-100 gap-4 text-center p-8">
            <div className="text-6xl">{info?.emoji ?? "🚧"}</div>
            <h3 className="text-xl font-bold">{info?.label}</h3>
            <p className="text-muted-foreground max-w-sm">
              This template is under construction. It&apos;ll be available soon!
              You can still create a site with it — it&apos;ll use a blank
              layout for now.
            </p>
            <button
              onClick={onUse}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-full h-10 px-6 text-sm font-semibold hover:opacity-90 transition mt-2"
            >
              <Check className="h-4 w-4" /> Use Anyway
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
interface Props {
  onClose?: () => void;
}

export default function CreateSiteScreen({ onClose }: Props) {
  const { user } = useAuth();
  const { addSite } = useDashboardStore();
  const router = useRouter();

  const [step, setStep] = useState<1 | 2>(1);
  const [templateId, setTemplateId] = useState("naija-bites");
  const [previewId, setPreviewId] = useState<string | null>(null);
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

      // Seed content from template defaults
      const defaultContent = getDefaultContent(templateId);

      await addSite(user.uid, {
        name: name.trim(),
        slug,
        templateId,
        status: "draft",
        content: defaultContent,
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
    <>
      {/* Preview modal — rendered above the create modal */}
      {previewId && (
        <PreviewModal
          templateId={previewId}
          onClose={() => setPreviewId(null)}
          onUse={() => {
            setTemplateId(previewId);
            setPreviewId(null);
          }}
        />
      )}

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

          {/* ── Step 1: Pick template ─────────────────────────────────────── */}
          {step === 1 && (
            <div className="p-6 space-y-5">
              <p className="text-sm text-muted-foreground">
                Pick a template. Tap the eye to preview it.
              </p>

              <div className="grid grid-cols-2 gap-3 max-h-95 overflow-y-auto pr-1">
                {/* Blank option */}
                <div
                  onClick={() => setTemplateId("")}
                  className={`p-4 rounded-xl border-2 text-left transition cursor-pointer relative group ${
                    templateId === ""
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/40"
                  }`}
                >
                  {templateId === "" && (
                    <span className="absolute top-2 right-2 h-5 w-5 bg-primary rounded-full grid place-items-center">
                      <Check className="h-3 w-3 text-white" />
                    </span>
                  )}
                  <div className="h-8 w-8 rounded-lg bg-muted grid place-items-center mb-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="font-semibold text-sm">Blank</p>
                  <p className="text-[11px] text-muted-foreground">
                    Start from scratch
                  </p>
                </div>

                {TEMPLATES.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => setTemplateId(t.id)}
                    className={`p-4 rounded-xl border-2 text-left transition cursor-pointer relative group ${
                      templateId === t.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/40"
                    }`}
                  >
                    {templateId === t.id && (
                      <span className="absolute top-2 right-2 h-5 w-5 bg-primary rounded-full grid place-items-center z-10">
                        <Check className="h-3 w-3 text-white" />
                      </span>
                    )}

                    {/* Preview button — only shows on hover */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviewId(t.id);
                      }}
                      className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 bg-background border border-border rounded-lg px-2 py-1 text-[10px] font-semibold shadow-sm hover:bg-muted z-10"
                    >
                      <Eye className="h-3 w-3" /> Preview
                    </button>

                    <div className="h-8 w-8 rounded-lg bg-primary/10 grid place-items-center mb-2 text-lg">
                      {t.emoji}
                    </div>
                    <p className="font-semibold text-sm">{t.label}</p>
                    <p className="text-[11px] text-muted-foreground">
                      {t.category}
                    </p>

                    {isTemplateImplemented(t.id) && (
                      <span className="inline-flex mt-1.5 text-[9px] bg-emerald-500/10 text-emerald-600 font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                        Ready
                      </span>
                    )}
                  </div>
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

          {/* ── Step 2: Name + slug ───────────────────────────────────────── */}
          {step === 2 && (
            <div className="p-6 space-y-5">
              {/* Selected template pill */}
              {templateId && (
                <div className="flex items-center gap-2 bg-primary/5 border border-primary/20 rounded-xl px-4 py-2.5">
                  <span className="text-lg">
                    {TEMPLATE_REGISTRY[templateId]?.emoji ?? "🌐"}
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-primary">
                      {TEMPLATE_REGISTRY[templateId]?.label ?? "Custom"}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {TEMPLATE_REGISTRY[templateId]?.category} template
                    </p>
                  </div>
                  <button
                    onClick={() => setStep(1)}
                    className="ml-auto text-[11px] text-muted-foreground hover:text-primary transition"
                  >
                    Change
                  </button>
                </div>
              )}

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
    </>
  );
}
