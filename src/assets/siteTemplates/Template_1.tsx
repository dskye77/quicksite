/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { Upload, Plus, Trash2, MessageCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { trackSiteEvent } from "@/lib/firestore";
import type { CatalogueItem, Site, TemplateOneContent } from "@/lib/types";

interface TemplateProps {
  data: Site;
  onUpdate: (updates: Partial<Site>) => void;
}

export default function Template_1({ data, onUpdate }: TemplateProps) {
  const [isUploading, setIsUploading] = useState(false);

  if (!data || (data.type !== "template-1" && data.templateId !== "template-1")) {
    return <ErrorMessage />;
  }

  const content = normalizeContent(data);

  const updateContent = (updates: Partial<TemplateOneContent>) => {
    onUpdate({ content: { ...content, ...updates } });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) return toast.error("File is too large. Max 5MB.");

    setIsUploading(true);
    try {
      const pathId = data.id || data.slug || "anonymous";
      const payload = new FormData();
      payload.append("file", file);
      payload.append("folder", `quicksite/sites/${pathId}`);

      const response = await fetch("/api/uploads/image", {
        method: "POST",
        body: payload,
      });

      const result = await response.json();
      if (!response.ok || !result.secureUrl) {
        throw new Error(result.error || "Upload failed.");
      }

      const nextItems = [...content.items];
      if (!nextItems.length) return;
      nextItems[0] = { ...nextItems[0], image: result.secureUrl };
      updateContent({ items: nextItems });
      toast.success("Product image updated.");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <nav className="flex justify-between items-center py-6 px-8 max-w-6xl mx-auto">
        <div
          className="text-2xl font-black tracking-tighter text-blue-600 outline-none focus:ring-2 focus:ring-blue-100 rounded px-1 cursor-text"
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => updateContent({ brandName: e.currentTarget.innerText })}
        >
          {content.brandName}
        </div>
        <span className="inline-flex text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-600">
          Editor Mode
        </span>
      </nav>

      <section className="px-8 pt-10 pb-8 max-w-6xl mx-auto">
        <h1
          className="text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1] outline-none focus:ring-4 focus:ring-blue-100 rounded-lg transition-all cursor-text"
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => updateContent({ headline: e.currentTarget.innerText })}
        >
          {content.headline}
        </h1>

        <p
          className="text-lg text-slate-500 leading-relaxed max-w-2xl mt-4 outline-none focus:ring-4 focus:ring-blue-100 rounded-lg transition-all cursor-text"
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => updateContent({ subheadline: e.currentTarget.innerText })}
        >
          {content.subheadline}
        </p>
      </section>

      <section className="px-8 pb-16 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold text-xl">Catalogue Items</h2>
          <button
            onClick={() =>
              updateContent({
                items: [
                  ...content.items,
                  {
                    id: crypto.randomUUID(),
                    name: "New Product",
                    price: "₦0",
                    description: "Add product details",
                    image: "",
                  },
                ],
              })
            }
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 h-10 text-sm font-semibold hover:bg-slate-50"
          >
            <Plus className="h-4 w-4" />
            Add Item
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {content.items.map((item, index) => (
            <EditorItemCard
              key={item.id}
              item={item}
              isUploading={isUploading}
              showUpload={index === 0}
              onDelete={() =>
                updateContent({
                  items: content.items.filter((existing) => existing.id !== item.id),
                })
              }
              onFieldChange={(field, value) =>
                updateContent({
                  items: content.items.map((existing) =>
                    existing.id === item.id ? { ...existing, [field]: value } : existing,
                  ),
                })
              }
              onImageUpload={handleImageChange}
            />
          ))}
        </div>
      </section>

      <footer className="py-12 border-t border-slate-100 text-center space-y-2 px-6">
        <div className="flex items-center justify-center gap-2 text-slate-700">
          <MessageCircle className="h-4 w-4" />
          <span className="text-sm">
            WhatsApp:{" "}
            <span
              className="outline-none focus:ring-2 focus:ring-blue-100 rounded px-1 cursor-text"
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => updateContent({ whatsappNumber: e.currentTarget.innerText })}
            >
              {content.whatsappNumber || "Add WhatsApp number"}
            </span>
          </span>
        </div>
        <p className="text-slate-400 text-sm">
          &copy; {new Date().getFullYear()} {content.brandName}.
        </p>
      </footer>
    </div>
  );
}

interface EditorItemCardProps {
  item: CatalogueItem;
  isUploading: boolean;
  showUpload: boolean;
  onDelete: () => void;
  onFieldChange: (
    field: keyof Pick<CatalogueItem, "name" | "price" | "description">,
    value: string,
  ) => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}

