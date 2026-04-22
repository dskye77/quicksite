// src/lib/templateRegistry.ts
// Central registry of all available templates.
// Add entries here whenever a new template is created.

import type { NaijaBitesContent } from "@/features/templates/naija-bites/defaultContent";
import { defaultNaijaBitesContent } from "@/features/templates/naija-bites/defaultContent";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface TemplateInfo {
  id: string;
  label: string;
  category: string;
  description: string;
  emoji: string;
  /** Returns a fresh default content object for this template */
  getDefaultContent: () => Record<string, unknown>;
}

// ── Registry ──────────────────────────────────────────────────────────────────

export const TEMPLATE_REGISTRY: Record<string, TemplateInfo> = {
  "naija-bites": {
    id: "naija-bites",
    label: "Naija Bites",
    category: "Restaurant",
    description: "Hot menus, WhatsApp orders, beautiful restaurant site.",
    emoji: "🍲",
    getDefaultContent: () => ({ ...defaultNaijaBitesContent }),
  },
  // ── Stub entries (not yet built — will be added in future) ─────────────────
  "fashion-house": {
    id: "fashion-house",
    label: "FashionHouse",
    category: "Store",
    description: "Showcase collections in Ankara style.",
    emoji: "👗",
    getDefaultContent: () => ({}),
  },
  "glow-salon": {
    id: "glow-salon",
    label: "GlowSalon",
    category: "Service",
    description: "Bookings, services, gallery — all in one.",
    emoji: "💅",
    getDefaultContent: () => ({}),
  },
  "techfix": {
    id: "techfix",
    label: "TechFix",
    category: "Service",
    description: "Gadget repairs, pricing, and WhatsApp orders.",
    emoji: "🔧",
    getDefaultContent: () => ({}),
  },
  "freshmart": {
    id: "freshmart",
    label: "FreshMart",
    category: "Store",
    description: "Groceries and produce, order online.",
    emoji: "🥦",
    getDefaultContent: () => ({}),
  },
  "creative-port": {
    id: "creative-port",
    label: "CreativePort",
    category: "Portfolio",
    description: "Showcase your design or photography work.",
    emoji: "🎨",
    getDefaultContent: () => ({}),
  },
};

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Returns the default content for a template, or {} if not found. */
export function getDefaultContent(templateId: string): Record<string, unknown> {
  return TEMPLATE_REGISTRY[templateId]?.getDefaultContent() ?? {};
}

/** Whether a template is fully implemented (has a real renderer). */
export const IMPLEMENTED_TEMPLATES = new Set(["naija-bites"]);

export function isTemplateImplemented(templateId: string): boolean {
  return IMPLEMENTED_TEMPLATES.has(templateId);
}

// Type exports for convenience
export type { NaijaBitesContent };