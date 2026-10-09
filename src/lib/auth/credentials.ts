import bcrypt from "bcryptjs";
import { timingSafeEqual } from "node:crypto";

// Compared against when the email is wrong, so both paths take the same time.
const DUMMY_HASH = "$2b$12$UN/EyvODLRGbXh2Y9pDrSecjhZ9KYN3ciI2AtXTcftZ6UvgMFJxqq";

function adminHash() {
  const encoded = process.env.ADMIN_PASSWORD_HASH;
  if (!encoded) return null;
  // Stored base64-encoded (see scripts/hash-password.ts); accept a raw bcrypt hash too.
  return encoded.startsWith("$2") ? encoded : Buffer.from(encoded, "base64").toString("utf8");
}

export const isLoginConfigured = () =>
  Boolean(process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD_HASH && process.env.SESSION_SECRET);

function sameText(a: string, b: string) {
  const x = Buffer.from(a.toLowerCase());
  const y = Buffer.from(b.toLowerCase());
  return x.length === y.length && timingSafeEqual(x, y);
}

export async function checkCredentials(email: string, password: string) {
  const hash = adminHash();
  const expectedEmail = process.env.ADMIN_EMAIL ?? "";
  const emailOk = Boolean(hash) && sameText(email, expectedEmail);
  const passwordOk = await bcrypt.compare(password, emailOk && hash ? hash : DUMMY_HASH);
  return emailOk && passwordOk;
}
