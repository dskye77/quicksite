// src/features/templates/TemplateCard.tsx
import Link from "next/link";
import { Eye, ArrowRight } from "lucide-react";

interface TemplateCardProps {
  type: string;
  title: string;
  description: string;
  category: string;
  previewHref: string;
  useHref: string;
  delay?: number;
}

export function TemplateCard({
  title,
  description,
  category,
  previewHref,
  useHref,
  delay = 0,
}: TemplateCardProps) {
  return (
    <div
      className="group rounded-2xl bg-card border border-border overflow-hidden hover:shadow-lg hover:border-primary/40 transition-all duration-300"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Placeholder image */}
      <div className="relative aspect-4/3 overflow-hidden bg-linear-to-br from-muted to-muted/50 flex items-center justify-center">
        <div className="text-4xl font-bold text-muted-foreground/20">
          {title[0]}
        </div>
        <div className="absolute top-3 left-3 bg-background/90 backdrop-blur px-2.5 py-0.5 rounded-full text-xs font-semibold border border-transparent">
          {category}
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-all duration-300 grid place-items-center opacity-0 group-hover:opacity-100">
          <Link
            href={previewHref}
            className="flex items-center gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-9 px-4 rounded-full text-sm font-medium cursor-pointer"
          >
            <Eye className="w-4 h-4" /> Preview
          </Link>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-bold text-lg mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="flex gap-2">
          <Link
            href={previewHref}
            className="flex-1 flex items-center justify-center gap-1.5 border border-input bg-background hover:bg-muted h-9 rounded-full text-sm font-medium cursor-pointer transition"
          >
            <Eye className="w-4 h-4" /> Preview
          </Link>
          <Link
            href={useHref}
            className="flex-1 flex items-center justify-center gap-1.5 bg-primary text-primary-foreground hover:opacity-90 h-9 rounded-full text-sm font-semibold cursor-pointer transition"
          >
            Use Template <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
