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
import { getFeaturedAchievements } from "@/lib/supabase";

export default async function Home() {
  const featuredAchievements = await getFeaturedAchievements();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <QuickStats />
        <Education />
        <Skills />
        <Certifications />
        <Projects />
        <Experience />
        <Achievements items={featuredAchievements} />
        <KnowledgeHubPreview />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
