import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { QuickStats } from "@/components/sections/QuickStats";
import { Education } from "@/components/sections/Education";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";

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
        {/* Next: Experience, Achievements, Contact */}
      </main>
      <Footer />
    </>
  );
}
