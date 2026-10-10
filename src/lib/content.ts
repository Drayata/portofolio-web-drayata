import "server-only";
import { createInsforgeServerClient, createPublicInsforgeClient } from "@/lib/insforge";
import {
  miniProjects as defaultMiniProjects,
  profile as defaultProfile,
  projects as defaultProjects,
  seo as defaultSeo,
  skills as defaultSkills,
  socialLinks as defaultSocialLinks,
  timeline as defaultTimeline,
} from "@/data/portfolio";

export const defaultContent = {
  profile: defaultProfile,
  seo: defaultSeo,
  socialLinks: defaultSocialLinks,
  projects: defaultProjects,
  miniProjects: defaultMiniProjects,
  skills: defaultSkills,
  timeline: defaultTimeline,
};

export type ContentKey = keyof typeof defaultContent;
type ContentRow = { content_key: ContentKey; value: unknown };

export async function getContent<K extends ContentKey>(key: K): Promise<(typeof defaultContent)[K]> {
  if (!process.env.INSFORGE_BASE_URL || !process.env.INSFORGE_ANON_KEY) return defaultContent[key];
  try {
    const { data, error } = await createPublicInsforgeClient().database
      .from("content")
      .select("content_key,value")
      .eq("content_key", key)
      .maybeSingle();
    if (error) throw error;
    return (data as ContentRow | null)?.value as (typeof defaultContent)[K] ?? defaultContent[key];
  } catch (error) {
    console.error(`Failed to load content: ${key}`, error);
    return defaultContent[key];
  }
}

export async function getAllContent() {
  const entries = await Promise.all(
    (Object.keys(defaultContent) as ContentKey[]).map(async (key) => [key, await getContent(key)] as const),
  );
  return Object.fromEntries(entries) as typeof defaultContent;
}

export async function saveContent(key: ContentKey, value: unknown) {
  const client = await createInsforgeServerClient();
  const { data, error } = await client.database
    .from("content")
    .select("content_key")
    .eq("content_key", key)
    .maybeSingle();
  if (error) throw error;

  const result = data
    ? await client.database.from("content").update({ value }).eq("content_key", key)
    : await client.database.from("content").insert({ content_key: key, value });
  if (result.error) throw result.error;
}
