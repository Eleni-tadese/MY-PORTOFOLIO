import "./env";
import { Pool } from "@neondatabase/serverless";
import { drizzle as drizzleNeon } from "drizzle-orm/neon-serverless";
import { migrate as migrateNeon } from "drizzle-orm/neon-serverless/migrator";
import { drizzle as drizzlePostgres } from "drizzle-orm/postgres-js";
import { migrate as migratePostgres } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { isNeonUrl } from "@/db";

const migrationsFolder = "./drizzle";

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set (see .env.example)");

  if (isNeonUrl(url)) {
    const pool = new Pool({ connectionString: url, max: 1 });
    await migrateNeon(drizzleNeon(pool), { migrationsFolder });
    await pool.end();
  } else {
    const client = postgres(url, { max: 1, prepare: false });
    await migratePostgres(drizzlePostgres(client), { migrationsFolder });
    await client.end();
  }
  console.log("✔ Migrations applied");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
