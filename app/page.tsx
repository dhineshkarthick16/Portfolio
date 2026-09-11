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
import { Resume } from "@/components/sections/Resume";
import { Contact } from "@/components/sections/Contact";
import { ScrollProgressBus } from "@/components/ui/ScrollProgressBus";
import { PcbTraces } from "@/components/ui/PcbTraces";
import { getQualifyingAchievements, getTotalHackathonsCount } from "@/lib/supabase";
import { getAllProjects } from "@/lib/mdx";
import { experience } from "@/data/experience";
import { certifications } from "@/data/certifications";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [achievements, totalHackathons] = await Promise.all([
    getQualifyingAchievements(),
    getTotalHackathonsCount(),
  ]);
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
          hackathonsCount={Math.max(15, totalHackathons)}
          projectsCount={Math.max(10, projects.length)}
          internshipsCount={experience.length}
          certificationsCount={certifications.length}
        />
        <Skills />
        <Experience />
        <Projects />
        <Achievements items={achievements} />
        <Certifications />
        <Education />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
