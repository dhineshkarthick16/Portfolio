import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/mdx";
import { mdxComponents } from "@/components/mdx/MDXComponents";
import { GithubIcon } from "@/components/icons/BrandIcons";

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let project;
  try {
    project = getProjectBySlug(slug);
  } catch (err) {
    console.error(`Failed to load project "${slug}":`, err);
    notFound();
  }

  const { frontmatter, content } = project!;

  return (
    <main className="max-w-3xl mx-auto px-6 py-24">
      <Link
        href="/#projects"
        className="inline-flex items-center gap-2 text-sm opacity-60 hover:opacity-100 transition-opacity mb-10"
      >
        <ArrowLeft size={16} />
        Back to Projects
      </Link>

      <div className="flex items-start justify-between gap-6 mb-4">
        <h1 className="text-4xl font-semibold tracking-tight">{frontmatter.title}</h1>
        <span className="text-xs px-3 py-1.5 rounded-full bg-white/10 whitespace-nowrap mt-2">
          {frontmatter.status}
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {frontmatter.techStack.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 opacity-70"
          >
            {tech}
          </span>
        ))}
      </div>

      <a
        href={frontmatter.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-sm font-medium hover:opacity-90 transition-opacity mb-12"
      >
        <GithubIcon size={16} />
        View on GitHub
      </a>

      <article>
        <MDXRemote source={content} components={mdxComponents} />
      </article>
    </main>
  );
}
