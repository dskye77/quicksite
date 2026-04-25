import { templatesRegistry } from "@/lib/templates";
import { themeRegistry } from "@/lib/themes";

import type { Site } from "@/lib/types";

export default function SiteRenderer({ site }: { site: Site }) {
  const Template = templatesRegistry[site.type];
  const theme = themeRegistry[site.theme];
  return (
    <div className={`w-full h-full ${theme.className}`}>
      <style>{theme.css}</style>
      <Template isEditor={false} content={site.content} />
    </div>
  );
}
