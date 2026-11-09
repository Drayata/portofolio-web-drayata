import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { MiniProjects } from "@/components/sections/mini-projects";
import { ProfileStrip } from "@/components/sections/profile-strip";
import { Skills } from "@/components/sections/skills";
import { Timeline } from "@/components/sections/timeline";
import { Work } from "@/components/sections/work";
import { profile, seo } from "@/data/portfolio";

export default function Home() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: seo.siteName,
      alternateName: [profile.name, "Drayata Portfolio", `Portofolio ${profile.name}`],
      url: `${seo.url}/`,
      inLanguage: "en",
      author: { "@id": `${seo.url}/#person` },
    },
    {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      url: `${seo.url}/`,
      name: seo.title,
      mainEntity: { "@id": `${seo.url}/#person` },
    },
  ];

  return (
    <main id="main-content">
      <Hero />
      <ProfileStrip />
      <Work />
      <MiniProjects />
      <About />
      <Skills />
      <Timeline />
      <Contact />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    </main>
  );
}
