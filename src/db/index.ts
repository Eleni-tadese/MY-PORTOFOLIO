import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

type Db = ReturnType<typeof drizzle<typeof schema>>;

// Reuse one client per server instance (and across dev hot reloads).
const globalForDb = globalThis as unknown as { __db?: Db };

export const hasDatabase = () => Boolean(process.env.DATABASE_URL);

export function getDb(): Db {
  if (globalForDb.__db) return globalForDb.__db;
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  const client = postgres(url, {
    max: 5,
    prepare: false, // required for Neon's pooled (PgBouncer) connection string
    connect_timeout: 10,
    idle_timeout: 20,
  });
  globalForDb.__db = drizzle(client, { schema });
  return globalForDb.__db;
}

export { schema };
