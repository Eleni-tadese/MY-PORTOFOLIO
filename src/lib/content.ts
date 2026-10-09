import { cache } from "react";
import { revalidatePath, unstable_cache, updateTag } from "next/cache";
import { getDb, hasDatabase } from "@/db";
import { loadContent } from "@/db/content";
import { seedContent } from "@/content/seed";
import type { SiteContent } from "@/content/types";

export const CONTENT_TAG = "site-content";

const loadCached = unstable_cache(() => loadContent(getDb()), ["site-content-v1"], {
  tags: [CONTENT_TAG],
});

/**
 * Content for the public site. Cached until an admin save calls
 * `revalidateContent()`, so pages are served statically.
 *
 * Fallbacks:
 * - no DATABASE_URL, or an empty database → seeded content
 * - database unreachable during `next build` or in development → seeded content
 * - database unreachable in production → rethrow, so Next.js keeps serving the
 *   last successfully generated page instead of replacing it
 */
export const getSiteContent = cache(async (): Promise<SiteContent> => {
  if (!hasDatabase()) return seedContent;
  try {
    return (await loadCached()) ?? seedContent;
  } catch (err) {
    console.error("[content] Could not load content from the database:", err);
    const building = process.env.NEXT_PHASE === "phase-production-build";
    if (building || process.env.NODE_ENV !== "production") return seedContent;
    throw err;
  }
});

/** Call from Server Actions after any content change. */
export function revalidateContent() {
  updateTag(CONTENT_TAG);
  revalidatePath("/", "layout");
}
