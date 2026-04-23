// app/s/[slug]/page.tsx

import { getSiteBySlug } from "@/lib/firestore";
import { getTemplateDisplay } from "@/lib/templates";
import { notFound } from "next/navigation";

export default async function PublicSite({
  params,
}: {
  params: Promise<{ slug: string }>; // Change to Promise
}) {
  // CRITICAL: Await the params in Next.js 15+
  const { slug } = await params;

  // Defensive check: if slug is somehow missing, 404 immediately
  // and prevent the Firestore 'undefined' error
  if (!slug) notFound();

  const siteData = await getSiteBySlug(slug);

  if (!siteData) notFound();

  const DisplayComponent = getTemplateDisplay(siteData.type);

  if (!DisplayComponent) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-xl font-bold text-red-600">Configuration Error</h1>
        <p>Template type &quot;{siteData.type}&quot; is not registered.</p>
      </div>
    );
  }

  return <DisplayComponent data={siteData} />;
}
