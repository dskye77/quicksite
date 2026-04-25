/* eslint-disable @typescript-eslint/no-explicit-any */
// @/assets/siteTemplates/templatesRegistry.tsx

import Template1, {
  template1StarterContent,
  template1Meta,
} from "@/assets/siteTemplates/template_1/index";

import type { ComponentType } from "react";

/* -------------- TEMPLATES TYPES ---------------- */
export interface TemplateProps {
  isEditor: boolean;
  content: AnyObject;
  onUpdate: (path: string, value: any) => void;
}
export interface TemplateComponentProps {
  isEditor: boolean;
  content: AnyObject;
  onUpdate: (path: string, value: any) => void;
}
/* ---------------- TYPES ---------------- */

type AnyObject = Record<string, any>;

export interface TemplateMeta {
  type: string;
  title: string;
  category: string;
  description: string;
}

export interface TemplateRegistryItem {
  id: string;
  template: ComponentType<any>;
  meta: TemplateMeta;
  starterContent: (selectedTitle: string) => any;
}

/* ---------------- REGISTRY ---------------- */

export const templatesRegistry: Record<string, TemplateRegistryItem> = {
  "template-1": {
    id: "template-1",
    template: Template1,
    meta: { type: "template-1", ...template1Meta },

    starterContent: () => template1StarterContent,
  },
};

export const templatesMetaRegistryArray: TemplateMeta[] = [
  { type: "template-1", ...template1Meta },
  { type: "template-2", ...template1Meta },
];

export function isValidTemplate(type: string): boolean {
  return !!templatesRegistry[type];
}
