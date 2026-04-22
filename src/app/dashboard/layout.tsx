// src/app/dashboard/page.tsx
import DashboardLayoutScreen from "@/features/dashboard/DashboardLayoutScreen";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayoutScreen>{children}</DashboardLayoutScreen>;
}
