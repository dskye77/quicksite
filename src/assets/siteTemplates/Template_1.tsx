// components/templates/template-1.tsx
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import {
  Upload,
  Plus,
  Trash2,
  MessageCircle,
  Loader2,
  ShoppingBag,
  Star,
  ChevronRight,
  Phone,
  Search,
  Tag,
} from "lucide-react";
import { toast } from "sonner";
import { trackSiteEvent } from "@/lib/firestore";
import type { CatalogueItem, Site, TemplateOneContent } from "@/lib/types";
import WaFloatButton from "@/components/shared/WaFloatButton";
import { darkGoldTheme } from "@/lib/themes";

// ─── 1. Normalize ──────────────────────────────────────────────────────────

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
      Array.isArray(raw?.items) && raw.items.length > 0
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

// ─── 2. Shared sub-components ──────────────────────────────────────────────

// ── Nav ────────────────────────────────────────────────────────────────────
function CatalogueNav({
  brandName,
  waNumber,
  editable,
  onBrandBlur,
  onWaClick,
}: {
  brandName: string;
  waNumber: string;
  editable?: boolean;
  onBrandBlur?: (val: string) => void;
  onWaClick?: () => void;
}) {
  return (
    <nav
      className={`flex items-center justify-between border-b border-(--qs-border) px-8 py-5 ${!editable && "sticky z-50"}bg-[rgba(10,10,10,0.92) backdrop-blur-md`}
      style={{
        top: editable ? 37 : 0,
      }}
    >
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-(--qs-accent) flex items-center justify-center">
          <ShoppingBag size={18} color="var(--qs-accent-fg, #000)" />
        </div>
        {editable ? (
          <span
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onBrandBlur?.(e.currentTarget.innerText)}
            className="text-[20px] font-bold font-sans cursor-text outline-none"
            data-placeholder="Brand Name"
            style={{ fontFamily: "var(--qs-font)" }}
          >
            {brandName}
          </span>
        ) : (
          <span
            className="text-[20px] font-bold font-sans"
            style={{ fontFamily: "var(--qs-font)" }}
          >
            {brandName}
          </span>
        )}
      </div>
      {editable ? (
        <span className="qs-badge">✦ Editor</span>
      ) : (
        <a
          href={waNumber ? `https://wa.me/${waNumber.replace(/\D/g, "")}` : "#"}
          target="_blank"
          rel="noreferrer"
          onClick={onWaClick}
          className="inline-flex items-center gap-1.5 border border-(--qs-wa) rounded-full px-4 py-1.5 font-semibold text-[13px] text-(--qs-wa) hover:bg-(--qs-wa) hover:text-white transition-all"
          style={{ fontFamily: "var(--qs-font)" }}
        >
          <MessageCircle size={14} /> WhatsApp
        </a>
      )}
    </nav>
  );
}

// ── Footer ─────────────────────────────────────────────────────────────────
function CatalogueFooter({
  brandName,
  waNumber,
  editable,
  onBrandBlur,
  onWaBlur,
}: {
  brandName: string;
  waNumber: string;
  editable?: boolean;
  onBrandBlur?: (val: string) => void;
  onWaBlur?: (val: string) => void;
}) {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-(--qs-border) px-8 py-8 bg-(--qs-surface)">
      <p
        className="text-[13px] text-(--qs-muted) font-sans"
        style={{ fontFamily: "var(--qs-font)" }}
      >
        © {new Date().getFullYear()}{" "}
        {editable ? (
          <span
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onBrandBlur?.(e.currentTarget.innerText)}
            className="text-(--qs-text) cursor-text outline-none"
            style={{ fontFamily: "var(--qs-font)" }}
          >
            {brandName}
          </span>
        ) : (
          <span
            className="text-(--qs-text)"
            style={{ fontFamily: "var(--qs-font)" }}
          >
            {brandName}
          </span>
        )}
        . All rights reserved.
      </p>

      <div className="flex items-center gap-2">
        {editable ? (
          <>
            <Phone size={13} color="var(--qs-wa)" />
            <span
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) =>
                onWaBlur?.(e.currentTarget.innerText.replace(/\D/g, ""))
              }
              className="text-[13px] text-(--qs-muted) cursor-text outline-none font-sans"
              style={{ fontFamily: "var(--qs-font)" }}
              data-placeholder="WhatsApp number"
            >
              {waNumber || "Add number"}
            </span>
          </>
        ) : (
          <>
            <div className="w-1.5 h-1.5 rounded-full bg-(--qs-wa)" />
            <span
              className="text-[12px] text-(--qs-muted) font-sans"
              style={{ fontFamily: "var(--qs-font)" }}
            >
              Available on WhatsApp
            </span>
          </>
        )}
      </div>
    </footer>
  );
}

