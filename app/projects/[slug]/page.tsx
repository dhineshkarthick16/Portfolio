import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { ArrowLeft, BookOpen, Users } from "lucide-react";
import Link from "next/link";
import { getAllProjectSlugs, getProjectBySlug, hasBlogPost } from "@/lib/mdx";
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
  const hasStory = hasBlogPost(slug);

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
        <span className="text-xs px-3 py-1.5 rounded-full bg-white/10 whitespace-nowrap mt-2 font-mono">
          {frontmatter.status}
        </span>
      </div>

      {frontmatter.team && frontmatter.team.length > 0 && (
        <div className="flex items-center gap-2 text-xs font-mono text-slate-300 mb-6 bg-white/5 border border-white/10 rounded-lg px-3.5 py-2 w-fit">
          <Users size={14} className="text-cyan-400 shrink-0" />
          <span className="opacity-60">Team:</span>
          <span className="opacity-90">{frontmatter.team.join(", ")}</span>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3 mb-12">
        {frontmatter.githubUrl && slug !== "geodrain-ai" && (
          <a
            href={frontmatter.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="capacitive-btn text-xs py-2.5 px-4"
          >
            <GithubIcon size={16} />
            View on GitHub
          </a>
        )}

        {hasStory && (
          <Link
            href={`/blog/${slug}`}
            className="capacitive-btn capacitive-btn-copper text-xs py-2.5 px-4"
          >
            <BookOpen size={16} />
            Read Behind-the-Scenes Story
          </Link>
        )}
      </div>

      <article>
        <MDXRemote
          source={content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkMath],
              rehypePlugins: [rehypeKatex],
            },
          }}
        />
      </article>
    </main>
  );
}
