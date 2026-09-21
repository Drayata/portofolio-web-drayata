import { projects } from "@/data/portfolio";
import { ProjectCard } from "@/components/projects/project-card";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function Work() {
  return (
    <section id="work" className="section container" aria-labelledby="work-heading">
      <Reveal>
        <SectionHeading id="work-heading" eyebrow="01 / Selected work" title="Projects shaped by the problem, not the trend." description="Three studies across product interfaces, full-stack thinking, and dependable data." />
      </Reveal>
      <div className="project-grid">
        {projects.map((project, index) => (
          <Reveal key={project.slug} className={index === 0 ? "project-grid-featured" : undefined}>
            <ProjectCard project={project} index={index} featured={index === 0} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
