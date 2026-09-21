import type { Metadata } from "next";
import { ExternalLink, Mail, MapPin } from "lucide-react";
import { PrintButton } from "@/components/ui/print-button";
import { profile, projects, skills, socialLinks } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Résumé",
  description: `Résumé for ${profile.name}, ${profile.role}.`,
  alternates: { canonical: "/resume" },
};

export default function ResumePage() {
  return (
    <main id="main-content" className="resume-page">
      <div className="resume-toolbar container"><p>Print-ready résumé</p><PrintButton /></div>
      <article className="resume-sheet">
        <header className="resume-header">
          <div><p className="eyebrow">{profile.supportingRole}</p><h1>{profile.name}</h1><p className="resume-role">{profile.role}</p></div>
          <address>
            <span><MapPin size={14} aria-hidden="true" /> {profile.location}</span>
            <a href={`mailto:${profile.email}`}><Mail size={14} aria-hidden="true" /> {profile.email}</a>
            {socialLinks.map((link) => link.href ? <a href={link.href} key={link.label}><ExternalLink size={14} aria-hidden="true" /> {link.label}</a> : null)}
          </address>
        </header>
        <section className="resume-section"><h2>Profile</h2><p>{profile.about}</p></section>
        <div className="resume-layout">
          <div>
            <section className="resume-section"><h2>Education</h2><div className="resume-entry"><h3>Universitas Jenderal Soedirman</h3><p>{profile.education.split(" — ")[0]}</p><span>Current degree program · Indonesia</span></div></section>
            <section className="resume-section"><h2>Selected projects</h2>{projects.map((project) => <div className="resume-entry" key={project.slug}><div className="resume-entry-title"><h3>{project.title}</h3><span>{project.status}</span></div><p>{project.role} · {project.stack.join(", ")}</p><small>{project.summary}</small></div>)}</section>
          </div>
          <aside>
            <section className="resume-section"><h2>Skills</h2>{skills.map((group) => <div className="resume-skill" key={group.category}><h3>{group.category}</h3><p>{group.items.join(" · ")}</p></div>)}</section>
            <section className="resume-section"><h2>Current focus</h2><ul>{profile.exploring.map((item) => <li key={item}>{item}</li>)}</ul></section>
            <section className="resume-section"><h2>Availability</h2><p>{profile.availability}.</p></section>
          </aside>
        </div>
      </article>
    </main>
  );
}
