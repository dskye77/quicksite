// lib/theme.ts

export type Theme = {
  className: string;
  css: string;
  font: string;
};

function makeTheme(params: { font: string; colors: string }): Theme {
  return {
    className: "qs-theme",
    font: params.font,
    css: `
      .qs-theme {
        ${params.colors}
        --qs-font: ${params.font};
        font-family: var(--qs-font);
      }
    `,
  };
}

/* =========================
   THEMES (semantic tokens only)
   ========================= */

// 1. Tech Dark
export const techTheme = makeTheme({
  font: "'Inter', system-ui, sans-serif",
  colors: `
    --qs-bg: #0a0f1c;
    --qs-bg-alt: #111827;

    --qs-primary: #60a5fa;
    --qs-primary-fg: #050b18;

    --qs-secondary: #a78bfa;
    --qs-secondary-fg: #0a0f1c;

    --qs-text: #e5e7eb;
    --qs-text-muted: rgba(229,231,235,0.65);

    --qs-border: rgba(255,255,255,0.10);
  `,
});

// 2. Light
export const lightTheme = makeTheme({
  font: "'DM Sans', system-ui, sans-serif",
  colors: `
    --qs-bg: #fafaf8;
    --qs-bg-alt: #ffffff;

    --qs-primary: #111110;
    --qs-primary-fg: #ffffff;

    --qs-secondary: #16a34a;
    --qs-secondary-fg: #ffffff;

    --qs-text: #111110;
    --qs-text-muted: #747474;

    --qs-border: rgba(0,0,0,0.08);
  `,
});

// 3. Editorial
export const editorialTheme = makeTheme({
  font: "'Cormorant Garamond', Georgia, serif",
  colors: `
    --qs-bg: #f6f1ea;
    --qs-bg-alt: #fffaf4;

    --qs-primary: #7c3f1d;
    --qs-primary-fg: #fff8f0;

    --qs-secondary: #425f54;
    --qs-secondary-fg: #ffffff;

    --qs-text: #281a10;
    --qs-text-muted: #8f7b67;

    --qs-border: rgba(62,42,25,0.12);
  `,
});

// 4. Neon
export const neonTheme = makeTheme({
  font: "'Inter', system-ui, sans-serif",
  colors: `
    --qs-bg: #070a12;
    --qs-bg-alt: #0f172a;

    --qs-primary: #00e5ff;
    --qs-primary-fg: #001018;

    --qs-secondary: #7c3aed;
    --qs-secondary-fg: #ffffff;

    --qs-text: #eaf0ff;
    --qs-text-muted: rgba(234,240,255,0.62);

    --qs-border: rgba(255,255,255,0.12);
  `,
});

// 5. Mono
export const monoTheme = makeTheme({
  font: "'IBM Plex Mono', monospace",
  colors: `
    --qs-bg: #f3f0e8;
    --qs-bg-alt: #fffdfa;

    --qs-primary: #111111;
    --qs-primary-fg: #ffffff;

    --qs-secondary: #ff4d2e;
    --qs-secondary-fg: #111111;

    --qs-text: #111111;
    --qs-text-muted: #4a4a4a;

    --qs-border: #111111;
  `,
});

/* =========================
   REGISTRY
   ========================= */

export const themeRegistry: Record<string, Theme> = {
  tech: techTheme,
  light: lightTheme,
  editorial: editorialTheme,
  neon: neonTheme,
  mono: monoTheme,
};
