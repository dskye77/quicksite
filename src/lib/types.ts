// src/lib/types.ts
import { Timestamp } from "firebase/firestore";

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  whatsappNumber?: string; // digits only, no +234 prefix
  defaultAuthor?: string;
  plan: "free" | "basic" | "growth" | "pro";
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
}

export type SiteStatus = "published" | "draft";

export interface Site {
  id: string;
  uid: string;
  name: string;
  slug: string; // makesite.com.ng/<slug>
  templateId: string;
  status: SiteStatus;
  visits: number;
  whatsappClicks: number;
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
  content: Record<string, unknown>;
}

export interface DashboardStats {
  totalVisits: number;
  totalWhatsappClicks: number;
  totalSites: number;
}