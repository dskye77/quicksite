import type { TemplateOneContent } from "@/lib/types";

export const PRODUCTION_TEMPLATE_ID = "template-1" as const;

export interface TemplateMeta {
  id: string;
  title: string;
  category: string;
  description: string;
}

export const TEMPLATE_CATALOG: readonly TemplateMeta[] = [
  {
    id: PRODUCTION_TEMPLATE_ID,
    title: "Simple Online Catalogue",
    category: "Online Catalogue",
    description:
      "A lightweight product catalogue with WhatsApp-first conversion and mobile-friendly layout.",
  },
];

export function getTemplateMeta(templateId: string): TemplateMeta | null {
  return TEMPLATE_CATALOG.find((template) => template.id === templateId) ?? null;
}

export function createTemplateOneStarterContent(
  brandName: string,
): TemplateOneContent {
  return {
    category: "online-catalogue",
    brandName: brandName.trim() || "My Shop",
    headline: "Browse our latest catalogue",
    subheadline:
      "Fast delivery, trusted quality, and easy ordering on WhatsApp.",
    whatsappNumber: "",
    ctaLabel: "Order on WhatsApp",
    items: [
      {
        id: "item-1",
        name: "Featured Product",
        price: "₦0",
        description: "Add your product details, price, and image in the editor.",
        image: "",
      },
    ],
  };
}
