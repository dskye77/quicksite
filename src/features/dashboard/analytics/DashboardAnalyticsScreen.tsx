/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  BarChart2,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Users,
  Image as ImageIcon,
  MessageCircle,
} from "lucide-react";

const CHART_DATA = [
  { day: "Mon", value: 45 },
  { day: "Tue", value: 52 },
  { day: "Wed", value: 38 },
  { day: "Thu", value: 65 },
  { day: "Fri", value: 48 },
  { day: "Sat", value: 80 },
  { day: "Sun", value: 92 },
];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("7d");

  return (
    <div className="space-y-8">
      {/* ── Header ────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold">MakeSite Analytics</h2>
          <p className="text-sm text-muted-foreground">
            See how your content is engaging visitors.
          </p>
        </div>

        <div className="flex items-center bg-card border border-border rounded-xl p-1">
          {["24h", "7d", "30d"].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                timeRange === range
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {range.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* ── Stats Grid ────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Visits"
          value="842"
          change="+12%"
          trend="up"
          icon={Users}
        />
        <StatCard
          label="WhatsApp Clicks"
          value="124"
          change="+5.4%"
          trend="up"
          icon={MessageCircle}
        />
        <StatCard
          label="Image Views"
          value="2,105"
          change="-2.1%"
          trend="down"
          icon={ImageIcon}
        />
        <StatCard
          label="Conv. Rate"
          value="14.7%"
          change="+1.2%"
          trend="up"
          icon={TrendingUp}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ── Traffic Chart ───────────────────────────────────────────── */}
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-sm flex items-center gap-2">
              <BarChart2 className="h-4 w-4 text-primary" />
              Visitor Traffic
            </h3>
            <span className="text-[11px] text-muted-foreground flex items-center gap-1">
              <Calendar className="h-3 w-3" /> Last 7 Days
            </span>
          </div>

          {/* The Fix: Container with fixed height and relative positioning */}
          <div className="h-64 flex items-end justify-between gap-3 px-2 border-b border-border/50">
            {CHART_DATA.map((data) => (
              <div
                key={data.day}
                className="flex-1 h-full flex flex-col justify-end items-center group relative"
              >
                {/* Visual Bar */}
                <div
                  className="w-full bg-primary/20 rounded-t-lg relative group-hover:bg-primary/40 transition-all duration-300 ease-in-out"
                  style={{ 
                    height: `${data.value}%`,
                    minHeight: '4px' 
                  }}
                >
                  {/* Tooltip */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-foreground text-background text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                    {data.value} visits
                  </div>
                </div>
                
                {/* Label */}
                <span className="text-[10px] font-medium text-muted-foreground mt-3 mb-1">
                  {data.day}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Content Insights ────────────────────────────────────────── */}
        <div className="bg-card border border-border rounded-2xl p-6 flex flex-col">
          <h3 className="font-bold text-sm mb-6">Content Insight</h3>

          <div className="flex-1 space-y-5">
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
              <p className="text-xs font-bold text-primary mb-1 uppercase tracking-wider">
                Top Tip
              </p>
              <p className="text-sm text-foreground leading-relaxed">
                Your WhatsApp clicks are highest when you use high-quality
                product images.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  Text Engagement
                </span>
                <span className="text-xs font-bold px-2 py-0.5 bg-emerald-500/10 text-emerald-600 rounded-md">High</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  Image Load Speed
                </span>
                <span className="text-xs font-bold">0.8s</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-[11px] text-muted-foreground italic leading-relaxed">
              &quot;Focus on clear descriptions and bright images in your
              MakeSite textfields to keep conversion rates high.&quot;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, change, trend, icon: Icon }: any) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-muted rounded-xl">
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
        <span
          className={`flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full ${
            trend === "up"
              ? "bg-emerald-500/10 text-emerald-600"
              : "bg-red-500/10 text-red-600"
          }`}
        >
          {trend === "up" ? (
            <ArrowUpRight className="h-3 w-3 mr-0.5" />
          ) : (
            <ArrowDownRight className="h-3 w-3 mr-0.5" />
          )}
          {change}
        </span>
      </div>
      <p className="text-2xl font-bold tracking-tight">{value}</p>
      <p className="text-xs text-muted-foreground mt-1">{label}</p>
    </div>
  );
}