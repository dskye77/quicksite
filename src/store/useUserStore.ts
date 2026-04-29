/* eslint-disable @typescript-eslint/no-explicit-any */
// src/store/useUserStore.ts

import { create } from "zustand";
import {
  getUserProfile,
  createOrUpdateUserProfile,
  updateUserProfile,
  uploadProfilePhoto,
} from "@/lib/firestore";
import type { UserProfile } from "@/lib/types";

interface UserState {
  profile: UserProfile | null;

  isLoading: boolean;
  isSaving: boolean;
  error: string | null;

  // ── Actions ─────────────────────────────────────
  fetchProfile: (uid: string) => Promise<void>;
  refreshProfile: (uid: string) => Promise<void>;
  updateProfile: (
    uid: string,
    data: Partial<Omit<UserProfile, "uid" | "createdAt" | "updatedAt">>,
  ) => Promise<void>;
  uploadPhoto: (uid: string, file: File) => Promise<string | null>;

  clearUser: () => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  profile: null,

  isLoading: false,
  isSaving: false,
  error: null,

  // ── Fetch user (with auto-create fallback) ──────
  fetchProfile: async (uid) => {
    if (!uid) return;

    set({ isLoading: true, error: null });

    try {
      let profile = await getUserProfile(uid);

      // Auto-create profile if it doesn't exist
      if (!profile) {
        await createOrUpdateUserProfile(uid, {});
        profile = await getUserProfile(uid);
      }

      set({ profile: profile });
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch user" });
    } finally {
      set({ isLoading: false });
    }
  },

  // ── Force refresh (no caching logic yet) ────────
  refreshProfile: async (uid) => {
    if (!uid) return;

    try {
      const profile = await getUserProfile(uid);
      set({ profile: profile });
    } catch (err: any) {
      set({ error: err.message || "Failed to refresh user" });
    }
  },

  // ── Update profile ──────────────────────────────
  updateProfile: async (uid, data) => {
    if (!uid) return;

    set({ isSaving: true, error: null });

    try {
      await updateUserProfile(uid, data);

      // optimistic update
      set((state) => ({
        profile: state.profile ? { ...state.profile, ...data } : state.profile,
      }));
    } catch (err: any) {
      set({ error: err.message || "Failed to update user" });
    } finally {
      set({ isSaving: false });
    }
  },

  // ── Upload profile photo ────────────────────────
  uploadPhoto: async (uid, file) => {
    if (!uid) return null;

    set({ isSaving: true, error: null });

    try {
      const url = await uploadProfilePhoto(uid, file);

      // Save URL to profile
      await updateUserProfile(uid, { photoURL: url });

      set((state) => ({
        profile: state.profile ? { ...state.profile, photoURL: url } : state.profile,
      }));

      return url;
    } catch (err: any) {
      set({ error: err.message || "Upload failed" });
      return null;
    } finally {
      set({ isSaving: false });
    }
  },

  // ── Clear (on logout) ───────────────────────────
  clearUser: () => {
    set({ profile: null, error: null });
  },
}));
