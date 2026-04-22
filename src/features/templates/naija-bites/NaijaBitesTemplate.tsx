"use client";

// src/features/templates/naija-bites/NaijaBitesTemplate.tsx
// Self-contained restaurant website template.
// Renders with whatever content object is passed in.

import React, { useState } from "react";
import type { NaijaBitesContent } from "./defaultContent";

// ── WhatsApp helper ────────────────────────────────────────────────────────────
function whatsappLink(number: string, message: string) {
  const clean = number.replace(/\D/g, "");
  return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`;
}

// ── Decorative doodle ─────────────────────────────────────────────────────────
function SpicePattern() {
  return (
    <svg viewBox="0 0 200 200" className="absolute opacity-[0.06] pointer-events-none" fill="currentColor">
      <circle cx="20" cy="20" r="4" />
      <circle cx="60" cy="10" r="2" />
      <circle cx="100" cy="30" r="5" />
      <circle cx="140" cy="15" r="3" />
      <circle cx="180" cy="25" r="4" />
      <circle cx="10" cy="70" r="3" />
      <circle cx="50" cy="55" r="5" />
      <circle cx="90" cy="80" r="2" />
      <circle cx="130" cy="60" r="4" />
      <circle cx="170" cy="75" r="3" />
      <circle cx="25" cy="120" r="4" />
      <circle cx="65" cy="105" r="2" />
      <circle cx="105" cy="130" r="5" />
      <circle cx="145" cy="110" r="3" />
      <circle cx="185" cy="125" r="4" />
      <path d="M30 40 Q40 30 50 40 Q40 50 30 40Z" />
      <path d="M110 90 Q120 80 130 90 Q120 100 110 90Z" />
      <path d="M70 160 Q80 150 90 160 Q80 170 70 160Z" />
      <path d="M150 170 Q160 160 170 170 Q160 180 150 170Z" />
    </svg>
  );
}

// ── Main Template ──────────────────────────────────────────────────────────────

interface Props {
  content: NaijaBitesContent;
  isPreview?: boolean;
}

export default function NaijaBitesTemplate({ content, isPreview = false }: Props) {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    ...Array.from(new Set(content.menuItems.map((m) => m.category))),
  ];

  const filteredMenu =
    activeCategory === "All"
      ? content.menuItems
      : content.menuItems.filter((m) => m.category === activeCategory);

  const orderLink = whatsappLink(
    content.whatsappNumber,
    `Hi ${content.businessName}! I'd like to place an order 🍽️`
  );

  return (
    <>
      {/* Font import — scoped to template */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=DM+Sans:wght@400;500;600&display=swap');
        .nb-font-display { font-family: 'Playfair Display', Georgia, serif; }
        .nb-font-body   { font-family: 'DM Sans', system-ui, sans-serif; }
        .nb-hero-bg {
          background: linear-gradient(135deg, #0d2b1d 0%, #1a4a2e 50%, #0d2b1d 100%);
        }
        .nb-card:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.12); }
        .nb-card { transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .nb-btn-wa {
          background: #25d366;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 28px;
          border-radius: 50px;
          font-weight: 700;
          font-size: 15px;
          color: #fff;
          transition: transform 0.2s, box-shadow 0.2s;
          text-decoration: none;
          box-shadow: 0 4px 20px rgba(37,211,102,0.35);
        }
        .nb-btn-wa:hover { transform: scale(1.04); box-shadow: 0 8px 30px rgba(37,211,102,0.45); }
        .nb-section-divider {
          height: 2px;
          background: linear-gradient(90deg, transparent, #d97706, transparent);
          margin: 0 auto;
          width: 80px;
        }
        @keyframes nb-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .nb-float { animation: nb-float 3.5s ease-in-out infinite; }
        .nb-tag {
          background: #d97706;
          color: #fff;
          font-size: 11px;
          font-weight: 700;
          padding: 2px 10px;
          border-radius: 50px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
      `}</style>

      <div className="nb-font-body" style={{ background: "#fdf8f0", minHeight: "100vh", color: "#1a1a1a" }}>

        {/* ── Sticky nav ───────────────────────────────────────────────────── */}
        <nav
          style={{
            position: isPreview ? "sticky" : "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            background: "rgba(13, 43, 29, 0.97)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 26 }}>{content.heroEmoji}</span>
              <div>
                <div className="nb-font-display" style={{ color: "#fff", fontSize: 16, fontWeight: 700, lineHeight: 1.1 }}>
                  {content.businessName}
                </div>
                <div style={{ color: "#d97706", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  {content.tagline}
                </div>
              </div>
            </div>
            <a href={orderLink} target="_blank" rel="noreferrer" className="nb-btn-wa" style={{ padding: "8px 18px", fontSize: 13 }}>
              <WhatsAppIcon size={16} />
              Order Now
            </a>
          </div>
        </nav>

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section
          className="nb-hero-bg"
          style={{ paddingTop: isPreview ? 80 : 140, paddingBottom: 80, position: "relative", overflow: "hidden" }}
        >
          <div style={{ position: "absolute", inset: 0, color: "#fff" }}>
            <SpicePattern />
          </div>
          {/* Radial glow */}
          <div style={{
            position: "absolute", top: "30%", left: "50%", transform: "translate(-50%, -50%)",
            width: 600, height: 400, borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(217,119,6,0.18) 0%, transparent 70%)",
            pointerEvents: "none"
          }} />

          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px", position: "relative", zIndex: 2 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(217,119,6,0.2)", border: "1px solid rgba(217,119,6,0.4)", borderRadius: 50, padding: "4px 14px", marginBottom: 20 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#d97706", display: "inline-block" }} />
                  <span style={{ color: "#fbbf24", fontSize: 12, fontWeight: 600, letterSpacing: "0.06em" }}>Open for Orders</span>
                </div>
                <h1 className="nb-font-display" style={{ color: "#fff", fontSize: "clamp(36px, 5vw, 58px)", fontWeight: 800, lineHeight: 1.1, marginBottom: 20 }}>
                  Real Food,<br />
                  <span style={{ color: "#d97706" }}>Real Flavour.</span>
                </h1>
                <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 17, lineHeight: 1.7, marginBottom: 32, maxWidth: 400 }}>
                  {content.heroDescription}
                </p>
                <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                  <a href={orderLink} target="_blank" rel="noreferrer" className="nb-btn-wa">
                    <WhatsAppIcon size={20} />
                    Order on WhatsApp
                  </a>
                  <a href="#menu" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 24px", borderRadius: 50, border: "2px solid rgba(255,255,255,0.25)", color: "#fff", fontWeight: 600, fontSize: 15, textDecoration: "none", transition: "border-color 0.2s" }}>
                    View Menu ↓
                  </a>
                </div>

                {/* Trust badges */}
                <div style={{ display: "flex", gap: 24, marginTop: 36 }}>
                  {[["🍽️", "Fresh Daily"], ["🏠", "Home Delivery"], ["⚡", "Fast Orders"]].map(([emoji, text]) => (
                    <div key={text} style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 20, marginBottom: 4 }}>{emoji}</div>
                      <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, fontWeight: 600, letterSpacing: "0.04em" }}>{text}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hero visual */}
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div className="nb-float" style={{ position: "relative" }}>
                  <div style={{
                    width: 280, height: 280, borderRadius: "50%",
                    background: "radial-gradient(circle, #d97706 0%, #b45309 60%, #92400e 100%)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 30px 80px rgba(217,119,6,0.4), 0 0 0 20px rgba(217,119,6,0.1), 0 0 0 40px rgba(217,119,6,0.05)",
                    fontSize: 100,
                  }}>
                    {content.heroEmoji}
                  </div>
                  {/* Orbiting badges */}
                  <div style={{ position: "absolute", top: -10, right: -20, background: "#fff", borderRadius: 12, padding: "8px 14px", boxShadow: "0 8px 20px rgba(0,0,0,0.15)", fontSize: 13, fontWeight: 700, whiteSpace: "nowrap" }}>
                    ⭐ Loved in Lagos
                  </div>
                  <div style={{ position: "absolute", bottom: 0, left: -30, background: "#0d2b1d", border: "1px solid rgba(217,119,6,0.3)", borderRadius: 12, padding: "8px 14px", boxShadow: "0 8px 20px rgba(0,0,0,0.3)", fontSize: 13, fontWeight: 600, color: "#fff", whiteSpace: "nowrap" }}>
                    🛵 Free delivery
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom wave */}
          <div style={{ position: "absolute", bottom: -1, left: 0, right: 0 }}>
            <svg viewBox="0 0 1440 60" fill="#fdf8f0" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" />
            </svg>
          </div>
        </section>

        {/* ── Menu ─────────────────────────────────────────────────────────── */}
        <section id="menu" style={{ padding: "80px 20px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 50 }}>
              <span className="nb-tag">Our Menu</span>
              <h2 className="nb-font-display" style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 700, marginTop: 12, marginBottom: 8, color: "#0d2b1d" }}>
                What We&apos;re Cooking
              </h2>
              <div className="nb-section-divider" />
            </div>

            {/* Category filter */}
            <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 40 }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: "8px 20px",
                    borderRadius: 50,
                    border: "none",
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: 600,
                    transition: "all 0.2s",
                    background: activeCategory === cat ? "#0d2b1d" : "#f0ebe2",
                    color: activeCategory === cat ? "#fff" : "#555",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Menu grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
              {filteredMenu.map((item) => (
                <div
                  key={item.id}
                  className="nb-card"
                  style={{
                    background: "#fff",
                    borderRadius: 18,
                    padding: 24,
                    border: "1px solid rgba(0,0,0,0.06)",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 18,
                  }}
                >
                  <div style={{
                    width: 56, height: 56, borderRadius: 14,
                    background: "linear-gradient(135deg, #fef3c7, #fde68a)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 26, flexShrink: 0
                  }}>
                    {item.emoji}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                      <span style={{ fontWeight: 700, fontSize: 15, color: "#0d2b1d" }}>{item.name}</span>
                      <span style={{ fontWeight: 800, fontSize: 15, color: "#d97706", whiteSpace: "nowrap", marginLeft: 12 }}>{item.price}</span>
                    </div>
                    <p style={{ fontSize: 13, color: "#666", lineHeight: 1.5, margin: 0 }}>{item.description}</p>
                    <a
                      href={whatsappLink(content.whatsappNumber, `Hi! I want to order ${item.name} (${item.price}) from ${content.businessName}`)}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: "inline-flex", alignItems: "center", gap: 5,
                        marginTop: 10, color: "#25d366", fontSize: 12, fontWeight: 700,
                        textDecoration: "none",
                      }}
                    >
                      <WhatsAppIcon size={13} />
                      Order this
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── About ────────────────────────────────────────────────────────── */}
        <section style={{ background: "#0d2b1d", padding: "80px 20px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, color: "#fff" }}>
            <SpicePattern />
          </div>
          <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 2 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
              {/* Text */}
              <div>
                <span className="nb-tag">Our Story</span>
                <h2 className="nb-font-display" style={{ color: "#fff", fontSize: "clamp(26px, 3.5vw, 38px)", fontWeight: 700, marginTop: 12, marginBottom: 16, lineHeight: 1.2 }}>
                  Made With Love<br />Since {content.foundedYear}
                </h2>
                <p style={{ color: "rgba(255,255,255,0.72)", lineHeight: 1.8, fontSize: 15 }}>
                  {content.aboutText}
                </p>
              </div>

              {/* Info cards */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { icon: "📍", label: "Find Us", value: content.address },
                  { icon: "🕐", label: "Opening Hours", value: content.openingHours },
                  { icon: "📱", label: "Order Now", value: "Message us on WhatsApp" },
                ].map(({ icon, label, value }) => (
                  <div
                    key={label}
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 16, padding: "16px 20px",
                      display: "flex", alignItems: "center", gap: 16
                    }}
                  >
                    <span style={{ fontSize: 24, flexShrink: 0 }}>{icon}</span>
                    <div>
                      <div style={{ color: "#d97706", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 3 }}>{label}</div>
                      <div style={{ color: "#fff", fontSize: 14, fontWeight: 500 }}>{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <section style={{ padding: "80px 20px", background: "#fdf8f0", textAlign: "center" }}>
          <div style={{ maxWidth: 600, margin: "0 auto" }}>
            <div style={{ fontSize: 56, marginBottom: 20 }}>😋</div>
            <h2 className="nb-font-display" style={{ fontSize: "clamp(26px, 4vw, 40px)", color: "#0d2b1d", marginBottom: 12 }}>
              Hungry? Let&apos;s Talk.
            </h2>
            <p style={{ color: "#777", fontSize: 16, marginBottom: 32, lineHeight: 1.7 }}>
              Place your order directly on WhatsApp. We&apos;ll confirm and deliver fresh to you.
            </p>
            <a href={orderLink} target="_blank" rel="noreferrer" className="nb-btn-wa" style={{ fontSize: 16, padding: "16px 36px" }}>
              <WhatsAppIcon size={22} />
              Start Your Order
            </a>
          </div>
        </section>

        {/* ── Footer ───────────────────────────────────────────────────────── */}
        <footer style={{ background: "#060f08", padding: "32px 20px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 22 }}>{content.heroEmoji}</span>
              <div className="nb-font-display" style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>{content.businessName}</div>
            </div>
            <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
              {content.instagramHandle && (
                <a
                  href={`https://instagram.com/${content.instagramHandle}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, textDecoration: "none" }}
                >
                  @{content.instagramHandle}
                </a>
              )}
              <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>
                Powered by <span style={{ color: "#d97706" }}>MakeSite</span>
              </span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

// ── WhatsApp SVG Icon ──────────────────────────────────────────────────────────
function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}