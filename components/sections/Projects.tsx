import { getAllProjects } from "@/lib/mdx";
import { ProjectCard } from "@/components/project/ProjectCard";

export function Projects() {
  const projects = getAllProjects();

  return (
    <section id="projects" className="max-w-5xl mx-auto px-4 sm:px-6 py-20 sm:py-24">
      <div className="mb-10">
        <span className="section-tag">// SEC_04 // ENGINEERING_PROJECTS</span>
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Featured Projects</h2>
        <p className="text-sm opacity-60 mt-1 font-mono">
          Custom silicon, embedded IoT systems, and edge anomaly detection architectures.
        </p>
      </div>

      {projects.length === 0 ? (
        <p className="opacity-60 text-sm font-mono">Projects coming soon.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      )}
    </section>
  );
}
