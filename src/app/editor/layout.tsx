import React from "react";
import EditorLayoutScreen from "@/features/editor/EditorLayoutScreen";

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <EditorLayoutScreen>{children}</EditorLayoutScreen>;
}
