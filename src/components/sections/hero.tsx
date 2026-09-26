import { ArrowDown, ArrowRight } from "lucide-react";
import Link from "next/link";
import { profile } from "@/data/portfolio";
import Image from "next/image";

export function Hero() {
  return (
    <section className="hero container" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow hero-eyebrow">{profile.eyebrow}</p>
        <h1 id="hero-title">
          <span>Indra</span> Surya Adinata
        </h1>
        <p className="hero-description">{profile.description}</p>
        <div className="hero-actions">
          <Link href="/#work" className="button button-primary">
            View selected work <ArrowDown size={17} aria-hidden="true" />
          </Link>
          <Link href="/#contact" className="button button-secondary">
            Contact me <ArrowRight size={17} aria-hidden="true" />
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
        <div className="core-mark">
          <Image
            className="hero-image"
            src="/images.jpeg"
            alt=""
            fill
            sizes="(max-width: 768px) 32vw, 154px"
          />
        </div>
        <div className="node node-a" />
        <div className="node node-b" />
        <div className="node node-c" />
        <span className="art-label label-a">INTERFACE</span>
        <span className="art-label label-b">SYSTEMS</span>
        <span className="art-label label-c">01.3079° S</span>
      </div>
      <a href="#profile-strip" className="scroll-cue">
        <ArrowDown size={15} aria-hidden="true" />
      </a>
    </section>
  );
}
