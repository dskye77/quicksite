import React from "react";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background backdrop-blur-sm">
        <div className="flex h-14 items-center px-4 md:px-6">
          <Link
            href="/dashboard"
            className="group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft
              size={18}
              className="transition-transform group-hover:-translate-x-1"
            />
            Back to Dashboard
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-[calc(100vh-3.5rem)]">
        {children}
      </main>
    </div>
  );
}