function EditorItemCard({
  item,
  isUploading,
  showUpload,
  onDelete,
  onFieldChange,
  onImageUpload,
}: EditorItemCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 p-4">
      <div className="aspect-square rounded-xl bg-slate-100 border border-slate-200 overflow-hidden mb-4 relative flex items-center justify-center">
        {isUploading && showUpload ? (
          <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
        ) : item.image ? (
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        ) : (
          <div className="text-xs text-slate-400">No product image</div>
        )}
        {!isUploading && showUpload && (
          <label className="absolute bottom-3 right-3 cursor-pointer bg-white px-3 h-8 rounded-full text-xs font-semibold inline-flex items-center gap-1 border border-slate-200">
            <Upload className="h-3 w-3" />
            Image
            <input type="file" className="hidden" accept="image/*" onChange={onImageUpload} />
          </label>
        )}
      </div>

      <input
        className="w-full mb-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold"
        defaultValue={item.name}
        onBlur={(e) => onFieldChange("name", e.currentTarget.value)}
      />
      <input
        className="w-full mb-2 rounded-lg border border-slate-200 px-3 py-2 text-sm"
        defaultValue={item.price}
        onBlur={(e) => onFieldChange("price", e.currentTarget.value)}
      />
      <textarea
        className="w-full mb-3 rounded-lg border border-slate-200 px-3 py-2 text-sm resize-none"
        rows={3}
        defaultValue={item.description}
        onBlur={(e) => onFieldChange("description", e.currentTarget.value)}
      />
      <button
        onClick={onDelete}
        className="inline-flex items-center gap-1 text-xs text-red-600 hover:text-red-700"
      >
        <Trash2 className="h-3 w-3" />
        Remove item
      </button>
    </article>
  );
}

export function Template_1_Display({ data }: { data: Site }) {
  if (!data || (data.type !== "template-1" && data.templateId !== "template-1")) {
    return <ErrorMessage />;
  }

  const content = normalizeContent(data);
  const whatsappHref = content.whatsappNumber
    ? `https://wa.me/${content.whatsappNumber.replace(/\D/g, "")}`
    : "#";

  const handleWhatsappClick = async () => {
    try {
      await trackSiteEvent(data, "whatsapp_click");
    } catch (error) {
      console.error("Failed to track WhatsApp click:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <nav className="flex justify-between items-center py-6 px-8 max-w-6xl mx-auto">
        <div className="text-2xl font-black tracking-tighter text-blue-600">
          {content.brandName}
        </div>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          onClick={handleWhatsappClick}
          className="inline-flex items-center gap-2 rounded-full bg-slate-900 text-white px-4 h-10 text-sm font-semibold"
        >
          <MessageCircle className="h-4 w-4" />
          {content.ctaLabel}
        </a>
      </nav>

      <section className="px-8 pt-10 pb-10 max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1] mb-4">
          {content.headline}
        </h1>
        <p className="text-lg text-slate-500 leading-relaxed max-w-2xl">{content.subheadline}</p>
      </section>

      <section className="px-8 pb-16 max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {content.items.map((item) => (
          <article key={item.id} className="rounded-2xl border border-slate-200 overflow-hidden">
            <div className="aspect-square bg-slate-100">
              {item.image ? (
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              ) : null}
            </div>
            <div className="p-4">
              <p className="font-semibold">{item.name}</p>
              <p className="text-primary font-bold mt-1">{item.price}</p>
              <p className="text-sm text-slate-500 mt-2">{item.description}</p>
            </div>
          </article>
        ))}
      </section>

      <footer className="py-10 border-t border-slate-100 text-center">
        <p className="text-slate-400 text-sm">
          &copy; {new Date().getFullYear()} {content.brandName}. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

function normalizeContent(site: Site): TemplateOneContent {
  const raw = site.content as Partial<TemplateOneContent> | undefined;
  return {
    category: "online-catalogue",
    brandName: raw?.brandName ?? site.name ?? "My Shop",
    headline: raw?.headline ?? "Browse our latest catalogue",
    subheadline:
      raw?.subheadline ??
      "Fast delivery, trusted quality, and easy ordering on WhatsApp.",
    whatsappNumber: raw?.whatsappNumber ?? "",
    ctaLabel: raw?.ctaLabel ?? "Order on WhatsApp",
    items:
      raw?.items && raw.items.length > 0
        ? raw.items
        : [
            {
              id: "item-1",
              name: "Featured Product",
              price: "₦0",
              description: "Add product details in the editor.",
              image: "",
            },
          ],
  };
}

function ErrorMessage() {
  return (
    <div className="p-10 text-center border-2 border-dashed border-red-200 rounded-2xl bg-red-50 text-red-600">
      <h2 className="font-bold text-xl">Template Mismatch</h2>
      <p>The data provided does not match the Simple Online Catalogue template.</p>
    </div>
  );
}
