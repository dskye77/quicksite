"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Globe,
  Plus,
  ExternalLink,
  Edit3,
  MoreHorizontal,
  Search,
  Settings,
} from "lucide-react";

// Mock data - in a real app, you'd fetch this from your database/Firebase
const SITES = [];

export default function DashboardSitScreen() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSites = SITES.filter((site) =>
    site.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* ── Header Actions ────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search sites..."
            className="w-full bg-card border border-border rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <button className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-full h-10 px-6 text-sm font-semibold hover:opacity-90 transition cursor-pointer">
          <Plus className="h-4 w-4" /> Create New Site
        </button>
      </div>

      {/* ── Sites Grid ────────────────────────────────────────────────── */}
      {filteredSites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredSites.map((site) => (
            <div
              key={site.id}
              className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all duration-300"
            >
              {/* Preview Placeholder */}
              <div className="aspect-video bg-muted flex items-center justify-center relative border-b border-border">
                <Globe className="h-10 w-10 text-muted-foreground/20" />
                <div className="absolute top-3 right-3">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      site.status === "Published"
                        ? "bg-emerald-500/10 text-emerald-500"
                        : "bg-orange-500/10 text-orange-500"
                    }`}
                  >
                    {site.status}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-bold text-base truncate">{site.name}</h3>
                  <button className="text-muted-foreground hover:text-foreground p-1">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>

                <a
                  href={`https://${site.url}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-primary hover:underline flex items-center gap-1 mb-4"
                >
                  {site.url} <ExternalLink className="h-3 w-3" />
                </a>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="text-[11px] text-muted-foreground">
                    <p>Updated {site.updatedAt}</p>
                    <p className="font-medium text-foreground">
                      {site.visits} visits
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link href={`/editor/${site.id}`}>
                      <button
                        className="p-2 rounded-lg bg-secondary/10 text-secondary hover:bg-secondary hover:text-white transition cursor-pointer"
                        title="Edit Site"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                    </Link>
                    <Link href={`/dashboard/settings/${site.id}`}>
                      <button
                        className="p-2 rounded-lg bg-muted text-muted-foreground hover:bg-foreground hover:text-background transition cursor-pointer"
                        title="Site Settings"
                      >
                        <Settings className="h-4 w-4" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* ── Empty State ─────────────────────────────────────────────── */
        <div className="bg-card border border-border rounded-2xl p-20 flex flex-col items-center justify-center text-center gap-4">
          <div className="h-16 w-16 rounded-2xl bg-muted grid place-items-center mb-2">
            <Globe className="h-8 w-8 text-muted-foreground/40" />
          </div>
          <div>
            <h2 className="font-bold text-xl">No sites found</h2>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto mt-2">
              {searchQuery
                ? `We couldn't find any sites matching "${searchQuery}"`
                : "You haven't created any sites yet. Start building your online presence today!"}
            </p>
          </div>
          <button
            onClick={() => (searchQuery ? setSearchQuery("") : null)}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-full h-11 px-8 text-sm font-semibold hover:opacity-90 transition mt-2 cursor-pointer"
          >
            {searchQuery ? "Clear Search" : "Create Your First Site"}
          </button>
        </div>
      )}
    </div>
  );
}
