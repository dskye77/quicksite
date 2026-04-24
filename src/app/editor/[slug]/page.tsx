"use client";

import { useEffect, useState, use } from "react";
import { getSiteBySlug, updateSiteBySlug } from "@/lib/firestore";
import EditorScreen from "@/features/editor/EditorScreen";
import { toast } from "sonner";
import { Loader2, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Site } from "@/lib/types";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function SiteEditorPage({ params }: PageProps) {
  // Unwrap params for Next.js 15
  const resolvedParams = use(params);
  const siteSlug = resolvedParams.slug;

  const [siteData, setSiteData] = useState<Site | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Load site data from Firestore
  useEffect(() => {
    async function loadSite() {
      try {
        setLoading(true);
        const data = await getSiteBySlug(siteSlug);

        if (data) {
          setSiteData(data);
        } else {
          toast.error("Site not found in database.");
        }
      } catch (error) {
        console.error("Editor Load Error:", error);
        toast.error("Failed to connect to Firestore.");
      } finally {
        setLoading(false);
      }
    }

    if (siteSlug) loadSite();
  }, [siteSlug]);

  // Save updated state to Firestore
  const handleSave = async () => {
    if (!siteData) return;

    setIsSaving(true);
    try {
      await updateSiteBySlug(siteSlug, {
        name: siteData.name,
        slug: siteData.slug,
        type: siteData.type,
        templateId: siteData.templateId,
        status: siteData.status,
        content: siteData.content,
      });
      toast.success("All changes saved!");
    } catch (error) {
      console.error("Save Error:", error);
      toast.error("Could not save changes.");
    } finally {
      setIsSaving(false);
    }
  };

  // ── Loading State ──────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-50 gap-4">
        <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
        <p className="text-slate-500 font-medium">Powering up the editor...</p>
      </div>
    );
  }

  // ── Error State ────────────────────────────────────────────────────
  if (!siteData) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center gap-4">
        <h2 className="text-xl font-bold">Site Not Found</h2>
        <Link href="/dashboard" className="text-blue-600 hover:underline">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  // ── Success State ──────────────────────────────────────────────────
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Editor Toolbar */}
      <header className="h-16 border-b bg-white flex items-center justify-between px-6 shrink-0 z-50 shadow-sm">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/sites"
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="font-bold text-slate-900 leading-none">
              {siteData.name || "Untitled Site"}
            </h1>
            <p className="text-[10px] text-slate-400 font-mono mt-1 uppercase tracking-wider">
              Mode: Editing {siteData.id}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 italic hidden sm:block">
            Auto-save is disabled
          </span>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 bg-primary text-white px-5 py-2 rounded-full font-bold text-sm transition-all shadow-md active:scale-95 disabled:opacity-50"
          >
            {isSaving ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Save size={16} />
            )}
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </header>

      {/* Editor Workspace */}
      <main className="flex-1 overflow-y-auto bg-slate-100 p-4 md:p-8">
        <div className="max-w-300 mx-auto min-h-full">
          <EditorScreen
            data={siteData}
            onChange={(updated) => setSiteData(updated)}
          />
        </div>
      </main>
    </div>
  );
}
