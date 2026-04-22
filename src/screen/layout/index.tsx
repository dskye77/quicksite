"use client";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const landingPagePathnames = ["/", "/pricing", "/templates"];

  if (landingPagePathnames.includes(pathname)) {
    return (
      <>
        <Navbar />
        {children}
        <Footer />
      </>
    );
  }

  return <>{children}</>;
}
