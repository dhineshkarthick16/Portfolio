import { getAllProjects, hasBlogPost } from "@/lib/mdx";
import { ProjectCard } from "@/components/project/ProjectCard";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Projects() {
  const projects = getAllProjects();

  return (
    <section id="projects" className="cv-auto-section max-w-5xl mx-auto px-4 sm:px-6 py-20 sm:py-24">
      <SectionHeader
        tag="// SEC_04 // ENGINEERING_PROJECTS"
        title="Featured Projects"
        description="Custom silicon, embedded IoT systems, and edge anomaly detection architectures."
      />

      {projects.length === 0 ? (
        <p className="opacity-60 text-sm font-mono">Projects coming soon.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
              hasStory={hasBlogPost(project.slug)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
