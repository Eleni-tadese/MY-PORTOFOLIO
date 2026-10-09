import { and, eq, gt, lt, sql } from "drizzle-orm";
import { getDb, hasDatabase } from "@/db";
import { loginAttempts } from "@/db/schema";

export const MAX_FAILURES = 5;
export const WINDOW_MINUTES = 15;

// Fallback when the database is unavailable (per server instance only).
const memory = new Map<string, number[]>();

const windowStart = () => new Date(Date.now() - WINDOW_MINUTES * 60_000);

export function clientIp(h: Headers) {
  return (
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip")?.trim() ||
    "unknown"
  );
}

export async function isRateLimited(ip: string) {
  if (hasDatabase()) {
    try {
      const [row] = await getDb()
        .select({ n: sql<number>`count(*)::int` })
        .from(loginAttempts)
        .where(
          and(eq(loginAttempts.ip, ip), eq(loginAttempts.success, false), gt(loginAttempts.createdAt, windowStart()))
        );
      return (row?.n ?? 0) >= MAX_FAILURES;
    } catch {
      /* fall through to memory */
    }
  }
  const since = windowStart().getTime();
  return (memory.get(ip) ?? []).filter((t) => t > since).length >= MAX_FAILURES;
}

export async function recordAttempt(ip: string, success: boolean) {
  if (!success) memory.set(ip, [...(memory.get(ip) ?? []), Date.now()]);
  if (success) memory.delete(ip);
  if (!hasDatabase()) return;
  try {
    const db = getDb();
    await db.insert(loginAttempts).values({ ip, success });
    if (success) {
      // A successful login clears this IP's failures.
      await db.delete(loginAttempts).where(and(eq(loginAttempts.ip, ip), eq(loginAttempts.success, false)));
    }
    // Housekeeping: keep a day of history.
    await db.delete(loginAttempts).where(lt(loginAttempts.createdAt, new Date(Date.now() - 86_400_000)));
  } catch (err) {
    console.error("[auth] could not record login attempt", err);
  }
}
