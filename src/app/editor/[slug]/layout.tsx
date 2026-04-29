"use client";

import { ReactNode } from "react";
import { useEffect, use } from "react";
import { useAuth } from "@/lib/useAuth";
import { useSiteEditorStore } from "@/store/useSiteEditorStore";
import { toast } from "sonner";

// Explicit types for layout props
interface EditorLayoutProps {
  children: ReactNode;
  params: Promise<{ slug: string; subslug?: string }>;
}

export default function EditorLayout({ children, params }: EditorLayoutProps) {
  const { user } = useAuth();
  // Unwrap params and type slug
  const { slug } = use(params) as { slug: string };

  const fetchSite = useSiteEditorStore((s) => s.fetchSite);
  const reset = useSiteEditorStore((s) => s.reset);

  useEffect(() => {
    if (!user?.uid) return;

    fetchSite(user.uid, slug).catch(() => {
      toast.error("Failed to load site");
    });

    return () => reset();
  }, [user, slug]);

  return <>{children}</>;
}
