/* eslint-disable @typescript-eslint/no-explicit-any */
// src/lib/firestore.ts
// ─────────────────────────────────────────────────────────────────────────────

import {
  addDoc,
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
  increment,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import type {
  UserProfile,
  Site,
  DashboardStats,
  AnalyticsEvent,
  AnalyticsEventType,
} from "@/lib/types";

// ── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Converts Firestore Timestamps to ISO strings to make data serializable
 * for Next.js Client Components.
 */
function serializeData<T>(data: any): T {
  if (!data) return data;

  const serialized = { ...data };

  Object.keys(serialized).forEach((key) => {
    const value = serialized[key];
    // Check if it's a Firestore Timestamp (has toDate method)
    if (
      value &&
      typeof value === "object" &&
      typeof value.toDate === "function"
    ) {
      serialized[key] = value.toDate().toISOString();
    } else if (Array.isArray(value)) {
      serialized[key] = value.map((item) =>
        typeof item === "object" ? serializeData(item) : item,
      );
    }
  });

  return serialized as T;
}

// ── User Profile ─────────────────────────────────────────────────────────────

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const snap = await getDoc(doc(db, "users", uid));
  if (!snap.exists()) return null;
  return serializeData<UserProfile>(snap.data());
}

export async function createOrUpdateUserProfile(
  uid: string,
  data: Partial<Omit<UserProfile, "uid" | "createdAt">>,
): Promise<void> {
  const docRef = doc(db, "users", uid);
  const snap = await getDoc(docRef);

  if (!snap.exists()) {
    await setDoc(docRef, {
      uid,
      plan: "free",
      maxSites: 3, // ← NEW
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
  data: Partial<Omit<UserProfile, "uid" | "createdAt" | "updatedAt">>,
): Promise<void> {
  await updateDoc(doc(db, "users", uid), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function uploadProfilePhoto(
  uid: string,
  file: File,
): Promise<string> {
  const storageRef = ref(storage, `profile-photos/${uid}`);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}

// ── Sites ─────────────────────────────────────────────────────────────────────

export async function getUserSites(uid: string): Promise<Site[]> {
  const q = query(collection(db, "sites"), where("uid", "==", uid));
  const snap = await getDocs(q);
  return snap.docs.map((d) => serializeData<Site>({ id: d.id, ...d.data() }));
}

export async function getSite(siteId: string): Promise<Site | null> {
  if (!siteId) return null;
  const snap = await getDoc(doc(db, "sites", siteId));
  if (!snap.exists()) return null;
  return serializeData<Site>({ id: snap.id, ...snap.data() });
}

/**
 * PUBLIC: Fetches a published site by slug only. No uid required.
 * Used on the public /s/[slug] page.
 */
export async function getSiteBySlug(slug: string): Promise<Site | null> {
  if (!slug) return null;

  const q = query(
    collection(db, "sites"),
    where("slug", "==", slug),
    where("status", "==", "published")
  );
  const snap = await getDocs(q);
  if (snap.empty) return null;

  const d = snap.docs[0];
  return serializeData<Site>({ id: d.id, ...d.data() });
}

/**
 * PRIVATE: Fetches a site by slug for the owner (uid required).
 * Used in the editor and dashboard. Returns draft or published.
 */
export async function getPrivateSiteBySlug(
  uid: string,
  slug: string
): Promise<Site | null> {
  if (!slug || !uid) return null;

  const q = query(
    collection(db, "sites"),
    where("slug", "==", slug),
    where("uid", "==", uid)
  );
  const snap = await getDocs(q);
  if (snap.empty) return null;

  const d = snap.docs[0];
  return serializeData<Site>({ id: d.id, ...d.data() });
}
export async function getUserSiteLimit(uid: string): Promise<number> {
  const profile = await getUserProfile(uid);
  if (!profile) return 3; // default to free

  // For now, enforce 3 for free plan. Later you can map plan → limit
  if (profile.plan === "free") return 3;
  return profile.maxSites || 10; // fallback for paid plans
}

export async function getUserSitesCount(uid: string): Promise<number> {
  const q = query(collection(db, "sites"), where("uid", "==", uid));
  const snap = await getDocs(q);
  return snap.size;
}

export async function createSite(
  uid: string,
  data: Omit<
    Site,
    "id" | "uid" | "visits" | "whatsappClicks" | "createdAt" | "updatedAt"
  >,
): Promise<string> {
  // 1. Check limit
  const currentCount = await getUserSitesCount(uid);
  const limit = await getUserSiteLimit(uid);

  if (currentCount >= limit) {
    throw new Error(`You have reached your limit of ${limit} sites.`);
  }

  // 2. Create the site
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

/**
 * Update a site only if the provided uid matches the site's uid.
 * This prevents one user from updating another user's site.
 */
export async function updateSite(
  siteId: string,
  data: Partial<Omit<Site, "id" | "uid" | "createdAt">>,
  uid: string // <-- enforce uid
): Promise<void> {
  if (!siteId) throw new Error("Site ID is required.");
  const snap = await getDoc(doc(db, "sites", siteId));
  if (!snap.exists()) throw new Error("Site not found");
  const siteData = snap.data();
  if (siteData.uid !== uid) throw new Error("Permission denied.");

  await updateDoc(doc(db, "sites", siteId), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Update a site by slug, but require calling user to own the site (match on uid).
 */
export async function updateSiteBySlug(
  uid: string,
  slug: string,
  data: Partial<Omit<Site, "id" | "uid" | "createdAt">>
): Promise<void> {
  // Only update if site with uid+slug is found (the user's site)
  const q = query(
    collection(db, "sites"),
    where("slug", "==", slug),
    where("uid", "==", uid)
  );
  const snap = await getDocs(q);
  if (snap.empty) throw new Error("Site not found for slug: " + slug);
  await updateDoc(doc(db, "sites", snap.docs[0].id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Delete a site only if the provided uid matches the site's uid.
 * Otherwise throw permission error.
 */
export async function deleteSite(siteId: string, uid: string): Promise<void> {
  const snap = await getDoc(doc(db, "sites", siteId));
  if (!snap.exists()) throw new Error("Site not found");
  const siteData = snap.data();
  if (siteData.uid !== uid) throw new Error("Permission denied.");
  await deleteDoc(doc(db, "sites", siteId));
}

/**
 * Find a siteId (doc.id) for a slug, optionally filtered by UID.
 * If a uid is provided, only return the siteId if the uid matches.
 */
export async function getSiteIdBySlug(
  slug: string,
  uid?: string
): Promise<string | null> {
  let q;
  if (uid) {
    q = query(collection(db, "sites"), where("slug", "==", slug), where("uid", "==", uid));
  } else {
    q = query(collection(db, "sites"), where("slug", "==", slug));
  }
  const snap = await getDocs(q);
  if (snap.empty) return null;
  return snap.docs[0].id;
}

export async function isSlugTaken(
  slug: string,
  excludeSiteId?: string,
): Promise<boolean> {
  const q = query(collection(db, "sites"), where("slug", "==", slug));
  const snap = await getDocs(q);
  return snap.docs.some((d) => d.id !== excludeSiteId);
}

// ── Analytics ─────────────────────────────────────────────────────────────────

export async function getDashboardStats(uid: string): Promise<DashboardStats> {
  const sites = await getUserSites(uid);
  const siteLimit = await getUserSiteLimit(uid);
  return {
    totalVisits: sites.reduce((a, s) => a + (s.visits ?? 0), 0),
    totalWhatsappClicks: sites.reduce((a, s) => a + (s.whatsappClicks ?? 0), 0),
    totalSites: sites.length,
    sitesLeft: siteLimit - sites.length,
  };
}

export async function trackSiteEvent(
  site: Pick<Site, "id" | "uid" | "slug">,
  type: AnalyticsEventType,
): Promise<void> {
  // Only increment analytics if site belongs to correct uid
  const snap = await getDoc(doc(db, "sites", site.id));
  if (!snap.exists()) throw new Error("Site not found");
  if (snap.data().uid !== site.uid) throw new Error("Permission denied.");

  const metricField = type === "visit" ? "visits" : "whatsappClicks";

  await updateDoc(doc(db, "sites", site.id), {
    [metricField]: increment(1),
    updatedAt: serverTimestamp(),
  });

  await addDoc(collection(db, "analytics_events"), {
    uid: site.uid,
    siteId: site.id,
    siteSlug: site.slug,
    type,
    createdAt: serverTimestamp(),
  });
}

export async function getAnalyticsEventsForUser(
  uid: string,
): Promise<AnalyticsEvent[]> {
  const q = query(collection(db, "analytics_events"), where("uid", "==", uid));
  const snap = await getDocs(q);
  return snap.docs.map((d) =>
    serializeData<AnalyticsEvent>({ id: d.id, ...d.data() }),
  );
}

// ---- Firestore Security Rules (cut/paste below into Firestore rules editor) ----
/*

*/