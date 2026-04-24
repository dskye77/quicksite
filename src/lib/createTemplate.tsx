// lib/createTemplate.tsx
/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { Sparkles } from "lucide-react";
import type { Site } from "@/lib/types";
import type { Theme } from "@/lib/themes";
import ErrorMessage from "@/assets/siteTemplates/ErrorMessage";

// ─── Types ─────────────────────────────────────────────────────────────────

export interface EditorBodyProps<TContent> {
  content: TContent;
  updateContent: (updates: Partial<TContent>) => void;
  data: Site;
}

export interface DisplayBodyProps<TContent> {
  content: TContent;
  data: Site;
}

export interface TemplateConfig<TContent> {
  /** Must match site.type / site.templateId in Firestore */
  templateId: string;

  /** Extract typed content from site.content with safe defaults */
  normalizeContent: (site: Site) => TContent;

  /** The editor layout — receives content + updater + raw site data */
  EditorBody: React.FC<EditorBodyProps<TContent>>;

  /** The public display layout — receives content + raw site data */
  DisplayBody: React.FC<DisplayBodyProps<TContent>>;
}

// ─── Factory ───────────────────────────────────────────────────────────────

export function createTemplate<TContent>(
  config: TemplateConfig<TContent>,
  theme: Theme,
) {
  const { templateId, normalizeContent, EditorBody, DisplayBody } = config;

  // ── Shared guard ────────────────────────────────────────────────────────
  function isValidSite(data: Site | null | undefined): data is Site {
    if (!data) return false;
    return data.type === templateId || data.templateId === templateId;
  }

  // ── Editor component ────────────────────────────────────────────────────
  function TemplateEditor({
    data,
    onUpdate,
  }: {
    data: Site;
    onUpdate: (updates: Partial<Site>) => void;
  }) {
    if (!isValidSite(data)) return <ErrorMessage />;

    const content = normalizeContent(data);

    const updateContent = (updates: Partial<TContent>) =>
      onUpdate({ content: { ...content, ...updates } });

    return (
      <>
        <style>{theme.css}</style>
        <div
          className={theme.className}
          style={{
            background: "var(--qs-bg)",
            color: "var(--qs-text)",
            minHeight: "100vh",
          }}
        >
          {/* ── Editor banner — shared across all templates ── */}
          <div
            style={{
              background: "linear-gradient(90deg, #f0c040, #ffd700)",
              color: "#000",
              padding: "8px 24px",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.1em",
              display: "flex",
              alignItems: "center",
              gap: 8,
              justifyContent: "center",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            <Sparkles size={14} />
            EDITOR MODE — Click any text to edit. Changes auto-preview below.
          </div>

          {/* ── Template-specific editor body ── */}
          <EditorBody
            content={content}
            updateContent={updateContent}
            data={data}
          />
        </div>
      </>
    );
  }

  // ── Display component ────────────────────────────────────────────────────
  function TemplateDisplay({ data }: { data: Site }) {
    if (!isValidSite(data)) return <ErrorMessage />;

    const content = normalizeContent(data);

    return (
      <>
        <style>{theme.css}</style>
        <div
          className={theme.className}
          style={{
            background: "var(--qs-bg)",
            color: "var(--qs-text)",
            minHeight: "100vh",
          }}
        >
          <DisplayBody content={content} data={data} />
        </div>
      </>
    );
  }

  return { TemplateEditor, TemplateDisplay };
}