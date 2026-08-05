import { getAllProjects } from "@/lib/mdx";
import { ProjectCard } from "@/components/project/ProjectCard";

export function Projects() {
  const projects = getAllProjects();

  return (
    <section id="projects" className="max-w-5xl mx-auto px-6 py-24">
      <h2 className="text-3xl font-semibold tracking-tight mb-10">Featured Projects</h2>

      {projects.length === 0 ? (
        <p className="opacity-60 text-sm">Projects coming soon.</p>
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
