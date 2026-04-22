// src/features/templates/TemplateGallery.tsx
"use client";

import { useState } from "react";
import { TemplateCard } from "./TemplateCard";

const TEMPLATES = [
  {
    id: 1,
    title: "Naija Bites",
    category: "Restaurant",
    description: "Hot menus, online orders, table booking.",
  },
  {
    id: 2,
    title: "FashionHouse",
    category: "Store",
    description: "Showcase collections in Ankara style.",
  },
  {
    id: 3,
    title: "GlowSalon",
    category: "Service",
    description: "Bookings, services, gallery — all in one.",
  },
  {
    id: 4,
    title: "TechFix",
    category: "Service",
    description: "Gadget repairs, pricing, and WhatsApp orders.",
  },
  {
    id: 5,
    title: "FreshMart",
    category: "Store",
    description: "Groceries and produce, order online.",
  },
  {
    id: 6,
    title: "CreativePort",
    category: "Portfolio",
    description: "Showcase your design or photography work.",
  },
];

const CATEGORIES = ["All", "Restaurant", "Store", "Service", "Portfolio"];

export default function TemplateGallery() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? TEMPLATES
      : TEMPLATES.filter((t) => t.category === active);

  return (
    <section className="pt-16 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-2xl mb-10">
          <span className="inline-flex items-center border border-border px-2.5 py-0.5 text-xs rounded-full mb-4 font-medium bg-muted/50">
            Templates
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3 text-balance">
            Beautiful designs, ready in one click.
          </h1>
          <p className="text-muted-foreground text-lg">
            Hand-crafted templates for every Nigerian business. All free to
            start.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap border transition-all cursor-pointer ${
                cat === active
                  ? "bg-foreground text-background border-foreground"
                  : "bg-card text-muted-foreground border-border hover:border-foreground/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((template, i) => (
            <TemplateCard key={template.id} {...template} delay={i * 40} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            No templates in this category yet.
          </div>
        )}
      </div>
    </section>
  );
}
