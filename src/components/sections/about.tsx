import { ArrowUpRight, MapPin } from "lucide-react";
import { profile } from "@/data/portfolio";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function About() {
  return (
    <section id="about" className="section about-section container" aria-labelledby="about-heading">
      <Reveal>
        <SectionHeading id="about-heading" eyebrow="02 / About" title="Curiosity, made concrete." />
      </Reveal>
      <div className="about-grid">
        <Reveal className="about-copy"><p>{profile.about}</p></Reveal>
        <Reveal className="portrait-card">
          <div className="avatar" aria-label={`Abstract monogram portrait for ${profile.name}`} role="img">
            <span>ISA</span><i /><b>INDRA<br />SURYA<br />ADINATA</b>
          </div>
        </Reveal>
        <Reveal className="about-details">
          <div className="detail-card education-card">
            <p className="eyebrow">Education</p><h3>{profile.education}</h3><span>Current degree program</span>
          </div>
          <div className="detail-card location-card">
            <MapPin size={19} aria-hidden="true" /><div><p className="eyebrow">Location / timezone</p><h3>{profile.location}</h3><span>{profile.timezone}</span></div>
          </div>
          <div className="exploring-card"><p className="eyebrow">Currently exploring</p>{profile.exploring.map((item) => <p key={item}>{item}<ArrowUpRight size={15} aria-hidden="true" /></p>)}</div>
        </Reveal>
      </div>
    </section>
  );
}
