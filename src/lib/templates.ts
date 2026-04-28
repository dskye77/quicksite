/* eslint-disable @typescript-eslint/no-explicit-any */
// @/assets/siteTemplates/templatesRegistry.tsx

import { template1 } from "@/components/siteTemplates/template_1/index";

/* -------------- TEMPLATES TYPES ---------------- */
export interface TemplateProps {
  isEditor: boolean;
  content: AnyObject;
  onUpdate?: (path: string, value: any) => void;
}
export interface TemplateComponentProps {
  isEditor: boolean;
  content: AnyObject;
  onUpdate: (path: string, value: any) => void;
}
/* ---------------- TYPES ---------------- */

type AnyObject = Record<string, any>;

/* ---------------- REGISTRY ---------------- */

export const templatesRegistry = [template1];

export const templatesCategories = ["Landing Page"];

export const getTemplateByType = (type: string) =>
  templatesRegistry.find((t) => t.type === type);

export const isValidTemplate = (type: string) => !!getTemplateByType(type);
