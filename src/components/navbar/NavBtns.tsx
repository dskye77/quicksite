"use client";

import { usePathname } from "next/navigation";

const tabs = [
  { id: "features", label: "Features", href: "/#features" },
  { id: "templates", label: "Templates", href: "/templates" },
  { id: "pricing", label: "Pricing", href: "/pricing" },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center gap-1 text-sm">
      {tabs.map((tab) => {
        const isActive = pathname.includes(tab.id);

        return (
          <a
            key={tab.id}
            href={tab.href}
            className={`px-4 py-2 rounded-md transition-colors ${
              isActive
                ? "text-foreground font-medium bg-muted"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
          >
            {tab.label}
          </a>
        );
      })}
    </nav>
  );
}
