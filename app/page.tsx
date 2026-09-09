import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { QuickStats } from "@/components/sections/QuickStats";
import { Education } from "@/components/sections/Education";
import { Skills } from "@/components/sections/Skills";
import { Certifications } from "@/components/sections/Certifications";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Achievements } from "@/components/sections/Achievements";
import { KnowledgeHubPreview } from "@/components/sections/KnowledgeHubPreview";
import { Resume } from "@/components/sections/Resume";
import { Contact } from "@/components/sections/Contact";
import { ScrollProgressBus } from "@/components/ui/ScrollProgressBus";
import { PcbTraces } from "@/components/ui/PcbTraces";
import { getQualifyingAchievements } from "@/lib/supabase";
import { getAllProjects } from "@/lib/mdx";
import { experience } from "@/data/experience";

export const dynamic = "force-dynamic";

export default async function Home() {
  const achievements = await getQualifyingAchievements();
  const projects = getAllProjects();

  return (
    <>
      <ScrollProgressBus />
      <Navbar />
      <PcbTraces />
      <main>
        <Hero />
        <About />
        <QuickStats
          hackathonsCount={achievements.length}
          projectsCount={Math.max(10, projects.length)}
          internshipsCount={experience.length}
        />
        <Education />
        <Skills />
        <Certifications />
        <Projects />
        <Experience />
        <Achievements items={achievements} />
        <KnowledgeHubPreview />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
