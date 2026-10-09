import bcrypt from "bcryptjs";
import { createInterface } from "node:readline/promises";

/**
 * Prints the ADMIN_PASSWORD_HASH value for your .env.local / hosting settings.
 * The bcrypt hash is base64-encoded so the `$` characters don't get mangled
 * by .env variable expansion.
 */
async function main() {
  let password = process.argv[2];
  if (!password) {
    const rl = createInterface({ input: process.stdin, output: process.stdout });
    password = await rl.question("Admin password: ");
    rl.close();
  }
  if (!password || password.length < 12) {
    console.error("Use a password of at least 12 characters.");
    process.exit(1);
  }
  const hash = await bcrypt.hash(password, 12);
  console.log(`\nADMIN_PASSWORD_HASH=${Buffer.from(hash).toString("base64")}`);
}

main();
