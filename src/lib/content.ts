import "server-only";
import type { RowDataPacket } from "mysql2";
import { db } from "@/lib/db";
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

export async function getContent<K extends ContentKey>(key: K): Promise<(typeof defaultContent)[K]> {
  if (!process.env.DATABASE_URL) return defaultContent[key];
  try {
    const [rows] = await db.query<(RowDataPacket & { value: string | object })[]>(
      "SELECT value FROM content WHERE content_key = ? LIMIT 1",
      [key],
    );
    if (!rows[0]) return defaultContent[key];
    return (typeof rows[0].value === "string" ? JSON.parse(rows[0].value) : rows[0].value) as (typeof defaultContent)[K];
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
  await db.execute(
    "INSERT INTO content (content_key, value) VALUES (?, ?) ON DUPLICATE KEY UPDATE value = VALUES(value)",
    [key, JSON.stringify(value)],
  );
}
