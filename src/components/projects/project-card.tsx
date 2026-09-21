import { ArrowUpRight, GitBranch } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/types/portfolio";
import { ProjectVisual } from "./project-visual";

export function ProjectCard({ project, featured = false, index }: { project: Project; featured?: boolean; index: number }) {
  return (
    <article className={`project-card accent-${project.accent} ${featured ? "project-featured" : ""}`}>
      <div className="project-card-visual">
        <ProjectVisual type={project.preview} compact={!featured} />
        <div className="project-number" aria-hidden="true">0{index + 1}</div>
      </div>
      <div className="project-card-body">
        <div className="project-kicker"><span>{project.status}</span><span>{project.year}</span></div>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        <dl className="project-meta">
          <div><dt>Role</dt><dd>{project.role}</dd></div>
          <div><dt>Core stack</dt><dd>{project.stack.join(" · ")}</dd></div>
        </dl>
        <div className="project-actions">
          <Link href={`/projects/${project.slug}`} className="text-link">
            View case study <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
          {project.liveUrl ? <a href={project.liveUrl}>Live project</a> : null}
          {project.sourceUrl ? <a href={project.sourceUrl}><GitBranch size={16} aria-hidden="true" /> Source</a> : null}
        </div>
      </div>
    </article>
  );
}
