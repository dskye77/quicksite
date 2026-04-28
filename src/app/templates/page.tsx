// src/app/templates/page.tsx
import { Suspense } from "react";
import TemplateGallery from "@/screen/templates/TemplatesScreen";
export default function TemplatesPage() {
  return (
    <Suspense>
      <TemplateGallery />
    </Suspense>
  );
}
