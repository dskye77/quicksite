/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type { TemplateProps, TemplateComponentProps } from "@/lib/templates";

export default function LandingPage({
  isEditor,
  content,
  onUpdate,
}: TemplateProps) {
  const handleUpdate = (path: string, value: any) => {
    onUpdate(path, value);
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background: "var(--qs-bg)",
        color: "var(--qs-text)",
        fontFamily: "var(--qs-font)",
      }}
    >
      <Navbar isEditor={isEditor} content={content} onUpdate={handleUpdate} />
      <Hero isEditor={isEditor} content={content} onUpdate={handleUpdate} />
      <TrustedBy
        isEditor={isEditor}
        content={content}
        onUpdate={handleUpdate}
      />
      <Features isEditor={isEditor} content={content} onUpdate={handleUpdate} />
      <Stats isEditor={isEditor} content={content} onUpdate={handleUpdate} />
      <Testimonials
        isEditor={isEditor}
        content={content}
        onUpdate={handleUpdate}
      />
      <Cta isEditor={isEditor} content={content} onUpdate={handleUpdate} />
      <Footer isEditor={isEditor} content={content} onUpdate={handleUpdate} />
    </div>
  );
}
function Navbar({ isEditor, content, onUpdate }: TemplateComponentProps) {
  const links = content?.navbar?.links ?? [
    "Features",
    "Testimonials",
    "Pricing",
    "Contact",
  ];

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-md"
      style={{
        background: "color-mix(in srgb, var(--qs-bg-alt) 88%, transparent)",
        borderBottom: "1px solid var(--qs-border)",
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-2xl font-bold"
            style={{
              background: "var(--qs-primary)",
              color: "var(--qs-primary-fg)",
            }}
          >
            QS
          </div>

          <h1
            className="text-lg font-bold tracking-tight md:text-xl"
            contentEditable={isEditor}
            suppressContentEditableWarning
            onBlur={(e) =>
              onUpdate("navbar.title", e.currentTarget.textContent?.trim())
            }
          >
            {content?.navbar?.title ?? "QuickSite"}
          </h1>
        </div>

        <nav className="hidden items-center gap-6 text-sm md:flex">
          {links.map((link: string, i: number) => (
            <a key={i} href="#" className="transition-opacity hover:opacity-70">
              {link}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
function Hero({ isEditor, content, onUpdate }: TemplateComponentProps) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <div className="grid gap-12 md:grid-cols-2 md:items-center">
        <div>
          <div
            className="mb-5 inline-flex rounded-full px-4 py-2 text-sm font-medium"
            style={{
              background: "var(--qs-bg-alt)",
              border: "1px solid var(--qs-border)",
              color: "var(--qs-text-muted)",
            }}
          >
            {content?.hero?.badge ?? "Build faster. Launch smarter."}
          </div>

          <h2
            className="max-w-xl text-4xl font-bold tracking-tight md:text-6xl"
            contentEditable={isEditor}
            suppressContentEditableWarning
            onBlur={(e) =>
              onUpdate("hero.title", e.currentTarget.textContent?.trim())
            }
          >
            {content?.hero?.title ??
              "Create a landing page that turns visitors into customers."}
          </h2>

          <p
            className="mt-6 max-w-xl text-base leading-7 md:text-lg"
            style={{ color: "var(--qs-text-muted)" }}
            contentEditable={isEditor}
            suppressContentEditableWarning
            onBlur={(e) =>
              onUpdate("hero.desc", e.currentTarget.textContent?.trim())
            }
          >
            {content?.hero?.desc ??
              "QuickSite helps businesses launch polished, mobile-friendly pages in minutes — with clean design, editable content, and a structure that fits almost any brand."}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              className="rounded-xl px-6 py-3 font-semibold transition-transform hover:scale-[1.02]"
              style={{
                background: "var(--qs-primary)",
                color: "var(--qs-primary-fg)",
              }}
            >
              {content?.hero?.primaryButton ?? "Start Free"}
            </button>

            <button
              className="rounded-xl px-6 py-3 font-semibold transition-transform hover:scale-[1.02]"
              style={{
                background: "var(--qs-bg-alt)",
                color: "var(--qs-text)",
                border: "1px solid var(--qs-border)",
              }}
            >
              {content?.hero?.secondaryButton ?? "See Demo"}
            </button>
          </div>

          <div className="mt-8 flex flex-wrap gap-6 text-sm">
            <span style={{ color: "var(--qs-text-muted)" }}>
              ✓ No-code editing
            </span>
            <span style={{ color: "var(--qs-text-muted)" }}>
              ✓ Mobile responsive
            </span>
            <span style={{ color: "var(--qs-text-muted)" }}>
              ✓ Fast to publish
            </span>
          </div>
        </div>

        <div className="relative">
          <div
            className="rounded-3xl p-4 shadow-xl"
            style={{
              background: "var(--qs-bg-alt)",
              border: "1px solid var(--qs-border)",
            }}
          >
            <div
              className="overflow-hidden rounded-2xl border"
              style={{ borderColor: "var(--qs-border)" }}
            >
              <div className="flex items-center gap-2 border-b px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-yellow-400" />
                <span className="h-3 w-3 rounded-full bg-green-400" />
              </div>

              <div className="grid gap-4 p-6">
                <div className="h-40 rounded-2xl bg-gradient-to-br from-black/10 to-black/5 p-5">
                  <div className="h-3 w-24 rounded-full bg-black/20" />
                  <div className="mt-4 h-8 w-3/4 rounded-xl bg-black/20" />
                  <div className="mt-3 h-3 w-full rounded-full bg-black/15" />
                  <div className="mt-2 h-3 w-5/6 rounded-full bg-black/15" />
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border p-4">
                    <div className="mb-2 h-3 w-16 rounded-full bg-black/15" />
                    <div className="h-7 w-12 rounded-full bg-black/20" />
                  </div>
                  <div className="rounded-2xl border p-4">
                    <div className="mb-2 h-3 w-16 rounded-full bg-black/15" />
                    <div className="h-7 w-12 rounded-full bg-black/20" />
                  </div>
                  <div className="rounded-2xl border p-4">
                    <div className="mb-2 h-3 w-16 rounded-full bg-black/15" />
                    <div className="h-7 w-12 rounded-full bg-black/20" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
function TrustedBy({ content }: TemplateComponentProps) {
  const logos = content?.trustedBy ?? [
    "North Star",
    "Bright Co",
    "Studio 9",
    "LaunchPad",
    "Mosaic",
  ];

  return (
    <section className="mx-auto max-w-6xl px-6 pb-10">
      <p
        className="mb-5 text-center text-sm font-medium uppercase tracking-[0.2em]"
        style={{ color: "var(--qs-text-muted)" }}
      >
        {content?.trustedByLabel ?? "Trusted by growing brands"}
      </p>

      <div
        className="grid grid-cols-2 gap-4 rounded-3xl p-6 md:grid-cols-5"
        style={{
          background: "var(--qs-bg-alt)",
          border: "1px solid var(--qs-border)",
        }}
      >
        {logos.map((logo: string, i: number) => (
          <div
            key={i}
            className="flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold"
            style={{
              background: "var(--qs-bg)",
              border: "1px solid var(--qs-border)",
            }}
          >
            {logo}
          </div>
        ))}
      </div>
    </section>
  );
}
function Features({ isEditor, content, onUpdate }: TemplateComponentProps) {
  const features = content?.features ?? [
    {
      title: "Fast setup",
      desc: "Publish a professional landing page quickly with ready-made sections.",
    },
    {
      title: "Easy editing",
      desc: "Change text directly in the page while keeping the structure clean.",
    },
    {
      title: "Responsive layout",
      desc: "Looks great on phones, tablets, and desktops without extra work.",
    },
  ];

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <h3
          className="text-3xl font-bold tracking-tight md:text-4xl"
          contentEditable={isEditor}
          suppressContentEditableWarning
          onBlur={(e) =>
            onUpdate("featuresHeading", e.currentTarget.textContent?.trim())
          }
        >
          {content?.featuresHeading ?? "Everything you need in one template"}
        </h3>
        <p className="mt-4 text-base" style={{ color: "var(--qs-text-muted)" }}>
          {content?.featuresSubheading ??
            "A standard landing page layout that works for product launches, agencies, services, and personal brands."}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {features.map((f: any, i: number) => (
          <div
            key={i}
            className="rounded-3xl p-6 transition-transform hover:-translate-y-1"
            style={{
              background: "var(--qs-bg-alt)",
              border: "1px solid var(--qs-border)",
            }}
          >
            <div
              className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl"
              style={{
                background: "var(--qs-primary)",
                color: "var(--qs-primary-fg)",
              }}
            >
              {i + 1}
            </div>

            <h4
              className="text-xl font-semibold"
              contentEditable={isEditor}
              suppressContentEditableWarning
              onBlur={(e) =>
                onUpdate(
                  `features.${i}.title`,
                  e.currentTarget.textContent?.trim(),
                )
              }
            >
              {f.title}
            </h4>

            <p
              className="mt-3 leading-7"
              style={{ color: "var(--qs-text-muted)" }}
              contentEditable={isEditor}
              suppressContentEditableWarning
              onBlur={(e) =>
                onUpdate(
                  `features.${i}.desc`,
                  e.currentTarget.textContent?.trim(),
                )
              }
            >
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
function Stats({ content }: TemplateComponentProps) {
  const stats = content?.stats ?? [
    { value: "10x", label: "faster launch" },
    { value: "99%", label: "mobile-ready" },
    { value: "24/7", label: "always online" },
  ];

  return (
    <section className="mx-auto max-w-6xl px-6 py-8">
      <div
        className="grid gap-4 rounded-3xl p-6 md:grid-cols-3"
        style={{
          background: "var(--qs-bg-alt)",
          border: "1px solid var(--qs-border)",
        }}
      >
        {stats.map((stat: any, i: number) => (
          <div key={i} className="text-center">
            <div className="text-3xl font-bold md:text-4xl">{stat.value}</div>
            <div
              className="mt-1 text-sm"
              style={{ color: "var(--qs-text-muted)" }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
function Testimonials({ content }: TemplateComponentProps) {
  const testimonials = content?.testimonials ?? [
    {
      quote:
        "QuickSite made it simple to launch our offer page without needing a designer.",
      name: "Amina",
      role: "Founder",
    },
    {
      quote:
        "The template feels clean, professional, and easy to adapt for different clients.",
      name: "Daniel",
      role: "Agency Owner",
    },
  ];

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <h3 className="text-3xl font-bold tracking-tight md:text-4xl">
          {content?.testimonialsHeading ?? "What people say"}
        </h3>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {testimonials.map((item: any, i: number) => (
          <blockquote
            key={i}
            className="rounded-3xl p-6"
            style={{
              background: "var(--qs-bg-alt)",
              border: "1px solid var(--qs-border)",
            }}
          >
            <p className="text-lg leading-8">“{item.quote}”</p>
            <footer className="mt-5">
              <div className="font-semibold">{item.name}</div>
              <div
                className="text-sm"
                style={{ color: "var(--qs-text-muted)" }}
              >
                {item.role}
              </div>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
function Cta({ isEditor, content, onUpdate }: TemplateComponentProps) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div
        className="rounded-[2rem] px-6 py-12 text-center md:px-10"
        style={{
          background: "var(--qs-primary)",
          color: "var(--qs-primary-fg)",
        }}
      >
        <h3
          className="text-3xl font-bold tracking-tight md:text-5xl"
          contentEditable={isEditor}
          suppressContentEditableWarning
          onBlur={(e) =>
            onUpdate("cta.title", e.currentTarget.textContent?.trim())
          }
        >
          {content?.cta?.title ?? "Ready to build your next page?"}
        </h3>

        <p
          className="mx-auto mt-4 max-w-2xl text-base md:text-lg"
          style={{ opacity: 0.92 }}
          contentEditable={isEditor}
          suppressContentEditableWarning
          onBlur={(e) =>
            onUpdate("cta.desc", e.currentTarget.textContent?.trim())
          }
        >
          {content?.cta?.desc ??
            "Use this template as a polished starting point for your product, service, or business landing page."}
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <button className="rounded-xl bg-white px-6 py-3 font-semibold text-black transition-transform hover:scale-[1.02]">
            {content?.cta?.button ?? "Get Started"}
          </button>
        </div>
      </div>
    </section>
  );
}
function Footer({ content }: TemplateComponentProps) {
  return (
    <footer
      className="mt-8 border-t"
      style={{
        background: "var(--qs-bg-alt)",
        borderColor: "var(--qs-border)",
      }}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold">
            {content?.footer?.brand ?? "QuickSite"}
          </p>
          <p className="mt-1 text-sm" style={{ color: "var(--qs-text-muted)" }}>
            {content?.footer?.copyright ??
              `© ${new Date().getFullYear()} QuickSite. All rights reserved.`}
          </p>
        </div>

        <div className="flex flex-wrap gap-6 text-sm">
          <a href="#" className="transition-opacity hover:opacity-70">
            Privacy
          </a>
          <a href="#" className="transition-opacity hover:opacity-70">
            Terms
          </a>
          <a href="#" className="transition-opacity hover:opacity-70">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
export const template1StarterContent = ({
  selectedTitle = undefined,
}: {
  selectedTitle: string | undefined;
}) => {
  return {
    navbar: {
      title: selectedTitle || "Your Brand",
      links: ["Home", "Features", "About", "Contact"],
    },

    hero: {
      badge: "Build something amazing",
      title: "A simple way to create a powerful landing page",
      desc: "Easily build a modern, responsive landing page for your business, product, or personal brand. No complex setup required.",
      primaryButton: "Get Started",
      secondaryButton: "Learn More",
    },

    trustedByLabel: "Trusted by people building great things",
    trustedBy: ["Company A", "Studio B", "Startup C", "Brand D", "Agency E"],

    featuresHeading: "Everything you need",
    featuresSubheading:
      "A clean, flexible layout designed to fit any type of project or business.",

    features: [
      {
        title: "Simple setup",
        desc: "Start quickly with a ready-made structure that just works.",
      },
      {
        title: "Editable content",
        desc: "Click and edit text directly without breaking the layout.",
      },
      {
        title: "Responsive design",
        desc: "Looks great on all devices automatically.",
      },
    ],

    stats: [
      { value: "Fast", label: "setup time" },
      { value: "Clean", label: "design system" },
      { value: "Easy", label: "customisation" },
    ],

    testimonialsHeading: "What people are saying",
    testimonials: [
      {
        quote:
          "This made it so easy to launch my page without needing a developer.",
        name: "User One",
        role: "Founder",
      },
      {
        quote: "Super clean design and very flexible for different projects.",
        name: "User Two",
        role: "Creator",
      },
    ],

    cta: {
      title: "Start building your landing page today",
      desc: "Turn your idea into a live website in minutes with this simple template.",
      button: "Get Started",
    },

    footer: {
      brand: "Your Brand",
      copyright: `© ${new Date().getFullYear()} Your Brand. All rights reserved.`,
    },
  };
};
export const template1Meta = {
  title: "Modern Landing Page",
  category: "Landing Page",
  description:
    "A high-converting landing page template with structured sections, responsive design, and easy content editing.",
};
