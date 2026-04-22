import React from "react";
import { Eye, ArrowRight } from "lucide-react";

const TemplateCard = ({ title, description, category, imageUrl, delay }) => {
  return (
    <div
      className="group rounded-2xl bg-card border border-border overflow-hidden hover:shadow-elevated hover:border-primary/40 transition-all duration-300 animate-fade-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Image Section */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-background/90 text-foreground backdrop-blur px-2.5 py-0.5 rounded-full text-xs font-semibold border border-transparent">
          {category}
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-all duration-300 grid place-items-center opacity-0 group-hover:opacity-100">
          <button className="flex items-center gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-9 px-4 rounded-full text-sm font-medium">
            <Eye size={16} /> Preview
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        <h3 className="font-display font-bold text-lg mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="flex gap-2">
          <button className="flex-1 flex items-center justify-center gap-1.5 border border-input bg-background hover:bg-accent h-9 rounded-full text-sm font-medium">
            <Eye size={14} /> Preview
          </button>
          <button className="flex-1 flex items-center justify-center gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-full text-sm font-semibold">
            Use Template <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
