// src/store/useSiteDisplayStore.ts
import { create } from "zustand";
import { getSiteBySlug as fetchPublicSiteBySlug } from "@/lib/firestore";
import type { Site } from "@/lib/types";

interface SiteDisplayState {
  site: Site | null;
  loading: boolean;

  fetchPublicSite: (slug: string) => Promise<void>;
  reset: () => void;
}

export const useSiteDisplayStore = create<SiteDisplayState>((set) => ({
  site: null,
  loading: true,

  // 🌐 Load public site (visitor view)
  fetchPublicSite: async (slug) => {
    try {
      set({ loading: true });

      const data = await fetchPublicSiteBySlug(slug);

      set({ site: data ?? null });
    } catch (err) {
      console.error("Public fetch error:", err);
      set({ site: null });
    } finally {
      set({ loading: false });
    }
  },

  // 🧹 Reset public state
  reset: () =>
    set({
      site: null,
      loading: true,
    }),
}));
