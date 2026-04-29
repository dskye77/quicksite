/* eslint-disable @typescript-eslint/no-explicit-any */
import { TemplateProps, TemplateComponentProps } from "@/lib/templates";
import { Navbar, Footer } from "./layout";
import TemplateImage from "@/components/shared/TemplateImage";
import CtaLink from "@/components/shared/CtaLinkModal";

function Hero({ isEditor, content, onUpdate }: TemplateComponentProps) {
  return (
    <section className="px-6 py-20 text-center md:py-32">
      <div className="mx-auto max-w-4xl">
        <span
          className="mb-6 inline-block rounded-full px-4 py-1.5 text-sm font-semibold"
          style={{
            background: "var(--qs-primary)",
            color: "var(--qs-primary-fg)",
          }}
          contentEditable={isEditor}
          onBlur={(e) => onUpdate("hero.badge", e.currentTarget.textContent)}
        >
          {content?.hero?.badge}
        </span>
        <h1
          className="text-5xl font-extrabold tracking-tight md:text-7xl"
          contentEditable={isEditor}
          onBlur={(e) => onUpdate("hero.title", e.currentTarget.textContent)}
        >
          {content?.hero?.title}
        </h1>
        <p
          className="mt-8 text-lg md:text-xl"
          style={{ color: "var(--qs-text-muted)" }}
          contentEditable={isEditor}
          onBlur={(e) => onUpdate("hero.desc", e.currentTarget.textContent)}
        >
          {content?.hero?.desc}
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <CtaLink
            isEditor={isEditor}
            label={content?.hero?.primaryButton}
            linkConfig={content?.hero?.primaryButtonLink}
            onLabelChange={(v) => onUpdate("hero.primaryButton", v)}
            onLinkChange={(cfg) => onUpdate("hero.primaryButtonLink", cfg)}
            className="rounded-full px-8 py-4 font-bold transition-transform hover:scale-105"
            style={{
              background: "var(--qs-primary)",
              color: "var(--qs-primary-fg)",
            }}
          />
        </div>
        <div
          className="mt-16 overflow-hidden rounded-2xl border shadow-2xl"
          style={{ borderColor: "var(--qs-border)" }}
        >
          <TemplateImage
            source={content?.hero?.image1}
            isEditor={isEditor}
            onImageChange={(url) => onUpdate("hero.image1", url)}
          />
        </div>
      </div>
    </section>
  );
}

function Features({ isEditor, content, onUpdate }: TemplateComponentProps) {
  const features = content?.features ?? [];
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <h2
        className="mb-16 text-center text-3xl font-bold md:text-5xl"
        contentEditable={isEditor}
        onBlur={(e) => onUpdate("featuresHeading", e.currentTarget.textContent)}
      >
        {content?.featuresHeading}
      </h2>
      <div className="grid gap-8 md:grid-cols-3">
        {features.map((f: any, i: number) => (
          <div
            key={i}
            className="rounded-3xl border p-8"
            style={{
              background: "var(--qs-bg-alt)",
              borderColor: "var(--qs-border)",
            }}
          >
            <h3
              className="text-xl font-bold"
              contentEditable={isEditor}
              onBlur={(e) => {
                const items = [...features];
                items[i].title = e.currentTarget.textContent;
                onUpdate("features", items);
              }}
            >
              {f.title}
            </h3>
            <p
              className="mt-4"
              style={{ color: "var(--qs-text-muted)" }}
              contentEditable={isEditor}
              onBlur={(e) => {
                const items = [...features];
                items[i].desc = e.currentTarget.textContent;
                onUpdate("features", items);
              }}
            >
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Home({
  isEditor,
  content,
  onUpdate,
  slugs,
}: TemplateProps) {
  const handleUpdate = (path: string, value: any) => {
    if (onUpdate) onUpdate(path, value);
  };
  return (
    <>
      <Navbar
        isEditor={isEditor}
        content={content}
        onUpdate={handleUpdate}
        slugs={slugs}
      />
      <Hero isEditor={isEditor} content={content} onUpdate={handleUpdate} />
      <Features isEditor={isEditor} content={content} onUpdate={handleUpdate} />
      <section className="mx-auto max-w-4xl px-6 py-24 text-center">
        <div
          className="rounded-4xl p-12"
          style={{
            background: "var(--qs-primary)",
            color: "var(--qs-primary-fg)",
          }}
        >
          <h2
            className="text-3xl font-bold md:text-5xl"
            contentEditable={isEditor}
            onBlur={(e) =>
              handleUpdate("contact.title", e.currentTarget.textContent)
            }
          >
            {content?.contact?.title}
          </h2>
          <p className="mt-6 text-lg opacity-90">{content?.contact?.desc}</p>
          <CtaLink
            isEditor={isEditor}
            label={content?.contact?.primaryButton}
            linkConfig={content?.contact?.primaryButtonLink}
            onLabelChange={(v) => handleUpdate("contact.primaryButton", v)}
            onLinkChange={(cfg) =>
              handleUpdate("contact.primaryButtonLink", cfg)
            }
            className="mt-8 inline-block rounded-full bg-white px-8 py-4 font-bold text-black"
          />
        </div>
      </section>
      <Footer isEditor={isEditor} content={content} onUpdate={handleUpdate} />
    </>
  );
}
