import { redirect } from "next/navigation";

export default function LegacyCreateSitePage() {
  redirect("/dashboard/new");
}