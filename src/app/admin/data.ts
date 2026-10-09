import { getDb, hasDatabase } from "@/db";
import { loadContent } from "@/db/content";
import { seedContent } from "@/content/seed";
import type { SiteContent } from "@/content/types";
import { requireAdmin } from "@/lib/auth";

export type AdminContent = { content: SiteContent; problem: string | null };

/** Fresh (uncached) content for the editors, with a readable problem if the DB isn't ready. */
export async function getAdminContent(): Promise<AdminContent> {
  await requireAdmin();
  if (!hasDatabase()) {
    return { content: seedContent, problem: "DATABASE_URL is not set, so changes can't be saved yet." };
  }
  try {
    const content = await loadContent(getDb());
    if (!content) {
      return { content: seedContent, problem: "The database is empty. Run `npm run db:seed` to import your current content." };
    }
    return { content, problem: null };
  } catch (err) {
    console.error("[admin] could not load content", err);
    return { content: seedContent, problem: "Could not reach the database. Showing the seeded content; saving will fail until it's back." };
  }
}
