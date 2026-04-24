// lib/themes.ts

export type Theme = {
    /** CSS class applied to the root wrapper div */
    className: string;
    /** Full CSS string injected via <style> — defines vars + utility classes */
    css: string;
    /** Font stack for the theme (used for reference / meta only) */
    font: string;
  };
  
  // ─── Shared utility-class CSS (appended to every theme) ────────────────────
  // All utility classes reference CSS vars so they automatically adapt per theme.
  const SHARED_UTILITIES = `
    .qs-catalogue * { box-sizing: border-box; }
  
    .qs-catalogue .qs-badge {
      background: var(--qs-accent);
      color: var(--qs-accent-fg, #000);
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      padding: 2px 8px;
      border-radius: 2px;
    }
    .qs-catalogue .qs-tag-pill {
      background: var(--qs-surface2);
      color: var(--qs-muted);
      border: 1px solid var(--qs-border);
      font-size: 11px;
      font-weight: 500;
      padding: 4px 12px;
      border-radius: 999px;
      cursor: pointer;
      transition: all 0.15s;
      font-family: var(--qs-font);
    }
    .qs-catalogue .qs-tag-pill.active,
    .qs-catalogue .qs-tag-pill:hover {
      background: var(--qs-accent);
      color: var(--qs-accent-fg, #000);
      border-color: var(--qs-accent);
    }
    .qs-catalogue .qs-card {
      background: var(--qs-surface);
      border: 1px solid var(--qs-border);
      border-radius: var(--qs-radius, 16px);
      overflow: hidden;
      transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
    }
    .qs-catalogue .qs-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--qs-card-shadow, 0 24px 60px rgba(0,0,0,0.4));
      border-color: var(--qs-card-hover-border, rgba(240,192,64,0.25));
    }
    .qs-catalogue .qs-img-wrap {
      position: relative;
      overflow: hidden;
      aspect-ratio: 1;
      background: var(--qs-surface2);
    }
    .qs-catalogue .qs-img-wrap img {
      width: 100%; height: 100%; object-fit: cover;
      transition: transform 0.4s ease;
    }
    .qs-catalogue .qs-card:hover .qs-img-wrap img {
      transform: scale(1.05);
    }
    .qs-catalogue .qs-wa-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: var(--qs-wa);
      color: #fff;
      font-weight: 700;
      font-size: 14px;
      padding: 12px 24px;
      border-radius: 999px;
      border: none;
      cursor: pointer;
      transition: filter 0.15s, transform 0.15s;
      font-family: var(--qs-font);
    }
    .qs-catalogue .qs-wa-btn:hover { filter: brightness(1.1); transform: scale(1.03); }
    @media (max-width: 640px) {
      .qs-catalogue .qs-product-grid { grid-template-columns: 1fr 1fr !important; }
      .qs-catalogue .qs-hero-split { grid-template-columns: 1fr !important; }
    }
    .qs-catalogue .qs-number-badge {
      width: 36px; height: 36px;
      border-radius: 50%;
      background: var(--qs-accent);
      color: var(--qs-accent-fg, #000);
      font-weight: 800;
      font-size: 13px;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
    }
    @keyframes qs-slide-up {
      from { opacity: 0; transform: translateY(12px) scale(0.95); }
      to   { opacity: 1; transform: translateY(0)   scale(1);    }
    }
    .qs-catalogue [contenteditable]:focus {
      outline: 2px solid var(--qs-accent);
      outline-offset: 2px;
      border-radius: 4px;
    }
    .qs-catalogue [contenteditable]:empty:before {
      content: attr(data-placeholder);
      color: var(--qs-muted);
      pointer-events: none;
    }
    .qs-catalogue .qs-section-label {
      font-size: 11px;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--qs-accent);
      font-weight: 700;
    }
    .qs-catalogue .qs-divider {
      height: 1px;
      background: var(--qs-border);
      margin: 0;
    }
  `;
  
  // ─── THEME: Dark Gold (original Template-1 look) ───────────────────────────
  export const darkGoldTheme: Theme = {
    className: "qs-catalogue",
    font: "Georgia, 'Times New Roman', serif",
    css: `
    .qs-catalogue {
      --qs-bg:               #0a0a0a;
      --qs-surface:          #141414;
      --qs-surface2:         #1c1c1c;
      --qs-border:           rgba(255,255,255,0.08);
      --qs-text:             #f5f5f0;
      --qs-muted:            #888;
      --qs-accent:           #f0c040;
      --qs-accent-fg:        #000;
      --qs-accent2:          #3ecf8e;
      --qs-wa:               #25d366;
      --qs-font:             Georgia, 'Times New Roman', serif;
      --qs-radius:           16px;
      --qs-card-shadow:      0 24px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(240,192,64,0.15);
      --qs-card-hover-border:rgba(240,192,64,0.25);
      font-family: var(--qs-font);
    }
    ${SHARED_UTILITIES}
    `,
  };
  
  // ─── THEME: Light Minimal ──────────────────────────────────────────────────
  export const lightMinimalTheme: Theme = {
    className: "qs-catalogue",
    font: "'DM Sans', sans-serif",
    css: `
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=DM+Serif+Display&display=swap');
    .qs-catalogue {
      --qs-bg:               #fafaf8;
      --qs-surface:          #ffffff;
      --qs-surface2:         #f2f2ef;
      --qs-border:           rgba(0,0,0,0.08);
      --qs-text:             #111110;
      --qs-muted:            #888;
      --qs-accent:           #18181b;
      --qs-accent-fg:        #fff;
      --qs-accent2:          #16a34a;
      --qs-wa:               #25d366;
      --qs-font:             'DM Sans', sans-serif;
      --qs-radius:           12px;
      --qs-card-shadow:      0 8px 32px rgba(0,0,0,0.08);
      --qs-card-hover-border:rgba(0,0,0,0.2);
      font-family: var(--qs-font);
    }
    ${SHARED_UTILITIES}
    `,
  };
  
  // ─── THEME: Vibrant Purple ─────────────────────────────────────────────────
  export const vibrantPurpleTheme: Theme = {
    className: "qs-catalogue",
    font: "'Syne', sans-serif",
    css: `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&display=swap');
    .qs-catalogue {
      --qs-bg:               #0d0814;
      --qs-surface:          #150f1e;
      --qs-surface2:         #1e1530;
      --qs-border:           rgba(139,92,246,0.15);
      --qs-text:             #f0ecff;
      --qs-muted:            #7c6f9a;
      --qs-accent:           #a855f7;
      --qs-accent-fg:        #fff;
      --qs-accent2:          #22d3ee;
      --qs-wa:               #25d366;
      --qs-font:             'Syne', sans-serif;
      --qs-radius:           20px;
      --qs-card-shadow:      0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(168,85,247,0.2);
      --qs-card-hover-border:rgba(168,85,247,0.4);
      font-family: var(--qs-font);
    }
    ${SHARED_UTILITIES}
    `,
  };
  
  // ─── THEME: Warm Earth (portfolio / services) ──────────────────────────────
  export const warmEarthTheme: Theme = {
    className: "qs-catalogue",
    font: "'Cormorant Garamond', Georgia, serif",
    css: `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Jost:wght@400;500;700&display=swap');
    .qs-catalogue {
      --qs-bg:               #f7f3ee;
      --qs-surface:          #fff9f4;
      --qs-surface2:         #ede8e0;
      --qs-border:           rgba(100,70,40,0.12);
      --qs-text:             #2c1f0e;
      --qs-muted:            #9e8c78;
      --qs-accent:           #c0622a;
      --qs-accent-fg:        #fff;
      --qs-accent2:          #4a7c59;
      --qs-wa:               #25d366;
      --qs-font:             'Jost', sans-serif;
      --qs-radius:           8px;
      --qs-card-shadow:      0 12px 40px rgba(60,30,10,0.1);
      --qs-card-hover-border:rgba(192,98,42,0.3);
      font-family: var(--qs-font);
    }
    ${SHARED_UTILITIES}
    `,
  };