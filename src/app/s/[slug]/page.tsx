"use client";

import { useEffect, useState, use } from "react";
import { getSiteBySlug, trackSiteEvent } from "@/lib/firestore";

import SiteRenderer from "@/screen/s/SiteRenderer";
import { Loader2 } from "lucide-react";
import type { Site } from "@/lib/types";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function PublicSitePage({ params }: PageProps) {
  const { slug } = use(params);

  const [site, setSite] = useState<Site | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        const data = await getSiteBySlug(slug);

        if (data && data.status === "published") {
          setSite(data);

          const sessionKey = `visited_${slug}`;
          if (!sessionStorage.getItem(sessionKey)) {
            sessionStorage.setItem(sessionKey, "1");
            await trackSiteEvent(
              { id: data.id, uid: data.uid, slug: data.slug },
              "visit",
            );
          }
        } else {
          setSite(null);
        }
      } catch (err) {
        console.error("Public site load error:", err);
        setSite(null);
      } finally {
        setLoading(false);
      }
    }

    if (slug) load();
  }, [slug]);

  // ── Loading ─────────────────────────────
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <Loader2 className="animate-spin text-slate-500" />
      </div>
    );
  }

  // ── Not Found / Unpublished ─────────────
  if (!site) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-2xl font-bold">Site not available</h1>
        <p className="text-slate-500 mt-2">
          This site may be unpublished or doesn’t exist.
        </p>
      </div>
    );
  }

  // ── Renderer ────────────────────────────
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <SiteRenderer site={site} />
    </main>
  );
}
