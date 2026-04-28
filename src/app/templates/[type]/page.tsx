import { use } from "react";
import TemplatePreview from "@/screen/templates/preview/TemplatePreview";

interface PageProps {
  params: Promise<{
    type: string;
  }>;
}
export default function TemplatePreviewPage({ params }: PageProps) {
  const { type } = use(params);
  
  return <TemplatePreview type={type}/>;
}
