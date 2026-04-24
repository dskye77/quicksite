// app/s/[slug]/page.tsx

import { getSiteBySlug, trackSiteEvent } from "@/lib/firestore";
import { Template_1_Display } from "@/assets/siteTemplates/Template_1";
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

  try {
    await trackSiteEvent(siteData, "visit");
  } catch (error) {
    console.error("Failed to track visit:", error);
  }

  const templateType = siteData.type || siteData.templateId;
  if (templateType !== "template-1") {
    return (
      <div className="p-10 text-center">
        <h1 className="text-xl font-bold text-red-600">Configuration Error</h1>
        <p>Template type &quot;{templateType}&quot; is not registered.</p>
      </div>
    );
  }

  return <Template_1_Display data={siteData} />;
}
