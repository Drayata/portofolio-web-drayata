import { skills } from "@/data/portfolio";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function Skills() {
  return (
    <section id="skills" className="section skills-section" aria-labelledby="skills-heading">
      <div className="container">
        <Reveal><SectionHeading id="skills-heading" eyebrow="03 / Capabilities" title="A practical toolkit, still expanding." description="Technologies I use to shape interfaces, application logic, and reliable data foundations." /></Reveal>
        <div className="skills-matrix">
          {skills.map((group, index) => (
            <Reveal key={group.category} className="skill-row">
              <div className="skill-label"><span>0{index + 1}</span><h3>{group.category}</h3></div>
              <ul>{group.items.map((skill) => <li key={skill}>{skill}</li>)}</ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
