/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import {
  Upload,
  Smartphone,
  Globe,
  MousePointer2,
  Loader2,
} from "lucide-react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { toast } from "sonner";

interface TemplateProps {
  data: any;
  onUpdate: (updates: Partial<any>) => void;
}

export default function Template_1({ data, onUpdate }: TemplateProps) {
  const [isUploading, setIsUploading] = useState(false);

  if (!data || data.type !== "template-1") {
    return <ErrorMessage />;
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Limit file size (e.g., 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return toast.error("File is too large. Max 5MB.");
    }

    setIsUploading(true);
    try {
      // Using site ID or slug for the path
      const pathId = data.id || data.slug || "anonymous";
      const storageRef = ref(storage, `sites/${pathId}/hero-${Date.now()}`);

      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);

      onUpdate({ heroImage: url });
      toast.success("Image updated!");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <nav className="flex justify-between items-center py-6 px-8 max-w-7xl mx-auto">
        <div
          className="text-2xl font-black tracking-tighter text-blue-600 outline-none focus:ring-2 focus:ring-blue-100 rounded px-1 cursor-text"
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => onUpdate({ brandName: e.currentTarget.innerText })}
        >
          {data.brandName}
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-500">
          {data.features?.map((f: any) => (
            <span key={f.id}>{f.text}</span>
          ))}
        </div>
      </nav>

      <section className="relative px-8 pt-16 pb-24 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider">
            <Globe size={14} />
            Editor Mode
          </div>

          <h1
            className="text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1] outline-none focus:ring-4 focus:ring-blue-100 rounded-lg transition-all cursor-text"
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onUpdate({ title: e.currentTarget.innerText })}
          >
            {data.title}
          </h1>

          <p
            className="text-xl text-slate-500 leading-relaxed max-w-lg outline-none focus:ring-4 focus:ring-blue-100 rounded-lg transition-all cursor-text"
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onUpdate({ description: e.currentTarget.innerText })}
          >
            {data.description}
          </p>

          <div className="flex items-center gap-4 pt-4">
            <button className="bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-slate-800 transition-all flex items-center gap-2">
              Get Started <MousePointer2 size={18} />
            </button>
          </div>
        </div>

        <div className="relative group">
          <div className="relative z-10 w-full aspect-square rounded-[2rem] bg-slate-100 border border-slate-200 overflow-hidden shadow-2xl flex items-center justify-center">
            {isUploading ? (
              <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
            ) : data.heroImage ? (
              <img
                src={data.heroImage}
                alt="Hero"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center text-slate-400 gap-3">
                <Smartphone size={48} strokeWidth={1} />
                <p className="text-sm font-medium">No hero image</p>
              </div>
            )}

            {!isUploading && (
              <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <label className="cursor-pointer bg-white text-slate-900 px-6 py-3 rounded-full font-bold flex items-center gap-2 shadow-xl hover:scale-105 transition-transform">
                  <Upload size={18} />
                  Change Image
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            )}
          </div>
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-100 rounded-full blur-3xl z-0 opacity-50" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-purple-100 rounded-full blur-3xl z-0 opacity-50" />
        </div>
      </section>

      <footer className="mt-20 py-12 border-t border-slate-100 text-center">
        <p className="text-slate-400 text-sm">
          &copy; {new Date().getFullYear()} {data.brandName}.
        </p>
      </footer>
    </div>
  );
}

// Lightweight Read-Only version for the public site
export function Template_1_Display({ data }: { data: any }) {
  if (!data || data.type !== "template-1") return <ErrorMessage />;

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <nav className="flex justify-between items-center py-6 px-8 max-w-7xl mx-auto">
        <div className="text-2xl font-black tracking-tighter text-blue-600">
          {data.brandName}
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-500">
          {data.features?.map((f: any) => (
            <span key={f.id}>{f.text}</span>
          ))}
        </div>
      </nav>

      <section className="relative px-8 pt-16 pb-24 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
            {data.title}
          </h1>
          <p className="text-xl text-slate-500 leading-relaxed max-w-lg">
            {data.description}
          </p>
          <button className="bg-slate-900 text-white px-8 py-4 rounded-full font-bold">
            Get Started
          </button>
        </div>

        <div className="relative">
          <div className="relative z-10 w-full aspect-square rounded-[2rem] bg-slate-100 overflow-hidden shadow-2xl">
            {data.heroImage && (
              <img
                src={data.heroImage}
                alt="Hero"
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function ErrorMessage() {
  return (
    <div className="p-10 text-center border-2 border-dashed border-red-200 rounded-2xl bg-red-50 text-red-600">
      <h2 className="font-bold text-xl">Template Mismatch</h2>
      <p>The data provided does not match the Template 1 schema.</p>
    </div>
  );
}