// ── How To Order ───────────────────────────────────────────────────────────
function HowToOrder({
  steps,
}: {
  steps: { n: number; title: string; desc: string }[];
}) {
  return (
    <section className="py-16 px-8 border-t border-(--qs-border) max-w-3xl mx-auto">
      <p className="qs-section-label mb-6">— How to Order</p>
      <div className="grid gap-8 grid-cols-[repeat(auto-fit,minmax(200px,1fr))">
        {steps.map((step) => (
          <div key={step.n} className="flex gap-4 items-start">
            <div className="qs-number-badge">{step.n}</div>
            <div>
              <p
                className="font-bold mb-1.5 text-[15px] font-sans"
                style={{ fontFamily: "var(--qs-font)" }}
              >
                {step.title}
              </p>
              <p
                className="text-[13px] text-(--qs-muted) leading-relaxed font-sans"
                style={{ fontFamily: "var(--qs-font)" }}
              >
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const ORDER_STEPS = [
  {
    n: 1,
    title: "Browse Catalogue",
    desc: "Find the product you love from our collection.",
  },
  {
    n: 2,
    title: "Order on WhatsApp",
    desc: "Tap the WhatsApp button and send us a message.",
  },
  {
    n: 3,
    title: "Fast Delivery",
    desc: "We confirm your order and deliver to your door.",
  },
];

// ─── 3. Editor Body ────────────────────────────────────────────────────────

interface EditorBodyProps<T> {
  content: T;
  updateContent: (updates: Partial<T>) => void;
  data: Site;
}

interface DisplayBodyProps<T> {
  content: T;
  data: Site;
}

function EditorBody({
  content,
  updateContent,
  data,
}: EditorBodyProps<TemplateOneContent>) {
  // Defensive: Ensure content and content.items are always defined.
  const safeContent: TemplateOneContent = {
    ...content,
    items: Array.isArray(content?.items)
      ? content.items
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

  const [isUploading, setIsUploading] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    itemId: string,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024)
      return toast.error("File is too large. Max 5MB.");

    setIsUploading(itemId);
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
      if (!response.ok || !result.secureUrl)
        throw new Error(result.error || "Upload failed.");

      updateContent({
        items: safeContent.items.map((item: CatalogueItem) =>
          item.id === itemId ? { ...item, image: result.secureUrl } : item,
        ),
      });
      toast.success("Image uploaded.");
    } catch (error) {
      console.error(error);
      toast.error("Upload failed.");
    } finally {
      setIsUploading(null);
    }
  };

  const addItem = () =>
    updateContent({
      items: [
        ...safeContent.items,
        {
          id: crypto.randomUUID(),
          name: "New Product",
          price: "₦0",
          description: "Add product details here.",
          image: "",
        },
      ],
    });

  const removeItem = (id: string) =>
    updateContent({ items: safeContent.items.filter((i: CatalogueItem) => i.id !== id) });

  const updateItem = (id: string, field: keyof CatalogueItem, value: string) =>
    updateContent({
      items: safeContent.items.map((i: CatalogueItem) =>
        i.id === id ? { ...i, [field]: value } : i,
      ),
    });

  const filtered = safeContent.items.filter(
    (i: CatalogueItem) => !search || i.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      {/* Nav */}
      <CatalogueNav
        brandName={safeContent.brandName}
        waNumber={safeContent.whatsappNumber}
        editable
        onBrandBlur={(v) => updateContent({ brandName: v })}
      />

      {/* Hero */}
      <section className="pt-16 pb-12 px-8 max-w-3xl mx-auto">
        <p className="qs-section-label mb-4">— Catalogue</p>
        <h1
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => updateContent({ headline: e.currentTarget.innerText })}
          className="font-extrabold leading-tight mb-4 cursor-text outline-none font-sans"
          style={{
            fontFamily: "var(--qs-font)",
            fontSize: "clamp(32px, 5vw, 60px)",
          }}
          data-placeholder="Your Headline"
        >
          {safeContent.headline}
        </h1>
        <p
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) =>
            updateContent({ subheadline: e.currentTarget.innerText })
          }
          className="text-lg text-(--qs-muted) leading-relaxed max-w-xl cursor-text outline-none font-sans"
          style={{ fontFamily: "var(--qs-font)" }}
          data-placeholder="Subheadline"
        >
          {safeContent.subheadline}
        </p>

        <div className="flex gap-8 mt-8 flex-wrap">
          {[
            { n: safeContent.items.length, label: "Products" },
            { n: "Free", label: "Delivery" },
            { n: "24h", label: "Response" },
          ].map(({ n, label }) => (
            <div key={label}>
              <div
                className="text-2xl font-extrabold text-(--qs-accent) font-sans"
                style={{ fontFamily: "var(--qs-font)" }}
              >
                {n}
              </div>
              <div className="text-xs text-(--qs-muted) uppercase tracking-wide">
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="qs-divider" />

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 px-8 py-4 bg-(--qs-surface)">
        <div className="flex-1 min-w-[200px] flex items-center gap-2 bg-(--qs-surface2) border border-(--qs-border) rounded-lg px-[14px] py-2">
          <Search size={14} color="var(--qs-muted)" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-0 outline-none text-(--qs-text) text-[13px] font-sans w-full"
            style={{ fontFamily: "var(--qs-font)" }}
          />
        </div>
        <button
          onClick={addItem}
          className="inline-flex items-center gap-1.5 bg-(--qs-accent) text-(--qs-accent-fg,#000) border-0 rounded-lg px-4 py-2.5 font-bold text-[13px] cursor-pointer font-sans"
          style={{ fontFamily: "var(--qs-font)" }}
        >
          <Plus size={14} /> Add Product
        </button>
      </div>

      {/* Product grid */}
      <section className="px-8 py-8 max-w-6xl mx-auto">
        <div className="qs-product-grid grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-5">
          {filtered.map((item: CatalogueItem, idx: number) => (
            <EditorProductCard
              key={item.id}
              item={item}
              index={idx}
              uploading={isUploading === item.id}
              onDelete={() => removeItem(item.id)}
              onChange={(field, val) => updateItem(item.id, field, val)}
              onImageUpload={(e) => handleImageUpload(e, item.id)}
            />
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-16 text-(--qs-muted)">
            <ShoppingBag size={40} className="mx-auto mb-4 opacity-30" />
            <p className="font-sans" style={{ fontFamily: "var(--qs-font)" }}>
              No products found
            </p>
          </div>
        )}
      </section>

      {/* How It Works (condensed for editor) */}
      <section className="py-12 px-8 border-t border-(--qs-border) max-w-3xl mx-auto">
        <p className="qs-section-label mb-5">— How It Works</p>
        <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(200px,1fr))">
          {[
            {
              n: 1,
              title: "Browse Catalogue",
              desc: "Scroll through our products and pick what you want.",
            },
            {
              n: 2,
              title: "Tap WhatsApp",
              desc: "Hit the green button and send us a message.",
            },
            {
              n: 3,
              title: "Get Delivered",
              desc: "We confirm your order and arrange fast delivery.",
            },
          ].map((step) => (
            <div key={step.n} className="flex gap-4 items-start">
              <div className="qs-number-badge">{step.n}</div>
              <div>
                <p
                  className="font-bold mb-1 text-[15px] font-sans"
                  style={{ fontFamily: "var(--qs-font)" }}
                >
                  {step.title}
                </p>
                <p
                  className="text-[13px] text-(--qs-muted) leading-snug font-sans"
                  style={{ fontFamily: "var(--qs-font)" }}
                >
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <CatalogueFooter
        brandName={safeContent.brandName}
        waNumber={safeContent.whatsappNumber}
        editable
        onBrandBlur={(v) => updateContent({ brandName: v })}
        onWaBlur={(v) => updateContent({ whatsappNumber: v })}
      />

      {/* Floating WA — editable */}
      <WaFloatButton
        number={safeContent.whatsappNumber}
        ctaLabel={safeContent.ctaLabel}
        editable
        onNumberChange={(v) =>
          updateContent({ whatsappNumber: v.replace(/\D/g, "") })
        }
        onCtaChange={(v) => updateContent({ ctaLabel: v })}
      />
    </>
  );
}

// ─── 4. Display Body ───────────────────────────────────────────────────────

function DisplayBody({ content, data }: DisplayBodyProps<TemplateOneContent>) {
  // Defensive: Ensure content and content.items are always defined.
  const safeContent: TemplateOneContent = {
    ...content,
    items: Array.isArray(content?.items)
      ? content.items
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
  const [search, setSearch] = useState("");
  const [featured, setFeatured] = useState<string | null>(null);

  const handleWhatsappClick = async () => {
    try {
      await trackSiteEvent(data, "whatsapp_click");
    } catch (error) {
      console.error("Failed to track WhatsApp click:", error);
    }
  };

  const filtered = safeContent.items.filter(
    (i: CatalogueItem) => !search || i.name.toLowerCase().includes(search.toLowerCase()),
  );

  const featuredItem = featured
    ? safeContent.items.find((i: CatalogueItem) => i.id === featured)
    : safeContent.items[0];

  return (
    <>
      {/* Nav */}
      <CatalogueNav
        brandName={safeContent.brandName}
        waNumber={safeContent.whatsappNumber}
        onWaClick={handleWhatsappClick}
      />

      {/* Hero split */}
      {featuredItem && (
        <section className="qs-hero-split grid grid-cols-2 min-h-[480px]">
          {/* Left text */}
          <div className="flex flex-col justify-center border-r border-(--qs-border) px-12 py-16">
            <p className="qs-section-label mb-4">Featured</p>
            <h1
              className="font-extrabold leading-tight mb-4 font-sans"
              style={{
                fontFamily: "var(--qs-font)",
                fontSize: "clamp(28px, 4vw, 52px)",
              }}
            >
              {safeContent.headline}
            </h1>
            <p
              className="text-[16px] text-(--qs-muted) leading-relaxed mb-8 font-sans"
              style={{ fontFamily: "var(--qs-font)" }}
            >
              {safeContent.subheadline}
            </p>
            <div className="flex gap-3 flex-wrap">
              <div>
                <div
                  className="text-[28px] font-extrabold text-(--qs-accent) font-sans"
                  style={{ fontFamily: "var(--qs-font)" }}
                >
                  {safeContent.items.length}
                </div>
                <div className="text-xs text-(--qs-muted) uppercase tracking-wide">
                  Products
                </div>
              </div>
              <div className="mx-2 border-l border-(--qs-border)"></div>
              <div>
                <div
                  className="text-[28px] font-extrabold text-(--qs-accent2) font-sans"
                  style={{ fontFamily: "var(--qs-font)" }}
                >
                  WA
                </div>
                <div className="text-xs text-(--qs-muted) uppercase tracking-wide">
                  Orders
                </div>
              </div>
            </div>
          </div>

          {/* Right image */}
          <div className="relative overflow-hidden bg-(--qs-surface)">
            {featuredItem.image ? (
              <img
                src={featuredItem.image}
                alt={featuredItem.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ShoppingBag size={64} className="opacity-15" />
              </div>
            )}
            {/* Price tag */}
            <div
              className="absolute top-6 right-6 bg-(--qs-accent) text-(--qs-accent-fg,#000) py-2 px-4 rounded-lg font-extrabold text-[20px] font-sans"
              style={{ fontFamily: "var(--qs-font)" }}
            >
              {featuredItem.price}
            </div>
            {/* Name tag */}
            <div className="absolute bottom-6 left-6 bg-[rgba(10,10,10,0.85) backdrop-blur-md text-white py-3 px-5 rounded-xl border border-[rgba(255,255,255,0.1)">
              <p
                className="font-bold text-[16px] font-sans"
                style={{ fontFamily: "var(--qs-font)" }}
              >
                {featuredItem.name}
              </p>
              <p
                className="text-[12px] text-(--qs-muted) mt-0.5 font-sans"
                style={{ fontFamily: "var(--qs-font)" }}
              >
                {featuredItem.description?.substring(0, 60)}
                {(featuredItem.description?.length ?? 0) > 60 ? "…" : ""}
              </p>
            </div>
          </div>
        </section>
      )}

      <div className="qs-divider" />

      {/* Search bar */}
      <div className="flex flex-wrap items-center gap-3 px-8 py-5 bg-(--qs-surface)">
        <div className="flex-1 min-w-[200px] max-w-[340px] flex items-center gap-2 bg-(--qs-surface2) border border-(--qs-border) rounded-lg px-[14px] py-2">
          <Search size={14} color="var(--qs-muted)" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-0 outline-none text-(--qs-text) text-[13px] font-sans w-full"
            style={{ fontFamily: "var(--qs-font)" }}
          />
        </div>
        <span
          className="text-[12px] text-(--qs-muted) font-sans"
          style={{ fontFamily: "var(--qs-font)" }}
        >
          {filtered.length} of {safeContent.items.length} products
        </span>
      </div>

      {/* Product grid */}
      <section className="px-8 py-8 max-w-6xl mx-auto">
        <p className="qs-section-label mb-6">— All Products</p>
        <div className="qs-product-grid grid grid-cols-[repeat(auto-fill,minmax(260px,1fr)) gap-5">
          {filtered.map((item: CatalogueItem) => (
            <DisplayProductCard
              key={item.id}
              item={item}
              isFeatured={item.id === (featured ?? safeContent.items[0]?.id)}
              onFeature={() => setFeatured(item.id)}
              waNumber={safeContent.whatsappNumber}
              onWaClick={handleWhatsappClick}
            />
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-16 text-(--qs-muted)">
            <ShoppingBag size={40} className="mx-auto mb-4 opacity-30" />
            <p className="font-sans" style={{ fontFamily: "var(--qs-font)" }}>
              No products found
            </p>
          </div>
        )}
      </section>

      {/* How to Order */}
      <HowToOrder steps={ORDER_STEPS} />

      {/* Footer */}
      <CatalogueFooter
        brandName={safeContent.brandName}
        waNumber={safeContent.whatsappNumber}
      />

      {/* Floating WA */}
      <WaFloatButton
        number={safeContent.whatsappNumber}
        ctaLabel={safeContent.ctaLabel}
      />
    </>
  );
}

// ─── 5. Editor Product Card ────────────────────────────────────────────────

function EditorProductCard({
  item,
  index,
  uploading,
  onDelete,
  onChange,
  onImageUpload,
}: {
  item: CatalogueItem;
  index: number;
  uploading: boolean;
  onDelete: () => void;
  onChange: (field: keyof CatalogueItem, value: string) => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="qs-card relative">
      <div className="qs-img-wrap">
        {uploading ? (
          <div className="w-full h-full flex items-center justify-center bg-(--qs-surface2)">
            <Loader2
              size={28}
              color="var(--qs-accent)"
              className="animate-spin"
            />
          </div>
        ) : item.image ? (
          <img src={item.image} alt={item.name} />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-(--qs-surface2) text-(--qs-muted) gap-2">
            <Tag size={28} className="opacity-30" />
            <span className="text-[11px]">No image</span>
          </div>
        )}

        {/* Upload button */}
        {!uploading && (
          <label
            className="absolute bottom-2.5 right-2.5 bg-black/70 backdrop-blur-sm border border-white/15 text-white rounded-lg px-3 py-1.5 text-[11px] font-semibold cursor-pointer flex items-center gap-1.5 font-sans"
            style={{ fontFamily: "var(--qs-font)" }}
          >
            <Upload size={11} /> Upload
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onImageUpload}
            />
          </label>
        )}

        {/* Index badge */}
        <div className="absolute top-2.5 left-2.5 bg-black/60 text-(--qs-accent) rounded-md px-2 py-0.5 text-[11px] font-bold">
          #{index + 1}
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <input
          defaultValue={item.name}
          onBlur={(e) => onChange("name", e.currentTarget.value)}
          placeholder="Product name"
          className="w-full bg-(--qs-surface2) border border-(--qs-border) rounded-md px-2.5 py-1.5 text-(--qs-text) text-[15px] font-bold font-sans outline-none mb-2"
          style={{ fontFamily: "var(--qs-font)" }}
        />
        <input
          defaultValue={item.price}
          onBlur={(e) => onChange("price", e.currentTarget.value)}
          placeholder="₦0"
          className="w-full bg-transparent border-0 text-(--qs-accent) text-[18px] font-extrabold font-sans outline-none mb-2"
          style={{ fontFamily: "var(--qs-font)" }}
        />
        <textarea
          defaultValue={item.description}
          onBlur={(e) => onChange("description", e.currentTarget.value)}
          placeholder="Product description..."
          rows={2}
          className="w-full bg-(--qs-surface2) border border-(--qs-border) rounded-md px-2.5 py-1.5 text-(--qs-muted) text-[12px] font-sans outline-none resize-none leading-relaxed"
          style={{ fontFamily: "var(--qs-font)" }}
        />
        <button
          onClick={onDelete}
          className="mt-2.5 inline-flex items-center gap-1 text-[#ff4444] bg-none border-0 text-[11px] cursor-pointer font-sans"
          style={{ fontFamily: "var(--qs-font)" }}
        >
          <Trash2 size={11} /> Remove
        </button>
      </div>
    </div>
  );
}

// ─── 6. Display Product Card ───────────────────────────────────────────────

function DisplayProductCard({
  item,
  isFeatured,
  onFeature,
  waNumber,
  onWaClick,
}: {
  item: CatalogueItem;
  isFeatured: boolean;
  onFeature: () => void;
  waNumber: string;
  onWaClick: () => void;
}) {
  const waHref = waNumber
    ? `https://wa.me/${waNumber.replace(/\D/g, "")}?text=${encodeURIComponent(
        `Hi! I'm interested in: ${item.name} (${item.price})`,
      )}`
    : "#";

  return (
    <div className="qs-card cursor-pointer" onClick={onFeature}>
      <div className="qs-img-wrap relative">
        {item.image ? (
          <img src={item.image} alt={item.name} />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-(--qs-surface2)">
            <Tag size={32} className="opacity-20" />
          </div>
        )}

        {isFeatured && (
          <div className="absolute top-2.5 left-2.5 bg-(--qs-accent) text-(--qs-accent-fg,#000) rounded-md px-2.5 py-0.5 text-[10px] font-extrabold tracking-wide uppercase">
            ✦ Featured
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-end justify-center p-4 transition-all duration-200 bg-[rgba(10,10,10,0) opacity-0 hover:opacity-100 hover:bg-[rgba(10,10,10,0.5)">
          <a
            href={waHref}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => {
              e.stopPropagation();
              onWaClick();
            }}
            className="inline-flex items-center gap-1.5 bg-(--qs-wa) text-white rounded-full px-5 py-2 font-bold text-[13px] font-sans hover:bg-green-500"
            style={{ fontFamily: "var(--qs-font)" }}
          >
            <MessageCircle size={13} /> Order Now
          </a>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <p
            className="font-bold text-[15px] font-sans leading-snug"
            style={{ fontFamily: "var(--qs-font)" }}
          >
            {item.name}
          </p>
          <Star
            size={14}
            color="var(--qs-accent)"
            className="shrink-0 mt-0.5"
          />
        </div>
        <p
          className="text-[20px] font-extrabold text-(--qs-accent) font-sans mb-2"
          style={{ fontFamily: "var(--qs-font)" }}
        >
          {item.price}
        </p>
        <p
          className="text-[12px] text-(--qs-muted) leading-snug font-sans mb-3.5"
          style={{ fontFamily: "var(--qs-font)" }}
        >
          {item.description}
        </p>
        <a
          href={waHref}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => {
            e.stopPropagation();
            onWaClick();
          }}
          className="flex items-center justify-center gap-1.5 bg-[rgba(37,211,102,0.1) text-(--qs-wa) border border-[rgba(37,211,102,0.25) rounded-lg px-2.5 py-2 font-semibold text-[13px] font-sans hover:bg-[rgba(37,211,102,0.2) transition-all"
          style={{ fontFamily: "var(--qs-font)" }}
        >
          <MessageCircle size={14} /> Order via WhatsApp
          <ChevronRight size={13} />
        </a>
      </div>
    </div>
  );
}

// ─── 7. Wire it all up ─────────────────────────────────────────────────────

const TemplateEditor = (props: EditorBodyProps<TemplateOneContent>) =>
  <div className="w-full h-full"><EditorBody {...props} /></div>;

const TemplateDisplay = (props: DisplayBodyProps<TemplateOneContent>) =>
  <div className="w-full h-full"><DisplayBody {...props} /></div>;

export default TemplateEditor;
export { TemplateDisplay as Template_1_Display };