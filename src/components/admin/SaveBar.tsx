"use client";

import { Check, Loader2, Save } from "lucide-react";
import type { ActionResult } from "@/app/admin/actions";

/** Sticky footer with save status. */
export default function SaveBar({
  dirty,
  pending,
  result,
  onSave,
  label = "Save changes",
}: {
  dirty: boolean;
  pending: boolean;
  result: ActionResult | null;
  onSave: () => void;
  label?: string;
}) {
  let status: React.ReactNode = <span className="text-subtle">No changes</span>;
  if (pending) status = <span className="text-muted">Saving…</span>;
  else if (result && !result.ok) status = <span className="text-danger">{result.error}</span>;
  else if (dirty) status = <span className="text-fg">Unsaved changes</span>;
  else if (result?.ok)
    status = (
      <span className="inline-flex items-center gap-1.5 text-lime">
        <Check size={15} aria-hidden /> Saved — the live site is updated
      </span>
    );

  return (
    <div className="sticky bottom-0 z-20 -mx-5 mt-8 border-t border-border bg-bg/90 px-5 py-4 backdrop-blur-md sm:-mx-8 sm:px-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p role="status" aria-live="polite" className="text-sm">
          {status}
        </p>
        <button
          type="button"
          onClick={onSave}
          disabled={!dirty || pending}
          className="inline-flex items-center gap-2 rounded-full bg-lime px-6 py-2.5 text-sm font-medium text-on-lime transition-colors hover:bg-lime-soft disabled:cursor-not-allowed disabled:opacity-40"
        >
          {pending ? <Loader2 size={15} className="animate-spin" aria-hidden /> : <Save size={15} aria-hidden />}
          {label}
        </button>
      </div>
    </div>
  );
}
