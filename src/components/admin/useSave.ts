"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import type { ActionResult } from "@/app/admin/actions";

/**
 * Draft state + save lifecycle for an admin editor.
 * `dirty` compares the draft to the last saved snapshot.
 */
export function useDraft<T>(initial: T, action: (input: T) => Promise<ActionResult>) {
  const [draft, setDraft] = useState<T>(initial);
  const [saved, setSaved] = useState(() => JSON.stringify(initial));
  const [result, setResult] = useState<ActionResult | null>(null);
  const [pending, startTransition] = useTransition();

  const dirty = useMemo(() => JSON.stringify(draft) !== saved, [draft, saved]);

  // Warn before leaving with unsaved changes.
  useEffect(() => {
    if (!dirty) return;
    const onBeforeUnload = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [dirty]);

  const save = (after?: (r: ActionResult & { ok: true }) => void) =>
    startTransition(async () => {
      const snapshot = JSON.stringify(draft);
      const r = await action(draft);
      setResult(r);
      if (r.ok) {
        setSaved(snapshot);
        after?.(r);
      }
    });

  const errors = result && !result.ok ? (result.fieldErrors ?? {}) : {};

  return { draft, setDraft, dirty, pending, result, errors, save };
}
