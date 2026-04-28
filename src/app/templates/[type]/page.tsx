"use client";

import { use } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import { ArrowLeft } from "lucide-react";
import { templatesRegistry } from "@/lib/templates";
import { getTheme } from "@/lib/themes";

interface PageProps {
  params: Promise<{
    type: string;
  }>;
}

export default function TemplatesSitePage({ params }: PageProps) {
  const { type } = use(params);

  const searchParams = useSearchParams();
  const paramsName = searchParams.get("name") || "";
  const paramsSlug = searchParams.get("slug") || "";

  const from =
    searchParams.get("from") + `?name=${paramsName}&slug=${paramsSlug}` || "/";

  const templateEntry = templatesRegistry[type];

  // ── Not Found ──────────────────────────────
  if (!templateEntry) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-2xl font-bold">Site not available</h1>
        <p className="text-slate-500 mt-2">This template is not found</p>
      </div>
    );
  }

  const themeName = templateEntry.config.theme;
  const theme = getTheme(themeName);
  const Template = templateEntry.template;
  const templateData = templateEntry.starterContent("");

  // ── Renderer ────────────────────────────
  return (
    <div className="min-h-screen bg-white text-slate-900 ">
      <style>{theme.css}</style>
      {/* Preview Toolbar */}
      <header className="h-16 border-b bg-white flex items-center justify-between px-6 shrink-0 z-50 shadow-sm">
        <div className="flex items-center gap-4">
          <Link
            href={from}
            className="flex  p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/dashboard/new?template=${type}&name=${paramsName}&slug=${paramsSlug}`}
          >
            <button className="flex items-center gap-2 bg-primary text-white px-5 py-2 rounded-full font-bold text-sm transition-all shadow-md active:scale-95 disabled:opacity-50">
              use template
            </button>
          </Link>
        </div>
      </header>
      <div>
        <Template isEditor={false} content={templateData} />
      </div>
    </div>
  );
}
