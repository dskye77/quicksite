// src/features/templates/TemplateGallery.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { TemplateCard } from "./TemplateCard";
import { templatesMetaRegistryArray } from "@/lib/templates";

export default function TemplateGallery() {
  const searchParams = useSearchParams();
  const paramsName = searchParams.get("name");
  const paramsSlug = searchParams.get("slug");

  return (
    <section className="pt-16 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-2xl mb-10">
          <span className="inline-flex items-center border border-border px-2.5 py-0.5 text-xs rounded-full mb-4 font-medium bg-muted/50">
            Templates
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3 text-balance">
            Production-ready catalogue template, ready in one click.
          </h1>
          <p className="text-muted-foreground text-lg">
            Choose one reliable template, launch quickly, and customize all
            content from your Firebase data.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {templatesMetaRegistryArray.map((template, i) => (
            <TemplateCard
              key={template.type}
              type={template.type}
              title={template.title}
              description={template.description}
              category={template.category}
              previewHref={`/templates/${template.type}?name=${paramsName}&slug=${paramsSlug}`}
              useHref={`/dashboard/new?template=${template.type}&name=${paramsName}&slug=${paramsSlug}`}
              delay={i * 40}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
