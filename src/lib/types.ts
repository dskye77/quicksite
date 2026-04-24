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
  type?: string;
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

export type AnalyticsEventType = "visit" | "whatsapp_click";

export interface AnalyticsEvent {
  id: string;
  uid: string;
  siteId: string;
  siteSlug: string;
  type: AnalyticsEventType;
  createdAt: string | null;
}

export interface CatalogueItem {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
}

export interface TemplateOneContent {
  category: "online-catalogue";
  brandName: string;
  headline: string;
  subheadline: string;
  whatsappNumber: string;
  ctaLabel: string;
  items: CatalogueItem[];
}