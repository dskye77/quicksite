/* eslint-disable @typescript-eslint/no-explicit-any */
// src/store/useDashboardStore.ts
// ─────────────────────────────────────────────────────────────
// Zustand dashboard store (Fully Integrated with Initialize)
// ─────────────────────────────────────────────────────────────

import { create } from "zustand";
import {
  getUserSites,
  getUserProfile,
  createSite,
  updateSite,
  deleteSite,
  createOrUpdateUserProfile,
  updateUserProfile,
  uploadProfilePhoto,
  getUserSiteLimit,
} from "@/lib/firestore";

import type { Site, UserProfile, DashboardStats } from "@/lib/types";
import { useId } from "react";

// ─────────────────────────────────────────────────────────────
// UI STATE
// ─────────────────────────────────────────────────────────────

interface UIState {
  createModalOpen: boolean;
  deleteConfirmId: string | null;
  sidebarOpen: boolean;
}

// ─────────────────────────────────────────────────────────────
// STORE STATE
// ─────────────────────────────────────────────────────────────

interface DashboardState {
  sites: Site[];
  profile: UserProfile | null;

  siteLimit: number;

  stats: DashboardStats;

  sitesLoading: boolean;
  profileLoading: boolean;
  sitesError: string | null;
  profileError: string | null;

  ui: UIState;

  // ── data actions
  /** * Orchestrates the initial data load for the dashboard.
   * Useful for client-side mounting or forced refreshes.
   */
  initialize: (uid: string) => Promise<void>;

  fetchSites: (uid: string) => Promise<void>;
  fetchProfile: (uid: string) => Promise<void>;

  addSite: (
    uid: string,
    data: Omit<
      Site,
      "id" | "uid" | "visits" | "whatsappClicks" | "createdAt" | "updatedAt"
    >,
  ) => Promise<string>;

  editSite: (
    siteId: string,
    data: Partial<Omit<Site, "id" | "uid" | "createdAt">>,
    uid: string,
  ) => Promise<void>;

  removeSite: (siteId: string, uid: string) => Promise<void>;

  toggleSiteStatus: (
    siteId: string,
    current: Site["status"],
    uid: string,
  ) => Promise<void>;

  saveProfile: (
    uid: string,
    data: Partial<Omit<UserProfile, "uid" | "createdAt">>,
  ) => Promise<void>;

  changeProfilePhoto: (uid: string, file: File) => Promise<void>;

  // ── UI actions
  setCreateModal: (open: boolean) => void;
  setDeleteConfirm: (siteId: string | null) => void;
  setSidebarOpen: (open: boolean) => void;

  reset: () => void;
}

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────

function getContentPublicIds(content: Record<string, any>): string[] {
  const ids: string[] = [];

  function walk(obj: any) {
    if (!obj || typeof obj !== "object") return;

    for (const [key, value] of Object.entries(obj)) {
      if (key.endsWith("PId") && typeof value === "string" && value) {
        ids.push(value);
      } else {
        walk(value);
      }
    }
  }

  walk(content);
  return ids;
}

function calcStats(sites: Site[], siteLimit: number): DashboardStats {
  return {
    totalVisits: sites.reduce((a, s) => a + (s.visits ?? 0), 0),
    totalWhatsappClicks: sites.reduce((a, s) => a + (s.whatsappClicks ?? 0), 0),
    totalSites: sites.length,
    sitesLeft: Math.max(siteLimit - sites.length, 0),
  };
}

// ─────────────────────────────────────────────────────────────
// INITIAL STATE
// ─────────────────────────────────────────────────────────────

const initialStats: DashboardStats = {
  totalVisits: 0,
  totalWhatsappClicks: 0,
  totalSites: 0,
  sitesLeft: 0,
};

const initialUI: UIState = {
  createModalOpen: false,
  deleteConfirmId: null,
  sidebarOpen: false,
};

// ─────────────────────────────────────────────────────────────
// STORE
// ─────────────────────────────────────────────────────────────

