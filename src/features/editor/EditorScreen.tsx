/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { getTemplateEditor } from "@/lib/templates";

interface EditorScreenProps {
  data: any;
  onChange: (updated: any) => void;
}

export default function EditorScreen({ data, onChange }: EditorScreenProps) {
  const SelectedTemplate = getTemplateEditor(data.type);

  if (!SelectedTemplate) {
    return (
      <div className="p-12 text-center bg-white rounded-xl border">
        <p className="text-red-500 font-bold">
          Error: Template Type &quot;{data.type}&quot; not found.
        </p>
      </div>
    );
  }

  const handleUpdate = (updates: any) => {
    onChange({ ...data, ...updates });
  };

  return (
    <div className="w-full h-full">
      <SelectedTemplate data={data} onUpdate={handleUpdate} />
    </div>
  );
}
