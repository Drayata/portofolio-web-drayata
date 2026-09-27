import { createHmac, scryptSync, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "portfolio_admin";
const MAX_AGE = 60 * 60 * 8;

function secret() {
  if (!process.env.AUTH_SECRET) throw new Error("AUTH_SECRET is required");
  return process.env.AUTH_SECRET;
}

function sign(value: string) {
  return createHmac("sha256", secret()).update(value).digest("base64url");
}

export function hashPassword(password: string) {
  const salt = process.env.AUTH_SECRET;
  if (!salt) throw new Error("AUTH_SECRET is required");
  return scryptSync(password, salt, 64).toString("hex");
}

export function validCredentials(email: string, password: string) {
  const expectedEmail = process.env.ADMIN_EMAIL;
  const expectedHash = process.env.ADMIN_PASSWORD_HASH;
  if (!expectedEmail || !expectedHash || email !== expectedEmail) return false;
  const actual = Buffer.from(hashPassword(password), "hex");
  const expected = Buffer.from(expectedHash, "hex");
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export async function createSession() {
  const expires = Math.floor(Date.now() / 1000) + MAX_AGE;
  const value = `${expires}.${sign(String(expires))}`;
  (await cookies()).set(COOKIE_NAME, value, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function isAdmin() {
  const value = (await cookies()).get(COOKIE_NAME)?.value;
  if (!value) return false;
  const [expires, signature] = value.split(".");
  if (!expires || !signature || Number(expires) < Date.now() / 1000) return false;
  const expected = Buffer.from(sign(expires));
  const actual = Buffer.from(signature);
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export async function destroySession() {
  (await cookies()).delete(COOKIE_NAME);
}