export const useDashboardStore = create<DashboardState>((set, get) => ({
  sites: [],
  profile: null,
  siteLimit: 0,
  stats: initialStats,
  sitesLoading: false,
  profileLoading: false,
  sitesError: null,
  profileError: null,
  ui: initialUI,

  // ─────────────────────────────────────────────────────────
  // INITIALIZE
  // ─────────────────────────────────────────────────────────

  initialize: async (uid: string) => {
    // Start both loading indicators
    set({
      sitesLoading: true,
      profileLoading: true,
      sitesError: null,
      profileError: null,
    });

    // Run fetches concurrently for performance
    // We use Settled to ensure one failing doesn't block the other
    await Promise.allSettled([get().fetchSites(uid), get().fetchProfile(uid)]);

    set({
      sitesLoading: false,
      profileLoading: false,
    });
  },

  // ─────────────────────────────────────────────────────────
  // FETCH SITES
  // ─────────────────────────────────────────────────────────

  fetchSites: async (uid) => {
    set({ sitesLoading: true, sitesError: null });

    try {
      const [sites, siteLimit] = await Promise.all([
        getUserSites(uid),
        getUserSiteLimit(uid),
      ]);

      set({
        sites,
        siteLimit,
        stats: calcStats(sites, siteLimit),
        sitesLoading: false,
      });
    } catch (e) {
      set({
        sitesError: (e as Error).message,
        sitesLoading: false,
      });
    }
  },

  // ─────────────────────────────────────────────────────────
  // FETCH PROFILE
  // ─────────────────────────────────────────────────────────

  fetchProfile: async (uid) => {
    set({ profileLoading: true, profileError: null });

    try {
      const profile = await getUserProfile(uid);
      set({ profile, profileLoading: false });
    } catch (e) {
      set({
        profileError: (e as Error).message,
        profileLoading: false,
      });
    }
  },

  // ─────────────────────────────────────────────────────────
  // ADD SITE
  // ─────────────────────────────────────────────────────────

  addSite: async (uid, data) => {
    const id = await createSite(uid, data);

    const newSite: Site = {
      id,
      uid,
      visits: 0,
      whatsappClicks: 0,
      createdAt: null,
      updatedAt: null,
      ...data,
    };

    set((state) => {
      const sites = [newSite, ...state.sites];

      return {
        sites,
        stats: calcStats(sites, state.siteLimit),
      };
    });

    return id;
  },

  // ─────────────────────────────────────────────────────────
  // EDIT SITE
  // ─────────────────────────────────────────────────────────

  editSite: async (siteId, data, uid) => {
    await updateSite(siteId, data, uid);

    set((state) => ({
      sites: state.sites.map((s) => (s.id === siteId ? { ...s, ...data } : s)),
    }));
  },

  // ─────────────────────────────────────────────────────────
  // REMOVE SITE
  // ─────────────────────────────────────────────────────────

  removeSite: async (siteId, uid) => {
    const site = get().sites.find((s) => s.id === siteId);
    const publicIds = getContentPublicIds((site as any)?.content ?? {});

    if (publicIds.length > 0) {
      await Promise.allSettled(
        publicIds.map((publicId) =>
          fetch("/api/imageDelete", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ publicId }),
          }),
        ),
      );
    }

    await deleteSite(siteId, uid);

    set((state) => {
      const sites = state.sites.filter((s) => s.id !== siteId);

      return {
        sites,
        stats: calcStats(sites, state.siteLimit),
        ui: { ...state.ui, deleteConfirmId: null },
      };
    });
  },

  // ─────────────────────────────────────────────────────────
  // TOGGLE STATUS
  // ─────────────────────────────────────────────────────────

  toggleSiteStatus: async (siteId, current, uid) => {
    const next = current === "published" ? "draft" : "published";

    await updateSite(siteId, { status: next }, uid);

    set((state) => ({
      sites: state.sites.map((s) =>
        s.id === siteId ? { ...s, status: next } : s,
      ),
    }));
  },

  // ─────────────────────────────────────────────────────────
  // PROFILE
  // ─────────────────────────────────────────────────────────

  saveProfile: async (uid, data) => {
    await createOrUpdateUserProfile(uid, data);

    set((state) => ({
      profile: state.profile ? { ...state.profile, ...data } : state.profile,
    }));
  },

  changeProfilePhoto: async (uid, file) => {
    const url = await uploadProfilePhoto(uid, file);

    await updateUserProfile(uid, { photoURL: url });

    set((state) => ({
      profile: state.profile
        ? { ...state.profile, photoURL: url }
        : state.profile,
    }));
  },

  // ─────────────────────────────────────────────────────────
  // UI ACTIONS
  // ─────────────────────────────────────────────────────────

  setCreateModal: (open) =>
    set((state) => ({
      ui: { ...state.ui, createModalOpen: open },
    })),

  setDeleteConfirm: (siteId) =>
    set((state) => ({
      ui: { ...state.ui, deleteConfirmId: siteId },
    })),

  setSidebarOpen: (open) =>
    set((state) => ({
      ui: { ...state.ui, sidebarOpen: open },
    })),

  // ─────────────────────────────────────────────────────────
  // RESET
  // ─────────────────────────────────────────────────────────

  reset: () =>
    set({
      sites: [],
      profile: null,
      siteLimit: 0,
      stats: initialStats,
      sitesLoading: false,
      profileLoading: false,
      sitesError: null,
      profileError: null,
      ui: initialUI,
    }),
}));
