import { ArrowDown, ArrowRight, FileText } from "lucide-react";
import Link from "next/link";
import { profile } from "@/data/portfolio";

export function Hero() {
  return (
    <section className="hero container" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow hero-eyebrow">{profile.eyebrow}</p>
        <h1 id="hero-title">
          I build <span>thoughtful digital experiences</span> for the modern
          web.
        </h1>
        <p className="hero-description">{profile.description}</p>
        <div className="hero-actions">
          <Link href="/#work" className="button button-primary">
            View selected work <ArrowDown size={17} aria-hidden="true" />
          </Link>
          <Link href="/#contact" className="button button-secondary">
            Contact me <ArrowRight size={17} aria-hidden="true" />
          </Link>
          <Link href="/resume" className="button button-quiet">
            View résumé <FileText size={17} aria-hidden="true" />
          </Link>
        </div>
      </div>
      <div className="hero-art" aria-hidden="true">
        <div className="orbit orbit-one">
          <i />
        </div>
        <div className="orbit orbit-two">
          <i />
        </div>
        <div className="orbit orbit-three" />
        <div className="core-mark">
          <span>ISA</span>
          <small>WEB / 01</small>
        </div>
        <div className="node node-a" />
        <div className="node node-b" />
        <div className="node node-c" />
        <span className="art-label label-a">INTERFACE</span>
        <span className="art-label label-b">SYSTEMS</span>
        <span className="art-label label-c">01.3079° S</span>
      </div>
      <a href="#profile-strip" className="scroll-cue">
        <span>Scroll to explore</span>
        <ArrowDown size={15} aria-hidden="true" />
      </a>
    </section>
  );
}
