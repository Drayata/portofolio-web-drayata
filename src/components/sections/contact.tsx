import { ArrowUpRight, Mail } from "lucide-react";
import { profile, socialLinks } from "@/data/portfolio";
import { CopyEmail } from "@/components/ui/copy-email";
import { Reveal } from "@/components/ui/reveal";

export function Contact() {
  return (
    <section id="contact" className="section contact-section container" aria-labelledby="contact-heading">
      <Reveal>
        <div className="contact-panel">
          <p className="eyebrow">05 / Start a conversation</p>
          <h2 id="contact-heading">Have an opportunity or an interesting problem? <span>Let’s talk.</span></h2>
          <p>I’m open to internship and junior web development roles where careful frontend work and thoughtful engineering matter.</p>
          <div className="contact-actions">
            <a href={`mailto:${profile.email}`} className="button button-primary"><Mail size={17} aria-hidden="true" /> Email me</a>
            <CopyEmail email={profile.email} />
          </div>
          <a className="contact-email" href={`mailto:${profile.email}`}>{profile.email}</a>
          <div className="social-row">
            {socialLinks.map((link) => link.href ? <a key={link.label} href={link.href} target="_blank" rel="noreferrer">{link.label}<ArrowUpRight size={15} aria-hidden="true" /></a> : null)}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
