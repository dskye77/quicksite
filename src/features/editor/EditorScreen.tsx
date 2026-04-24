"use client";
import React from "react";
import type { Site } from "@/lib/types";

// Import the template registry
import { templatesRegistry } from "@/assets/siteTemplates/templatesRegistry";

interface EditorScreenProps {
  data: Site;
  onChange: (updated: Site) => void;
}

export default function EditorScreen({ data, onChange }: EditorScreenProps) {
  const templateEntry = templatesRegistry[data.type];

  if (!templateEntry || !templateEntry.editor) {
    return (
      <div className="p-12 text-center bg-white rounded-xl border">
        <p className="text-red-500 font-bold">
          Error: Template Type &quot;{data.type}&quot; not found.
        </p>
      </div>
    );
  }

  const TemplateEditor = templateEntry.editor;

  // Forwards changes upward to parent via `onChange`
  const handleUpdate = (updates: Partial<Site>) => {
    onChange({ ...data, ...updates });
  };

  return (
    <div className="w-full h-full">
      <TemplateEditor data={data} onUpdate={handleUpdate} />
    </div>
  );
}
