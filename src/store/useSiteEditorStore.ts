// src/store/useSiteEditorStore.ts
import { create } from "zustand";
import {
  getPrivateSiteBySlug,
  updateSiteBySlug,
} from "@/lib/firestore";
import type { Site } from "@/lib/types";

interface SiteEditorState {
  site: Site | null;
  loading: boolean;
  isSaving: boolean;

  fetchSite: (uid: string, slug: string) => Promise<void>;
  updateSite: (updates: Partial<Site>) => void;
  saveSite: (uid: string) => Promise<void>;
  reset: () => void;
}

export const useSiteEditorStore = create<SiteEditorState>((set, get) => ({
  site: null,
  loading: true,
  isSaving: false,

  // 🔄 Load private site (editor)
  fetchSite: async (uid, slug) => {
    try {
      set({ loading: true });

      const data = await getPrivateSiteBySlug(uid, slug);

      if (!data) throw new Error("Site not found");

      set({ site: data });
    } catch (err) {
      console.error("Editor fetch error:", err);
      set({ site: null });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  // ✏️ Local updates only
  updateSite: (updates) => {
    const current = get().site;
    if (!current) return;

    set({
      site: { ...current, ...updates },
    });
  },

  // 💾 Save to backend
  saveSite: async (uid) => {
    const { site } = get();
    if (!site) return;

    try {
      set({ isSaving: true });

      await updateSiteBySlug(uid, site.slug, site);
    } catch (err) {
      console.error("Save error:", err);
      throw err;
    } finally {
      set({ isSaving: false });
    }
  },

  // 🧹 Reset editor state
  reset: () =>
    set({
      site: null,
      loading: true,
      isSaving: false,
    }),
}));