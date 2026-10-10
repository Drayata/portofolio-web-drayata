import "server-only";
import { createAuthActions } from "@insforge/sdk/ssr";
import { cookies } from "next/headers";
import { createInsforgeServerClient } from "@/lib/insforge";

function config() {
  const baseUrl = process.env.INSFORGE_BASE_URL;
  const anonKey = process.env.INSFORGE_ANON_KEY;
  if (!baseUrl || !anonKey) throw new Error("INSFORGE_BASE_URL and INSFORGE_ANON_KEY are required");
  return { baseUrl, anonKey };
}

export async function signIn(email: string, password: string) {
  const auth = createAuthActions({ ...config(), cookies: await cookies() });
  return auth.signInWithPassword({ email, password });
}

export async function isAdmin() {
  const adminUserId = process.env.INSFORGE_ADMIN_USER_ID;
  if (!adminUserId) return false;
  const { data, error } = await (await createInsforgeServerClient()).auth.getCurrentUser();
  return !error && data?.user?.id === adminUserId;
}

export async function destroySession() {
  const auth = createAuthActions({ ...config(), cookies: await cookies() });
  await auth.signOut();
}
