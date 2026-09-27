import { scryptSync } from "node:crypto";

const [password, secret] = process.argv.slice(2);
if (!password || !secret) {
  console.error("Usage: npm run auth:hash -- <password> <AUTH_SECRET>");
  process.exit(1);
}
console.log(scryptSync(password, secret, 64).toString("hex"));
