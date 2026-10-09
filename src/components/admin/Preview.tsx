"use client";

import { Eye } from "lucide-react";

/**
 * Renders real public components with the unsaved draft, scaled down.
 * Scroll-reveal is disabled inside (see .admin-preview in globals.css).
 */
export default function Preview({
  children,
  scale = 0.55,
  height = 640,
}: {
  children: React.ReactNode;
  scale?: number;
  height?: number;
}) {
  return (
    <section aria-label="Live preview" className="lg:sticky lg:top-6">
      <p className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-subtle">
        <Eye size={14} aria-hidden /> Live preview
      </p>
      <div
        className="admin-preview overflow-auto rounded-2xl border border-border bg-bg"
        style={{ maxHeight: height }}
        inert
      >
        <div style={{ zoom: scale }}>{children}</div>
      </div>
    </section>
  );
}
