/* eslint-disable @typescript-eslint/no-explicit-any */
// Site Templates Registry

import type { Site } from "@/lib/types";
import TemplateEditor1, { Template_1_Display } from "./Template_1";
import type { ComponentType } from "react";

// Define the type for props passed to each template editor/display
export type TemplateProps = {
  data: Site;
  onUpdate?: (updates: Partial<Site>) => void;
};

// Define the type for each entry in templatesRegistry
export interface TemplateRegistryEntry {
  label?: string;
  category?: string;
  editor: ComponentType<any>;
  display: ComponentType<any>;
  theme?: unknown;
}

// The registry object with type annotation
export const templatesRegistry: Record<string, TemplateRegistryEntry> = {
  "template-1": {
    editor: TemplateEditor1,
    display: Template_1_Display,
  },
  // Add more templates here as new ones are created
};
