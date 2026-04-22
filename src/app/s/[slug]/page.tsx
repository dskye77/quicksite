"use client";

// src/app/s/[slug]/page.tsx
// Public site page. Fetches a site document from Firestore by slug,
// then renders the correct template component with the stored content.

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Site } from "@/lib/types";
import { Zap, AlertCircle } from "lucide-react";

// ── Template imports ──────────────────────────────────────────────────────────
import NaijaBitesTemplate from "@/features/templates/naija-bites/NaijaBitesTemplate";
import { defaultNaijaBitesContent } from "@/features/templates/naija-bites/defaultContent";
import type { NaijaBitesContent } from "@/features/templates/naija-bites/defaultContent";

// ── Loading screen ────────────────────────────────────────────────────────────
function LoadingScreen() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-primary grid place-items-center animate-pulse">
          <Zap className="h-5 w-5 text-white fill-white" />
        </div>
        <p className="text-sm text-muted-foreground">Loading your site…</p>
      </div>
    </div>
  );
}

// ── Not found screen ──────────────────────────────────────────────────────────
function NotFoundScreen({ slug }: { slug: string }) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 text-center gap-4">
      <div className="h-14 w-14 rounded-2xl bg-destructive/10 grid place-items-center">
        <AlertCircle className="h-7 w-7 text-destructive" />
      </div>
      <h1 className="text-2xl font-bold">Site not found</h1>
      <p className="text-muted-foreground text-sm max-w-xs">
        <span className="font-mono text-foreground">makesite.com.ng/{slug}</span> doesn&apos;t
        exist yet or may have been deleted.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-full h-10 px-6 text-sm font-semibold hover:opacity-90 transition mt-2"
      >
        <Zap className="h-4 w-4 fill-current" />
        Build your own site
      </Link>
    </div>
  );
}

// ── Unpublished screen ────────────────────────────────────────────────────────
function DraftScreen({ site }: { site: Site }) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 text-center gap-4">
      <div className="text-5xl">🚧</div>
      <h1 className="text-2xl font-bold">{site.name}</h1>
      <p className="text-muted-foreground text-sm max-w-xs">
        This site is not published yet. The owner is still setting things up.
      </p>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function PublicSitePage() {
  const params = useParams();
  const slug = typeof params?.slug === "string" ? params.slug : "";

  const [site, setSite] = useState<Site | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;

    async function fetchSite() {
      try {
        const q = query(collection(db, "sites"), where("slug", "==", slug));
        const snap = await getDocs(q);
        if (snap.empty) {
          setNotFound(true);
        } else {
          setSite({ id: snap.docs[0].id, ...snap.docs[0].data() } as Site);
        }
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }

    fetchSite();
  }, [slug]);

  if (loading) return <LoadingScreen />;
  if (notFound || !site) return <NotFoundScreen slug={slug} />;
  if (site.status !== "published") return <DraftScreen site={site} />;

  // ── Render template ─────────────────────────────────────────────────────────
  return <TemplateRenderer site={site} />;
}

// ── Template router ───────────────────────────────────────────────────────────
function TemplateRenderer({ site }: { site: Site }) {
  switch (site.templateId) {
    case "naija-bites": {
      // Merge stored content with defaults so new fields are always populated
      const content: NaijaBitesContent = {
        ...defaultNaijaBitesContent,
        ...(site.content as Partial<NaijaBitesContent>),
        // Always use the site name as the business name if not explicitly overridden in content
        businessName:
          (site.content as Partial<NaijaBitesContent>)?.businessName ??
          site.name,
      };
      return <NaijaBitesTemplate content={content} />;
    }

    default:
      return (
        <div className="min-h-screen flex items-center justify-center p-8 text-center">
          <div>
            <p className="text-4xl mb-4">🚧</p>
            <h2 className="text-xl font-bold mb-2">{site.name}</h2>
            <p className="text-muted-foreground text-sm">
              This template is coming soon.
            </p>
          </div>
        </div>
      );
  }
}