// lib/theme.ts

export type Theme = {
  className: string;
  css: string;
  font: string;
  name: string;
  description: string;
  preview?: {
    bg: string;
    primary: string;
    text: string;
  };
};

type ThemeParams = {
  name: string;
  description: string;
  font: string;
  colors: string;
  preview?: {
    bg: string;
    primary: string;
    text: string;
  };
};

function makeTheme(params: ThemeParams): Theme {
  return {
    className: "qs-theme",
    name: params.name,
    description: params.description,
    font: params.font,
    preview: params.preview,
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
   THEMES
   ========================= */

// 1. Light Modern
export const lightTheme = makeTheme({
  name: "Light",
  description: "Clean and minimal light theme",
  font: "'Inter', system-ui, -apple-system, sans-serif",
  preview: {
    bg: "#ffffff",
    primary: "#2563eb",
    text: "#0f172a",
  },
  colors: `
    --qs-bg: #ffffff;
    --qs-bg-alt: #f8fafc;

    --qs-primary: #2563eb;
    --qs-primary-fg: #ffffff;

    --qs-secondary: #0ea5e9;
    --qs-secondary-fg: #ffffff;

    --qs-text: #0f172a;
    --qs-text-muted: #64748b;

    --qs-border: #e2e8f0;
    --qs-shadow: rgba(0, 0, 0, 0.05);
  `,
});

// 2. Dark Modern
export const darkTheme = makeTheme({
  name: "Dark",
  description: "Sleek dark theme for modern brands",
  font: "'Inter', system-ui, -apple-system, sans-serif",
  preview: {
    bg: "#0f172a",
    primary: "#3b82f6",
    text: "#f1f5f9",
  },
  colors: `
    --qs-bg: #0f172a;
    --qs-bg-alt: #1e293b;

    --qs-primary: #3b82f6;
    --qs-primary-fg: #ffffff;

    --qs-secondary: #8b5cf6;
    --qs-secondary-fg: #ffffff;

    --qs-text: #f1f5f9;
    --qs-text-muted: #94a3b8;

    --qs-border: #334155;
    --qs-shadow: rgba(0, 0, 0, 0.3);
  `,
});

// 3. Warm Beige
export const warmTheme = makeTheme({
  name: "Warm",
  description: "Cozy beige tones for lifestyle brands",
  font: "'DM Sans', system-ui, -apple-system, sans-serif",
  preview: {
    bg: "#faf8f5",
    primary: "#d97706",
    text: "#292524",
  },
  colors: `
    --qs-bg: #faf8f5;
    --qs-bg-alt: #ffffff;

    --qs-primary: #d97706;
    --qs-primary-fg: #ffffff;

    --qs-secondary: #ea580c;
    --qs-secondary-fg: #ffffff;

    --qs-text: #292524;
    --qs-text-muted: #78716c;

    --qs-border: #e7e5e4;
    --qs-shadow: rgba(0, 0, 0, 0.04);
  `,
});

// 4. Ocean Blue
export const oceanTheme = makeTheme({
  name: "Ocean",
  description: "Calming blue palette for professional sites",
  font: "'Inter', system-ui, -apple-system, sans-serif",
  preview: {
    bg: "#f0f9ff",
    primary: "#0369a1",
    text: "#0c4a6e",
  },
  colors: `
    --qs-bg: #f0f9ff;
    --qs-bg-alt: #ffffff;

    --qs-primary: #0369a1;
    --qs-primary-fg: #ffffff;

    --qs-secondary: #0891b2;
    --qs-secondary-fg: #ffffff;

    --qs-text: #0c4a6e;
    --qs-text-muted: #0284c7;

    --qs-border: #bae6fd;
    --qs-shadow: rgba(14, 165, 233, 0.08);
  `,
});

// 5. Forest Green
export const forestTheme = makeTheme({
  name: "Forest",
  description: "Natural green for eco and wellness brands",
  font: "'DM Sans', system-ui, -apple-system, sans-serif",
  preview: {
    bg: "#f0fdf4",
    primary: "#15803d",
    text: "#14532d",
  },
  colors: `
    --qs-bg: #f0fdf4;
    --qs-bg-alt: #ffffff;

    --qs-primary: #15803d;
    --qs-primary-fg: #ffffff;

    --qs-secondary: #059669;
    --qs-secondary-fg: #ffffff;

    --qs-text: #14532d;
    --qs-text-muted: #166534;

    --qs-border: #bbf7d0;
    --qs-shadow: rgba(34, 197, 94, 0.08);
  `,
});

// 6. Purple Luxury
export const luxuryTheme = makeTheme({
  name: "Luxury",
  description: "Premium purple for high-end brands",
  font: "'Inter', system-ui, -apple-system, sans-serif",
  preview: {
    bg: "#faf5ff",
    primary: "#7c3aed",
    text: "#581c87",
  },
  colors: `
    --qs-bg: #faf5ff;
    --qs-bg-alt: #ffffff;

    --qs-primary: #7c3aed;
    --qs-primary-fg: #ffffff;

    --qs-secondary: #a855f7;
    --qs-secondary-fg: #ffffff;

    --qs-text: #581c87;
    --qs-text-muted: #7c3aed;

    --qs-border: #e9d5ff;
    --qs-shadow: rgba(168, 85, 247, 0.08);
  `,
});

// 7. Midnight
export const midnightTheme = makeTheme({
  name: "Midnight",
  description: "Deep blue-black for tech and startups",
  font: "'Inter', system-ui, -apple-system, sans-serif",
  preview: {
    bg: "#020617",
    primary: "#06b6d4",
    text: "#f8fafc",
  },
  colors: `
    --qs-bg: #020617;
    --qs-bg-alt: #0f172a;

    --qs-primary: #06b6d4;
    --qs-primary-fg: #020617;

    --qs-secondary: #14b8a6;
    --qs-secondary-fg: #020617;

    --qs-text: #f8fafc;
    --qs-text-muted: #94a3b8;

    --qs-border: #1e293b;
    --qs-shadow: rgba(6, 182, 212, 0.15);
  `,
});

// 8. Coral Pink
export const coralTheme = makeTheme({
  name: "Coral",
  description: "Vibrant coral for creative and fun brands",
  font: "'DM Sans', system-ui, -apple-system, sans-serif",
  preview: {
    bg: "#fff7ed",
    primary: "#ea580c",
    text: "#7c2d12",
  },
  colors: `
    --qs-bg: #fff7ed;
    --qs-bg-alt: #ffffff;

    --qs-primary: #ea580c;
    --qs-primary-fg: #ffffff;

    --qs-secondary: #f97316;
    --qs-secondary-fg: #ffffff;

    --qs-text: #7c2d12;
    --qs-text-muted: #c2410c;

    --qs-border: #fed7aa;
    --qs-shadow: rgba(249, 115, 22, 0.08);
  `,
});

// 9. Monochrome
export const monoTheme = makeTheme({
  name: "Mono",
  description: "Bold black and white minimalism",
  font: "'Space Grotesk', system-ui, -apple-system, sans-serif",
  preview: {
    bg: "#fafafa",
    primary: "#0a0a0a",
    text: "#0a0a0a",
  },
  colors: `
    --qs-bg: #fafafa;
    --qs-bg-alt: #ffffff;

    --qs-primary: #0a0a0a;
    --qs-primary-fg: #ffffff;

    --qs-secondary: #404040;
    --qs-secondary-fg: #ffffff;

    --qs-text: #0a0a0a;
    --qs-text-muted: #737373;

    --qs-border: #e5e5e5;
    --qs-shadow: rgba(0, 0, 0, 0.08);
  `,
});

// 10. Sunset
export const sunsetTheme = makeTheme({
  name: "Sunset",
  description: "Warm gradient vibes for energetic brands",
  font: "'DM Sans', system-ui, -apple-system, sans-serif",
  preview: {
    bg: "#fef3c7",
    primary: "#dc2626",
    text: "#7c2d12",
  },
  colors: `
    --qs-bg: #fef3c7;
    --qs-bg-alt: #fffbeb;

    --qs-primary: #dc2626;
    --qs-primary-fg: #ffffff;

    --qs-secondary: #f59e0b;
    --qs-secondary-fg: #ffffff;

    --qs-text: #7c2d12;
    --qs-text-muted: #b45309;

    --qs-border: #fde68a;
    --qs-shadow: rgba(245, 158, 11, 0.12);
  `,
});

// 11. Slate
export const slateTheme = makeTheme({
  name: "Slate",
  description: "Sophisticated gray for corporate sites",
  font: "'Inter', system-ui, -apple-system, sans-serif",
  preview: {
    bg: "#f8fafc",
    primary: "#475569",
    text: "#0f172a",
  },
  colors: `
    --qs-bg: #f8fafc;
    --qs-bg-alt: #ffffff;

    --qs-primary: #475569;
    --qs-primary-fg: #ffffff;

    --qs-secondary: #64748b;
    --qs-secondary-fg: #ffffff;

    --qs-text: #0f172a;
    --qs-text-muted: #64748b;

    --qs-border: #e2e8f0;
    --qs-shadow: rgba(71, 85, 105, 0.06);
  `,
});

// 12. Mint
export const mintTheme = makeTheme({
  name: "Mint",
  description: "Fresh mint for health and wellness",
  font: "'DM Sans', system-ui, -apple-system, sans-serif",
  preview: {
    bg: "#ecfdf5",
    primary: "#10b981",
    text: "#064e3b",
  },
  colors: `
    --qs-bg: #ecfdf5;
    --qs-bg-alt: #ffffff;

    --qs-primary: #10b981;
    --qs-primary-fg: #ffffff;

    --qs-secondary: #14b8a6;
    --qs-secondary-fg: #ffffff;

    --qs-text: #064e3b;
    --qs-text-muted: #059669;

    --qs-border: #a7f3d0;
    --qs-shadow: rgba(16, 185, 129, 0.08);
  `,
});

/* =========================
   REGISTRY
   ========================= */

export const themeRegistry: Record<string, Theme> = {
  light: lightTheme,
  dark: darkTheme,
  warm: warmTheme,
  ocean: oceanTheme,
  forest: forestTheme,
  luxury: luxuryTheme,
  midnight: midnightTheme,
  coral: coralTheme,
  mono: monoTheme,
  sunset: sunsetTheme,
  slate: slateTheme,
  mint: mintTheme,
};

// Helper to get all themes as an array
export const getAllThemes = () =>
  Object.entries(themeRegistry).map(([key, theme]) => ({
    id: key,
    ...theme,
  }));

// Helper to get theme by ID safely
export const getTheme = (id: string): Theme => {
  return themeRegistry[id] || lightTheme;
};
