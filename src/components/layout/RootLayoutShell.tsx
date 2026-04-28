"use client";

// src/components/layout/RootLayoutShell.tsx
import { useTheme } from "next-themes";
import { Toaster } from "sonner";
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
  const { resolvedTheme } = useTheme();

  return (
    <>
      {isMarketing && <Navbar />}
      <main className="flex-1">{children}</main>
      {isMarketing && <Footer />}

      {/* Toaster is always mounted, works on every page */}
      <Toaster
        richColors
        position="top-right"
        theme={resolvedTheme as "light" | "dark"}
        toastOptions={{
          style: {
            borderRadius: "10px",
            fontSize: "14px",
            fontWeight: "500",
          },
        }}
      />
    </>
  );
}
