import { Pool } from "@neondatabase/serverless";
import { drizzle as drizzleNeon } from "drizzle-orm/neon-serverless";
import { drizzle as drizzlePostgres } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

export type Db = ReturnType<typeof drizzleNeon<typeof schema>>;

// Reuse one client per server instance (and across dev hot reloads).
const globalForDb = globalThis as unknown as { __db?: Db };

export const hasDatabase = () => Boolean(process.env.DATABASE_URL);

/** Neon is reached over WebSockets (port 443), which works on Vercel and on networks that block 5432. */
export const isNeonUrl = (url: string) => {
  try {
    return new URL(url).hostname.endsWith(".neon.tech");
  } catch {
    return false;
  }
};

export function getDb(): Db {
  if (globalForDb.__db) return globalForDb.__db;
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");

  globalForDb.__db = isNeonUrl(url)
    ? drizzleNeon(
        new Pool({ connectionString: url, max: 5, idleTimeoutMillis: 20_000, connectionTimeoutMillis: 10_000 }),
        { schema }
      )
    : // Any other Postgres (e.g. local) over TCP. Same query API.
      (drizzlePostgres(
        postgres(url, { max: 5, prepare: false, connect_timeout: 10, idle_timeout: 20 }),
        { schema }
      ) as unknown as Db);

  return globalForDb.__db;
}

export { schema };
