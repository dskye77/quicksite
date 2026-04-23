"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createSite, isSlugTaken } from "@/lib/firestore";
import { useAuth } from "@/hooks/useAuth";
import { templatePresets } from "@/assets/templatePresets";
import { Layout, Globe, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";

const AVAILABLE_TEMPLATES = [
  {
    type: "template-1",
    name: "Modern Hero",
    description: "Clean, bold, and high-conversion.",
  },
  // Add more as you create them
];

export default function CreateSitePage() {
  const router = useRouter();
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    type: "template-1",
  });

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    setFormData({ ...formData, slug: val });
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return toast.error("Please login first");

    setLoading(true);
    try {
      // 1. Validate Slug
      const taken = await isSlugTaken(formData.slug);
      if (taken) {
        setLoading(false);
        return toast.error("This URL is already taken.");
      }

      // 2. Get the Preset Data for the selected template
      const presetData = templatePresets[formData.type] || {};

      // 3. Construct the Final Object
      const sitePayload = {
        name: formData.name,
        slug: formData.slug,
        ...presetData, // Inject all default text/images from presets
        updatedAt: new Date(),
      };

      // 4. Save to Firebase
      const newSiteId = await createSite(user.uid, sitePayload);

      toast.success("Site initialized!");

      // 5. Route to Editor
      router.push(`/editor/${newSiteId}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to create site.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-black tracking-tight">
          Launch Something New
        </h1>
        <p className="text-slate-500 mt-2 text-lg">
          Pick a name and a template to get started.
        </p>
      </div>

      <form onSubmit={handleCreate} className="grid md:grid-cols-3 gap-8">
        {/* Left: Inputs */}
        <div className="md:col-span-2 space-y-6 bg-card p-8 rounded-3xl border shadow-sm">
          <div className="space-y-4">
            <label className="block">
              <span className="text-sm font-bold ml-1">Site Name</span>
              <input
                required
                type="text"
                className="w-full mt-1 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary outline-none transition-all"
                placeholder="My Business Page"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </label>

            <label className="block">
              <span className="text-sm font-bold ml-1">Desired URL</span>
              <div className="flex mt-1">
                <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 bg-slate-50 text-slate-400 text-sm">
                  makesite.com/
                </span>
                <input
                  required
                  type="text"
                  className="flex-1 px-4 py-3 rounded-r-xl border border-slate-200 focus:ring-2 focus:ring-primary outline-none transition-all"
                  placeholder="my-site"
                  value={formData.slug}
                  onChange={handleSlugChange}
                />
              </div>
            </label>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-primary text-primary-foreground rounded-2xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  Create Site <ArrowRight size={20} />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right: Template Picker */}
        <div className="space-y-4">
          <p className="text-sm font-bold ml-1">Select Template</p>
          <div className="grid gap-4">
            {AVAILABLE_TEMPLATES.map((t) => (
              <div
                key={t.type}
                onClick={() => setFormData({ ...formData, type: t.type })}
                className={`relative p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  formData.type === t.type
                    ? "border-primary bg-primary/5"
                    : "border-slate-100 hover:border-slate-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg border shadow-sm">
                    <Layout
                      size={18}
                      className={
                        formData.type === t.type
                          ? "text-primary"
                          : "text-slate-400"
                      }
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">{t.name}</h3>
                    <p className="text-[10px] text-slate-500">
                      {t.description}
                    </p>
                  </div>
                </div>
                {formData.type === t.type && (
                  <CheckCircle2
                    className="absolute top-2 right-2 text-primary"
                    size={16}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}
