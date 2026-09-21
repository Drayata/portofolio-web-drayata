import { timeline } from "@/data/portfolio";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function Timeline() {
  return (
    <section className="section container timeline-section" aria-labelledby="timeline-heading">
      <Reveal><SectionHeading id="timeline-heading" eyebrow="04 / Learning path" title="Building depth through practice." /></Reveal>
      <ol className="timeline">
        {timeline.map((item, index) => (
          <Reveal key={item.title} className="timeline-item">
            <li>
              <div className="timeline-marker"><span>0{index + 1}</span></div>
              <p className="timeline-period">{item.period}</p>
              <div><p className="eyebrow">{item.type}</p><h3>{item.title}</h3><p>{item.description}</p></div>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
