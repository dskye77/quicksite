"use client";

// src/components/layout/RootLayoutShell.tsx
// Shows Navbar + Footer only on marketing pages.
// Auth pages (login, signup) and the dashboard get no shell.

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

const MARKETING_PATHS = ["/", "/pricing", "/templates"];

export default function RootLayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isMarketing = MARKETING_PATHS.includes(pathname);

  if (isMarketing) {
    return (
      <>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </>
    );
  }

  return <>{children}</>;
}