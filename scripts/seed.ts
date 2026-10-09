import "./env";
import { getDb } from "@/db";
import { loadContent, writeContent } from "@/db/content";
import { seedContent } from "@/content/seed";

/**
 * Seeds the database with the content in src/content/seed.ts.
 * Refuses to overwrite existing content unless run with --force.
 */
async function main() {
  const db = getDb();
  const force = process.argv.includes("--force");
  const existing = await loadContent(db);
  if (existing && !force) {
    console.log("Database already has content. Re-run with --force to replace it.");
    process.exit(0);
  }
  await writeContent(db, seedContent);
  console.log(`✔ Seeded ${seedContent.projects.length} projects, ${seedContent.experience.length} roles`);
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
