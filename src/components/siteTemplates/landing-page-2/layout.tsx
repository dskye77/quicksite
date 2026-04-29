/* eslint-disable @typescript-eslint/no-explicit-any */
import { TemplateComponentProps } from "@/lib/templates";
import CtaLink from "@/components/shared/CtaLinkModal";
import Branding from "@/components/shared/Branding";

export function Navbar({
  isEditor,
  content,
  onUpdate,
  slugs,
}: TemplateComponentProps) {
  const slug = slugs?.slug;
  const buildLink = (val: string, type: "page" | "section" = "section") =>
    (isEditor ? "/editor/" : "/s/") +
    slug +
    (type === "page" ? `/${val}` : `#${val}`);

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-md"
      style={{
        background: "rgba(255,255,255,0.8)",
        borderColor: "var(--qs-border)",
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2 font-bold text-xl">
          <span>{content?.navbar?.logo}</span>
          <span
            contentEditable={isEditor}
            onBlur={(e) =>
              onUpdate("navbar.title", e.currentTarget.textContent)
            }
          >
            {content?.navbar?.title}
          </span>
        </div>
        <nav className="hidden md:flex gap-8 font-medium">
          <a href={buildLink("pricing", "page")}>Pricing</a>
          <a href="#features">Features</a>
        </nav>
        <CtaLink
          isEditor={isEditor}
          label={content?.navbar?.ctaButton}
          linkConfig={content?.navbar?.ctaButtonLink}
          onLabelChange={(v) => onUpdate("navbar.ctaButton", v)}
          onLinkChange={(cfg) => onUpdate("navbar.ctaButtonLink", cfg)}
          className="rounded-full px-5 py-2 text-sm font-bold"
          style={{
            background: "var(--qs-primary)",
            color: "var(--qs-primary-fg)",
          }}
        />
      </div>
    </header>
  );
}

export function Footer({ isEditor, content }: TemplateComponentProps) {
  return (
    <footer
      className="border-t py-12"
      style={{
        background: "var(--qs-bg-alt)",
        borderColor: "var(--qs-border)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <p className="font-bold">{content?.footer?.brand}</p>
          <p className="text-sm opacity-60">{content?.footer?.copyright}</p>
        </div>
        {!isEditor && <Branding />}
        <div className="flex gap-6">
          {content?.footer?.socials?.map((s: string, i: number) => (
            <a key={i} href="#" className="text-sm hover:underline">
              {s}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
