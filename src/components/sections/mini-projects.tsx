import Image from "next/image";
import { miniProjects } from "@/data/portfolio";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function MiniProjects() {
  return (
    <section id="mini-projects" className="section container" aria-labelledby="mini-projects-heading">
      <Reveal>
        <SectionHeading
          id="mini-projects-heading"
          eyebrow="02 / Mini projects"
          title="Small builds, focused ideas."
          description="Simple projects and experiments without full case studies."
        />
      </Reveal>
      <div className="mini-project-grid">
        {miniProjects.map((project) => (
          <Reveal key={project.id}>
            <article className="mini-project-card">
              <Image src={project.imageUrl} alt="" width={1200} height={675} className="mini-project-image" />
              <div className="mini-project-body">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                {project.tags?.length ? (
                  <ul aria-label="Technologies">
                    {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
                  </ul>
                ) : null}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
