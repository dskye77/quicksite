// src/lib/firestore.ts
// ─────────────────────────────────────────────────────────────────────────────
// Single file for every Firestore + Storage operation in the app.
// Import from here — never write raw Firebase calls in components.
// ─────────────────────────────────────────────────────────────────────────────

import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import type { UserProfile, Site, DashboardStats } from "@/lib/types";

// ── User Profile ─────────────────────────────────────────────────────────────

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const snap = await getDoc(doc(db, "users", uid));
  if (!snap.exists()) return null;
  return snap.data() as UserProfile;
}

export async function createOrUpdateUserProfile(
  uid: string,
  data: Partial<Omit<UserProfile, "uid" | "createdAt">>
): Promise<void> {
  const docRef = doc(db, "users", uid);
  const snap = await getDoc(docRef);
  if (!snap.exists()) {
    await setDoc(docRef, {
      uid,
      plan: "free",
      whatsappNumber: "",
      defaultAuthor: "",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      ...data,
    });
  } else {
    await updateDoc(docRef, { ...data, updatedAt: serverTimestamp() });
  }
}

export async function updateUserProfile(
  uid: string,
  data: Partial<Omit<UserProfile, "uid" | "createdAt" | "updatedAt">>
): Promise<void> {
  await updateDoc(doc(db, "users", uid), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function uploadProfilePhoto(uid: string, file: File): Promise<string> {
  const storageRef = ref(storage, `profile-photos/${uid}`);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}

// ── Sites ─────────────────────────────────────────────────────────────────────

export async function getUserSites(uid: string): Promise<Site[]> {
  const q = query(collection(db, "sites"), where("uid", "==", uid));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Site));
}

export async function getSite(siteId: string): Promise<Site | null> {
  const snap = await getDoc(doc(db, "sites", siteId));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as Site;
}

export async function createSite(
  uid: string,
  data: Omit<Site, "id" | "uid" | "visits" | "whatsappClicks" | "createdAt" | "updatedAt">
): Promise<string> {
  const newRef = doc(collection(db, "sites"));
  await setDoc(newRef, {
    uid,
    visits: 0,
    whatsappClicks: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    ...data,
  });
  return newRef.id;
}

export async function updateSite(
  siteId: string,
  data: Partial<Omit<Site, "id" | "uid" | "createdAt">>
): Promise<void> {
  await updateDoc(doc(db, "sites", siteId), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteSite(siteId: string): Promise<void> {
  await deleteDoc(doc(db, "sites", siteId));
}

export async function isSlugTaken(slug: string, excludeSiteId?: string): Promise<boolean> {
  const q = query(collection(db, "sites"), where("slug", "==", slug));
  const snap = await getDocs(q);
  return snap.docs.some((d) => d.id !== excludeSiteId);
}

// ── Analytics ─────────────────────────────────────────────────────────────────

export async function getDashboardStats(uid: string): Promise<DashboardStats> {
  const sites = await getUserSites(uid);
  return {
    totalVisits: sites.reduce((a, s) => a + (s.visits ?? 0), 0),
    totalWhatsappClicks: sites.reduce((a, s) => a + (s.whatsappClicks ?? 0), 0),
    totalSites: sites.length,
  };
}