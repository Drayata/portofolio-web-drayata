import "server-only";
import { createClient } from "@insforge/sdk";
import { createServerClient } from "@insforge/sdk/ssr";
import { cookies } from "next/headers";

function config() {
  const baseUrl = process.env.INSFORGE_BASE_URL;
  const anonKey = process.env.INSFORGE_ANON_KEY;
  if (!baseUrl || !anonKey) throw new Error("INSFORGE_BASE_URL and INSFORGE_ANON_KEY are required");
  return { baseUrl, anonKey };
}

export function createPublicInsforgeClient() {
  return createClient(config());
}

export async function createInsforgeServerClient() {
  return createServerClient({ ...config(), cookies: await cookies() });
}
