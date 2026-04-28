"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { ArrowLeft } from "lucide-react";
import { getTemplateByType } from "@/lib/templates";
import { getTheme } from "@/lib/themes";

export default function TemplatesPreview({ type }: { type: string }) {
  const searchParams = useSearchParams();
  const paramsName = searchParams.get("name");
  const paramsSlug = searchParams.get("slug");
  const fromParam = searchParams.get("from");
  let from = "/";
  if (fromParam) {
    const queryParams: string[] = [];
    if (paramsName) {
      queryParams.push(`name=${encodeURIComponent(paramsName)}`);
    }
    if (paramsSlug) {
      queryParams.push(`slug=${encodeURIComponent(paramsSlug)}`);
    }
    from =
      fromParam + (queryParams.length > 0 ? `?${queryParams.join("&")}` : "");
  }

  const templateEntry = getTemplateByType(type);

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

  // Prepare arguments for starterContent: only add selectedTitle if provided
  const starterContentArgs: Record<string, string | undefined> = {};
  if (paramsName) {
    starterContentArgs.selectedTitle = paramsName;
  }

  const templateData = templateEntry.starterContent(starterContentArgs);

  // Build the 'use template' URL: only add provided params
  let useTemplateHref = `/dashboard/new?template=${encodeURIComponent(type)}`;
  const useQueryParams: string[] = [];
  if (paramsName) {
    useQueryParams.push(`name=${encodeURIComponent(paramsName)}`);
  }
  if (paramsSlug) {
    useQueryParams.push(`slug=${encodeURIComponent(paramsSlug)}`);
  }
  if (useQueryParams.length) {
    useTemplateHref += `&${useQueryParams.join("&")}`;
  }

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
          <Link href={useTemplateHref}>
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
