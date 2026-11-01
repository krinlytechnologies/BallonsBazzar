#!/usr/bin/env node
// Generates an ADMIN_PASSWORD_HASH value for .env — run `npm run admin:hash-password`.
import { randomBytes, scryptSync } from "node:crypto";
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";

const rl = createInterface({ input: stdin, output: stdout });
const password = await rl.question("Password to hash: ");
rl.close();

if (!password) {
  console.error("No password entered.");
  process.exit(1);
}

const salt = randomBytes(16).toString("hex");
const hash = scryptSync(password, salt, 64).toString("hex");

console.log("\nADMIN_PASSWORD_HASH=" + salt + ":" + hash);
console.log("\nAdd this to your environment, along with ADMIN_USERNAME and a random ADMIN_SESSION_SECRET.");
