// components/templates/template-1.tsx
/* eslint-disable react-hooks/exhaustive-deps */
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
import { createTemplate } from "@/lib/createTemplate";
import type { EditorBodyProps, DisplayBodyProps } from "@/lib/createTemplate";
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
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px 32px",
        borderBottom: "1px solid var(--qs-border)",
        position: "sticky",
        top: editable ? 37 : 0, // offset for editor banner height
        background: "rgba(10,10,10,0.92)",
        backdropFilter: "blur(12px)",
        zIndex: 50,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            background: "var(--qs-accent)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ShoppingBag size={18} color="var(--qs-accent-fg, #000)" />
        </div>
        {editable ? (
          <span
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onBrandBlur?.(e.currentTarget.innerText)}
            style={{
              fontSize: 20,
              fontWeight: 700,
              fontFamily: "var(--qs-font)",
              cursor: "text",
              outline: "none",
            }}
            data-placeholder="Brand Name"
          >
            {brandName}
          </span>
        ) : (
          <span
            style={{
              fontSize: 20,
              fontWeight: 700,
              fontFamily: "var(--qs-font)",
            }}
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
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: "transparent",
            color: "var(--qs-wa)",
            border: "1px solid var(--qs-wa)",
            borderRadius: 999,
            padding: "6px 16px",
            fontWeight: 600,
            fontSize: 13,
            textDecoration: "none",
            fontFamily: "var(--qs-font)",
            transition: "all 0.15s",
          }}
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
    <footer
      style={{
        padding: "32px",
        borderTop: "1px solid var(--qs-border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 16,
        background: "var(--qs-surface)",
      }}
    >
      <p
        style={{
          fontSize: 13,
          color: "var(--qs-muted)",
          fontFamily: "var(--qs-font)",
        }}
      >
        © {new Date().getFullYear()}{" "}
        {editable ? (
          <span
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onBrandBlur?.(e.currentTarget.innerText)}
            style={{ color: "var(--qs-text)", cursor: "text", outline: "none" }}
          >
            {brandName}
          </span>
        ) : (
          <span style={{ color: "var(--qs-text)" }}>{brandName}</span>
        )}
        . All rights reserved.
      </p>

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {editable ? (
          <>
            <Phone size={13} color="var(--qs-wa)" />
            <span
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) =>
                onWaBlur?.(e.currentTarget.innerText.replace(/\D/g, ""))
              }
              style={{
                fontSize: 13,
                color: "var(--qs-muted)",
                cursor: "text",
                outline: "none",
                fontFamily: "var(--qs-font)",
              }}
              data-placeholder="WhatsApp number"
            >
              {waNumber || "Add number"}
            </span>
          </>
        ) : (
          <>
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--qs-wa)",
              }}
            />
            <span
              style={{
                fontSize: 12,
                color: "var(--qs-muted)",
                fontFamily: "var(--qs-font)",
              }}
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
    <section
      style={{
        padding: "64px 32px",
        borderTop: "1px solid var(--qs-border)",
        maxWidth: 900,
        margin: "0 auto",
      }}
    >
      <p className="qs-section-label" style={{ marginBottom: 24 }}>
        — How to Order
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 32,
        }}
      >
        {steps.map((step) => (
          <div
            key={step.n}
            style={{ display: "flex", gap: 16, alignItems: "flex-start" }}
          >
            <div className="qs-number-badge">{step.n}</div>
            <div>
              <p
                style={{
                  fontWeight: 700,
                  marginBottom: 6,
                  fontSize: 15,
                  fontFamily: "var(--qs-font)",
                }}
              >
                {step.title}
              </p>
              <p
                style={{
                  fontSize: 13,
                  color: "var(--qs-muted)",
                  lineHeight: 1.6,
                  fontFamily: "var(--qs-font)",
                }}
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

function EditorBody({
  content,
  updateContent,
  data,
}: EditorBodyProps<TemplateOneContent>) {
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
        items: content.items.map((item) =>
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
        ...content.items,
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
    updateContent({ items: content.items.filter((i) => i.id !== id) });

  const updateItem = (id: string, field: keyof CatalogueItem, value: string) =>
    updateContent({
      items: content.items.map((i) =>
        i.id === id ? { ...i, [field]: value } : i,
      ),
    });

  const filtered = content.items.filter(
    (i) => !search || i.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      {/* Nav */}
      <CatalogueNav
        brandName={content.brandName}
        waNumber={content.whatsappNumber}
        editable
        onBrandBlur={(v) => updateContent({ brandName: v })}
      />

      {/* Hero */}
      <section
        style={{
          padding: "64px 32px 48px",
          maxWidth: 900,
          margin: "0 auto",
        }}
      >
        <p className="qs-section-label" style={{ marginBottom: 16 }}>
          — Catalogue
        </p>
        <h1
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => updateContent({ headline: e.currentTarget.innerText })}
          style={{
            fontSize: "clamp(32px, 5vw, 60px)",
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: 16,
            cursor: "text",
            outline: "none",
            fontFamily: "var(--qs-font)",
          }}
          data-placeholder="Your Headline"
        >
          {content.headline}
        </h1>
        <p
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) =>
            updateContent({ subheadline: e.currentTarget.innerText })
          }
          style={{
            fontSize: 18,
            color: "var(--qs-muted)",
            lineHeight: 1.6,
            maxWidth: 600,
            cursor: "text",
            outline: "none",
            fontFamily: "var(--qs-font)",
          }}
          data-placeholder="Subheadline"
        >
          {content.subheadline}
        </p>

        {/* Stats */}
        <div
          style={{ display: "flex", gap: 32, marginTop: 32, flexWrap: "wrap" }}
        >
          {[
            { n: content.items.length, label: "Products" },
            { n: "Free", label: "Delivery" },
            { n: "24h", label: "Response" },
          ].map(({ n, label }) => (
            <div key={label}>
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 800,
                  color: "var(--qs-accent)",
                  fontFamily: "var(--qs-font)",
                }}
              >
                {n}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "var(--qs-muted)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="qs-divider" />

      {/* Toolbar */}
      <div
        style={{
          padding: "16px 32px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap",
          background: "var(--qs-surface)",
        }}
      >
        <div
          style={{
            flex: 1,
            minWidth: 200,
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "var(--qs-surface2)",
            border: "1px solid var(--qs-border)",
            borderRadius: 8,
            padding: "8px 14px",
          }}
        >
          <Search size={14} color="var(--qs-muted)" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              background: "none",
              border: "none",
              outline: "none",
              color: "var(--qs-text)",
              fontSize: 13,
              fontFamily: "var(--qs-font)",
              width: "100%",
            }}
          />
        </div>
        <button
          onClick={addItem}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: "var(--qs-accent)",
            color: "var(--qs-accent-fg, #000)",
            border: "none",
            borderRadius: 8,
            padding: "9px 16px",
            fontWeight: 700,
            fontSize: 13,
            cursor: "pointer",
            fontFamily: "var(--qs-font)",
          }}
        >
          <Plus size={14} /> Add Product
        </button>
      </div>

      {/* Product grid */}
      <section style={{ padding: "32px", maxWidth: 1200, margin: "0 auto" }}>
        <div
          className="qs-product-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 20,
          }}
        >
          {filtered.map((item, idx) => (
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
          <div
            style={{
              textAlign: "center",
              padding: "64px 0",
              color: "var(--qs-muted)",
            }}
          >
            <ShoppingBag
              size={40}
              style={{ margin: "0 auto 16px", opacity: 0.3 }}
            />
            <p style={{ fontFamily: "var(--qs-font)" }}>No products found</p>
          </div>
        )}
      </section>

      {/* How It Works (condensed for editor) */}
      <section
        style={{
          padding: "48px 32px",
          borderTop: "1px solid var(--qs-border)",
          maxWidth: 900,
          margin: "0 auto",
        }}
      >
        <p className="qs-section-label" style={{ marginBottom: 20 }}>
          — How It Works
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 24,
          }}
        >
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
            <div
              key={step.n}
              style={{ display: "flex", gap: 16, alignItems: "flex-start" }}
            >
              <div className="qs-number-badge">{step.n}</div>
              <div>
                <p
                  style={{
                    fontWeight: 700,
                    marginBottom: 4,
                    fontSize: 15,
                    fontFamily: "var(--qs-font)",
                  }}
                >
                  {step.title}
                </p>
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--qs-muted)",
                    lineHeight: 1.5,
                    fontFamily: "var(--qs-font)",
                  }}
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
        brandName={content.brandName}
        waNumber={content.whatsappNumber}
        editable
        onBrandBlur={(v) => updateContent({ brandName: v })}
        onWaBlur={(v) => updateContent({ whatsappNumber: v })}
      />

      {/* Floating WA — editable */}
      <WaFloatButton
        number={content.whatsappNumber}
        ctaLabel={content.ctaLabel}
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
  const [search, setSearch] = useState("");
  const [featured, setFeatured] = useState<string | null>(null);

  const handleWhatsappClick = async () => {
    try {
      await trackSiteEvent(data, "whatsapp_click");
    } catch (error) {
      console.error("Failed to track WhatsApp click:", error);
    }
  };

  const filtered = content.items.filter(
    (i) => !search || i.name.toLowerCase().includes(search.toLowerCase()),
  );

  const featuredItem = featured
    ? content.items.find((i) => i.id === featured)
    : content.items[0];

  return (
    <>
      {/* Nav */}
      <CatalogueNav
        brandName={content.brandName}
        waNumber={content.whatsappNumber}
        onWaClick={handleWhatsappClick}
      />

      {/* Hero split */}
      {featuredItem && (
        <section
          className="qs-hero-split"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            minHeight: 480,
          }}
        >
          {/* Left text */}
          <div
            style={{
              padding: "64px 48px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              borderRight: "1px solid var(--qs-border)",
            }}
          >
            <p className="qs-section-label" style={{ marginBottom: 16 }}>
              Featured
            </p>
            <h1
              style={{
                fontSize: "clamp(28px, 4vw, 52px)",
                fontWeight: 800,
                lineHeight: 1.1,
                marginBottom: 16,
                fontFamily: "var(--qs-font)",
              }}
            >
              {content.headline}
            </h1>
            <p
              style={{
                fontSize: 16,
                color: "var(--qs-muted)",
                lineHeight: 1.6,
                marginBottom: 32,
                fontFamily: "var(--qs-font)",
              }}
            >
              {content.subheadline}
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <div>
                <div
                  style={{
                    fontSize: 28,
                    fontWeight: 800,
                    color: "var(--qs-accent)",
                    fontFamily: "var(--qs-font)",
                  }}
                >
                  {content.items.length}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--qs-muted)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  Products
                </div>
              </div>
              <div
                style={{
                  margin: "0 8px",
                  borderLeft: "1px solid var(--qs-border)",
                }}
              />
              <div>
                <div
                  style={{
                    fontSize: 28,
                    fontWeight: 800,
                    color: "var(--qs-accent2)",
                    fontFamily: "var(--qs-font)",
                  }}
                >
                  WA
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--qs-muted)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  Orders
                </div>
              </div>
            </div>
          </div>

          {/* Right image */}
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              background: "var(--qs-surface)",
            }}
          >
            {featuredItem.image ? (
              <img
                src={featuredItem.image}
                alt={featuredItem.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ShoppingBag size={64} style={{ opacity: 0.15 }} />
              </div>
            )}
            {/* Price tag */}
            <div
              style={{
                position: "absolute",
                top: 24,
                right: 24,
                background: "var(--qs-accent)",
                color: "var(--qs-accent-fg, #000)",
                padding: "8px 16px",
                borderRadius: 8,
                fontWeight: 800,
                fontSize: 20,
                fontFamily: "var(--qs-font)",
              }}
            >
              {featuredItem.price}
            </div>
            {/* Name tag */}
            <div
              style={{
                position: "absolute",
                bottom: 24,
                left: 24,
                background: "rgba(10,10,10,0.85)",
                backdropFilter: "blur(8px)",
                color: "#fff",
                padding: "12px 20px",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <p
                style={{
                  fontWeight: 700,
                  fontSize: 16,
                  fontFamily: "var(--qs-font)",
                }}
              >
                {featuredItem.name}
              </p>
              <p
                style={{
                  fontSize: 12,
                  color: "var(--qs-muted)",
                  marginTop: 2,
                  fontFamily: "var(--qs-font)",
                }}
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
      <div
        style={{
          padding: "20px 32px",
          display: "flex",
          gap: 12,
          alignItems: "center",
          flexWrap: "wrap",
          background: "var(--qs-surface)",
        }}
      >
        <div
          style={{
            flex: 1,
            minWidth: 200,
            maxWidth: 340,
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "var(--qs-surface2)",
            border: "1px solid var(--qs-border)",
            borderRadius: 8,
            padding: "8px 14px",
          }}
        >
          <Search size={14} color="var(--qs-muted)" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              background: "none",
              border: "none",
              outline: "none",
              color: "var(--qs-text)",
              fontSize: 13,
              fontFamily: "var(--qs-font)",
              width: "100%",
            }}
          />
        </div>
        <span
          style={{
            fontSize: 12,
            color: "var(--qs-muted)",
            fontFamily: "var(--qs-font)",
          }}
        >
          {filtered.length} of {content.items.length} products
        </span>
      </div>

      {/* Product grid */}
      <section style={{ padding: "32px", maxWidth: 1200, margin: "0 auto" }}>
        <p className="qs-section-label" style={{ marginBottom: 24 }}>
          — All Products
        </p>
        <div
          className="qs-product-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 20,
          }}
        >
          {filtered.map((item) => (
            <DisplayProductCard
              key={item.id}
              item={item}
              isFeatured={item.id === (featured ?? content.items[0]?.id)}
              onFeature={() => setFeatured(item.id)}
              waNumber={content.whatsappNumber}
              onWaClick={handleWhatsappClick}
            />
          ))}
        </div>
        {filtered.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "64px 0",
              color: "var(--qs-muted)",
            }}
          >
            <ShoppingBag
              size={40}
              style={{ margin: "0 auto 16px", opacity: 0.3 }}
            />
            <p style={{ fontFamily: "var(--qs-font)" }}>No products found</p>
          </div>
        )}
      </section>

      {/* How to Order */}
      <HowToOrder steps={ORDER_STEPS} />

      {/* Footer */}
      <CatalogueFooter
        brandName={content.brandName}
        waNumber={content.whatsappNumber}
      />

      {/* Floating WA */}
      <WaFloatButton
        number={content.whatsappNumber}
        ctaLabel={content.ctaLabel}
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
    <div className="qs-card" style={{ position: "relative" }}>
      <div className="qs-img-wrap">
        {uploading ? (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "var(--qs-surface2)",
            }}
          >
            <Loader2
              size={28}
              color="var(--qs-accent)"
              className="animate-spin"
            />
          </div>
        ) : item.image ? (
          <img src={item.image} alt={item.name} />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "var(--qs-surface2)",
              color: "var(--qs-muted)",
              gap: 8,
            }}
          >
            <Tag size={28} style={{ opacity: 0.3 }} />
            <span style={{ fontSize: 11 }}>No image</span>
          </div>
        )}

        {/* Upload button */}
        {!uploading && (
          <label
            style={{
              position: "absolute",
              bottom: 10,
              right: 10,
              background: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(4px)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#fff",
              borderRadius: 8,
              padding: "6px 12px",
              fontSize: 11,
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 5,
              fontFamily: "var(--qs-font)",
            }}
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
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            background: "rgba(0,0,0,0.6)",
            color: "var(--qs-accent)",
            borderRadius: 6,
            padding: "3px 8px",
            fontSize: 11,
            fontWeight: 700,
          }}
        >
          #{index + 1}
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: 16 }}>
        <input
          defaultValue={item.name}
          onBlur={(e) => onChange("name", e.currentTarget.value)}
          placeholder="Product name"
          style={{
            width: "100%",
            background: "var(--qs-surface2)",
            border: "1px solid var(--qs-border)",
            borderRadius: 6,
            padding: "7px 10px",
            color: "var(--qs-text)",
            fontSize: 15,
            fontWeight: 700,
            fontFamily: "var(--qs-font)",
            outline: "none",
            marginBottom: 8,
          }}
        />
        <input
          defaultValue={item.price}
          onBlur={(e) => onChange("price", e.currentTarget.value)}
          placeholder="₦0"
          style={{
            width: "100%",
            background: "transparent",
            border: "none",
            color: "var(--qs-accent)",
            fontSize: 18,
            fontWeight: 800,
            fontFamily: "var(--qs-font)",
            outline: "none",
            marginBottom: 8,
          }}
        />
        <textarea
          defaultValue={item.description}
          onBlur={(e) => onChange("description", e.currentTarget.value)}
          placeholder="Product description..."
          rows={2}
          style={{
            width: "100%",
            background: "var(--qs-surface2)",
            border: "1px solid var(--qs-border)",
            borderRadius: 6,
            padding: "7px 10px",
            color: "var(--qs-muted)",
            fontSize: 12,
            fontFamily: "var(--qs-font)",
            outline: "none",
            resize: "none",
            lineHeight: 1.5,
          }}
        />
        <button
          onClick={onDelete}
          style={{
            marginTop: 10,
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            color: "#ff4444",
            background: "none",
            border: "none",
            fontSize: 11,
            cursor: "pointer",
            fontFamily: "var(--qs-font)",
          }}
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
    <div className="qs-card" style={{ cursor: "pointer" }} onClick={onFeature}>
      <div className="qs-img-wrap">
        {item.image ? (
          <img src={item.image} alt={item.name} />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "var(--qs-surface2)",
            }}
          >
            <Tag size={32} style={{ opacity: 0.2 }} />
          </div>
        )}

        {isFeatured && (
          <div
            style={{
              position: "absolute",
              top: 10,
              left: 10,
              background: "var(--qs-accent)",
              color: "var(--qs-accent-fg, #000)",
              borderRadius: 6,
              padding: "3px 10px",
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            ✦ Featured
          </div>
        )}

        {/* Hover overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(10,10,10,0)",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            padding: "16px",
            transition: "background 0.25s",
            opacity: 0,
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.opacity = "1";
            el.style.background = "rgba(10,10,10,0.5)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.opacity = "0";
          }}
        >
          <a
            href={waHref}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => {
              e.stopPropagation();
              onWaClick();
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "var(--qs-wa)",
              color: "#fff",
              borderRadius: 999,
              padding: "8px 20px",
              fontWeight: 700,
              fontSize: 13,
              textDecoration: "none",
              fontFamily: "var(--qs-font)",
            }}
          >
            <MessageCircle size={13} /> Order Now
          </a>
        </div>
      </div>

      <div style={{ padding: 16 }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 8,
            marginBottom: 6,
          }}
        >
          <p
            style={{
              fontWeight: 700,
              fontSize: 15,
              fontFamily: "var(--qs-font)",
              lineHeight: 1.3,
            }}
          >
            {item.name}
          </p>
          <Star
            size={14}
            color="var(--qs-accent)"
            style={{ flexShrink: 0, marginTop: 2 }}
          />
        </div>
        <p
          style={{
            fontSize: 20,
            fontWeight: 800,
            color: "var(--qs-accent)",
            fontFamily: "var(--qs-font)",
            marginBottom: 8,
          }}
        >
          {item.price}
        </p>
        <p
          style={{
            fontSize: 12,
            color: "var(--qs-muted)",
            lineHeight: 1.5,
            fontFamily: "var(--qs-font)",
            marginBottom: 14,
          }}
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
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            background: "rgba(37,211,102,0.1)",
            color: "var(--qs-wa)",
            border: "1px solid rgba(37,211,102,0.25)",
            borderRadius: 8,
            padding: "9px",
            fontWeight: 600,
            fontSize: 13,
            textDecoration: "none",
            fontFamily: "var(--qs-font)",
            transition: "all 0.15s",
          }}
        >
          <MessageCircle size={14} /> Order via WhatsApp
          <ChevronRight size={13} />
        </a>
      </div>
    </div>
  );
}

// ─── 7. Wire it all up ─────────────────────────────────────────────────────

const { TemplateEditor, TemplateDisplay } = createTemplate<TemplateOneContent>(
  {
    templateId: "template-1",
    normalizeContent,
    EditorBody,
    DisplayBody,
  },
  darkGoldTheme, // ← swap this import to change the whole look
);

export default TemplateEditor;
export { TemplateDisplay as Template_1_Display };
