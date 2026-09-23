export type SocialLink = {
  label: string;
  href: string | null;
};

export type ProjectSection = {
  title: string;
  body: string;
  items?: string[];
};

export type Project = {
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  role: string;
  stack: string[];
  year: string;
  status: string;
  accent: "cyan" | "violet" | "amber";
  preview: "marketplace" | "database" | "focus";
  liveUrl: string | null;
  sourceUrl: string | null;
  context: string;
  objective: string;
  responsibilities: string[];
  constraints: string[];
  approach: ProjectSection[];
  features: string[];
  decisions: ProjectSection[];
  reflection: string;
  outcome: string;
  gallery: Array<{ title: string; caption: string; variant: string }>;
};

export type TimelineItem = {
  period: string;
  title: string;
  description: string;
  type: string;
};

export type MiniProject = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags?: string[];
};
