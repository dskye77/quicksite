"use client";

import { ReactNode } from "react";
import { useEffect, use } from "react";
import { useSiteDisplayStore } from "@/store/useSiteDisplayStore";
import { toast } from "sonner";

// Explicit types for layout props
interface EditorLayoutProps {
  children: ReactNode;
  params: Promise<{ slug: string; subslug?: string }>;
}

export default function EditorLayout({ children, params }: EditorLayoutProps) {
  const { slug } = use(params) as { slug: string };

  const fetchPublicSite = useSiteDisplayStore((s) => s.fetchPublicSite);
  const reset = useSiteDisplayStore((s) => s.reset);

  useEffect(() => {
    fetchPublicSite(slug).catch(() => {
      toast.error("Failed to load site");
    });

    return () => reset();
  }, [slug]);

  return <>{children}</>;
}
