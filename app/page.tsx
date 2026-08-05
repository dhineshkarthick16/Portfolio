import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { QuickStats } from "@/components/sections/QuickStats";
import { Education } from "@/components/sections/Education";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Achievements } from "@/components/sections/Achievements";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <QuickStats />
        <Education />
        <Skills />
        <Projects />
        <Experience />
        <Achievements />
        {/* Next: Knowledge Hub, Resume, Contact */}
      </main>
      <Footer />
    </>
  );
}
