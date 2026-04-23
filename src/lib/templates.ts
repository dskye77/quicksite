/* eslint-disable @typescript-eslint/no-explicit-any */
import Template_1, { Template_1_Display } from "@/assets/siteTemplates/Template_1";

// Define the structure for our template registry
interface TemplateRegistry {
  component: React.ComponentType<{ data: any; onUpdate: (updates: any) => void }>;
  display: React.ComponentType<{ data: any }>;
}

const TEMPLATE_MAP: Record<string, TemplateRegistry> = {
  "template-1": {
    component: Template_1,
    display: Template_1_Display,
  },
  // Future templates go here:
  // "template-2": { component: Template_2, display: Template_2_Display },
};

/**
 * Returns the editor component for a specific template type
 */
export function getTemplateEditor(type: string) {
  return TEMPLATE_MAP[type]?.component || null;
}

/**
 * Returns the public display component for a specific template type
 */
export function getTemplateDisplay(type: string) {
  return TEMPLATE_MAP[type]?.display || null;
}

/**
 * Validates if a template type exists
 */
export function isValidTemplate(type: string): boolean {
  return Object.prototype.hasOwnProperty.call(TEMPLATE_MAP, type);
}