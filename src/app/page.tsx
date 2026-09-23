import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { MiniProjects } from "@/components/sections/mini-projects";
import { ProfileStrip } from "@/components/sections/profile-strip";
import { Skills } from "@/components/sections/skills";
import { Timeline } from "@/components/sections/timeline";
import { Work } from "@/components/sections/work";

export default function Home() {
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
    </main>
  );
}
