// src/store/useDashboardStore.ts
// ─────────────────────────────────────────────────────────────────────────────
// Zustand — single source of truth for ALL dashboard state.
// Covers: sites, profile, stats, UI state (modals, active site).
// ─────────────────────────────────────────────────────────────────────────────
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
} from "@/lib/firestore";
import type { Site, UserProfile, DashboardStats } from "@/lib/types";

// ── State shape ───────────────────────────────────────────────────────────────

interface UIState {
  createModalOpen: boolean;
  deleteConfirmId: string | null; // siteId pending deletion
  sidebarOpen: boolean; // mobile sidebar toggle
}

interface DashboardState {
  // ── Data ──────────────────────────────────────────────────────────────────
  sites: Site[];
  profile: UserProfile | null;
  stats: DashboardStats;

  // ── Loading / error ───────────────────────────────────────────────────────
  sitesLoading: boolean;
  profileLoading: boolean;
  sitesError: string | null;
  profileError: string | null;

  // ── UI ────────────────────────────────────────────────────────────────────
  ui: UIState;

  // ── Actions: data ─────────────────────────────────────────────────────────
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
  ) => Promise<void>;
  removeSite: (siteId: string) => Promise<void>;
  toggleSiteStatus: (siteId: string, current: Site["status"]) => Promise<void>;
  saveProfile: (
    uid: string,
    data: Partial<Omit<UserProfile, "uid" | "createdAt">>,
  ) => Promise<void>;
  changeProfilePhoto: (uid: string, file: File) => Promise<void>;

  // ── Actions: UI ───────────────────────────────────────────────────────────
  setCreateModal: (open: boolean) => void;
  setDeleteConfirm: (siteId: string | null) => void;
  setSidebarOpen: (open: boolean) => void;

  // ── Reset ─────────────────────────────────────────────────────────────────
  reset: () => void;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function calcStats(sites: Site[]): DashboardStats {
  return {
    totalVisits: sites.reduce((a, s) => a + (s.visits ?? 0), 0),
    totalWhatsappClicks: sites.reduce((a, s) => a + (s.whatsappClicks ?? 0), 0),
    totalSites: sites.length,
  };
}

const initialStats: DashboardStats = {
  totalVisits: 0,
  totalWhatsappClicks: 0,
  totalSites: 0,
};

const initialUI: UIState = {
  createModalOpen: false,
  deleteConfirmId: null,
  sidebarOpen: false,
};

// ── Store ─────────────────────────────────────────────────────────────────────

export const useDashboardStore = create<DashboardState>((set, get) => ({
  sites: [],
  profile: null,
  stats: initialStats,
  sitesLoading: false,
  profileLoading: false,
  sitesError: null,
  profileError: null,
  ui: initialUI,

  // ── Fetch ──────────────────────────────────────────────────────────────────

  fetchSites: async (uid) => {
    set({ sitesLoading: true, sitesError: null });
    try {
      const sites = await getUserSites(uid);
      set({ sites, stats: calcStats(sites), sitesLoading: false });
    } catch (e) {
      set({ sitesError: (e as Error).message, sitesLoading: false });
    }
  },

  fetchProfile: async (uid) => {
    set({ profileLoading: true, profileError: null });
    try {
      const profile = await getUserProfile(uid);
      set({ profile, profileLoading: false });
    } catch (e) {
      set({ profileError: (e as Error).message, profileLoading: false });
    }
  },

  // ── Sites CRUD ─────────────────────────────────────────────────────────────

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
      return { sites, stats: calcStats(sites) };
    });
    return id;
  },

  editSite: async (siteId, data) => {
    await updateSite(siteId, data);
    set((state) => ({
      sites: state.sites.map((s) => (s.id === siteId ? { ...s, ...data } : s)),
    }));
  },

  removeSite: async (siteId) => {
    await deleteSite(siteId);
    set((state) => {
      const sites = state.sites.filter((s) => s.id !== siteId);
      return {
        sites,
        stats: calcStats(sites),
        ui: { ...state.ui, deleteConfirmId: null },
      };
    });
  },

  toggleSiteStatus: async (siteId, current) => {
    const next = current === "published" ? "draft" : "published";
    await updateSite(siteId, { status: next });
    set((state) => ({
      sites: state.sites.map((s) =>
        s.id === siteId ? { ...s, status: next } : s,
      ),
    }));
  },

  // ── Profile ────────────────────────────────────────────────────────────────

  saveProfile: async (uid, data) => {
    await createOrUpdateUserProfile(uid, data);
    set((state) => ({
      profile: state.profile ? { ...state.profile, ...data } : null,
    }));
  },

  changeProfilePhoto: async (uid, file) => {
    const url = await uploadProfilePhoto(uid, file);
    await updateUserProfile(uid, { photoURL: url });
    set((state) => ({
      profile: state.profile ? { ...state.profile, photoURL: url } : null,
    }));
  },

  // ── UI ─────────────────────────────────────────────────────────────────────

  setCreateModal: (open) =>
    set((state) => ({ ui: { ...state.ui, createModalOpen: open } })),

  setDeleteConfirm: (siteId) =>
    set((state) => ({ ui: { ...state.ui, deleteConfirmId: siteId } })),

  setSidebarOpen: (open) =>
    set((state) => ({ ui: { ...state.ui, sidebarOpen: open } })),

  // ── Reset ──────────────────────────────────────────────────────────────────

  reset: () =>
    set({
      sites: [],
      profile: null,
      stats: initialStats,
      sitesLoading: false,
      profileLoading: false,
      sitesError: null,
      profileError: null,
      ui: initialUI,
    }),
}));
