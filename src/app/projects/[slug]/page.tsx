import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, ArrowUpRight, GitBranch } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectVisual } from "@/components/projects/project-visual";
import { getProject, profile, projects, seo } from "@/data/portfolio";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const title = `${project.title} — Case Study`;
  return {
    title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: { title, description: project.summary, url: `/projects/${project.slug}`, images: ["/opengraph-image"] },
    twitter: { card: "summary_large_image", title, description: project.summary, images: ["/opengraph-image"] },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const index = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(index + 1) % projects.length];
  const projectData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    creator: { "@type": "Person", name: profile.name },
    url: `${seo.url}/projects/${project.slug}`,
    keywords: project.stack.join(", "),
  };

  return (
    <main id="main-content" className="case-study">
      <div className="container case-breadcrumb"><Link href="/#work"><ArrowLeft size={16} aria-hidden="true" /> Back to selected work</Link><span>Case study / 0{index + 1}</span></div>
      <header className={`case-hero accent-${project.accent}`}>
        <div className="container case-hero-grid">
          <div className="case-title">
            <div className="project-kicker"><span>{project.status}</span><span>{project.year}</span></div>
            <h1>{project.title}</h1>
            <p>{project.summary}</p>
            <div className="case-actions">
              {project.liveUrl ? <a href={project.liveUrl} className="button button-primary">View live <ArrowUpRight size={17} aria-hidden="true" /></a> : null}
              {project.sourceUrl ? <a href={project.sourceUrl} className="button button-secondary"><GitBranch size={17} aria-hidden="true" /> View source</a> : null}
            </div>
          </div>
          <ProjectVisual type={project.preview} />
          <dl className="case-facts">
            <div><dt>Role</dt><dd>{project.role}</dd></div>
            <div><dt>Status</dt><dd>{project.status}</dd></div>
            <div><dt>Core stack</dt><dd>{project.stack.join(" · ")}</dd></div>
          </dl>
        </div>
      </header>

      <div className="container case-content">
        <aside className="case-index" aria-label="On this page">
          <p className="eyebrow">In this study</p>
          <a href="#overview">Overview</a><a href="#approach">Approach</a><a href="#features">Key features</a><a href="#engineering">Engineering</a><a href="#outcome">Outcome</a>
        </aside>
        <article>
          <section id="overview" className="case-section">
            <p className="eyebrow">01 / Overview</p><h2>Context and objective</h2><p className="lead">{project.context}</p><p>{project.objective}</p>
            <div className="case-columns">
              <div><h3>Responsibilities</h3><ul>{project.responsibilities.map((item) => <li key={item}>{item}</li>)}</ul></div>
              <div><h3>Constraints</h3><ul>{project.constraints.map((item) => <li key={item}>{item}</li>)}</ul></div>
            </div>
          </section>
          <section id="approach" className="case-section">
            <p className="eyebrow">02 / Process</p><h2>A structured route through the problem</h2>
            <div className="process-list">{project.approach.map((step, stepIndex) => <div key={step.title}><span>0{stepIndex + 1}</span><h3>{step.title}</h3><p>{step.body}</p></div>)}</div>
          </section>
          <section id="features" className="case-section">
            <p className="eyebrow">03 / Product</p><h2>Key features</h2>
            <ul className="feature-list">{project.features.map((feature, featureIndex) => <li key={feature}><span>{String(featureIndex + 1).padStart(2, "0")}</span>{feature}</li>)}</ul>
          </section>
          <section className="case-gallery" aria-labelledby="gallery-title">
            <p className="eyebrow">Interface studies</p><h2 id="gallery-title">Visualizing the core flows</h2>
            <div className="gallery-grid">{project.gallery.map((image) => <figure key={image.title}><ProjectVisual type={project.preview} variant={image.variant} compact /><figcaption><b>{image.title}</b><span>{image.caption}</span></figcaption></figure>)}</div>
          </section>
          <section id="engineering" className="case-section">
            <p className="eyebrow">04 / Engineering</p><h2>Decisions with consequences</h2>
            <div className="decision-grid">{project.decisions.map((decision) => <div key={decision.title}><h3>{decision.title}</h3><p>{decision.body}</p></div>)}</div>
            <div className="lesson"><p className="eyebrow">Challenge / lesson</p><p>{project.reflection}</p></div>
          </section>
          <section id="outcome" className="case-section outcome-section">
            <p className="eyebrow">05 / Outcome</p><h2>What exists today</h2><p className="lead">{project.outcome}</p>
          </section>
        </article>
      </div>
      <section className="next-project">
        <Link href={`/projects/${nextProject.slug}`} className="container"><span><small>Next case study</small>{nextProject.title}</span><ArrowRight aria-hidden="true" /></Link>
      </section>
      <section className="case-cta container"><p>Want to discuss the thinking behind this work?</p><div><Link href="/#contact" className="button button-primary">Start a conversation <ArrowRight size={17} aria-hidden="true" /></Link><Link href="/#work" className="button button-secondary">Back to all work</Link></div></section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projectData).replace(/</g, "\\u003c") }} />
    </main>
  );
}
