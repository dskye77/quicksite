import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidTemplate, templatesRegistry } from "@/lib/templates";

interface TemplatePreviewPageProps {
  params: Promise<{ type: string }>;
}

export default async function TemplatePreviewPage({
  params,
}: TemplatePreviewPageProps) {
  const { type } = await params;

  if (!type || !isValidTemplate(type)) {
    notFound();
  }

  const templateMeta = templatesRegistry[type].meta;

  if (!templateMeta) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Template Preview:{" "}
            <span className="font-semibold text-foreground">{type}</span>
          </p>
          <div className="flex items-center gap-2">
            <Link
              href="/templates"
              className="inline-flex items-center justify-center h-9 px-4 rounded-full border border-border text-sm font-medium hover:bg-muted transition"
            >
              Back
            </Link>
            <Link
              href={`/dashboard/new?template=${type}`}
              className="inline-flex items-center justify-center h-9 px-4 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition"
            >
              Use This Template
            </Link>
          </div>
        </div>
      </div>
      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="rounded-3xl border border-border bg-card p-8 md:p-12">
          <p className="inline-flex items-center rounded-full bg-primary/10 text-primary text-xs font-semibold px-3 py-1 mb-4">
            {templateMeta.category}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            {templateMeta.title}
          </h1>
          <p className="text-muted-foreground max-w-2xl mb-8">
            {templateMeta.description}
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            <PreviewCard title="Mobile-first layout" />
            <PreviewCard title="Catalogue sections" />
            <PreviewCard title="WhatsApp conversion CTA" />
          </div>
        </div>
      </section>
    </div>
  );
}

function PreviewCard({ title }: { title: string }) {
  return (
    <div className="rounded-2xl border border-border bg-background p-4">
      <div className="aspect-video rounded-xl bg-muted mb-3" />
      <p className="text-sm font-medium">{title}</p>
    </div>
  );
}
