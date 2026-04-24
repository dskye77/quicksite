"use client";
import React from "react";
import Template_1 from "@/assets/siteTemplates/Template_1";
import type { Site } from "@/lib/types";

interface EditorScreenProps {
  data: Site;
  onChange: (updated: Site) => void;
}

export default function EditorScreen({ data, onChange }: EditorScreenProps) {
  if (data.type !== "template-1") {
    return (
      <div className="p-12 text-center bg-white rounded-xl border">
        <p className="text-red-500 font-bold">
          Error: Template Type &quot;{data.type}&quot; not found.
        </p>
      </div>
    );
  }

  const handleUpdate = (updates: Partial<Site>) => {
    onChange({ ...data, ...updates });
  };

  return (
    <div className="w-full h-full">
      <Template_1 data={data} onUpdate={handleUpdate} />
    </div>
  );
}
