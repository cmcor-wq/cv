// Run locally once to generate ADMIN_PASSWORD_HASH for Vercel:
//   node scripts/hash-admin-password.mjs "your password here"
// Paste the printed value into the ADMIN_PASSWORD_HASH env var.
// The plain password is never stored anywhere.

import { randomBytes, scryptSync } from "node:crypto";

const password = process.argv[2];
if (!password) {
  console.error("Usage: node scripts/hash-admin-password.mjs <password>");
  process.exit(1);
}

const salt = randomBytes(16);
const hash = scryptSync(password, salt, 64);
console.log(`${salt.toString("hex")}:${hash.toString("hex")}`);
