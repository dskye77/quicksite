/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import type { Site } from "@/lib/types";
import { setDeep } from "@/lib/helpers";

import { templatesRegistry } from "@/lib/templates";
import { themeRegistry } from "@/lib/themes";

interface EditorScreenProps {
  data: Site;
  onChange: (updated: Site) => void;
}

export default function EditorScreen({ data, onChange }: EditorScreenProps) {
  const templateEntry = templatesRegistry[data.type];
  const theme = themeRegistry["tech"];

  if (!templateEntry) {
    return (
      <div className="p-12 text-center bg-white rounded-xl border">
        <p className="text-red-500 font-bold">
          Error: Template Type &quot;{data.type}&quot; not found.
        </p>
      </div>
    );
  }

  const handleUpdate = (path: string, value: any) => {
    const updated = setDeep(data.content, path, value);
    onChange({ ...data, content: updated });
  };
  const Template = templateEntry.template;

  return (
    <div className={`w-full h-full ${theme.className}`}>
      <style>{theme.css}</style>
      <Template
        isEditor={true}
        content={data.content}
        onUpdate={handleUpdate}
      />
    </div>
  );
}
