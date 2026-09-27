"use server";

import { redirect } from "next/navigation";
import { createSession, destroySession, isAdmin, validCredentials } from "@/lib/auth";
import { defaultContent, saveContent, type ContentKey } from "@/lib/content";

export async function login(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  if (!validCredentials(email, password)) redirect("/admin?error=invalid");
  await createSession();
  redirect("/admin");
}

export async function logout() {
  await destroySession();
  redirect("/admin");
}

export async function updateContent(formData: FormData) {
  if (!(await isAdmin())) redirect("/admin");
  const key = String(formData.get("key")) as ContentKey;
  if (!(key in defaultContent)) throw new Error("Invalid content key");
  let value: unknown;
  try {
    value = JSON.parse(String(formData.get("value") ?? ""));
  } catch {
    redirect(`/admin?section=${key}&error=json`);
  }
  await saveContent(key, value);
  redirect(`/admin?section=${key}&saved=1`);
}
